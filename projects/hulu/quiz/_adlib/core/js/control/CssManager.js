/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	CssManager

	Description:
		This is a css-interface class, which is intended to proxy all css applications. The goal is to accept css in any format( see below ), 
		standardize the keys, conform the values, and rapidly apply the style to the target, specific to the <Device> running the ad. 

		Generally, you should not need to use this class directly. <Styles>.setCss() will handle it for you.

		However, if your css is not being correctly managed, the first step in debugging is to use <CssManager>.setDebugFilter(). Pass the id, 
		as a string, of the misbehaving element to see the exact format of the css being applied to it. You can then locate the problem style, try 
		applying it in the browser inspector. Using this approach you should be able to determine what the correction/exception needs to be.

		Additional debugging output can be switched on using <CssManager>.setDebugLevel(). Pass a level( 0 is off, 1 is less, 2 is more ). There will be 
		a lot of output, but it is organized and consistent. You should be able to see exactly what is happening to your declarations. 

	Types:
		CssObject 		- the literal "css" object that is passed to <Markup> as containerData.css on the creation of the element
		CssStyleString 	- a literal string of any number of css styles, passed to <Markup> as containerData.styles on the creation of the element
		CssDeclaration 	- either an object like "{ position: 'absolute' }" or a string like "background-color: #ff0000;"

		CssKey 			- ex: in "position: absolute;" the css-key would be "position"
		CssValue 			- ex: in "position: absolute;" the css-value would be "absolute"
		CssList 			- a standardized list of objects with Device-specific keys and corresponding values

	Formats:
		Hyphen 			- ex: 'border-left', '-webkit-clip-path', '-moz-filter'
		Camel 			- ex: 'borderLeft', 'webkitClipPath', 'moxFilter'
		Alt 				- this is to handle arbitrary exceptions, like the "bgImage" key on container-data css objects

	Key Prefixes:
		Browser 	 		- ex: "-webkit-clip-path" or "webkitClipPath"
		Standard 			- ex: "clip-path" or "clipPath"
