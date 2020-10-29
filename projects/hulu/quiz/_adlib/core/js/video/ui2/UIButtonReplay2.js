function UIButtonReplay2 ( player, arg ){
	
	var U = new UIButton2 ( arg );

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PUBLIC METHODS
	U.toString = function(){
		return '[object UIButtonReplay2]'
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PROTECTED METHODS
	U._onClick = function ( event ){
		player.seek(0);
		player.play();

		U.hide();
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// EVENT HANDLERS
	function handlePlay ( event ){
		U.hide();
	}

	function handleEnded ( event ){
		U.show();
	}

	function handleBaseEnabled ( event ){
		var listener = U.enabled ? 'addEventListener' : 'removeEventListener' ;
		player.screen[listener]('play', handlePlay, false);
		player.screen[listener]('ended', handleEnded, false);
		player.screen[listener]('stop', handleEnded, false);
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// INIT
	U.addEventListener ( 'uiComponentEnabled', handleBaseEnabled );

	U.enabled = true;
	U.hide();

	return U;
}
