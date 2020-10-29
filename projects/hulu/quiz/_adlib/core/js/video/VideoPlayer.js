/*
http://www.w3schools.com/tags/ref_av_dom.asp
http://www.w3.org/2010/05/video/mediaevents.html
http://docs.brightcove.com/en/perform/brightcove-player/guides/components.html
*/
/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	VideoPlayer

	Description:
		This object creates a custom Video Player instance

	Sample Players:
		(start code)
			// Basic VideoPlayer
			adData.elements.videoPlayer = new VideoPlayer({
				source: adParams.videosPath + 'RED_Html5_Showcase_300x250.mp4',
				target: adData.elements.redAdContainer,
				id: 'My_Unique_ID',
				css: {
					x:0,
					y:0,
					width: 300,
					height: 250
				},
				autoPlay: true,
				muted: false,
				volume: .8
			});
		(end code)

		(start code)
			// Full VideoPlayer with all options and controls
			adData.elements.videoPlayer = new VideoPlayer({
				source: adParams.videosPath + 'RED_Html5_Showcase_300x250.mp4',
				target: adData.elements.redAdContainer,
				id: 'My_Unique_ID',
				css: {
					x:0,
					y:0,
					width: 300,
					height: 250
				},
				autoPlay: true,
				muted: true,
				volume: .8,

				onReady: function(event){
				},
				onComplete: function(event){
				},
				onFail: function(event){
				},

				poster : ImageManager.get('poster'),
				
				controls : {
					showOnPoster : true,
					constant : true,
					enabled : true,
					replayOnInteraction : false,
					unmuteOnInteraction : false,
					inlineProgressControl : false,
					
					css : {
						backgroundColor : 'rgba(0,0,0,.7)'
						//height : 30
					},

					include : {
						screenButton : {
							css : {
								width : 100,
								height : 100
							},
							active : ImageManager.get('btnReplay'),
							//inactive : ImageManager.get('btnPause'),
							type : 'replay',
							constant : true,
							once : true
						},
						progressControl : {
							css : {
								height : 10
							},
							bg : {
								backgroundColor:'#808080'
							},
							loaded : {
								backgroundColor:'#843e3e'
							},
							handle : {
								backgroundColor:'#ffffff',
								width : 10
							}
						},
						buttonPlayPause : {
							css : {
								float : 'left' // DEFAULT
							},
							// set the active (PLAY) and inactive (PAUSE) to a created div with an backgroundImage to control its css
							active : Markup.addDiv({
								//id: SET INTERNALLY, this id will be renamed to 'myVid-videoPlayer-buttonPlayPause-active'
								//target: SET INTERNALLY, this gets added to 'myVid-videoPlayer-buttonPlayPause'
								css: {
									x:5,
									y:5,
									width: 20,
									height: 20,
									backgroundImage : ImageManager.get('btnPlay').src
								}
							}),
							inactive : Markup.addDiv({
								css: {
									x:5,
									y:5,
									width: 20,
									height: 20,
									backgroundImage : ImageManager.get('btnPause').src
								}
							})
						},
						buttonMute : {
							css : {
								float : 'right' // DEFAULT
							},
							// set the active (MUTE) and inactive (UNMUTE) images directly to the container
							active : ImageManager.get('btnMute'),
							inactive : ImageManager.get('btnUnMute')
						},
						buttonReplay : {
							css : {
								float : 'left' // DEFAULT
							},
							active : Markup.addDiv({
								css: {
									x:5,
									y:5,
									width: 20,
									height: 20,
									backgroundImage : ImageManager.get('btnReplay').src
								}
							})
						},
						timeDisplay : {
							css : {
								float : 'right' // DEFAULT
							},
							textStyles : {
								fontSize : 14,
								fontFamily : 'Arial'
							},
							showDuration : false
						},
						volumeSlider : {
							css : {
								float : 'right', // DEFAULT
								width : 70		 // DEFAULT
							},
							bg : {
								height:'30%',
								top:'35%'
							},
							track : {
								height:'30%',
								top:'35%'
							},
							handle : {
								height:'70%',
								top:'15%',
								width: 5
							}
						},
						buttonFullScreen : {
							css : {
								float : 'right' // DEFAULT
							},
							active : Markup.addDiv({
								css: {
									x:5,
									y:5,
									width: 20,
									height: 20,
									backgroundImage : ImageManager.get('btnFullScreen').src
								}
							})
						}
					}
				}
			});
		(end code)
		
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */

