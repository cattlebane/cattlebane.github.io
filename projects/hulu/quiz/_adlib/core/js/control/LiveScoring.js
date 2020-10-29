/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	LiveScoring

	Description:
		This class manages the polling of the ESPN SCORES API via an Edgecast proxy. In order to build an ad that responds to live scoring, 
		you need to start with the "ad-manager-espn-live-scoring" template. You will notice there is a "liveScoring" settings object
		in the index. Then, in the build is where you will find the event-handlers that will be necessary to thread into your build routines.

	Setup:
		The piece that must be coded is the connection of game-ids from <AdManager> to <LiveScoring>. The json from AdManager 
		(accessible on <AdData>.adDataRaw) contains a list of events, the first of which is the next live event. There should be a
		"game_id" property somewhere in that json. For the ESPN API is a 9-digit number. You need to create a property in <AdData> 
		for this id, and pass that to <LiveScoring>, like:

		(start code)
			adData.liveScoring = new LiveScoring();
			adData.liveScoring.prepare( adData.currentGameId );
		(end code)

		The following is a summary of what happens in the build.
			1) Instantiate <LiveScoring>
			2) Pass current-game-id to <LiveScoring>
			3) Setup listeners to handle 
				- State Change, ie, a match goes from upcoming-to-live or live-to-past...which necessitates a rebuild of the view
				- Match Update, ie, the score, clock, or period of the currently live game changes
				- All Matches Complete, ie, in a doubleheader, both matches are finished and the next <AdData> from <AdManager> needs to be loaded.
			4) Indicate pathes to local, debug json, which can be used to spoof live-data
			5) Start polling.

	Debug:
		When running the ad locally, the ad will load the debug live-scoring-json, as specified in the build: 
		>> adParams.commonPath + 'debug/'

		Because live-events often are double-headers (two games per event) that need to actively cycle through each game there are 
		four debug jsons. These represent two events( "live_data1" and "live_data2" ), with two games( "game1" and "game2" ) per event. 
		If you are only advertising a single game, then you'd be able to test using only the first set "live_data1".

		The way to change the "state" of the ad is to find the "state" property in these debug jsons and switch them to one of
		the following three modes: 1) "pre", 2) "in",  3) "post".

		From there any other properties display depends on how your ad is coded.

	Notes:
		The challenge of live-scoring is building your ad in a way that it can be rebuilt and updated dynamically. For example,
		it needs to be able to build itself in either Doubleheader, Singleheader, or Live modes.

		One example of how this can be achieved is detailed below. This code assumes that you have built different endframe "modules"
		which all have a common interface method called "buildMarkup()".

		(start code)
			this.rebuildEndframe = function() {
				adData.elements.endframeModule = function() {
					// LIVE MODE
					if( adData.liveScoring.areLiveMatches() ) {
						trace( ' - LIVE MODE' );
						return new LiveScoring_300x250();
					}

					// UPCOMING MODE
					else {
						trace( ' - UPCOMING MODE' );
						// json is double-header
						if( adData.game_type == 'Doubleheader' )
							// both matches are upcoming
							if( !adData.getIsMatchup1Past() ) {
								trace( '    ( doubleheader )' );
								return new DoubleHeader_300x250();
							}
							// first match is finished
							else {
								trace( '    ( singleheader )' );
								return new SingleHeader_300x250();
							}

						// json is single-header
						else {
							trace( '    ( singleheader )' );
							return new SingleHeader_300x250();
						}
					}
				}();
				adData.elements.endframeModule.buildMarkup();
			}
		(end code)
