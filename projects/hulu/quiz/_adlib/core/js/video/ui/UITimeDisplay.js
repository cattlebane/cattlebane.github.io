/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	UITimeDisplay

	Description:
		This object creates the Time Display, called INTERALLY from VideoControls.js. This displays the run time of the VideoPlayer. 

	Required Classes:
		UIButton.js

	Sample Players:
		(start code)
			adData.elements.videoPlayer = new VideoPlayer({
				source: adParams.videosPath + 'RED_Html5_Showcase_300x250.mp4',
				target: adData.elements.redAdContainer,
				id: 'My_Unique_ID',
				css: {
					width: 300,
					height: 250
				},
				autoPlay: true,
				muted: true,
				volume: .8,
				
				showOnPoster : true,
					constant : true,
					enabled : true,
					
					include : {
						timeDisplay : {
							css : {
								float : 'right' // DEFAULT
							},
							textStyles : {
								fontSize : 14,
								fontFamily : 'Arial'
							},
							showDuration : false
						}
					}
				}
			});
		(end code)
		
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */
	
function UITimeDisplay ( player, arg ){

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// BASE CSS
	var getSheet = document.getElementById('RED_videoTimeDisplay');
	if ( !getSheet ){
		var cssRules = ".rvp-time-display { height:inherit; padding:0 5px; }"
		cssRules += ".rvp-time-display span { white-space: nowrap; font-size:12pt; color: #ffffff; line-height: 30px; }"

		var styleScript = document.createElement('style');
		styleScript.type = 'text/css';
		styleScript.media = 'screen';
		styleScript.id = 'RED_uiButton';
		styleScript.appendChild(document.createTextNode( cssRules ));
		document.getElementsByTagName( 'head' )[0].appendChild( styleScript );
	}
	
	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// MARKUP
	var U = document.createElement('div');
	U.setAttribute('class', 'rvp-time-display');
	U.id = arg.id;
	if ( arg.css ) 
		Styles.setCss( U, arg.css );
	arg.target.appendChild( U );

	U.textfield = document.createElement('span');
	U.textfield.setAttribute('class', 'rvp-time-display span' );
	if ( arg.textStyles )
		Styles.setCss( U.textfield, arg.textStyles );
	U.appendChild( U.textfield );
	
	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PROPERTIES
	var _showDuration = true;
	var _duration = '';
	var _enabled = true;
	var _displayPriority = 'internal';
	var _showing = false;

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// GETTER | SETTTER
	/**	Method: enabled(Boolean)
			Get|Set: Changes the event handling state of the Button, without effecting its display properties. If the parameter is null, it returns the current active state.

		Parameters:
			state 	- A boolean, either true or false.
		
		(start code)
			// GET
			var enabled = myVideoPlayer.controls.timeDisplay.enabled();

			// SET
			myVideoPlayer.controls.timeDisplay.enabled(false);			
		(end code)
	*/
	U.enabled = function(state){
		// GET
		if ( state == undefined ) return _enabled;

		// SET
		_enabled = state;
		controlListeners ( state );
	}

	/**	Method: showDuration(Boolean)
			Set only: Changes if the time displays as '0:00' or '0:00 / 0:00'

		Parameters:
			state 	- A boolean, either true or false.
		
		> myVideoPlayer.controls.timeDisplay.showDuration(false);			
	*/
	U.showDuration = function(state){
		// SET
		_showDuration = state;
		_duration = state ? ' / ' + formatTime ( player.screen.duration ) : '';
	}

	/**	Method: showing(Boolean)
			Get only: Whether or not the time display is displayed in the DOM
				
		> var showing = myVideoPlayer.controls.timeDisplay.showing();		
	*/
	U.showing = function(){
		return _showing;
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PUBLIC METHODS
	/**	Method: hide()
			Visually removes the time display from the DOM by setting its display property to none
		
		> myVideoPlayer.controls.timeDisplay.hide();
	*/
	U.hide = function ( calledInternally ){
		if ( calledInternally ){
			if ( _displayPriority == 'external' ) return;
		} else {
			_displayPriority = 'external';
		}
		U.style.display = 'none';
		_showing = true;
	}

	/**	Method: show()
			Visually displays the time display in the DOM
		
		> myVideoPlayer.controls.timeDisplay.show();
	*/
	U.show = function ( calledInternally ){
		if ( calledInternally ){
			if ( _displayPriority == 'external' ) return;
		} else {
			_displayPriority = 'external';
		}
		try {
			U.style.removeProperty ( 'display' );
		} catch (e) {
			U.style.display = null;
		}

		_showing = false;
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PRIVATE METHODS
	function formatTime ( time ){
		var min = Math.floor(time / 60);
		var sec = Math.floor(time - (min * 60));
		if ( sec < 10 ) sec = '0' + sec;
		return min + ':' + sec;
	}

	function controlListeners ( enable ){
		var listener = enable ? 'addEventListener' : 'removeEventListener';
		player.screen[listener]('loadeddata', handleLoadedData, false);
		player.screen[listener]('timeupdate', handleTimeUpdate, false);
	}
	
	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// EVENT HANDLERS
	function handleLoadedData ( event ){
		if ( _showDuration ) _duration = ' / ' + formatTime ( player.screen.duration );
	}

	function handleTimeUpdate ( event ){
		U.textfield.innerHTML = formatTime ( player.screen.currentTime ) + _duration;
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// INIT
	U.enabled(true);
	U.showDuration ( arg.showDuration != false );
	U.textfield.innerHTML = _showDuration ? '0:00 / 0:00' : '0:00'

	return U;
}