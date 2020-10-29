function UIButtonPlayPause2 ( player, arg ){

	var U = new UIButton2 ( arg );

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PUBLIC METHODS
	U.toString = function(){
		return '[object UIButtonPlayPause2]'
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PROTECTED METHODS
	U._onClick = function(event){
		player.paused ? player.play() : player.pause() ;
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// EVENT HANDLERS
	function handlePlay ( event ){
		U.state = 1;
		U.show();
	}

	function handlePause ( event ){
		U.state = 0;
	}

	function handleEnded ( event ){
		handlePause(event);
	}

	function handleBaseEnabled ( event ){
		var listener = U.enabled ? 'addEventListener' : 'removeEventListener' ;
		player.screen[listener]('play', handlePlay, false);
		player.screen[listener]('pause', handlePause, false);
		player.screen[listener]('ended', handleEnded, false);
		player.screen[listener]('stop', handleEnded, false);
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// INIT
	U.addEventListener ( 'uiComponentEnabled', handleBaseEnabled );

	U.enabled = true;
	
	return U;
}