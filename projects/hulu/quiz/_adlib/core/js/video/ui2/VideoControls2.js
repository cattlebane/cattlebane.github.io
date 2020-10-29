function VideoControls2 ( player, arg ){

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// BASE CSS
	
	// declare base componenets first to make sure base css written to head first
	new UIButton2
	new UISlider2

	Styles.createClass ( 'uiVideoControls', 
		'rvp-controls', 'width:inherit; height:inherit;',
		'rvp-controlBar-container', 'width:inherit;	height:inherit; vertical-align:bottom; display:table-cell;',
		'rvp-controlBar', 'width:100%; height:30px; position:relative;',
		'rvp-controlBar-elem', 'position:relative;',
		'rvp-controlBar .left', 'float:left;',
		'rvp-controlBar .right', 'float:right;',
		'rvp-controlBar-container .ui-button-state', 'background-size: 75%;',
		'rvp-controlBar .ui-slider-handle', 'height: 70%; top: 15%;',
		'rvp-controlBar .ui-slider-bg', 'height: 30%; top: 35%;',
		'rvp-controlBar .ui-slider-loaded, rvp-controlBar .ui-slider-track', 'height:30%; top:35%;',
		'rvp-time-display', 'height:inherit; padding:0 5px;',
		'rvp-time-display span', 'white-space: nowrap; font-size: 12pt; color: #ffffff; line-height: 30px;' 
	)

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PRIVATE PROPERTIES
	var _timeout;
	var _replayOnInteraction;
	var _unmuteOnInteraction;
	var _includeList = [ 
		'buttonPlayPause', 
		'buttonReplay', 
		'timeDisplay', 
		'sliderProgress', 
		'buttonFullScreen', 
		'sliderVolume', 
		'buttonMute' 
	];	

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// MARKUP	
	arg.target = arg.target || player.container;
	arg.id = arg.id || 'video-controls';

	var U = new UIComponent ( arg );
	U.classList.add( 'rvp-controls' );

	if ( arg.onScreen ){	
		markup ( arg.onScreen, U )
	}

	if ( arg.onControlBar ){
		U.controlBarContainer = new UIComponent ({
			target : U
		});
		U.controlBarContainer.classList.add( 'rvp-controlBar-container' );

		var cb = arg.onControlBar.controlBar || {}
		U.controlBar = new UIControlBar2 ( player, {
			id : 'controlBar',
			target : U.controlBarContainer,
			css : cb.css || {},
			constant : cb.constant,
			showOnPoster : cb.showOnPoster
		})

		markup ( arg.onControlBar, U.controlBar )
	}

	function markup ( scope, target ){
		for ( var i = 0; i < _includeList.length; i++ ){
			var name = _includeList[i];
			if ( scope[name] != undefined && scope[name] != false ) {
				var params = scope[name];
				params.target = target;
				params.id = target.id + '-' + name;
				target [ name ] = function(){
					switch ( name ){
						case 'buttonPlayPause' 	: 	return new UIButtonPlayPause2 ( player, params );
						case 'buttonReplay' 	: 	return new UIButtonReplay2 ( player, params );
						case 'buttonMute'		: 	return new UIButtonMute2 ( player, params );
						case 'buttonFullScreen'	: 	return new UIButtonFullScreen2 ( player, params );
						case 'sliderVolume'		: 	return new UISliderVolume2 ( player, params );
						case 'sliderProgress'	: 	return new UISliderProgress2 ( player, params );
						case 'timeDisplay'		: 	return new UITimeDisplay2 ( player, params );
					}					
				}()
				if ( target == U.controlBar ){
					if ( name == 'sliderProgress' && !scope.sliderProgress.inline ){
						continue;
					}

					Styles.addClass ( U.controlBar[name], 'rvp-controlBar-elem', i<4?'left':'right' );
				}
			}
		}
		// Moves the progress bar to top of controlBar
		if ( target == U.controlBar ){
			if ( target.sliderProgress && !scope.sliderProgress.inline ) {
				target.sliderProgress.style.position = 'relative'
				U.controlBarContainer.appendChild ( target.sliderProgress )
				U.controlBarContainer.appendChild ( U.controlBar )
			}
		}	
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// GETTER | SETTTER
	Object.defineProperty ( U, 'replayOnInteraction', {
		get: function() {
			return _replayOnInteraction;
		},
		set: function ( state ) {
			_replayOnInteraction = state;

			if ( !U.enabled ) state = false;

			var listener = state ? 'addEventListener' : 'removeEventListener' ; 
			Gesture[listener]( player.container, GestureEvent.CLICK, handleReplayOnInteraction );
		}
	});

	Object.defineProperty ( U, 'unmuteOnInteraction', {
		get: function() {
			return _unmuteOnInteraction;
		},
		set: function ( state ) {
			_unmuteOnInteraction = state;

			if ( !U.enabled ) state = false;

			var listener = state ? 'addEventListener' : 'removeEventListener' ; 
			Gesture[listener]( player.container, GestureEvent.CLICK, handleUnmuteOnInteraction );
		}
	});

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PUBLIC METHODS
	U.toString = function(){
		return '[object VideoControls2]'
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PRIVATE METHODS
	function animateOut( time ){
		trace ( U.toString() + '.animateOut()' )
		time = time != undefined ? time : .5 ;
		if ( U.controlBar && !U.controlBar.constant ) 
			TweenLite.to ( U.controlBar, time, { alpha:0 })
	}

	function animateIn(){
		trace ( U.toString() + '.animateIn()' )
		if ( U.controlBar )
			TweenLite.to ( U.controlBar, .3, { alpha:1 })
	}

	function hideTimeout ( time ){
		return setTimeout(function(){
			if ( !player.paused ) animateOut();
		}, time )
	}
	
	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// EVENT HANDLERS
	function handleMove ( event ){
		clearTimeout(_timeout);
		_timeout = hideTimeout(1500);
		if ( !player.complete ) 
			animateIn();
	}

	function handlePlay ( event ){
		if ( U.enabled ) 
			animateIn();

		if ( U.controlBar && !U.controlBar.constant ) 
			_timeout = hideTimeout(2000);
	}

	function handleReplayOnInteraction ( event ){
		player.seek(0);
		player.play();
		U.replayOnInteraction = false;
	}

	function handleUnmuteOnInteraction ( event ){
		player.unmute();
		U.unmuteOnInteraction = false;
	}

	function handleEnded(event){
		if ( U.controlBar ) {
			U.controlBar.showOnPoster ? animateIn() : animateOut();
			if ( U.controlBar.buttonReplay )
				U.controlBar.buttonPlayPause.hide();
		}
	}

	function handleBaseEnabled ( event ){
		var listener = U.enabled ? 'addEventListener' : 'removeEventListener' ;
		player.container[listener]( 'mousemove', handleMove );
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// INIT
	player.screen.addEventListener ( 'play', handlePlay );
	player.screen.addEventListener ( 'ended', handleEnded, false);
	player.screen.addEventListener ( 'stop', handleEnded, false);	
	U.addEventListener ( 'uiComponentEnabled', handleBaseEnabled );
	
	U.enabled = true;
	U.replayOnInteraction = !!arg.replayOnInteraction;
	U.unmuteOnInteraction = !!arg.unmuteOnInteraction;

	return U;
}
