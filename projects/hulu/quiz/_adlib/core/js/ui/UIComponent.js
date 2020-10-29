/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	UIComponent

	Description:
		
		This is a display object class, which is an extension of a DOM element <div> with extra base functionality.  There are inherit properties and methods for 
		enabling, show, hide, etc. It is a base class that can be extended for custom UI elements. 

	Sample:
		(start code)
			// bare minimum creation - can be added to anything and named later.
			var myBase = new UIComponent();

			// simple creation - no style
			var myBase = new UIComponent({
				target : adData.elements.redAdContainer,
				id : 'my-base'
			})
			
			// create with assigned styles
			var myBase = new UIComponent({
				target : adData.elements.redAdContainer,
				id : 'my-base',
				css : {
					x : 36,
					y : 14,
					width : 120,
					height: 140
				}
			})
		(end code)
		
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */
function UIComponent ( arg ){
		
	var _enabled = true;
	var _showing = false;

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// MARKUP
	var U = document.createElement('div');

	arg = arg || {}
	if ( arg.id ) 
		U.id = arg.id;
	Styles.setCss( U, arg.css );
	if ( arg.target ) 
		arg.target.appendChild( U );
	
	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// GETTER | SETTTER
	
	/**	Variable: x
			A Number representing the x position.  Directly gets/sets the css transform x. 

		(start code)
			// get
			trace ( myComponent.x );

			// set
			myComponent.x = 7;
		(end code) 
	*/
	/** */
	Object.defineProperty ( U, 'x', {
		get: function() {
			return +getTransformMatrix()[4]
		},
		set: function ( value ) {
			Styles.setCss ( U, { x : value })
		}
	});

	/**	Variable: y
			A Number representing the y position.  Directly gets/sets the css transform y.

		(start code)
			// get
			trace ( myComponent.y );

			// set
			myComponent.y = 14;
		(end code) 
	*/
	/** */
	Object.defineProperty ( U, 'y', {
		get: function() {
			return +getTransformMatrix()[5]
		},
		set: function ( value ) {
			Styles.setCss ( U, { y : value })
		}
	});

	/**	Variable: width
			A Number representing the width of the div.  Directly gets/sets the style css width. 

		(start code)
			// get
			trace ( myComponent.width );

			// set
			myComponent.width = 140;
		(end code) 
	*/
	/** */
	Object.defineProperty ( U, 'width', {
		get: function() {
			return U.offsetWidth;;
		},
		set: function ( value ) {
			Styles.setCss ( U, { width : value })
		}
	});

	/**	Variable: height
			A Number representing the height of the div.  Directly gets/sets the style css height.

		(start code)
			// get
			trace ( myComponent.height );

			// set
			myComponent.height = 140;
		(end code) 
	*/
	/** */
	Object.defineProperty ( U, 'height', {
		get: function() {
			return U.offsetHeight;
		},
		set: function ( value ) {
			Styles.setCss ( U, { height : value })
		}
	});

	/**	Variable: enabled
			A Boolean to toggle if the Gesture events are active.

		(start code)
			// get
			trace ( myComponent.enabled );

			// set
			myComponent.enabled = true;
		(end code) 
	*/
	/** */
	Object.defineProperty ( U, 'enabled', {
		get: function() {
			return _enabled;
		},
		set: function ( state ) {
			_enabled = state;
			U.dispatchEvent ( new CustomEvent( 'uiComponentEnabled' ))
		}
	});

	/**	Variable: showing
			A Boolean to check if the component is currently showing. Can NOT be set.

		(start code)
			// get
			trace ( myComponent.showing );
		(end code) 
	*/
	/** */
	Object.defineProperty ( U, 'showing', {
		get: function() {
			return _showing;
		},
		set: function(){
			trace ( ':: WARNING ::\n\n\tUIComponent.showing cannot be set.\n\n' )
		}
	});

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PRIVATE METHODS

	// Temporary, will be replaced by Styles.getCss()
	function getTransformMatrix () {
		return window.getComputedStyle( U, null ).getPropertyValue( 'transform' ).replace(/[\s\(\)matrix]/g, '').split(',')
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PUBLIC METHODS
	
	/**	Method: hide()
			Visually removes the component from the DOM by setting its display property to none
		
		> myComponent.hide();
	*/
	U.hide = function (){
		U.style.display = 'none';
		_showing = true;
	}

	/**	Method: show()
			Visually displays the component in the DOM
		
		> myComponent.show();
	*/
	U.show = function (){
		try {
			trace ( '    try removeProperty()')
			U.style.removeProperty ( 'display' );
		} catch (e) {
			trace ( '    catch display = null' )
			U.style.display = null;
		}
		_showing = false;
	}

	/**	Method: setCss()
			Set any of the style properites of the component.  A direct link to Styles.setCss() for convience.
		
		(start code)
			myComponent.setCss({ 
				width : 300,
				height : 150
			});
		(end code)  
	*/
	U.setCss = function( args ) {
		Styles.setCss ( U, args )
	} 

	/**	Method: inspect()
			Traces out an object of all the public properties and methods of the component.
		
		> myComponent.inspect();
	*/
	U.inspect = function(){
		var o = {}
		var props = Object.getOwnPropertyNames(U);
		for ( var i = 0; i < props.length; i++ ){
			var val = U[props[i]];
			o [ props[i] ] = val;
		}
		trace ( '\n\t', U.toString(), '\t', U.id, '\n\t', o );
	}

	/**	Method: toString()
			A String to represet the object type.
		
		> myComponent.toString();
	*/
	U.toString = function(){
		return '[object UIComponent]';
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// INIT
	U.enabled = true;

	return U;
}
