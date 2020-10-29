/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	UIScreenButton

	Description:
		This object creates the Big Button that is placed over the screen, called INTERALLY from VideoControls.js. This button can be a mute/unmute, play/pause or replay type 
		of button.  There are additional controls for having the button always visible or only show once.  Set the button type on instantiation or after the fact.  This class 
		creates a container to act as a larg button over the entire video screen. The the visual button (an instance of UIButton) is added to that.  All properties/methods 
		available in UIButton are accessible from class level.

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
					replayOnInteraction : false,
					unmuteOnInteraction : false,
					
					include : {

						// as a REPLAY button
						screenButton : {
							css : {
								width : 100,
								height : 100
							},
							active : ImageManager.get('btnReplay'),
							type : 'replay',
							constant : false,
							once : false
						},

						// OR as a PLAY / PAUSE button
						screenButton : {
							css : {
								width : 100,
								height : 100
							},
							active : ImageManager.get('btnPlay'),
							inactive : ImageManager.get('btnPause'),
							type : 'play',
							constant : true,
							once : false
						},

						// OR as a MUTE / UNMUTE button
						screenButton : {
							css : {
								width : 100,
								height : 100
							},
							active : ImageManager.get('btnMute'),
							inactive : ImageManager.get('btnUnmute'),
							type : 'mute',
							constant : false,
							once : true
						},
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
			var isActive = myVideoPlayer.controls.screenButton.isActive();

			// SET
			myVideoPlayer.controls.screenButton.isActive(false);			
		(end code)
	*/
	
	/**	Method: enabled(Boolean)
			Get|Set: Changes the event handling state of the Button, without effecting its display properties. If the parameter is null, it returns the current active state.

		Parameters:
			state 	- A boolean, either true or false.
		
		(start code)
			// GET
			var enabled = myVideoPlayer.controls.screenButton.enabled();

			// SET
			myVideoPlayer.controls.screenButton.enabled(false);			
		(end code)
	*/
	
	/**	Method: showing(Boolean)
			Get only: Whether or not the button is displayed in the DOM
				
		> var showing = myVideoPlayer.controls.screenButton.showing();		
	*/
	
	/**	Method: hide()
			Visually removes the button from the DOM by setting its display property to none
		
		> myVideoPlayer.controls.screenButton.hide();
	*/
	
	/**	Method: show()
			Visually displays the button in the DOM
		
		> myVideoPlayer.controls.screenButton.show();
	*/
function UIScreenButton( player, arg ){

	var U = document.createElement('div');
	U.style.cssText = "width:inherit; height:inherit; position:absolute; background-size:cover; background-position:50% 50%;";
	U.id = arg.id + '-container';
	player.container.appendChild(U);
	
	arg.target = U;
	
	if ( !(arg.css.left || arg.css.x || arg.css.top || arg.css.y) ){
		arg.css.margin = 'auto';
		arg.css.position = 'absolute';
		arg.css.top = arg.css.bottom = arg.css.left = arg.css.right = '0px';
	}	

	/**	Variable: button
			The UIButton inside this container. */
	U.button = new UIButton(arg);
	
	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PRIVATE PROPERITES
	var _constant = false;
	var _type = 'replay';
	var _once = false;

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// REDIRECTS TO BASE CLASS
	U.isActive = U.button.isActive;
	U.enabled = U.button.enabled;
	U.hide = U.button.hide;
	U.show = U.button.show;
	U.onClick = U.button.onClick;

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// GETTER | SETTTER
	/**	Method: constant(Boolean)
			Get|Set: Changes if the button is persistent or not. If the parameter is null, it returns the current active state.

		Parameters:
			state 	- A boolean, either true or false.
		
		(start code)
			// GET
			var isActive = myVideoPlayer.controls.screenButton.constant();

			// SET
			myVideoPlayer.controls.screenButton.constant(false);			
		(end code)
	*/
	U.constant = function(state){
		// GET
		if ( state == undefined ) return _constant;

		// SET 
		_constant = state;
	}

	/**	Method: type(String)
			Get|Set: Changes the type of action the button responds to. Options are 'play' for play and pause, 'mute' for mute and unmute, 'replay' for replay. 
			If the parameter is null, it returns the current active state.

		Parameters:
			state 	- A boolean, either true or false.
		
		(start code)
			// GET
			var type = myVideoPlayer.controls.screenButton.type();

			// SET
			myVideoPlayer.controls.screenButton.type('play');			
			myVideoPlayer.controls.screenButton.type('mute');			
			myVideoPlayer.controls.screenButton.type('replay');			
		(end code)
	*/
	U.type = function(state){
		// GET
		if ( state == undefined ) return _type;

		// SET 
		if ( !(state == 'play' || state == 'mute' || state == 'replay' ))
			throw new Error("UIBigButton.type must be 'play', 'mute', or 'replay'")
		_type = state;
	}

	/**	Method: constant(Boolean)
			Get|Set: Changes if the button only shows until the first time it is clicked. If the parameter is null, it returns the current active state.

		Parameters:
			state 	- A boolean, either true or false.
		
		(start code)
			// GET
			var once = myVideoPlayer.controls.screenButton.once();

			// SET
			myVideoPlayer.controls.screenButton.once(false);			
		(end code)
	*/
	U.once = function(state){
		// GET
		if ( state == undefined ) return _once;

		// SET 
		_once = state;
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PROTECTED METHODS	
	U.button._controlListeners = function(enable){
		var listener = enable ? 'addEventListener' : 'removeEventListener' ;
		player.screen[listener]('play', handlePlay, false);
		player.screen[listener]('pause', handlePause, false);
		player.screen[listener]('ended', handleEnded, false);
		player.screen[listener]('stop', handleEnded, false);
		player.screen[listener]('volumechange', handleVolumeChange, false);

		Gesture[listener]( U, GestureEvent.CLICK, handleClick );
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// EVENT HANDLERS
	function handleClick(event){
		switch ( _type ){
			case 'play' :
				player.screen.paused ? player.screen.play() : player.screen.pause() ;
				break;
			case 'mute' :
				player.screen.muted ? player.unmute() : player.mute() ;
				break;
			case 'replay' :
				player.seek(0);
				player.play();
				if ( !_constant || _once ) U.hide();
				break;
		}
	}

	function handlePlay ( event ){
		U.isActive ( false );
		if ( !_constant ) U.hide();
	}

	function handlePause ( event ){
		trace ( 'UIBigButton.handlePause()' )
		U.isActive ( true );
		if ( _type != 'replay' && !_once ) U.show();
	}

	function handleEnded ( event ){
		U.show();
	}

	function handleVolumeChange ( event ){
		if ( _type == 'mute' ) U.isActive ( player.screen.muted || player.screen.volume == 0 );
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// INIT
	U.enabled(true);
	U.constant ( !!arg.constant );
	U.type ( arg.type );
	U.once ( !!arg.once );

	if ( _type == 'replay' && !_constant ) U.hide();
	
	return U;
}
