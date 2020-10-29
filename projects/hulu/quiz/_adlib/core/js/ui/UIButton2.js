function UIButton2 ( arg ){
	
	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// BASE CSS
	Styles.createClass ( 'RED_uiButton', 
		'ui-button', 'position:absolute; width:30px; height:30px;',
		'ui-button-state', 'position: absolute; width:inherit; height:inherit;'
	)

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PRIVATE PROPERTIES	
	var _state = 0
	var _states = [];

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// MARKUP
	arg = arg || {}
	var U = new UIComponent ( arg );
	U.classList.add( 'ui-button' );
	
	arg.state = arg.state || []
	for ( var i = 0; i < arg.state.length; i++ ){
		createChild ( arg.state[i] );
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PUBLIC PROPERTIES
	U.togglable = true;
	
	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// GETTER | SETTTER
	Object.defineProperty ( U, 'state', {
		get: function() {
			return _state;
		},
		set: function(value) {
			_state = value;
			if ( value >= _states.length ){
				_state = 0;
				trace ( ':: WARNING ::\n\n\tUIButton.state = ' + value + ' does not exist. Reset to 0.\n\n' )
			}
			for ( var i = 0; i < _states.length; i++ ){
				_states[i].style.visibility = i == _state ? 'visible' : 'hidden' ;
			}
		}
	});
		
	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PUBLIC METHODS
	U.onClick = arg.onClick || function(event){
		trace ( 'UIButton.onClick()' )
	}

	U.onOver = arg.onOver || function(event){
		trace ( 'UIButton.onOver()' )
	}

	U.onOut = arg.onOut || function(event){
		trace ( 'UIButton.onOut()' )
	}

	U.toString = function(){
		return '[object UIButton2]'
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PROTECTED METHODS
	U._onClick = function(event){}
	U._onOver = function(event){}
	U._onOut = function(event){}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PRIVATE METHODS
	function createChild ( name ){
		var elem;
		var id = arg.id + '-state-' + _states.length;

		if ( typeof name == 'string' ) {
			elem = new UIImage({
				target : U,
				id : id,
				source : name,
				css : {
					width : 'inherit',
					height : 'inherit'
				}
			})
		} else {
			elem = name
			elem.id = id
			U.appendChild( elem );
		}
		_states.push( elem )

		elem.classList.add( 'ui-button-state' );

		Gesture.disable ( elem )
	}
	
	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// EVENT HANDLERS
	function handleClick ( event ){
		if ( U.togglable )
			U.state = Number(!_state);

		U._onClick.call( U, event );
		U.onClick.call( U, event );
	}

	function handleOver ( event ){
		U._onOver.call( U, event );
		U.onOver.call( U, event );
	}

	function handleOut ( event ){
		U._onOut.call( U, event );
		U.onOut.call( U, event );
	}

	function handleBaseEnabled ( event ){
		var listener = U.enabled ? 'addEventListener' : 'removeEventListener' ;
		Gesture [ listener ]( U, GestureEvent.CLICK, handleClick );
		Gesture [ listener ]( U, GestureEvent.OVER, handleOver );
		Gesture [ listener ]( U, GestureEvent.OUT, handleOut );
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// INIT
	U.addEventListener ( 'uiComponentEnabled', handleBaseEnabled )

	U.enabled = true;
	U.state = 0;

	return U;
}