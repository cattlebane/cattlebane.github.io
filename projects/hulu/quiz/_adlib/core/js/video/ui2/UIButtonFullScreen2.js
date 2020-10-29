function UIButtonFullScreen2 ( player, arg ){
	
	var U = new UIButton2 ( arg );

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PROTECTED METHODS
	U._onClick = function ( event ){
		FullScreen.enter ( player.screen );
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// EVENT HANDLERS
	function handleEnded ( event ) {
		FullScreen.exit();
	}	

	function handleBaseEnabled ( event ){
		var listener = U.enabled ? 'addEventListener' : 'removeEventListener' ;
		player.screen[listener]('ended', handleEnded, false);
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// INIT
	U.addEventListener ( 'uiComponentEnabled', handleBaseEnabled );

	U.enabled = true;

	return U;
}