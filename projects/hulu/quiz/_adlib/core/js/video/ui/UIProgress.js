/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	UIProgress

	Description:
		This object creates the Mute Button, called INTERALLY from VideoControls.js. This controls the mute / unmute functionality of the VideoPlayer. 

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
				
				controls : {
					showOnPoster : true,
					constant : true,
					enabled : true,
					inlineProgressControl : false, // false = progress on top of controlbar, true = inline with all other buttons
										
					include : {	
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
						}
					}
				}
			});
		(end code)
		
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */

	/* Inherited Getters, Setters, and Public Methods from base class UIButton.js */

	/**	Variable: percent
			A Number 0-1 representing the percent position. */
			
	/**	Method: enabled(Boolean)
			Get|Set: Changes the event handling state of the slider, without effecting its display properties. If the parameter is null, it returns the current active state.

		Parameters:
			state 	- A boolean, either true or false.
		
		(start code)
			// GET
			var enabled = myVideoPlayer.controls.progressControl.enabled();

			// SET
			myVideoPlayer.controls.progressControl.enabled(false);			
		(end code)
	*/

	/**	Method: showing(Boolean)
			Get only: Whether or not the slider is displayed in the DOM
				
		> var showing = myVideoPlayer.controls.progressControl.showing();		
	*/

	/**	Method: hide()
			Visually removes the slider from the DOM by setting its display property to none

		Parameters:
			calledInternally 	- Optional Boolean used when part of a larger system, such as the Video Control Bar. Can be called internally but the priority will be when called directly.
		
		> myVideoPlayer.controls.progressControl.hide();
	*/

	/**	Method: show()
			Visually displays the slider in the DOM

		Parameters:
			calledInternally 	- Optional Boolean used when part of a larger system, such as the Video Control Bar. Can be called internally but the priority will be when called directly.
		
		> myVideoPlayer.controls.progressControl.show();
	*/

function UIProgress(player, arg){

	var U = new UISlider(arg);

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PROPERTIES
	var _timeout;
	var _isOver = false;

	U.outDelayTime = 1000;

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PUBLIC METHODS
	U.over = function(){}
	U.out = function(){}

	U.update = function( perc ){
		U._update ( perc );
		handleBaseSliderUpdate();
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PROTECTED METHODS
	U._controlListeners = function(enable){
		trace ( 'UIProgress._controlListeners()', enable )
		var listener = enable ? 'addEventListener' : 'removeEventListener' ;
		
		player.screen[listener]('ended', handleComplete, false);
		player.screen[listener]('play', handlePlay, false);
		player.screen[listener]('pause', handlePause, false);
		player.screen[listener]('loadstart', handleLoadStart, false);

		U[listener]( 'sliderUpdate', handleBaseSliderUpdate );

		Gesture[listener](U, GestureEvent.OVER, handleOver);
		Gesture[listener](U, GestureEvent.OUT, handleOut);
		U[listener]( 'mousemove', handleMove );
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PRIVATE METHODS
	function hideTimeout (){
		return setTimeout(function(){
			if ( !player.paused && !_isOver ) U.out.call();
		}, U.outDelayTime )
	}

	function controlFrameRate ( enable ){
		//trace ( 'UIProgress.controlFrameRate()', enable )
		FrameRate [ enable ? 'register' : 'unregister' ]( U, handleEnterFrame );
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// EVENT HANDLERS
	function handlePlay ( event ){
		controlFrameRate(true);
	}

	function handlePause ( event ){
		controlFrameRate(false);
	}

	function handleComplete ( event ){
		controlFrameRate(false);
		handleEnterFrame();
	}

	function handleProgress (){
		if ( player.screen.buffered.length > 0 ){
			var max = player.screen.buffered.length - 1;
			var perc = player.screen.buffered.end(max) / player.screen.duration;
			U.loaded.style.width = (perc * 100) + '%';
			if ( perc >= .999 )
				FrameRate.unregister( U, handleProgress, 6 );
		}
	}

	function handleBaseSliderUpdate ( event ){
		var time = player.screen.duration * U.percent;
		player.seek ( time );
	}

	function handleEnterFrame(){
		U.percent = player.screen.currentTime / player.screen.duration;
		
		U._update ( U.percent );
	}

	function handleOver ( event ){
		_isOver = true;
	}

	function handleOut ( event ){
		_isOver = false;
	}

	function handleMove ( event ){
		clearTimeout(_timeout);
		_timeout = hideTimeout();
		if ( !player.complete ) U.over.call();
	}

	function handleLoadStart ( event ){
		FrameRate.register( U, handleProgress, 6 );
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// INIT
	U.enabled(true);

	return U;
}