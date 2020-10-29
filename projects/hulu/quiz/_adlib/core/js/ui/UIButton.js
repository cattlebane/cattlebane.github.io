/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	UIButton

	Description:
		This is a display object class, expanding on the Markup.addDiv() system. Has inherit methods for enabling, show, hide, etc. Is a base class that can be extended
		for custom buttons. All the VideoControl Buttons extend from this class.

	Sample:
		(start code)
			var myButton = new UIButton({
				id : 'my-btn',
				target : adData.elements.redAdContainer,
				css : {
					x : 0,
					y : 0,
					width : 50,
					height : 20,
					backgroundColor : '#ff0000'
				},
				onClick : handleMyButtonClick
			})

			function handleMyButtonClick ( event ){
				trace ( event.target, 'clicked' )
			}
		(end code)

	Sample Extension:
		(start code)
			function UICustomButton ( arg ){
				var U = new UIButton(arg);
				
				U._onClick = function ( event ) {
					// do custom click handling
				}

				U._controlListeners = function ( enable ){
					var listener = enable ? 'addEventListener' : 'removeEventListener' ;
					Gesture[listener]( U, GestureEvent.OVER, handleOver );
					Gesture[listener]( U, GestureEvent.OVER, handleOut );
				}

				function handleOver ( event ) {
				}	

				function handleOut ( event ) {
				}	

				U.enabled(true);

				return U;
			}
		(end code)
		
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */
function UIButton ( arg ){
	
	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// BASE CSS
	var getSheet = document.getElementById('RED_uiButton');
	if ( !getSheet ){
		var cssRules = ".ui-button { position:relative; width:30px; height:30px; }"
		cssRules += ".ui-button-active,	.ui-button-inactive { position: absolute; width:inherit; height:inherit; }"

		var styleScript = document.createElement('style');
		styleScript.type = 'text/css';
		styleScript.media = 'screen';
		styleScript.id = 'RED_uiButton';
		styleScript.appendChild(document.createTextNode( cssRules ));
		document.getElementsByTagName( 'head' )[0].appendChild( styleScript );
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PRIVATE PROPERITES
	var _isActive = true;
	var _togglable = true;
	var _enabled = true;
	var _displayPriority = 'internal';
	var _showing = false;

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// MARKUP
	var U = document.createElement('div');
	U.setAttribute('class', 'ui-button');
	U.id = arg.id;
	if ( arg.css ) 
		Styles.setCss( U, arg.css );
	arg.target.appendChild( U );

	createChild ( 'active' );
	if ( arg.inactive == undefined ) _togglable = false;
	else createChild ( 'inactive' );

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// GETTER | SETTTER

	/**	Method: isActive(Boolean)
			Get|Set: Changes the visual state of the button, showing either the active or inactive child element. If the parameter is null, it returns the current active state.

		Parameters:
			state 	- A boolean, either true or false.
		
		(start code)
			// GET
			var isActive = myButton.isActive();

			// SET
			myButton.isActive(false);			
		(end code)
	*/
	U.isActive = function(state){
		// GET
		if ( state == undefined ) return _isActive;	

		// SET
		_isActive = state;
		toggle();
	}
	
	/**	Method: enabled(Boolean)
			Get|Set: Changes the event handling state of the Button, without effecting its display properties. If the parameter is null, it returns the current active state.

		Parameters:
			state 	- A boolean, either true or false.
		
		(start code)
			// GET
			var enabled = myButton.enabled();

			// SET
			myButton.enabled(false);			
		(end code)
	*/
	U.enabled = function(state){
		// GET
		if ( state == undefined ) return _enabled;

		// SET
		_enabled = state;
		controlListeners ( state );
	}

	/**	Method: showing(Boolean)
			Get only: Whether or not the button is displayed in the DOM
				
		> var showing = myButton.showing();		
	*/
	U.showing = function(){
		return _showing;
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PUBLIC METHODS
	/**	Method: hide()
			Visually removes the button from the DOM by setting its display property to none

		Parameters:
			calledInternally 	- Optional Boolean used when part of a larger system, such as the Video Control Bar. Can be called internally but the priority will be when called directly.
		
		> myButton.hide();
	*/
	U.hide = function ( calledInternally ){
		if ( calledInternally ){
			if ( _displayPriority == 'external' ) return;
		} else {
			_displayPriority = 'external';
		}
		U.style.display = 'none';
		_showing = true;
	}

	/**	Method: show()
			Visually displays the button in the DOM

		Parameters:
			calledInternally 	- Optional Boolean used when part of a larger system, such as the Video Control Bar. Can be called internally but the priority will be when called directly.
		
		> myButton.show();
	*/
	U.show = function ( calledInternally ){
		if ( calledInternally ){
			if ( _displayPriority == 'external' ) return;
		} else {
			_displayPriority = 'external';
		}

		try {
			U.style.removeProperty ( 'display' );
		} catch (e) {
			U.style.display = null;
		}

		_showing = false;
	}

	/**	Method: onClick()
			Assign a handler directly to the button instance, can also be set in the arguments on instantiation.

		(start code)
			var myButton = new UIButton({
				id : 'my-btn',
				target : adData.elements.redAdContainer,
				css : {
					x : 0,
					y : 0,
					width : 50,
					height : 20,
					backgroundColor : '#ff0000'
				},
				onClick : handleMyButtonClick
			})

			// OR assign it after

			myButton.onClick = handleMyButtonClick;

			function handleMyButtonClick ( event ){
				trace ( event.target, 'clicked' )
			}
		(end code)
	*/
	U.onClick = arg.onClick || function(event){
		trace ( 'UIButton.onClick()' )
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PROTECTED METHODS
	/**	Method: _onClick()
			Protected Method for INTERNAL use when extending the class. Assign a handler directly to the button instance.
	*/
	U._onClick = function(event){
	}

	/**	Method: _controlListeners()
			Protected Method for INTERNAL use when extending the class. For use when adding/removing other event handlers
	*/
	U._controlListeners = function(){
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PRIVATE METHODS
	function createChild ( name ){
		if ( isElement ( arg[name] )){
			U[name] = arg[name];
		} else {
			U[name] = document.createElement('div');
			if ( arg[name] )
				Styles.setCss( U[name], arg[name] );
		}
		
		U[name].id = arg.id + '-' + name;
		U[name].setAttribute('class', 'ui-button-' + name );
		U.appendChild( U[name] );
	}

	function isElement(o){
		var check = false;
		if ( o ){
			check = typeof HTMLElement === "object" ? o instanceof HTMLElement : (o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string")
		}
		
		return check;
	}

	function toggle(){
		if ( !_togglable ) return;
		U.active.style.visibility = _isActive ? 'visible' : 'hidden' ;
		U.inactive.style.visibility = _isActive ? 'hidden' : 'visible' ;
	}

	function controlListeners ( enable ){
		Gesture [ enable ? 'addEventListener' : 'removeEventListener' ]( U, GestureEvent.CLICK, handleClick );
		U._controlListeners.call(U,enable);
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// EVENT HANDLERS
	function handleClick ( event ){
		U.isActive ( !_isActive );
		U._onClick.call( U, event );
		U.onClick.call( U, event );
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// INIT
	U.enabled(true);

	toggle();

	return U;
}