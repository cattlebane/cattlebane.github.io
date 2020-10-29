function UISliderVolume2 ( player, arg ){

	var U = new UISlider2 ( arg );
	
	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// EVENT HANDLERS
	function handleDown ( event ){
		player.screen.muted = false;
	}

	function handleVolumeChange ( event ){
		if ( !U.dragging ){
			var vol = player.screen.muted ? 0 : player.screen.volume;
			U.percent = vol;
		}
	}

	function handleBaseSliderUpdate ( event ){
		player.screen.volume = U.percent;
	}

	function handleBaseEnabled ( event ){
		var listener = U.enabled ? 'addEventListener' : 'removeEventListener' ;
		
		Gesture[listener] ( U.hitState, GestureEvent.DOWN, handleDown );

		player.screen[listener] ( 'volumechange', handleVolumeChange );
	
		U[listener] ( 'sliderUpdate', handleBaseSliderUpdate );
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// INIT
	U.addEventListener ( 'uiComponentEnabled', handleBaseEnabled )

	U.enabled = true;

	return U;
}