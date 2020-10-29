function UIPoster2 ( player, arg ){
		
	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// MARKUP
	arg.css = arg.css || {};
	arg.css.width = arg.css.width || 'inherit';
	arg.css.height = arg.css.height || 'inherit';

	var U = new UIImage ( arg );
	U.classList.add( 'rvp-poster' );

	(arg.target || player.container).appendChild(U);

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// EVENT HANDLERS
	function handleUpdate ( event ){
		if ( player.screen.currentTime > 0 ) U.hide();
	}

	function handlePause ( event ){
		if ( player.screen.currentTime == 0 ) U.show();
	}

	function handleShow ( event ){
		U.show()
	}

	function handleBaseEnabled ( event ){
		var listener = U.enabled ? 'addEventListener' : 'removeEventListener' ;
		player.screen[listener]('play', U.hide, false);
		player.screen[listener]('pause', handlePause, false);
		player.screen[listener]('timeupdate', handleUpdate, false);
		player.screen[listener]('ended', handleShow, false);
		player.screen[listener]('stop', handleShow, false);
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// INIT
	U.addEventListener ( 'uiComponentEnabled', handleBaseEnabled );

	U.enabled = true;
	
	return U;
}