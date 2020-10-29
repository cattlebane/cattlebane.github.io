/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	UIVolumeSlider

	Description:
		This object creates the Volume Slider, called INTERALLY from VideoControls.js. This controls the volume functionality of the VideoPlayer. 

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
										
					include : {	
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

function UIVolumeSlider( player, arg ){

	var U = new UISlider(arg);

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PROTECTED METHODS
	U._controlListeners = function(enable){
		var listener = enable ? 'addEventListener' : 'removeEventListener' ;
		
		Gesture[listener] ( U.hitState, GestureEvent.DOWN, handleDown );

		player.screen[listener] ( 'volumechange', handleVolumeChange );
	
		U[listener] ( 'sliderUpdate', handleBaseSliderUpdate );
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// EVENT HANDLERS
	function handleDown ( event ){
		player.screen.muted = false;
	}

	function handleVolumeChange ( event ){
		if ( !U.dragging ){
			var vol = player.screen.muted ? 0 : player.screen.volume;
			U._update ( vol );
		}
	}

	function handleBaseSliderUpdate ( event ){
		player.screen.volume = U.percent;
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// INIT
	U.enabled(true);

	return U;
}