/* ################################################################################################
 * #
 * #		RED Interactive - Digital Advertising
 * #		Hulu | Pre_Fall_and_Fall_Campaign | YT_Masthead_Mood_Slider | DCS | 2.2
 * #
 * ################################################################################################ */
trace( "----------------------------------------------------------------------------------------------------------------------------" );
trace( " DCS_970x250_970x500_text_payload.js[ Hulu | Pre_Fall_and_Fall_Campaign | YT_Masthead_Mood_Slider | DCS | 970x250_970x500 | 2.2 ]" );
trace( "  VERSION - core.txt[ AdApp: 1.2.28, AdHtml: v2.6.4, Instance: 09/13/16 12:44pm ]" );
trace( "  " );
trace( "  VERSION - template.txt[ Template: DC Studio - Expandable, AdApp: 1.2.28, AdHtml: v2.6.3, Instance: 09/08/16 10:25am ]" );
trace( "----------------------------------------------------------------------------------------------------------------------------" );









/* -- CORE: PrepareCore.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var PrepareCore = new function() {

	var self = this;
	var assetLoader = undefined;
	var jsonPending = false;

	var async;
	self.init = function( _completeCallback ) {
		trace( 'PrepareCore.init()' );
		async = new Async();
		async.onComplete( _completeCallback );
		prepareFbaPayload();
		queueRequestedImages();	
		loadFonts();
		Device.init();
		Device.trace();
		Gesture.init();
		CssManager.init();

		async.start();
	}
	function prepareFbaPayload() {
		if( 'payload' in assets ) {
			if( assets.payload.binary.length ) {
				trace( 'PrepareCore.prepareFbaPayload()' );
				async.wait();
				new Loader( adParams.adPath + assets.payload.binary[ 0 ], {
					name: "fbaLoader", 
					scope: global,
					fileType: 'fba',
					onFail: failAd, 
					onComplete: function(event){
						new Loader( event, {
							name: "fbaContentLoader", 
							scope: global,
							onFail: failAd, 
							onComplete: handleFbaPayloadComplete
						}).load();
					}
				}).load();
			}
		}
	}
	function handleFbaPayloadComplete( loader ){
		ImageManager.addFbaImages( loader );
		async.done();
	}
	function queueRequestedImages() {
		ImageManager.addLoader( new Loader( 
			assets.images, { 
				name: 'indexImages', 
				prepend: adParams.imagesPath 
		}));
		ImageManager.addLoader( new Loader( 
			assets.edgeImages, { 
				name: 'edgeImages', 
				prepend: adParams.edgePath 
		}));
	}
	function loadFonts() {
		trace( 'PrepareCore.loadFonts()' );

		if( !adParams.useFontJS ) {
			async.wait();
			fontLoader = new Loader({ 
				name: 'fontLoader', 
				onComplete: loadFontsComplete,
				onFail: global.failAd, 
				scope: self
			});
			fontLoader.add( new Loader( assets.fonts, { name: 'fontSubLoader', prepend: adParams.fontsPath, fileType: 'ttf' }));
			fontLoader.add( new Loader( assets.edgeFonts, { name: 'fontEdgeSubLoader', prepend: adParams.fontsPath, fileType: 'ttf' }));
			fontLoader.load();
		}
		else {
			trace( ' - using "Font.js", requesting:' );
			var fontFilenames = assets.fonts.concat( assets.edgeFonts );
			for( var key in fontFilenames ) {
				trace( '	' + fontFilenames[ key ]);
				async.wait();
				var font = new Font();
				font.onload = loadFontsComplete;
				font.onerror = function() {
					trace( '"Font.js" FAILED to load fonts.' );
					failAd();
				};
				font.fontFamily = fontFilenames[ key ].substring( 
					fontFilenames[ key ].lastIndexOf( '/' ) + 1, 
					fontFilenames[ key ].indexOf( '.' )
				);
				font.src = adParams.fontsPath + fontFilenames[ key ];
			}		
		}

	}
	function loadFontsComplete() {
		async.done();
	}


}










/* -- CORE: Async.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var Async = function Async() {

	var A = this;
	A.wait = function() {
		tokens.push( 1 );
	}
	A.done = function() {
		tokens.pop();
	}
	A.onComplete = function( _callback ) {
		callback = _callback;
	}
	A.start = function() {
		asyncIntervalId = setInterval( checkAsyncComplete, INTERVAL_RATE_IN_MS );
		checkAsyncComplete();
	}
	var INTERVAL_RATE_IN_MS = 25;

	var asyncIntervalId = -1;
	var tokens = [];
	var callback;

	var checkAsyncComplete = function() {
		if( callback && !tokens.length ) {
			clearInterval( asyncIntervalId );
			callback.call();
		}
	}
}











/* -- CORE: Device.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var Device = new function(){
	
	var D = this;
	D.pixelRatio = window.devicePixelRatio || 'unknown';
	Object.defineProperties ( D, {
		orientation : {
			get: function() {
				return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait' ;
			}
		},
		dimensions : {
			get: function() {
				return {
					width : window.innerWidth,
					height : window.innerHeight
				}
			}
		}
	})
	D.init = function(){
		trace( 'Device.init()');

		D.agentString = navigator.userAgent;		
		for ( var m in D ){
			if ( m != 'init' && m != 'trace' && typeof D[m] == 'function' ){
				D[m].call();
			}
		}
	}
	D.trace = function() {
		var line = Array(70).join('-')
		var str = '\n' + line;
		str += '\n AGENT:\n\n\t' + D.agentString + '\n';
		str += '\n  Brand:\t\t\t' + D.brand;
		str += '\n  Product:\t\t\t' + D.product;
		str += '\n  Type:\t\t\t\t' + D.type;
		str += '\n  Os:\t\t\t\t' + D.os + ' - ' + D.osVersion;
		str += '\n  Browser:\t\t\t' + D.browser + ' - ' + D.browserVersion;		
		str += '\n  Dimensions: \t\t' + D.dimensions.width + 'x' + D.dimensions.height;
		str += '\n  Orientation:\t\t' + D.orientation;
		str += '\n  Pixel Ratio:\t\t' + D.pixelRatio;
		str += '\n' + line;
		trace ( str )
	}
	D._getType = function(){
		var hasMobile = /(android|mobile)/gi.exec( D.agentString );
		var hasTablet = /(tablet|touch)/gi.exec( D.agentString );
		var hasIPad = /(ipad)/gi.exec( D.agentString );
		D.type = 'desktop';
		if ( hasMobile ) D.type = 'mobile';
		if ( hasTablet ) D.type = 'tablet'; 
		if ( hasIPad ) D.type = 'tablet';
	}

	D._getBrowser = function(){
		var browserMatches = /(edge(?=\/))\/?\s*([0-9\.]+)/i.exec( D.agentString ); // check for edge first
		if ( !browserMatches ){
			browserMatches = D.agentString.match( /(fban|fbav|opera|chrome|crios|safari|firefox|msie|trident(?=\/))\/?\s*([0-9\.]+)/i );
		}
		D.browser = browserMatches[1].toLowerCase();
		D.browserVersion = browserMatches[2];

		switch ( D.browser ){
			case 'trident' : 
				var versionMatch = /\brv:+(\d+)/g.exec(D.agentString);
				if( versionMatch )
					D.browserVersion = versionMatch[ 1 ];
			case 'msie' :
				D.browser = 'ie';
				break;
			case 'crios' :
				D.browser = 'chrome';
				break;
			case 'safari' :
				var versionMatch = D.agentString.match( /\sversion\/([0-9\.]+)\s/i );
				if( versionMatch )
					D.browserVersion = versionMatch[ 1 ];
				break;
			case 'chrome' :
				var versionMatch = D.agentString.match( /\b(OPR)\/([0-9\.]+)/i );
				if ( versionMatch ){
					D.browser = 'opera';					
					D.browserVersion = versionMatch [ 2 ];
				}
				break;
		}
	}

	D._getBrandAndOS = function(){
		var apple = D.agentString.match ( /ip(hone|od|ad)|mac/gi );
		if ( apple ) {
			D.brand = 'apple';
			D.product = apple[0].toLowerCase();
			var appleOS = /(OS\s)(\X\s|)([\d\.\_]+)/gi.exec( D.agentString );
			D.os = appleOS[2] == '' ? 'ios' : 'osx' ;
			D.osVersion = appleOS[3].replace( /\_/g, '.');
			return;
		}
		
		var android = /(android)\/?\s*([0-9\.]+)/gi.exec( D.agentString );
		if ( android ){
			D.brand = D.product = D.os = android[1].toLowerCase();
			D.osVersion = android[2];
			return;
		}

		var microsoft = /(windows\snt\s|windows\sphone)\/?\s*([0-9\.]+)/gi.exec( D.agentString )
		if ( microsoft ){
			D.brand = 'microsoft';
			D.os = 'windows';

			switch ( microsoft[2] ){
				case '5.2': 	D.osVersion = 'xp';		break;
				case '6.0': 	D.osVersion = 'vista';	break;
				case '6.1': 	D.osVersion = '7'; 		break;
				case '6.2': 	D.osVersion = '8';		break;
				case '6.3': 	D.osVersion = '8.1';	break;
				case '10.0': 	D.osVersion = '10'; 	break;
				default:
					D.osVersion = microsoft[2];
			}
			
			D.product = microsoft[1].toLowerCase();
			if ( D.product.match(/\snt/i) ){
				D.product = 'pc';
			}
			return;
		}
		var blackberry = D.agentString.match( /(blackberry|bb10|playbook)/i );
		if ( blackberry ){
			D.brand = D.product = D.os = 'blackberry';
			D.osVersion = /(version)\/?\s*([0-9\.]+)/gi.exec( D.agentString )[2];
		}
	}
	
};











/* -- CORE: CssManager.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var CssManager = new function() {

	var C = this;
	C.init = function() {
		trace( 'CssManager.init()' );
		C.generateBrowserKeyDictionary();
	}
	C.debug_level1 = false;
	C.debug_level2 = false;
	C.filter;
	C.debug_element;
	C.debug_css_list;
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
	C.deviceKeyDict;

	C.generateBrowserKeyDictionary = function() {
		trace( 'CssManager.generateBrowserKeyDictionary()' );
		C.deviceKeyDict = {};
		for( var key in document.createElement( 'div' ).style ) {
			var hyphenKey = C.formatKey( key, 'hyphen' );
			var standardKey = C.stripPrefix( hyphenKey );
			if( standardKey in C.deviceKeyDict ) {
				if( C.hasPrefix( hyphenKey ))
					C.deviceKeyDict[ standardKey ] = hyphenKey;
			}
			else C.deviceKeyDict[ standardKey ] = hyphenKey;
		}
		switch( Device.browser ) {
			case 'chrome':
			case 'safari':
				break;
			case 'firefox':
				C.deviceKeyDict[ 'transform' ] = 'transform'; 
				C.deviceKeyDict[ 'transform-origin' ] = 'transform-origin'; 
				break;
		}
		trace( ' KEY DICTIONARY:', C.deviceKeyDict );
	}
	C.apply = function( _element, _cssList ) {
		C.debug_element = _element;
		C.debug_css_list = _cssList;
		if( C.ifDebug( 'debug_level1' )) trace( '  CssManager.apply()', _element.id );
		for( var key in _cssList ) {
			if( key.match( /^transform\(/ ) )
				C.applyTransform( _element, key, _cssList[ key ] );
			else {
				if( C.ifDebug( 'debug_level1' )) trace( '   ' + key + ': ' + _cssList[ key ] + ';' );
				_element.style[ C.getDeviceKey( key ) ] = _cssList[ key ];
			}
		}
		if( C.ifDebug( 'debug_level1' )) trace( '\n\n' );
		C.debug_element = null;
		C.debug_css_list = null;
	}
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
	C.applyTransform = function( _element, _key, _value ) {
		if( C.ifDebug( 'debug_level1' )) 
			trace( '    - CssManager.applyTransform(), ' + _key + ': ' + _value );
		var matrix2D = new Matrix2D();
		var existingTransform = _element.style[ C.getDeviceKey( 'transform' )];
		var matrixMatch = existingTransform.match( /matrix[^\)]+\)/ );
		if( matrixMatch ) {
			matrix2D.setFromCss( matrixMatch[ 0 ]);
			if( C.ifDebug( 'debug_level2' ))
				trace( '       existing matrix:', matrix2D.data );
		}
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
		transforms[ transformMethod ] = _value;
		_element.transforms = transforms;
		if( C.ifDebug( 'debug_level2' ))
			trace( '       updated matrix:', matrix2D.data );
		_element.style[ C.getDeviceKey( 'transform' )] = matrix2D.getCss();
	}
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
	C.formatKey = function( _key, _keyFormat ) {
		_key = C.stripPrefix( _key );
		_keyFormat = _keyFormat || 'hyphen'; // 'camel'; //
		if( C.ifDebug( 'debug_level2' )) trace( '   getting key as "' + _keyFormat + '"' );
		if( _key in C.keyFormatExceptions() ) 
			_key = _keyFormat != 'camel' ? C.keyFormatExceptions()[ _key ] : C.camelateKey( C.keyFormatExceptions()[ _key ] );
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
	C.conformValue = function( _key, _value ) {
		var conformedValues = [];
		var conformedValue;
		var hasMultipleValues = _value.match( /\s/ );
		var numericValue = _value.match( C.matchNumberRegex() );
		if( !hasMultipleValues && numericValue ) {
			if( C.ifDebug( 'debug_level2' )) trace( '   conform value as number' );
			conformedValue = Number( numericValue[ 0 ] );
			var unitMatch = _value.match( /[^0-9\.]+$/ );
			if( unitMatch ) 
				conformedValue += unitMatch[ 0 ];
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
					case 'border-radius':
					case 'border-width':
					case 'letter-spacing':
						conformedValue += 'px';
						break;
				}
		}
		else if( _key == 'background-image' ) {
			if( C.ifDebug( 'debug_level2' )) trace( '   conform value as background image' );
			_value = _value.replace( /^url\(\s*['"]*/, '' ).replace( /['"]*\s*\)$/, '' );
			conformedValue = 'url( "' + _value + '" )'
		}
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
		else {
			if( C.ifDebug( 'debug_level2' )) trace( '   conform value as string' );
			conformedValue = _value;
		}
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











/* -- CORE: ImageManager.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var ImageManager = new function(){
	var I = this;

	var _pending = [];
	var _imageManagerLoader;
	var _dict = {};
	var _isLoading = false;
	var _onComplete = function(){};
	I.addToLoad = function( file, prepend ) {
		if ( !checkLoading( 'addToLoad', file ) ){
			file = ( prepend || '' ) + file;
			_pending.push( file );  
			return LoaderUtils.getFileName( file );
		}
	}
	I.addLoader = function( loader ) {
		if ( !checkLoading( 'addLoader', loader ) ){
			checkLoader();
			_imageManagerLoader.add( loader );
		}
	}
	I.get = function ( imageId ){
		if( _dict[ imageId ] ) 
			return _dict[ imageId ];
		else
			throw new Error ( "ImageManager : No image named '" + imageId + "' has been loaded" );
	}
	I.load = function ( callback ){
		if ( !checkLoading( 'load' ) ){
			_isLoading = true;
			checkLoader();
			_onComplete = callback;
			_imageManagerLoader.add( new Loader( _pending, { name: 'dynamicImages' }) );	
			_imageManagerLoader.load();
		}
	}

	I.addFbaImages = function ( target ){
		if ( target )
			addToDictionary ( target.getAllContentRaw() );
	}
	function addToDictionary ( content ){
		for ( var i = 0; i < content.length; i++ ){
			if ( content[i] instanceof Image || content[i] instanceof SVGElement ){
				var img = content[i];
				checkId ( img.id )
				_dict [ img.id ] = img;
			}
		}
		trace ( 'ImageManager:', _dict );
		_onComplete.call();		
	}

	function checkLoader(){
		if ( !_imageManagerLoader ){
			_imageManagerLoader = new Loader({ 
				name : 'imageManagerLoader',
				onComplete : handleLoadComplete,
				onFail : global.failAd
			});
		}
	}

	function checkLoading( method, target ){
		if ( _isLoading )
			throw new Error ( 'ImageManager is currently loading...\n\n\tCan NOT call ImageManager.' + method + '(' + (target||'') + ') until previous callback is fired.\n\n' )
		return _isLoading
	}

	function checkId ( id ){
		if ( _dict[id] )
			throw new Error ( 'Duplicate Image Id - One or more images loading in have the same name. Each Image needs a unique file name.' );
	}
	function handleLoadComplete ( target ){
		_imageManagerLoader = null;
		_pending = [];
		_isLoading = false;

		addToDictionary ( target.getAllContentRaw() );
	}

}










/* -- CORE: SheetManager.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var SheetManager = new function SheetManager(){
	this.createGlobalNode = function( nodeId, nodeName, styles ){
		if ( document.getElementById( nodeId ) ) return;

		var style = document.createElement( 'style' );
		style.type = 'text/css';
		style.id = nodeId;

		var str = '';
		for ( var i = 0; i < arguments.length - 1; i += 2 ){
			
			var names = arguments [ i + 1 ].split(',');
			
			for ( var k = 0; k < names.length; k++ ){
				str += names[k].replace(/^[\s]+/g,'');
				if ( k < names.length -1 )
					str += ',' 
			}
			str += ' { ' + (arguments [ i + 2 ] || '') + ' }\n';
		}
	
		style.innerHTML = str;
		document.getElementsByTagName( 'head' )[ 0 ].appendChild( style );
	}
	this.addClass = function( target, className ) {
		var element = Markup.getElement( target );
		for ( var i = 0; i < arguments.length - 1; i++ ){
			element.classList.add( arguments [ i + 1 ])
		}
	}
	this.removeClass = function( target, className ) {
		var element = Markup.getElement( target );
		element.classList.remove( className );
	}
}









/* -- CORE: Styles.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var Styles = new function() {

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
	this.getCss = function( _element, _key ) {
		_element = Markup.getElement( _element );
		
		var cssValue;

		if ( _key == 'x' || _key == 'y' ){
			var existingTransform = _element.style[ CssManager.getDeviceKey( 'transform' )];
			var matrix = existingTransform.replace(/[\s\(\)matrix]/g, '').split(',');
			cssValue = (matrix.length < 6) ? 0 : +matrix[ _key == 'x' ? 4 : 5 ] ;
		} else {
			var style = window.getComputedStyle( _element, null );
			cssValue = style.getPropertyValue( _key ).replace( /px/, '' );
			if( !isNaN( cssValue )) cssValue = parseInt( cssValue, 10 );
		}

		return cssValue;
	}
	this.show = function( _element ) {
		Styles.setCss( _element, 'visibility', 'visible' );
	}
	this.hide = function( _element ) {
		Styles.setCss( _element, 'visibility', 'hidden' );
	}
	this.setBackgroundImage = function( _target, _imageUrl ) {
		var element = Markup.getElement( _target );
		if( _imageUrl instanceof HTMLImageElement ) {
			_imageUrl = _imageUrl.src;
		} 
		element.style.backgroundImage = 'url(' + _imageUrl + ')';
	}
	this.setBackgroundColor = function( _target, _color ) {
		var element = Markup.getElement( _target );
		element.style[ 'background-color' ] = _color;
	}
	this.getWidth = function( _target ) {
		var element = Markup.getElement( _target );
		return element.offsetWidth;
	}
	this.getHeight = function( _target ) {
		var element = Markup.getElement( _target );
		return element.offsetHeight;
	}
	this.getTop = function( _target ) {
		return Styles.getCss( _target, 'top' );
	}
	this.getLeft = function( _target ) {
		return Styles.getCss( _target, 'left' );
	}
	this.getX = function( _target ){
		return Styles.getCss( _target, 'x' );
	}
	this.getY = function( _target ){
		return Styles.getCss( _target, 'y' );
	}



}










/* -- CORE: Markup.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var Markup = new function() {
	
	var self = this;
	self.getElement = function( _target ) {
		if( typeof _target !== 'string' ) return _target;
		else if( _target === 'head' ) return Markup.getHeader();
		else if( _target === 'body' ) return Markup.getBody();
		else return document.getElementById( _target );
	}
	self.clearElement = function ( _target ) {
		var element = Markup.getElement ( _target );
		trace ( 'clearElement (' + _target + ')' );
		while ( element.firstChild ) 
    			element.removeChild ( element.firstChild );
	}
	self.getParent = function( _target ) {
		return Markup.getElement( _target ).parentNode;
	}
	self.getBody = function() {
		return document.getElementsByTagName( 'body' )[0];
	}
	self.getHeader = function() {
		return document.getElementsByTagName( 'head' )[0];
	}
	self.addDiv = function( _containerData ) {
		var element = document.createElement( 'div' );
		element.id = _containerData.id;

		Markup.applyContainerCss( element, _containerData );

		if ( _containerData.target )
			Markup.addChild( _containerData.target, element );
		
		return element;
	}
	self.applyContainerCss = function( _element, _containerData ) {
		if( !_containerData.css ) _containerData.css = {};
		if( !_containerData.css.position )
			_containerData.css.position = 'absolute';
		Styles.setCss( _element, _containerData.css );
		Styles.setCss( _element, _containerData.styles );
	}
	self.removeDiv = function( _target ) {
		var elem = self.getElement( _target );
		elem.parentNode.removeChild( elem );
	}
	self.addTextfield = function( _containerData, _text, _debug, _fitContainerToContents ) {
		_debug = _debug || false;
		var opacity = ( typeof _debug === 'boolean' ) ? 1 : _debug ;
		if( _debug ) _containerData.css['backgroundColor'] = 'rgba(255,0,0,' + opacity + ')';
		var container = Markup.addDiv( _containerData );
		var parentData = {
			id: _containerData.id + '_textParent',
			target: _containerData.id,
			css: {
				position: 'absolute',
				width: Styles.getCss( container, 'width' ) - ( _containerData.margin * 2 ),
				height: Styles.getCss( container, 'height' ),
				left: _containerData.margin
			}
		};
		if( _debug ) parentData.css['backgroundColor'] = 'rgba(0,0,255,' + opacity + ')';
		var parent = Markup.addDiv( parentData );
		var tfData = {
			id: _containerData.id + '_textfield',
			target: parentData.id,
			css: {
				position: 'absolute',
				fontSmoothing: 'antialiased',
				osxFontSmoothing: 'grayscale',
				width: 'auto',
				height: 'auto',
				whiteSpace: _containerData.multiline ? 'normal' : 'nowrap'
			},
			multiline: _containerData.multiline ? true : false,
			styles: _containerData.textStyles
		};
		if( _debug ) tfData.css['backgroundColor'] = 'rgba(0,180,0,' + opacity + ')';
		var textfield = Markup.addDiv( tfData );
		if( _text ) textfield.innerHTML = _text;
		if( _fitContainerToContents ) {
			var textWidth = Styles.getWidth( textfield );
			var _margin = parseInt( _containerData.margin );

			Styles.setCss( parent, 'width', textWidth );
			Styles.setCss( parent, 'left', _margin )
			
			var newContainerWidth = parseInt( textWidth + _margin * 2 );
			Styles.setCss( container, 'width', newContainerWidth );

			var textHeight = Styles.getHeight( textfield );
			Styles.setCss( parent, 'height', textHeight );
			Styles.setCss( container, 'height', textHeight );
		}
		return {
			container: container,
			parent: parent,
			textfield: textfield
		};
	}
	self.addInputField = function( _containerData ) {
		var element = document.createElement( 'input' );
		element.id = _containerData.id;

		element.setAttribute( 'type', 'text' );
		element.setAttribute( 'value', _containerData.defaultValue );
		_containerData.css.boxSizing = 'border-box';
		Markup.applyContainerCss( element, _containerData );

		Markup.addChild( _containerData.target, element );
		return element;
	}
	self.addCanvas = function( _containerData, _add){
		var element = document.createElement( 'canvas' );
		element.id = _containerData.id;
		element.width = _containerData.css.width;
		element.height = _containerData.css.height;
		delete _containerData.css.width;
		delete _containerData.css.height;
		Markup.applyContainerCss( element, _containerData );
		if (_add === false ? false : true) Markup.addChild( _containerData.target, element );
		return element;
	}
	self.addiFrame = function( _containerData ) {
		var element = document.createElement( 'iFrame' );
		element.id = _containerData.id;
		element.width = _containerData.css.width;
		element.height = _containerData.css.height;
		
		delete _containerData.css.width;
		delete _containerData.css.height;
		element.setAttribute( 'src', _containerData.source );
		element.setAttribute( 'frameborder', '0' );
		element.setAttribute( 'scrolling', 'no' );
		element.setAttribute( 'allowfullscreen', '' );

		Markup.applyContainerCss( element, _containerData );

		Markup.addChild( _containerData.target, element );
		return element;
	}
	self.addSvg = function( _containerData ) {
		var nameSpace = 'http://www.w3.org/2000/svg';
		var element = document.createElementNS( nameSpace, 'svg' );
		element.setAttribute( 'height', _containerData.height );
		element.setAttribute( 'width', _containerData.width) ;

		var path = document.createElementNS( nameSpace, 'path' );
		path.setAttribute( 'd', _containerData.d );
		path.setAttribute( 'fill', _containerData.fill );

		if( _containerData.stroke != undefined ) {
			path.setAttribute( 'stroke', _containerData.stroke );
		}	
		if( _containerData.strokeWidth != undefined ) {
			path.setAttribute( 'stroke-width', _containerData.strokeWidth );
		}
		element.appendChild( path );

		Markup.applyContainerCss( element, _containerData );

		Markup.addChild( _containerData.target, element );
		return element;
	}
	self.addChild = function( _target, _child ) {
		_target = Markup.getElement( _target );
		_child = Markup.getElement( _child );
		_target.appendChild( _child );
	}
	self.addHtml = function( newDivID, htmlString, cssString, targetID ) {
		var element = document.createElement('div');
		element.id = newDivID;
		element.innerHTML = htmlString;
		element.style.cssText = cssString;
		document.getElementsByTagName( targetID )[0].appendChild( element );
	}
	self.addBorder = function ( id, target, size, color, alpha, zIndex ){
		return new Border( id, target, size, color, alpha, zIndex );
	}

}









/* -- CORE: Align.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var Align = function() {

	var _rect = [ {
			x : 'offsetWidth',
			y : 'offsetHeight',
			parent : 'parentNode'
		}, {
			x : 'width',
			y : 'height',
			parent : 'drawer'
		}
	];
	function get ( source, arg ) {
		var elem = Markup.getElement( source );		
		var obj = {};
		var snap = !!arg.snap;		
		var sourceRect = ( isCanvasElement(elem) || isCanvasStage(elem) ) ? 1 : 0 ;
		
		if ( typeof arg == 'string' ){
			arg = calculate ( arg );
		}

		for ( var xy in arg ){
			if ( xy == 'x' || xy == 'y' ){

				var params = arg [ xy ];
				if ( !params ) continue;

				if ( typeof params == 'string' ){
					params = {
						type : params 
					}
				}
				
				var against;
				var againstDimension;
				var againstX = 0;

				if ( params.against ){
					against = params.against;
					
					var againstRect = 0;
					if ( isCanvasElement(against) ){
						againstX = against [ xy ];
						againstRect = 1;

					} else if ( isCanvasStage(against) ){
						againstRect = 1;

					} else {
						againstX = Styles.getCss ( against, xy );
					}

					againstDimension = _rect [ againstRect ][ xy ];
				
				} else {
					against = elem[_rect [ sourceRect ].parent];
					againstDimension = _rect [ sourceRect ][ xy ];
				}	
				
			
				var pos = calculate ( params.type, elem [ _rect [ sourceRect ][ xy ] ], against [ againstDimension ], !!arg [ xy ].outer );
				
				if ( pos != null ){
					pos += (againstX + (params.offset || 0));
					obj [ xy ] = snap ? Math.round(pos) : pos ; 
				}
			}
		}

		return obj;		
	}

	function set ( source, arg ) {
		var obj = get ( source, arg );
		if ( isCanvasElement(source) ){
			for ( var prop in obj )
				source [ prop ] = obj [ prop ]
		} else {
			Styles.setCss ( Markup.getElement( source ), obj );
		}		
		return obj;
	}
	function calculate ( mode, source, target, outer ) {
		var isConvert = arguments.length == 1;

		switch ( mode ){
			case 'alignBottom' :
				if ( outer ) 
					source = 0
				if ( !isConvert )
					return target - source;
			
			case 'alignTop' :
				return isConvert ? { y:mode } : outer ? -source : 0 ;
							

			case 'alignRight' :
				if ( outer ) 
					target = 0
				if ( !isConvert )
					return target - source;
						
			case 'alignLeft' :
				return isConvert ? { x:mode } : outer ? target : 0 ;

			case 'alignCenter' :
				if ( outer ) 
					target = 0
				return isConvert ? { x:mode, y:mode } : (target - source) / 2;
			
			default :
				return null;
		}
	}
	function isCanvasElement ( elem ){
		return global.CanvasDrawerElement && elem instanceof CanvasDrawerElement;
	}

	function isCanvasStage ( elem ){
		return global.CanvasDrawerStage && elem instanceof CanvasDrawerStage;
	}
	return {
		BOTTOM 	: 	'alignBottom',
		CENTER 	: 	'alignCenter',
		LEFT 	: 	'alignLeft',
		RIGHT 	: 	'alignRight',
		TOP 	: 	'alignTop',
		BOTTOM_LEFT		: 	'alignBottomLeft',
		BOTTOM_RIGHT	: 	'alignBottomRight',
		TOP_LEFT 		: 	'alignTopLeft',
		TOP_RIGHT 		: 	'alignTopRight',
		get 	: 	get,
		set 	: 	set,
		calculate : calculate
	}

}()









/* -- CORE: UIDiv.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
function UIDiv ( arg ){
	SheetManager.createGlobalNode ( 'RED_uiDiv', 
		'.ui-div', 'position:absolute;'
	)
	var U = document.createElement('div');
	SheetManager.addClass ( U, 'ui-div' );

	arg = arg || {}
	if ( arg.id ) 
		U.id = arg.id;
	Styles.setCss( U, arg.css );
	if ( arg.target ){
		var target = Markup.getElement ( arg.target )
		target.appendChild( U );
	}
	Object.defineProperty ( U, 'parent', {
		get : function(){
			return U.parentNode
		}
	})
	U.toString = function(){
		return '[object UIDiv]';
	}

	return U;
}










/* -- CORE: UIComponent.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
function UIComponent ( arg ){
		
	var _enabled = true;
	var _showing = true;
	arg = arg || {};
	var U = new UIDiv ( arg );
	U._align = arg.align;
	
	Object.defineProperties ( U, {
		x: {
			get: function() {
				return Styles.getCss ( U, 'x' )
			},
			set: function ( value ) {
				Styles.setCss ( U, { x : value })
			}
		},
		y: {
			get: function() {
				return Styles.getCss ( U, 'y' )
			},
			set: function ( value ) {
				Styles.setCss ( U, { y : value })
			}
		},
		width: {
			get: function() {
				return U.offsetWidth;
			},
			set: function ( value ) {
				Styles.setCss ( U, { width : value });
				
				var evt = new CustomEvent ( UIEvent.RESIZE )
				evt.direction = 'width';
				U.dispatchEvent ( evt );
			}
		},
		height: {
			get: function() {
				return U.offsetHeight;
			},
			set: function ( value ) {
				Styles.setCss ( U, { height : value })
				
				var evt = new CustomEvent ( UIEvent.RESIZE )
				evt.direction = 'height';
				U.dispatchEvent ( evt );
			}
		},
		enabled: {
			get: function() {
				return _enabled;
			},
			set: function ( state ) {
				_enabled = state;
				U.dispatchEvent ( UIEvent.componentEnabled )
			}
		},
		showing: {
			get: function() {
				return _showing;
			},
			set: function(){
				trace ( ':: WARNING ::\n\n\tUIComponent.showing cannot be set.\n\n' )
			}
		}
	});
	U.hide = function (){
		U.style.display = 'none';
		_showing = false;
	}
	U.show = function (){
		try {
			trace ( '    try removeProperty()')
			U.style.removeProperty ( 'display' );
		} catch (e) {
			trace ( '    catch display = null' )
			U.style.display = null;
		}
		_showing = true;
	}
	U.setCss = function( args ) {
		Styles.setCss ( U, args )
	}
	U.addChild = function( elem ){
		var child = Markup.getElement ( elem )
		U.appendChild ( child );

		if ( elem._align )
			Align.set( elem, elem._align )
	}
	U.inspect = function(){
		var o = {}
		var props = Object.getOwnPropertyNames(U);
		for ( var i = 0; i < props.length; i++ ){
			var val = U[props[i]];
			o [ props[i] ] = val;
		}
		trace ( '\n\t', U.toString(), '\t', U.id, '\n\t', o );
	}
	U.toString = function(){
		return '[object UIComponent]';
	}
	U._initAlign = function(){
		if ( arg.align && arg.target ){ 
			Align.set( U, arg.align )
		}
	}
	U.enabled = true;
	
	U._initAlign();

	return U;
}










/* -- CORE: UIImage.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
function UIImage ( arg ){
	SheetManager.createGlobalNode ( 'RED_uiImage', 
		'.ui-image', 'background-repeat:no-repeat; background-size:contain;'
	)
	var _init = true;
	var _source = null;
	var _retina = false;
	var _ratio = 'contain';
	var _aspectRatio = !!arg.aspectRatio;
	var _css = arg.css || {}
	if ( !arg.source ) throw new Error ( "UIImage : No image source set on '" + arg.id + "'" );
		
	arg.css = arg.css || {};

	var U = new UIComponent ( arg );
	SheetManager.addClass ( U, 'ui-image' );
	Object.defineProperties ( U, {
		source : {
			get : function() {
				return _source;
			},
			set : function ( value ) {
				_source = ImageManager.get ( value );
				U.style.backgroundImage = 'url(' + _source.src + ')';
			}
		},
		retina : {
			get : function() {
				return _retina;
			},
			set : function ( value ) {
				trace ( value)
				_retina = value
				resize();
			}
		},
		ratio : {
			get : function() {
				return _ratio;
			},
			set : function ( value ){
				_ratio = value;
				U.style.backgroundSize = value;
			}
		},
		aspectRatio : {
			get : function(){
				return _aspectRatio;
			},
			set : function ( value ){
				_aspectRatio = value;
				resize();
			}
		}
	});
	U.toString = function(){
		return '[object UIImage]';
	}
	function resize ( direction ) {
		trace ( 'resize()', direction )
		
		var denominator = _retina ? 2 : 1 ;			
		var ratio = _source.width / _source.height;

		var sourceWidth = arg.css.width || _source.width;
		var sourceHeight = arg.css.height || _source.height;

		var updateWidth = arg.css.width == undefined;
		var updateHeight = arg.css.height == undefined;	

		if ( !_init ){ 
			updateWidth = direction == 'height';
			updateHeight = direction == 'width';
			sourceWidth = U.width;
			sourceHeight = U.height;
		}

		if ( updateWidth ) {
			var width;
			if ( _aspectRatio && !updateHeight ){
				width = sourceHeight * ratio;
			} else {
				width = sourceWidth / denominator;
			}
			U.style.width = Math.round( width ) + 'px';
		}
		
		if ( updateHeight ) {
			var height;

			if ( _aspectRatio && !updateWidth ){
				height = sourceWidth / ratio;
			} else {
				height = sourceHeight / denominator;
			}
			U.style.height = Math.round( height ) + 'px';
		}
	}
	function handleResize ( event ){
		trace ( 'handleResize()', event, event.direction )
		resize( event.direction );
	}
	U.addEventListener ( UIEvent.RESIZE, handleResize );

	U.source = arg.source;
	U.retina = !!arg.retina;

	if ( arg.ratio ) 
		U.ratio = arg.ratio;

	U._initAlign();
	_init = false;
	
	return U;
}









/* -- CORE: UITextField.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
function UITextField ( arg ){
	SheetManager.createGlobalNode ( 'RED_uiTextfield', 
		'.ui-textfield', 'position:absolute; white-space:nowrap;',
		'.ui-textfield .content', 'position:relative; display:table-cell; cursor:default; line-height:100%; -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none;'
	)
	var _alignText;
	var _fontSize = 0;
	var _fontFamily;
	var _format = '';
	var _leading;
	var _spacing;
	var _bufferText = {
		top : 0,
		bottom : 0,
		left : 0,
		right : 0
	};
	var _text = '';
	var _init = true;
	
	var _verticalAlign;

	var _defaults = {}
	arg = arg || {};
	var U = new UIComponent ( arg );
	SheetManager.addClass ( U, 'ui-textfield' );

	var _content = document.createElement('span');
	SheetManager.addClass ( _content, 'content' );
	U.appendChild( _content );
	
	Object.defineProperties ( U, {
		alignText: {
			get: function() {
				return _alignText;
			},
			set: function ( value ) {
				if ( value && _alignText != value ){
					_alignText = value;

					var ta = (_alignText.match(/(left|right)/gi) || ['center'])[0].toLowerCase();
					Styles.setCss ( U, { lineHeight: U.height, textAlign: ta });

					_verticalAlign = (_alignText.match(/(bottom|top)/gi) || ['middle'])[0].toLowerCase();
					Styles.setCss ( _content, { verticalAlign: _verticalAlign })		
				}
			}
		},
		fontSize: {
			get: function() {
				return _fontSize;
			},
			set: function ( value ) {
				if ( !isNaN(value) && value > 0 ){
					_fontSize = value;
					U.style.fontSize = ~~value + 'px';
					
					update();
				}			
			}
		},
		fontFamily : {
			get: function() {
				return _fontFamily;
			},
			set: function ( value ) {
				_fontFamily = value;
				U.style.fontFamily = value;
				update();
			}
		},
		format: {
			get: function() {
				return _format;
			},
			set: function ( value ) {
				if ( _format != value ){
					_format = value;
					switch ( _format ){
						case 'paragraphClamp' :
						case 'paragraphFit' :
						case 'paragraph' :
							Styles.setCss( U, { whiteSpace: 'normal' });	
							break;					
						case 'resizeFit' :
						case 'inlineClamp' :
						case 'inlineFit' :
						default : // inline
							Styles.setCss( U, { whiteSpace: 'nowrap' });	
					}
					update();			
				}
			}
		},
		leading: {
			get: function() {
				return _leading;
			},
			set: function ( value ) {
				if ( value && _leading != value ){
					_leading = value;

					Styles.setCss ( _content, { lineHeight:(_leading * 100) + '%' });

					update();
				}
			}
		},
		spacing: {
			get: function(){
				return Styles.getCss ( U, 'letterSpacing' )
			},
			set: function ( value ) {
				if ( value && _spacing != value ){
					_spacing = value;

					Styles.setCss ( U, { letterSpacing : value });

					update();
				}
			}
		},
		bufferText: {
			get: function() {
				return _bufferText;
			},
			set: function ( value ) {
				if ( value && _bufferText != value ){
					
					var style = '';
					var order = [ 'top', 'right', 'bottom', 'left' ]
					
					for ( var i = 0; i < 4; i++ ){
						var prop = order[i];
						var propValue = isNaN(value) ? (value[prop] || 0) : value;
						_bufferText [ prop ] = propValue;
						style += propValue + 'px ';
					}
					
					Styles.setCss ( _content, { padding:style });

					update();
				}
			}
		},
		text: {
			get: function() {
				return _text;
			},
			set: function ( value ) {
				if ( value != undefined ){
					_text = value;
					U.setDefault( 'text', value )
					_content.innerHTML = value;
					update();				
				}
			}
		}
	});
	U.resetToDefault = function(){
		_init = true;
		if ( arguments.length > 0 ){
			for ( var i = 0; i < arguments.length; i++ )
				U [ arguments[i] ] = _defaults [ arguments[i] ]

		} else {
			for ( var param in _defaults )
				U [ param ] = _defaults [ param ]
		}
		_init = false;
		update()
	}
	U.setDefault = function( key, value ){
		_defaults [ key ] = value;
	}

	U.toString = function(){
		return '[object UITextfield]';
	}
	function initDefaults(){
		for ( var a in arg ){
			if ( a == 'css' ){
				for ( var b in arg.css ){
					switch ( b ){
						case 'x' :
						case 'y' :
						case 'width' :
						case 'height' :
							_defaults [ b ] = arg.css [ b ]
							break;
					}
				}
			} else if ( a == 'bufferText' ){
				_defaults [ a ] = {}
				for ( var prop in _bufferText ){
					_defaults [ a ][ prop ] = a [ prop ] || 0
				}
			} else {
				_defaults [ a ] = arg [ a ]
			}
		}
		trace ( 'defaults:', _defaults )
		delete _defaults.target;
		delete _defaults.id;
	}

	function update(){
		if ( _init ) return;

		if ( _format == 'paragraphClamp' || _format == 'inlineClamp' ){
			resizeToContent();
		} else {
			autoSizeContent();
		}
	}

	function autoSizeContent(){		
		Styles.setCss( _content, { verticalAlign: 'initial', height: 'initial', width: 'initial' });

		if ( _format == 'paragraphFit' ){
			
			var tempFontSize = _fontSize;			
			while ( U.scrollHeight > U.offsetHeight ) {
				if ( tempFontSize <= 0 ) break;
				tempFontSize--;
				U.style.fontSize = tempFontSize + 'px';
			}			
			_fontSize = tempFontSize;
			U.style.fontSize = _fontSize + 'px';

		} else if ( _format == 'inlineFit' ){
			
			var parentWidth = U.offsetWidth;
			var parentHeight = U.offsetHeight;

			U.style.fontSize = '30px';
			var largeWidth = _content.offsetWidth;
			var largeHeight = _content.offsetHeight;

			U.style.fontSize = '10px';
			var smallWidth = _content.offsetWidth;
			var smallHeight = _content.offsetHeight;

			var fontSizeWidth = MathUtils.rel ( 30, 10, largeWidth, smallWidth, parentWidth );
			var fontSizeHeight = MathUtils.rel ( 30, 10, largeHeight, smallHeight, parentHeight );
			
			_fontSize = ~~Math.min( _fontSize, Math.min(fontSizeWidth, fontSizeHeight) );
			U.style.fontSize = _fontSize + 'px';
		} 

		if ( _verticalAlign ) {
			Styles.setCss( _content, { 
				verticalAlign : _verticalAlign, 
				height : U.offsetHeight - _bufferText.top - _bufferText.bottom, 
				width : U.offsetWidth - _bufferText.left - _bufferText.right 
			});
		}
		

	}

	function resizeToContent(){
		Styles.setCss( _content, { height: 'initial', width: 'initial' });
		
		U.width = _content.offsetWidth;
		U.height = _content.offsetHeight; 
	}
	U.enabled = true;

	initDefaults();

	U.format = arg.format;
	U.fontSize = arg.fontSize;
	U.fontFamily = arg.fontFamily || 'Arial';
	U.alignText = arg.alignText;
	U.bufferText = arg.bufferText;
	U.leading = arg.leading;
	U.spacing = arg.spacing;
	
	_init = false;
	U.text = arg.text;

	U._initAlign();

	return U;
}










/* -- CORE: TextFormat.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var TextFormat = function() {
	return {
		INLINE			: 	'inline',
		INLINE_FIT		: 	'inlineFit',
		INLINE_CLAMP	: 	'inlineClamp',
		PARAGRAPH		: 	'paragraph',
		PARAGRAPH_FIT	: 	'paragraphFit',
		PARAGRAPH_CLAMP	: 	'paragraphClamp',

	}
}();









/* -- CORE: UIEvent.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var UIEvent = function(){
 	
	var _componentEnabled = new CustomEvent ( 'uiComponentEnabled' );
	var _sliderUpdate = new CustomEvent ( 'uiSliderUpdate' );
		
	return {
		ENABLED				: 	'uiComponentEnabled', 

		RESIZE				: 	'uiResize',
		SLIDER_UPDATE		: 	'uiSliderUpdate',

		componentEnabled	: 	_componentEnabled,
		sliderUpdate		: 	_sliderUpdate
	}
}()










/* -- CORE: FrameRate.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var FrameRate = new function(){
	var F = this;

	var _isPaused = true;
	var _isActive = true;
	var _sets = {};
	var _RAF;
	var _isiOS6 = /iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent);

	var _prefix = ['webkit', 'moz'];
	for ( var i = 0; !window.requestAnimationFrame && i < _prefix.length; i++ ) {
		window.requestAnimationFrame = window [ _prefix[i] + 'RequestAnimationFrame' ];
		window.cancelAnimationFrame = ( window [ _prefix[i] + 'CancelAnimationFrame'] || window [ _prefix[i] + 'CancelRequestAnimationFrame' ]);
	}
   
	if ( !window.requestAnimationFrame || !window.cancelAnimationFrame || _isiOS6 ) {
		trace ( 'PolyFill -> FrameRate' )
		window.requestAnimationFrame = function(callback) { return setTimeout( callback, 17 ) };
		window.cancelAnimationFrame = clearTimeout;
	}
	F.register = function ( from, handler, fps ){
		fps = fps || 30;
		if ( !_sets[fps] ){
			_sets[fps] = new FrameRateBase(fps);
		}

		var pool = _sets[fps].pool;
		for ( var i = 0; i < pool.length; i++ ){
			if ( pool[i].from === from && pool[i].handler === handler ){
				return;
			}
		}
		pool.push({
			handler : handler,
			from : from
		});

		if ( _isActive ) F.resume();
	}
	F.unregister = function ( from, handler, fps ){

		for ( var key in _sets ){
			if ( fps && key != fps ){
				continue;
			}
			
			var pool = _sets[key].pool;
			for ( var i = 0; i < pool.length; i++ ){
				if ( pool[i].from === from && pool[i].handler === handler ){
					pool.splice( i, 1 );
					break;
				}
			}
			if ( pool.length == 0 ){
				delete _sets[key];
			}
		}

		if ( Object.keys(_sets).length === 0 ){
			F.pause();
			_isActive = true;
		}
	}
	F.pause = function () {
		if ( arguments.length > 0 ){
			for ( var i = 0; i < arguments.length; i++ ){
				var fpsTarget = arguments[i];
				if ( _sets[fpsTarget] ){
					_sets[fpsTarget]._paused = true;
					_isPaused = true;
				}
			}
			for ( var d in _sets ){
				if ( !_sets[d]._paused ){
					_isPaused = false;
					break;
				}
			}
		} else {
			for ( var d in _sets )
				_sets[d]._paused = true;
			_isPaused = true;
		}

		if ( _isPaused ) {
			_isActive = false;
			window.cancelAnimationFrame ( _RAF );
		}
	}
	F.resume = function () {
		var _currentlyRunning = !_isPaused;
		if ( arguments.length > 0 ){
			for ( var i = 0; i < arguments.length; i++ ){
				var fpsTarget = arguments[i];
				if ( _sets[fpsTarget] ){
					_sets[fpsTarget]._paused = false;
					_isPaused = false;
				}
			}
		} else {
			for ( var d in _sets )
				_sets[d]._paused = false;
			_isPaused = false;
		}
		
		if ( !_currentlyRunning ) {
			_isActive = true;
			_RAF = window.requestAnimationFrame ( tick );
		}
	}
	F.secondsAsFrames = function ( sec ){
		return 1 / sec;
	}
	function tick () {
		if ( !_isPaused ){      
			for ( var h in _sets ){
				_sets[h].tick();
			}
			window.requestAnimationFrame ( tick );            
		}
	} 

}










/* -- CORE: FrameRateBase.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
function FrameRateBase ( fps ){
	trace ( 'new FrameRateBase(), again')
	var F = this;
	F.pool = [];
	F.fps = fps;

	F._frameTime = Math.floor(1000 / F.fps);
	F._prevTime = 0;
	F._startTime = 0;
	F._nextTime = 0;
	F._maxLag = 400;
	F._shiftLag = 30;
	F._paused = false;
	F._prevCallTime = Date.now();

	F.diffTime = 0;
}

FrameRateBase.prototype = {
	resume : function(){
		var F = this;
		if ( F._isPaused ){
			F._startTime = Date.now();
			F._prevCallTime = F._startTime;
			F._prevTime = F._startTime;
			F._nextTime = 0;
			F._isPaused = false;
		}
	},

	tick : function(){
		var F = this;
		if ( !F._paused ){
			var call = false;
			var now = Date.now();
			var diffTime = now - F._prevTime;

			if ( diffTime > F._maxLag ){
				trace ( "...lag" );
				F._startTime += diffTime - F._shiftLag;
			}
			F._prevTime = now;//+= F.diffTime;

			var elapsedTime = F._prevTime - F._startTime;
			var future = elapsedTime - F._nextTime;  

			if ( future > 0 ){
				F._nextTime += ( future >= F._frameTime ) ? future : F._frameTime ;
				call = true;
				F.diffTime = now - F._prevCallTime;
				F._prevCallTime = now;
			}
			if ( call ) F.dispatch();
		}
	},

	dispatch : function(){
		var F = this;
		for ( var i = 0; i < F.pool.length; i++ ){
			var obj = F.pool[i];
			obj.handler.call(obj.from, this);
		}
	}
}









/* -- CORE: Gesture.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var Gesture = new function(){
	var G = this;

	var _targets = [];
	var _disableList = [];
	var _eventPass = (document.createEventObject != undefined);
	G.init = function(){
		global.GestureEvent = new GestureEvent();
	}
	G.addEventListener = function ( target, name, handler ){
		var _gestureBase = getGestureBase ( target );
		_gestureBase.addEventListener ( name, handler );
		_gestureBase._total++;
		Styles.setCss( target, 'cursor', 'pointer' );
		Styles.setCss( target, 'pointer-events', 'auto' );
	}
	G.removeEventListener = function ( target, name, handler ){
		var _gestureBase = getGestureBase ( target );
		if ( _gestureBase ) {
			_gestureBase.removeEventListener ( name, handler );
			_gestureBase._total++;
			if ( _gestureBase._total <= 0 ){
				Styles.setCss( target, 'cursor', 'auto' );
			}
		}
	}
	G.disable = function ( target ){		
		var gestureBase = getGestureBase ( target );
		_disableList.push(gestureBase);

		if ( _eventPass ) {
			gestureBase.addEventListener ( GestureEvent.CLICK, handlePassThroughClick );
			Styles.setCss( target, 'cursor', 'auto' );
		} else {
			Styles.setCss( target, 'pointer-events', 'none' );
		}	
	}
	G.disableChildren = function ( target ){
		setActiveChildren ( target, false );
	}
	G.enable = function ( target ){
		var gestureBase = getGestureBase ( target );

		for ( var i = 0; i < _disableList.length; i++ ){
			if ( gestureBase == _disableList[i] ){
				if ( _eventPass ) {
					gestureBase.removeEventListener ( GestureEvent.CLICK, handlePassThroughClick );
				} else {
					Styles.setCss( target, 'pointer-events', 'auto' );
					Styles.setCss( target, 'cursor', 'pointer' );
				}
				break;
			}
		}
	}
	G.enableChildren = function ( target ){
		setActiveChildren ( target, true );
	}
	function getGestureBase ( target ){
		var _gestureBase = null;
		for ( var i = 0; i < _targets.length; i++ ){
			if ( _targets[i].elem === target ){
				_gestureBase = _targets[i]
				break;
			}
		}	
		if ( !_gestureBase ){
			_gestureBase = createGestureBase ( target );
		}	
		return _gestureBase;
	}

	function createGestureBase ( target ){
		_gestureBase = new GestureBase ( target );
		_gestureBase.addEventListener(GestureEvent.FINISH, handleGestureFinish)
		_targets.push( _gestureBase );
		return _gestureBase;
	}

	function setActiveChildren ( target, active ){
		var gestureBase = getGestureBase ( target );
		if ( gestureBase.hasActiveChildren != active ){
			gestureBase.hasActiveChildren = active;
			var children = gestureBase.elem.getElementsByTagName('*');
			for( var i = 0; i < children.length; i++ ){
				if ( children[i].parentNode == target ){
					active ? G.enable(children[i]) : G.disable(children[i]);
				} 
			}
		}
	}

	function getNextLayerElement ( target, x, y, list ){
		target.style.visibility = 'hidden';
		list.push(target);

		var elem = document.elementFromPoint( x, y );

		for ( var i = 0; i < _disableList.length; i++ ){
			if ( _disableList[i].elem == elem ){
				return getNextLayerElement(elem,x,y,list)
			}
		}
		
		return elem;
	}

	function getForwardedTarget ( event ){
		var hiddenList = [];		
		
		var el = getNextLayerElement( event.target, event.clientX, event.clientY, hiddenList );
		for ( var i = 0; i < hiddenList.length; i++ ){
			hiddenList[i].style.visibility = 'visible';
		}
		hiddenList = [];

		event.stopImmediatePropagation();

		return el;
	}
	function handleGestureFinish ( event ){
		for ( var i = 0; i < _targets.length; i++ ){
			_targets[i].finishPostStopBubble(event);
		}
	}
	function handlePassThroughClick ( event ){	
		var el = getForwardedTarget ( event );
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent(event.type,true,false);
		el.dispatchEvent ( evt );
	}

}










/* -- CORE: GestureBase.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
function GestureBase (elem){
	var G = this;
	G.elem = elem;
	G.hasActiveChildren = true;
	G.debug = false;

	G._isDragging = false;
	G._isDrag = false;
	G._give = 2;
	G._total = 0; // how many events are tracked

	G._xOff = 0;
	G._xPrev = 0;
	G._xPrev2 = 0;
	G._xStart = 0;
	G._xVelocity = 0;
	
	G._yOff = 0;
	G._yPrev = 0;
	G._yPrev2 = 0;
	G._yStart = 0;
	G._yVelocity = 0;

	G._isSelectBubbleStop = false;

	G._dragTarget;
	
	G.init();
}

GestureBase.prototype = {
	
	init : function (){		
		var G = this;
		if( G.debug ) trace( 'GestureBase.init()' );
		G._handleDrag = G._handleDrag.bind ( G );
		G._handleSwipe = G._handleSwipe.bind ( G );
		G._handleDown = G._handleDown.bind ( G );
		G._handleUp = G._handleUp.bind ( G );		
		G._handleDragStart = G._handleDragStart.bind ( G );
		G._handleTouchStart = G._handleTouchStart.bind ( G );
		G._handleTouchMove = G._handleTouchMove.bind ( G );
		G._handleTouchDrag = G._handleTouchDrag.bind ( G );
		G._handleTouchEnd = G._handleTouchEnd.bind ( G );
		G._handleSelectStopBubble = G._handleSelectStopBubble.bind ( G );
		
		G.addEventListener = G.elem.addEventListener.bind ( G.elem );
		G.removeEventListener = G.elem.removeEventListener.bind ( G.elem );
	
		G.elem.addEventListener ( 'touchstart', G._handleTouchStart );
		G.elem.addEventListener ( 'mousedown', G._handleDown );
		G.elem.addEventListener ( GestureEvent.CLICK, G._handleSelectStopBubble );
	},
	_handleDown : function ( event ){
		var G = this;
		if( G.debug ) trace( 'GestureBase._handleDown()' );

		G._isDragging = false;
		G._isDrag = false;

		window.addEventListener ( 'mouseup', G._handleUp );
		window.addEventListener ( 'touchend', G._handleTouchEnd );

		window.addEventListener ( 'mousemove', G._handleDragStart );
		window.addEventListener ( 'touchmove', G._handleTouchMove );	
		
		var touch = G._getEventScope ( event );
		var rect = event.target.getBoundingClientRect();
	
		GestureEvent.press.position.x = touch.pageX - rect.left;
		GestureEvent.press.position.y = touch.pageY - rect.top;
		GestureEvent.press.page.x = touch.pageX;
		GestureEvent.press.page.y = touch.pageY;

		if( G.debug ) trace ( '  -> dispatch ( PRESS ), event:', touch, 'touch.layerX:', touch.layerX, 'press:', GestureEvent.press.position.x )
		G.elem.dispatchEvent ( GestureEvent.press );
	},

	_handleUp : function ( event, bypass ){
		var G = this;
		if( G.debug ) trace( 'GestureBase._handleUp()' );

		window.removeEventListener ( 'mouseup', G._handleUp );
		window.removeEventListener ( 'touchend', G._handleTouchEnd );
		window.removeEventListener ( 'mousemove', G._handleDragStart );
		window.removeEventListener ( 'touchmove', G._handleTouchMove );
		window.removeEventListener ( 'mousemove', G._handleDrag );
		window.removeEventListener ( 'touchmove', G._handleTouchDrag );	
						
		if ( bypass !== true ){
			if( G.debug ) trace( ' - dispatch GestureEvent.RELEASE' )
			G.elem.dispatchEvent ( GestureEvent.release );
		}

		if ( G._isDragging ){
			G._handleDragStop ( event );
		} 
		
		G.elem.addEventListener ( 'touchstart', G._handleTouchStart );
		G.elem.addEventListener ( 'mousedown', G._handleDown );

		event.preventDefault();
		if( G.debug ) trace ( '  _handleUp(), event.preventDefault(), kills second mousedown event')		
	},
	_handleTouchStart : function ( event ){	
		var G = this;
		if( G.debug ) trace( 'GestureBase._handleTouchStart()' );
		
		G._handleDown(event);
	},

	_handleTouchMove : function ( event ){
		var G = this;
		if( G.debug ) trace( 'GestureBase._handleTouchMove()' );
		G._handleDragStart(event);
	},

	_handleTouchDrag : function ( event ){
		var G = this;
		if( G.debug ) trace( 'GestureBase._handleTouchDrag()' );
		G._handleDrag(event);
	},

	_handleTouchEnd : function ( event ){
		var G = this;
		if( G.debug ) trace( 'GestureBase._handleTouchEnd()' );
		G._handleUp(event);
	},
	_getEventScope : function ( event ){
		if( this.debug ) trace( 'GestureBase._getEventScope(), event:', event );
		return ( Device.os == 'android' && event instanceof TouchEvent ) ? event.changedTouches[0] : event ;
	},
	_handleSelectStopBubble : function ( event ){
		var G = this;
		if( G.debug ) trace( 'GestureBase._handleSelectStopBubble()' );
		if ( G._isDrag ) {
			event.stopImmediatePropagation();
			if( G.debug ) trace ( 'Gesture : ' + G.elem.id + ' is Dragging, CLICK not fired' );
			G.elem.dispatchEvent ( GestureEvent.finish )
		} 
	},

	finishPostStopBubble : function (event){		
		var G = this;
		if( G.debug ) trace( 'GestureBase.finishPostStopBubble()' );
		
		G.elem.removeEventListener ( 'touchstart', G._handleTouchStart );
		G.elem.removeEventListener ( 'mousedown', G._handleDown );	

		G._handleUp(event, true);
	},
	_handleDragStart : function ( event ){
		var G = this;
		if( G.debug ) trace( 'GestureBase._handleDragStart()' );

		G._dragTarget = event.target;

		var touch = G._getEventScope ( event );
		
		var rect = event.target.getBoundingClientRect();
		var _layerX = touch.pageX - rect.left;
		var _layerY = touch.pageY - rect.top;

		G._xStart = G._xPrev = G._xPrev2 = _layerX;
		G._yStart = G._yPrev = G._yPrev2 = _layerY;
		var _x = parseInt(G.elem.style.left.replace( /px/, '' ),10);
		var _y = parseInt(G.elem.style.top.replace( /px/, '' ),10);
		G._xOff = _layerX - _x;
		G._yOff = _layerY - _y;
		GestureEvent.dragStart.position.x = _layerX;
		GestureEvent.dragStart.position.y = _layerY;
		GestureEvent.dragStart.element.x = _x;
		GestureEvent.dragStart.element.y = _y;
		
		window.removeEventListener ( 'mousemove', G._handleDragStart );
		window.removeEventListener ( 'touchmove', G._handleTouchMove );

		window.addEventListener ( 'mousemove', G._handleDrag );
		window.addEventListener ( 'touchmove', G._handleTouchDrag );
	},
	
	_handleDrag : function ( event ){
		var G = this;
		if( G.debug ) trace( 'GestureBase._handleDrag()' );

		var touch = G._getEventScope ( event );
		var rect = G._dragTarget.getBoundingClientRect();
		var _layerX = touch.pageX - rect.left;
		var _layerY = touch.pageY - rect.top;
		
		var _diffx1 = _layerX - G._xPrev;
		var _diffx2 = _layerX - G._xPrev2;
		G._xVelocity = ( _diffx2 - _diffx1 ) / 2 + _diffx1;

		var _diffy1 = _layerY - G._yPrev;
		var _diffy2 = _layerY - G._yPrev2;
		G._yVelocity = ( _diffy2 - _diffy1 ) / 2 + _diffy1;
		GestureEvent.drag.position.x = _layerX;
		GestureEvent.drag.position.y = _layerY;
		GestureEvent.drag.element.x = _layerX - G._xOff;
		GestureEvent.drag.element.y = _layerY - G._yOff;
		GestureEvent.drag.velocity.x = G._xVelocity;
		GestureEvent.drag.velocity.y = G._yVelocity;
		GestureEvent.drag.page.x = touch.pageX;
		GestureEvent.drag.page.y = touch.pageY;

		if ( G._isDragging )	{
			G.elem.dispatchEvent ( GestureEvent.drag );
		} else {			
			if ( Math.abs(G._xStart - _layerX) > G._give || Math.abs(G._yStart - _layerY) > G._give ){
				G._isDragging = true;
				G._isDrag = true;
				G.elem.dispatchEvent ( GestureEvent.dragStart );
			}
		}

		G._xPrev2 = G._xPrev;
		G._xPrev = _layerX;

		G._yPrev2 = G._yPrev;
		G._yPrev = _layerY;
	},

	_handleDragStop : function ( event ){
		var G = this;
		if( G.debug ) trace( 'GestureBase._handleDragStop()' );

		G._isDragging = false;
		GestureEvent.dragStop.position.x = G._xPrev;
		GestureEvent.dragStop.position.y = G._yPrev;
		GestureEvent.dragStop.velocity.x = G._xVelocity;
		GestureEvent.dragStop.velocity.y = G._yVelocity;

		G.elem.dispatchEvent ( GestureEvent.dragStop );

		G._handleSwipe ( event );
	},
	_handleSwipe : function ( event ){
		var G = this;
		if( G.debug ) trace( 'GestureBase._handleSwipe()' );

		GestureEvent.swipe.direction.x = G._xVelocity > 0 ? 'right' : G._xVelocity < 0 ? 'left' : null ;
		GestureEvent.swipe.direction.y = G._yVelocity > 0 ? 'down' : G._yVelocity < 0 ? 'up' : null ;
		GestureEvent.swipe.distance.x = G._xPrev - G._xStart;
		GestureEvent.swipe.distance.y = G._yPrev - G._yStart;
		GestureEvent.swipe.velocity.x = G._xVelocity;
		GestureEvent.swipe.velocity.y = G._yVelocity;

		G.elem.dispatchEvent ( GestureEvent.swipe );
	}

}










/* -- CORE: GestureEvent.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
function GestureEvent (){
 
	
	var _dragStart = new CustomEvent ( 'onDragStart' );
	_dragStart.position = { 
		x : 0,
		y : 0
	}
	_dragStart.element = {
		x : 0,
		y : 0
	}
	
	var _drag = new CustomEvent ( 'onDrag' );
	_drag.position = {
		x : 0,
		y : 0
	}
	_drag.velocity = {
		x : 0,
		y : 0
	}
	_drag.element = {
		x : 0,
		y : 0
	}
	_drag.page = {
		x : 0,
		y : 0
	}
		
	var _dragStop = new CustomEvent ( 'onDragStop' );
	_dragStop.position = {
		x : 0,
		y : 0
	}
	_dragStop.velocity = {
		x : 0,
		y : 0
	}
		
	var _swipe = new CustomEvent ( 'onSwipe' );
	_swipe.direction = {
		x : null,
		y : null
	}
	_swipe.distance = {
		x : 0,
		y : 0
	}
	_swipe.velocity = {
		x : 0,
		y : 0
	}
	
	var _press = new CustomEvent ( 'onPress' ); 
	_press.position = {
		x : 0,
		y : 0
	}
	_press.page = {
		x : 0,
		y : 0
	}
	
	var _release = new CustomEvent ( 'onRelease' );

	var _finish = new CustomEvent ( 'onFinishGestures' );

	var _clickType = Device.type != 'desktop' ? 'touchend' : 'click';


	return {
		OVER		: 	'mouseover',
		OUT			: 	'mouseout',
		DOWN		: 	'onPress',
		PRESS		: 	'onPress',
		UP			: 	'onRelease',
		RELEASE		: 	'onRelease',
		CLICK		: 	_clickType,
		DRAG 		: 	'onDrag',
		DRAG_START 	: 	'onDragStart',
		DRAG_STOP 	: 	'onDragStop',
		SWIPE 		: 	'onSwipe',

		drag 		: 	_drag,
		dragStart 	: 	_dragStart,
		dragStop 	: 	_dragStop,
		swipe 		: 	_swipe,
		press 		: 	_press,
		release 	: 	_release,
		finish 		: 	_finish,
		FINISH 		: 	'onFinishGestures'
	}
}




















/* -- CORE IMPLEMENTED: Matrix2D.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var Matrix2D = function() {
	var M = this;
	M.identity = new Float32Array([ 1, 0, 0, 0, 1, 0 ]);
	M.data = new Float32Array( M.identity );
};

Matrix2D.prototype = {
	clear : function() {
		var M = this;
		M.data.set ( M.identity );
	},

	rotate : function(radians) {
		var M = this;
		var _m = new Float32Array ( M.identity );
		
		var c = Math.cos(radians).toFixed(15);
		var s = Math.sin(radians).toFixed(15);
			
		_m[0] = c;
		_m[1] = s;
		_m[3] = -s;
		_m[4] = c;

		M.multiply ( _m );
		return M;
	},

	scale : function(x, y) {
		var M = this;
		var _m = new Float32Array ( M.identity );

		_m[0] = x;
		_m[4] = y;

		M.multiply ( _m );
		return M;
	},

	skew : function(ax, ay) {
		var M = this;
		var _m = new Float32Array ( M.identity );

		_m[1] = Math.tan(ax);
		_m[3] = Math.tan(ay);

		M.multiply ( _m );
		return M;
	},

	translate : function(x, y) {
		var M = this;
		var _m = new Float32Array ( M.identity );

		_m[2] = x || 0;
		_m[5] = y || 0;

		M.multiply ( _m );
		return M;
	},

	multiply : function(m) {	
		var M = this;
		var _c = new Float32Array ( M.data );
		
		for ( var i = 0; i < 6; i++ ){
			var k = Math.floor ( i / 3 ) * 3;
			var q = i % 3;
			M.data[i] = _c[k] * m[q] + _c[k+1] * m[q+3];
		}
		M.data[2] += _c[2];
		M.data[5] += _c[5];
	},

	setFromCss : function( matrixString ) {
		var cssMatrix = matrixString.match( /\(([^\)]+)\)/ )[ 1 ].replace( /\s/g, '' ).split( ',' ).map( Number );
		this.data = [
			cssMatrix[ 0 ],
			cssMatrix[ 1 ],
			cssMatrix[ 4 ],
			cssMatrix[ 2 ],
			cssMatrix[ 3 ],
			cssMatrix[ 5 ]
		];
	},

	getCss : function() {
		var M = this;
		return 'matrix(' + M.data[0] + ',' + M.data[1] + ',' + M.data[3] + ',' + M.data[4] + ',' + M.data[2] + ',' + M.data[5] + ')';
	}
}











/* -- CORE IMPLEMENTED: CanvasDrawerStage.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
function CanvasDrawerStage(id, target, css, styles, display, qualityScale) {

	var CDS = this;

	CDS.qualityScale = qualityScale;

	css.width *= CDS.qualityScale;
	css.height *= CDS.qualityScale;

	CDS.canvas = Markup.addCanvas({
		id: id,
		target: target,
		css: css,
		styles: styles
	}, display);

	if (CDS.qualityScale !== 1) {
		TweenLite.set(CDS.canvas, {
			scale: 1 / CDS.qualityScale,
			transformOrigin: '0% 0%'
		});
	}

	CDS.ctx = CDS.canvas.getContext('2d');

	CDS.elements = {};
	CDS.allTweens = {};
	CDS.allTweensSize = 0;
	CDS.elementsLength = 0;
	CDS.dummyTween;

	CDS.tween = {
		to: function(target, time, args) {
			CDS._tweenEngine('to', [target, time, args]);
		},
		from: function(target, time, args) {
			CDS._tweenEngine('from', [target, time, args]);
		},
		fromTo: function(target, time, argsFrom, argsTo) {
			CDS._tweenEngine('fromTo', [target, time, argsFrom, argsTo]);
		},
		set: function(target, args) {
			CDS._tweenEngine('set', [target, args]);
		},
		start: function(args) {
			CDS._tweenStart(args);
		},
		kill: function() {
			CDS._tweenKill();
		}
	}

	Object.defineProperty(CDS, 'width', {
		get: function() {
			return CDS.canvas.width / CDS.qualityScale;
		},
		set: function(value) {
			CDS.canvas.width = value * CDS.qualityScale;
		}
	});

	Object.defineProperty(CDS, 'height', {
		get: function() {
			return CDS.canvas.height / CDS.qualityScale;
		},
		set: function(value) {
			CDS.canvas.height = value * CDS.qualityScale;
		}
	});

}

CanvasDrawerStage.prototype = {
	addImage: function(imgObj) {

		imgObj.params = imgObj.params || {};

		var CDS = this,
			_isSourceCanvas = CDS._getIsSourceCanvas(imgObj.source),
			_dItem = new CanvasDrawerElement(CDS, imgObj, 'image');

		_dItem.src = _isSourceCanvas ? (imgObj.source.tagName === 'CANVAS' ? imgObj.source : imgObj.source.canvas) : (imgObj.source.tagName === 'IMG' ? imgObj.source : ImageManager.get(imgObj.source));

		_dItem.sourceX = imgObj.params.sourceX || 0;
		_dItem.sourceY = imgObj.params.sourceY || 0;
		_dItem.sourceW = imgObj.params.sourceW || _dItem.src.width;
		_dItem.sourceH = imgObj.params.sourceH || _dItem.src.height;

		_dItem.width = imgObj.params.width || _dItem.src.width / CDS.qualityScale;
		_dItem.height = imgObj.params.height || _dItem.src.height / CDS.qualityScale;
		_dItem.x = imgObj.params.x || imgObj.params.left || 0;
		_dItem.y = imgObj.params.y || imgObj.params.top || 0;

		CDS.setTransformOrigin(_dItem, imgObj.transformOrigin || '50% 50%');

		return _dItem;
	},
	addShape: function(shapeObj) {
		var CDS = this,
			_dItem = new CanvasDrawerElement(CDS, shapeObj);

		_dItem.drawScale = shapeObj.drawScale || 1;

		_dItem.fill = shapeObj.fill;

		_dItem.strokeFill = shapeObj.stroke.fill || null;
		_dItem.strokeWidth = shapeObj.stroke.width || 0;
		_dItem.strokeCap = shapeObj.stroke.cap || 'butt';
		_dItem.strokeJoin = shapeObj.stroke.join || 'miter';
		_dItem.strokeDashSize = shapeObj.stroke.dashSize || 10000;
		_dItem.strokeDashGap = shapeObj.stroke.dashGap || 0;
		_dItem.strokeDashOffset = shapeObj.stroke.dashOffset || 0;
		_dItem.strokePosition = shapeObj.stroke.position || 'outer';

		if (_dItem.strokeDashGap === 0 && _dItem.strokeDashSize != 10000) _dItem.strokeDashGap = _dItem.strokeDashSize;

		CDS._setDrawArgs(_dItem, shapeObj.params || [0, 0, 0, 0, 0], shapeObj);

		return _dItem;
	},
	addText: function(textObj) {
		textObj.params = textObj.css || {};

		var CDS = this,
			_dItem = new CanvasDrawerElement(CDS, textObj, 'text');

		_dItem.copy = textObj.copy;

		_dItem.maxWidth = textObj.params.maxWidth || null;

		_dItem.fontFamily = textObj.params.fontFamily || '_serif';
		_dItem.fontSize = textObj.params.fontSize >= 0 ? Number(textObj.params.fontSize.toString().replace(/px/g, '').replace(/pt/g, '')) : 12;

		_dItem.x = textObj.params.x || textObj.params.left || 0;
		_dItem.y = textObj.params.y || textObj.params.top || 0;

		_dItem.marginLeft = textObj.params.marginLeft || 0;
		_dItem.marginTop = textObj.params.marginTop || 0;

		_dItem.textAlign = textObj.params.textAlign || 'left';

		if (_dItem.textAlign === 'centered') _dItem.textAlign = 'center';

		_dItem.fill = textObj.fill;

		_dItem.strokeFill = textObj.stroke.fill || null;
		_dItem.strokeWidth = textObj.stroke.width || 0;
		_dItem.strokeJoin = textObj.stroke.join || 'round';
		_dItem.strokeDashSize = textObj.stroke.dashSize || 10000;
		_dItem.strokeDashGap = textObj.stroke.dashGap || 0;
		_dItem.strokeDashOffset = textObj.stroke.dashOffset || 0;
		_dItem.strokePosition = textObj.stroke.position || 'outer';

		if (_dItem.strokeDashGap === 0 && _dItem.strokeDashSize != 10000) _dItem.strokeDashGap = _dItem.strokeDashSize;

		_dItem.transOffsetX = 0;
		_dItem.transOffsetY = 0;
		_dItem.lineHeight = textObj.params.lineHeight || _dItem.fontSize * 0.75;
		_dItem.maxWidth = textObj.params.maxWidth || 100000;
		_dItem.deltaProps = {
			fontFamily: 'empty',
			fontSize: 'empty',
			lineHeight: 'empty',
			maxWidth: 'empty',
			marginLeft: 'empty',
			marginTop: 'empty',
			strokeWidth: 'empty',
			textAlign: 'empty',
			transOffsetX: 'empty',
			transOffsetY: 'empty',
		}

		_dItem.drawProps = {
			drawX: 'empty',
			drawY: 'empty',
			offsetX: 'empty',
			offsetY: 'empty',
			strokeOffset: 'empty',
			copy: 'empty'

		}

		CDS.ctx.font = _dItem.fontSize + 'px ' + _dItem.fontFamily;

		CDS._wrapText(_dItem, false, false)
		var _originDefault;
		switch (_dItem.textAlign) {
			case 'left':
				_originDefault = '0% 0%';
				break;
			case 'right':
				_originDefault = '0% 0%';
				break;
			case 'center':
				_originDefault = '50% 0%';
				break;

		}
		CDS.setTransformOrigin(_dItem, textObj.transformOrigin || _originDefault);


		CDS.ctx.font = null;

		return _dItem;

	},
	setTransformOrigin: function(element, str) {
		var CDS = this,
			_xTran = str.split(' ')[0],
			_yTran = str.split(' ')[1],
			_dItem = (typeof element === 'string') ? CDS.elements[element] : element;
		if (_xTran.indexOf('%') >= 0) {
			_xTran = +_xTran.replace(/%/g, '') / 100;
		} else if (_xTran.indexOf('px') >= 0) {
			_xTran = +_xTran.replace(/px/g, '') / _dItem.width;
		} else {
			_xTran = +_xTran / _dItem.width;
		}

		if (_yTran.indexOf('%') >= 0) {
			_yTran = +_yTran.replace(/%/g, '') / 100;
		} else if (_yTran.indexOf('px') >= 0) {
			_yTran = +_yTran.replace(/px/g, '') / _dItem.height;
		} else {
			_yTran = +_yTran / _dItem.height;
		}


		switch (_dItem._type) {
			case 'arc':
			case 'path':
				_xTran -= 0.5;
				_yTran -= 0.5;
			default:
				_dItem.offsetX = _dItem.width * _xTran;
				_dItem.offsetY = _dItem.height * _yTran;
				break;
			case 'text':
				_dItem.transOffsetX = _xTran;
				_dItem.transOffsetY = _yTran;

				switch (_dItem.textAlign) {
					case 'center':
						_dItem.transOffsetX -= 0.5;
						break;
					case 'right':
						_dItem.transOffsetX *= -1;
						break;
				}

				CDS._wrapText(_dItem, false, false)
				break;
		}
	},
	removeElement: function(target) {
		var CDS = this;
		CDS.elementsLength--;
		if (target.id) delete CDS.elements[target.id];
		else delete CDS.elements[target];
	},
	removeAllItems: function() {
		var CDS = this;
		for (var dI in CDS.elements) {
			CDS.elementsLength--;
			delete CDS.elements[dI];
		}
		CDS.elementsLength = 0;
	},
	makeLinearGradient: function(args) {
		var CDS = this,
			grd = CDS.ctx.createLinearGradient(args.xStart, args.yStart, args.xEnd, args.yEnd);
		for (var i = 0; i < args.colors.length; i++) grd.addColorStop(args.colors[i].stopVal, args.colors[i].color)
		return grd;
	},
	makeRadialGradient: function(args) {
		var CDS = this,
			grd = CDS.ctx.createRadialGradient(args.xInner, args.yInner, args.radiusInner, args.xOuter, args.yOuter, args.radiusOuter);
		for (var i = 0; i < args.colors.length; i++) grd.addColorStop(args.colors[i].stopVal, args.colors[i].color)
		return grd;
	},
	makePattern: function(args) {
		var CDS = this,
			_img = args.source,
			_repeat = args.repeat || 'repeat',
			_isSourceCanvas = CDS._getIsSourceCanvas(_img),
			_imgSrc = _isSourceCanvas ? (_img.tagName === 'CANVAS' ? _img : _img.canvas) : (_img.tagName === 'IMG' ? _img : ImageManager.get(_img)),
			_pattern = CDS.ctx.createPattern(_imgSrc, _repeat);

		return _pattern;
	},
	update: function() {
		var CDS = this,
			_dItem;

		CDS.ctx.clearRect(0, 0, CDS.canvas.width, CDS.canvas.height);
		for (var dI in CDS.elements) {
			_dItem = CDS.elements[dI];

			if (_dItem.isActive && _dItem.alpha > 0) {
				CDS.ctx.save();

				var _isArc = _dItem._type === 'arc';

				CDS.ctx.globalAlpha = _dItem.alpha;
				CDS.ctx.globalCompositeOperation = _dItem.blendMode;

				_dItem.rotation = _dItem.rotation % 360;

				var _isTranslated = (_dItem.rotation != 0 || _dItem.scaleX != 1 || _dItem.scaleY != 1);
				if (_isTranslated) {
					var translation = [(_dItem.x + _dItem.offsetX) * CDS.qualityScale, (_dItem.y + _dItem.offsetY) * CDS.qualityScale];
					CDS.ctx.translate.apply(CDS.ctx, translation);

					if (_dItem.rotation != 0) CDS.ctx.rotate(MathUtils.toRadians(_dItem.rotation));
					if (_dItem.scaleX != 1 || _dItem.scaleY != 1) {
						if (_dItem.scaleX === 0) _dItem.scaleX = 0.000001;
						if (_dItem.scaleY === 0) _dItem.scaleY = 0.000001;
						CDS.ctx.scale(_dItem.scaleX, _dItem.scaleY);
					}
				}

				CDS._drawShape(_dItem, _isArc, _isTranslated);
				CDS.ctx.restore();
			}
		}

		_dItem = null;
	},
	start: function() {
		var CDS = this;
		FrameRate.register(CDS, CDS.update);
	},
	stop: function() {
		var CDS = this;
		FrameRate.unregister(CDS, CDS.update);
	},
	_tweenEngine: function(tweenFun, args) {
		var CDS = this,
			_hasTransform = false,
			_tempStartFun,
			_tranIndex;
		args[0] = (typeof args[0] === 'string') ? CDS.elements[args[0]] : args[0];
		for (var i = 1; i < args.length; i++) {
			if (args[i].transformOrigin) {
				_tranIndex = i;

				switch (tweenFun) {
					case 'set':
					case 'from':
					case 'to':
					case 'fromTo':
						if (args[_tranIndex].onStart) _tempStartFun = args[_tranIndex].onStart;
						CDS._updateOnStart(args, _tranIndex, _tempStartFun);
						break;
				}

				break;
			}
		}


		var _newTween = TweenLite[tweenFun].apply(CDS, args).pause();
		CDS.allTweens['newTween' + CDS.allTweensSize++] = _newTween;
		if (args[args.length - 1].paused === false) CDS._tweenStart();
	},
	_updateOnStart: function(args, index, startFun) {
		var CDS = this;
		args[index].onStart = function() {
			if (startFun) startFun.apply(CDS, args[index].onStartParams || null);
			CDS.setTransformOrigin(args[0], args[index].transformOrigin);
		}
	},
	_tweenStart: function(args) {
		var CDS = this,
			_duration = 0,
			_tweenDuration,
			_args = args || [];

		for (var dI in CDS.allTweens) {
			CDS.allTweens[dI].delay(CDS.allTweens[dI].delay() + (_args.delay || 0));

			_tweenDuration = CDS.allTweens[dI].duration() + CDS.allTweens[dI].delay();

			if (_tweenDuration > _duration) _duration = _tweenDuration;
			CDS.allTweens[dI].play();
		}
		if (CDS.dummyTween) {
			if (_tweenDuration < _duration) _tweenDuration = _duration;
			CDS.dummyTween.kill();
		}

		var _startFun = null,
			_updateFun,
			_completeFun;

		if (_args.onStart) {
			_startFun = function() {
				_args.onStart.apply(this, _args.onStartParams ? _args.onStartParams : null);
			}
		}
		if (_args.onUpdate) {
			_updateFun = function() {
				_args.onUpdate.apply(this, _args.onUpdateParams ? _args.onUpdateParams : null);
				CDS.update();
			}
		} else {
			_updateFun = CDS.update.bind(CDS);
		}

		if (_args.onComplete) {
			_completeFun = function() {
				CDS._tweenKill()
				_args.onComplete.apply(this, _args.onCompleteParams ? _args.onCompleteParams : null);
			}
		} else {
			_completeFun = CDS._tweenKill.bind(CDS);
		}

		_duration += _args.timePadding && _args.timePadding > 0 ? _args.timePadding : 0;
		if (true) {
			CDS.dummyTween = TweenLite.to({}, _duration, {
				onStart: _startFun,
				onUpdate: _updateFun,
				onComplete: _completeFun,
				delay: _args.delay || 0
			});
		}
	},

	_tweenKill: function() {
		var CDS = this;

		for (var dI in CDS.allTweens) {
			if (CDS.allTweens[dI]) CDS.allTweens[dI].kill();
			delete CDS.allTweens[dI];
		}

		CDS.allTweens = {};
		CDS.allTweensSize = 0;

		if (CDS.dummyTween) CDS.dummyTween.kill();
		CDS.dummyTween = null;
	},
	_drawShape: function(dItem, isArc, translation) {
		var CDS = this;

		if (dItem.shadowColor && (dItem.shadowBlur > 0 || dItem.shadowDistance != 0)) {
			CDS.ctx.shadowColor = dItem.shadowColor;
			CDS.ctx.shadowOffsetX = dItem._shadowOffsetX * CDS.qualityScale;
			CDS.ctx.shadowOffsetY = dItem._shadowOffsetY * CDS.qualityScale;
			CDS.ctx.shadowBlur = dItem.shadowBlur * CDS.qualityScale;
		}
		if (dItem._type === 'image') {
			try {
				if (translation) {
					CDS.ctx.drawImage(dItem.src, dItem.sourceX, dItem.sourceY, dItem.sourceW, dItem.sourceH, -dItem.offsetX * CDS.qualityScale, -dItem.offsetY * CDS.qualityScale, dItem.width * CDS.qualityScale, dItem.height * CDS.qualityScale);
				} else {
					CDS.ctx.drawImage(dItem.src, dItem.sourceX, dItem.sourceY, dItem.sourceW, dItem.sourceH, dItem.x * CDS.qualityScale, dItem.y * CDS.qualityScale, dItem.width * CDS.qualityScale, dItem.height * CDS.qualityScale);
				}
			} catch (err) {
				console.log('');
				trace("ERROR: Source for CanvasDrawerStage: '" + CDS.canvas.id + "' element: '" + dItem.id + "' failed to load; the image source of " + dItem.src + " may not be named or loaded properly.");
				console.log('');
			}
		} else if (dItem._type === 'text') {
			CDS._wrapText(dItem, translation);
		} else {
			if (dItem.strokeDashSize > 0 && dItem.strokeDashGap > 0) CDS.ctx.setLineDash([dItem.strokeDashSize * CDS.qualityScale, dItem.strokeDashGap * CDS.qualityScale]);
			CDS.ctx.lineDashOffset = dItem.strokeDashOffset;

			var _outer = dItem.strokePosition === 'outer';
			var _strokeDepth = dItem.strokeWidth > 0;

			CDS.ctx.beginPath();
			CDS.ctx.strokeStyle = dItem.strokeFill;
			CDS.ctx.lineWidth = dItem.strokeWidth * CDS.qualityScale * (_outer ? 2 : 1);
			CDS.ctx.lineCap = dItem.strokeCap;
			CDS.ctx.lineJoin = dItem.strokeJoin;
			if (dItem._type === 'path') {
				var i, p;
				for (i = 0; i < dItem.args.length; i++) {
					for (p = 0; p < dItem.args[i].points.length; p += 2) {
						if (translation) {
							dItem.drawArgs[i].points[p] = ((dItem.args[i].points[p] * dItem.drawScale) - dItem.offsetX) * CDS.qualityScale;
							dItem.drawArgs[i].points[p + 1] = ((dItem.args[i].points[p + 1] * dItem.drawScale) - dItem.offsetY) * CDS.qualityScale;
						} else {
							dItem.drawArgs[i].points[p] = ((dItem.args[i].points[p] * dItem.drawScale) + dItem.x) * CDS.qualityScale;
							dItem.drawArgs[i].points[p + 1] = ((dItem.args[i].points[p + 1] * dItem.drawScale) + dItem.y) * CDS.qualityScale;
						}
					}
				}

				for (i = 0; i < dItem.drawArgs.length; i++) CDS.ctx[dItem.drawArgs[i].fun].apply(CDS.ctx, dItem.drawArgs[i].points);
			} else {

				if (translation) {
					dItem.args[0] = -dItem.offsetX * CDS.qualityScale;
					dItem.args[1] = -dItem.offsetY * CDS.qualityScale;
				} else {
					dItem.args[0] = dItem.x * CDS.qualityScale;
					dItem.args[1] = dItem.y * CDS.qualityScale;
				}

				if (isArc) {
					dItem.args[2] = (dItem.width / 2) * CDS.qualityScale;
				} else {
					dItem.args[2] = dItem.width * CDS.qualityScale;
					dItem.args[3] = dItem.height * CDS.qualityScale;
				}
				if (isArc && dItem.args[2] < 0) dItem.args[2] = 0;

				CDS.ctx[dItem._type].apply(CDS.ctx, dItem.args);
			}

			CDS.ctx.closePath();

			if (_outer && _strokeDepth) CDS.ctx.stroke();
			if (dItem.fill) {
				CDS.ctx.fillStyle = dItem.fill;
				CDS.ctx.fill();
			}
			if (!_outer && _strokeDepth) {
				CDS.ctx.shadowColor = 'rgba(0, 0, 0, 0)';
				CDS.ctx.shadowOffsetX = 0;
				CDS.ctx.shadowOffsetY = 0;
				CDS.ctx.shadowBlur = 0;
				CDS.ctx.stroke();
			}

		}

	},
	_setLineDrawArgs: function(dItem, index) {
		if (index) {
			dItem.drawArgs[index] = {
				fun: dItem.args[index].fun,
				points: dItem.args[index].points.slice()
			};
		} else {
			for (var i = 0; i < dItem.args.length; i++) {
				dItem.drawArgs[i] = {
					fun: dItem.args[i].fun,
					points: dItem.args[i].points.slice()
				};
			}
		}
	},
	_setDrawArgs: function(dItem, args, shapeObj) {
		var CDS = this;

		switch (dItem._type) {
			case 'rect':
				args = [args.x || args.left || 0, args.y || args.top || 0, args.width, args.height];
				break;
			case 'arc':
				var _startVal = args.startAngle === undefined ? args.startRad : MathUtils.toRadians(args.startAngle),
					_endVal = args.endAngle === undefined ? args.endRad : MathUtils.toRadians(args.endAngle);

				if (!_startVal) _startVal = 0;
				if (!_endVal) _endVal = 2 * Math.PI;

				args = [args.x || args.left || 0, args.y || args.top || 0, args.width >= 0 ? args.width / 2 : args.radius, _startVal, _endVal];
				break;
		}

		dItem.args = args;
		shapeObj = shapeObj || {};

		switch (dItem._type) {
			case 'rect':
				dItem.x = args[0];
				dItem.y = args[1];
				dItem.width = args[2];
				dItem.height = args[3];
				break;

			case 'arc':
				dItem.x = args[0];
				dItem.y = args[1];
				dItem.width = dItem.height = args[2] * 2;
				break;

			case 'path':
				dItem.width = 0;
				dItem.height = 0;

				dItem.args = args.points;

				dItem.drawArgs = dItem.args.slice();

				dItem.offsetX = 100000000;
				dItem.offsetY = 100000000;

				var i, p;
				for (i = 0; i < dItem.args.length; i++) {
					for (p = 0; p < dItem.args[i].points.length; p += 2) {

						if (dItem.args[i].points[p] < dItem.offsetX) {
							dItem.offsetX = dItem.args[i].points[p];
						} else if (dItem.args[i].points[p] > dItem.width) {
							dItem.width = dItem.args[i].points[p];
						}

						if (dItem.args[i].points[p + 1] < dItem.offsetY) {
							dItem.offsetY = dItem.args[i].points[p + 1];
						} else if (dItem.args[i].points[p + 1] > dItem.height) {
							dItem.height = dItem.args[i].points[p + 1];
						}
					}
				}

				dItem.width = dItem.width - dItem.offsetX;
				dItem.height = dItem.height - dItem.offsetY;
				for (i = 0; i < dItem.args.length; i++) {
					for (p = 0; p < dItem.args[i].points.length; p += 2) {
						dItem.args[i].points[p] -= dItem.offsetX + (dItem.width / 2);
						dItem.args[i].points[p + 1] -= dItem.offsetY + (dItem.height / 2);
					}
					CDS._setLineDrawArgs(dItem, i);
				}

				dItem.x = shapeObj.params.x >= 0 || shapeObj.params.x <= 0 ? shapeObj.params.x : dItem.offsetX + (dItem.width / 2);
				dItem.y = shapeObj.params.y >= 0 || shapeObj.params.y <= 0 ? shapeObj.params.y : dItem.offsetY + (dItem.height / 2);

				break;

		}
		CDS.setTransformOrigin(dItem, shapeObj.transformOrigin || (dItem._type === 'rect' ? '0 0' : '50% 50%'));
	},
	_getIsSourceCanvas: function(img) {
		return img.tagName === 'CANVAS' || (typeof img === 'object' && img.tagName === undefined);
	},
	_wrapText: function(dItem, translation, draw) {

		var CDS = this,
			_recalc = (draw === false ? true : false),
			_prop = 'empty';
		if (!_recalc) {
			for (var item in dItem.deltaProps) {
				if (dItem.deltaProps[item] != dItem[item]) {
					_prop = item;
					_recalc = true;
					break;
				}
			}
		}

		if (_recalc) {

			dItem.deltaProps.strokeOffset = (dItem.strokePosition === 'outer' || dItem.strokePosition === 'center' ? (dItem.strokeWidth / 4) : 0) * CDS.qualityScale;

			dItem.drawProps.offsetX = dItem.marginLeft + ((dItem.textAlign === 'right' ? -1 : 1) *  dItem.deltaProps.strokeOffset);
			dItem.drawProps.offsetY = dItem.marginTop + dItem.deltaProps.strokeOffset;

			var _words = dItem.copy.split(' '),
				_returnLine = '',
				_tempLine,
				_strokeWidth,
				_finalTextWidth = 0,
				_finalText = [];
			for (var n = 0; n < _words.length; n++) {
				_tempLine = _returnLine + _words[n] + ' ';
				_strokeWidth = CDS.ctx.measureText(_tempLine).width;
				if (_strokeWidth > dItem.maxWidth && n > 0) {
					_strokeWidth = CDS.ctx.measureText(_returnLine).width;
					if (_finalTextWidth < _strokeWidth) _finalTextWidth = _strokeWidth;

					_finalText.push({
						copy: _returnLine,
						y: dItem.drawProps.offsetY
					});

					_returnLine = _words[n] + ' ';
					dItem.drawProps.offsetY += dItem.lineHeight;
				} else {
					_returnLine = _tempLine;
					if (_finalTextWidth < _strokeWidth) _finalTextWidth = _strokeWidth;
				}
			}
			_finalText.push({
				copy: _returnLine,
				y: dItem.drawProps.offsetY
			});
			dItem.width = _finalTextWidth + (dItem.deltaProps.strokeOffset * 2);
			dItem.height = dItem.drawProps.offsetY + (dItem.deltaProps.strokeOffset * 2);
			dItem.offsetX = dItem.width * dItem.transOffsetX;
			dItem.offsetY = dItem.height * dItem.transOffsetY;
			for (item in dItem.deltaProps) dItem.deltaProps[item] = dItem[item];

			dItem.drawProps.copy = _finalText.slice();
		}

		if (draw !== false) {
			var _offsetX = -dItem.drawProps.offsetX,
				_offsetY = 0 //dItem.drawProps.offsetY,
			_drawX = dItem.x,
				_drawY = dItem.y;

			if (translation) {
				_offsetX = dItem.offsetX + (dItem.strokeWidth / 2);
				_offsetY = dItem.offsetY;
				_drawX = 0;
				_drawY = 0;
			}
			var copy;
			for (n = 0; n < dItem.drawProps.copy.length; n++) {
				copy = dItem.drawProps.copy[n].copy;
				if (copy.lastIndexOf(' ') === copy.length - 1) copy = copy.substring(0, copy.length - 1);
				CDS._drawText(dItem, copy, _drawX - _offsetX, _drawY + dItem.drawProps.copy[n].y - _offsetY);
			}
		}
	},
	_drawText: function(element, copy, x, y) {
		var CDS = this,
			_outer = element.strokePosition === 'outer',
			_strokeDepth = element.strokeWidth > 0;

		if (element.strokeDashSize > 0 && element.strokeDashGap > 0) CDS.ctx.setLineDash([element.strokeDashSize * CDS.qualityScale, element.strokeDashSize * CDS.qualityScale]);
		CDS.ctx.lineDashOffset = element.strokeDashOffset;
		CDS.ctx.lineJoin = element.strokeJoin;
		CDS.ctx.font = (element.fontSize * CDS.qualityScale) + 'px ' + element.fontFamily;
		CDS.ctx.fillStyle = element.fill;
		CDS.ctx.strokeStyle = element.strokeFill;
		CDS.ctx.textAlign = element.textAlign;
		CDS.ctx.textBaseline = 'top';
		CDS.ctx.lineWidth = element.strokeWidth * CDS.qualityScale * (_outer ? 2 : 1);

		if (_outer && _strokeDepth) CDS.ctx.strokeText(copy, x * CDS.qualityScale, y * CDS.qualityScale);
		CDS.ctx.fillText(copy, x * CDS.qualityScale, y * CDS.qualityScale);
		if (!_outer && _strokeDepth) {
			CDS.ctx.shadowColor = 'rgba(0, 0, 0, 0)';
			CDS.ctx.shadowOffsetX = 0;
			CDS.ctx.shadowOffsetY = 0;
			CDS.ctx.shadowBlur = 0;
			CDS.ctx.strokeText(copy, x * CDS.qualityScale, y * CDS.qualityScale);
		}
	},

}









/* -- CORE IMPLEMENTED: CanvasDrawerElement.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
function CanvasDrawerElement(stage, obj, type) {
	var CDE = this;

	CDE._type = obj.type || type;
	CDE.drawer = stage;

	CDE.id = obj.id || 'canvasdItem' + stage.elementsLength;
	stage.elements[CDE.id] = CDE;
	stage.elementsLength++;

	CDE.isActive = obj.isActive === false ? false : true;

	CDE.rotation = obj.params.rotation || 0;
	CDE.scaleX = obj.params.scaleX === 0 ? 0 : (obj.params.scaleX || 1);
	CDE.scaleY = obj.params.scaleY === 0 ? 0 : (obj.params.scaleY || 1);

	CDE.alpha = obj.params.alpha >= 0 ? obj.params.alpha : (obj.params.opacity >= 0 ? obj.params.opacity : 1);
	CDE.blendMode = obj.blendMode || 'source-over';

	obj.stroke = obj.stroke || {};

	var _hasShadow = obj.dropShadow ? true : false;
	obj.dropShadow = obj.dropShadow || {};

	CDE.init();

	CDE._shadowAngle = obj.dropShadow.angle || 0;
	CDE.shadowDistance = obj.dropShadow.distance || 0;
	CDE._shadowColor = obj.dropShadow.color || (_hasShadow ? '#000000' : null);
	CDE.shadowAlpha = obj.dropShadow.alpha || CDE._shadowAlpha;
	CDE.shadowBlur = obj.dropShadow.blur || 0;
}

CanvasDrawerElement.prototype = {
	init: function() {
		var CDE = this;

		Object.defineProperties(CDE, {
			left: {
				get: function() {
					return CDE.x;
				},
				set: function(value) {
					CDE.x = value;
				}
			},
			top: {
				get: function() {
					return CDE.y;
				},
				set: function(value) {
					CDE.y = value;
				}
			},
			opacity: {
				get: function() {
					return CDE.alpha;
				},
				set: function(value) {
					CDE.alpha = value;
				}
			},
			shadowAngle: {
				get: function() {
					return CDE._shadowAngle;
				},
				set: function(value) {
					CDE._shadowAngle = value;
					CDE._setOffsetPos();
				}
			},
			shadowDistance: {
				get: function() {
					return CDE._shadowDistance;
				},
				set: function(value) {
					CDE._shadowDistance = value;
					CDE._setOffsetPos();
				}
			},
			shadowColor: {
				get: function() {
					return CDE._shadowColor;
				},
				set: function(value) {
					CDE._shadowColor = value === null ? null : ColorUtils.toRgba(value, CDE._shadowAlpha);
				}
			},
			shadowAlpha: {
				get: function() {
					return CDE._shadowAlpha;
				},
				set: function(value) {
					CDE._shadowAlpha = value;
					CDE.shadowColor = CDE._shadowColor;
				}
			}
		});
	},
	_setOffsetPos: function(ang, dist) {
		var CDE = this;
		var radians = MathUtils.toRadians(CDE._shadowAngle * -1 + 180);
		CDE._shadowOffsetX = (Math.cos(radians) * CDE._shadowDistance).toFixed(8);
		CDE._shadowOffsetY = (Math.sin(radians) * CDE._shadowDistance).toFixed(8);
	},

	toString: function() {
		return '[object CanvasDrawerElement]';
	}
}









/* -- CORE IMPLEMENTED: MathUtils.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var MathUtils = (function(){
	function toRadians ( degree ) {
		return (Math.PI / 180.0) * degree;
	}
	function toDegrees ( radian ) {
		return (180.0 / Math.PI) * radian;
	}
	function random ( a, b, increment ) {
		b = b || 0;
		increment = (increment != undefined && increment > 0) ? increment : 1;
		
		var min = Math.min(a, b);
		var max = Math.max(a, b);

		min = Math.ceil( min / increment ) * increment;
		max = Math.floor( max / increment ) * increment;
		
		var _num = min + (Math.floor(Math.random() * ((max - min + increment) / increment)) / (1 / increment));
		return _num;
	}
	function randomBoolean ( weight ) {
		weight = weight || .5;
		return Math.random() < weight;
	}
	function rel ( a0, a1, b0, b1, bX ) {
		return ( (bX - b0) / (b1 - b0) ) * (a1 - a0) + a0;
	}

	function inRange ( val, a, b ) {
		var min = Math.min( a, b );
		var max = Math.max( a, b );
		return ( val <= max ) && ( val >= min );
	}
	function isNumber ( num ) {
		return !isNaN( num );
	}
	function toNumber ( str ) {
		return +str;
	}
	function restrict ( num, min, max ) {
		return Math.max ( min, Math.min ( max, num ));
	}
	function getAnglePoint ( x, y, distance, angle ) {
		var x = x + ( Math.cos ( angle ) * distance );
		var y = y + ( Math.sin ( angle ) * distance );
		
		return [ x, y ];
	}
	function getAngle(x1, y1, x2, y2) {
		x2 = x2 || 0;
		y2 = y2 || 0;
		return Math.atan2((y2 - y1), (x2 - x1));
	}
	function getDistance(x1, y1, x2, y2) {
		x2 = x2 || 0;
		y2 = y2 || 0;
		return Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1));
	}
	return {
		toRadians : toRadians,
		toDegrees : toDegrees, 
		random : random,
		randomBoolean : randomBoolean,
		rel : rel,
		inRange : inRange,
		isNumber : isNumber,
		toNumber : toNumber,
		restrict: restrict,
		getAnglePoint: getAnglePoint,
		getAngle: getAngle,
		getDistance: getDistance
	}
})();










/* -- CORE IMPLEMENTED: UIBorder.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
function UIBorder( arg ){
	SheetManager.createGlobalNode ( 'RED_uiBorder', 
		'.ui-border', 'position:absolute; top:0px; left:0px; width:100%; height:100%; border-style:solid; box-sizing:border-box; -moz-box-sizing: border-box; -webkit-box-sizing: border-box;'
	)
	var _size;
	var _color;
	var U = new UIDiv( arg );

	SheetManager.addClass ( U, 'ui-border' );
	Object.defineProperties ( U, {
		size: {
			get: function() {
				return _size;
			},
			set: function ( value ) {
				trace ( 'UIBorder :: SET -> size =', value );
				if ( value != undefined && _size != value ){
					trace ( 'value:', value )
					_size = value;

					Styles.setCss ( U, { borderWidth:_size });
				}
			}
		},

		color: {
			get: function() {
				return _color;
			},
			set: function ( value ) {
				trace ( 'UIBorder :: SET -> color =', value )	
				if ( value && _color != value ){
					_color = value;

					Styles.setCss ( U, { borderColor:_color });
				}
			}
		}

	});
	U.toString = function(){
		return '[object UIBorder]'
	}
	Gesture.disable ( U ); 
	U.color = arg.color;
	U.size = arg.size;

	return U
}









/* -- CORE IMPLEMENTED: UIButton.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
function UIButton ( arg ){
	SheetManager.createGlobalNode ( 'RED_uiButton', 
		'.ui-button', 'position:absolute; width:30px; height:30px;',
		'.ui-button-state', 'position: absolute; width:inherit; height:inherit;'
	)
	var _state = 0
	var _icon = [];
	arg = arg || {}
	var U = new UIComponent ( arg );
	SheetManager.addClass ( U, 'ui-button' );
	
	arg.icon = arg.icon || []
	for ( var i = 0; i < arg.icon.length; i++ ){
		createChild ( arg.icon[i] );
	}
	U.togglable = true;
	Object.defineProperty ( U, 'state', {
		get: function() {
			return _state;
		},
		set: function(value) {
			_state = value;
			if ( value >= _icon.length ){
				_state = 0;
				trace ( ':: WARNING ::\n\n\tUIButton.state = ' + value + ' does not exist. Reset to 0.\n\n' )
			}
			for ( var i = 0; i < _icon.length; i++ ){
				_icon[i].style.visibility = i == _state ? 'visible' : 'hidden' ;
			}
		}
	});
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
		return '[object UIButton]'
	}
	U._onClick = function(event){}
	U._onOver = function(event){}
	U._onOut = function(event){}
	function createChild ( name ){
		var elem;
		var id = arg.id + '-state-' + _icon.length;

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
			U.addChild( elem );
			if ( /(UITextField)/gi.exec(elem.toString()) ){
				elem.resetToDefault()
			}
		}
		_icon.push( elem )

		SheetManager.addClass ( elem, 'ui-button-state' );

		Gesture.disable ( elem )
	}
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
	U.addEventListener ( UIEvent.ENABLED, handleBaseEnabled )

	U.enabled = true;
	U.state = arg.state || 0;

	return U;
}










/* -- CORE IMPLEMENTED: Track3rdParty.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var Track3rdParty = new function(){

	this.pixel = function ( url ){
		trace ( 'Track3rdParty.pixel()\n\turl =', url )
		var img = new Image();
		img.src = url;
	}
}









/* -- CORE IMPLEMENTED: ColorUtils.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var ColorUtils = new function() {

	var CU = this;
	CU.toRgba = function(color, alpha){
		switch(typeof color){
			case 'object':
				color = color || { r:0, g:0, b:0, a:1 }
				break;
			default:
				if (color.indexOf('rgb') >= 0){
				    color = color.substring(color.indexOf('(') + 1, color.lastIndexOf(')')).split(/,\s*/);
					color = { r:color[0], g:color[1], b:color[2], a:color[3]};
				} else if (color.indexOf('#') >= 0){
					var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec( color );
				    color = result ? {
				        r: parseInt( result[1], 16 ),
				        g: parseInt( result[2], 16 ),
				        b: parseInt( result[3], 16 ),
				        a: result[4] ? parseInt( result[4], 16 ) : 1
				    } : null;
				} else {
					console.log('');
					trace("ERROR: ColorUtils.toRgba does not accept color names such as '" + color + "'. Use HEX or an RGB/A string or object per documentation");
					trace("Returning the color '" + color + "' without any alpha");
					console.log('');
					return color;
				}
				break;
		}
		if( !color.a ) color.a = 1;
		if( alpha >= 0 ) color.a = alpha;
		
		return 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + color.a + ')'
	}

}