*/
function LiveScoring() {
	trace('LiveScoring()');

	var self = this;

	/* -----------------------------------------------------------------------------------------
	 *
	 *	CONTROL
	 *
	 */
	var apiProxyUrl = adParams.liveScoring.apiProxyUrl;
	var pollFrequency = adParams.liveScoring.pollFrequency;
	var expirationOffsetMinutes = adParams.liveScoring.expirationOffset;


	/** Method: prepare()
		This class creates a list of matchups, based on game-ids which came from AdManager's current <AdData>. 
		If it's a single-header, there one game-id. If it is a double-header, then there will be two game-ids. 

		currentGameId 		- Required. Either a string or an array. This comes from AdManager.json, the next upcoming event. In the past
							that property could be found at `adData.adDataRaw.matchup[ 0 ].game.game_id`, however you may need to 
							acquire from another property. */
	self.prepare = function( currentGameIds ) {
		trace( 'LiveScoring.prepare()' );
		if( !currentGameIds ) {
			trace( ' ~ GAME-IDs from AdManager json are required!!!' );
			return;
		}
		else trace( ' - currentGameIds:', currentGameIds );

		if( typeof currentGameIds == 'string' ) 
			currentGameIds = [ currentGameIds ];
		for( var i in currentGameIds ) {
			addMatchupFor( currentGameIds[ i ] );
		}		
	}


	/** Method: addEventCallBack()
		This adds a callback for any of the events dispatched by this class. See <LiveScoringEvent>. 

		_type 			- corresponds to the <LiveScoringEvent> constant
		_callback 		- is the function that should be called on the firing of the event. */
	self.addEventCallBack = function( _type, _callback ) {
		events.push({ 
			type: _type, 
			callback: _callback 
		});
	}


	/** Method: startPolling()
		Begins making requests to the API for scoring data. */
	self.startPolling = function() {
		trace ( 'LiveScoring.startPolling()' );
		intervalId = setInterval( poll, self.isDebugMode() ? 10000 : 1000 * pollFrequency );
		poll();
	}
	

	/** Method: cleanup()
		Stops polling and resets the list of game-ids. */
	self.cleanup = function() {
		trace ( 'LiveScoring.cleanup()' );
		stopPolling();
		matchups = [];
	}


	/** Method: setDebugPathsFor()
		This is a utility for specifying specific, non-live data that can be easily tweaked for the sake of testing.

		_indexOrGameId 	- Optional, if this is an integer less than the number of matches, then it is handled
							as a matchup index. Otherwise, this corresponds to the <AdData>.game_id.
		_debugPaths 		- a relative or http path( or paths )pointing at json resources which match the expected format */
	self.setDebugPathsFor = function( _indexOrGameId, _debugPaths ) {
		trace( 'LiveScoring.setDebugPathsFor()' );
		var matchup = getMatchupBy( _indexOrGameId );
		if( matchup ) {
			trace( ' - gameId: ' + matchup.gameId + ', debugPaths: ' + _debugPaths );
			if( _debugPaths instanceof Array ) 
				matchup.debugPaths = matchup.debugPaths.concat( _debugPaths );
			else matchup.debugPaths.push( _debugPaths );
		}
	}

	/** Method: isDebugMode()
		Centralizes the logic for debug mode:

		AdManager preview locations will automatically try to load debug json. There are also two query-string parameters 
		for controlling debug mode

			"?liveScoringDebug=true" to force debug-mode
			"?liveScoringDebug=false" to force live-mode */
	self.isDebugMode = function() {
		var liveScoringDebug = NetUtils.getQueryParameterBy( 'liveScoringDebug' )
		return ( AdManager.isPreviewLocation() || liveScoringDebug == 'true' ) && liveScoringDebug != 'false';
	}







	/* -----------------------------------------------------------------------------------------
	 *
	 *	MATCHUP STATUS
	 *
	 */
	/** Method: data()
		Returns the LiveScoringData class for the requested game-id. 

		_indexOrGameId 		- Optional. If this is an integer less than the number of matches, then it is handled
								as a matchup index. Otherwise, this corresponds to the <AdData>.game_id. If no argument is
								passed, then the first non-null, <LiveScoringData> is returned. */
	self.data = function( _indexOrGameId ) {
		if( _indexOrGameId )
			return getMatchupBy( _indexOrGameId ).liveScoringData;
		else {
			for( var i = 0; i < matchups.length; i++ ) {
				if( matchups[i].liveScoringData ) 
					if( !matchups[i].liveScoringData.getIsPast() )
						return matchups[i].liveScoringData;
			}			
		}
		return null;
	}





	/** Method: areLiveMatches()
		Returns true if any matchups in the current <AdData> are live. */
	self.areLiveMatches = function() {
		for( var i = 0; i < matchups.length; i++ ) {
			if( matchups[i].liveScoringData ) {
				if( matchups[i].liveScoringData.getIsLive() )
					return true;
			}
		}
		return false;
	}

	/** Method: isMatchupLive()
		Returns true if the requested matchup is live.

		_indexOrGameId 		- If this is an integer less than the number of matches, then it is handled
								as a matchup index. Otherwise, this corresponds to the <AdData>.game_id. */
	self.isMatchupLive = function( _indexOrGameId ) {
		var matchup = getMatchupBy( _indexOrGameId );
		if( matchup )
			return matchup.liveScoringData.getIsLive();
		else return false;
	}







	/** Method: allMatchesArePast()
		Returns true if all matchups in the current <AdData> are past. */
	self.allMatchesArePast = function() {
		for( var i = 0; i < matchups.length; i++ ) {
			if( matchups[i].liveScoringData ) {
				if( !matchups[i].liveScoringData.getIsPast() )
					return false;
			}
		}
		return true;
	}

	/** Method: isMatchupPast()
		Returns true if the requested matchup is live.

		_indexOrGameId 		- If this is an integer less than the number of matches, then it is handled
								as a matchup index. Otherwise, this corresponds to the <AdData>.game_id. */
	self.isMatchupPast = function( _indexOrGameId ) {
		var matchup = getMatchupBy( _indexOrGameId );
		if( matchup )
			return matchup.liveScoringData.getIsPast();
		else return false;
	}














	/* -----------------------------------------------------------------------------------------
	 *
	 *	INTERNAL
	 *
	 */
	var matchups = [];
	var intervalId;
	var events = [];
	var pollCount;
	var debugPathIndex = 0;

	function addMatchupFor( _gameId ) {
		trace( 'LiveScoring.addMatchupFor() ' + _gameId );
		var _matchup = {
			gameId: _gameId,
			loader: null,
			liveScoringData: null,
			stateChanged: false,
			debugPaths: []
		};
		matchups.push( _matchup );
	}
	function getMatchupBy( _indexOrGameId ) {
		if( _indexOrGameId === parseInt( _indexOrGameId ) && parseInt( _indexOrGameId ) < matchups.length )
			return matchups[_indexOrGameId];
		else {
			for( var i = 0; i < matchups.length; i++ ) {
				if( matchups[i].gameId == _indexOrGameId ) 
					return matchups[i];
			}
		}
		return null;
	}
	function matchesChangedState() {
		for( var i = 0; i < matchups.length; i++ ) {
			if( matchups[i].stateChanged ) 
				return true;
		}
		return false
	}





	function poll() {
		trace( 'LiveScoring.poll()' );
		pollCount = matchups.length;
		for( var i = 0; i < matchups.length; i++ ) {
			var jsonPath = apiProxyUrl + matchups[i].gameId;
			if( self.isDebugMode()) {
				if( matchups[i].debugPaths.length > debugPathIndex ) 
					jsonPath = matchups[i].debugPaths[debugPathIndex];
			} 
			matchups[i].loader = new Loader( jsonPath, { 
				name: 'liveScoringLoader_' + matchups[i].gameId, 
				fileType: 'json',
				onComplete: handlePollComplete,
				onFail: handlePollFail, 
				scope: self,
				cacheBuster: true
			});
			matchups[i].loader.load();
		}
	}
	function stopPolling() {
		trace( 'LiveScoring.stopPolling()' );
		clearInterval( intervalId );
	}






	function handlePollFail() {
		trace( 'LiveScoring.handlePollFail()' );
  		dispatchEventCallBack( LiveScoringEvent.POLL_FAIL );
	}
	function handlePollComplete( loader ) {
		var matchup = getMatchupBy( loader.name.split( '_' )[1] );
		var rawData = loader.content[0].dataRaw;
		// debug json data gets written to the head as an object-literal because it's the only way to load local json
		// Therefore, to avoid error, the json must be valid JS, so it is set to a var, which must be removed to parse as valid JSON
		if( typeof rawData != 'string' ) 
			rawData = JSON.stringify( rawData );
		rawData = JSON.parse( rawData.replace( /^[^\{]+/, '' ));
		var liveScoringData = new LiveScoringData( rawData );

		// determine if status has changed
		matchup.stateChanged = false;
		if( !matchup.liveScoringData ) {
			matchup.stateChanged = true;
		}
		else if( matchup.liveScoringData.getStatus().state !== liveScoringData.getStatus().state ) { 
			trace( '    matchup.liveScoringData has changed from "' + matchup.liveScoringData.getStatus().state + '" to "' + liveScoringData.getStatus().state + '"' );
			matchup.stateChanged = true; 
		}
		matchup.liveScoringData = liveScoringData;

		pollCount--;
		if( pollCount == 0 )
			handleAllLoadScoresComplete();
	}
	function handleAllLoadScoresComplete() {
		trace( 'LiveScoring.handleAllLoadScoresComplete()' );
		if( self.allMatchesArePast() ) {
			if( self.isDebugMode() ) 
				incrementDebugIndex();
			handleAllMatchesComplete();
		}
		else if( matchesChangedState() ) {
			dispatchEventCallBack( LiveScoringEvent.MATCH_STATUS_CHANGE );
		}
		else if( self.areLiveMatches() )
			dispatchEventCallBack( LiveScoringEvent.MATCH_UPDATE );
	}
	function handleAllMatchesComplete() {
		trace( 'LiveScoring.handleAllMatchesComplete()' );
		if( !self.isDebugMode() ) {
			self.cleanup();
			AdManager.completeCallback = Control.prepareLiveScoring;
			AdManager.getNextAdData();
		}
	}




	// this simulates the advance of <AdManager>'s <AdData> to the next non-expired event.
	function incrementDebugIndex() {
		trace( 'LiveScoring.incrementDebugIndex()' );
		var hasDebugPathes = true;
		for( var i = 0; i < matchups.length; i++ ) {
			if( debugPathIndex >= matchups[i].debugPaths.length - 1 ) {
				hasDebugPathes = false;
				break;
			}
		}
		if( hasDebugPathes ) {
			trace( ' - ADVANCING TO NEXT SET OF DEBUG JSON - this simulates a loading a new AdData with new gameIds')
			debugPathIndex++;
			poll();
		}
		else {
			trace( ' - NO MORE DEBUG JSON - ending LiveScoring' );
			stopPolling();
			dispatchEventCallBack( LiveScoringEvent.MATCH_STATUS_CHANGE );
		}
	}



	function dispatchEventCallBack( _type ) {
		for( var i = 0; i < events.length; i++ ) {
			if( events[i].type == _type ) {
				events[i].callback();
			}
		}
	}	

}







/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	LiveScoringEvent

	Description:
		The constants used by <LiveScoring>
*/
var LiveScoringEvent = new function() {
	return {
		MATCH_UPDATE: 'event_matchUpdate',
		MATCH_STATUS_CHANGE: 'event_matchStatusChange',
		POLL_FAIL: 'event_pollFail'
	}
}
