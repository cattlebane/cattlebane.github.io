/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	UIPoster

	Description:
		This object creates the VideoPlayer Poster, called INTERALLY from VideoControls.js. 

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
				
				poster : ImageManager.get('poster')
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
	
	

function UIPoster ( player, arg ){
	
	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PRIVATE PROPERITES
	var _isShowing = true;
	var _enabled = true;

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// MARKUP
	var U = document.createElement('div');
	U.style.cssText = "width:inherit; height:inherit; position:absolute; background-size:cover; background-position:50% 50%;";
	U.id = player.id + '-poster';
	player.container.appendChild(U);

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// GETTER | SETTTER
	/**	Method: enabled(Boolean)
			Get|Set: Changes the event handling state of the poster, without effecting its display properties. If the parameter is null, it returns the current active state.

		Parameters:
			state 	- A boolean, either true or false.
		
		(start code)
			// GET
			var enabled = myVideoPlayer.poster.enabled();

			// SET
			myVideoPlayer.poster.enabled(false);			
		(end code)
	*/
	U.enabled = function(state){
		// GET
		if ( state == undefined ) return _enabled;

		// SET
		_enabled = state;
		controlListeners ( state );
	}

	U.image = function(img){
		// SET
		Styles.setBackgroundImage(U,img);
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PUBLIC METHODS
	/**	Method: hide()
			Visually removes the poster from the DOM by setting its display property to none
		
		> myVideoPlayer.poster.hide();
	*/
	U.hide = function(){
		if ( _isShowing ) U.style.display = 'none';
		_isShowing = false;
	}

	/**	Method: show()
			Visually displays the poster in the DOM
		
		> myVideoPlayer.poster.show();
	*/
	U.show = function(){
		_isShowing = true;
		try {
			U.style.removeProperty ( 'display' );
		} catch (e) {
			U.style.display = null;
		}

	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PRIVATE METHODS
	function controlListeners ( enable ){
		var listener = enable ? 'addEventListener' : 'removeEventListener';

		player.screen[listener]('play', U.hide, false);
		player.screen[listener]('pause', handlePause, false);
		player.screen[listener]('timeupdate', handleUpdate, false);
		player.screen[listener]('ended', U.show, false);
		player.screen[listener]('stop', U.show, false);
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// EVENT HANDLERS
	function handleUpdate ( event ){
		if ( player.screen.currentTime > 0 ) U.hide();
	}

	function handlePause ( event ){
		if ( player.screen.currentTime == 0 ) U.show();
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	U.enabled(true);

	U.image(arg);
	
	return U;
}