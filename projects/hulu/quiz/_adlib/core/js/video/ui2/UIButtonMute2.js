function UIButtonMute2 ( player, arg ){

	var U = new UIButton2 ( arg );

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PUBLIC METHODS
	U.toString = function(){
		return '[object UIButtonMute2]'
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PROTECTED METHODS
	U._onClick = function ( event ){
		player.screen.muted = !player.screen.muted;
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// EVENT HANDLERS
	function handleVolumeChange ( event ){
		U.state = Number( player.screen.muted || player.screen.volume == 0 );
	}

	function handleBaseEnabled ( event ){
		var listener = U.enabled ? 'addEventListener' : 'removeEventListener' ;
		player.screen[listener]('volumechange', handleVolumeChange, false);
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// INIT
	U.addEventListener ( 'uiComponentEnabled', handleBaseEnabled );

	U.enabled = true;

	return U;
}