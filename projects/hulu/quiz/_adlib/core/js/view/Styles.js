/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	Styles
		This object contains methods for manipulating color.
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */
var Styles = new function() {
	/**	Method: setCss()
			Sets specified styles on target object.

		_target 		- id or element to which the style(s) should be applied
		_args 		- any type of CssDeclaration, an object of key-value pairs, a semicolon separated string of styles, or a separate( key, value )arguments
		
		(start code)
			// set multiple styles using a css-string
			Styles.setCss ( myDiv, 'top: 30px; left: 10px' );

			// set multiple styles using a css-object, same as the 'css' property on <Markup>.addDiv()
			Styles.setCss ( myDiv, { top:30, left:10 });

			// set a single style, using individual( key, value )args
			Styles.setCss ( myDiv, 'top', 30 );
		(end code)
	*/

	this.setCss = function( _element, _args ) { 
		_element = Markup.getElement( _element );
		var cssList = {}
		if( arguments.length > 2 ) {
			for( var i=1; i < arguments.length; i+=2 ) {
				cssList = CssManager.conformCssKeyValue( arguments[i], arguments[i+1] );
			}
		}
		else if( typeof arguments[1] == 'string' ) {
			cssList = CssManager.conformCssString( arguments[1], _element );
		}
		else {
			cssList = CssManager.conformCssObject( arguments[1], _element );
		}
		CssManager.apply( _element, cssList );
	}





	/**	Method: getCss()
			Gets a specific style for a particular key.

		_target 				- id or element to which css style should be applied
		_key 				- css key */
	this.getCss = function( _element, _key ) {
		_element = Markup.getElement( _element );
		var style = window.getComputedStyle( _element, null );
		
		var cssValue;

		if ( _key == 'x' || _key == 'y' ){
			var matrix = style.getPropertyValue( 'transform' ).replace(/[\s\(\)matrix]/g, '').split(',');
			if ( matrix.length < 6 ) { 
				matrix = [0,0,0,0,0,0];
			}
			cssValue = +matrix[ _key == 'x' ? 4 : 5 ];

		} else {
			cssValue = style.getPropertyValue( _key ).replace( /px/, '' );
			if( !isNaN( cssValue )) cssValue = parseInt( cssValue, 10 );
		}

		return cssValue;
	}





	/**	Method: show()
			Utility for setting a dom element's visibility css to 'visible'.

		_element				- target dom element */
	this.show = function( _element ) {
		Styles.setCss( _element, 'visibility', 'visible' );
	}




	/**	Method: hide()
			Utility for setting a dom element's visibility css to 'hidden'.

		_element				- target dom element */
	this.hide = function( _element ) {
		Styles.setCss( _element, 'visibility', 'hidden' );
	}



	/**	Method: setBackgroundImage()
			Sets the background-image property with an url for the specified element.

		_target 			- id or element to which css style should be applied
		_imageUrl 			- image url */
	this.setBackgroundImage = function( _target, _imageUrl ) {
		var element = Markup.getElement( _target );
		if( _imageUrl instanceof HTMLImageElement ) {
			_imageUrl = _imageUrl.src;
		} 
		element.style.backgroundImage = 'url(' + _imageUrl + ')';
	}



	/**	Method: setBackgroundColor()
			Sets the background-image property with an url for the specified element.

		_target 			- id or element to which css style should be applied
		color 			- hex or rgb color value  */
	this.setBackgroundColor = function( _target, _color ) {
		var element = Markup.getElement( _target );
		element.style[ 'background-color' ] = _color;
	}






	/**	Method: getWidth()
			Returns the css width value for this element.

		_target			- id or element to which css style should be acquired */
	this.getWidth = function( _target ) {
		var element = Markup.getElement( _target );
		return element.offsetWidth;
	}

	/**	Method: getHeight()
			Returns the css height value for this element.

		_target			- id or element to which css style should be acquired */
	this.getHeight = function( _target ) {
		var element = Markup.getElement( _target );
		return element.offsetHeight;
	}



	/**	Method: getTop()
			Returns the css top value for this element.

		_target			- id or element to which css style should be acquired */
	this.getTop = function( _target ) {
		return Styles.getCss( _target, 'top' );
	}

	/**	Method: getLeft()
			Returns the css left value for this element.

		_target			- id or element to which css style should be acquired */
	this.getLeft = function( _target ) {
		return Styles.getCss( _target, 'left' );
	}

	/**	Method: getX()
			Returns the css transform matrix x value for this element.

		_target			- id or element to which css style should be acquired */
	this.getX = function( _target ){
		return Styles.getCss( _target, 'x' );
	}

	/**	Method: getY()
			Returns the css transform matrix y value for this element.

		_target			- id or element to which css style should be acquired */
	this.getY = function( _target ){
		return Styles.getCss( _target, 'y' );
	}













	/**	Method: createClass()
			Create a new CSS class DEFINITION with submitted styles

		nodeId			- the id of the <style> node written to the <head>
		className		- name for new class, or multiple class names to apply the style to
		styles 			- css style string, like key:value; key:value; 
		[optional]		- can indefinitely add className, styles as arguments

		(start code)
			Styles.createClass ( 'myFirstStyle', 
				'class-a', 'position:absolute; width:inherit;'
			)

			// or add multiple class declarations to the same node
			Styles.createClass ( 'mySecondStyle', 
				'class-b', 'position:absolute;',
				'class-b-top', 'width:inherit; height:inherit;'
			)

			// or have mulitple classes share the same logic
			Styles.createClass ( 'myThirdStyle', 
				'class-c, class-d', 'position:absolute;'
			)
		(end code)
		*/
	this.createClass = function( nodeId, className, styles ){
		if ( document.getElementById( nodeId ) ) return;

		var style = document.createElement( 'style' );
		style.type = 'text/css';
		style.id = nodeId;

		var str = '';
		for ( var i = 0; i < arguments.length - 1; i += 2 ){
			
			var names = arguments [ i + 1 ].split(',');
			
			for ( var k = 0; k < names.length; k++ ){
				str += '.' + names[k].replace(/^[\s]+/g,'');
				if ( k < names.length -1 )
					str += ',' 
			}
			str += ' { ' + (arguments [ i + 2 ] || '') + ' }\n';
		}
	
		style.innerHTML = str;
		document.getElementsByTagName( 'head' )[ 0 ].appendChild( style );
	}




	/**	Method: addClass()
			Add a CSS class ASSOCIATION to the targeted element.

		target				- id or element to which css style should be added
		className 			- css class association to be added to this target */
	this.addClass = function( target, className ) {
		var element = Markup.getElement( target );
		
		// IE does not support multiple classes being added as arguments, so must loop
		for ( var i = 0; i < arguments.length - 1; i++ ){
			element.classList.add( arguments [ i + 1 ])
		}
	}



	/**	Method: removeClass()
			Removes a CSS class ASSOCIATION from the targeted element.

		target				- id or element from which css style should be removed
		className 			- css class association to be removed from this target */
	this.removeClass = function( target, className ) {
		var element = Markup.getElement( target );
		element.classList.remove( className );
	}




}
