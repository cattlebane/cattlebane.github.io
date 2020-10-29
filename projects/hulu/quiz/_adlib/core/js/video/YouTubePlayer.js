// TODO - https://support.google.com/docs/answer/6098219?hl=de
//		- add tracking with simple Enabler.counter()
/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	YouTubePlayer

	Description:
		This Object creates and manages a YouTube player embed.  The native YouTube API has many flaws in its logic along with several limtations.
		YouTubePlayer attempts to bridge some of those short comings, while at the same time following as closely as possible the same methods and 
		patterns of our native VideoPlayer. Something to note: The initial call to the YouTube API actually loads in an iFrame, so there can be a delay 
		when first seeing your player, there is nothing that can be doen about that. Since it is loading an iFrame, things such as the controls, fullscreen
		ability, showing video info are set on the load. This class can toggle those things, but it will cause the whole iFrame to reload.  If you are only
		changing videos, with no other updates, there will be a seemless transition to the next video.

	Sample Players:
		(start code)
		adData.elements.videoPlayer = new YouTubePlayer({
			id: 'intro',
			target: adData.elements.redAdContainer,
			css : {
				x: 0,
				y: 0,
				width : 446,
				height : 250
			},

			videoId: 'EcB59kdjJfw',
			autoPlay: true,
			muted: true,
			quality: 'hd720',
			showInfo: false,
			inlineYouTubeLogo: true,
			allowFullScreen: false,
			allowAnnotations: true,

			onReady: null,
			onComplete : null,
			onPlay: null,
			onPause: null,
			onBuffer: null,
			onFail: null,

			controls: false,

			preview: {
				css : {
					backgroundImage : ImageManager.get('btnPlay').src,
					backgroundRepeat : 'no-repeat',
					backgroundPosition : '50% 50%',
					backgroundSize: '40px 40px'
				},
				time: 25,
				videoId : 'ogzsxeJ3oPY',
				onClick: handlePreviewVideoSkip,
				onComplete: null
			}	
		});	

		function handlePreviewVideoSkip(){
			adData.elements.videoPlayer.unmute();
			adData.elements.videoPlayer.controls(true);
		}
		(end code)
		
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */

