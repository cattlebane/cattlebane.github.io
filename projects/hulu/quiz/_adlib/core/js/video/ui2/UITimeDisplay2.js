function UITimeDisplay2 ( player, arg ){

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// MARKUP
	var U = new UIComponent ( arg );
	U.classList.add( 'rvp-time-display' );

	U.textfield = document.createElement('span');
	U.textfield.setAttribute('class', 'rvp-time-display span' );
	Styles.setCss( U.textfield, arg.textStyles );
	U.appendChild( U.textfield );
	
	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PROPERTIES
	var _showDuration = true;
	var _duration = '0:00';
	var _timeStr = '0:00';

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// GETTER | SETTTER
	Object.defineProperty ( U, 'showDuration', {
		get: function() {
			return _showDuration;
		},
		set: function(state) {
			_showDuration = state;
			_duration = state ? ' / ' + formatTime ( player.screen.duration ) : '';
		}
	});

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PUBLIC METHODS
	U.toString = function(){
		return '[object UITimeDisplay2]'
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PRIVATE METHODS
	function formatTime ( time ){
		time = time || 0;
		var min = Math.floor(time / 60);
		var sec = Math.floor(time - (min * 60));
		if ( sec < 10 ) sec = '0' + sec;
		return min + ':' + sec;
	}

	function assignText () {
		U.textfield.innerHTML = _timeStr + _duration;
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// EVENT HANDLERS
	function handleLoadedData ( event ){
		U.showDuration = _showDuration;
	}

	function handleTimeUpdate ( event ){
		_timeStr = formatTime ( player.screen.currentTime )
		assignText()
	}

	function handleBaseEnabled ( event ){
		var listener = U.enabled ? 'addEventListener' : 'removeEventListener' ;
		player.screen[listener]('loadeddata', handleLoadedData, false);
		player.screen[listener]('timeupdate', handleTimeUpdate, false);
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// INIT
	U.addEventListener ( 'uiComponentEnabled', handleBaseEnabled );

	U.enabled = true;
	U.showDuration = arg.showDuration != false;
	assignText();

	return U;
}