var VideoPlayer = function VideoPlayer(arg){
	
	// Adds custom css rules: 
	// - removes the big semi transparent play button over the video screen
	Styles.createClass ( 'RED_videoPlayer', 
		'video::-webkit-media-controls-start-playback-button', 'display: none !important; -webkit-appearance: none;'
	)

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	var V = this;

	V.id = (arg.id || '' + Date.now()) + '-videoPlayer';
	V.css = arg.css;

	/**	Variable: paused
			A Boolean representing if the video is playing. */
	V.paused = !arg.autoPlay;

	/**	Variable: percent
			A Number 0-1 representing the video timeline percent position. */
	V.percent = 0;

	/**	Variable: currentTime
			A Number representing the video time position. */
	V.currentTime = 0;

	/**	Variable: complete
			A Boolean representing if the video has ended. */
	V.complete = false;
	

	// Constructor arguments

	/**	Variable: onReady
			A callback for when the Video is able to be played.  Can be set as optional parameter on instantiated.  */
	V.onReady = (arg.onReady || function(){}).bind(V);
	//var _onStart = (arg.onStart || function(){}).bind(V);

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
	
	var _IEuseEvent = false;
	var _cuePoints = {
		pool : [],
		first : null,
		active : false,
		seeked : false
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// MARKUP
	
	// main container
	arg.id = V.id;

	// allow control bar to sit on bottom when using % for width/height
	arg.css.display = 'table'

	/**	Variable: container
			A <div>, the top level container for the entire player instance. */
	V.container = Markup.addDiv(arg);

	// video element
	var video = document.createElement('video');
	video.id = V.id + '-screen';
	video.style.width = 'inherit';
	video.style.height = 'inherit';
	video.style.position = 'absolute';
	video.style.backgroundColor = '#000';
	video.autoplay = !!arg.autoPlay;
	//video.volume = arg.volume || 1;
	video.muted = !!arg.muted;
	video.preload = !!arg.preload ? 'auto' : 'none';
	
	if ( arg.addChild != false ) V.container.appendChild( video );

	/**	Variable: screen
			the <video> element. */
	V.screen = video;
			
	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PUBLIC METHODS
	/**	Method: load()
			Loads the current video source. If preload is true, this is redundant.
		> myPlayer.load();
	*/	
	V.load = function(){
		trace ( 'VideoPlayer.load()' )
		video.load();
	}

	/**	Method: play()
			Plays the current video.
		> myPlayer.play();
	*/	
	V.play = function(){
		trace ( 'VideoPlayer.play()' )

		V.complete = false;

		// In Safari, if the preload=none attribute is present, plays will not fire when called manually
		video.removeAttribute('preload');

		video.play();

		if ( _IEuseEvent ){
			trace ( 'VideoPlayer.play -> dispatch custom "play" event')
			video.dispatchEvent(new CustomEvent('play'))
		}
	}
	
	/**	Method: pause()
			Pauses the current video.
		> myPlayer.pause();
	*/	
	V.pause = function(){
		trace ( 'VideoPlayer.pause()' )
		video.pause();
	}

	/**	Method: seek()
			Skips the video to a specific time.

		Parameters:
			sec 	- The time to skip the video to in seconds.

		> myPlayer.seek(4);
	*/
	V.seek = function(sec){
		_cuePoints.seeked = true;
		if ( sec > video.duration ) sec = video.duration;
		else V.complete = false;
		video.currentTime = sec;
		V.currentTime = sec;

		trace ( '\t\tseek()', sec, video.currentTime, V.currentTime )
	}

	/**	Method: stop()
			Stops the video and resets it to the beginning.
		> myPlayer.stop();
	*/	
	V.stop = function(){
		trace ( 'VideoPlayer.stop()' )
		video.pause();
		video.currentTime = 0;
		_stop = true;
		video.dispatchEvent ( new CustomEvent( 'stop' ))
	}

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

	/**	Method: resize()
			Changes the size of the Video Player

		Parameters:
			width 	- A number of the width
			height 	- A number of the height
		
		> myVideoPlayer.resize ( 400, 300 )
	*/
	V.resize = function(width, height){
		video.width = V.css.width = width;
		video.height = V.css.height = height;

		V.container.style.width = width + 'px';
		V.container.style.height = height + 'px';
	}

	/**	Method: mute()
			Mutes the Video Player, does not change the volume.
		> myVideoPlayer.mute()
	*/
	V.mute = function(){
		video.muted = true;
	}

	/**	Method: unmute()
			Unmutes the Video Player, does not change the volume.
		> myVideoPlayer.unmute()
	*/
	V.unmute = function(){
		video.muted = false;
	}

	/**	Method: addControls()
			Adds VideoControls to the VideoPlayer instance. Used only if controls NOT passed thru on instantiation.

		Parameters:
			obj 	- An object of desired controls, see VideoControls.js
		
		(start code)
			myVideoPlayer.addControls ({
				controlBar : {	
					buttonPlayPause : true,
					progressControl : true,
					buttonFullScreen : true
				}
			}
		(end code)	
	*/
	V.addControls = function(obj){
		if ( !V.controls )
			V.controls = new VideoControls ( V, obj );
	}

	V.addPoster = function(obj){
		if ( !V.poster ) 
			V.poster = new UIPoster ( V, obj );
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// GETTERS | SETTERS

	/**	Method: volume(Number)
			Get|Set: Changes the volume of the video.  Pass a number to set the volume.  If the parameter is null, it returns the current volume.

		Parameters:
			val 	- A number, between 0 - 1 to set the volume to.
		
		(start code)
			// GET
			var volume = myVideoPlayer.volume();

			// SET
			myVideoPlayer.volume(.8);			
		(end code)
	*/
	V.volume = function(val){
		// GET
		if ( val == undefined ) return video.volume;	

		// SET
		video.volume = val;
	}

	/**	Method: source(String)
			Get|Set: Changes the source of the video.  Pass a string of the video file path to set.  If the parameter is null, it returns the current source.

		Parameters:
			src 	- A string of the path to the video file.
		
		(start code)
			// GET
			var source = myVideoPlayer.source();

			// SET
			myVideoPlayer.source('videos/myVideoFile.mp4');			
		(end code)
	*/
	V.source = function(src){
		// GET
		if ( src == undefined ) return video.src;

		// SET
		video.src = src;
		return
		var source = document.createElement('source');
		source.src = src;
		source.type = 'video/mp4'
		video.appendChild( source );
	}

	/**	Method: autoPlay(Boolean)
			Get|Set: Changes if the video will automatically play.  Pass a boolean to set.  If the parameter is null, it returns the current source.

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
		active ? video.setAttribute('autoplay','') : video.removeAttribute('autoplay');
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PRIVATE METHODS
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
	function handleLoadedData ( event ){
		trace ( ':: VideoPlayer :: handleLoadedData:', event )
		V.duration = video.duration;
	}

	function handleTimeUpdate ( event ){
		V.currentTime = video.currentTime;
		V.percent = video.currentTime / video.duration;
		V.onProgress.call(V, event);

		checkCuePoint()
	}

	function handleComplete(event){
		trace ( 'VideoPlayer.handleComplete ( event )', event )
		// this ensures the ue points get reset
		_cuePoints.seeked = true;

		V.paused = true;
		V.complete = true;
		V.onComplete.call(this, event);

		_IEuseEvent = ( document.createEventObject != undefined || Device.browser == 'ie' );
		//if ( _IEuseEvent ) V.stop();
	}

	function handlePlayPause(event){
		V.paused = video.paused;
	}


	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// INIT

	

	video.addEventListener('timeupdate', handleTimeUpdate, false);
	video.addEventListener('ended', handleComplete, false);
	video.addEventListener('loadeddata', handleLoadedData, false);
	video.addEventListener('canplay', V.onReady, false);
	video.addEventListener('play', handlePlayPause, false);
	video.addEventListener('pause', handlePlayPause, false);
	video.addEventListener('error', V.onFail, false);
	video.addEventListener('waiting', V.onBuffer, false);
	

	V.source ( arg.source )
	//video.src = arg.source;

	V.volume ( arg.volume || 1 )


	/* ----------------------------------------------------------------------- */
	// COMPONENTS
	if ( arg.poster ) 
		V.addPoster ( arg.poster );

	if ( arg.controls )
		V.addControls ( arg.controls );
}