function YouTubePlayer ( arg ){

	var V = this;

	V.id = (arg.id || '' + Date.now()) + '-youTubePlayer';
	V.css = arg.css;

	V.muted = !!arg.muted;

	/**	Variable: paused
			A Boolean representing if the video is playing. */
	V.paused = !arg.autoPlay;
	
	/**	Variable: percent
			A Number 0-1 representing the video timeline percent position. */
	V.percent = 0;
	
	/**	Variable: currentTime
			A Number representing the video time position. */
	V.currentTime = 0;
	V.duration = 0;

	/**	Variable: complete
			A Boolean representing if the video has ended. */
	V.complete = false;
	
	// Constructor arguments
	/**	Variable: onReady
			A callback for when the Video is able to be played.  Can be set as optional parameter on instantiated.  */
	V.onReady = arg.onReady || function(){};

	/**	Variable: onComplete
			A callback for when the Video is finished.  Can be set as optional parameter on instantiated.  */
	V.onComplete = (arg.onComplete || function(){}).bind(V);

	/**	Variable: onFail
			A callback for when the Video fails.  Can be set as optional parameter on instantiated.  */
	V.onFail = (arg.onFail || function(){}).bind(V);

	/**	Variable: onBuffer
			A callback for when the Video pauses due to buffering.  Can be set as optional parameter on instantiated.  */
	V.onBuffer = (arg.onBuffer || function(){}).bind(V);

	/**	Variable: onProgress
			A callback for when as Video progresses while playing.  Can be set as optional parameter on instantiated.  */	
	V.onProgress = (arg.onProgress || function(){}).bind(V);

	/**	Variable: onPlay
			A callback for when as Video plays, helpful since controls are internal to iFrame.  Can be set as optional parameter on instantiated.  */
	V.onPlay = (arg.onPlay || function(){}).bind(V);

	/**	Variable: onPause
			A callback for when as Video pauses, helpful since controls are internal to iFrame.  Can be set as optional parameter on instantiated.  */
	V.onPause = (arg.onPause || function(){}).bind(V);
	
	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PRIVATE PROPERTIES
	var _videoId = arg.videoId;
	var _autoPlay = arg.autoPlay;
	var _sourceCalled = false;
	var _readyHeard = false;

	// a class level object holding the NEXT state of the player, used in conjunction with getter/setters

	var _classPlayerParams = {
		autoplay : arg.autoPlay ? 1 : 0,
		controls: arg.controls ? 1 : 0,
		showinfo: arg.showInfo ? 1 : 0,
		modestbranding: arg.inlineYouTubeLogo ? 0 : 1,
		fs: arg.allowFullScreen ? 1 : 0,
		rel: arg.showRelatedVideos ? 1 : 0,
		iv_load_policy:  arg.allowAnnotations ? 1 : 3,
		vq: arg.quality || 'medium'
	}

	// a player level obect holding the current state of the player when instantiated. Initally equal to _classPlayerParams
	var _currentPlayerParams = {};
	for ( var p in _classPlayerParams ){
		_currentPlayerParams[p] = _classPlayerParams[p];
	}

	var _cuePoints = {
		pool : [],
		first : null,
		active : false,
		seeked : false
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// MARKUP	
	arg.id = V.id;
	if ( !arg.css.hasOwnProperty('backgroundColor') ) 
		arg.css.backgroundColor = '#000000';

	/**	Variable: container
			A <div>, the top level container for the entire player instance. */
	V.container = Markup.addDiv(arg);

	var holder = document.createElement('div');
	holder.width = V.css.width;
	holder.height = V.css.height;
	holder.style.position = 'absolute';
	V.container.appendChild(holder);
			
	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PUBLIC METHODS
	/**	Method: hide()
			Hides the entire player.
		> myVideoPlayer.hide();
	*/
	V.hide = function(){
		V.player.f.style.display = 'none';
	}

	/**	Method: show()
			Shows the entire player.
		> myVideoPlayer.show();
	*/
	V.show = function(){
		try {
			//trace ( "     try V.player.f.style.removeProperty ( 'display' )")
			V.player.f.style.removeProperty ( 'display' );
		} catch (e) {
			//trace ( '     catch V.player.f.style.display = null;')
			V.player.f.style.display = null;
		}
	}

	/**	Method: play()
			Plays the current video.
		> myVideoPlayer.play();
	*/
	V.play = function(){
		//trace ( ' -- YouTubePlayer.play()')
		V.player.playVideo();
	}

	/**	Method: pause()
			Pauses the current video.
		> myVideoPlayer.pause();
	*/	
	V.pause = function(){
		//trace ( ' -- YouTubePlayer.pause()')
		V.player.pauseVideo();
	}

	/**	Method: seek()
			Skips the video to a specific time.

		Parameters:
			sec 	- The time to skip the video to in seconds.

		> myVideoPlayer.seek(4);
	*/
	V.seek = function( sec ) {
		trace ( 'seekTo:', sec)
		_cuePoints.seeked = true;
		if ( sec > V.duration ) sec = V.duration;
		else V.complete = false;
		V.player.seekTo( sec );
	}

	//V.stop = function(){}

	/**	Method: addCuePoint()
			Add to the load queue: a single or array of files or even another Loader.

		Parameters:
			time 		- The time, inseconds, to fire the call back.
			handler 	- A callback function
			params 		- Optional parameters to pass back through the call back
		
		(start code)
			myVideoPlayer.addCuePoint ( 3, handleCuePoint, [ true, .3, {} ])

			function handleCuePoint ( isVar, num, obj ){
				trace ( 'cue point', isVar, num, obj );
			}			
		(end code)
	*/
	V.addCuePoint = function( time, handler, params ){
		_cuePoints.active = true;
		var cuePoint = {
			time : time,
			handler : handler,
			frame : -1,
			params : params || null,
			past : false
		}
		_cuePoints.pool.push ( cuePoint );

		_cuePoints.pool.sort(function(a, b) {
			return a.time - b.time;
		});
		//_cuePoints.first = _cuePoints.pool[0].time;
		trace ( 'add:', _cuePoints )
	}

	//V.resize = function(){}

	/**	Method: mute()
			Mutes the Video Player, does not change the volume.
		> myVideoPlayer.mute()
	*/
	V.mute = function() {
		if ( V.player.mute )	
			V.player.mute();
		V.muted = true;
	}

	/**	Method: unmute()
			Unmutes the Video Player, does not change the volume.
		> myVideoPlayer.unmute()
	*/
	V.unmute = function() {
		if ( V.player.unMute ) 
			V.player.unMute();
		V.muted = false;
	}
		
	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// GETTERS | SETTERS
	
	/**	Method: volume(Number)
			Set: Changes the volume of the video.  Pass a number to set the volume.  If the parameter is null, it returns the current volume.

		Parameters:
			val 	- A number, between 0 - 1 to set the volume to.
		
		(start code)
			myVideoPlayer.volume(.8);			
		(end code)
	*/
	V.volume = function(val){
		// GET
		//if ( val == undefined ) return video.volume;	

		// SET
		V.player.setVolume( val );
	}
	
	/**	Method: source(String)
			Get|Set: Changes the source of the video.  Pass a string of the video YouTube ID to set.  If the parameter is null, it returns the current value.

		Parameters:
			src 	- A string of the video YouTube ID.
		
		(start code)
			// GET
			var source = myVideoPlayer.source();

			// SET
			myVideoPlayer.source('k_5IXGmoLMY');			
		(end code)
	*/
	V.source = function(src){
		// GET
		if ( src == undefined ) return _videoId;

		// SET		
		_sourceCalled = true;
		_videoId = src;
		
		FrameRate.unregister ( V, handleTimeUpdate, 3 );

		if ( _readyHeard ){
			updateSource();
		}
	}
	
	/**	Method: autoPlay(Boolean)
			Get|Set: Changes if the video will automatically play.  Pass a boolean to set.  If the parameter is null, it returns the current value.

		Parameters:
			active 	- A boolean whether to enable/disable.
		
		(start code)
			// GET
			var isAutoPlay = myVideoPlayer.autoPlay();

			// SET
			myVideoPlayer.autoPlay(false);			
		(end code)
	*/
	V.autoPlay = function(active){
		// GET
		if ( active == undefined ) return video.autoplay;

		// SET
		_autoPlay = active;
	}

	
	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// GETTERS | SETTERS for on reload / next video
	/**	Method: controls(Boolean)
			Get|Set: Changes if the player has controls/progress bar.  Pass a boolean to set.  If the parameter is null, it returns the current value.
			NOTE: Requires a iFrame reload, so only take place on a video load or replay 

		Parameters:
			state 	- A boolean whether or not controls are displayed
		
		(start code)
			// GET
			var hasControls = myVideoPlayer.controls();

			// SET
			myVideoPlayer.controls(false);			
		(end code)
	*/
	V.controls = function(state){
		// GET
		if ( state == undefined ) return _classPlayerParams.controls;	

		// SET
		_classPlayerParams.controls = state ? 1 : 0 ;
	}

	/**	Method: allowFullScreen(Boolean)
			Get|Set: Changes if the player has the fullscreen button.  Pass a boolean to set.  If the parameter is null, it returns the current value.
			NOTE: Requires a iFrame reload, so only take place on a video load or replay 

		Parameters:
			state 	- A boolean whether or not the fullscreen button is displayed
		
		(start code)
			// GET
			var canFullScreen = myVideoPlayer.allowFullScreen();

			// SET
			myVideoPlayer.allowFullScreen(false);			
		(end code)
	*/
	V.allowFullScreen = function(state){
		// GET
		if ( state == undefined ) return _classPlayerParams.fs;	

		// SET
		_classPlayerParams.fs = state ? 1 : 0 ;
	}

	/**	Method: quality(String)
			Get|Set: Changes the playback quality of the video.  Pass a string to set.  If the parameter is null, it returns the current value.
			NOTE: Requires a iFrame reload, so only take place on a video load or replay 

		Parameters:
			str 	- A string representing the quality type, follows YouTube paradigm
		
		(start code)
			// GET
			var canFullScreen = myVideoPlayer.quality();

			// SET
			myVideoPlayer.quality('hd720');			
		(end code)
	*/
	V.quality = function(str){
		// GET
		if ( str == undefined ) return _classPlayerParams.vq;

		// SET 
		_classPlayerParams.vq = str;

		// manually set thru API
		V.player.setPlaybackQuality( str );
		// assign to current params to avoid a player reload unnecessarily
		_currentPlayerParams.vq = str;
	}


	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PROTECTED METHODS
	V._addPreview = function(src){
		var originalVideoId = _videoId;
		_videoId = src || _videoId;

		return originalVideoId;
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PRIVATE METHODS
	function updateSource(){
		
		if ( checkPlayerParams() ){
			_readyHeard = false;
			createPlayer();
		} else {
			V.player.cueVideoById ( _videoId ); //.loadVideoById
		}
	}

	function createPlayer(){
		if ( V.player ) {
			V.player.destroy();
			if ( V.previewButton ) V.previewButton.hide();
		}
		V.player = new YT.Player( holder, {
			width: arg.css.width,
			height: arg.css.height,
			videoId: _videoId,
			playerVars: _currentPlayerParams
		});
		V.player.addEventListener ( 'onReady', handlePlayerReady );
		V.player.addEventListener ( 'onStateChange', handleStateChange );
		V.player.addEventListener ( 'onError', V.onFail );
	}

	function checkPlayerParams(){
		var recreate = false;
		trace ( 'checkPlayerParams():', _currentPlayerParams )
		for ( var p in _classPlayerParams ){
			trace ( '     ->', p, '=', _currentPlayerParams[p], _classPlayerParams[p] )
			if ( _currentPlayerParams[p] != _classPlayerParams[p] ){
				_currentPlayerParams[p] = _classPlayerParams[p]
				recreate = true;
				trace ( '   ==== RECREATE ====')
			}
		}
		
		return recreate;
	}

	function checkCuePoint (){
		if ( _cuePoints.active ){ //&& V.currentTime > _cuePoints.first ){
			for ( var i = 0; i < _cuePoints.pool.length; i++ ){
				if ( _cuePoints.seeked ) {
					_cuePoints.pool[i].past = ( _cuePoints.pool[i].time < V.currentTime );
				} else {
					if ( _cuePoints.pool[i].time < V.currentTime && !_cuePoints.pool[i].past ){
						_cuePoints.pool[i].handler.apply( V, _cuePoints.pool[i].params )
						_cuePoints.pool[i].past = true;
					}
				}
			}
		}
		_cuePoints.seeked = false;
	}
	
	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// EVENT HANDLERS
	function handlePlayerReady ( event ){
		trace ( ' -- READY -- handlePlayerReady()')
		_readyHeard = true;
		
		if ( _sourceCalled ){
			updateSource();
			return;
		}
		
		//V.duration = V.player.getDuration();
		
		if ( arg.autoPlay ) {
			// autoplay set on the init object, no need to call
			V.muted ? V.player.mute() : V.player.unMute() ;
			if ( V.preview instanceof YouTubePlayer ){ 
				V.preview.start();
			}
		}		
		
		V.onReady.call( V, event );
	}

	function handleStateChange ( event ){
		//trace ( ' -- YoutubePlayer stageChange()', event );
		switch( event.data ) {
			case YT.PlayerState.UNSTARTED:
				//trace ( ' UNSTARTED = -1' )
				V.muted ? V.player.mute() : V.player.unMute() ;
				if( arg.autoPlay ) V.play();
				
				V.paused = true;
				break;

			case YT.PlayerState.BUFFERING:
				//trace ( ' BUFFERING = 3' )
				V.onBuffer.call();
				break;

			case YT.PlayerState.PLAYING:
				//trace ( ' PLAYING = 1', V.player.getDuration() )
				V.duration = V.player.getDuration();
				V.paused = false;

				// checks for a SEEK faux event, for use with cue points
				if (Math.abs(V.player.getCurrentTime() - V.currentTime) > 0.5) {
					_cuePoints.seeked = true;
				}

				FrameRate.register ( V, handleTimeUpdate, 3 );
				V.onPlay.call( V, event );
				break;	

			case YT.PlayerState.ENDED:
			//	trace ( ' ENDED = 0' )
				handleComplete(event);

			case YT.PlayerState.PAUSED:
			//	trace ( ' PAUSED = 2' );
				V.paused = true;
				FrameRate.unregister ( V, handleTimeUpdate, 3 );
				V.onPause.call( V, event );
				break;				
		}
		//trace ( '----------------------------------------------')
	}

	function handleTimeUpdate (){
		V.currentTime = V.player.getCurrentTime();
		V.percent = V.currentTime / V.duration;

		//trace ( '-#####-', V.player.getPlayerState(), ':', V.currentTime, '/', V.duration, '|', V.percent )
		V.onProgress.call( V );

		checkCuePoint();
		if ( V.player.getCurrentTime() >= V.player.getDuration() ){
			V.pause();
		}
	}

	function handleComplete(event){
		trace ( 'VideoPlayer.handleComplete ( event )', event )
		// this ensures the ue points get reset
		_cuePoints.seeked = true;

		V.paused = true;
		V.complete = true;
		V.onComplete.call(this, event);
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// INIT

	// UIpreviewButton
	V.preview = arg.preview ? new UIPreviewOverlay( V, arg.preview ) : {};

	createPlayer();
	
	return V;
}
