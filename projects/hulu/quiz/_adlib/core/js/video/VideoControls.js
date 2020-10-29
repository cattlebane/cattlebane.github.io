/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	VideoControls

	Description:
		This object creates the Video Controls for a VideoPlayer instance.  This can be called by passing in through the instantiation object of a VideoPlayer
		instance or it can be called after the fact.

	Sample Players:
		(start code)
			// VideoPlayer with default controls
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
					},
					include : {
						screenButton : {
							css : {
								width : 100,
								height : 100
							},
							active : ImageManager.get('btnReplay'),
							type : 'replay'
						},
						progressControl : true,
						buttonPlayPause : {
							active : ImageManager.get('btnPlay'),
							inactive : ImageManager.get('btnPause')
						},
						buttonMute : {
							active : ImageManager.get('btnMute'),
							inactive : ImageManager.get('btnUnMute')
						},
						timeDisplay : {
							textStyles : {
								fontSize : 14,
								fontFamily : 'Arial'
							},
							showDuration : false
						},
						volumeSlider : true,
						buttonFullScreen : {
							active : ImageManager.get('btnFullScreen')
						}
					}
				}
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
function VideoControls(player, arg){

	var U = document.createElement('div');

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// BASE CSS
	var getSheet = document.getElementById('RED_videoControlsSheet');
	if ( !getSheet ){
		var cssRules = ".rvp-controls { width:inherit; height:inherit; vertical-align:bottom; display:table-cell; }"
		cssRules += ".rvp-controlbar { width:100%; height:30px; position: relative; }"

		var styleScript = document.createElement('style');
		styleScript.type = 'text/css';
		styleScript.media = 'screen';
		styleScript.id = 'RED_videoControlsSheet';
		styleScript.appendChild(document.createTextNode( cssRules ));
		document.getElementsByTagName( 'head' )[0].appendChild( styleScript );
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PRIVATE PROPERTIES
	var _includeList = [ 'screenButton', 'progressControl', 'buttonPlayPause', 'buttonReplay', 'timeDisplay', 'buttonFullScreen', 'volumeSlider', 'buttonMute' ];
	var _timeout;
	var _isOver = false;
	var _enabled = true;
	var _replayOnInteraction = false;
	var _unmuteOnInteraction = false;
	var _showOnPoster = arg.showOnPoster != false;
	var _constant = !!arg.constant;

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// GETTER | SETTTER

	/**	Method: enabled(Boolean)
			Get|Set: Changes the event handling state of the controls, without effecting its display properties. If the parameter is null, it returns the current active state.

		Parameters:
			state 	- A boolean, either true or false.
		
		(start code)
			// GET
			var enabled = myVideoPlayer.controls.enabled();

			// SET
			myVideoPlayer.controls.enabled(false);			
		(end code)
	*/
	U.enabled = function(state){
		// GET
		if ( state == undefined ) return _enabled;	

		// SET
		_enabled = state;
		controlListeners ( state );
		/*if ( state ){
			U.controlBar.show();
			U.progressControl.show();
			handleMove(null);
		} else {
			U.controlBar.hide();
			U.progressControl.hide();
			hide(0);
		}*/
	}

	/**	Method: replayOnInteraction(Boolean)
			Get|Set: Changes if the video player will start over on any click interaction.

		Parameters:
			state 	- A boolean, either true or false.
		
		(start code)
			// GET
			var replayOnInteraction = myVideoPlayer.controls.replayOnInteraction();

			// SET
			myVideoPlayer.controls.replayOnInteraction(false);			
		(end code)
	*/
	U.replayOnInteraction = function(state){
		// GET
		if ( state == undefined ) return _replayOnInteraction;	

		// SET
		_replayOnInteraction = state;

		if ( !_enabled ) state = false;

		var listener = state ? 'addEventListener' : 'removeEventListener' ; 
		Gesture[listener]( U.controlBar, GestureEvent.CLICK, handleReplayOnInteraction );
		Gesture[listener]( U.progressControl, GestureEvent.CLICK, handleReplayOnInteraction );		
	}

	/**	Method: unmuteOnInteraction(Boolean)
			Get|Set: Changes if the video player will unmute on any click interaction.

		Parameters:
			state 	- A boolean, either true or false.
		
		(start code)
			// GET
			var unmuteOnInteraction = myVideoPlayer.controls.unmuteOnInteraction();

			// SET
			myVideoPlayer.controls.unmuteOnInteraction(false);			
		(end code)
	*/
	U.unmuteOnInteraction = function(state){
		// GET
		if ( state == undefined ) return _unmuteOnInteraction;	

		// SET
		_unmuteOnInteraction = state;
			
		if ( !_enabled ) state = false;

		var listener = state ? 'addEventListener' : 'removeEventListener' ; 
		Gesture[listener]( U.controlBar, GestureEvent.CLICK, handleUnmuteOnInteraction );
		Gesture[listener]( U.progressControl, GestureEvent.CLICK, handleUnmuteOnInteraction );		
	}

	/**	Method: showOnPoster(Boolean)
			Get|Set: Changes if the controls will show when the video player is complete and the poster is showing.

		Parameters:
			state 	- A boolean, either true or false.
		
		(start code)
			// GET
			var showOnPoster = myVideoPlayer.controls.showOnPoster();

			// SET
			myVideoPlayer.controls.showOnPoster(false);			
		(end code)
	*/
	U.showOnPoster = function(state){
		// GET
		if ( state == undefined ) return _showOnPoster;

		// SET 
		_showOnPoster = state;
	}

	/**	Method: constant(Boolean)
			Get|Set: Changes if the controls will be persistent and never hide.

		Parameters:
			state 	- A boolean, either true or false.
		
		(start code)
			// GET
			var constant = myVideoPlayer.controls.constant();

			// SET
			myVideoPlayer.controls.constant(false);			
		(end code)
	*/
	U.constant = function(state){
		// GET
		if ( state == undefined ) return _constant;

		// SET 
		_constant = state;
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PUBLIC METHODS
	/**	Method: hide()
			Visually removes the controls from the DOM by setting its display property to none

		> myVideoPlayer.controls.hide();
	*/
	U.hide = function(){
		U.controlBar.hide(true);
		U.progressControl.hide(true);
		clearTimeout(_timeout);
	}

	/**	Method: show()
			Visually displays the controls in the DOM
		
		> myVideoPlayer.controls.show();
	*/
	U.show = function(){
		U.progressControl.show(true);
		handleMove(null);
		
		for ( var i = 2; i < _includeList.length; i++ ){
			if ( !U[_includeList[i]].showing() ){
				U.controlBar.show(true);
				break;
			}
		}
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// MARKUP
	arg.include = arg.include || {};
	for ( var i = 0; i < _includeList.length; i++ ){
		var name = _includeList[i];
		if ( !checkInstance(name) ) 
			arg.include[name] = false;
	}

	/**	Variable: screenButton
			Public access to the UIScreenButton instance. */
	U.screenButton = new UIScreenButton ( player, {
		id : player.id + '-screenButton',
		target : player.container,
		css : arg.include.screenButton.css || {},
		active : arg.include.screenButton.active || null,
		inactive : arg.include.screenButton.inactive || null,
		constant : arg.include.screenButton.constant,
		type : arg.include.screenButton.type,
		once : arg.include.screenButton.once
	});

	// Controls Container
	U.setAttribute('class', 'rvp-controls');
	U.id = player.id;
	player.container.appendChild( U );
	
	/**	Variable: progressControl
			Public access to the UIProgress instance. */
	U.progressControl = new UIProgress ( player, {
		id : player.id + '-progressControl',
		target : U,
		css : arg.include.progressControl.css || {
			height:10
		},
		loaded : arg.include.progressControl.loaded || true,
		bg : arg.include.progressControl.bg || true,
		track : arg.include.progressControl.track || true,
		handle : arg.include.progressControl.handle || false
	});

	/**	Variable: controlBar
			Public access to the UIControlBar instance. */
	U.controlBar = new UIControlBar ({
		target : U,
		css : arg.css
	})

	/**	Variable: buttonFullScreen
			Public access to the UIButtonFullScreen instance. */
	U.buttonFullScreen = new UIButtonFullScreen ( player, {
		id : player.id + '-buttonFullScreen',
		target : U.controlBar,
		css : arg.include.buttonFullScreen.css || {
			float : 'right'
		},
		active : arg.include.buttonFullScreen.active || null
	});

	/**	Variable: volumeSlider
			Public access to the UIVolumeSlider instance. */
	U.volumeSlider = new UIVolumeSlider ( player, {
		id : player.id + '-volumeSlider',
		target : U.controlBar,
		css : arg.include.volumeSlider.css || {
			width : 70,
			//height : 30,
			float:'right'
		},
		bg : arg.include.volumeSlider.bg || {
			height:'30%',
			top:'35%'
		},
		track : arg.include.volumeSlider.track || {
			height:'30%',
			top:'35%'
		},
		handle : arg.include.volumeSlider.handle || {
			height:'70%',
			top:'15%'
		}
	});	

	/**	Variable: buttonMute
			Public access to the UIButtonMute instance. */
	U.buttonMute = new UIButtonMute ( player, {
		id : player.id + '-buttonMute',
		target : U.controlBar,
		css : arg.include.buttonMute.css || {
			float : 'right'
		},
		active : arg.include.buttonMute.active || null,
		inactive : arg.include.buttonMute.inactive || null
	});
	
	/**	Variable: buttonReplay
			Public access to the UIButtonReplay instance. */
	U.buttonReplay = new UIButtonReplay ( player, {
		id : player.id + '-buttonReplay',
		target : U.controlBar,
		css : arg.include.buttonReplay.css || {
			float : 'left'
		},
		active : arg.include.buttonReplay.active || null
	});

	/**	Variable: buttonPlayPause
			Public access to the UIButtonPlayPause instance. */
	U.buttonPlayPause = new UIButtonPlayPause ( player, {
		id : player.id + '-buttonPlayPause',
		target : U.controlBar,
		css : arg.include.buttonPlayPause.css || {
			float : 'left'
		},
		active : arg.include.buttonPlayPause.active || null,
		inactive : arg.include.buttonPlayPause.inactive || null
	});

	/**	Variable: timeDisplay
			Public access to the UITimeDisplay instance. */
	U.timeDisplay = new UITimeDisplay ( player, {
		id : player.id + '-timeDisplay',
		target : U.controlBar,
		css : arg.include.timeDisplay.css || {
			float : 'left'
		},
		textStyles : arg.include.timeDisplay.textStyles || {},
		showDuration : arg.include.timeDisplay.showDuration
	})

	if ( arg.inlineProgressControl ){
		U.controlBar.appendChild( U.progressControl );
		U.progressControl.style.float = 'left';
	}	

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PRIVATE METHODS
	function checkInstance ( name ){
		return arg.include[name] != undefined && arg.include[name] != false;
	}

	function animateOut( time ){
		time = time != undefined ? time : .5 ;
		TweenLite.to ( [ U.progressControl, U.controlBar ], time, { alpha:0 })
	}

	function animateIn(){
		TweenLite.to ( [ U.progressControl, U.controlBar ], .3, { alpha:1 })
	}

	function hideTimeout ( time ){
		return setTimeout(function(){
			if ( !player.paused && !_isOver && !_constant ) animateOut();
		}, time )
	}

	function controlListeners ( enable ){
		var listener = enable ? 'addEventListener' : 'removeEventListener' ;

		// roll over / out
		U.progressControl[listener]( 'mouseover', handleOver );
		U.progressControl[listener]( 'mouseout', handleOut );
		U.controlBar[listener]( 'mouseover', handleOver );
		U.controlBar[listener]( 'mouseout', handleOut );

		U[listener]( 'mousemove', handleMove );
		player.screen[listener]( 'mousemove', handleMove );
		U.screenButton[listener]( 'mousemove', handleMove );
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// EVENT HANDLERS
	function handlePlayReplayToggle ( event ){
		U.buttonPlayPause.hide();
	}

	function handleMove ( event ){
		clearTimeout(_timeout);
		_timeout = hideTimeout(1500);
		if ( !player.complete ) animateIn();
	}

	function handlePlay ( event ){
		controlListeners ( !_constant && _enabled );
		if ( _enabled ) animateIn();
		if ( !_constant ) _timeout = hideTimeout(2000);
	}

	function handleOver ( event ){
		_isOver = true;
	}

	function handleOut ( event ){
		_isOver = false;
	}

	function handleEnded ( event ){
		controlListeners ( false );
		_showOnPoster ? animateIn() : animateOut();
	}

	function handleReplayOnInteraction ( event ){
		player.seek(0);
		player.play();
		U.replayOnInteraction(false);
	}

	function handleUnmuteOnInteraction ( event ){
		player.unmute();
		U.unmuteOnInteraction(false)
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// INIT
	U.enabled ( arg.enabled != false );

	U.controlBar.hide(true);
	for ( var i = 0; i < _includeList.length; i++ ){
		var name = _includeList[i];
		if ( !checkInstance(name) ) {
			trace ( '   hide:', name )
			U[name].hide(true);
			U[name].enabled(false);
		} else {
			if ( name != 'progressControl' && name != 'screenButton' ){
				U.controlBar.show(true);
			}
		}
	}

	if ( checkInstance('buttonReplay') ){
		player.screen.addEventListener('ended', handlePlayReplayToggle, false);
		player.screen.addEventListener('stop', handlePlayReplayToggle, false);
	}

	player.screen.addEventListener ( 'play', handlePlay );
	player.screen.addEventListener ( 'ended', handleEnded, false);
	player.screen.addEventListener ( 'stop', handleEnded, false);

	U.replayOnInteraction ( !!arg.replayOnInteraction );
	U.unmuteOnInteraction ( !!arg.unmuteOnInteraction );
	
	return U;
}
