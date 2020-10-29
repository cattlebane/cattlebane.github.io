/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	UIButtonFullScreen

	Description:
		This object creates the FullScreen Button, called INTERALLY from VideoControls.js. This controls the entering into FullScreen mode. 

	Required Classes:
		UIButton.js
		FullScreen.js

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
						buttonFullScreen : {
							// Customize the container
							css : {
								float : 'right' // DEFAULT
							},

							// add an Image directly
							active : ImageManager.get('btnFullScreen')
							
							// OR
							
							// add a div to customize the image size and placement
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

	/* Inherited Getters, Setters, and Public Methods from base class UIButton.js */

	/**	Method: isActive(Boolean)
			Get|Set: Changes the visual state of the button, showing either the active or inactive child element. If the parameter is null, it returns the current active state.

		Parameters:
			state 	- A boolean, either true or false.
		
		(start code)
			// GET
			var isActive = myVideoPlayer.controls.buttonFullScreen.isActive();

			// SET
			myVideoPlayer.controls.buttonFullScreen.isActive(false);			
		(end code)
	*/
	
	/**	Method: enabled(Boolean)
			Get|Set: Changes the event handling state of the Button, without effecting its display properties. If the parameter is null, it returns the current active state.

		Parameters:
			state 	- A boolean, either true or false.
		
		(start code)
			// GET
			var enabled = myVideoPlayer.controls.buttonFullScreen.enabled();

			// SET
			myVideoPlayer.controls.buttonFullScreen.enabled(false);			
		(end code)
	*/
	
	/**	Method: showing(Boolean)
			Get only: Whether or not the button is displayed in the DOM
				
		> var showing = myVideoPlayer.controls.buttonFullScreen.showing();		
	*/
	
	/**	Method: hide()
			Visually removes the button from the DOM by setting its display property to none
		
		> myVideoPlayer.controls.buttonFullScreen.hide();
	*/
	
	/**	Method: show()
			Visually displays the button in the DOM
		
		> myVideoPlayer.controls.buttonFullScreen.show();
	*/

function UIButtonFullScreen ( player, arg ){
	var U = new UIButton(arg);

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PROTECTED METHODS
	U._onClick = function ( event ) {
		FullScreen.enter ( player.screen );
	}

	U._controlListeners = function ( enable ){
		var listener = enable ? 'addEventListener' : 'removeEventListener' ;
		player.screen[listener]('ended', handleEnded, false);
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// EVENT HANDLERS
	function handleEnded ( event ) {
		FullScreen.exit();
	}	

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// INIT
	U.enabled(true);

	return U;
}