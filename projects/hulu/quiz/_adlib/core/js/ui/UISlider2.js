function UISlider2 ( arg ){
	
	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// BASE CSS
	Styles.createClass ( 'RED_uiSlider', 
		'ui-slider', 'position:absolute; width:100%; height:100%;',
		'ui-slider-bg, ui-slider-track, ui-slider-loaded, ui-slider-handle, ui-slider-hitState', 'position:absolute; width:100%; height:inherit;',
		'ui-slider-bg', 'background-color: #666666;',
		'ui-slider-loaded', 'background-color: #560000; width:0%;',
		'ui-slider-track', 'background-color: #cc0000; width:0%;',
		'ui-slider-handle', 'background-color: #ffffff; width:5%; left:0%;'
	)

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PRIVATE PROPERTIES	
	var _percent = 0;
	var _dragging = false;
	var _startX = 0;

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// MARKUP
	arg = arg || {}
	var U = new UIComponent ( arg );
	U.classList.add( 'ui-slider' );
	
	var children = [ 'bg', 'loaded', 'track', 'handle', 'hitState' ];
	U.elements = [];
	for ( var i = 0; i < children.length; i++ )
		createChild ( children[i] );

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// GETTERS | SETTERS
	Object.defineProperty ( U, 'percent', {
		get: function() {
			return _percent;
		},
		set: function(value) {
			_percent = MathUtils.restrict( value, 0, 1 );
			U.track.style.width = (_percent * 100) + '%';
			U.handle.style.left = getHandlePercent() + '%';
		}
	});

	Object.defineProperty ( U, 'dragging', {
		get: function() {
			return _dragging;
		},
		set: function(){
			trace ( ':: WARNING ::\n\n\tUISlider2.dragging cannot be set.\n\n' )
		}
	});

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PUBLIC METHODS
	U.onUpdate = arg.onUpdate || function(event){
		trace ( 'UISlider2.onUpdate()' )
	}

	U.toString = function(){
		return '[object UISlider2]'
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PRIVATE METHODS
	function createChild ( name ){
		U[name] = document.createElement('div');
		U[name].classList.add( 'ui-slider-' + name );
		U[name].id = arg.id + '-' + name;
		if ( arg[name] ) Styles.setCss( U[name], arg[name] );
		if ( arg[name] == false ) U[name].style.display = 'none';
		U.appendChild( U[name] );
		U.elements.push( U[name] );
	}

	function positionToPercent ( newX ){
		U.percent = newX / U.offsetWidth;
	}

	function getHandlePercent (){
		var thumbHalf = (U.handle.offsetWidth / U.offsetWidth) / 2;
		var perc = MathUtils.restrict ( _percent, thumbHalf, 1 - thumbHalf ) - thumbHalf;

		return perc * 100;
	}

	function dispatch () {
		// dispatching upward for extended classes such as UIProgress
		var event = new CustomEvent ( 'sliderUpdate' );
		U.dispatchEvent ( event );	
		U.onUpdate.call( U, event );
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// EVENT HANDLERS
	function handleDown ( event ){
		_dragging = true;
		positionToPercent ( event.position.x );
		_startX = event.page.x - event.position.x;
		
		dispatch();
	}

	function handleUp ( event ){
		_dragging = false;	
	}

	function handleDrag ( event ){
		pos = event.position.x ;

		if ( event.page.x <= _startX )
			pos = 0;
		else if ( event.page.x >= _startX + U.offsetWidth )
			pos = U.offsetWidth;
		
		positionToPercent ( pos );
		dispatch();
	}

	function handleBaseEnabled ( event ){
		var listener = U.enabled ? 'addEventListener' : 'removeEventListener' ;
		Gesture[listener]( U.hitState, GestureEvent.DOWN, handleDown );
		Gesture[listener]( U.hitState, GestureEvent.UP, handleUp );
		Gesture[listener]( U.hitState, GestureEvent.DRAG, handleDrag );
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// INIT
	U.addEventListener ( 'uiComponentEnabled', handleBaseEnabled )

	U.enabled = true;

	return U;
}