/* -- CORE IMPLEMENTED: Clamp.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var Clamp = function() {

	var _rect = {
		x : [ 'offsetWidth', 'width', 'left', 'right' ],
		y : [ 'offsetHeight', 'height', 'top', 'bottom' ]
	}
	function set ( source, type, buffer ){
		var elem = Markup.getElement( source );		
		
		var children = elem.childNodes;
		var childCoordinates = [];	
		
		var direction = {};
		if ( /(x)/gi.exec( type ) ) direction.x = {};
		if ( /(y)/gi.exec( type ) ) direction.y = {};

		for ( var i = 0; i < children.length; i++ ){
			var child = children[i];
			
			childCoordinates[i] = {};

			for ( var xy in direction ){
				
				var xyValue = Styles.getCss ( child, xy );
				var whValue = child [ _rect[xy][0] ];

				var add = xyValue + whValue;

				var xyDirection = direction[xy]
				
				if ( i == 0 ){
					xyDirection.min = xyValue;
					xyDirection.max = add;
				}
				
				if ( xyValue < xyDirection.min ) 
					xyDirection.min = xyValue;
				
				if ( xyDirection.max < add ) 
					xyDirection.max = add;
				
				childCoordinates[i][xy] = xyValue;
			}
		}
		var _buffer = {
			top : 0,
			bottom : 0,
			left : 0,
			right : 0
		}

		if ( buffer ){
			for ( var prop in _buffer ){
				_buffer [ prop ] = isNaN(buffer) ? ( buffer [ prop ] || 0 ) : buffer;
			}
		}		
		var css = {};
		for ( var xy in direction ){
			var d = direction[xy]
			
			css [ xy ] = d.min + Styles.getCss ( elem, xy ) - _buffer [ _rect[xy][2] ]
			
			css [ _rect[xy][1] ] = d.max - d.min + _buffer [ _rect[xy][2] ] + _buffer [ _rect[xy][3] ];
		}
		
		Styles.setCss( elem, css )
		for ( i = 0; i < children.length; i++ ){
			var child = children[i];
			var css = {}

			for ( var xy in direction ){
				css [ xy ] = childCoordinates[i][xy] - direction[xy].min + _buffer [ _rect[xy][2] ]
			}

			Styles.setCss( child, css )
		}
		
	}
	return {
		X 	: 	'clampX',
		Y 	: 	'clampY',
		XY 	: 	'clampXY',
		set 	: 	set
	}

}()









/* -- CORE IMPLEMENTED: Effects.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var Effects = (function() {
	function blur ( obj ) {
		if ( obj.amount >= 0 ) Styles.setCss( obj.target, { filter : 'blur(' + obj.amount + 'px)' });
	}
	function dropShadow ( obj ) {
		Styles.setCss( obj.target, { boxShadow : createShadow ( obj.angle || 0, obj.distance || 0, obj.size || 0, obj.spread || 0, obj.color || '#000000', obj.alpha, obj.inner ) });
	}
	function textDropShadow ( obj ) {
		Styles.setCss( obj.target, { textShadow : createShadow ( obj.angle || 0, obj.distance || 0, obj.size || 0, null, obj.color || '#000000', obj.alpha ) });
	}
	function glow ( obj){
		obj.angle = 0;
		obj.distance = 0;
		dropShadow( obj );
	}
	function linearGradient ( obj ) {
		Styles.setCss( obj.target, { background: 'linear-gradient(' + (obj.angle || 0) + 'deg, ' + obj.colors.toString() + ')' });
	}
	function radialGradient ( obj ) {
		Styles.setCss( obj.target, { background: 'radial-gradient(' + obj.colors.toString() + ')' });
	}
	function createShadow ( angle, distance, size, spread, color, alpha, inner ) {
		var val = ''
		var deg = angle * -1 + 180
		var rad = MathUtils.toRadians( deg );
		val += (Math.cos(rad) * distance).toFixed(8) + 'px ';
		val += (Math.sin(rad) * distance).toFixed(8) + 'px ';
		val += size + 'px';
		
		if( spread ) val += ' ' + spread + 'px';
		val += ' ' + ColorUtils.toRgba(color, alpha);
		trace("VAL!", val)

		inner = !!inner;
		if( inner ) val += ' inset';

		return val;
	}
	return {
		blur 			: blur,
		dropShadow 		: dropShadow,
		textDropShadow	: textDropShadow,
		linearGradient 	: linearGradient,
		radialGradient 	: radialGradient,
		glow		 	: glow
	}

})();










/* -- CORE IMPLEMENTED: UISlider.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
function UISlider ( arg ){
	SheetManager.createGlobalNode ( 'RED_uiSlider', 
		'.ui-slider', 'position:absolute; width:100%; height:100%;',
		'.ui-slider-bg, .ui-slider-track, .ui-slider-loaded, .ui-slider-handle, .ui-slider-hitState', 'position:absolute; width:100%; height:inherit;',
		'.ui-slider-bg', 'background-color: #666666;',
		'.ui-slider-loaded', 'background-color: #560000; width:0%;',
		'.ui-slider-track', 'background-color: #cc0000; width:0%;',
		'.ui-slider-handle', 'background-color: #ffffff; width:5%; left:0%;'
	)
	var _destPercent = 0;
	var _percent = 0;
	var _dragging = false;
	var _startX = 0;
	arg = arg || {}
	var U = new UIComponent ( arg );
	SheetManager.addClass ( U, 'ui-slider' );	
	
	var children = [ 'bg', 'loaded', 'track', 'handle', 'hitState' ];
	U.elements = [];
	for ( var i = 0; i < children.length; i++ )
		createChild ( children[i] );

	Object.defineProperties ( U, {

		goToPercent: {
			get: function() {
				return _percent;
			},
			set: function(value) {
				U.destPercent = value;
				TweenLite.to( U, 0.25, { percent: U.destPercent, ease:Quad.easeOut } );
			}
		},


		percent: {
			get: function() {
				return _percent;
			},
			set: function(value) {
				_percent = MathUtils.restrict( value, 0, 1 );
				U.track.style.width = (_percent * 100) + '%';
				U.handle.style.left = getHandlePercent() + '%';
			}
		},

		destPercent: {
			get: function() {
				return _destPercent;
			},
			set: function(value) {
				_destPercent = MathUtils.restrict( value, 0, 1 );
				U.track.style.width = (_destPercent * 100) + '%';
				U.handle.style.left = getHandlePercent() + '%';
			}
		},
		dragging: {
			get: function() {
				return _dragging;
			},
			set: function(){
				trace ( ':: WARNING ::\n\n\tUISlider2.dragging cannot be set.\n\n' )
			}
		}
	});
	U.onUpdate = arg.onUpdate || function(event){
		trace ( 'UISlider.onUpdate()' )
	}
	U.toString = function(){
		return '[object UISlider]'
	}
	U._onUpdate = function(event){}
	function createChild ( name ){
		U[name] = document.createElement('div');
		SheetManager.addClass ( U[name], 'ui-slider-' + name );	
		U[name].id = arg.id + '-' + name;
		if ( arg[name] ) Styles.setCss( U[name], arg[name] );
		if ( arg[name] == false ) U[name].style.display = 'none';
		U.appendChild( U[name] );
		U.elements.push( U[name] );
	}

	function positionToPercent ( newX ){
		U.destPercent = newX / U.offsetWidth;
		if ( Math.abs( U.percent - U.destPercent ) < 0.05 )
			U.percent = U.destPercent;
		else
			TweenLite.to( U, 0.25, { percent: U.destPercent, ease:Quad.easeOut } );
	}

	function getHandlePercent (){
		var thumbHalf = (U.handle.offsetWidth / U.offsetWidth) / 2;
		var perc = MathUtils.restrict ( _percent, thumbHalf, 1 - thumbHalf ) - thumbHalf;

		return perc * 100;
	}

	function dispatch () {
		U.dispatchEvent ( UIEvent.sliderUpdate );	
		U.onUpdate.call( U, UIEvent.sliderUpdate );
		U._onUpdate.call( U, UIEvent.sliderUpdate );
	}
	function handleDown ( event ){
		trace('UISlider.handleDown()');
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

	function handleClick ( event ){
		event.stopImmediatePropagation();		
	}

	function handleBaseEnabled ( event ){
		var listener = U.enabled ? 'addEventListener' : 'removeEventListener' ;
		Gesture[listener]( U.hitState, GestureEvent.DOWN, handleDown );
		Gesture[listener]( U.hitState, GestureEvent.UP, handleUp );
		Gesture[listener]( U.hitState, GestureEvent.DRAG, handleDrag );
		Gesture[listener]( U.hitState, GestureEvent.CLICK, handleClick );
	}
	U.addEventListener ( UIEvent.ENABLED, handleBaseEnabled )

	U.enabled = true;

	return U;
}










/* -- CORE IMPLEMENTED: YouTubePlayer.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
function YouTubePlayer ( arg ){

	var V = this;

	V.id = (arg.id || '' + Date.now()) + '-youTubePlayer';
	V.css = arg.css;

	V.muted = !!arg.muted;
	V.paused = !arg.autoPlay;
	V.percent = 0;
	V.currentTime = 0;
	V.duration = 0;
	V.complete = false;
	V.onReady = arg.onReady || function(){};
	V.onComplete = (arg.onComplete || function(){}).bind(V);
	V.onFail = (arg.onFail || function(){}).bind(V);
	V.onBuffer = (arg.onBuffer || function(){}).bind(V);
	V.onProgress = (arg.onProgress || function(){}).bind(V);
	V.onPlay = (arg.onPlay || function(){}).bind(V);
	V.onPause = (arg.onPause || function(){}).bind(V);
	var _videoId = arg.videoId;
	var _autoPlay = arg.autoPlay;
	var _sourceCalled = false;
	var _readyHeard = false;

	var _classPlayerParams = {
		autoplay : arg.autoPlay ? 1 : 0,
		controls: arg.controls ? 1 : 0,
		showinfo: arg.showInfo ? 1 : 0,
		modestbranding: arg.inlineYouTubeLogo ? 0 : 1,
		fs: arg.allowFullScreen ? 1 : 0,
		rel: arg.showRelatedVideos ? 1 : 0,
		iv_load_policy:  arg.allowAnnotations ? 1 : 3,
		vq: arg.quality || 'medium'
	}
	var _currentPlayerParams = {};
	for ( var p in _classPlayerParams ){
		_currentPlayerParams[p] = _classPlayerParams[p];
	}

	var _cuePoints = {
		pool : [],
		first : null,
		active : false,
		seeked : false
	}
	arg.id = V.id;
	if ( !arg.css.hasOwnProperty('backgroundColor') ) 
		arg.css.backgroundColor = '#000000';
	V.container = Markup.addDiv(arg);

	var holder = document.createElement('div');
	holder.width = V.css.width;
	holder.height = V.css.height;
	holder.style.position = 'absolute';
	V.container.appendChild(holder);
	V.hide = function(){
		V.player.f.style.display = 'none';
	}
	V.show = function(){
		try {
			V.player.f.style.removeProperty ( 'display' );
		} catch (e) {
			V.player.f.style.display = null;
		}
	}
	V.play = function(){
		V.player.playVideo();
	}
	V.pause = function(){
		V.player.pauseVideo();
	}
	V.seek = function( sec ) {
		trace ( 'seekTo:', sec)
		_cuePoints.seeked = true;
		if ( sec > V.duration ) sec = V.duration;
		else V.complete = false;
		V.player.seekTo( sec );
	}
	V.addCuePoint = function( time, handler, params ){
		_cuePoints.active = true;
		var cuePoint = {
			time : time,
			handler : handler,
			frame : -1,
			params : params || null,
			past : false
		}
		_cuePoints.pool.push ( cuePoint );

		_cuePoints.pool.sort(function(a, b) {
			return a.time - b.time;
		});
		trace ( 'add:', _cuePoints )
	}
	V.mute = function() {
		if ( V.player.mute )	
			V.player.mute();
		V.muted = true;
	}
	V.unmute = function() {
		if ( V.player.unMute ) 
			V.player.unMute();
		V.muted = false;
	}
	V.volume = function(val){
		V.player.setVolume( val );
	}
	V.source = function(src){
		if ( src == undefined ) return _videoId;
		_sourceCalled = true;
		_videoId = src;
		
		FrameRate.unregister ( V, handleTimeUpdate, 3 );

		if ( _readyHeard ){
			updateSource();
		}
	}
	V.autoPlay = function(active){
		if ( active == undefined ) return video.autoplay;
		_autoPlay = active;
	}
	V.controls = function(state){
		if ( state == undefined ) return _classPlayerParams.controls;	
		_classPlayerParams.controls = state ? 1 : 0 ;
	}
	V.allowFullScreen = function(state){
		if ( state == undefined ) return _classPlayerParams.fs;	
		_classPlayerParams.fs = state ? 1 : 0 ;
	}
	V.quality = function(str){
		if ( str == undefined ) return _classPlayerParams.vq;
		_classPlayerParams.vq = str;
		V.player.setPlaybackQuality( str );
		_currentPlayerParams.vq = str;
	}
	V._addPreview = function(src){
		var originalVideoId = _videoId;
		_videoId = src || _videoId;

		return originalVideoId;
	}
	function updateSource(){
		
		if ( checkPlayerParams() ){
			_readyHeard = false;
			createPlayer();
		} else {
			V.player.cueVideoById ( _videoId ); //.loadVideoById
		}
	}

	function createPlayer(){
		if ( V.player ) {
			V.player.destroy();
			if ( V.previewButton ) V.previewButton.hide();
		}
		V.player = new YT.Player( holder, {
			width: arg.css.width,
			height: arg.css.height,
			videoId: _videoId,
			playerVars: _currentPlayerParams
		});
		V.player.addEventListener ( 'onReady', handlePlayerReady );
		V.player.addEventListener ( 'onStateChange', handleStateChange );
		V.player.addEventListener ( 'onError', V.onFail );
	}

	function checkPlayerParams(){
		var recreate = false;
		trace ( 'checkPlayerParams():', _currentPlayerParams )
		for ( var p in _classPlayerParams ){
			trace ( '     ->', p, '=', _currentPlayerParams[p], _classPlayerParams[p] )
			if ( _currentPlayerParams[p] != _classPlayerParams[p] ){
				_currentPlayerParams[p] = _classPlayerParams[p]
				recreate = true;
				trace ( '   ==== RECREATE ====')
			}
		}
		
		return recreate;
	}

	function checkCuePoint (){
		if ( _cuePoints.active ){ //&& V.currentTime > _cuePoints.first ){
			for ( var i = 0; i < _cuePoints.pool.length; i++ ){
				if ( _cuePoints.seeked ) {
					_cuePoints.pool[i].past = ( _cuePoints.pool[i].time < V.currentTime );
				} else {
					if ( _cuePoints.pool[i].time < V.currentTime && !_cuePoints.pool[i].past ){
						_cuePoints.pool[i].handler.apply( V, _cuePoints.pool[i].params )
						_cuePoints.pool[i].past = true;
					}
				}
			}
		}
		_cuePoints.seeked = false;
	}
	function handlePlayerReady ( event ){
		trace ( ' -- READY -- handlePlayerReady()')
		_readyHeard = true;
		
		if ( _sourceCalled ){
			updateSource();
			return;
		}
		
		if ( arg.autoPlay ) {
			V.muted ? V.player.mute() : V.player.unMute() ;
			if ( V.preview instanceof YouTubePlayer ){ 
				V.preview.start();
			}
		}		
		
		V.onReady.call( V, event );
	}

	function handleStateChange ( event ){
		switch( event.data ) {
			case YT.PlayerState.UNSTARTED:
				V.muted ? V.player.mute() : V.player.unMute() ;
				if( arg.autoPlay ) V.play();
				
				V.paused = true;
				break;

			case YT.PlayerState.BUFFERING:
				V.onBuffer.call();
				break;

			case YT.PlayerState.PLAYING:
				V.duration = V.player.getDuration();
				V.paused = false;
				if (Math.abs(V.player.getCurrentTime() - V.currentTime) > 0.5) {
					_cuePoints.seeked = true;
				}

				FrameRate.register ( V, handleTimeUpdate, 3 );
				V.onPlay.call( V, event );
				break;	

			case YT.PlayerState.ENDED:
				handleComplete(event);

			case YT.PlayerState.PAUSED:
				V.paused = true;
				FrameRate.unregister ( V, handleTimeUpdate, 3 );
				V.onPause.call( V, event );
				break;				
		}
	}

	function handleTimeUpdate (){
		V.currentTime = V.player.getCurrentTime();
		V.percent = V.currentTime / V.duration;
		V.onProgress.call( V );

		checkCuePoint();
		if ( V.player.getCurrentTime() >= V.player.getDuration() ){
			V.pause();
		}
	}

	function handleComplete(event){
		trace ( 'VideoPlayer.handleComplete ( event )', event )
		_cuePoints.seeked = true;

		V.paused = true;
		V.complete = true;
		V.onComplete.call(this, event);
	}
	V.preview = arg.preview ? new UIPreviewOverlay( V, arg.preview ) : {};

	createPlayer();
	
	return V;
}




















/* -- COMMON: PrepareCommon.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var PrepareCommon = new function() {
	var self = this;
	
	var async;
	var completeCallback
	self.init = function( _completeCallback ) {
		trace( 'PrepareCommon.init()' );
		completeCallback = _completeCallback;
		async = new Async();
		async.onComplete( self.initComplete );

		async.start();
	}
	self.initComplete = function() {
		trace( 'PrepareCommon.initComplete()' );
		self.prepareAdData();
		self.loadImageQueue();
	}
	self.prepareAdData = function() {
		trace( 'PrepareCommon.prepareAdData()' );
		global.adData = new AdData( global.adParams.currentJsonData );

		 
	}
	self.loadImageQueue = function() {
		trace( 'PrepareCommon.loadImageQueue()' );
		ImageManager.load( self.onLoadAllImagesComplete );
	}
	self.onLoadAllImagesComplete = function() {
		trace ( 'PrepareCommon.onLoadAllImagesComplete()');
		completeCallback();	
	}

}










/* -- COMMON: AdData.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
function AdData( parsedJsonData ){
	
	this.adDataRaw = parsedJsonData ? parsedJsonData : {};

	trace( '  adDataRaw:');
	trace( this.adDataRaw );

	this.elements = {};
	this.elements.redAdContainer = Markup.getElement( 'redAdContainer' );
	
	this.edgeData = new EdgeData();
	this.guideLabel = '';
	this.guide = this.guideLabel ? ImageManager.addToLoad( this.guideLabel + '.jpg', adParams.imagesPath ) : '';
	this.font_bold = 'Flama-Bold-optimized';
	this.font_boldItalic_allCaps = 'Flama-BoldItalic-ALLCAPS';
	this.font_book = 'Flama-Book-optimized';
	this.font_bookItalic = 'Flama-BookItalic-optimized';

	this.trianglesMap = [
		'Ω',
		'æ',
		'ø',
		'¿',
		'¡'
	]
	this.huluColors = {
		primaryGreen: '#66AA33',
		secondaryGreen: '#99CC33',
		tertiaryGreen: '#41811E',
		black: '#222222',
		darkGrey: '#666666',
		lightGrey: '#E8E8E8',
	}
	this.greyColor = '#212221';
	this.lightGreyColor = '#555555';
	this.wrongColor = '#f30009';
	this.whiteColor = '#ffffff';
	this.ctaCopy = 'Start Your Free Trial';
	this.expandCopy = 'DRAG THE SLIDER TO PICK YOUR MOOD';
	this.introCopy = "LET'S PAIR YOUR MOOD TO YOUR TV";
	this.galleryCTACopy_video = 'WATCH TRAILER';
	this.galleryCTACopy_image = 'READ SYNOPSIS';
	this.galleryCTACopy = function( media ) {	return this[ 'galleryCTACopy_' + media ];	}
	this.curCategoryNum = 0;
	this.categoryDirectionFrom = 'right';
	this.updateCategory = function ( newCategory ) {
		trace('AdData.updateCategory()');
		this.categoryDirectionFrom = newCategory > this.curCategoryNum ? 'right' : 'left';
		trace('\t this.categoryDirectionFrom:' + this.categoryDirectionFrom);
		this.curCategoryNum = newCategory;
	}
	this.curCategory = function() {
		return this.categories[ this.curCategoryNum ];
	}
	this.getShowData = function ( showNum ) {
		return this.curCategory().titles[ showNum ];
	}

	
	this.categories = [ {
			title: 'Worst. Day. Ever.',
			image: 'category_image_wde',
			expandedHeader: "DON'T HOLD IT INSIDE. GET WILD WITH SOME ANIMATION.",
			expandedTagline: 'Limited-Time Offer – Get Hulu for $5.99/month*<br><span style="font-size: 60%">*Terms apply</span>',
			titles : [ {
					ctaCopy: 'Watch Seasons 1-6',
					ctaURL: 'http://www.hulu.com/start?show=archer',
					title: 'Archer',
					synopsis: "Archer revolves around an international spy agency and the lives of its employees. Although their work of espionage, reconnaissance missions, wiretapping and undercover surveillance is daunting and dangerous, every covert operation and global crisis is actually just another excuse for the staff to undermine, sabotage and betray each other for personal gain.",
					image: 'gallery_image_archer',
					network: 'network_fx',
					media: 'H9EepD5ypXc',
					mediaTye: 'video'
				}, {
					ctaCopy: 'Watch The Latest Season',
					ctaURL: 'http://www.hulu.com/start?show=bobs-burgers',
					title: "Bob's Burgers",
					synopsis: "Bob runs Bob's Burgers with the help of his wife and their three kids. Business may be slow, but they never give up hope.",
					image: 'gallery_image_BobsBurgers',
					network: 'network_fox',
					media: 'Ide_WV7xBEw',
					mediaTye: 'video'
				}, {
					ctaCopy: 'Watch All Episodes',
					ctaURL: 'http://www.hulu.com/rick-and-morty',
					title: "Rick and Morty",
					synopsis: "Rick and Morty is a show about a sociopathic scientist who drags his unintelligent grandson on insanely dangerous adventures across the universe.",
					image: 'gallery_image_RickAndMorty',
					network: 'network_adultswim',
					media: '816QTblG9Qs',
					mediaTye: 'video'
				}, {
					ctaCopy: 'Watch The Latest Season',
					ctaURL: 'http://www.hulu.com/start?show=the-simpsons',
					title: 'The Simpsons',
					synopsis: 'This long-running animated comedy focuses on the eponymous family in the town of Springfield in an unnamed U.S. state.',
					image: 'gallery_image_Simpsons',
					network: 'network_fox',
					media: 'f_B_afVbmlE',
					mediaTye: 'video'
				}, {
					ctaCopy: 'Watch The Series Premiere',
					ctaURL: 'http://www.hulu.com/son-of-zorn',
					title: 'Son Of Zorn',
					synopsis: 'After being away for a decade, an animated warrior struggles with the banality of suburban life.',
					image: 'gallery_image_SonOfZorn',
					network: 'network_fox',
					media: 'sC7RxUV8Ymw',
					mediaTye: 'video'
				}
			]
		}, {
			title: 'Hangry',
			image: 'category_image_hangry',
			expandedHeader: "SOUNDS LIKE A BLOOD SUGAR ISSUE. LET'S GET COOKING!",
			expandedTagline: 'Limited-Time Offer – Get Hulu for $5.99/month*<br><span style="font-size: 60%">*Terms apply</span>',
			titles : [ {
					ctaCopy: 'Watch Seasons 1-12',
					ctaURL: 'http://www.hulu.com/start?show=top-chef',
					title: 'Top Chef',
					synopsis: "Top Chef offers a fascinating window into the competitive, pressure-filled environment of world class cookery and the restaurant business at the highest level.",
					image: 'gallery_image_TopChef',
					network: 'network_bravo',
					media: 'smtExABYnSI',
					mediaTye: 'video'
				}, {
					ctaCopy: 'Watch Seasons 1-6',
					ctaURL: 'http://www.hulu.com/kitchen-nightmares',
					title: "Kitchen Nightmares",
					synopsis: "An unscripted series in which Gordon Ramsay attempts to turn deserted restaurants into the most sought-after venues in town.",
					image: 'gallery_image_KitchenNightmares',
					network: 'network_fox',
					media: '8_CUx3niowk',
					mediaTye: 'video'
				}, {
					ctaCopy: 'Watch The Full Series',
					ctaURL: 'http://www.hulu.com/kitchen-confidential',
					title: 'Kitchen Confidential',
					synopsis: "Based on renowned chef Anthony Bourdain's best-selling autobiography and from executive producers Darren Star (Sex and the City) and Dave Hemingson (American Dad), Kitchen Confidential exposes the secrets of the restaurant business through the delectable story of a talented chef who's determined to climb back to the top of the food game.",
					image: 'gallery_image_KitchenConfidential',
					network: '',
					media: 'H6OvNW5zy4M',
					mediaTye: 'video'
				}, {
					ctaCopy: 'Watch Season 7',
					ctaURL: 'http://www.hulu.com/masterchef',
					title: 'MasterChef',
					synopsis: 'A culinary competition series that searches for the best home cooks in America, and through a series of exciting elimination rounds, will turn one of them into a culinary master.',
					image: 'gallery_image_MasterChef',
					network: 'network_fox',
					media: 'Q7cYYVpNKXc',
					mediaTye: 'video'
				}, {
					ctaCopy: 'Watch The Latest Episodes',
					ctaURL: 'http://www.hulu.com/the-chew',
					title: 'The Chew',
					synopsis: 'Celebrating and exploring life through food, The Chew is an innovative and groundbreaking daytime program co-hosted by a dynamic group of engaging, fun, relatable experts in food, lifestyle, and entertaining.',
					image: 'gallery_image_TheChew',
					network: 'network_abc',
					media: '56icYSF1kOQ',
					mediaTye: 'video'
				}
			]
		}, {
			title: 'Meh',
			image: 'category_image_meh',
			expandedHeader: "LAUGHTER IS THE BEST MEDICINE. WE PRESCRIBE COMEDY.",
			expandedTagline: 'Limited-Time Offer – Get Hulu for $5.99/month*<br><span style="font-size: 60%">*Terms apply</span>',
			titles : [ {
					ctaCopy: 'Watch Seasons 1-3',
					ctaURL: 'http://www.hulu.com/start?show=broad-city',
					title: 'Broad City',
					synopsis: "A bottle of wine tastes just as good when you pay with all pennies. That's a fact. And no matter what the city throws at twenty-somethings Abbi and Ilana, these broads are all in. Catch the totally fresh, new series based on the acclaimed digital shorts.",
					image: 'gallery_image_BroadCity',
					network: 'network_cc',
					media: '4jkQPNdnyeM',
					mediaTye: 'video'
				}, {
					ctaCopy: 'Watch Now',
					ctaURL: 'http://www.hulu.com/watch/876140',
					title: 'Hot Tub Time Machine 2',
					synopsis: 'When Lou (Rob Corddry), who has become the "father of the Internet," is shot by an unknown assailant, Jacob (Clark Duke) and Nick (Craig Robinson) fire up the time machine again to save their friend…',
					image: 'gallery_image_HotTubeTimeMachine2',
					network: '',
					media: '6OkUy6FB1Gw',
					mediaTye: 'video'
				}, {
					ctaCopy: 'Watch Seasons 1-2',
					ctaURL: 'http://www.hulu.com/start?show=the-last-man-on-earth',
					title: "The Last Man On Earth",
					synopsis: "The year is 2020, and after a deadly virus has swept the planet, only one man is left on earth: Phil Miller (Will Forte).",
					image: 'gallery_image_LastManOnEarth',
					network: 'network_fox',
					media: 'YRXj3Ua38kk',
					mediaTye: 'video'
				}, {
					ctaCopy: 'Watch The Latest Episodes',
					ctaURL: 'http://www.hulu.com/start?show=modern-family',
					title: 'Modern Family',
					synopsis: "Today's American families come in all shapes and sizes. The cookie cutter mold of man + wife + 2.5 kids is a thing of the past, as it becomes quickly apparent in the bird's eye view of ABC's half-hour comedy, which takes an honest and often hilarious look at the composition and complexity of modern family life.",
					image: 'gallery_image_ModernFamily',
					network: 'network_abc',
					media: 'QSTT6QCx7Zs',
					mediaTye: 'video'
				}, {
					ctaCopy: 'Watch Now',
					ctaURL: 'http://www.hulu.com/son-of-zorn',
					title: "Wayne's World",
					synopsis: "From Wayne's basement, the pair broadcast a talk-show called 'Wayne's World' on local public access television. The show comes to the attention of a sleazy network executive who wants to produce a big-budget version of the show.",
					image: 'gallery_image_WaynesWorld',
					network: '',
					media: 'CaVhPXg-oTg',
					mediaTye: 'video'
				}
			]
		}, {
			title: 'Like Switzerland',
			image: 'category_image_likeswitzerland',
			expandedHeader: "YOU CAN'T STAY NEUTRAL FOREVER. TIME FOR SOME <span style='font-style: italic;'>DRAMA</span>!",
			expandedTagline: 'Limited-Time Offer – Get Hulu for $5.99/month*<br><span style="font-size: 60%">*Terms apply</span>',
			titles : [ {
					ctaCopy: 'Watch The Latest Episodes',
					ctaURL: 'http://www.hulu.com/dancing-with-the-stars',
					title: "Dancing With The Stars",
					synopsis: "ABC's Dancing with the Stars is a spectacular reality competition that focuses on the glamorous and entertaining world of competitive dance. A cast of celebrities from music, TV, film and sports partner with professional dancers and week-to-week, try to impress the judges and the audience at home in order to be the last pair standing.",
					image: 'gallery_image_DancingStars',
					network: 'network_abc',
					media: 'iOiX1xMpPEk',
					mediaTye: 'video'
				}, {
					ctaCopy: 'Watch The Latest Episodes',
					ctaURL: 'http://www.hulu.com/start?show=the-voice',
					title: 'The Voice',
					synopsis: "The two-time Emmy Award-winning \"The Voice\" returns with the strongest vocalists from across the country invited to compete in the blockbuster vocal competition show's new season. Superstar recording artists Miley Cyrus and Alicia Keys each claim a red swivel chair, alongside returning celebrity musician coaches: pop star Adam Levine and country music star Blake Shelton.",
					image: 'gallery_image_TheVoice',
					network: 'network_nbc',
					media: '4VbTHQg7RHw',
					mediaTye: 'video'
				}, {
					ctaCopy: 'Watch Season 1-11',
					ctaURL: 'http://www.hulu.com/start?show=keeping-up-with-the-kardashians',
					title: "Keeping Up With The Kardashians",
					synopsis: "Tabloid princess Kim Kardashian and her colorful blended family, led by matriarch Kris Jenner, are the subjects of this reality series that chronicles their often-chaotic domestic life together.",
					image: 'gallery_image_KeepingUpWithKardashians',
					network: 'network_e',
					media: 'kyHdoO3KRzE',
					mediaTye: 'video'
				}, {
					ctaCopy: 'Watch Seasons 1-10',
					ctaURL: 'http://www.hulu.com/the-real-housewives-of-orange-county',
					title: 'Real Housewives of OC',
					synopsis: "The Real Housewives of OC goes behind the gates for a voyeuristic look at the scandalous truths, mending friendships, rocky marriages, sizzling romances, and ever-changing loyalties inside the wealthy Southern California suburb.",
					image: 'gallery_image_RealHouseWives',
					network: 'network_bravo',
					media: 'qTBq_Kt89Jk',
					mediaTye: 'video'
				}, {
					ctaCopy: 'Watch All Episodes',
					ctaURL: 'http://www.hulu.com/the-oc',
					title: 'The OC',
					synopsis: 'In The O.C., the lives of a group of friends and families are forever changed when an outsider arrives to their affluent community of Newport Beach in Orange County, California.',
					image: 'gallery_image_TheOC',
					network: 'network_fox',
					media: 'TAXfYdW_sH0',
					mediaTye: 'video'
				}
			]
		}, {
			title: 'Frolicsome',
			image: 'category_image_frolicsome',
			expandedHeader: "KEEP THE VIBE GOING. BRING ON THE TV FEELS!",
			expandedTagline: 'Limited-Time Offer – Get Hulu for $5.99/month*<br><span style="font-size: 60%">*Terms apply</span>',
			titles : [ {
					ctaCopy: 'Watch Now',
					ctaURL: 'http://www.hulu.com/watch/961659',
					title: "Bridget Jones's Diary",
					synopsis: "A British woman is determined to improve herself while she looks for love in a year in which she keeps a personal diary.",
					image: 'gallery_image_BridgetJones',
					network: '',
					media: '1gd5vQTFTXc',
					mediaTye: 'video'
				}, {
					ctaCopy: 'Watch All Episodes',
					ctaURL: 'http://www.hulu.com/start?show=casual',
					title: 'Casual',
					synopsis: "From the Academy Award Nominated Director of \"Up in the Air\" and \"Juno\" comes Casual, a comedy series about a bachelor brother and his newly divorced sister living under one roof again.",
					image: 'gallery_image_casual',
					network: 'network_aho',
					media: 'Z6T0SmIpGtY',
					mediaTye: 'video'
				}, {
					ctaCopy: 'Watch The Series Premiere',
					ctaURL: 'http://www.hulu.com/this-is-us',
					title: "This Is Us",
					synopsis: "From the writer and director of Crazy, Stupid, Love, and starring Mandy Moore, Milo Ventimiglia and Sterling K. Brown, comes a smart, modern new dramedy that will challenge your everyday presumptions about the people you think you know.",
					image: 'gallery_image_ThisIsUs',
					network: 'network_nbc',
					media: 'HOrVHsBVHjc',
					mediaTye: 'video'
				}, {
					ctaCopy: 'Watch Now',
					ctaURL: 'http://www.hulu.com/watch/862304',
					title: 'Top Five',
					synopsis: "Infused with Chris Rock's razor-sharp comedic edge, TOP FIVE is the hilarious story of former comedy legend Andre Allen who returns to New York to promote his latest film on the eve of his wedding to a reality TV star.",
					image: 'gallery_image_TopFive',
					network: '',
					media: '1_4KMdyAui4',
					mediaTye: 'video'
				}, {
					ctaCopy: 'Watch All Episodes',
					ctaURL: 'http://www.hulu.com/start?show=the-mindy-project',
					title: 'The Mindy Project',
					synopsis: 'A single-camera comedy, starring Mindy Kaling, that follows a skilled OB/GYN navigating the tricky waters of both her personal and professional life, as she pursues her dreams of becoming the perfect woman, finding the perfect man and getting her perfect romantic comedy ending.',
					image: 'gallery_image_MindyProject',
					network: 'network_aho',
					media: 'wVX9Ky7hTdM',
					mediaTye: 'video'
				}
			]
		}, {
			title: 'FEELING PRETTY DAMN GOOOOOOD',
			image: 'category_image_fpdg',
			expandedHeader: "THINGS ARE HEATING UP. GET READY FOR SOME ACTION!",
			expandedTagline: 'Limited-Time Offer – Get Hulu for $5.99/month*<br><span style="font-size: 60%">*Terms apply</span>',
			titles : [ {
					ctaCopy: 'Watch Now',
					ctaURL: 'http://www.hulu.com/watch/966503',
					title: 'MI: Rogue Nation',
					synopsis: "With their elite organization shut down by the CIA, agent Ethan Hunt (Tom Cruise) and his team must race against time to stop The Syndicate, a deadly network of rogue operatives turned traitors.",
					image: 'gallery_image_RogueNation',
					network: '',
					media: 'E-Yx9K31Mdg',
					mediaTye: 'video'
				}, {
					ctaCopy: 'Watch Now',
					ctaURL: 'http://www.hulu.com/watch/850271',
					title: 'Hunger Games: Mockingjay Part I (LionsGate)',
					synopsis: "Katniss Everdeen, is rescued by the rebels and brought to District 13 after she shatters the games forever. Under the leadership of President Coin and Plutarch Heavensbee, Katniss spreads her wings and becomes The Mockingjay.",
					image: 'gallery_image_MockingjayPar1',
					network: '',
					media: 'senBm8yAu0s',
					mediaTye: 'video'
				}, {
					ctaCopy: 'Watch Now',
					ctaURL: 'http://www.hulu.com/watch/958003',
					title: "Terminator Genisys",
					synopsis: "In the war of man against machine, Kyle Reese is sent back to 1984 by resistance leader John Connor to protect his young mother, Sarah Connor. However, this time unexpected events have altered the past and threaten the future for all mankind.",
					image: 'gallery_image_TerminatorGenisys',
					network: '',
					media: 'OR3JpL0muQs',
					mediaTye: 'video'
				}, {
					ctaCopy: 'Watch Seasons 1-4',
					ctaURL: 'http://www.hulu.com/start?show=vikings',
					title: 'Vikings',
					synopsis: 'The name Viking is synonymous with extreme violence and terror. But few people know what it was really like to live in the world of the Viking. This scripted drama will use real characters from history to humanize the Viking and authentically re-create the Viking Age.',
					image: 'gallery_image_Vikings',
					network: 'network_history',
					media: 'Dnp5cKTsxMc',
					mediaTye: 'video'
				}, {
					ctaCopy: 'Watch The Series Premiere',
					ctaURL: 'http://www.hulu.com/lethal-weapon',
					title: 'Lethal Weapon',
					synopsis: 'Ex-Navy SEAL Martin Riggs and his partner Roger Murtaugh investigate cases with the LAPD.',
					image: 'gallery_image_LethalWeapon',
					network: 'network_fox',
					media: '13NZRU6lhDM',
					mediaTye: 'video'
				}
			]
		}, {
			title: 'Double Rainbows',
			image: 'category_image_doublerainbows',
			expandedHeader: "LET YOUR FREAK FLAG FLY WITH THESE COMEDIES.",
			expandedTagline: 'Limited-Time Offer – Get Hulu for $5.99/month*<br><span style="font-size: 60%">*Terms apply</span>',
			titles : [ {
					ctaCopy: 'Watch All Episodes',
					ctaURL: 'http://www.hulu.com/happy-endings',
					title: 'Happy Endings',
					synopsis: "Forget who gets to keep the ring when a couple splits, the real question is, who gets to keep the friends? In this modern comedy, a couple's break up will complicate all of their friends' lives and make everyone question their choices. When life throws you for a curve, hold on tight to the people you love.",
					image: 'gallery_image_HappyEndings',
					network: '',
					media: '63vpBYq-o2g',
					mediaTye: 'video'
				}, {
					ctaCopy: 'Watch All Episodes',
					ctaURL: 'http://www.hulu.com/start?show=inside-amy-schumer',
					title: 'Inside Amy Schumer',
					synopsis: "Straight-talking comic girl-next-door Amy Schumer is exposing herself -- and her messy world of dating, drinking and public debacles -- when she steps out from behind the microphone for a genre-busting comedy series.",
					image: 'gallery_image_InsideAmySchumer',
					network: 'network_cc',
					media: 'd7ucSACsP4g',
					mediaTye: 'video'
				}, {
					ctaCopy: 'Watch Seasons 1-10',
					ctaURL: 'http://www.hulu.com/start?show=its-always-sunny-in-philadelphia',
					title: "It's Always Sunny in Philadelphia",
					synopsis: "It's Always Sunny in Philadelphia features Mac, Dennis, Charlie, Sweet Dee and Frank, five ne'er-do-wells who own and operate Paddy's Pub in Philadelphia. Their constant scheming usually lands them in a world of hurt, yet they never seem to learn from their mistakes. So prepare for more depraved schemes, half-baked arguments and absurdly underhanded plots to subvert one another.",
					image: 'gallery_image_ItsAlwaysSunny',
					network: 'network_fx',
					media: 'Ho0pMqwRacQ',
					mediaTye: 'video'
				}, {
					ctaCopy: 'Watch Seasons 1-7',
					ctaURL: 'http://www.hulu.com/start?show=the-league',
					title: 'The League',
					synopsis: "FXX's ensemble comedy follows a group of old friends in a fantasy football league who care deeply about one another - so deeply that they use every opportunity to make each other's lives miserable.",
					image: 'gallery_image_TheLeague',
					network: 'network_fx',
					media: 'qqdk6Ksaf6I',
					mediaTye: 'video'
				}, {
					ctaCopy: 'Watch All Episodes',
					ctaURL: 'http://www.hulu.com/start?show=Workaholics',
					title: 'Workaholics',
					synopsis: "College is over but the party isn't. Join three best buds as they share a job, a crash pad and a promise to never let work get in the way of a good time—on this raucously original series.",
					image: 'gallery_image_Workaholics',
					network: 'network_cc',
					media: 'tOb437mXQj8',
					mediaTye: 'video'
				}
			]
		}
	];
	this.headlineCopy = "RIGHT NOW I'M FEELING:";
	this.leftCopy = this.categories[0].title;
	this.rightCopy = this.categories[this.categories.length - 1].title;





	function getParameterByName(name, url) {
	    if (!url) url = window.location.href;
	    name = name.replace(/[\[\]]/g, "\\$&");
	    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	        results = regex.exec(url);
	    if (!results) return null;
	    if (!results[2]) return '';
	    return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

}














/* -- COMMON: EdgeData.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var EdgeData = ( function( arg ) {

	var self = this;
	arg = arg || {};
	self.getMaskCssFor = function( instanceId ) {
		return '-webkit-clip-path: ' + self.convertMaskShapeToMaskCss( self.getMaskShapeBy( instanceId ).update() );
	}
	self.getMaskShapeBy = function( instanceId ) {
		for( var key in maskShapes ) {
			if( key == instanceId )
				return maskShapes[key];
		}
	}
	self.convertMaskShapeToMaskCss = function( maskPoints ) {
		var maskCss = 'polygon( '
		for( var i=0; i < maskPoints.length; i++ ) {
			maskCss += String( maskPoints[i][0] ) + 'px ' + String( maskPoints[i][1] ) + 'px, '
		}
		return maskCss.slice( 0, maskCss.length-2 ) + ' )'		
	}
	
});



















/* -- COMMON IMPLEMENTED: Expandable.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var Expandable = new function(){
	var E = this;

	var _afterInitExpanded = true;
	var _expandStart;
	var	_expandComplete;
	var _collapseStart;
	var _collapseComplete;
	E.userHasInteracted = false;
	E.init = function( arg ){

		arg = arg || {};
		_expandStart = arg.expandStart || function(){}
		_expandComplete = arg.expandComplete || function(){}
		_collapseStart = arg.collapseStart || function(){}
		_collapseComplete = arg.collapseComplete || function(){}
		Enabler.addEventListener ( studio.events.StudioEvent.EXPAND_START, handleExpandStart );
		Enabler.addEventListener ( studio.events.StudioEvent.EXPAND_FINISH, handleExpandComplete );
		Enabler.addEventListener ( studio.events.StudioEvent.COLLAPSE_START, handleCollapseStart );
		Enabler.addEventListener ( studio.events.StudioEvent.COLLAPSE_FINISH, handleCollapseComplete );

		if ( adParams.expandable.expanded ){
			_afterInitExpanded = false;
			Enabler.setStartExpanded(true);

			E.expand();
		} 
	}

	E.collapse = function( gestureEvent ) {
		if ( gestureEvent ){
			gestureEvent.stopPropagation();
		}
		Enabler.requestCollapse();
		if( gestureEvent )
			Enabler.reportManualClose();
	}
	
	E.expand = function( gestureEvent ){
		if ( gestureEvent ){
			gestureEvent.stopPropagation();
		}
		Enabler.requestExpand();
	}

	E.collapseComplete = function(){
		Enabler.finishCollapse();
	}

	E.expandComplete = function(){	
		Enabler.finishExpand();
	}
	function handleExpandStart ( event ){
		_expandStart.call();
	}

	function handleExpandComplete ( event ){
		_expandComplete.call();
		E.userHasInteracted = _afterInitExpanded;
		_afterInitExpanded = true;
	}

	function handleCollapseStart(event){
		_collapseStart.call();
		E.userHasInteracted = true;
	}

	function handleCollapseComplete ( event ){
		_collapseComplete.call();
		E.userHasInteracted = true;
	}

}









/* -- COMMON IMPLEMENTED: CtaBTN.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var CtaBTN = ( function() {

	var self = this;
	self.container;
	self.callback;

	self.arrow;
	self.isOver = false;
	self.maxOverTime = 1;
	self.arrowX;

	self.build = function ( args ) {
		var target = args.target || adData.elements.redAdContainer;
		var fontSize = args.fontSize || 18;
		var lineHeight = args.lineHeight || fontSize;
		var width = self.width = args.width || self.width;
		var height = self.height = args.height || self.height;
		var top = args.top || 0;
		var left = args.left || 0;
		var margin = args.margin || 0;
		var multiline = args.multiline || true;
		self.callback = args.callback || nocallback;

		self.container = new UIButton({
			id: 'cta',
			target: target,
			css: {
				width: width,
				height: height,
				top: top,
				left: left,
				position: 'absolute',
			},
			onClick: onHitClick,
			onOver: self.onHitRollOver,
			onOut: self.onHitRollOut
		});



		var copyTF = new UITextField({
			id: 'cta_text',
			target: self.container,
			css : {
				width : width + 20,
				height : height,
				color : adData.whiteColor,
			},
			fontSize : fontSize,
			fontFamily : adData.font_bold,
			format : TextFormat.INLINE_CLAMP,
			alignText : Align.LEFT,
			bufferText : margin,
			text : adData.ctaCopy
		});

		Clamp.set( copyTF, Clamp.X );

		self.arrow = new UITextField({
			id: 'cta_arrow',
			target: self.container,
			css : {
				width : width,
				height : height,
				color : adData.huluColors.primaryGreen,
			},
			fontSize : copyTF.fontSize,
			fontFamily : adData.font_bold,
			format : TextFormat.INLINE_CLAMP,
			alignText : Align.LEFT,
			bufferText : margin,
			text : adData.trianglesMap[1],
			align : {
				x: {
					type: Align.LEFT,
					against: copyTF,
					outer: true,
					offset: 4
				}
			}
		});

		self.arrowX = self.arrow.x;

		Gesture.disableChildren( self.container );

		Align.set( self.container, {
			x: {
				type: Align.RIGHT,
				offset: -20
			},
			y: {
				type: Align.BOTTOM,
				offset: -28
			}
		});

		self.show();
	}


	self.show = function () {
		registerEvents();
	}

	self.hide = function() {
	}


	self.onHitRollOver = function(event) {
		if (!self.isOver) {
			self.isOver = true;
			TweenLite.killDelayedCallsTo( self.onHitRollOut );
			TweenLite.delayedCall( self.maxOverTime, self.onHitRollOut );
		}
		var animationTime = 0.25;
		var easeFunc = Quad.easeInOut;
		TweenLite.to( self.arrow, animationTime, { x: self.arrowX + 3, color: adData.whiteColor, ease:easeFunc, onComplete: function() {
			TweenLite.to( self.arrow, animationTime, { x: self.arrowX, color: adData.huluColors.primaryGreen, ease:easeFunc, onComplete: function() {
				if (self.isOver)
					self.onHitRollOver();
			} })
		} } );
	}

	self.onHitRollOut = function(event) {
		TweenLite.killDelayedCallsTo( self.onHitRollOut );
		self.isOver = false;
	}

	function onHitClick(event) {
		self.callback();
	}

	self.unregisterEvents = function() {
		self.container.enabled = false;
	}

	function registerEvents() {
		self.container.enabled = true;
	}

	function nocallback() {

	}


	return self;
});









/* -- COMMON IMPLEMENTED: Expanded.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var Expanded = ( function() {

	var self = this;
	self.container;
	self.headlineTF;
	self.taglineTF;
	self.showing = false;
	self.fontSize_header = 27;//31;
	self.fontSize_tagline = 24;


	self.build = function ( args ) {
		trace('Expanded.build()');
		var target = args.target || adData.elements.redAdContainer;
		var width = args.width || 580;
		var height = args.height || 50;
		var top = args.top || 0;

		self.container = new UIComponent({
			id: 'expanded',
			target: target,
			css: {
				width: width,
				height: height,
				top: top
			}
		});


		var dropShadowDiv = new UIDiv({
			id: 'expandedShadow',
			target: self.container,
			css: {
				width: adParams.adWidth,
				height: 30,
				top: -30,
				backgroundColor: adData.greyColor
			}
		})

		Effects.dropShadow ( {
		    target: dropShadowDiv,
		    angle: 90,
		    distance: 3,
		    size: 27,
		    spread: 3,
		    color: '#000000',
		    alpha: 0.5,
		});


		trace('		adData.curCategory():' + adData.curCategory());
		self.headlineTF = new UITextField ({
			id: 'txt-expanded-headline',
			target: self.container,
			css : {
				width : width,
				height : 32,
				color : '#555555',
				top: 37 //267
			},
			fontSize : self.fontSize_header,
			fontFamily : adData.font_boldItalic_allCaps,
			format : TextFormat.INLINE,
			alignText : Align.CENTER,
			bufferText : {
				left : 10,
				right : 10
			},
			spacing : 2.5,
			text : adData.curCategory().expandedHeader.toUpperCase()
		});


		self.taglineTF = new UITextField ({
			id: 'txt-expanded-tagline',
			target: self.container,
			css : {
				width : width,
				height : 26,
				color : adData.huluColors.primaryGreen,
				top: 80 //310
			},
			fontSize : 24,
			fontFamily : adData.font_bookItalic,
			format : TextFormat.PARAGRAPH,
			alignText : Align.CENTER,
			leading : 0.8,
			bufferText : {
				left : 20,
				right : 20
			},
			spacing : 0.1,
			text : adData.curCategory().expandedTagline
		});


		var exitBTN = new UIButton({
			id: 'expanded_exitBTN',
			target: self.container,
			css: {
				width: width,
				height: height,
			},
			onClick: onExitClick
		});


		adData.elements.gallery = new Gallery();
		adData.elements.gallery.build({
			target: self.container,
			width: width,
			height: 136
		});




		adData.elements.showOverlay = new ShowOverlay();
		adData.elements.showOverlay.build({
			target: self.container
		});



		self.container.hide();
	}

	self.show = function() {
		trace('Expanded.show()');
		if (!self.showing) {
			var animationTime = 0.5;
			var xOffset = -40;
			var delay = 0;
			var easeFunc = Quad.easeOut;
			self.showing = true;

			self.container.show();
			self.switchCategory();
			Track3rdParty.pixel ( 'https://googleads.g.doubleclick.net/pagead/viewthroughconversion/963244507/?value=1.00&currency_code=USD&label=TtBKCKDklGoQ2-OnywM&guid=ON&script=0' );
		}
	}

	self.hide = function() {
		if (self.showing) {
			self.showing = false;
			self.container.hide();
		}
	}


	self.switchCategory = function() {
		trace('Expanded.switchCategory()');
		var moveBy = 10;
		var animationTime = 0.5;
		trace('\t self.showing:' + self.showing);
		if ( self.showing ) {
			adData.elements.gallery.switchCategory();



			if ( self.headlineTF.text != adData.curCategory().expandedHeader.toUpperCase() ) {
				TweenLite.to( self.headlineTF, animationTime, { x: adData.categoryDirectionFrom == 'right' ? -moveBy : moveBy, opacity: 0, ease: Expo.easeIn, onComplete: function() {
					self.headlineTF.text = adData.curCategory().expandedHeader.toUpperCase();
					TweenLite.fromTo( self.headlineTF, animationTime, { x: adData.categoryDirectionFrom == 'left' ? -moveBy : moveBy }, { x: 0, opacity: 1, ease: Expo.easeOut });
				} });

				var delay = 0.1;
				TweenLite.to( self.taglineTF, animationTime, { delay: delay, x: adData.categoryDirectionFrom == 'right' ? -moveBy : moveBy, opacity: 0, ease: Expo.easeIn, onComplete: function() {
					self.taglineTF.text = adData.curCategory().expandedTagline;
					TweenLite.fromTo( self.taglineTF, animationTime, { x: adData.categoryDirectionFrom == 'left' ? -moveBy : moveBy }, { x: 0, opacity: 1, ease: Expo.easeOut });
				} });
			
			}
		}
	}


	function onExitClick() {
		Control.networkExit( expandedExit );
	}


	function nocallback() {

	}


	return self;
});









/* -- COMMON IMPLEMENTED: Intro.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var Intro = ( function() {

	var self = this;
	self.container;
	self.copyTF;

	self.callback;
	self.pauseBeforeHiding = 2;
	self.showing = false;


	self.build = function ( args ) {
		var target = args.target || adData.elements.redAdContainer;
		var fontSize = args.fontSize || 38;
		var lineHeight = args.lineHeight || fontSize;
		var width = args.width || 580;
		var height = args.height || 50;
		var margin = args.margin || 0;
		var multiline = args.multiline || false;
		self.callback = args.callback || nocallback;

		self.container = new UIComponent({
			id: 'intro',
			target: target,
			css: {
				width: adParams.expandable.collapsedWidth,
				height: adParams.expandable.collapsedHeight,
				position: 'absolute',
				backgroundColor: adData.greyColor
			}
		});
		Gesture.disable( self.container );


		self.copyTF = new UITextField ({
			id: 'intro-copy',
			target: self.container,
			css : {
				width : adParams.expandable.collapsedWidth,//width,
				height : height,
				color : adData.huluColors.primaryGreen,
				display : 'inline'
			},
			fontSize : fontSize,
			fontFamily : adData.font_boldItalic_allCaps,
			format : TextFormat.INLINE_FIT,
			alignText : Align.CENTER,
			bufferText : margin,
			text : adData.introCopy
		});
		Align.set( self.copyTF, Align.CENTER );
		self.container.hide();
	}

	self.show = function(args) {
		if (!self.showing) {
			var animationTime = args.animationTime || 0.5;
			var xOffset = args.xOffset || -40;
			var delay = args.delay || 0;
			var easeFunc = args.easeFunc || Quad.easeOut;
			self.showing = true;
			self.container.show();
			TweenLite.fromTo( self.copyTF, animationTime, { x: xOffset, opacity: 0 }, { delay: delay, x: 0, opacity: 1, ease:easeFunc, onComplete: function() {
				TweenLite.delayedCall( self.pauseBeforeHiding, self.hide );
			} });
		}
	}

	self.hide = function( skipAnimation ) {
		trace( 'Intro.hide()' );
		trace('\t skipAnimation:' + skipAnimation);
		TweenLite.killDelayedCallsTo( self.hide );
		if (self.showing) {
			self.showing = false;
			if ( skipAnimation ) {
				TweenLite.set( self.container, { height: 230 } );
				self.container.hide();
			}
			else {
				TweenLite.to( self.container, 0.5, { height: 230, ease: Quad.easeIn, onComplete: function() {
					self.callback();
					TweenLite.to( self.container, 0.5, { opacity: 0, ease:Quad.easeInOut })
				} });
				TweenLite.to( self.copyTF, 0.5, { x: 40, ease: Quad.easeIn, onComplete: function() {
					self.container.hide();
				} });
			}
		}
	}


	function nocallback() {

	}


	return self;
});









/* -- COMMON IMPLEMENTED: MoodSlider.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var MoodSlider = ( function() {

	var self = this;
	self.container;
	self.categoryTF;
	self.curImage;

	self.switchCategoryCallback;
	self.callback;
	self.images;
	self.pauseBeforeHiding = 2;
	self.showing = false;
	self.sliderTicks;
	self.animatingIntro = true;
	self.curCategoryNum = 0;
	self.percentOffset = 0.1;	// -- compensate for tick mark width

	self.sliderPercPerCategory;


	self.build = function ( args ) {
		var target = args.target || adData.elements.redAdContainer;
		var width = args.width || adParams.expandable.collapsedWidth;
		var height = args.height || adParams.expandable.collapsedHeight;
		self.switchCategoryCallback = args.switchCategoryCallback || nocallback;
		self.callback = args.callback || nocallback;

		self.container = new UIComponent({
			id: 'mood_slider',
			target: target,
			css: {
				width: width,
				height: height,
				position: 'absolute'
			}
		});


		adData.elements.imagesContainer = new UIComponent({
			id: 'mood_slider_images',
			target: self.container,
			css: {
				width: width,
				height: adParams.expandable.collapsedImageHeight,
				backgroundColor: adData.greyColor
			}
		});

		Effects.dropShadow ( {
		    target:adData.elements.imagesContainer,
		    angle: 90,
		    distance: 3,
		    size: 27,
		    spread: 3,
		    color: '#000000',
		    alpha: 0.5,
		});


		var categoryImage;
		var categoryImageData;
		self.images = [];
		var i;
		for ( i = 0; i < adData.categories.length; i++) {
			categoryImageData = adData.categories[i];
			categoryImage = new UIImage({
				id: 'mood_slider_image_' + i,
				target: adData.elements.imagesContainer,
				source: categoryImageData.image,
				css: {
					opacity: i > 0 ? 0 : 1,
					display: i > 0 ? 'none' : 'inherit'
				}
			});
			self.images.push( categoryImage );
		}

		self.curImage = self.images[0];






		var headlineTF = new UITextField({
			id: 'txt-headline',
			target: self.container,
			css : {
				top : 46,
				width : adParams.expandable.collapsedWidth,
				height : 28,
				color : adData.whiteColor
			},
			fontSize : 24,
			fontFamily : adData.font_boldItalic_allCaps,
			format : TextFormat.INLINE_FIT,
			spacing: 2,
			alignText : Align.CENTER,
			text: adData.headlineCopy.toUpperCase()
		});



		self.categoryTF = new UITextField({
			id: 'txt-category',
			target: self.container,
			css : {
				top : 87,
				width : adParams.expandable.collapsedWidth,
				height : 32,
				color : adData.huluColors.primaryGreen
			},
			fontSize : 30,
			fontFamily : adData.font_bookItalic,
			format : TextFormat.INLINE,
			alignText : Align.CENTER,
			text: adData.categories[0].title.toUpperCase()
		});








		var exitBTN = new UIButton({
			id: 'collapsed_exitBTN',
			target: self.container,
			css: {
				width: width,
				height: height,
			},
			onClick: onExitClick
		});
		var sliderImgData = {
			width: 498,
			height: 7
		}
		var handleSize = 12;

		adData.elements.slider = new UISlider({
			id: 'slider',
			target: self.container,
			css: {
				top: 131,
				width: sliderImgData.width,
				height: sliderImgData.height * 3
			},
			align: {
				x: Align.CENTER
			},
			bg: {
				backgroundColor: 'transparent'
			},
			track: {
				opacity: 0,
			},
			handle : {
				width: handleSize,
				backgroundColor: 'transparent'
			},
			onUpdate: onUpdate
		});

		var sliderBG = new UIImage({
			id: 'slider_bg',
			target: adData.elements.slider.bg,
			source: 'slider',
			css: {
				width: 498,
				height: 7,
				opacity: 0.2
			},
			align: {
				y: Align.CENTER
			}
		})

		var tickImageData = ImageManager.get( 'slider_tick' );
		self.sliderTicks = [];
		self.percentOffset = ( tickImageData.width / sliderImgData.width ) / 2;
		var sliderTickLeft = (sliderImgData.width - tickImageData.width) / (adData.categories.length - 1);
		self.sliderPercPerCategory = sliderTickLeft / sliderImgData.width;
		for ( i = 0; i < adData.categories.length; i++ ) {
			self.sliderTicks.push( {
					view: new UIImage({
						id: 'slider_tick_' + ( i + 1 ),
						target: sliderBG,
						source: 'slider_tick',
						css: {
							left: sliderTickLeft * i,
							opacity: 0.6
						}
					}),
					percent: (sliderTickLeft * i) / sliderImgData.width
				}
			);
		}


		adData.elements.moodSliderHandleBTN = new MoodSliderHandleBTN();
		adData.elements.moodSliderHandleBTN.build({
			target: adData.elements.slider.handle
		});










		var wordHeight = 16;
		var xOffset = 22;
		var leftWord = new UITextField({
			id: 'txt-slider-leftWord',
			target: self.container,
			css : {
				top : Styles.getCss( adData.elements.slider, 'top' ) + (( adData.elements.slider.height - wordHeight ) / 2),
				width : 200,
				height : wordHeight,
				color : adData.whiteColor
			},
			fontSize : 14,
			fontFamily : adData.font_bookItalic,
			format : TextFormat.INLINE_FIT,
			alignText : Align.RIGHT,
			align: {
				x: {
					type: Align.RIGHT,
					against: adData.elements.slider,
					offset: -xOffset,
					outer: true
				}/*,
				y: {
					type: Align.BOTTOM,
					against: adData.elements.slider,
					outer: true
				}*/
			},
			text : adData.categories[0].title
		});
		Gesture.disable( leftWord );


		var rightWord = new UITextField({
			id: 'txt-slider-rightWord',
			target: self.container,
			css : {
				top : Styles.getCss( adData.elements.slider, 'top' ) + (( adData.elements.slider.height - wordHeight ) / 2),
				width : 200,
				height : wordHeight,
				color : adData.whiteColor
			},
			fontSize : 14,
			fontFamily : adData.font_bookItalic,
			format : TextFormat.INLINE_FIT,
			alignText : Align.LEFT,
			align: {
				x: {
					type: Align.LEFT,
					against: adData.elements.slider,
					offset: xOffset,
					outer: true
				}/*,
				y: {
					type: Align.BOTTOM,
					against: adData.elements.slider,
					outer: true
				}*/
			},
			text : adData.categories[ adData.categories.length - 1 ].title
		});
		Gesture.disable( rightWord );













		adData.elements.btnExpand = new ExpandBTN();
		adData.elements.btnExpand.build({
			target: self.container,
			fontSize: 12,
			copy: adData.expandCopy,
			callback: onExpandClick
		});


		Gesture.addEventListener( adData.elements.slider, GestureEvent.DRAG_START, onStartDrag );
		Gesture.addEventListener( adData.elements.slider, GestureEvent.DRAG_STOP, onStopDrag );
		Gesture.addEventListener( adData.elements.slider, GestureEvent.DOWN, onDown );
		Gesture.addEventListener( adData.elements.slider, GestureEvent.UP, toExpand );
		Gesture.addEventListener( adData.elements.slider, GestureEvent.OVER, adData.elements.moodSliderHandleBTN.onHitRollOver );
		Gesture.addEventListener( adData.elements.slider, GestureEvent.OUT, adData.elements.moodSliderHandleBTN.onHitRollOut );
	}

	function onExpandClick() {
		toExpand();
	}

	function toExpand() {
		TweenLite.killTweensOf( adData.elements.slider );
		onUp();
		self.animatingIntro = false;
		adData.elements.btnExpand.hide();
		self.callback();
	}

	function onUp() {
		adData.elements.moodSliderHandleBTN.onHitRelease();
		var curPerc = self.animatingIntro ? adData.elements.slider.percent : adData.elements.slider.destPercent;
		var i;
		for ( i = 0; i < self.sliderTicks.length; i++ ) {
			if ( Math.abs( curPerc - self.sliderTicks[ i ].percent ) < Math.abs( curPerc - self.sliderTicks[ self.curCategoryNum ].percent ) )
				self.curCategoryNum = i;
		}
		if ( adData.curCategoryNum != self.curCategoryNum )
			switchCategory( self.curCategoryNum );
		adData.elements.slider.goToPercent = self.sliderTicks[ self.curCategoryNum ].percent + self.percentOffset;
		onUpdate();

		self.switchCategoryCallback();
	}


	function onDown() {
		if ( self.animatingIntro )
			TweenLite.killTweensOf( adData.elements.slider );
		self.animatingIntro = false;
		adData.elements.moodSliderHandleBTN.onHitPress();
	}

	function onStartDrag() {
		self.animatingIntro = false;
		
	}

	function onStopDrag() {
		adData.elements.moodSliderHandleBTN.onHitRelease();
	}

	function onUpdate() {
		var curPerc = self.animatingIntro ? adData.elements.slider.percent : adData.elements.slider.destPercent;
		var i;
		for ( i = 0; i < self.sliderTicks.length; i++ ) {
			if ( Math.abs( curPerc - self.sliderTicks[i].percent ) < Math.abs( curPerc - self.sliderTicks[self.curCategoryNum].percent ) )
				self.curCategoryNum = i;
		}
		var filledCategory = self.sliderPercPerCategory - ((self.curCategoryNum * self.sliderPercPerCategory) - curPerc);
		var percentForTheCategory = filledCategory / self.sliderPercPerCategory;
		var destX =  ((self.curImage.width - adData.elements.imagesContainer.width) / 2) + (percentForTheCategory * (adData.elements.imagesContainer.width - self.curImage.width));
		var startX = 0;
		if ( adData.curCategoryNum != self.curCategoryNum ) {
			if ( adData.curCategoryNum > self.curCategoryNum )
				startX = adData.elements.imagesContainer.width - self.curImage.width
			switchCategory( self.curCategoryNum );
			TweenLite.fromTo( self.curImage, 0.2, { x: startX }, { x: destX, ease: Quad.easeOut });
		}
		else {
			TweenLite.to( self.curImage, 0.2, { x: destX, ease: Quad.easeOut });
		}
	}


	function switchCategory( curCategoryNum ) {
		var animationTime = 0.5;
		var easeFunc = Quad.easeOut;

		adData.updateCategory( curCategoryNum );
		self.categoryTF.text = adData.curCategory().title.toUpperCase();
		TweenLite.fromTo( self.categoryTF, 0.25, { x: adData.categoryDirectionFrom == 'left' ? -20 : 20, color: adData.whiteColor }, { x: 0, color: adData.huluColors.primaryGreen, ease: Quad.easeOut });
		if ( adData.elements.slider.dragging )
			adData.elements.moodSliderHandleBTN.onHitPress();
		else
			adData.elements.moodSliderHandleBTN.pulse();

		adData.elements.btnExpand.pulse();
		TweenLite.to( self.curImage, animationTime, { opacity: 0, ease: easeFunc, onComplete: self.curImage.hide } );
		self.curImage = self.images[adData.curCategoryNum];
		self.curImage.show();
		TweenLite.fromTo( self.curImage, animationTime, { opacity: 0 }, { opacity: 1, ease: easeFunc } );
	}


	self.show = function( skipAnimation ) {
		if (!self.showing) {
			var animationTime = skipAnimation ? 0 : 0.5;
			var xOffset = -40;
			var delay = 0;
			var easeFunc = Quad.easeOut;
			self.showing = true;
			TweenLite.fromTo( adData.elements.imagesContainer, animationTime, { x: xOffset }, { delay: delay, x: 0, ease:easeFunc, onComplete: function() {
				TweenLite.delayedCall( self.pauseBeforeHiding, self.hide );
				
			} });

			delay += 0.2;
			adData.elements.btnExpand.container.x = adData.elements.btnExpand.x + xOffset;
			TweenLite.delayedCall( delay, function() {
				adData.elements.btnExpand.show();
				var destX = adData.elements.slider.width - Styles.getCss( adData.elements.slider.handle, 'width' );
				if ( !skipAnimation ) {
					self.introAnimationTime = 0.35;
					self.introAnimationPause = (10 - (self.introAnimationTime * (self.sliderTicks.length - 1))) / (self.sliderTicks.length - 1);	// total time minus animation time divided by animations
					self.introAnimationSteps = self.sliderTicks.length - 1;
					introAnimateNext();
				}
			});
		}
	}

	function introAnimateNext() {
		if ( self.introAnimationSteps < 1 ) {
			adData.elements.slider.destPercent = adData.elements.slider.percent;
			self.animatingIntro = false;
			adData.elements.moodSliderHandleBTN.pulse( true );
		}
		else if ( self.animatingIntro ) {
			TweenLite.to( adData.elements.slider, self.introAnimationTime, { delay: self.introAnimationPause, percent: self.sliderTicks[self.sliderTicks.length - self.introAnimationSteps].percent + self.percentOffset, onUpdate: onUpdate, ease: Quad.easeInOut, onComplete: introAnimateNext } );
			self.introAnimationSteps--;
		}
	}

	self.hide = function() {
	}


	function onExitClick() {
		Control.networkExit( adData.elements.expanded.showing ? expandedExit : collapsedExit );
	}


	function nocallback() {

	}


	return self;
});