*/
var CssManager = new function() {

	var C = this;

	/** Method: init()
		Called one time per life-cycle. Creates the browser key-dictionary. */
	C.init = function() {
		trace( 'CssManager.init()' );
		C.generateBrowserKeyDictionary();
	}




	/* -- DEBUGGING -------------------------------------------------
	 *
	 *
	 */
	C.debug_level1 = false;
	C.debug_level2 = false;
	C.filter;
	C.debug_element;
	C.debug_css_list;

	/** Method: setDebugLevel()
		Use this to control the degree of logging that happens in this class. Debugging is off by default, or pass 0 or null to disable. 

		_level 			- controls debug verbosity for all css processing, default is 0, max is 2 */
	C.setDebugLevel = function( _level ) { 
		switch( parseInt( _level  )) {
			case 1:
				C.debug_level1 = true;
				C.debug_level2 = false;
				break;
			case 2:
				C.debug_level1 = true;
				C.debug_level2 = true;
				break;
			default:
				C.debug_level1 = false;
				C.debug_level2 = false;
				break;
		}
	}

	/** Method: setDebugFilter()
		Use this control to filter which <CssMananger>.apply() calls get output to the console. 

		_filter 			- the filter string: An element.id, a css-key, or a css-value. For example, if you want to only see css being applied 
							to particular element, pass its id to this function. Conversely, if you only want to see css with a particular 
							key or value, pass that string. */
	C.setDebugFilter = function( _filter ) {
		trace( 'CssManager.setDebugFilter(),', _filter );
		C.filter = _filter;
		C.debug_level1 = true;
	}
	C.ifDebug = function( _debugLevel ) {
		if( !C.filter )
			return C[ _debugLevel ];
		else if( C.passDebugFilter() && C[ _debugLevel ] )
			return true;
	}
	C.passDebugFilter = function() {
		if( C.debug_element )
			if( C.debug_element.id.indexOf( C.filter ) > -1 ) 
				return true;
		if( C.debug_css_list )
			for( var i in C.debug_css_list ) {
				if( i.indexOf( C.filter ) > -1 )
					return true;
				else if( String( C.debug_css_list[ i ] ).indexOf( C.filter ) > -1 )
					return true; 
			}
		return false;
	}





	/* -- KEY DICTIONARY -------------------------------------------------
	 *
	 *		This is called once and prepares a dictionary with standard, 
	 *		browser-agnostic keys which map to device-specific keys.
	 */
	C.deviceKeyDict;

	C.generateBrowserKeyDictionary = function() {
		trace( 'CssManager.generateBrowserKeyDictionary()' );
		C.deviceKeyDict = {};
		for( var key in document.createElement( 'div' ).style ) {
			var hyphenKey = C.formatKey( key, 'hyphen' );
			// check for existing standard-key collision
			var standardKey = C.stripPrefix( hyphenKey );
			if( standardKey in C.deviceKeyDict ) {
				// if new style is the device-key version, use it instead
				if( C.hasPrefix( hyphenKey ))
					C.deviceKeyDict[ standardKey ] = hyphenKey;
			}
			// otherwise, assign key map
			else C.deviceKeyDict[ standardKey ] = hyphenKey;
		}
		// exceptions...here is where you can specifically map a key to new value, per Device
		switch( Device.browser ) {
			case 'chrome':
			case 'safari':
				//C.deviceKeyDict['filter'] = '-webkit-filter';
				break;
			case 'firefox':
				// '-moz-transform' is what's returned but it doesn't work to set it
				C.deviceKeyDict[ 'transform' ] = 'transform'; 
				//'-moz-transform-origin' is what's returned but it doesn't work to set it
				C.deviceKeyDict[ 'transform-origin' ] = 'transform-origin'; 
				break;
		}
		trace( ' KEY DICTIONARY:', C.deviceKeyDict );
	}





	/* -- APPLYING CSS -----------------------------------------------
	 *
	 *
	 */
	C.apply = function( _element, _cssList ) {
		C.debug_element = _element;
		C.debug_css_list = _cssList;
		if( C.ifDebug( 'debug_level1' )) trace( '  CssManager.apply()', _element.id );
		for( var key in _cssList ) {
			// has a non-destructive transform update, as generated by keyFormatExceptions()
			if( key.match( /^transform\(/ ) )
				C.applyTransform( _element, key, _cssList[ key ] );
			// standard css-key
			else {
				if( C.ifDebug( 'debug_level1' )) trace( '   ' + key + ': ' + _cssList[ key ] + ';' );
				_element.style[ C.getDeviceKey( key ) ] = _cssList[ key ];
			}
		}
		if( C.ifDebug( 'debug_level1' )) trace( '\n\n' );
		C.debug_element = null;
		C.debug_css_list = null;
	}







	/* -- CONFORMING CSS SYNTAX -----------------------------------------------
	 *
	 *		These are protected methods, meant to be called by Styles...although
	 *		they could certainly be utilized by other core modules.
	 */
	C.conformCssObject = function( _cssObject, _debugElement ) {
		C.debug_element = _debugElement;
		if( C.ifDebug( 'debug_level1' )) trace( ' CssManager.conformCssObject()' );
		var cssList = {};
		if( _cssObject ) {
			for( var key in _cssObject ) {
				if( C.ifDebug( 'debug_level2' )) trace( '  PARSE( key: ' + key + ', value: ' + _cssObject[ key ] + ' )' );
				var declarations = C.conformKeyValue( key, _cssObject[ key ] );
				for( var i in declarations ) {
					if( C.ifDebug( 'debug_level2' )) trace( '    CONFORMED DECLARATION:', declarations[ i ] );
					cssList[ declarations[ i ][ 0 ]] = declarations[ i ][ 1 ];
				}
			}
		}
		C.debug_element = null;
		return cssList;
	}
	C.conformCssString = function( _cssString, _debugElement ) {
		C.debug_element = _debugElement;
		if( C.ifDebug( 'debug_level1' )) trace( ' CssManager.conformCssString()' );
		var cssList = {};
		if( _cssString ) {
			var declarations = _cssString.split( /\s*;\s*/ );
			for( var key in declarations ) {
				if( declarations[ key ] ) {
					var declarationParts = declarations[ key ].split( /:(.+)?/ );
					if( C.ifDebug( 'debug_level2' )) trace( '  PARSE( key: ' + declarationParts[ 0 ] + ', value: ' + declarationParts[ 1 ] + ' )' );
					var conformedDeclarations = C.conformKeyValue( declarationParts[ 0 ], declarationParts[ 1 ] );
					for( var i in conformedDeclarations ) {
						if( C.ifDebug( 'debug_level2' )) trace( '    CONFORMED DECLARATION:', conformedDeclarations[ i ] );
						cssList[ conformedDeclarations[ i ][ 0 ] ] = conformedDeclarations[ i ][ 1 ];
					}
				}
			}
		}
		C.debug_element = null;
		return cssList;
	}
	C.conformCssKeyValue = function( _key, _value ) {
		if( C.ifDebug( 'debug_level1' )) trace( ' CssManager.conformCssKeyValue()' );
		var cssObject = {};
		cssObject[ _key ] = _value;
		return C.conformCssObject( cssObject );
	}





	/* -- CSS TRANSFORMATIONS -----------------------------------------------
	 *
	 *
	 *
	 */
	C.applyTransform = function( _element, _key, _value ) {
		if( C.ifDebug( 'debug_level1' )) 
			trace( '    - CssManager.applyTransform(), ' + _key + ': ' + _value );
		var matrix2D = new Matrix2D();

		// existing transform
		var existingTransform = _element.style[ C.getDeviceKey( 'transform' )];
		var matrixMatch = existingTransform.match( /matrix[^\)]+\)/ );
		if( matrixMatch ) {
			matrix2D.setFromCss( matrixMatch[ 0 ]);
			if( C.ifDebug( 'debug_level2' ))
				trace( '       existing matrix:', matrix2D.data );
		}

		// determine individual transform and pre-existing value
		var transformMethod = _key.match( /\(\s([^\s]+)/ )[ 1 ];
		if( 'transforms' in _element )
			var transforms = _element.transforms;
		else {
			var transforms = {
				'tx': 0,
				'ty': 0,
				'rz': 0,
				'sx': 1,
				'sy': 1
			};
		}
		var reverse = transforms[ transformMethod ] * -1;

		// apply value to matrix
		switch( transformMethod ) {
			case 'tx': 
				matrix2D.translate( reverse, 0 );
				matrix2D.translate( _value, 0 ); 
				break;
			case 'ty': 
				matrix2D.translate( 0, reverse );
				matrix2D.translate( 0, _value ); 
				break;
			case 'rz': 
				matrix2D.rotate( reverse * Math.PI / 180 );
				matrix2D.rotate( _value * Math.PI / 180 ); 
				break;
			case 'sx': 
				reverse = 1;  
				matrix2D.scale( reverse, 1 );
				matrix2D.scale( _value, 1 ); 
				break;
			case 'sy': 
				reverse = 1;  
				matrix2D.scale( 1, reverse );
				matrix2D.scale( 1, _value ); 
				break;
		}
		if( C.ifDebug( 'debug_level2' ))
			trace( '        > reverse existing transform( ' + transformMethod + ' ):', reverse );

		// store transform
		transforms[ transformMethod ] = _value;
		_element.transforms = transforms;
		if( C.ifDebug( 'debug_level2' ))
			trace( '       updated matrix:', matrix2D.data );

		// apply css matrix
		_element.style[ C.getDeviceKey( 'transform' )] = matrix2D.getCss();
	}



	/* -- KEY MAPPING -----------------------------------------------
	 *
	 *
	 */
	C.conformKeyValue = function( _key, _value ) {
		_key = String( _key ).trim();
		_value = String( _value ).trim();
		var keyAsStandard = C.formatKey( _key, 'hyphen' );
		return C.conformValue( keyAsStandard, _value )
	}
	C.stripPrefix = function( _key ) {
		return _key.replace( /-?(moz|webkit|ms|o)-/, '' );
	}
	C.hasPrefix = function( _key ) {
		return _key.search( /-?(moz|webkit|ms|o)-/ ) > -1;
	}
	C.getDeviceKey = function( _key ) {
		return _key in C.deviceKeyDict ? C.deviceKeyDict[ _key ] : _key;
	}




	// converts any syntax of css-key to a consistent format, either hyphenated( "hyphen" ) or camel case( "camel" )
	C.formatKey = function( _key, _keyFormat ) {
		_key = C.stripPrefix( _key );
		_keyFormat = _keyFormat || 'hyphen'; // 'camel'; //
		if( C.ifDebug( 'debug_level2' )) trace( '   getting key as "' + _keyFormat + '"' );

		// check if key is an exception
		if( _key in C.keyFormatExceptions() ) 
			_key = _keyFormat != 'camel' ? C.keyFormatExceptions()[ _key ] : C.camelateKey( C.keyFormatExceptions()[ _key ] );

		// or procedurally convert to hyphen
		if( _keyFormat == 'hyphen' ) 
			_key = C.hyphenateKey( _key );
		else if( _keyFormat == 'camel' )
			_key = C.camelateKey( _key );

		if( C.ifDebug( 'debug_level2' )) trace( '    - result: "' + _key + '"' );
		return _key;
	}
	C.hyphenateKey = function( _key ) {
		_key = _key.replace( /([A-Z])/g, function( $1 ) { return '-' + ( $1 ).toLowerCase(); });
		_key = ( C.hasPrefix( _key ) && _key.indexOf( '-' ) != 0 ) ? '-' + _key : _key;
		return _key;		
	}
	C.camelateKey = function( _key ) {
		_key = _key.replace( /-(.)/g, function( $1 ) { return ( $1 ).charAt( 1 ).toUpperCase(); });
		return _key;
	}
	/* This dictionary handles INTERNAL differences between how css-keys are written in the build on the css-objects and how they must be written 
		as valid CSS. Primarily, these exceptions are the arguments of the transform function, translate(), rotate(), and scale(), which need to be further 
		handled during value conformation. The exceptions could also include any semantic differences that might ease production confusion.

		** Do not confuse this with browser-key differences!! ex: transform vs. -ms-transform. Browser-keys are handled by <CssManager>.generateBrowserKeyDictionary() */
	C.keyFormatExceptions = function() {
		return {
			'bgImage': 		'background-image', // deprecated
			'x': 			'transform( tx )',
			'translateX': 		'transform( tx )',
			'y': 			'transform( ty )',
			'translateY': 		'transform( ty )',

			'rotate': 		'transform( rz )',
			'rotation': 		'transform( rz )',

			'scaleX': 		'transform( sx )',
			'scaleY': 		'transform( sy )'
		};
	}








	/* -- VALUE PARSING -----------------------------------------------
	 *
	 *
	 */
	/* takes a single css param, arg or func, and conforms it to _adlib standard */
	C.conformValue = function( _key, _value ) {
		var conformedValues = [];
		var conformedValue;

		// look for numeric values 
		var hasMultipleValues = _value.match( /\s/ );
		var numericValue = _value.match( C.matchNumberRegex() );
		if( !hasMultipleValues && numericValue ) {
			if( C.ifDebug( 'debug_level2' )) trace( '   conform value as number' );
			conformedValue = Number( numericValue[ 0 ] );
			/* get existing unit */
			var unitMatch = _value.match( /[^0-9\.]+$/ );
			if( unitMatch ) 
				conformedValue += unitMatch[ 0 ];
			/* assume default unit */
			else 
				switch( _key ) {
					case 'top': case 'right': case 'bottom': case 'left':
					case 'width': case 'height':
					case 'font-size':
					case 'line-height':
					case 'border-radius':
					case 'padding' : 
					case 'margin' : 
					case 'margin-right': case 'margin-left': case 'margin-top': case 'margin-bottom':
						conformedValue += 'px';
						break;
				}
		}

		// background images - allows for either a stand-alone URL, or proper css like 'url( "http://example.com/image.jpg" );' 
		else if( _key == 'background-image' ) {
			if( C.ifDebug( 'debug_level2' )) trace( '   conform value as background image' );
			_value = _value.replace( /^url\(\s*['"]*/, '' ).replace( /['"]*\s*\)$/, '' );
			conformedValue = 'url( "' + _value + '" )'
		}

		// transform-functions - should be split apart so a single matrix function can be written
		//	faster to just specify the transform exactly via css-object keys: x, y, rotate, scaleX, scaleY
		else if( _key == 'transform' ) { // && Device.browser == 'ie' ) {
			if( C.ifDebug( 'debug_level2' )) trace( '   convert "transform" functions to individual transforms' );
			var functionRegex = /([a-z0-9]+)\(([^\)]+)\)/ig;
			while( params = functionRegex.exec( _value )) {
				var args = params[ 2 ].replace( /\s/g, '' ).split( ',' ).map( function( value, index, array ) {
					return Number( value.match( CssManager.matchNumberRegex() )[ 0 ] );
				});
				switch( params[ 1 ] ) {
					case 'translate':
						conformedValues.push([ 'transform( tx )', args[ 0 ] ]);
						conformedValues.push([ 'transform( ty )', args[ 1 ] ]);
						break;
					case 'translateX':
						conformedValues.push([ 'transform( tx )', args[ 0 ] ]);
						break;
					case 'translateY':
						conformedValues.push([ 'transform( ty )', args[ 0 ] ]);
						break;

					case 'rotate':
						conformedValues.push([ 'transform( rz )', args[ 0 ] ]);
						break;

					case 'scale':
						conformedValues.push([ 'transform( sx )', args[ 0 ] ]);
						conformedValues.push([ 'transform( sy )', args[ 1 ] ]);
						break;
					case 'scaleX':
						conformedValues.push([ 'transform( sx )', args[ 0 ] ]);
						break;
					case 'scaleY':
						conformedValues.push([ 'transform( sy )', args[ 0 ] ]);
						break;
				}
			}
		}

		// pass through
		else {
			if( C.ifDebug( 'debug_level2' )) trace( '   conform value as string' );
			conformedValue = _value;
		}

		// create style pair
		if( conformedValue != undefined ) {
			if( C.ifDebug( 'debug_level2' )) trace( '    - result: "' + conformedValue + '"' );
			conformedValues.push([ 
				_key,
				conformedValue
			]);
		}

		return conformedValues;
	}

	this.matchNumberRegex = function() {
		return /^[+-]?[0-9]*\.?[0-9]+/;
	}
}

