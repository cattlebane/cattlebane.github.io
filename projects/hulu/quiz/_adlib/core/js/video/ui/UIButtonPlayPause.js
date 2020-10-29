/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	UIButtonPlayPause

	Description:
		This object creates the Play/Pause Button, called INTERALLY from VideoControls.js. This controls the play / pause functionality of the VideoPlayer. 

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
						buttonPlayPause : {
							// Customize the container
							css : {
								float : 'left' // DEFAULT
							},

							// set the active (PLAY) and inactive (PAUSE) images directly to the container
							active : ImageManager.get('btnPlay'),
							inactive : ImageManager.get('btnPause')
							
							// OR
							
							// add a div to customize the image size and placement
							active : Markup.addDiv({
								css: {
									x:5,
									y:5,
									width: 20,
									height: 20,
									backgroundImage : ImageManager.get('btnPlay').src
								}
							})
							inactive : Markup.addDiv({
								css: {
									x:5,
									y:5,
									width: 20,
									height: 20,
									backgroundImage : ImageManager.get('btnPause').src
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
			var isActive = myVideoPlayer.controls.buttonPlayPause.isActive();

			// SET
			myVideoPlayer.controls.buttonPlayPause.isActive(false);			
		(end code)
	*/
	
	/**	Method: enabled(Boolean)
			Get|Set: Changes the event handling state of the Button, without effecting its display properties. If the parameter is null, it returns the current active state.

		Parameters:
			state 	- A boolean, either true or false.
		
		(start code)
			// GET
			var enabled = myVideoPlayer.controls.buttonPlayPause.enabled();

			// SET
			myVideoPlayer.controls.buttonPlayPause.enabled(false);			
		(end code)
	*/
	
	/**	Method: showing(Boolean)
			Get only: Whether or not the button is displayed in the DOM
				
		> var showing = myVideoPlayer.controls.buttonPlayPause.showing();		
	*/
	
	/**	Method: hide()
			Visually removes the button from the DOM by setting its display property to none
		
		> myVideoPlayer.controls.buttonPlayPause.hide();
	*/
	
	/**	Method: show()
			Visually displays the button in the DOM
		
		> myVideoPlayer.controls.buttonPlayPause.show();
	*/
	
function UIButtonPlayPause( player, arg ){

	var U = new UIButton(arg);

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PROTECTED METHODS
	U._onClick = function(event){
		if ( player.screen.paused ) {
			player.play();
			//player.screen.play();
			U.isActive ( false );
		} else {
			player.pause();
			//player.screen.pause();
			U.isActive ( true );
		}
	}

	U._controlListeners = function(enable){
		var listener = enable ? 'addEventListener' : 'removeEventListener' ;
		player.screen[listener]('play', handlePlay, false);
		player.screen[listener]('pause', handlePause, false);
		player.screen[listener]('ended', handleEnded, false);
		player.screen[listener]('stop', handleEnded, false);
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// EVENT HANDLERS
	function handlePlay ( event ){
		U.isActive ( false );
		U.show();
	}

	function handlePause ( event ){
		U.isActive ( true );
	}

	function handleEnded ( event ){
		handlePause(event);
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// INIT
	U.enabled(true);
	
	return U;
}