/* -- COMMON IMPLEMENTED: Gallery.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var Gallery = ( function() {

	var self = this;
	self.container;
	self.buttons;
	self.preloaderImage;

	self.callback;
	self.curCategory;
	self.curShow;
	self.fullLoadingList;
	self.curLoadingList;

	self.loaded = false;
	self.isLoading = false;


	self.build = function ( args ) {
		trace('GalleryBTN.build()');
		var target = args.target || adData.elements.redAdContainer;
		var width = args.width || 580;
		var height = args.height || 50;
		self.callback = args.callback || nocallback;

		self.container = new UIComponent({
			id: 'gallery',
			target: target,
			css: {
				width: width,
				height: height,
				opacity: adData.guide ? 0.2 : 1
			},
			align: {
				y: Align.BOTTOM
			}
		});
		Gesture.disable( self.container );



		self.buttons = [];
		var i;
		var titles = adData.curCategory().titles;
		var galleryData;
		var galleryBTN;
		for ( i = 0; i < titles.length; i++ ) {
			galleryBTN = new GalleryBTN();
			galleryBTN.build({
				id: i,
				target: self.container,
				width: 192,
				height: 135,
				spacer: 2,
				callback: galleryClicked
			});
			self.buttons.push( galleryBTN );
		}


		self.preloaderImage = new UIImage({
			id: 'gallery_preloader',
			target: self.container,
			source: 'preloader_black',
			align: Align.CENTER,
			css: {
				opacity: 0,
				display: 'hidden'
			}
		});


		self.fullLoadingList = [];

		self.container.hide();
	}

	self.show = function() {
		trace('Gallery.show()');
		trace('\t self.showing:' + self.showing);
		if ( self.showing )
			self.switchCategory();
		else {
			self.container.show();
			var animationTime = 0.5;
			var xOffset = -40;
			var delay = 0;
			var easeFunc = Quad.easeOut;
			self.showing = true;

			self.container.show();
			var i;
			if ( adData.categoryDirectionFrom == 'left' ) {
				for ( i = 0; i < self.buttons.length; i++ )
					self.buttons[i].show( 0.1 * ( (self.buttons.length - 1) - i ));
			}
			else {
				for ( i = 0; i < self.buttons.length; i++ )
					self.buttons[i].show( 0.1 * i );
			}
		}
	}

	self.hide = function() {
		trace('Gallery.hide()');
		if (self.showing) {
			self.showing = false;
			self.callback();
		}
	}


	self.switchCategory = function() {
		trace('Gallery.switchCategory()');
		trace('\t self.showing:' + self.showing);
		if ( self.curCategory != adData.curCategoryNum ) {
			self.curCategory = adData.curCategoryNum;
			var loadDelay = 0.1;
			if ( self.showing ) {
				loadDelay = 1;		// -- makes sure all images/buttons have hidden before triggering load
				self.showing = false;
				var i;
				if ( adData.categoryDirectionFrom == 'left' ) {
					for ( i = 0; i < self.buttons.length; i++ )
						self.buttons[i].hide( 0.1 * ( (self.buttons.length - 1) - i ));
				}
				else {
					for ( i = 0; i < self.buttons.length; i++ )
						self.buttons[i].hide( 0.1 * i );
				}
			}

			adData.elements.gallery.galleryUnClick();
			if ( self.loaded )
				TweenLite.delayedCall( (i * 0.1) + 0.25, self.show );		// -- wait for all buttons to have animated out before switching content and animating back in
			else if ( !self.isLoading )
				TweenLite.delayedCall( loadDelay, loadNewGallery );
		}
	}

	function galleryClicked( curShow ) {
		if ( self.curShow )
			self.curShow.resetState();


		for ( i = 0; i < self.buttons.length; i++ )
			self.buttons[i].unregisterEvents();
		self.curShow = curShow;
		adData.elements.showOverlay.show( curShow.id );
	}

	self.galleryUnClick = function() {
		if ( self.curShow )
			self.curShow.resetState();

		for ( i = 0; i < self.buttons.length; i++ )
			self.buttons[i].registerEvents();
		self.curShow = null;
		adData.elements.showOverlay.hide();
	}

	self.onNext = function() {
		var newIndex = self.buttons.indexOf( self.curShow ) + 1;
		newIndex = newIndex >= self.buttons.length ? 0 : newIndex;
		var newShow = self.buttons[ newIndex ];
		newShow.onHitClick();
	}

	self.onPrev = function() {
		var newIndex = self.buttons.indexOf( self.curShow ) - 1;
		newIndex = newIndex < 0 ? self.buttons.length - 1 : newIndex;
		var newShow = self.buttons[ newIndex ];
		newShow.onHitClick();
	}

	function loadNewGallery() {
		trace('Gallery.loadNewGallery()');
		self.preloaderImage.show();
		TweenLite.fromTo( self.preloaderImage, 0.25, { opacity: 0 }, { opacity: 1, ease: Quad.easeInOut });
		self.curLoadingList = [];
		var imageID;
		var i;
		var j;
		for ( j = 0; j < adData.categories.length; j++ ) {
			for ( i = 0; i < adData.categories[ j ].titles.length; i++ ) {
				imageID = adData.categories[ j ].titles[ i ].image;
				if ( self.fullLoadingList.indexOf( imageID ) < 0 ) {
					self.curLoadingList.push( imageID + '.jpg' );
					self.fullLoadingList.push( imageID );
				}
			}
		}
		trace('		self.curLoadingList:' + self.curLoadingList);
		var galleryLoader = new Loader( self.curLoadingList, { name: 'gallerySubLoader', prepend: adParams.dynamicImagesPath } );
		ImageManager.addLoader( galleryLoader );
		self.isLoading = true;
		ImageManager.load( onLoadComplete );
	}

	function onLoadComplete( event ) {
		trace('Gallery.onLoadComplete');
			self.isLoading = false;
			self.loaded = true;
			TweenLite.to( self.preloaderImage, 0.25, { opacity: 0, ease: Quad.easeInOut, onComplete: self.preloaderImage.hide });

			self.show();
	}


	function nocallback() {

	}


	return self;
});









/* -- COMMON IMPLEMENTED: ShowOverlay.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var ShowOverlay = ( function() {

	var self = this;
	self.container;
	self.ctaBTN;
	self.header;
	self.synopsis;
	self.network;
	self.hero;
	self.navNextBTN;
	self.navPrevBTN;

	self.callback;
	self.showing = false;
	self.height;
	self.showNum;
	self.contentStartHeight = 222;

	self.networkY;
	self.synopsisY;
	self.headerY;
	self.ctaY;

	self.fontSize_header = 24;


	self.build = function ( args ) {
		trace('ShowOverlay.build()');
		var target = args.target || adData.elements.redAdContainer;
		var contentWidth = 400;
		var width = args.width || adParams.adWidth;
		var height = self.height = args.height || adParams.adHeight - adParams.expandable.collapsedImageHeight;
		var top = args.top || 0;
		self.callback = args.callback || nocallback;

		self.container = new UIComponent({
			id: 'showOverlay',
			target: target,
			css: {
				width: width,
				height: height,
				top: top,
				opacity: adData.guide ? 0.2 : 1
			}
		});


		var bg = new UIButton({
			id: 'showOverlay_bg',
			target: self.container,
			css: {
				width: width,
				height: height,
				backgroundColor: '#000000',
				opacity: 0.8
			},
			onClick: onCtaClick
		});


		self.content = new UIComponent({
			id: 'showOverlay_content',
			target: self.container,
			css: {
				width: contentWidth,
				height: self.contentStartHeight,
				left: 33
			}
		});
		Gesture.disable( self.content );


		self.ctaBTN = new ShowOverlayCtaBTN();
		self.ctaBTN.build({
			target: self.content,
			width: contentWidth,
			height: 18,
			fontSize: 14,
			callback: onCtaClick
		});


		self.header = new UITextField ({
			id : 'showOverlay-txt-header',
			target : self.content,
			css : {
				width : contentWidth,
				height : 26,
				color : adData.whiteColor,
			},
			fontSize : 24,
			fontFamily : adData.font_bold,
			format : TextFormat.PARAGRAPH,
			alignText : Align.LEFT,
			align: {
				y: {
					type: Align.BOTTOM,
					against: self.ctaBTN.container,
					offset: 10,
					outer: true
				}
			},
			text : adData.getShowData( adData.curCategoryNum ).title
		});

		Clamp.set( self.header, Clamp.Y );

		self.synopsis = new UITextField ({
			id : 'showOverlay-txt-synopsis',
			target : self.content,
			css : {
				width : contentWidth,
				height : 90,
				color : adData.whiteColor,
			},
			fontSize : 16,
			fontFamily : adData.font_book,
			format : TextFormat.PARAGRAPH_CLAMP,
			alignText : Align.LEFT,
			align: {
				y: {
					type: Align.BOTTOM,
					against: self.header,
					offset: 15,
					outer: true
				}
			},
			text : adData.getShowData( adData.curCategoryNum ).synopsis
		});

		self.network = new UIComponent({
			id: 'showOverlay_network',
			target: self.content,
			css: {
				opacity: 0.6
			}
		});


		Clamp.set( self.content, Clamp.Y );
		Align.set( self.content, {
			y: {
				type: Align.BOTTOM,
				offset: -34
			}
		} );




		adData.elements.videoPlayer = new YouTubePlayer({
			id: 'showOverlay_videoPlayer',
			target: self.container,
			css : {
				width : 480,
				height : 270
			},
			autoPlay: false,
			muted: false,
			quality: 'hd720',
			showInfo: false,
			inlineYouTubeLogo: true,
			allowFullScreen: false,
			allowAnnotations: true,

			onReady: null,
			onComplete : null,
			onPlay: null,
			onPause: null,
			onBuffer: null,
			onFail: null,

			controls: true
		});

		Align.set( adData.elements.videoPlayer.container, {
			x: Align.RIGHT,
			y: Align.BOTTOM
		});


		var gradientData = ImageManager.get( 'showOverlay_image_gradient' );
		self.hero = new UIComponent({
			id: 'showOverlay_hero',
			target: self.container,
			css: {
				width: gradientData.width,
				height: gradientData.height,
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover'
			},
			align: {
				x: Align.RIGHT,
				y: Align.BOTTOM
			}
		});

		var imageInnerShadow = new UIImage({
			id: 'showOverlay_hero_shadow',
			target: self.hero,
			source: 'showOverlay_image_gradient'
		});

		Gesture.disable( self.hero );


		self.navNextBTN = new ShowOverlayNavBTN();
		self.navNextBTN.build({
			id: 'next',
			target: self.container,
			top: 134,
			left: self.container.width,
			isNextBTN: true,
			callback: onNext
		});

		self.navPrevBTN = new ShowOverlayNavBTN();
		self.navPrevBTN.build({
			id: 'prev',
			target: self.container,
			top: 134,
			left: 0,
			isNextBTN: false,
			callback: onPrev
		});


		var closeBtn = new ShowOverlayCloseBTN();
		closeBtn.build({
			target: self.container,
			callback: adData.elements.gallery.galleryUnClick
		});


		self.container.hide();
	}

	self.show = function( showNum ) {
		self.showNum = showNum;
		if ( self.showing )
			self.hide( self.show );
		else {
			var animationTime = 0.5;
			var xOffset = -40;
			var delay = 0;
			var easeFunc = Quad.easeOut;
			self.showing = true;

			self.container.show(); 
			Styles.setCss( self.content, 'height', self.contentStartHeight );
			self.header.resetToDefault( 'height' );
			self.header.text = adData.getShowData( showNum ).title;
			Clamp.set( self.header, Clamp.Y );

			self.synopsis.resetToDefault( 'fontSize', 'height', 'format' );
			self.synopsis.text = adData.getShowData( showNum ).synopsis;

			var imageData;
			if ( adData.getShowData( showNum ).network ) {
				imageData = ImageManager.get( adData.getShowData( showNum ).network );
				Styles.setCss( self.network, 'background-image', imageData.src );
				TweenLite.set( self.network, { width: imageData.width, height: imageData.height });
			}
			else
				Styles.setCss( self.network, 'background', 'none' );
			Align.set( self.synopsis, {
				y: { 
					type: Align.BOTTOM,
					against: self.header,
					offset: 15,
					outer: true
				}
			});
			Align.set( self.network, {
				y: { 
					type: Align.BOTTOM,
					against: self.synopsis,
					offset: 15,
					outer: true
				}
			});

			Clamp.set( self.content, Clamp.Y );
			Align.set( self.content, {
				y: {
					type: Align.BOTTOM,
					offset: -34
				}
			} );


			if ( adData.getShowData( showNum ).mediaTye == 'video' ) {
				trace('\t adData.getShowData( ' + showNum + ' ).media:' + adData.getShowData( showNum ).media);
				Styles.setCss( adData.elements.videoPlayer.container, 'display', 'inherit' );
				adData.elements.videoPlayer.source( adData.getShowData( showNum ).media );
				Styles.setCss( self.hero, 'background', 'none' );
			}
			else {
				Styles.setCss( adData.elements.videoPlayer.container, 'display', 'none' );
				imageData = ImageManager.get( adData.getShowData( showNum ).image );
				Styles.setCss( self.hero, 'background-image', imageData.src );
				Styles.setCss( self.hero, 'background-repeat', 'no-repeat' );
				Styles.setCss( self.hero, 'background-size', 'cover' );
			}


			self.ctaBTN.show( showNum );
			self.networkY = Styles.getCss( self.network, 'y' );
			self.synopsisY = Styles.getCss( self.synopsis, 'y' );
			self.headerY = Styles.getCss( self.header, 'y' );
			self.ctaY = Styles.getCss( self.ctaBTN.container, 'y' );
			var yOffset = 20;
			
			TweenLite.fromTo( self.container, animationTime, { y: -self.height }, { y: 0, ease: Quad.easeOut } );
			delay += 0.3;
			TweenLite.fromTo( self.network, animationTime, { y: self.networkY - yOffset, opacity: 0 }, { delay: delay, y: self.networkY, opacity: 1, ease: easeFunc } );
			delay += 0.1;
			TweenLite.fromTo( self.synopsis, animationTime, { y: self.synopsisY - yOffset, opacity: 0 }, { delay: delay, y: self.synopsisY, opacity: 1, ease: easeFunc } );
			delay += 0.1;
			TweenLite.fromTo( self.header, animationTime, { y: self.headerY - yOffset, opacity: 0 }, { delay: delay, y: self.headerY, opacity: 1, ease: easeFunc } );
			delay += 0.1;
			TweenLite.fromTo( self.ctaBTN.container, animationTime, { y: self.ctaY - yOffset, opacity: 0 }, { delay: delay, y: self.ctaY, opacity: 1, ease: easeFunc } );

		}
	}

	self.hide = function( newCallback ) {
		if (self.showing) {
			self.showing = false;
			adData.elements.videoPlayer.pause();
			TweenLite.to( self.container, 0.5, { y: -self.height, ease: Quad.easeIn, onComplete: function() {
				if ( newCallback )
					newCallback( self.showNum );
				else {
					self.container.hide();
					self.callback();
				}
			} } );
		}
	}

	function onCtaClick() {
		trace('ShowOverlay.onCtaClick()');
		Expandable.collapse();

		var exitClickTag = adParams.networkId.toUpperCase() == "DC_STUDIO" ? global[ 'SYNOPSIS_EXIT_mood' + ( adData.curCategoryNum  + 1) + 'show' + (self.showNum + 1) ] : adData.getShowData( self.showNum ).ctaURL;

		trace('		exitClickTag:' + exitClickTag);
		Network.exit( exitClickTag );

	}

	function onNext() {
		adData.elements.gallery.onNext();
	}

	function onPrev() {
		adData.elements.gallery.onPrev();
	}


	function nocallback() {

	}


	return self;
});









/* -- COMMON IMPLEMENTED: ExpandBTN.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var ExpandBTN = ( function() {

	var self = this;
	self.container;
	self.arrow;
	self.arrowOVER;
	self.copyTF;

	self.callback;
	self.isOver = false;
	self.maxOverTime = 1;
	self.arrowY = 27;
	self.arrowTween;
	self.x;
	self.showing = false;

	self.build = function ( args ) {
		var target = args.target || adData.elements.redAdContainer;
		var fontSize = args.fontSize || 18;
		var lineHeight = args.lineHeight || fontSize;
		var width = self.width = args.width || self.width;
		var height = self.height = args.height || self.height;
		var top = args.top || 0;
		var left = args.left || 0;
		var margin = args.margin || 0;
		var multiline = args.multiline || true;
		var copy = args.copy || 'EXPAND';
		self.callback = args.callback || nocallback;

		self.container = new UIButton ({
			id: 'expandBTN',
			target: target,
			css: {
				width: 400, 
				height: 40,
				opacity: 0
			},
			align : {
				x: {
					type : Align.CENTER
				},
				y: {
					type : Align.BOTTOM,
					offset : -4
				}
			},
			onClick : onHitClick,
			onOver : self.onHitRollOver,
			onOut : self.onHitRollOut,
		});


		self.copyTF = new UITextField ({
			id: 'expandBTN_copyTF',
			target: self.container,
			css: {
				width: 400,
				height: 16,
				color: adData.whiteColor
			},
			text : copy,
			format : TextFormat.INLINE_FIT,
			fontSize : fontSize,
			spacing : 1.5,
			fontFamily : adData.font_boldItalic_allCaps,
			alignText : Align.CENTER
		});


		self.arrow = new UIImage({
			target : self.container,
			id: 'expandBTN_arrow',
			source: 'expandCta_arrow',
			css: {
				y: self.arrowY,
				opacity: 0
			},
			align : {
				x: Align.CENTER
			}
		});

		self.arrowOVER = new UIImage({
			target : self.arrow,
			id: 'expandBTN_arrow_OVER',
			source: 'expandCta_arrow_OVER',
			css: {
				opacity: 0
			}
		});
		



		self.x = self.container.x;

		

		Gesture.disableChildren( self.container );
	}


	self.show = function () {
		self.showing = true;
		var animationTime = 0.5;
		var easeFunc = Expo.easeOut;
		var destOpacity = 1;
		TweenLite.to( self.container, animationTime, { x: self.x, opacity: destOpacity, ease: Quad.easeOut });
		TweenLite.fromTo( self.arrow, animationTime, { y: self.arrowY - 10 }, { delay: 0.2, y: self.arrowY, opacity: destOpacity, ease: easeFunc });

		registerEvents();
	}

	self.hide = function() {
		self.showing = false;
		var animationTime = 0.5;
		var easeFunc = Quad.easeOut;
		var destOpacity = 0.3;

		TweenLite.to( self.container, animationTime, { opacity: destOpacity, ease:easeFunc });
		TweenLite.to( self.copyTF, animationTime, { color: adData.whiteColor, ease: easeFunc } );
		TweenLite.to( self.arrow, animationTime, { opacity: 0, ease: easeFunc });
		TweenLite.to( self.arrowOVER, animationTime, { opacity: 0, ease: easeFunc } );

		self.unregisterEvents();
	}


	self.onHitRollOver = function(event) {
		var animationTime = 0.25;
		var easeFunc = Quad.easeInOut;
		if (!self.isOver) {
			self.isOver = true;
			TweenLite.killDelayedCallsTo( stopLoop );
			TweenLite.delayedCall( self.maxOverTime, stopLoop );
			TweenLite.to( self.copyTF, animationTime, { color: adData.huluColors.primaryGreen, ease: easeFunc } );
			TweenLite.to( self.arrowOVER, animationTime, { opacity: 1, ease: easeFunc } );
		}
		self.arrowTween = TweenLite.to( self.arrow, animationTime, { y: self.arrowY + 3, color: adData.whiteColor, ease:easeFunc, onComplete: function() {
			self.arrowTween = TweenLite.to( self.arrow, animationTime, { y: self.arrowY, color: adData.huluColors.primaryGreen, ease:easeFunc, onComplete: function() {
				if (self.isOver)
					self.onHitRollOver();
			} })
		} } );
	}

	self.onHitRollOut = function(event) {
		var animationTime = 0.5;
		var easeFunc = Quad.easeInOut;
		TweenLite.to( self.copyTF, animationTime, { color: adData.whiteColor, ease: easeFunc } );
		TweenLite.to( self.arrowOVER, animationTime, { opacity: 0, ease: easeFunc } );
		stopLoop();
	}

	self.pulse = function() {
		if ( self.showing ) {
			var animationTime = 0.25;
			if (!self.isOver) {
				TweenLite.fromTo( self.copyTF, animationTime, { color: adData.whiteColor }, { color: adData.huluColors.primaryGreen, ease: Quad.easeInOut, onComplete: function() { this.reverse(); } } );
				TweenLite.fromTo( self.arrowOVER, animationTime, { opacity: 0 }, { opacity: 1, ease: Quad.easeInOut, onComplete: function() { this.reverse(); } } );
			}
			if ( self.arrowTween ) {
				if ( self.arrowTween.progress() > 0.5 || self.arrowTween.progress() == 0 )
					self.arrowTween = TweenLite.fromTo( self.arrow, animationTime, { y: self.arrowY, color: adData.huluColors.primaryGreen }, { y: self.arrowY + 3, color: adData.whiteColor, ease: Quad.easeOut, onComplete: function() { this.reverse(); }});
			}
			else
				self.arrowTween = TweenLite.fromTo( self.arrow, animationTime, { y: self.arrowY, color: adData.huluColors.primaryGreen }, { y: self.arrowY + 3, color: adData.whiteColor, ease: Quad.easeOut, onComplete: function() { this.reverse(); }});
		}
	}

	function stopLoop() {
		TweenLite.killDelayedCallsTo( stopLoop );
		self.isOver = false;

	}

	function onHitClick(event) {
		trace('ExpandBTN.onHitClick()');
		self.hide();
		self.callback();
	}


	self.unregisterEvents = function() {
		self.container.enabled = false;
		Gesture.disable( self.container );
	}

	function registerEvents() {
		self.container.enabled = true;
		Gesture.enable( self.container );
	}

	function nocallback() {

	}


	return self;
});









/* -- COMMON IMPLEMENTED: MoodSliderHandleBTN.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var MoodSliderHandleBTN = ( function() {

	var self = this;
	self.container;
	self.bg;
	self.bgOUT;
	self.bgOVER;
	self.ring;

	self.isOver = false;
	self.isLooping = false;
	self.maxOverTime = 1;
	self.ringScale = 1.5;
	self.bgScale = 1.2;
	self.ringAnimation;
	self.animatingOut = false;

	self.build = function ( args ) {
		var ringSize = 22;
		var circleSize = 14;
		var bgImageData = {
			width: circleSize,
			height: circleSize
		}
		var target = args.target || adData.elements.redAdContainer;
		var width = args.width || bgImageData.width;
		var height = args.height || bgImageData.height;


		self.container = new UIComponent({
			id: 'moodSlider_handle',
			target: target,
			css: {
				width: width,
				height: height
			},
			align: {
				y: Align.CENTER
			}
		});





		self.bg = new UIComponent({
			id: 'moodSlider_handle_bg',
			target: self.container,
			css: {
				width: width,
				height: height
			},
		});


		self.bgOUT = new UIImage ({
			id: 'moodSlider_handle_OUT',
			target: self.bg,
			source: 'slider_handle_OUT',
			css: {
				width: circleSize, 
				height: circleSize
			}
		});

		self.bgOVER = new UIImage ({
			id: 'moodSlider_handle_OVER',
			target: self.bg,
			source: 'slider_handle_OVER',
			css: {
				width: circleSize, 
				height: circleSize,
				opacity: 0
			}
		});





		self.ring = new UIImage ({
			id: 'moodSlider_handle_ring',
			target: self.container,
			source: 'slider_handle_ring',
			css: {
				width: ringSize, 
				height: ringSize,
				opacity: 0
			},
			align: Align.CENTER
		});
		Gesture.disable( self.container );
	}


	self.show = function () {
		var animationTime = 0.5;
		var easeFunc = Expo.easeOut;
		var destOpacity = 1;
	}


	self.onHitRollOver = function(event) {
		var animationTime = 0.25;
		var easeFunc = Quad.easeInOut;

		if (!self.isOver) {
			self.isLooping = true;
			self.isOver = true;
			TweenLite.killDelayedCallsTo( stopLoop );
			if ( self.maxOverTime )
				TweenLite.delayedCall( self.maxOverTime, stopLoop );
			TweenLite.to( self.ring, animationTime, { opacity: 1, ease: Quad.easeInOut } );
			TweenLite.to( self.bgOVER, animationTime, { opacity: 1, ease:easeFunc });
		}

		self.animatingOut = false;
		TweenLite.fromTo( self.bg, animationTime, { scale: 1 }, { scale: self.bgScale, ease:easeFunc });
		self.ringAnimation = TweenLite.fromTo( self.ring, animationTime, { scale: self.ringScale }, { scale: 1, ease:easeFunc, onComplete: function() {
			self.animatingOut = true;
			var destOpacity = self.isOver ? 1 : 0;
			TweenLite.to( self.bg, animationTime, { scale: 1, ease:easeFunc });
			self.ringAnimation = TweenLite.to( self.ring, animationTime, { opacity: destOpacity, scale: self.ringScale, ease:easeFunc, onComplete: function() {
				if ( self.isLooping )
					self.onHitRollOver();
				else {
					TweenLite.fromTo( self.bg, animationTime, { scale: 1 }, { scale: self.bgScale, ease:easeFunc });
					self.ringAnimation = TweenLite.fromTo( self.ring, animationTime, { scale: self.ringScale }, { scale: 1, ease:easeFunc });
					if ( !self.isOver )
						TweenLite.to( self.bgOVER, animationTime, { opacity: 0, ease:easeFunc });
					stopLoop();
				}
			} })
		} } );
	}

	function stopLoop() {
		TweenLite.killDelayedCallsTo( self.onHitRollOut );
		self.isLooping = false;
	}

	self.onHitRollOut = function(event) {
		stopLoop();
		if (self.isOver) {
			var easeFunc = Quad.easeInOut;
			var animationTime = self.ringAnimation.duration() - self.ringAnimation.time() > 0 ? self.ringAnimation.duration() - self.ringAnimation.time() : 0.5;
			TweenLite.killDelayedCallsTo( self.onHitRollOut );
			self.isOver = false;
			if ( self.animatingOut ) {
				TweenLite.to( self.bg, animationTime, { scale: 1, ease: easeFunc });
				TweenLite.to( self.ring, animationTime, { opacity: 0, ease: easeFunc } );
				TweenLite.to( self.bgOVER, animationTime, { opacity: 0, ease:easeFunc });
			}
		}
	}

	self.onHitPress = function(event) {
		self.isOver = true;

		TweenLite.killDelayedCallsTo( self.onHitRollOut );
		TweenLite.killTweensOf( self.bg );
		TweenLite.killTweensOf( self.ring );
		TweenLite.killTweensOf( self.bgOVER );


		var animationTime = 0.5;
		var easeFunc = Quad.easeOut;

		TweenLite.fromTo( self.bg, animationTime, { scale: 1 }, { scale: 0.75, ease:easeFunc });
		TweenLite.to( self.bgOVER, animationTime, { opacity: 1, ease:easeFunc });
		TweenLite.fromTo( self.ring, animationTime, { opacity: self.ring.opacity, scale: self.ringScale }, { opacity: 1, scale: 0.75, ease:easeFunc });
	}

	self.pulse = function( setGreen ) {
		var animationTime = 0.25;
		var easeFunc = Quad.easeOut;

		TweenLite.killTweensOf( self.bg );
		TweenLite.killTweensOf( self.ring );
		TweenLite.killTweensOf( self.bgOVER );

		TweenLite.fromTo( self.bg, animationTime, { scale: 1 }, { scale: 0.75, ease:easeFunc, onComplete: function() { this.reverse(); } });
		TweenLite.fromTo( self.bgOVER, animationTime, { opacity: 0 }, { opacity: 1, ease:easeFunc, onComplete: function() {
			if ( !setGreen )
				this.reverse();
		} });
		TweenLite.fromTo( self.ring, animationTime, { opacity: 0, scale: self.ringScale }, { opacity: 1, scale: 0.75, ease:easeFunc, onComplete: function() { this.reverse(); } });	
	}

	self.onHitRelease = function(event) {
			stopLoop();
			self.isOver = false;
			self.animatingOut = true;
			self.pulse();
	}


	self.unregisterEvents = function() {
		self.container.enabled = false;
		Gesture.disable( self.container );
	}

	function registerEvents() {
		self.container.enabled = true;
		Gesture.enable( self.container );
	}

	function nocallback() {

	}


	return self;
});









/* -- COMMON IMPLEMENTED: GalleryBTN.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var GalleryBTN = ( function() {

	var self = this;
	self.container;
	self.copyTF;
	self.image;
	self.overContainer;
	self.overRing;
	self.overShadow;
	self.overIcon;

	self.callback;
	self.id = 1;
	self.isOver = false;
	self.maxOverTime = 1;
	self.textOutColor = '#d7d7d7';
	self.opacityOut = 0.6;

	self.build = function ( args ) {
		self.id = args.id || 0;
		var target = args.target || adData.elements.redAdContainer;
		var fontSize = args.fontSize || 13;
		var lineHeight = args.lineHeight || fontSize;
		var width = self.width = args.width || 192;
		var height = self.height = args.height || 135;
		var labelHeight = args.labelHeight || 27;
		var top = args.top || 0;
		var left = args.left || 0;
		var margin = args.margin || 3;
		var multiline = args.multiline || false;
		var spacer = args.spacer || 2;
		var iconSize = 66;
		self.callback = args.callback || nocallback;

		self.container = new UIButton({
			id: 'galleryBTN_' + self.id,
			target: target,
			css: {
				width: width,
				height: height,
				top: top,
				left: (width + spacer) * self.id + 1,
				overflow: 'hidden',
				backgroundColor: '#363636'
			},
			onClick: self.onHitClick,
			onOver: self.onHitRollOver,
			onOut: self.onHitRollOut
		});


		self.copyTF = new UITextField({
			id: 'galleryBTN_copyTF_' + self.id,
			target: self.container,
			css : {
				width : width,
				height : labelHeight,
				color : adData.whiteColor,
				backgroundColor: self.textOutColor
			},
			fontSize : fontSize,
			fontFamily : adData.font_boldItalic_allCaps,
			format : TextFormat.INLINE,
			alignText : Align.CENTER,
			bufferText : {
				left: margin,
				right: margin
			},
			align: {
				y: Align.BOTTOM
			},
			text : 'DEFAULT'// adData.galleryCTACopy( adData.getShowData( self.id ).mediaTye )
		});


		self.image = new UIImage({
			id: 'galleryBTN_image_' + self.id,
			target: self.container,
			source: 'galleryButton_circle',
			css: {
				width: width,
				height: height - labelHeight,
				opacity: self.opacityOut,
				backgroundSize: 'cover'
			}
		});

		var imageInnerShadow = new UIImage({
			id: 'galleryBTN_image_' + self.id + '_shadow',
			target: self.image,
			source: 'gallery_image_shadow'
		});



		self.overContainer = new UIComponent({
			id: 'gallery_overContainer',
			target: self.container,
			css: {
				width: width,
				height: height - labelHeight,
				opacity: 0
			}
		});

		self.overShadow = new UIImage({
			id: 'gallery_over_shadow',
			target: self.overContainer,
			source: 'galleryBTN_shadow',
			align: Align.CENTER
		});

		self.overRing = new UIImage({
			id: 'gallery_over_ring',
			target: self.overContainer,
			source: 'galleryButton_ring',
			align: Align.CENTER,
			css: {
				width: iconSize,
				height: iconSize
			}
		});

		var overCircle = new UIImage({
			id: 'gallery_over_circle',
			target: self.overShadow,
			source: 'galleryButton_circle',
			align: Align.CENTER,
			css: {
				width: iconSize,
				height: iconSize
			}
		});

		self.overIcon = new UIImage({
			id: 'gallery_over_icon',
			target: overCircle,
			source: adData.getShowData( self.id ).mediaTye == 'video' ? 'galleryButton_icon_video' : 'galleryButton_icon_synopsis',
			align: Align.CENTER,
			css: {
				width: iconSize,
				height: iconSize
			}
		});



		Gesture.disableChildren( self.container );
	}


	self.show = function ( delay ) {
		trace('GalleryBTN.show()');
		trace('\t delay:' + delay);
		self.copyTF.text = adData.galleryCTACopy( adData.getShowData( self.id ).mediaTye );
		trace('\t self.image:' + self.image);
		self.image.source = adData.getShowData( self.id ).image;
		self.overIcon.source = adData.getShowData( self.id ).mediaTye == 'video' ? 'galleryButton_icon_video' : 'galleryButton_icon_synopsis';
		var animationTime = 0.25;
		var easeFunc = Quad.easeOut;
		var direction = adData.categoryDirectionFrom == 'left' ? -1 : 1;

		TweenLite.fromTo( self.container, animationTime, { x: 20 * direction, opacity: 0 }, { delay: delay, x: 0, opacity: 1, ease: easeFunc } );
		delay += 0.2;
		TweenLite.fromTo( self.image, animationTime, { opacity: 1 }, { delay: delay, opacity: self.opacityOut, ease: easeFunc } );
		TweenLite.fromTo( self.copyTF, animationTime, { backgroundColor: adData.huluColors.primaryGreen }, { delay: delay, backgroundColor: self.textOutColor, ease: easeFunc, onComplete: self.registerEvents });
	}

	self.hide = function( delay ) {
		trace('GalleryBTN.hide()');
		self.resetState();
		var animationTime = 0.25;
		var easeFunc = Quad.easeIn;
		var direction = adData.categoryDirectionFrom == 'left' ? 1 : -1;

		TweenLite.to( self.container, animationTime, { delay: delay, x: 20 * direction, opacity: 0, ease: easeFunc } );
	}


	self.onHitRollOver = function(event) {
		var animationTime = 0.25;
		var easeFunc = Quad.easeInOut;

		if (!self.isOver) {
			self.isOver = true;
			TweenLite.killDelayedCallsTo( stopLoop );
			TweenLite.delayedCall( self.maxOverTime, stopLoop );
			TweenLite.to( self.copyTF, 0.25, { backgroundColor: adData.huluColors.primaryGreen, ease: Quad.easeOut });
			TweenLite.to( self.image, animationTime, { opacity: 1, ease: easeFunc } );

			var startScale = 0.75;
			TweenLite.fromTo( self.overContainer, animationTime, { scale: startScale }, { delay: 0.1, scale: 1, opacity: 1, ease: easeFunc } );
			TweenLite.set( self.overRing, { scale: 0.5 });
		}
		
		TweenLite.to( self.overRing, animationTime, { scale: 1.1, ease: easeFunc, onComplete: function() {
			TweenLite.to( self.overRing, animationTime, { scale: 0.9, ease: easeFunc, onComplete: function() {
				if (self.isOver)
					self.onHitRollOver();
			} })
		} } );
	}

	self.onHitRollOut = function(event) {
		var animationTime = 0.5;
		var easeFunc = Quad.easeInOut;

		TweenLite.killDelayedCallsTo( stopLoop );
		TweenLite.to( self.copyTF, animationTime, { backgroundColor: self.textOutColor, ease: easeFunc });
		TweenLite.to( self.image, animationTime, { opacity: self.opacityOut, ease: easeFunc } );
		TweenLite.killTweensOf( self.overContainer );
		TweenLite.to( self.overContainer, animationTime, { opacity: 0, scale: 0.75, ease: easeFunc } );
		self.isOver = false;
	}

	self.resetState = function() {
		trace('GalleryBTN.resetState() self.container.id:' + self.container.id);
		self.onHitRollOut();
		self.registerEvents();
	}


	self.unregisterEvents = function() {
		self.container.enabled = false;
	}

	function stopLoop() {
		self.isOver = false;
	}

	self.onHitClick = function(event) {
		TweenLite.killDelayedCallsTo( stopLoop );
		if (!self.isOver)
			self.onHitRollOver();
		self.isOver = false;
		TweenLite.to( self.overRing, 0.25, { scale: 0.6, ease: Quad.easeOut });
		self.unregisterEvents();
		self.callback( self );
	}

	self.registerEvents = function() {
		self.container.enabled = true;
	}

	function nocallback() {

	}


	return self;
});









/* -- COMMON IMPLEMENTED: ShowOverlayCloseBTN.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var ShowOverlayCloseBTN = ( function() {

	var self = this;
	self.container;
	self.icon;
	
	self.callback;
	self.isOver = false;
	self.maxOverTime = 1;

	self.build = function ( args ) {
		var bgImageData = ImageManager.get( 'showOverlay_close_bg' );
		var target = args.target || adData.elements.redAdContainer;
		var width = args.width || bgImageData.width;
		var height = args.height || bgImageData.height;
		var top = args.top || 0;
		var left = args.left || -bgImageData.width / 2;
		self.callback = args.callback || nocallback;


		self.container = new UIButton({
			id: 'expanded_closeBTN',
			target: target,
			css: {
				width: width,
				height: height,
				top: top,
				left: left,
			},
			icon : [
				new UIImage({
					id: 'expanded_closeBTN_bg',
					source: 'showOverlay_close_bg',
					css: {
						opacity: 0.16
					}
				})
			],
			onClick: onHitClick,
			onOver: self.onHitRollOver,
			onOut: self.onHitRollOut
		});


		self.icon = new UIImage({
			id: 'expanded_closeBTN_icon',
			target: self.container,
			source: 'showOverlay_close_x',
			align: {
				x: {
					type: Align.RIGHT,
					offset: -10
				},
				y: Align.CENTER
			}
		});


		Gesture.disableChildren( self.container );

		self.show();
	}


	self.show = function () {
		registerEvents();
	}

	self.hide = function() {
	}


	self.onHitRollOver = function(event) {
		var animationTime = 0.25;
		var easeFunc = Quad.easeInOut;

		if (!self.isOver) {
			self.isOver = true;
			TweenLite.killDelayedCallsTo( stopLoopAnimation );
			TweenLite.delayedCall( self.maxOverTime, stopLoopAnimation );
			TweenLite.to( self.container, animationTime, { x: 10, ease: Quad.easeOut } );
		}
		TweenLite.to( self.icon, animationTime, { scale: 1.5, ease:easeFunc, onComplete: function() {
			TweenLite.to( self.icon, animationTime, { scale: 1, ease:easeFunc, onComplete: function() {
				if (self.isOver)
					self.onHitRollOver();
			} })
		} } );
	}

	self.onHitRollOut = function(event) {
		TweenLite.killDelayedCallsTo( stopLoopAnimation );
		TweenLite.to( self.container, 0.5, { x: 0, ease: Quad.easeInOut } );
		self.isOver = false;
	}

	function stopLoopAnimation() {
		TweenLite.killDelayedCallsTo( stopLoopAnimation );
		self.isOver = false;
	}

	function onHitClick(event) {
		self.callback();
	}

	self.unregisterEvents = function() {
		self.container.enabled = false;
	}

	function registerEvents() {
		self.container.enabled = true;
	}

	function nocallback() {

	}


	return self;
});









/* -- COMMON IMPLEMENTED: ShowOverlayCtaBTN.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var ShowOverlayCtaBTN = ( function() {

	var self = this;
	self.container;
	self.copyTF;
	self.icon;
	
	self.callback;
	self.isOver = false;
	self.maxOverTime = 1;
	self.iconX;

	self.build = function ( args ) {
		var target = args.target || adData.elements.redAdContainer;
		var width = args.width || 400;
		var height = args.height || 30;
		var top = args.top || 0;
		var left = args.left || 0;
		var fontSize = args.fontSize || 14;
		self.callback = args.callback || nocallback;


		self.container = new UIButton({
			id: 'showOverlay_ctaBTN',
			target: target,
			css: {
				width: width,
				height: height,
				top: top,
				left: left,
			},
			onClick: onHitClick,
			onOver: self.onHitRollOver,
			onOut: self.onHitRollOut
		});


		self.copyTF = new UITextField({
			id: 'showOverlay_ctaBTN_icon',
			target: self.container,
			css : {
				width : width,
				height : height,
				color : adData.huluColors.primaryGreen,
				textDecoration: 'underline'
			},
			fontSize : fontSize,
			fontFamily : adData.font_bookItalic,
			format : TextFormat.INLINE_CLAMP,
			alignText : Align.LEFT,
			text : adData.getShowData( adData.curCategoryNum ).ctaCopy,
		});


		self.icon = new UITextField({
			id: 'showOverlay_ctaBTN_icon',
			target: self.container,
			css : {
				width : width,
				height : height,
				color : adData.huluColors.primaryGreen,
			},
			fontSize : self.copyTF.fontSize,
			fontFamily : adData.font_bold,
			format : TextFormat.INLINE_CLAMP,
			alignText : Align.LEFT,
			text : adData.trianglesMap[1],
			align : {
				x: {
					type: Align.LEFT,
					against: self.copyTF,
					outer: true,
					offset: 4
				}
			}
		});

		self.iconX = self.icon.x;

		Clamp.set( self.container, Clamp.X );


		Gesture.disableChildren( self.container );
	}


	self.show = function ( showNum ) {
		trace('ShowOverlayCtaBTN.show()');
		trace('\t showNum:' + showNum );
		trace('\t adData.getShowData( ' + showNum + ' ).ctaCopy:' + adData.getShowData( showNum ).ctaCopy);
		self.copyTF.text = adData.getShowData( showNum ).ctaCopy;
		self.copyTF.format = TextFormat.INLINE_CLAMP;
		Align.set( self.icon, {
			x: {
				type: Align.LEFT,
				against: self.copyTF,
				outer: true,
				offset: 4
			}
		});
		self.iconX = self.icon.x;

		Clamp.set( self.container, Clamp.X );



		registerEvents();
	}

	self.hide = function() {
	}


	self.onHitRollOver = function(event) {
		var animationTime = 0.25;
		var easeFunc = Quad.easeInOut;

		if (!self.isOver) {
			self.isOver = true;
			TweenLite.killDelayedCallsTo( stopLoopAnimation );
			TweenLite.delayedCall( self.maxOverTime, stopLoopAnimation );
			TweenLite.to( self.copyTF, animationTime, { color: adData.whiteColor, ease: Quad.easeOut } );
			TweenLite.to( self.icon, animationTime, { color: adData.whiteColor, ease: Quad.easeOut } );
		}
		TweenLite.to( self.icon, animationTime, { x: self.iconX + 3, ease:easeFunc, onComplete: function() {
			TweenLite.to( self.icon, animationTime, { x: self.iconX, ease:easeFunc, onComplete: function() {
				if (self.isOver)
					self.onHitRollOver();
			} })
		} } );
	}

	self.onHitRollOut = function(event) {
		TweenLite.killDelayedCallsTo( stopLoopAnimation );
		TweenLite.to( self.copyTF, 0.5, { color: adData.huluColors.primaryGreen, ease: Quad.easeInOut } );
		TweenLite.to( self.icon, 0.5, { color: adData.huluColors.primaryGreen, ease: Quad.easeInOut } );
		self.isOver = false;
	}

	function stopLoopAnimation() {
		TweenLite.killDelayedCallsTo( stopLoopAnimation );
		self.isOver = false;
	}

	function onHitClick(event) {
		self.callback();
	}

	self.unregisterEvents = function() {
		self.container.enabled = false;
	}

	function registerEvents() {
		self.container.enabled = true;
	}

	function nocallback() {

	}


	return self;
});









/* -- COMMON IMPLEMENTED: ShowOverlayNavBTN.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var ShowOverlayNavBTN = ( function() {

	var self = this;
	self.container;
	self.bg;
	self.icon;
	
	self.callback;
	self.isOver = false;
	self.maxOverTime = 1;
	self.isNextBTN = false;
	self.destX = 4;
	self.iconX;

	self.build = function ( args ) {
		var id = args.id;
		var label = 'showOverlay_navBTN_' + id;
		var bgImageData = ImageManager.get( 'showOverlay_close_bg' );
		var target = args.target || adData.elements.redAdContainer;
		var width = args.width || bgImageData.width;
		var height = args.height || bgImageData.height;
		var top = args.top || 0;
		self.isNextBTN = args.isNextBTN;
		var left = args.left || 0;
		left -= (bgImageData.width / 2);
		self.callback = args.callback || nocallback;


		self.container = new UIButton({
			id: label,
			target: target,
			css: {
				width: width,
				height: height,
				top: top,
				left: left
			},
			onClick: onHitClick,
			onOver: self.onHitRollOver,
			onOut: self.onHitRollOut
		});

		self.bg = new UIImage({
			id: 'showOverlay_navBTN_bg',
			target: self.container,
			source: 'showOverlay_close_bg',
			css: {
				opacity: 0.16
			}
		});


		self.icon = new UIImage({
			id: label + '_navArrow',
			target: self.container,
			source: 'showOverlay_navArrow_' + id,
			align: {
				x: {
					type: self.isNextBTN ? Align.LEFT : Align.RIGHT,
					offset: self.isNextBTN ? 10 : -10
				},
				y: Align.CENTER
			}
		});

		self.iconX = self.icon.x;
		self.destX = self.isNextBTN ? self.icon.x - self.destX : self.icon.x + self.destX;


		Gesture.disableChildren( self.container );

		self.show();
	}


	self.show = function () {
		registerEvents();
	}

	self.hide = function() {
	}


	self.onHitRollOver = function(event) {
		var animationTime = 0.25;
		var easeFunc = Quad.easeInOut;

		if (!self.isOver) {
			self.isOver = true;
			TweenLite.killDelayedCallsTo( stopLoopAnimation );
			TweenLite.delayedCall( self.maxOverTime, stopLoopAnimation );
			TweenLite.to( self.container, animationTime, { x: self.isNextBTN ? -10 : 10, ease: Quad.easeOut } );
			TweenLite.to( self.bg, animationTime, { opacity: 0.25, ease: Quad.easeOut } );
		}
		TweenLite.to( self.icon, animationTime, { x: self.destX, ease:easeFunc, onComplete: function() {
			TweenLite.to( self.icon, animationTime, { x: self.iconX, ease:easeFunc, onComplete: function() {
				if (self.isOver)
					self.onHitRollOver();
			} })
		} } );
	}

	self.onHitRollOut = function(event) {
		TweenLite.killDelayedCallsTo( stopLoopAnimation );
		TweenLite.to( self.container, 0.5, { x: 0, ease: Quad.easeInOut } );
		TweenLite.to( self.bg, 0.5, { opacity: 0.16, ease: Quad.easeInOut } );
		self.isOver = false;
	}

	function stopLoopAnimation() {
		TweenLite.killDelayedCallsTo( stopLoopAnimation );
		self.isOver = false;
	}

	function onHitClick(event) {
		self.callback();
	}

	self.unregisterEvents = function() {
		self.container.enabled = false;
	}

	function registerEvents() {
		self.container.enabled = true;
	}

	function nocallback() {

	}


	return self;
});



















/* -- BUILD SIZE( 970x250_970x500 ): build.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
/* Template: DC Studio - Expandable, AdApp: 1.2.28, AdHtml: v2.6.3, Instance: 09/08/16 10:25am */
var Control = new function() {
	this.prepareBuild = function() {
		trace( 'Control.prepareBuild()' );
		Control.preMarkup();
		View.buildCollapsed();
		View.buildExpanded();
		View.buildExpandCollapseUI();
		View.buildBorder();
		View.addYoutubeCloseButton();
		Control.postMarkup();
		Animation.startAd();
		Animation.startScene();
	}

	this.preMarkup = function() {
		trace( 'Control.preMarkup()' );
		if (adData.guide) {
			adData.elements.guide = new UIImage ({
				id: 'guide',
				target: adData.elements.redAdContainer,
				source: adData.guide,
				css: {}
			});
		}
		Track3rdParty.pixel( 'https://googleads.g.doubleclick.net/pagead/viewthroughconversion/963244507/?value=1.00&currency_code=USD&label=7WzrCJfklGoQ2-OnywM&guid=ON&script=0' );
	}

	this.postMarkup = function() {
		trace( 'Control.postMarkup()' );

		Expandable.init ({
			expandStart : Animation.expandStart,
			expandComplete : Control.handleExpandComplete,
			collapseStart : Animation.collapseStart,
			collapseComplete : Control.handleCollapseFinish
		});

		if ( adParams.expandable.expanded ){
			adData.elements.collapsedContainer.hide();
		} else {
			adData.elements.expandedContainer.hide();
		}
	}

	this.skipIntro = function() {
		adData.elements.intro.hide( true );
		adData.elements.moodSlider.show( true );
	}

	this.onCtaExit = function() {
		trace('Control.onCtaExit()');
		Track3rdParty.pixel ( 'https://googleads.g.doubleclick.net/pagead/viewthroughconversion/963244507/?value=1.00&currency_code=USD&label=PBNuCJ3klGoQ2-OnywM&guid=ON&script=0' );
		Control.networkExit();
	}

	this.onLogoExit = function() {
		trace('Control.onLogoExit()');
		Track3rdParty.pixel ( 'https://googleads.g.doubleclick.net/pagead/viewthroughconversion/963244507/?value=1.00&currency_code=USD&;label=KJE6CJrklGoQ2-OnywM&guid=ON&script=0' );
		Control.networkExit();
	}

	this.networkExit = function( exitClickTag ) {
		trace('Control.networkExit()');
		trace('\t exitClickTag:' + exitClickTag);
		trace('\t adData.elements.intro.showing:' + adData.elements.intro.showing);
		if ( adData.elements.intro.showing )
			Control.skipIntro();
		var myClickTag = exitClickTag || clickTag;
		trace('\t myClickTag:' + myClickTag);
		Network.exit ( myClickTag );
		if ( adParams.expandable.collapseOnExit ){}
			Expandable.collapse();
	}

	this.handleExpand = function() {
		adData.elements.ytCloseExpandedBTN.show();
		Expandable.expand();
		adData.elements.expanded.show();
	}
			
	this.handleExpandComplete = function() {
	}
			
	this.handleCollapseFinish = function() {
		adData.elements.ytCloseExpandedBTN.hide();
		adData.elements.btnExpand.show();
		adData.elements.expandedContainer.hide();
		adData.elements.expanded.hide();

	}

	this.switchCategory = function() {
		trace('Control.switchCategory()');
		adData.elements.expanded.switchCategory();
	}

	
	
	this.handleMainVideoComplete = function ( event ){
		trace( 'Control.handleMainVideoComplete()' );
	}
}
var View = new function() {
	this.buildCollapsed = function(){

		adData.elements.collapsedContainer = new UIComponent({
			id : 'collapsed-container',
			target : adData.elements.redAdContainer,
			css : {
				x: adParams.expandable.collapsedX, 
				y: adParams.expandable.collapsedY,
				width: adParams.expandable.collapsedWidth,
				height: adParams.expandable.collapsedHeight,
				overflow: 'hidden',
				opacity: adData.guide ? 0.5 : 1
			}
		});

		adData.elements.moodSlider = new MoodSlider();
		adData.elements.moodSlider.build({
			target: adData.elements.collapsedContainer,
			width: adParams.expandable.collapsedWidth,
			height: adParams.expandable.collapsedHeight,
			switchCategoryCallback: Control.switchCategory,
			callback: Control.handleExpand
		});



		adData.elements.intro = new Intro();
		adData.elements.intro.build({
			target: adData.elements.collapsedContainer,
			width: 720,
			height: 40,
			fontSize: 40,
			margin: 0,
			callback: Animation.showMoodSlider
		});



		adData.elements.ctaBTN = new CtaBTN();
		adData.elements.ctaBTN.build({
			target: adData.elements.collapsedContainer,
			fontSize: 14,
			width: 150,
			height: 16,
			callback: Control.onCtaExit
		});


		var logoData = ImageManager.get( 'logo' );
		adData.elements.logo = new UIButton({
			id: 'hulu_logo_btn',
			target: adData.elements.collapsedContainer,
			css: {
				width: logoData.width,
				height: logoData.height,
			},
			icon: [
				new UIImage ({
					source: 'logo',
				})
			],
			align: {
				x:{
					type : Align.LEFT,
					offset : 20
				},
				y: {
					type : Align.BOTTOM,
					offset : -33
				}
			},
			onClick: Control.onLogoExit
		});
		Styles.setBackgroundColor( adData.elements.redAdContainer, adData.whiteColor );
	}

	this.buildExpanded = function(){

		adData.elements.expandedContainer = new UIComponent({
			id : 'expanded-container',
			target : adData.elements.redAdContainer,
			css : {
				x: adParams.expandable.expandedX, 
				y: adParams.expandable.expandedY,
				width: adParams.adWidth,
				height: adParams.adHeight,
				overflow: 'hidden',
				clip: 'rect(' + adParams.expandable.collapsedImageHeight +'px ' + adParams.adWidth + 'px ' + adParams.adHeight + 'px 0px)'
			}
		});

		adData.elements.expandedExitBTN = new UIButton({
			id: 'expanded-exitBTN',
			target: adData.elements.expandedContainer,
			css: {
				width: adParams.adWidth,
				height: adParams.adHeight
			}
		});



		adData.elements.expanded = new Expanded();
		adData.elements.expanded.build({
			target: adData.elements.expandedContainer,
			width: adParams.adWidth,
			height: adParams.adHeight - adParams.expandable.collapsedImageHeight,
			top: adParams.expandable.collapsedImageHeight
		});
		if ( !adData.guide )
			Styles.setBackgroundColor( adData.elements.expandedContainer, adData.whiteColor );
		adData.elements.expandedContainer.x = adParams.expandable.collapsedX;
		adData.elements.expandedContainer.y = adParams.expandable.collapsedY;
		adData.elements.expandedContainer.width = adParams.expandable.collapsedWidth;
		adData.elements.expandedContainer.height = adParams.expandable.collapsedHeight;
	}

	this.buildExpandCollapseUI = function() {
	}
		
	this.buildBorder = function(){
		new UIBorder({
			id : 'collapse',
			target : adData.elements.collapsedContainer,
			size : 1,
			color : '#000000'
		});
		
		new UIBorder({
			id : 'expand',
			target : adData.elements.expandedContainer,
			size : 1,
			color : '#000000'
		});
	}
	this.addYoutubeCloseButton = function() {

		var collapseWidth = 121;
		var collapseHeight = 26;
		var closeTheme = 'white'; // 'black';

		var ytCloseExpanded_xAlign = {
			type: Align.RIGHT,
			offset: -1
		};
		var ytCloseExpandedTF_txtAlign = Align.LEFT;
		var ytCloseExpandedTF_xAlign = {
			type: Align.RIGHT,
		};
		var ytCloseExpandedX_xAlign = Align.RIGHT;


		if ( adParams.networkId.toUpperCase() == "DC_STUDIO" ) {
			var markupStr = '<ci-ytclosebutton lang="en" theme="white" shadow="false" id="ytClose_dc"></ci-ytclosebutton>'
			adData.elements.redAdContainer.insertAdjacentHTML( 'beforeend', markupStr );
			
			ytCloseExpanded_xAlign = {
				type: Align.LEFT,
				offset: 1
			};
			ytCloseExpandedTF_txtAlign = Align.RIGHT;
			ytCloseExpandedTF_xAlign = {
				type: Align.RIGHT,
				offset: -5
			};
			ytCloseExpandedX_xAlign = Align.LEFT;
		}

		adData.elements.ytCloseExpandedBTN = new UIButton({
			id: 'yt_close_expanded_btn',
			target: adData.elements.redAdContainer,
			css: {
				width: collapseWidth,
				height: collapseHeight
			},
			align: {
				x: ytCloseExpanded_xAlign,
				y: {
					type: Align.TOP,
					offset: 1
				}
			},
			onClick: Expandable.collapse
		});


		var closeTF = new UITextField({
			id: 'yt_close_expanded_btn_text',
			target: adData.elements.ytCloseExpandedBTN,
			css : {
				width : collapseWidth - 5,
				height : collapseHeight,
				textDecoration: 'underline',
				color: closeTheme,
				fontWeight: 'bold'
			},
			fontSize : 11,
			fontFamily : 'arial, sans-serif',
			format : TextFormat.INLINE,
			alignText : ytCloseExpandedTF_txtAlign,
			spacing: 0.4,
			align: {
				x: ytCloseExpandedTF_xAlign,
				y: Align.CENTER
			},
			text : 'Close Expanded'
		});

		var closeX = new UIImage({
			id: 'yt_close_expanded_btn_x',
			target: adData.elements.ytCloseExpandedBTN,
			source: 'close_' + closeTheme,
			align: {
				x: ytCloseExpandedX_xAlign
			}
		})


		Gesture.disableChildren( adData.elements.ytCloseExpandedBTN );
		adData.elements.ytCloseExpandedBTN.hide();
	}
}
var Animation = new function() {
	this.startAd = function() {
		trace( 'Animation.startAd()' );
		Styles.setCss( global.adData.elements.redAdContainer, { opacity:1 });

		var preloader = document.getElementById( "preloader" );
		TweenLite.fromTo( preloader, 0.5, {clip:'rect( 0px, ' + adParams.adWidth + 'px, ' + adParams.adHeight + 'px, 0px )'}, {clip:'rect( 0px, ' + adParams.adWidth + 'px, ' + adParams.adHeight + 'px, ' + adParams.adWidth + 'px )', ease:Quad.easeInOut, onComplete: function() {
				global.removePreloader();
			}
		} );

	}

	this.startScene = function() {
		trace( 'Animation.startScene()' );		
		var animationTime = 0.5;
		var xOffset = -40;
		var delay = 0;
		var easeFunc = Quad.easeOut;
		adData.elements.intro.show({
			animationTime: animationTime,
			xOffset: xOffset,
			delay: delay,
			easeFunc: easeFunc
		});

		delay += 0.1;
		var ctaDestX = adData.elements.ctaBTN.container.x + xOffset;
		TweenLite.from( adData.elements.ctaBTN.container, animationTime, { delay: delay, x: ctaDestX, opacity: 0, ease: easeFunc });
		delay += 0.1;
		TweenLite.from( adData.elements.logo, animationTime, { delay: delay, x: xOffset, opacity: 0, ease: easeFunc });
	}


	this.showMoodSlider = function() {
		adData.elements.moodSlider.show();
	}


	this.expandStart = function(){
		adData.elements.expandedContainer.show();

		TweenLite.to ( adData.elements.expandedContainer, .5, { 
			x: adParams.expandable.expandedX,
			y: adParams.expandable.expandedY,
			width: adParams.adWidth,
			height: adParams.adHeight,

			onComplete : Expandable.expandComplete
		});
	}

	this.collapseStart = function(){
		adData.elements.gallery.galleryUnClick();

		TweenLite.to ( adData.elements.expandedContainer, .5, { 
			x: adParams.expandable.collapsedX,
			y: adParams.expandable.collapsedY,
			width: adParams.expandable.collapsedWidth,
			height: adParams.expandable.collapsedHeight,

			onComplete : Expandable.collapseComplete
		});
	}

}
































