/* ################################################################################################
 * #
 * #		RED Interactive - Digital Advertising
 * #		Hulu | Pre_Fall_and_Fall_Campaign | RichMedia_Quiz | AV_Club_Quiz_Billboard_FT | 2.0
 * #
 * ################################################################################################ */
trace( "----------------------------------------------------------------------------------------------------------------------------" );
trace( " AV_Club_Quiz_Billboard_FT_970x250_text_payload.js[ Hulu | Pre_Fall_and_Fall_Campaign | RichMedia_Quiz | AV_Club_Quiz_Billboard_FT | 970x250 | 2.0 ]" );
trace( "  " );
trace( "  " );
trace( "  VERSION - template.txt[ Template: Flashtalking - Base, AdApp: 1.1.99, AdHtml: v2.6.2, Instance: 08/25/16 10:06am ]" );
trace( "----------------------------------------------------------------------------------------------------------------------------" );









/* -- CORE: PrepareCore_new.js-----------------------------------------------------------------------------------------
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
	D.agentString = undefined;
	D.brand = 'unknown';
	D.product = 'unknown';
	D.type = undefined;
	D.os = 'unknown';
	D.osVersion = 'unknown';
	D.browser = undefined;
	D.browserVersion = undefined;
	D.windowWidth = undefined;
	D.windowHeight = undefined;
	D.orientation = undefined;
	D.pixelRatio = undefined;
	D.canAutoPlayVideo = false;
	D.documentTouch = undefined;
	D.init = function() {
		trace( 'Device.init()')

		D.agentString = navigator.userAgent;
		D.documentTouch = window.DocumentTouch;
		getDeviceType();
 
		var productMatches = {
			apple: 		/ip(hone|od|ad)|(mac)/gi.exec( D.agentString ),
			microsoft: 	/(windows)|(windows phone)/i.exec( D.agentString ),
			nt: 			/\sNT\s/i.exec( D.agentString ),
			windowsPhone: 	/windows phone/i.exec( D.agentString ),
			android: 		/android/i.exec( D.agentString ),
			chromeOS: 	/CrOS/.exec( D.agentString ),
			blackberry: 	/blackberry/i.exec( D.agentString )
		};
		if( productMatches.apple ) {
			D.brand = 'apple';
			D.product = productMatches.apple[ 0 ].toLowerCase();

			if( D.product == 'ipad' ) {
				window.ondevicemotion = function( event ) {
					D.product = event.acceleration ? window.devicePixelRatio == 2 ? 'ipad3' : 'ipad2' : 'ipad1' ;
					window.ondevicemotion = null;
				}
			}
			if( D.product == 'mac' ) {
				D.os = 'osx';
				var osVersionMatch = /10[\.\_\d]+/.exec( D.agentString );
				if( osVersionMatch )
					D.osVersion = osVersionMatch[ 0 ];

				if( /[\_]/.test( D.osVersion )) 
					D.osVersion = D.osVersion.split( '_' ).join( '.' );
			} 
			else {
				D.os = 'ios';
				var uaindex = D.agentString.indexOf( 'OS ' );
				if( uaindex > -1 ) 
					D.osVersion = D.agentString.substr( uaindex + 3, 3 ).replace( '_', '.' );
			}
		} 
		else if( productMatches.microsoft ) {
			D.brand = 'microsoft';
			D.os = 'windows';
			D.product = productMatches.microsoft[ 0 ].toLowerCase();

			if( productMatches.nt ) {
				var windowsVersions = [ { signature: '5.1',  name: 'xp'    }, { signature: '5.2',  name: 'xp'    }, { signature: '6.0',  name: 'vista' }, { signature: '6.1',  name: '7'     }, { signature: '6.2',  name: '8'     }, { signature: '6.3',  name: '8.1'   }, { signature: '10.0', name: '10'    }
				];
				var osVersionMatch = /nt\s[^(\)|;)]*/i.exec( D.agentString );
				if( osVersionMatch ) {
					var versionNumber = osVersionMatch[ 0 ].replace( 'NT ', '' );
					for( var i = 0; i < windowsVersions.length; i++ ) {
						if( versionNumber === windowsVersions[ i ].signature ) {
							D.osVersion = windowsVersions[ i ].name;
							D.type = 'desktop'
							break;
						}
					}
				}
			} 
			else if( productMatches.windowsPhone ) {
				var osVersionMatch = /windows\sphone\s[^;]*/i.exec( D.agentString );
				if( osVersionMatch )
					D.osVersion = osVersionMatch[ 0 ].replace( 'Windows Phone ', '' );
			} 
		}
		else if( productMatches.android ) {
			D.brand = D.product = D.os = 'android';
			D.osVersion = D.agentString.substr( 
				D.agentString.indexOf( 'Android ' ) + 8, 3
			);
		} 
		else if( productMatches.chromeOS ) {
			D.brand = D.product = D.os = 'chromeos';
			var osVersionMatch = /CrOS\s\S+\s(\d+\.\d+\.\d+)/.exec( D.agentString );
			if( osVersionMatch )
				D.osVersion = osVersionMatch[ 1 ];
			D.type = 'desktop';
		}
		else if( productMatches.blackberry ) {
			D.product = productMatches.blackberry[ 0 ].toLowerCase();
			D.brand = 'rim';
		} 

		D.pixelRatio = window.devicePixelRatio || 'unknown';
		D.getOrientation();

		getBrowserVersion();
		testAutoPlayVideo();
	}
	D.trace = function() {
		trace( 'Device.trace()' );
		trace( '------------------------------------------------' );
		trace( ' AGENT( ' + D.agentString + ' )' );
		trace( '  Brand:\t\t\t\t' + D.brand );
		trace( '  Product:\t\t\t' + D.product );
		trace( '  Type:\t\t\t\t' + D.type );
		trace( '  Os:\t\t\t\t' + D.os + '( ' + D.osVersion + ' )' );
		trace( '  Browser:\t\t\t' + D.browser + '( ' + D.browserVersion + ' )' );
		trace( '  Window: \t\t\t' + D.windowWidth + 'x' + D.windowHeight );
		trace( '  Orientation:\t\t' + D.orientation );
		trace( '  Pixel Ratio:\t\t' + D.pixelRatio );
		trace( '  Document Touch:\t', D.documentTouch )
		trace( '  Auto Play Video:\t' + D.canAutoPlayVideo );
		trace( '------------------------------------------------' );
	}
	D.getOrientation = function() {
		D.getScreenResolution();
		D.orientation = D.windowWidth > D.windowHeight ? 'landscape' : 'portrait';
		return D.orientation;
	}
	D.getScreenResolution = function() {
		if ( D.brand !== 'apple' ) {
			D.windowWidth = window.width || window.innerWidth;
			D.windowHeight = window.height || window.innerHeight;
		} else {
			D.windowWidth = window.innerWidth;
			D.windowHeight = window.innerHeight;
		}
		return {
			width: D.windowWidth,
			height: D.windowHeight
		}
	}

	function getDeviceType(){
		var isMobile = false;
		(function( a ) {
			var regex = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i;
			if( a.substr( 0, 4 ).match( regex ))
				isMobile = true;
		})( D.agentString || navigator.vendor || window.opera );
		if( D.agentString.match( /ipad/i )) 
			isMobile = false;

		D.type = D.agentString.match( /intel mac/i ) ? 'desktop' : isMobile ? 'mobile' : 'tablet';
	}

	function getBrowserVersion(){
		var versionMatch;
		var agentMatches = D.agentString.match( /(fban|fbav|opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i );
		if( !agentMatches ) return;
		if( agentMatches[ 1 ].match( /trident/i )) {
			D.browser = 'ie';
			var versionMatch = /\brv[ :]+(\d+)/g.exec( D.agentString );
			if( versionMatch )
				D.browserVersion = versionMatch[ 1 ];
			return;
		} 
		versionMatch = D.agentString.match( /\bOPR\/([0-9\.]+)/ );
		if( agentMatches[ 1 ] == 'Chrome' && versionMatch ) {
			D.browser = 'opera';
			D.browserVersion = versionMatch[ 1 ];
			return;
		}  
		versionMatch = D.agentString.match( /\bCriOS\/([0-9\.]+)/ );
		if( versionMatch ) {
			D.browser = 'chrome';
			D.browserVersion = versionMatch[ 1 ];
			return;
		}
		if( agentMatches[ 1 ].match( /msie/i )) {
			D.browser = 'ie';
			D.browserVersion = agentMatches[ 2 ];
			return;
		}
		if( agentMatches[ 1 ].match( /safari/i )) {
			D.browser = 'safari';
			versionMatch = D.agentString.match( /\sversion\/([0-9\.]+)\s/i );
			if( versionMatch )
				D.browserVersion = versionMatch[ 1 ];
			return;
		}
		D.browser = agentMatches[ 1 ].toLowerCase();
		versionMatch = D.agentString.match( new RegExp( D.browser + '\/([0-9\.]+)', 'i' ));
		if( versionMatch ) {
			D.browserVersion = versionMatch[ 1 ];
		}
	}

	function testAutoPlayVideo(){
		var timeout;
		var elem = document.createElement('video');
		elem.setAttribute('autoplay', '');
		elem.style.cssText = 'position:absolute; height:0; width:0; display:none';

		function handleTimeout ( event ) {
			clearTimeout(timeout);
			elem.removeEventListener('playing', handleTimeout, false);
			D.canAutoPlayVideo = (event != undefined) && (!elem.paused || elem.currentTime != 0);
			elem.parentNode.removeChild(elem);
		}
		
		elem.src = 'data:video/mp4;base64,AAAAHGZ0eXBtcDQyAAAAAG1wNDJpc29tYXZjMQAAAz5tb292AAAAbG12aGQAAAAAzaNacc2jWnEAAV+QAAFfkAABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAGGlvZHMAAAAAEICAgAcAT////3//AAACQ3RyYWsAAABcdGtoZAAAAAHNo1pxzaNacQAAAAEAAAAAAAFfkAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAEAAAABAAAAAAAd9tZGlhAAAAIG1kaGQAAAAAzaNacc2jWnEAAV+QAAFfkFXEAAAAAAAhaGRscgAAAAAAAAAAdmlkZQAAAAAAAAAAAAAAAAAAAAGWbWluZgAAABR2bWhkAAAAAQAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAABVnN0YmwAAACpc3RzZAAAAAAAAAABAAAAmWF2YzEAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAEAAQAEgAAABIAAAAAAAAAAEOSlZUL0FWQyBDb2RpbmcAAAAAAAAAAAAAAAAAAAAAAAAY//8AAAAxYXZjQwH0AAr/4QAZZ/QACq609NQYBBkAAAMAAQAAAwAKjxImoAEABWjOAa8gAAAAEmNvbHJuY2xjAAYAAQAGAAAAGHN0dHMAAAAAAAAAAQAAAAUAAEZQAAAAKHN0c3oAAAAAAAAAAAAAAAUAAAIqAAAACAAAAAgAAAAIAAAACAAAAChzdHNjAAAAAAAAAAIAAAABAAAABAAAAAEAAAACAAAAAQAAAAEAAAAYc3RjbwAAAAAAAAACAAADYgAABaQAAAAUc3RzcwAAAAAAAAABAAAAAQAAABFzZHRwAAAAAAREREREAAAAb3VkdGEAAABnbWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAbWRpcgAAAAAAAAAAAAAAAAAAAAA6aWxzdAAAADKpdG9vAAAAKmRhdGEAAAABAAAAAEhhbmRCcmFrZSAwLjkuOCAyMDEyMDcxODAwAAACUm1kYXQAAAHkBgX/4NxF6b3m2Ui3lizYINkj7u94MjY0IC0gY29yZSAxMjAgLSBILjI2NC9NUEVHLTQgQVZDIGNvZGVjIC0gQ29weWxlZnQgMjAwMy0yMDExIC0gaHR0cDovL3d3dy52aWRlb2xhbi5vcmcveDI2NC5odG1sIC0gb3B0aW9uczogY2FiYWM9MCByZWY9MSBkZWJsb2NrPTE6MDowIGFuYWx5c2U9MHgxOjAgbWU9ZXNhIHN1Ym1lPTkgcHN5PTAgbWl4ZWRfcmVmPTAgbWVfcmFuZ2U9NCBjaHJvbWFfbWU9MSB0cmVsbGlzPTAgOHg4ZGN0PTAgY3FtPTAgZGVhZHpvbmU9MjEsMTEgZmFzdF9wc2tpcD0wIGNocm9tYV9xcF9vZmZzZXQ9MCB0aHJlYWRzPTYgc2xpY2VkX3RocmVhZHM9MCBucj0wIGRlY2ltYXRlPTEgaW50ZXJsYWNlZD0wIGJsdXJheV9jb21wYXQ9MCBjb25zdHJhaW5lZF9pbnRyYT0wIGJmcmFtZXM9MCB3ZWlnaHRwPTAga2V5aW50PTUwIGtleWludF9taW49NSBzY2VuZWN1dD00MCBpbnRyYV9yZWZyZXNoPTAgcmM9Y3FwIG1idHJlZT0wIHFwPTAAgAAAAD5liISscR8A+E4ACAACFoAAITAAAgsAAPgYCoKgoC+L4vi+KAvi+L4YfAEAACMzgABF9AAEUGUgABDJiXnf4AAAAARBmiKUAAAABEGaQpQAAAAEQZpilAAAAARBmoKU';

		document.getElementsByTagName( 'body' )[0].appendChild(elem);
		setTimeout(function() {
			elem.addEventListener('playing', handleTimeout, false);
			timeout = setTimeout(handleTimeout, 1000);
		}, 0);		
	}

}









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
var Align = (function(){
	function move ( mode, source, offset, offset2 ) {
		Styles.setCss( Markup.getElement( source ), calculate ( mode, source, offset, offset2 ));
	}
	function moveX ( mode, source, offset ) {
		if ( mode == Align.TOP || mode == Align.BOTTOM ){
			return;
		}
		var obj = calculate ( mode, source, offset );
		delete obj.top;
		Styles.setCss( Markup.getElement( source ), obj );
	}
	function moveY ( mode, source, offset ) {
		if ( mode == Align.LEFT || mode == Align.RIGHT ) {
			return;
		}
		var off1 = 0;
		var off2 = offset;
		if ( mode == Align.TOP || mode == Align.BOTTOM ){
			off1 = offset;
		}

		var obj = calculate ( mode, source, off1, off2 );
		delete obj.left;
		Styles.setCss( Markup.getElement( source ), obj );
	}
	function calculate ( mode, source, offset, offset2 ) {
		var elem = Markup.getElement( source );
		offset = offset || 0;
		offset2 = offset2 || 0;
		var off = [ offset, offset2 ];
		if ( mode == Align.TOP || mode == Align.BOTTOM ){
			off = [ 0, offset ];
		} else if ( mode == Align.LEFT || mode == Align.RIGHT ){
			off[1] = 0;
		}

		return {
			left : horizontal ( mode, elem.offsetWidth, elem.parentNode.offsetWidth ) + off[0],
			top : vertical ( mode, elem.offsetHeight, elem.parentNode.offsetHeight ) + off[1]
		}
	}
	function horizontal ( mode, source, target ) {
		mode = mode || Align.CENTER;
		var x = 0;
		switch ( mode ){
			case Align.BOTTOM_RIGHT :
			case Align.RIGHT :
			case Align.TOP_RIGHT :
				x = target - source;
				break;
			case Align.CENTER :
			case Align.TOP :
			case Align.BOTTOM :
				x = (target - source) / 2;
				break;
			default :
				x = 0;
		}
		return x;
	}
	function vertical ( mode, source, target ) {
		mode = mode || Align.CENTER;
		var y = 0;
		switch ( mode ){
			case Align.BOTTOM :
			case Align.BOTTOM_LEFT :
			case Align.BOTTOM_RIGHT :
				y = target - source;
				break;
			case Align.CENTER :
			case Align.LEFT :
			case Align.RIGHT :
				y = (target - source) / 2;
				break;
			default:
				y = 0;
		}
		return y;
	}

	return {
		BOTTOM 			: 	'alignBottom',
		BOTTOM_LEFT		: 	'alignBottomLeft',
		BOTTOM_RIGHT	: 	'alignBottomRight',
		CENTER 			: 	'alignCenter',
		LEFT 			: 	'alignLeft',
		RIGHT 			: 	'alignRight',
		TOP 			: 	'alignTop',
		TOP_LEFT 		: 	'alignTopLeft',
		TOP_RIGHT 		: 	'alignTopRight',


		move 			: 	move,
		moveX			: 	moveX,
		moveY			: 	moveY,
		calculate		: 	calculate,

		horizontal 		: 	horizontal,
		vertical 		: 	vertical,
		centerHorizontal : function ( target, offset, setValue ){
			return setValue ? calculate ( Align.CENTER, target, offset ).left : moveX ( Align.CENTER, target, offset );
		},
		centerVertical : function ( target, offset, setValue ){
			var elem = Markup.getElement( target );
			offset = offset || 0;
			var val = vertical ( Align.CENTER, elem.offsetHeight, elem.parentNode.offsetHeight ) + offset;
			return setValue ? val : Styles.setCss( elem, { top:val });
		},
		left : function ( target, offset, setValue ){
			return setValue ? calculate ( Align.LEFT, target, offset ).left : moveX ( Align.LEFT, target, offset );
		},
		right : function ( target, offset, setValue ){
			return setValue ? calculate ( Align.RIGHT, target, offset ).left : moveX ( Align.RIGHT, target, offset );
		},
		top : function ( target, offset, setValue ){
			return setValue ? calculate ( Align.TOP, target, offset ).top : moveY ( Align.TOP, target, offset );
		},
		bottom : function ( target, offset, setValue ){
			return setValue ? calculate ( Align.BOTTOM, target, offset ).top : moveY ( Align.BOTTOM, target, offset );
		}
	}
})();









/* -- CORE: UIComponent.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
function UIComponent ( arg ){
		
	var _enabled = true;
	var _showing = false;
	var U = document.createElement('div');

	arg = arg || {}
	if ( arg.id ) 
		U.id = arg.id;
	Styles.setCss( U, arg.css );
	if ( arg.target ) 
		arg.target.appendChild( U );
	Object.defineProperty ( U, 'x', {
		get: function() {
			return +getTransformMatrix()[4]
		},
		set: function ( value ) {
			Styles.setCss ( U, { x : value })
		}
	});
	Object.defineProperty ( U, 'y', {
		get: function() {
			return +getTransformMatrix()[5]
		},
		set: function ( value ) {
			Styles.setCss ( U, { y : value })
		}
	});
	Object.defineProperty ( U, 'width', {
		get: function() {
			return U.offsetWidth;;
		},
		set: function ( value ) {
			Styles.setCss ( U, { width : value })
		}
	});
	Object.defineProperty ( U, 'height', {
		get: function() {
			return U.offsetHeight;
		},
		set: function ( value ) {
			Styles.setCss ( U, { height : value })
		}
	});
	Object.defineProperty ( U, 'enabled', {
		get: function() {
			return _enabled;
		},
		set: function ( state ) {
			_enabled = state;
			U.dispatchEvent ( new CustomEvent( 'uiComponentEnabled' ))
		}
	});
	Object.defineProperty ( U, 'showing', {
		get: function() {
			return _showing;
		},
		set: function(){
			trace ( ':: WARNING ::\n\n\tUIComponent.showing cannot be set.\n\n' )
		}
	});
	function getTransformMatrix () {
		return window.getComputedStyle( U, null ).getPropertyValue( 'transform' ).replace(/[\s\(\)matrix]/g, '').split(',')
	}
	U.hide = function (){
		U.style.display = 'none';
		_showing = true;
	}
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
	U.setCss = function( args ) {
		Styles.setCss ( U, args )
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
	U.enabled = true;

	return U;
}










/* -- CORE: UIImage.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
function UIImage ( arg ){
	Styles.createClass ( 'uiImage', 
		'ui-image', 'position:absolute; background-repeat:no-repeat; background-size:cover;'
	)
	var _source = null;
	var _css = arg.css || {}
	if ( !arg.source ) throw new Error ( "UIImage : No image source set on '" + arg.id + "'" );
	
	var _source = ImageManager.get ( arg.source );
	
	arg.css = arg.css || {};
	arg.css.width = arg.css.width != undefined ? arg.css.width : _source.width;
	arg.css.height = arg.css.height != undefined ? arg.css.height : _source.height;
	arg.css.backgroundImage = _source.src;
	
	var U = new UIComponent ( arg );
	Styles.addClass ( U, 'ui-image' );
	Object.defineProperty ( U, 'source', {
		get: function() {
			return _source;
		},
		set: function(value) {
			_source = value;
			U.style.backgroundImage = 'url(' + ImageManager.get ( value ).src + ')';
		}
	});
	U.toString = function(){
		return '[object UIImage]';
	}
	
	return U;
}









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
}

FrameRateBase.prototype = {
	resume : function(){
		var F = this;
		if ( F._isPaused ){
			F._startTime = Date.now();
			F._prevTime = _startTime;
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
			F._prevTime += diffTime;

			var elapsedTime = F._prevTime - F._startTime;
			var future = elapsedTime - F._nextTime;  

			if ( future > 0 ){
				F._nextTime += ( future >= F._frameTime ) ? future : F._frameTime ;
				call = true;
			}
			if ( call ) F.dispatch();
		}
	},

	dispatch : function(){
		var F = this;
		for ( var i = 0; i < F.pool.length; i++ ){
			var obj = F.pool[i];
			obj.handler.call(obj.from);
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

		var rect = event.target.getBoundingClientRect();
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











/* -- CORE IMPLEMENTED: Border.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
function Border ( id, target, size, color, alpha, zIndex ) {
	Styles.createClass ( 'RED_Border', 
		'border-left, border-right', 'position:absolute; height:100%;',
		'border-top, border-bottom', 'position:absolute; width:100%;',
		'border-top', 'top:0px;',
		'border-bottom', 'bottom:0px;',
		'border-left', 'top:0px;',
		'border-right', 'right:0px; top:0px;'
	)
	var _container = Markup.getElement( target );
	var _size = size;
	alpha = alpha ? ' opacity: ' + alpha + ';' : '';
	zIndex = zIndex ? ' z-index: ' + zIndex + ';' : '';

	var labels = [ 'top', 'right', 'bottom', 'left' ];
	for ( var i = 0; i < 4; i++ ){
		var str = (i % 2 ? 'width' : 'height') + ':' + _size + 'px; '
		str += 'background-color: ' + color + ';' + alpha + zIndex;

		var d = document.createElement('div');
		d.id = id + '-' + i;
		d.style.cssText = str;
		Styles.addClass ( d, 'border-' + labels[i] )
		_container.appendChild(d);

		this [ labels[i] ] = d;
	}
	Object.defineProperty ( this, 'container', {
		get: function() {
			return _container;
		}
	});

	Object.defineProperty ( this, 'size', {
		get: function() {
			return _size;
		},
		set: function(value) {
			_size = value;
			for ( var i = 0; i < 4; i++ ){
				var key = i % 2 ? 'width' : 'height';
				Styles.setCss ( this [ labels[i] ], key, _size )
			}
		}
	});	

}










/* -- CORE IMPLEMENTED: TextUtils.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var TextUtils = new function() {
	var self = this;

	self.autosizeTF = function( target, fontAdjustmentFactor ) {
		var elem = undefined;
		if( target.id ) elem = Markup.getElement( target );
		else elem = target.textfield;

		var elemParent = Markup.getParent( elem );
		fontAdjustmentFactor = fontAdjustmentFactor || 1;

		var currentFontSize = undefined;
		var lineHeightAdustment = undefined;

		var maxWidth = Styles.getWidth( elemParent );
		if( Styles.getWidth( elem ) > maxWidth ) {
			while( Styles.getWidth( elem ) > maxWidth ) {
		  		currentFontSize = currentFontSize === undefined ? Styles.getCss( elem, 'font-size' ) : currentFontSize - 1;

		  		Styles.setCss( elem, 'font-size', currentFontSize );

		  		lineHeightAdustment = currentFontSize * fontAdjustmentFactor;
		  		Styles.setCss( elem, 'line-height', lineHeightAdustment );
		  	}
		}

		var maxHeight = Styles.getHeight( elemParent );
		if( Styles.getHeight( elem ) > maxHeight ) {
			while( Styles.getHeight( elem ) > maxHeight ) {
		  		currentFontSize = currentFontSize === undefined ? Styles.getCss( elem, 'font-size' ) : currentFontSize - 1;

		  		Styles.setCss( elem, 'font-size', currentFontSize );

		  		lineHeightAdustment = currentFontSize * fontAdjustmentFactor;
		  		Styles.setCss( elem, 'line-height', lineHeightAdustment );
		  	}
		}

		if( Styles.getWidth( elem ) > maxWidth || Styles.getHeight( elem ) > maxHeight ) TextUtils.autosizeTF( elem );
		else return currentFontSize ? currentFontSize : Styles.getCss( elem, 'font-size' );
	}

	self.fitContainerToText = function( target, fitWidth, fitHeight ) {
		var elem = Markup.getElement( target );

		if( fitWidth ) {
			var textWidth = Styles.getWidth( target.textfield );
			Styles.setCss( target.parent, 'width', textWidth );
			var newContainerWidth = parseInt( textWidth );
			Styles.setCss( target.container, 'width', newContainerWidth );
		}
		
		if( fitHeight ) {
			var textHeight = Styles.getHeight( target.textfield );
			Styles.setCss( target.parent, 'height', textHeight );
			Styles.setCss( target.container, 'height', textHeight );
		}
	}
	self.matchTeamNameSize = function( team1Element, team2Element ) {
		var team1FontSize = TextUtils.autosizeTF( team1Element );
		var team2FontSize = TextUtils.autosizeTF( team2Element );
		var smallestFontSize = team1FontSize > team2FontSize ? team2FontSize : team1FontSize;

		Styles.setCss( team1Element, { fontSize: smallestFontSize } );
		Align.moveX( Align.CENTER, team1Element );
		Styles.setCss( team2Element, { fontSize: smallestFontSize } );
		Align.moveX( Align.CENTER, team2Element );
	}
	self.addText = function ( target, txt ) {
		var elem = typeof target === 'string' ? Markup.getElement( target ) : target;
		elem.innerHTML = txt;
	}
	self.hasText = function( target ) {
		var elem = typeof target === 'string' ? Markup.getElement( target ) : target;
		return elem.innerHTML.length > 0;
	}
	self.numlines = function( target ) {
		var elem = typeof target === 'string' ? Markup.getElement( target ) : target;
		return Styles.getCss( target, 'height') / Styles.getCss( target, 'line-height');
	}
	self.addSpaces = function( numberOfSpaces ) {
		var spacingString = '';
		for( var i = 0; i < numberOfSpaces; i++ ) {
			spacingString += '&nbsp;'
		}
		return spacingString;
	}
	self.getSpecialCharacter = function( requestedCharacter, isCapital ) {
		requestedCharacter = global.proxyStringToLowerCase.apply( requestedCharacter );
		for( var i = 0; i < self.specialChars.length; i++ ) {
			var currentLabel = global.proxyStringToLowerCase.apply( self.specialChars[ i ].label );

			if( currentLabel === requestedCharacter ) return isCapital ? self.specialChars[ i ].upperCase : self.specialChars[ i ].lowerCase;
		}
		return false;
	}
	self.specialCharacters = [ { label: 'iexcl', upperCase: '&#161;', lowerCase: '&#161;' }, { label: 'trademark', upperCase: '&#153;', lowerCase: '&#153;' }, { label: 'copyright', upperCase: '&#169;', lowerCase: '&#169;' }, { label: 'registered', upperCase: '&#174;', lowerCase: '&#174;' }, { label: 'nTilde', upperCase: '&#209;', lowerCase: '&#241;' }, { label: 'aAccent', upperCase: '&#193;', lowerCase: '&#225;' }, { label: 'eAccent', upperCase: '&#201;', lowerCase: '&#233;' }, { label: 'iAccent', upperCase: '&#205;', lowerCase: '&#237;' }, { label: 'oAccent', upperCase: '&#211;', lowerCase: '&#243;' }, { label: 'uAccent', upperCase: '&#218;', lowerCase: '&#250;' }	
	];
	self.trimStartAndEnd = function( target ) {
		return target ? target.replace( /^\s\s*/, '' ).replace( /\s\s*$/, '' ) : '';
	}
	self.removeSpaces = function( str ) {
		return str.split(' ').join('');
	}
	self.pad = function( _target, _count ) {
		var _sign = '';
		if( _target < 0 ) _sign = '-'
	    _target = _target.toString().replace( /\-/, '', _target );
	    while( _target.length < _count )
	        _target = '0' + _target;
	    return _sign + _target;
	}	
}










/* -- CORE IMPLEMENTED: CanvasDrawer.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
/*
Version 16.06.16
*/

var CanvasDrawer = new function() {

	this.create = function(containerData) {
		var _css = {
			left: 0,
			top: 0,
			width: (containerData.css && containerData.css.width) ? containerData.css.width : Styles.getCss(containerData.target, 'width') || adParams.adWidth,
			height: (containerData.css && containerData.css.height) ? containerData.css.height : Styles.getCss(containerData.target, 'height') || adParams.adHeight,
			background: containerData.debug === true ? 'green' : '',
			display: 'inherit',
			position: 'absolute',
			pointerEvents: 'none'
		};

		if (containerData.css)
			for (var cssItem in containerData.css) _css[cssItem] = containerData.css[cssItem];

		return new CanvasDrawerStage('cd_' + containerData.id, containerData.target, _css, containerData.styles || '', containerData.display === false ? false : true, containerData.retina === true ? 2 : 1);
	}
};









/* -- CORE IMPLEMENTED: CanvasBlendMode.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var CanvasBlendMode = new(function() {
	return {
		NONE: 'source-over',
		UNDER: 'destination-over',
		SOURCE_IN: 'source-in',
		SOURCE_OUT: 'source-out',
		SOURCE_ATOP: 'source-atop',
		DEST_IN: 'destination-in',
		DEST_OUT: 'destination-out',
		DEST_ATOP: 'destination-atop',
		XOR: 'xor',
		COPY: 'copy',
		ADD: 'lighter',
		DARKEN: 'darken',
		LIGHTEN: 'lighten',
		OVERLAY: 'overlay',
		MULTIPLY: 'multiply',
		SCREEN: 'screen',
		DODGE: 'color-dodge',
		BURN: 'color-burn',
		HARD: 'hard-light',
		SOFT: 'soft-light',
		DIFFERENCE: 'difference',
		EXCLUSION: 'exclusion',
		HUE: 'hue',
		SATURATION: 'saturation',
		COLOR: 'color',
		LUMINOSITY: 'luminosity'

	}
})();









/* -- CORE IMPLEMENTED: CanvasDrawType.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var CanvasDrawType = new function() {
	return {
		IMAGE: 'image',
		PATH: 'path',
		RECT: 'rect',
		TEXT: 'text',
		CIRC: 'arc',
		REPEAT: 'repeat',
		REPEAT_X: 'repeat-x',
		REPEAT_Y: 'repeat-y',
		REPEAT_NONE: 'no-repeat',
	}
};









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
		global.ftData = new FtData();

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
	this.skipQuiz = getParameterByName('skipQuiz') == 'true' ? true : false;	// -- DEBUG
	this.guideLabel = '';
	this.guide = this.guideLabel ? ImageManager.addToLoad( this.guideLabel + '.jpg', adParams.imagesPath ) : '';
	this.videoMuted = false;
	this.videoIDs = [
		'video1',
		'video2',
		'video3',
		'video4',
		'video5',
	];
	this.curVideoPlayer;
	this.primaryFont = 'Flama-ExtraBold-optimized';
	this.secondaryFont = 'Flama-ExtraboldItalic-optimized';
	this.tertiaryFont = 'Flama-BoldItalic-ALLCAPS';
	this.quaternaryFont = 'Flama-BookItalic-optimized';
	this.huluColors = {
		primaryGreen: '#66AA33',
		secondaryGreen: '#99CC33',
		tertiaryGreen: '#41811E',
		black: '#222222',
		darkGrey: '#666666',
		lightGrey: '#E8E8E8',
	}
	this.greyColor = '#212221';
	this.wrongColor = '#f30009';
	this.whiteColor = '#ffffff';

	this.userInteracted = false;



	this.autoplay = true;			// -- toggles between autoplay units and non-autoplay units
	this.introText1 = ftData.introText1;
	this.introText2 = ftData.introText2;
	this.startCTA = ftData.startCTA.toUpperCase();
	this.quizHeader = ftData.quizHeader;
	this.getReady = ftData.getReady;
	this.quizCTA = ftData.quizCTA;
	this.continueCTA = ftData.continueCTA.toUpperCase();
	this.quizTimerTicking = false;
	this.score = 0;
	this.questionTime = 7;
	this.questionQuickResolveTime = 0.25;
	this.questions = [];
	var curLabel;
	var maxQuestions = 5;
	var i;
	for ( i = 0; i < maxQuestions; i++ ) {
		curLabel = 'question' + (i + 1);
		if ( ftData[curLabel + 'Image'] ) {
			this.questions.push({
				id: curLabel,
				question: ftData[curLabel],
				answer: ftData[curLabel + 'CorrectAnswer'],
				answers: [
					ftData[curLabel + 'answerA'].toUpperCase(),
					ftData[curLabel + 'answerB'].toUpperCase(),
					ftData[curLabel + 'answerC'].toUpperCase(),
					ftData[curLabel + 'answerD'].toUpperCase(),
				],
				image: ImageManager.addToLoad( ftData[curLabel + 'Image'], adParams.adPath ),
				video: ''
			});
		}
	}

	this.totalIntroImages = parseInt(ftData.totalIntroImages) > this.questions.length ? this.questions.length : parseInt(ftData.totalIntroImages);
	this.resultText1Good = ftData.resultText1Good;
	this.resultText1Ok = ftData.resultText1Ok;
	this.resultText1Bad = ftData.resultText1Bad;
	this.resultText2Good = ftData.resultText2Good;
	this.resultText2Ok = ftData.resultText2Ok;
	this.resultText2Bad = ftData.resultText2Bad;


	this.resultText = function(num) {
		var resultText = this.score < 2 ? this['resultText' + num + 'Bad'] : this.score < this.questions.length ? this['resultText' + num + 'Ok'] : this['resultText' + num + 'Good'];
		return resultText;
	}
	this.endframeHeadline = ftData.endframeHeadline.toUpperCase();
	this.endframeOnHulu = ftData.endframeOnHulu.toUpperCase();
	this.endframeCTA1 = ftData.endframeCTA1;
	this.endframeCTA2 = ftData.endframeCTA2;
	this.replay = ftData.replay;
	this.endframeImages = [];
	this.endframeURLs = [];
	var maxEndframeImages = 20;
	for ( i = 0; i < maxEndframeImages; i++ ) {
		curLabel = 'endframeImage' + (i + 1);
		if ( ftData[curLabel] ) {
			this.endframeImages.push(ImageManager.addToLoad( ftData[curLabel], adParams.adPath ));
			this.endframeURLs.push( ftData['endframeImageUrl' + (i + 1)] );
		}
	}


	this.networkExit = function ( argsClickTag ) {
		var exitClickTag = argsClickTag ? argsClickTag : clickTag;
		Network.exit( exitClickTag );
		if ( this.curVideoPlayer )
			this.curVideoPlayer.onPlayPause(true);
		else if ( this.quizTimerTicking ) {
			adData.userInteracted = false;
			adData.elements.quiz.pause();
		}
	}



	function getParameterByName(name, url) {
	    if (!url) url = window.location.href;
	    name = name.replace(/[\[\]]/g, "\\$&");
	    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	        results = regex.exec(url);
	    if (!results) return null;
	    if (!results[2]) return '';
	    return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

	this.isMobile = (Device.type != 'desktop')?true:false;
	trace('!!!!!!!!! IS THIS DEVICE ON MOBILE !!!!!!!',this.isMobile)

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



















/* -- COMMON IMPLEMENTED: FtData.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
function FtData() {
	this.validateImagePath = function( target ) {
		if( target == '' || target.indexOf( 'null' ) > -1 || target.indexOf( 'ftBlankGif' ) > -1 )
			return null;
		else if( remoteControl.debug ) 
			return target.replace( /\.\.\//g, '' );
		else return target;
	}
	this.introText1 = myFT.instantAds.intro_text_1 || 'Think you know your TV?';
	this.introText2 = myFT.instantAds.intro_text_2 || 'Let’s find out.';
	this.totalIntroImages = myFT.instantAds.total_intro_images || '4';
	this.startCTA = myFT.instantAds.start_cta || 'START PLAYING';
	this.continueCTA = myFT.instantAds.continueCTA || 'CONTINUE PLAYING';
	this.getReady = myFT.instantAds.get_ready || 'GET READY TO GUESS THE SHOW!';
	this.quizHeader = myFT.instantAds.quiz_header || 'If You Know TV...';
	this.quizCTA = myFT.instantAds.quiz_cta || 'Start Your Free Trial';//'Make Fall Yours. Start Your Free Trial';
	this.question1 = myFT.instantAds.question_1 || 'Then you should know this show';
	this.question1answerA = myFT.instantAds.question_1_answer_a || 'SEINFELD';
	this.question1answerB = myFT.instantAds.question_1_answer_b || 'CHEERS';
	this.question1answerC = myFT.instantAds.question_1_answer_c || "THREE'S COMPANY";
	this.question1answerD = myFT.instantAds.question_1_answer_d || "DAWSON'S CREEK";
	this.question1CorrectAnswer = myFT.instantAds.question_1_correct_answer || 'A';
	this.question2 = myFT.instantAds.question_2 || 'Then you should know this show';
	this.question2answerA = myFT.instantAds.question_2_answer_a || 'CHICAGO P.D.';
	this.question2answerB = myFT.instantAds.question_2_answer_b || 'CSI';
	this.question2answerC = myFT.instantAds.question_2_answer_c || 'MURDER IN THE FIRST';
	this.question2answerD = myFT.instantAds.question_2_answer_d || 'BLINDSPOT';
	this.question2CorrectAnswer = myFT.instantAds.question_2_correct_answer || 'D';
	this.question3 = myFT.instantAds.question_3 || 'Then you should know this movie';
	this.question3answerA = myFT.instantAds.question_3_answer_a || 'PROJECT ALMANAC';
	this.question3answerB = myFT.instantAds.question_3_answer_b || 'TERMINATOR GENISYS';
	this.question3answerC = myFT.instantAds.question_3_answer_c || 'TRANSFORMERS<br>AGE OF EXTINCTION';
	this.question3answerD = myFT.instantAds.question_3_answer_d || 'SHAUN THE SHEEP:<br>THE MOVIE';
	this.question3CorrectAnswer = myFT.instantAds.question_3_correct_answer || 'B';
	this.question4 = myFT.instantAds.question_4 || 'Then you should know this show';
	this.question4answerA = myFT.instantAds.question_4_answer_a || 'NEW GIRL';
	this.question4answerB = myFT.instantAds.question_4_answer_b || 'PARKS AND RECREATION';
	this.question4answerC = myFT.instantAds.question_4_answer_c || 'THE MINDY PROJECT';
	this.question4answerD = myFT.instantAds.question_4_answer_d || 'SUPERSTORE';
	this.question4CorrectAnswer = myFT.instantAds.question_4_correct_answer || 'C';
	this.question5 = myFT.instantAds.question_5 || 'Then you should know this show';
	this.question5answerA = myFT.instantAds.question_5_answer_a || 'THE STRAIN';
	this.question5answerB = myFT.instantAds.question_5_answer_b || 'RESCUE ME';
	this.question5answerC = myFT.instantAds.question_5_answer_c || 'TIMELESS';
	this.question5answerD = myFT.instantAds.question_5_answer_d || 'HOMELAND';
	this.question5CorrectAnswer = myFT.instantAds.question_5_correct_answer || 'D';
	this.resultText1Good = myFT.instantAds.result_text_1_good || 'What-the-Whaa? You really know your TV!';
	this.resultText1Ok = myFT.instantAds.result_text_1_ok || 'Okay, okay. Not too bad.';
	this.resultText1Bad = myFT.instantAds.result_text_1_bad || 'Umm. Not exactly a TV genius, are you?';
	this.resultText2Good = myFT.instantAds.result_text_2_good || 'You got all of them right!';
	this.resultText2Ok = myFT.instantAds.result_text_2_ok || "But you've got some catching up to do.";
	this.resultText2Bad = myFT.instantAds.result_text_2_bad || 'Thank goodness we found you.';
	this.endframeHeadline = myFT.instantAds.endframe_headline || "THIS FALL DON'T JUST WATCH TV, MAKE IT YOURS";//"Check out the fall's coolest shows and movies on Hulu:";
	this.endframeOnHulu = myFT.instantAds.endframe_on_hulu || '';//"Check out the fall's coolest shows and movies on Hulu:";
	this.endframeCTA1 = myFT.instantAds.endframe_cta_1 || '';//'Make Fall Yours.';
	this.endframeCTA2 = myFT.instantAds.endframe_cta_2 || 'Start Your Free Trial';
	this.replay = myFT.instantAds.replay || 'REPLAY';
	this.endframeImageUrl1 = myFT.instantAds.endframe_image_1_url || 'http://www.hulu.com/start?show=seinfeld';
	this.endframeImageUrl2 = myFT.instantAds.endframe_image_2_url || 'http://www.hulu.com/start?show=blindspot';
	this.endframeImageUrl3 = myFT.instantAds.endframe_image_3_url || 'http://www.hulu.com/watch/958003';
	this.endframeImageUrl4 = myFT.instantAds.endframe_image_4_url || 'http://www.hulu.com/start?show=the-mindy-project';
	this.endframeImageUrl5 = myFT.instantAds.endframe_image_5_url || 'http://www.hulu.com/start?show=homeland';
	this.endframeImageUrl6 = myFT.instantAds.endframe_image_6_url || 'http://www.hulu.com/start';
	this.endframeImageUrl7 = myFT.instantAds.endframe_image_7_url || 'http://www.hulu.com/start';
	this.endframeImageUrl8 = myFT.instantAds.endframe_image_8_url || 'http://www.hulu.com/start';
	this.endframeImageUrl9 = myFT.instantAds.endframe_image_9_url || 'http://www.hulu.com/start';
	this.endframeImageUrl10 = myFT.instantAds.endframe_image_10_url || 'http://www.hulu.com/start';
	this.endframeImageUrl11 = myFT.instantAds.endframe_image_11_url || 'http://www.hulu.com/start';
	this.endframeImageUrl12 = myFT.instantAds.endframe_image_12_url || 'http://www.hulu.com/start';
	this.endframeImageUrl13 = myFT.instantAds.endframe_image_13_url || 'http://www.hulu.com/start';
	this.endframeImageUrl14 = myFT.instantAds.endframe_image_14_url || 'http://www.hulu.com/start';
	this.endframeImageUrl15 = myFT.instantAds.endframe_image_15_url || 'http://www.hulu.com/start';
	this.endframeImageUrl16 = myFT.instantAds.endframe_image_16_url || 'http://www.hulu.com/start';
	this.endframeImageUrl17 = myFT.instantAds.endframe_image_17_url || 'http://www.hulu.com/start';
	this.endframeImageUrl18 = myFT.instantAds.endframe_image_18_url || 'http://www.hulu.com/start';
	this.endframeImageUrl19 = myFT.instantAds.endframe_image_19_url || 'http://www.hulu.com/start';
	this.endframeImageUrl20 = myFT.instantAds.endframe_image_20_url || 'http://www.hulu.com/start';
	this.question1Image = this.validateImagePath( 
		myFT.instantAds.question_1_image || 'instantAssets/quiz_seinfeld.jpg'
	);
	this.question2Image = this.validateImagePath( 
		myFT.instantAds.question_2_image || 'instantAssets/quiz_blindspot.jpg'
	);
	this.question3Image = this.validateImagePath( 
		myFT.instantAds.question_3_image || 'instantAssets/quiz_terminatorgenisys.jpg'
	);
	this.question4Image = this.validateImagePath( 
		myFT.instantAds.question_4_image || 'instantAssets/quiz_mindyproject.jpg'
	);
	this.question5Image = this.validateImagePath( 
		myFT.instantAds.question_5_image || 'instantAssets/quiz_homeland.jpg'
	);
	this.endframeImage1 = this.validateImagePath( 
		myFT.instantAds.endframe_image_1 || 'instantAssets/thumb_seindfeld.jpg'
	);
	this.endframeImage2 = this.validateImagePath( 
		myFT.instantAds.endframe_image_2 || 'instantAssets/thumb_blindspot.jpg'
	);
	this.endframeImage3 = this.validateImagePath( 
		myFT.instantAds.endframe_image_3 || 'instantAssets/thumb_terminatorgenisys.jpg'
	);
	this.endframeImage4 = this.validateImagePath( 
		myFT.instantAds.endframe_image_4 || 'instantAssets/thumb_mindyproject.jpg'
	);
	this.endframeImage5 = this.validateImagePath( 
		myFT.instantAds.endframe_image_5 || 'instantAssets/thumb_homeland.jpg'
	);
	this.endframeImage6 = this.validateImagePath( 
		myFT.instantAds.endframe_image_6 || 'instantAssets/ftBlankGif.gif'
	);
	this.endframeImage7 = this.validateImagePath( 
		myFT.instantAds.endframe_image_7 || 'instantAssets/ftBlankGif.gif'
	);
	this.endframeImage8 = this.validateImagePath( 
		myFT.instantAds.endframe_image_8 || 'instantAssets/ftBlankGif.gif'
	);
	this.endframeImage9 = this.validateImagePath( 
		myFT.instantAds.endframe_image_9 || 'instantAssets/ftBlankGif.gif'
	);
	this.endframeImage10 = this.validateImagePath( 
		myFT.instantAds.endframe_image_10 || 'instantAssets/ftBlankGif.gif'
	);
	this.endframeImage11 = this.validateImagePath( 
		myFT.instantAds.endframe_image_11 || 'instantAssets/ftBlankGif.gif'
	);
	this.endframeImage12 = this.validateImagePath( 
		myFT.instantAds.endframe_image_12 || 'instantAssets/ftBlankGif.gif'
	);
	this.endframeImage13 = this.validateImagePath( 
		myFT.instantAds.endframe_image_13 || 'instantAssets/ftBlankGif.gif'
	);
	this.endframeImage14 = this.validateImagePath( 
		myFT.instantAds.endframe_image_14 || 'instantAssets/ftBlankGif.gif'
	);
	this.endframeImage15 = this.validateImagePath( 
		myFT.instantAds.endframe_image_15 || 'instantAssets/ftBlankGif.gif'
	);
	this.endframeImage16 = this.validateImagePath( 
		myFT.instantAds.endframe_image_16 || 'instantAssets/ftBlankGif.gif'
	);
	this.endframeImage17 = this.validateImagePath( 
		myFT.instantAds.endframe_image_17 || 'instantAssets/ftBlankGif.gif'
	);
	this.endframeImage18 = this.validateImagePath( 
		myFT.instantAds.endframe_image_18 || 'instantAssets/ftBlankGif.gif'
	);
	this.endframeImage19 = this.validateImagePath( 
		myFT.instantAds.endframe_image_19 || 'instantAssets/ftBlankGif.gif'
	);
	this.endframeImage20 = this.validateImagePath( 
		myFT.instantAds.endframe_image_20 || 'instantAssets/ftBlankGif.gif'
	);
	this.getImage = function( imageKey, adSize ) {
		var result;
		if( myFT.instantAds[ imageKey ] )
			result = myFT.instantAds[ imageKey ];
		else if( imageKey in this.imageMap ) {
			if( adSize in this.imageMap[ imageKey ] )
				result = this.imageMap[ imageKey ][ adSize ];
			else result = this.imageMap[ imageKey ][ 'default' ];
		}
		if( result ) return this.validateImagePath( result );
	}




}









/* -- COMMON IMPLEMENTED: Endframe.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var Endframe = ( function() {

	var self = this;
	self.container;
	self.resultText1;
	self.endframeOnHulu;
	self.gallery;
	self.endframeCTA;
	self.replay;

	self.callback;
	self.resetCallback;

	self.build = function ( args ) {
		var target = args.target || adData.elements.redAdContainer;
		var width = args.width || adParams.adWidth;
		var height = args.height || adParams.adHeight;
		self.callback = args.callback || nocallback;
		self.resetCallback = args.resetCallback || nocallback;
		var galleryTop = 90;

		self.container = new UIComponent({
			id: 'endframe',
			target: target,
			css: {
				width: width,
				height: height,
				position: 'absolute',
				backgroundColor: adData.greyColor
			}
		});



		var endframeHeadlineCopy = adData.resultText(1);
		var endframeHeadlineLetterSpacing = 0;
		if (adData.endframeHeadline.length > 0) {
			endframeHeadlineCopy = adData.endframeHeadline;
			endframeHeadlineLetterSpacing = 2;
		}


		var headerContainer = new UIComponent({
			id: 'endframe_header_container',
			target: self.container,
			css: {
				width: width,
				height: galleryTop,
				position: 'absolute'
			}
		})

		self.resultText1 = Markup.addTextfield({
			id: 'endframe_resultText1_TF',
			target: headerContainer,
			css: {
				width: 700,
				height: height,
				top: 22
			},
			margin: 5,
			multiline: false,
			textStyles: 'color: ' + adData.whiteColor + '; font-size: 34px; line-height: 30px; letter-spacing: ' + endframeHeadlineLetterSpacing + 'px; font-family: ' + adData.secondaryFont + '; text-align: center;'
		}, endframeHeadlineCopy, false, false );

		self.endframeOnHulu = Markup.addTextfield({
			id: 'endframeOnHulu_TF',
			target: self.container,
			css: {
				width: width,
				height: height,
				top: 67
			},
			margin: 5,
			multiline: false,
			textStyles: 'color: ' + adData.huluColors.primaryGreen + '; font-size: 13px; line-height: 13px; font-family: ' + adData.tertiaryFont + '; text-align: center;'
		}, adData.endframeOnHulu, false, false );
		TextUtils.autosizeTF( self.endframeOnHulu.textfield );
		TextUtils.fitContainerToText( self.endframeOnHulu, true, true );
		Align.moveX( Align.CENTER, self.endframeOnHulu.container );




		Gesture.disable( self.container );



		self.gallery = new Gallery();
		self.gallery.build({
			target: self.container,
			width: width,
			height: height,
			top: galleryTop
		});




		self.endframeCTA = new EndframeCtaBTN();
		self.endframeCTA.build({
			target: self.container,
			width: 360,
			height: 22,
			fontSize: 24,
			multiline: false,
			callback: function() {
				trace('Endframe.build() endframeCTA.CLICK');
				adData.networkExit( clickTag );
			}
		});
		self.endframeCTA.unregisterEvents();
		Align.moveX( Align.CENTER, self.endframeCTA.container );
		Align.moveY( Align.BOTTOM, self.endframeCTA.container, -11 );



		self.replay = new ReplayBTN();
		self.replay.build({
			target: headerContainer,
			width: 100,
			height: ImageManager.get('replay').height,
			fontSize: 14,
			lineHeight: 12,
			letterSpacing: 1,
			callback: hide
		});
		Align.move( Align.TOP_RIGHT, self.replay.container, -34, 26 );



		Styles.setCss( self.container, 'display', 'none' );
	}



	self.show = function() {
		var startX = -40;
		var animationTime = 0.5;
		var easeFunc = Quad.easeOut;
		var delay = 0;

		self.endframeCTA.registerEvents();
		Styles.setCss( self.container, 'display', 'inherit' );


		var endframeHeadlineCopy = adData.resultText(1);
		var endframeHeadlineLetterSpacing = 0;
		if (adData.endframeHeadline.length > 0) {
			endframeHeadlineCopy = adData.endframeHeadline;
			endframeHeadlineLetterSpacing = 2;
		}
		Styles.setCss( self.resultText1.textfield, 'letter-spacing', endframeHeadlineLetterSpacing );
		TextUtils.addText( self.resultText1.textfield, endframeHeadlineCopy );
		TextUtils.autosizeTF( self.resultText1.textfield, Styles.getCss( self.resultText1.textfield, 'font-size') / Styles.getCss( self.resultText1.textfield, 'line-height') );
		TextUtils.fitContainerToText( self.resultText1, true, true );
		Align.moveX( Align.CENTER, self.resultText1.container, -2 );

		if ( adData.endframeOnHulu.length < 1 ) {
			Align.moveY( Align.CENTER, self.resultText1.container );
		}
		self.replay.show({
			animationTime: animationTime,
			startX: startX,
			delay: delay,
			easeFunc: easeFunc
		});
		delay += 0.1;
		TweenLite.fromTo( self.resultText1.container, animationTime, { opacity: 0, x: startX }, { delay: delay, opacity: 1, x: 0, ease: easeFunc } );
		delay += 0.1;
		TweenLite.fromTo( self.endframeOnHulu.container, animationTime, { opacity: 0, x: startX }, { delay: delay, opacity: 1, x: 0, ease: easeFunc } );
		delay += 0.1;
		TweenLite.fromTo( self.endframeCTA.container, animationTime, { opacity: 0, x: startX }, { delay: delay, opacity: 1, x: 0, ease: easeFunc } );

		self.gallery.show({
			animationTime: animationTime,
			startX: startX,
			delay: delay,
		});
	}

	function hide() {
		var destX = 40;
		var animationTime = 0.5;
		var easeFunc = Expo.easeIn;
		var delay = 0;

		self.endframeCTA.unregisterEvents();

		Styles.setCss( self.container, 'display', 'inherit' );
		self.gallery.hide();
		self.replay.hide({
			animationTime: animationTime,
			delay: delay,
			destX: destX,
			easeFunc: easeFunc
		} );
		delay += 0.1;
		TweenLite.to( self.resultText1.container, animationTime, { delay: delay, opacity: 0, x: destX, ease: easeFunc } );
		delay += 0.1;
		TweenLite.to( self.endframeOnHulu.container, animationTime, { delay: delay, opacity: 0, x: destX, ease: easeFunc } );
		delay += 0.1;
		TweenLite.to( self.endframeCTA.container, animationTime, { delay: delay, opacity: 0, x: destX, ease: easeFunc, onComplete: function() {
			Styles.setCss( self.container, 'display', 'none' );
			self.resetCallback();
		} } );
		
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
	self.images;
	self.imageQueue;
	self.btn;
	self.introText1;
	self.introText2;
	self.delay = 0.1;
	self.showing = true;

	self.callback;


	self.build = function ( args ) {
		var target = args.target || adData.elements.redAdContainer;
		var fontSize = args.fontSize || 38;
		var lineHeight = args.lineHeight || fontSize;
		var textWidth = args.textWidth || 580;
		var textHeight = args.textHeight || 50;
		var margin = args.margin || 0;
		var multiline = args.multiline || false;
		var spacer = args.spacer || 10;
		self.callback = args.callback || nocallback;

		self.container = new UIComponent({
			id: 'intro',
			target: target,
			css: {
				width: adParams.adWidth,
				height: adParams.adHeight,
				position: 'absolute'
			}
		});
		Gesture.disable( self.container );

		var imagesContainer = UIComponent({
			id: 'introImagesContainer',
			target: self.container,
			css: {
				width: adParams.adWidth,
				height: adParams.adHeight,
				position: 'absolute'
			}
		});

		self.images = [];
		var image;
		for (var i = adData.totalIntroImages; i > 0; i--) {
			image = new UIImage({
				id: 'introImage_' + i,
				target: imagesContainer,
				source: adData.questions[i].image,
				css: {
					position: 'absolute',
					backgroundSize: 'contain',
				}
			});
			Align.moveX( Align.CENTER, image );
			TweenLite.set( image, { scale: 3 } );
			if ( i < adData.totalIntroImages ) {
				TweenLite.set( image, { opacity: 0 } );
				self.images.push( image );
			}
		}

		self.imageQueue = self.images.slice();


		var introGradient = new UIImage({
			id: 'introGradient',
			target: self.container,
			source: 'introGradient',
			css: {
			}
		})


		var contentContainer = UIComponent({
			id: 'introContentContainer',
			target: self.container,
			css: {
				width: textWidth,
				height: adParams.adHeight,
				position: 'absolute'
			}
		});

		var totalHeight = 0;
		var introText1 = self.introText1 = Markup.addTextfield({
			id: 'introText1',
			target: contentContainer,
			css: {
				width: textWidth,
				height: textHeight
			},
			margin: margin,
			multiline: multiline,
			textStyles: 'color: ' + adData.whiteColor + '; font-size: ' + fontSize + 'px; line-height: ' + lineHeight + 'px; font-family: ' + adData.primaryFont + '; text-align: center;'
		}, adData.introText1, false, false );
		TextUtils.autosizeTF( introText1.textfield );
		Align.moveX( Align.CENTER, introText1.textfield );
		totalHeight += Styles.getCss( introText1.textfield, 'height' ) + spacer;

		var introText2 = self.introText2 = Markup.addTextfield({
			id: 'introText2',
			target: contentContainer,
			css: {
				width: textWidth,
				height: textHeight,
				top: totalHeight
			},
			margin: margin,
			multiline: multiline,
			textStyles: 'color: ' + adData.whiteColor + '; font-size: ' + fontSize + 'px; line-height: ' + lineHeight + 'px; font-family: ' + adData.primaryFont + '; text-align: center;'
		}, adData.introText2, false, false );
		TextUtils.autosizeTF( introText2.textfield );
		Align.moveX( Align.CENTER, introText2.textfield );
		totalHeight += Styles.getCss( introText2.textfield, 'height' ) + spacer;


		var actionBTN = self.btn = new ActionBTN();
		actionBTN.build({
			id: 'intro',
			target: contentContainer,
			copy: adData.startCTA,
			top: totalHeight,
			isCorrect: true,
			callback: self.callback
		});
		TweenLite.set( actionBTN.container, { opacity: 0 });
		Align.moveX( Align.CENTER, actionBTN.container );

		Gesture.disable( contentContainer );

		totalHeight += actionBTN.height;

		Styles.setCss( contentContainer, 'height', totalHeight );

		Align.move( Align.CENTER, contentContainer );

		self.container.hide();
	}

	self.show = function() {
		self.container.show();
		var startX = -40;
		var animationTime = 0.5;
		TweenLite.from( self.introText1.container, animationTime, { delay: 0.1, x: startX, ease:Quad.easeOut });
		TweenLite.from( self.introText2.container, animationTime, { delay: 0.2, x: startX, ease:Quad.easeOut });
		self.btn.simpleShow();
		TweenLite.fromTo( self.btn.container, animationTime, { x: startX, opacity: 0 }, { delay: 0.3, x: 0, opacity: 1, ease:Quad.easeOut });
		TweenLite.delayedCall( 2, self.btn.blink );
		
		TweenLite.delayedCall( 1, nextImage );
	}

	self.hide = function() {
		if (self.showing) {
			self.showing = false;
			TweenLite.killDelayedCallsTo( self.callback );
			TweenLite.fromTo( self.container, 0.5, { clip:'rect(0px ' + adParams.adWidth + 'px ' + adParams.adHeight + 'px 0px)' }, { delay:0.35, clip:'rect(0px ' + adParams.adWidth + 'px ' + adParams.adHeight + 'px ' + adParams.adWidth + 'px)', ease:Quad.easeInOut, onComplete: function() {
				Styles.setCss( self.container, 'display', 'none' );
			} } );
		}
	}

	function nextImage() {
		if (self.showing) {
			if ( self.imageQueue.length > 0 ) {
				var image = self.imageQueue.shift();
				TweenLite.to( image, 1, { delay: self.delay, opacity: 1, ease:Quad.easeInOut, onComplete: function() {
					TweenLite.delayedCall( 0.5, nextImage );
				} } );
			}
			else {
					TweenLite.delayedCall( self.delay, self.callback );
			}
		}
	}

	function nocallback() {

	}


	return self;
});









/* -- COMMON IMPLEMENTED: Quiz.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var Quiz = ( function() {

	var self = this;

	self.container;
	self.questions;
	self.questionsQueue;
	self.cta;
	self.questionMarker;
	self.question;
	self.gradient;
	self.headerTF;
	self.quizCTA;

	self.callback;
	self.countdownTime = 3;
	self.markerWidth;
	self.markerHeight;


	self.build = function ( args ) {
		var target = args.target || adData.elements.redAdContainer;
		var quizWidth = args.quizWidth || 444;
		self.callback = args.callback || nocallback;
		self.container = new UIComponent({
			id: 'quiz',
			target: target,
			css: {
				width: adParams.adWidth,
				height: adParams.adHeight,
				position: 'absolute',
				backgroundColor: adData.greyColor,
			}
		});
		Gesture.disable( self.container );
		var questionsContainer = UIComponent({
			id: 'questionsContainer',
			target: self.container,
			css: {
				width: adParams.adWidth,
				height: adParams.adHeight,
				position: 'absolute'
			}
		});

		self.questions = [];
		var question;
		args.question.target = questionsContainer;
		args.question.callback = nextQuestion;
		args.question.quizWidth = quizWidth;
		for (var i = 0; i < adData.questions.length; i++) {
			question = new QuizQuestion();
			args.question.id = (i + 1);
			args.question.onAnswered = onAnswered;
			question.build( args.question );
			self.questions.push( question );
		}

		self.questionsQueue = self.questions.slice();
		self.startBTN = new ActionBTN();
		self.startBTN.build({
			id: 'quizStartBTN',
			target: questionsContainer,
			copy: adData.startCTA,
			isCorrect: true,
			left: 124,
			top: 117,
			callback: getReady,
			fillShowing: 1
		});
		TweenLite.set( self.startBTN.container, { scale: 1.3 } );
		Gesture.disable( self.startBTN.container );
		var getReadyTop = 110;
		self.getReadyTF = Markup.addTextfield({
			id: 'quiz_getReadyTF',
			target: self.container,
			css: {
				width: quizWidth,
				height: args.header.height,
				top: getReadyTop,
				opacity: 0
			},
			margin: 5,
			multiline: false,
			textStyles: 'color: ' + adData.whiteColor + '; font-size: 15px; line-height: 15px; font-family: ' + adData.primaryFont + '; text-align: center;'
		}, adData.getReady, false, false );
		TextUtils.autosizeTF( self.getReadyTF.textfield );
		Align.moveX( Align.CENTER, self.getReadyTF.textfield );

		var circleSize = 54;
		self.countdown = new UIComponent({
			id: 'quiz_countdown',
			target: self.container,
			css: {
				width: quizWidth,
				height: circleSize,
				position: 'absolute',
				top: getReadyTop + 25,
				opacity: 0
			}
		});

		var circle = new UIImage({
			id: 'quiz_contdownCircle',
			target: self.countdown,
			source: 'circle',
			css: {
				width: circleSize,
				height: circleSize,
			}
		});

		self.countdownTF = Markup.addTextfield({
			id: 'quiz_countdownTF',
			target: circle,
			css: {
				width: circleSize,
				height: circleSize,
			},
			margin: 0,
			multiline: false,
			textStyles: 'color: ' + adData.whiteColor + '; font-size: 34px; line-height: 30px; font-family: ' + adData.primaryFont + '; text-align: center;'
		}, self.countdownTime.toString(), false, false );
		Align.move( Align.CENTER, self.countdownTF.textfield, 0, 2 );

		Align.moveX( Align.CENTER, circle );
		self.headerTF = Markup.addTextfield({
			id: 'quiz_headerTF',
			target: self.container,
			css: {
				width: quizWidth,
				height: args.header.height,
				top: args.header.top
			},
			margin: 10,
			multiline: false,
			textStyles: 'color: ' + adData.whiteColor + '; font-size: ' + args.header.fontSize + 'px; line-height: ' + args.header.lineHeight + 'px; font-family: ' + adData.primaryFont + '; text-align: center;'
		}, adData.quizHeader, false, false );
		TextUtils.autosizeTF( self.headerTF.textfield );
		Align.moveX( Align.CENTER, self.headerTF.textfield );
		self.subHeaderTF = Markup.addTextfield({
			id: 'quiz_subHeaderTF',
			target: self.container,
			css: {
				width: quizWidth,
				height: args.header.height,
				top: args.header.top + Styles.getCss( self.headerTF.textfield, 'height' ) + 8
			},
			margin: 5,
			multiline: false,
			textStyles: 'color: ' + adData.huluColors.primaryGreen + '; font-size: 18px; line-height: 18px; font-family: ' + adData.quaternaryFont + '; text-align: center;'
		}, adData.questions[0].question, false, false );
		TextUtils.autosizeTF( self.subHeaderTF.textfield );
		Align.moveX( Align.CENTER, self.subHeaderTF.textfield );
		self.quizCTA = new QuizCtaBTN();
		self.quizCTA.build({
			target: self.container,
			width: 240,
			height: 25,
			fontSize: 18,
			callback: function() {
				adData.networkExit( clickTag );
			}
		});

		Align.move( Align.BOTTOM_RIGHT, self.quizCTA.container, -534, 0 );






		var timerWidth = 6;
		var gradientLeft = quizWidth + timerWidth - 1;
		self.gradient = new UIImage({
			id: 'quizGradient',
			target: self.container,
			source: 'quizHeroGradient',
			css: {
				left: gradientLeft,
				width: adParams.adWidth - gradientLeft,
				height: adParams.adHeight,
				position: 'absolute'
			}
		});
		TweenLite.set( self.gradient, { x: -self.gradient.width, clip:'rect(0px ' + self.gradient.width + 'px ' + self.gradient.height + 'px ' + self.gradient.width + 'px)' } );
		self.timer = new Timer();
		self.timer.build({
			width: timerWidth,
			left: quizWidth,
			target: self.container
		});
		self.markerWidth = args.marker.width;
		self.markerHeight = args.marker.height;
		self.questionMarker = new Markup.addTextfield({
			id: 'quiz_marker',
			target: self.container,
			css: {
				width: self.markerWidth,
				height: self.markerHeight,
				top: args.marker.top,
				left: gradientLeft + args.marker.leftOffset
			},
			margin: 0,
			multiline: false,
			textStyles: 'color: ' + adData.whiteColor + '; font-size: ' + args.marker.fontSize + 'px; line-height: ' + args.marker.lineHeight + 'px; font-family: ' + adData.primaryFont + '; text-align: right;'
		}, '1/' + adData.questions.length, false, false );
		TweenLite.set( self.questionMarker.container, { x: -self.markerWidth, clip:'rect(0px ' + self.markerWidth + 'px ' + self.markerHeight + 'px ' + self.markerWidth + 'px)' } );




	}

	self.reset = function() {
		adData.score = 0;
		self.questionsQueue = self.questions.slice();
		for (var i = 0; i < self.questionsQueue.length; i++)
			self.questionsQueue[i].reset();
		self.timer.resetAll();
	}

	self.pause = function( forcePause ) {
		trace('Quiz.pause()');
		trace('		adData.userInteracted:' + adData.userInteracted);
		trace('		forcePause:' + forcePause);
		self.countdownTime = 3;
		TextUtils.addText( self.countdownTF.textfield, self.countdownTime.toString() );
		if ( !adData.userInteracted || forcePause ) {
			self.question.pause();
			self.timer.pause();
			Gesture.enable( self.startBTN.container );
			if ( forcePause )
				getReady();
			else
				self.startBTN.show();
		}

		adData.autoplay = true;	// -- this makes it so that everything animates after initial start
	}

	function getReady() {
		Gesture.disable( self.startBTN.container );
		self.startBTN.hide();
		TweenLite.delayedCall( 0.25, function() {
			self.startBTN.updateText(adData.continueCTA);
		} );
		self.question.resetAnswers();
		self.timer.reset();
		TweenLite.to( self.getReadyTF.container, 0.25, { opacity: 1, ease:Quad.easeInOut });
		TweenLite.to( self.countdown, 0.25, { opacity: 1, ease:Quad.easeInOut });
		countdown();
	}

	function countdown() {
		TweenLite.fromTo( self.countdownTF.container, 0.5, { scale: 3, opacity: 0 }, { scale: 1, opacity: 1, ease:Expo.easeIn, onComplete: function() {
			TweenLite.to( self.countdownTF.container, 0.5, { scale: 0.2, opacity: 0, ease:Expo.easeIn, onComplete: function() {
				self.countdownTime--;
				if ( self.countdownTime < 1 )
					replay();
				else {
					if ( self.countdownTime == 1)
						TweenLite.set( self.countdownTF.container, { x: 1 } );
					TextUtils.addText( self.countdownTF.textfield, self.countdownTime.toString() );
					countdown();
				}
			} })
		} } );
	}

	function replay() {
		TweenLite.to( self.getReadyTF.container, 0.25, { opacity: 0, ease:Quad.easeInOut } );
		TweenLite.to( self.countdown, 0.25, { opacity: 0, ease:Quad.easeInOut } );
		self.question.show();
		self.question.replay();
		self.timer.replay();
	}

	self.show = function() {
		var animationTime = 1;
		var quizBeginDelay = 2;
		var fromX = -40;

		Styles.setCss( self.container, 'display', 'inherit' );

		if ( adData.autoplay ) {
			TweenLite.delayedCall( animationTime, self.timer.show );
			TweenLite.fromTo( self.headerTF.container, animationTime, { opcacity: 0, x: fromX }, { opcacity: 1, x: 0, ease:Quad.easeOut } );
			TweenLite.fromTo( self.subHeaderTF.container, animationTime, { opacity: 0, x: fromX }, { delay: 0.2, opacity: 1, x: 0, ease:Quad.easeOut } );
			TweenLite.fromTo( self.quizCTA.container, animationTime, { opacity: 0, x: fromX }, { delay: 0.4, opacity: 1, x: 0, ease:Quad.easeOut } );
			TweenLite.fromTo( self.gradient, animationTime, { x: -self.gradient.width, clip:'rect(0px ' + self.gradient.width + 'px ' + self.gradient.height + 'px ' + self.gradient.width + 'px)' }, { delay: animationTime, x: 0, clip:'rect(0px ' + self.gradient.width + 'px ' + self.gradient.height + 'px 0px)', ease:Quad.easeInOut } );
			TweenLite.fromTo( self.questionMarker.container, animationTime, { x: -self.markerWidth, clip:'rect(0px ' + self.markerWidth + 'px ' + self.markerHeight + 'px ' + self.markerWidth + 'px)' }, { delay: animationTime, x: 0, clip:'rect(0px ' + Styles.getCss( self.questionMarker.container, 'width' ) + 'px ' + Styles.getCss( self.questionMarker.container, 'height' ) + 'px 0px)', ease:Quad.easeInOut } );


			if ( adData.userInteracted ) {
				TweenLite.delayedCall( quizBeginDelay, function() {
					self.question = self.questionsQueue.shift();
					TextUtils.addText( self.questionMarker.textfield, self.question.id + '/' + adData.questions.length );
					TextUtils.addText( self.subHeaderTF.textfield, self.question.question );

					self.pause(true);
				} );
			}
			else {
				TweenLite.delayedCall( quizBeginDelay, nextQuestion );
				TweenLite.delayedCall( (adData.questionTime * 0.4) + quizBeginDelay + 1, self.pause );
			}
		}
		else {
			self.timer.show();
			TweenLite.set( self.headerTF.container, { opcacity: 1, x: 0 } );
			TweenLite.set( self.subHeaderTF.container, { opacity: 1, x: 0 } );
			TweenLite.set( self.quizCTA.container, { opacity: 1, x: 0 } );
			TweenLite.set( self.gradient, { x: 0, clip:'rect(0px ' + self.gradient.width + 'px ' + self.gradient.height + 'px 0px)' } );
			TweenLite.set( self.questionMarker.container, { x: 0, clip:'rect(0px ' + Styles.getCss( self.questionMarker.container, 'width' ) + 'px ' + Styles.getCss( self.questionMarker.container, 'height' ) + 'px 0px)' } );

			nextQuestion(true);
			TweenLite.delayedCall( 0.01, self.pause );

		}
	}

	self.hide = function() {
		Styles.setCss( self.container, 'display', 'none' );
	}

	function onHide() {
		if ( self.question )
				self.question.hide();
		self.callback();
	}

	function onAnswered(isCorrect) {
		if ( isCorrect )
			adData.score++;
		self.timer.resolve(isCorrect);
	}


	function nextQuestion(stopAutoplay) {
		if ( self.questionsQueue.length > 0 ) {
			if ( self.question )
				self.question.hide();
			self.question = self.questionsQueue.shift();
			self.question.show();
			if ( !stopAutoplay ) {
				TweenLite.delayedCall( 1, function() {
					self.timer.timerAnimation(self.question.id);
					self.question.timerAnimation();
				});
			}
			TextUtils.addText( self.questionMarker.textfield, self.question.id + '/' + adData.questions.length );
			TextUtils.addText( self.subHeaderTF.textfield, self.question.question );
		}
		else
			TweenLite.delayedCall( 0.2, onHide );
	}

	function nocallback() {

	}


	return self;
});









/* -- COMMON IMPLEMENTED: Results.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var Results = ( function() {

	var self = this;
	self.container;
	self.contentContainer;
	self.score;
	self.resultText1;
	self.resultText2;

	self.showCallback
	self.fontSize;

	self.build = function ( args ) {
		var target = args.target || adData.elements.redAdContainer;
		var width = args.width || adParams.adWidth;
		var height = args.height || adParams.adHeight;
		self.fontSize = args.fontSize || 34;
		var lineHeight = args.lineHeight || self.fontSize;
		self.callback = args.callback || nocallback;
		self.showCallback = args.showCallback || nocallback;

		self.container = new UIComponent({
			id: 'results',
			target: target,
			css: {
				width: width,
				height: height,
				position: 'absolute',
				backgroundColor: adData.greyColor
			}
		});


		self.contentContainer = new UIComponent({
			id: 'results_content_container',
			target: self.container,
			css: {
				width: width,
				height: height,
				position: 'absolute'
			}
		})


		self.score = Markup.addTextfield({
			id: 'score_TF',
			target: self.contentContainer,
			css: {
				width: width,
				height: height
			},
			margin: 5,
			multiline: false,
			textStyles: 'color: ' + adData.huluColors.primaryGreen + '; font-size: 30px; line-height: 30px; font-family: ' + adData.primaryFont + '; text-align: center;'
		}, adData.score + '/' + adData.questions.length, false, false );


		self.resultText1 = Markup.addTextfield({
			id: 'resultText1_TF',
			target: self.contentContainer,
			css: {
				width: width,
				height: height,
			},
			margin: 5,
			multiline: false,
			textStyles: 'color: ' + adData.whiteColor + '; font-size: ' + self.fontSize + 'px; line-height: ' + lineHeight + 'px; font-family: ' + adData.secondaryFont + '; text-align: center;'
		}, adData.resultText(1), false, false );


		self.resultText2 = Markup.addTextfield({
			id: 'resultText2_TF',
			target: self.contentContainer,
			css: {
				width: width,
				height: height,
			},
			margin: 5,
			multiline: false,
			textStyles: 'color: ' + adData.whiteColor + '; font-size: ' + self.fontSize + 'px; line-height: ' + lineHeight + 'px; font-family: ' + adData.primaryFont + '; text-align: center;'
		}, adData.resultText(2), false, false );

		Gesture.disable( self.container );

		TweenLite.set( self.container, { display:'none', clip:'rect(0px 0px ' + height + 'px 0px)' } );
	}


	self.show = function() {
		trace('Results.show()');
		var startX = -40;
		var animationTime = 0.5;
		var easeFunc = Quad.easeOut;
		var delay = 0;

		TweenLite.set( self.container, { display:'inherit', clip:'rect(0px 0px ' + adParams.adHeight + 'px 0px)' } );
		TweenLite.set( self.score.container, { opacity: 1 });
		TweenLite.set( self.resultText1.container, { opacity: 1 });
		TweenLite.set( self.resultText2.container, { opacity: 1 });
		TextUtils.addText( self.score.textfield, adData.score + '/' + adData.questions.length );

		TextUtils.fitContainerToText( self.score, true, true );
		Align.moveX( Align.CENTER, self.score.container );
		var contentHeight = Styles.getCss( self.score.textfield, 'height' ) + 20;
		Styles.setCss( self.resultText1.textfield, 'font-size', self.fontSize );
		TextUtils.addText( self.resultText1.textfield, adData.resultText(1) );
		TextUtils.autosizeTF( self.resultText1.textfield );
		Align.moveX( Align.CENTER, self.resultText1.textfield );
		Styles.setCss( self.resultText1.container, 'top', contentHeight );

		contentHeight += Styles.getCss( self.resultText1.textfield, 'height' ) + 7;
		TextUtils.addText( self.resultText2.textfield, adData.resultText(2) );
		TextUtils.autosizeTF( self.resultText2.textfield );
		Align.moveX( Align.CENTER, self.resultText2.textfield );
		Styles.setCss( self.resultText2.container, 'top', contentHeight );
		contentHeight += Styles.getCss( self.resultText2.textfield, 'height' );
		Styles.setCss( self.contentContainer, 'height', contentHeight );

		Align.moveX( Align.CENTER, self.resultText1.container );
		Align.moveX( Align.CENTER, self.resultText2.container );
		Align.moveY( Align.CENTER, self.contentContainer, -11 );
		TweenLite.to( self.container, animationTime, { clip:'rect(0px ' + adParams.adWidth + 'px ' + adParams.adHeight + 'px 0px)', ease: Quad.easeInOut, onComplete: self.showCallback });
		TweenLite.from( self.score.container, animationTime, { delay: delay, x: startX, ease: easeFunc } );
		delay += 0.1;
		TweenLite.from( self.resultText1.container, animationTime, { delay: delay, x: startX, ease: easeFunc } );
		delay += 0.1;
		TweenLite.from( self.resultText2.container, animationTime, { delay: delay, x: startX, ease: easeFunc } );

		TweenLite.delayedCall( 3, hide );
	}

	function hide() {
		var destX = 40;
		var animationTime = 0.5;
		var easeFunc = Expo.easeIn;
		var delay = 0;

		TweenLite.to( self.score.container, animationTime, { delay: delay, x: destX, opacity: 0, ease: easeFunc } );
		delay += 0.1;
		TweenLite.to( self.resultText1.container, animationTime, { delay: delay, x: destX, opacity: 0, ease: easeFunc } );
		delay += 0.1;
		TweenLite.to( self.resultText2.container, animationTime, { delay: delay, x: destX, opacity: 0, ease: easeFunc, onComplete: function() {
			Styles.setCss( self.container, 'display', 'none' );
			self.callback();
		}});	
	}

	function nocallback() {

	}


	return self;
});









/* -- COMMON IMPLEMENTED: EndframeCtaBTN.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var EndframeCtaBTN = ( function() {

	var self = this;
	self.container;
	self.callback;

	self.arrow;
	self.isOver = false;
	self.maxOverTime = 1;

	self.build = function ( args ) {
		var target = args.target || adData.elements.redAdContainer;
		var fontSize = args.fontSize || 18;
		var lineHeight = args.lineHeight || fontSize;
		var width = args.width || 360;
		var height = args.height || 22;
		var top = args.top || 0;
		var left = args.left || 0;
		var margin = args.margin || 0;
		var multiline = args.multiline || true;
		self.callback = args.callback || nocallback;
		var spacer = args.spacer || 4;

		self.container = new UIComponent({
			id: 'endframe_cta',
			target: target,
			css: {
				width: width,
				height: height,
				top: top,
				left: left,
				position: 'absolute',
			}
		});



		var copy1TF = Markup.addTextfield({
			id: 'endframe_cta1_text',
			target: self.container,
			css: {
				width: width,
				height: height
			},
			margin: margin,
			multiline: multiline,
			textStyles: 'color: ' + adData.whiteColor + '; font-size: ' + fontSize + 'px; line-height: ' + lineHeight + 'px; font-family: ' + adData.secondaryFont + '; text-align: left;'
		}, adData.endframeCTA1, false, false );
		fontSize = lineHeight = TextUtils.autosizeTF( copy1TF.textfield );

		var btnWidth = Styles.getCss( copy1TF.textfield, 'width' ) + spacer;

		var copy2TF = Markup.addTextfield({
			id: 'endframe_cta2_text',
			target: self.container,
			css: {
				width: width,
				height: height,
				left: btnWidth
			},
			margin: margin,
			multiline: multiline,
			textStyles: 'color: ' + adData.whiteColor + '; font-size: ' + fontSize + 'px; line-height: ' + lineHeight + 'px; font-family: ' + adData.primaryFont + '; text-align: left;'
		}, adData.endframeCTA2, false, false );
		fontSize = lineHeight = TextUtils.autosizeTF( copy2TF.textfield );

		btnWidth += Styles.getCss( copy2TF.textfield, 'width' ) + spacer;

		self.arrow = Markup.addTextfield({
			id: 'endframe_cta_arrow',
			target: self.container,
			css: {
				width: width,
				height: height,
				left: btnWidth
			},
			margin: margin,
			multiline: multiline,
			textStyles: 'color: ' + adData.huluColors.primaryGreen + '; font-size: ' + fontSize + 'px; line-height: ' + lineHeight + 'px; font-family: ' + adData.primaryFont + '; text-align: left;'
		}, '›', false, false );

		TextUtils.fitContainerToText( self.arrow, true, true );

		Styles.setCss( self.container, 'width', btnWidth + Styles.getCss( self.arrow.textfield, 'width' ) );








		Gesture.disableChildren( self.container );

		self.show();
	}


	self.show = function () {
		self.registerEvents();
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
		TweenLite.to( self.arrow.textfield, animationTime, { x: 5, color: adData.whiteColor, ease:easeFunc, onComplete: function() {
			TweenLite.to( self.arrow.textfield, animationTime, { x: 0, color: adData.huluColors.primaryGreen, ease:easeFunc, onComplete: function() {
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
		Gesture.removeEventListener( self.container, GestureEvent.OVER, self.onHitRollOver );
		Gesture.removeEventListener( self.container, GestureEvent.OUT, self.onHitRollOut );
		Gesture.removeEventListener( self.container, GestureEvent.CLICK, onHitClick );
	}

	self.registerEvents = function() {
		Gesture.addEventListener( self.container, GestureEvent.OVER, self.onHitRollOver );
		Gesture.addEventListener( self.container, GestureEvent.OUT, self.onHitRollOut );
		Gesture.addEventListener( self.container, GestureEvent.CLICK, onHitClick );
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
	self.rightBTN;
	self.leftBTN;
	self.slides;

	self.height;
	self.width;
	self.isAnimating = false;
	self.currentSlideIndex = 0;
	self.thumbsContainerWidth = 0;

	self.build = function ( args ) {
		var target = args.target || adData.elements.redAdContainer;
		var top = args.top || 102;
		var left = args.left || 0;
		var width = self.width = args.width || adParams.adWidth;
		var height = self.height = args.height || adParams.adHeight;

		self.container = new UIComponent({
			id: 'endframe_gallery',
			target: target,
			css: {
				width: width,
				height: height,
				top: top,
				left: left,
				position: 'absolute',
			}
		});

		Gesture.disable( self.container );


		var thumbData = ImageManager.get( adData.endframeImages[0] );

		var imagesPerPanel = 5;
		var spacer = 1;
		self.thumbsContainerWidth = imagesPerPanel * ( thumbData.width + spacer );// - spacer;
		self.thumbsContainer = new UIComponent({
			id: 'thumbs_container',
			target: self.container,
			css: {
				width: self.thumbsContainerWidth,
				height: height,
				position: 'absolute',
				overflow: 'hidden'
			}
		});

		var thumb;
		self.thumbs = [];
		var thumbsWidth = 0;
		var i;
		self.slides = [];
		var slide;
		var slideOpacity = 1;
		for (i = 0; i < adData.endframeImages.length / imagesPerPanel; i++) {
			slide = new UIComponent({
				id: 'gallery_slide_' + (i + 1),
				target: self.thumbsContainer,
				css: {
					width: self.thumbsContainerWidth,
					height: thumbData.height,
					left: i * self.thumbsContainerWidth,
					position: 'absolute',
				}
			});
			self.slides.push( slide );
			slideOpacity -= 0.25;
		}
		var slideNum = -1;
		for (var i = 0; i < adData.endframeImages.length; i++) {
			if ( i % 5 == 0 ) {
				slideNum++;
				thumbsWidth = 0;
			}
			thumbData = ImageManager.get( adData.endframeImages[i] );
			trace('		thumbData.width:' + thumbData.width);
			thumb = new GalleryThumbBTN();
			thumb.build({
				id: 'gallery_thumb_' + (i+1),
				thumbData: thumbData,
				target: self.slides[slideNum],
				source: adData.endframeImages[i],
				left: thumbsWidth,
			})
			thumbsWidth += thumbData.width + spacer;
			self.thumbs.push(thumb);
		}


		if ( adData.endframeImages.length > 5 ) {

			self.leftBTN = new GalleryNavBTN();
			self.leftBTN.build({
				id: 'left',
				target: self.container,
				left: 5,
				height: thumbData.height,
				callback: onPrev
			});

			self.rightBTN = new GalleryNavBTN();
			self.rightBTN.build({
				id: 'right',
				target: self.container,
				height: thumbData.height,
				callback: onNext
			});

			Align.moveX( Align.RIGHT, self.rightBTN.container, -5 );
		}

		Align.moveX( Align.CENTER, self.thumbsContainer );

		Styles.setCss( self.container, 'height', thumbData.height );
		Styles.setCss( self.thumbsContainer, 'height', thumbData.height );


		

	}


	self.show = function (args) {
		TweenLite.set( self.container, { clip:'rect(0px ' + self.width + 'px ' + self.height + 'px 0px)' } );
		if ( self.rightBTN )
			self.rightBTN.show();
		if ( self.leftBTN )
			self.leftBTN.show();
		var delay = args.delay;
		for (var i = self.thumbs.length - 1; i >= 0; i--) {
			self.thumbs[i].show(args);
			if (i % 5 == 0)
				args.delay = delay;
			else
				args.delay += 0.1;
		}
	}

	self.hide = function() {
		TweenLite.to( self.container, 0.5, { clip:'rect(0px ' + self.width + 'px ' + self.height + 'px ' + self.width + 'px)', ease:Quad.easeInOut } );
	}

	function onNext() {
		trace('Gallery.onNext()');
		if ( !self.isAnimating ) {
			var animationTime = 0.5;
			var easeFunc = Quad.easeOut;
			self.isAnimating = true;

			var nextSlide = self.currentSlideIndex + 1 > self.slides.length - 1 ? self.slides[0] : self.slides[self.currentSlideIndex + 1];
			TweenLite.to( self.slides[self.currentSlideIndex], animationTime, { left: -self.thumbsContainerWidth, ease: easeFunc, onComplete: function() {
				self.isAnimating = false;
			} } );

			TweenLite.fromTo( nextSlide, animationTime, { left: self.thumbsContainerWidth }, { left: 0, ease: easeFunc });

			self.currentSlideIndex++;
			if ( self.currentSlideIndex >= self.slides.length )
				self.currentSlideIndex = 0;
		}
	}

	function onPrev() {
		trace('Gallery.onPrev();');
		if ( !self.isAnimating ) {
			var animationTime = 0.5;
			var easeFunc = Quad.easeOut;
			self.isAnimating = true;

			var nextSlide = self.currentSlideIndex - 1 < 0 ? self.slides[self.slides.length - 1] : self.slides[self.currentSlideIndex - 1];
			TweenLite.to( self.slides[self.currentSlideIndex], animationTime, { left: self.thumbsContainerWidth, ease: easeFunc, onComplete: function() {
				self.isAnimating = false;
			} } );

			TweenLite.fromTo( nextSlide, animationTime, { left: -self.thumbsContainerWidth }, { left: 0, ease: easeFunc });

			self.currentSlideIndex--;
			if ( self.currentSlideIndex < 0 )
				self.currentSlideIndex = self.slides.length - 1;
		}
	}



	return self;
});









/* -- COMMON IMPLEMENTED: ReplayBTN.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var ReplayBTN = ( function() {

	var self = this;
	self.container;
	self.callback;

	self.arrow;
	self.isOver = false;
	self.maxOverTime = 1;
	self.opacity = 0.6;

	self.build = function ( args ) {
		var target = args.target || adData.elements.redAdContainer;
		var fontSize = args.fontSize || 18;
		var lineHeight = args.lineHeight || fontSize;
		var width = self.width = args.width || self.width;
		var height = self.height = args.height || self.height;
		var top = args.top || 0;
		var left = args.left || 0;
		var margin = args.margin || 0;
		var multiline = args.multiline || false;
		var letterSpacing = args.letterSpacing || 0;
		self.callback = args.callback || nocallback;

		self.container = new UIComponent({
			id: 'ReplayBTN',
			target: target,
			css: {
				width: width,
				height: height,
				top: top,
				left: left,
				position: 'absolute',
				opacity: self.opacity
			}
		});



		var copyTF = Markup.addTextfield({
			id: 'replay_text',
			target: self.container,
			css: {
				width: width,
				height: height
			},
			margin: margin,
			multiline: multiline,
			textStyles: 'color: ' + adData.huluColors.primaryGreen + '; font-size: ' + fontSize + 'px; line-height: ' + lineHeight + 'px; font-family: ' + adData.tertiaryFont + '; text-align: left; letter-spacing: ' + letterSpacing + 'px;'
		}, adData.replay, false, false );
		TextUtils.autosizeTF( copyTF.textfield );
		Align.moveY( Align.CENTER, copyTF.textfield, 1 );

		var arrowLeft = Styles.getCss( copyTF.textfield, 'width' ) + 3;
		var arrowImg = ImageManager.get('replay');
		self.arrow = new UIImage({
			id: 'replay_arrow',
			target: self.container,
			source: 'replay',
			css: {
				left: arrowLeft
			}
		});

		Styles.setCss( self.container, 'width', arrowLeft + arrowImg.width );


		Gesture.disableChildren( self.container );
	}


	self.show = function ( args ) {
		trace('ReplayBTN.show()');
		trace('		args:' + args);
		for (var i in args)
			trace('			' + i + ':' + args[i]);
		TweenLite.fromTo( self.container, args.animationTime, { opacity: 0, x: args.startX }, { delay: args.delay, opacity: self.opacity, x: 0, ease: args.easeFunc } );
		registerEvents();
	}

	self.hide = function( args ) {
		self.isOver = false;
		TweenLite.killDelayedCallsTo( self.onHitRollOut );
		self.unregisterEvents();
		TweenLite.killTweensOf( self.container );
		TweenLite.to( self.container, args.animationTime, { delay: args.delay, opacity: 0, x: args.destX, ease: args.easeFunc } );
	}


	self.onHitRollOver = function(event) {
		if (!self.isOver) {
			self.isOver = true;
			TweenLite.killDelayedCallsTo( self.onHitRollOut );
			TweenLite.delayedCall( self.maxOverTime, self.onHitRollOut );
		}
		var animationTime = 1;//0.5;
		var easeFunc = Expo.easeOut;
		TweenLite.to( self.container, 0.25, { opacity: 1, ease: easeFunc });
		TweenLite.fromTo( self.arrow, animationTime, { rotation: 360 }, { transformOrigin:'50% 60%', rotation: 0, color: adData.whiteColor, ease:easeFunc, onComplete: function() {
			if (self.isOver)
				self.onHitRollOver();
		} } );
	}

	self.onHitRollOut = function(event) {
		TweenLite.to( self.container, 0.5, { opacity: self.opacity, ease: Quad.easeInOut });
		TweenLite.killDelayedCallsTo( self.onHitRollOut );
		self.isOver = false;
	}

	function onHitClick(event) {
		self.isOver = false;
		self.unregisterEvents();
		self.callback();
	}

	self.unregisterEvents = function() {
		Gesture.removeEventListener( self.container, GestureEvent.OVER, self.onHitRollOver );
		Gesture.removeEventListener( self.container, GestureEvent.OUT, self.onHitRollOut );
		Gesture.removeEventListener( self.container, GestureEvent.CLICK, onHitClick );
	}

	function registerEvents() {
		Gesture.addEventListener( self.container, GestureEvent.OVER, self.onHitRollOver );
		Gesture.addEventListener( self.container, GestureEvent.OUT, self.onHitRollOut );
		Gesture.addEventListener( self.container, GestureEvent.CLICK, onHitClick );
	}

	function nocallback() {

	}


	return self;
});









/* -- COMMON IMPLEMENTED: ActionBTN.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var ActionBTN = ( function() {

	var self = this;
	self.container;
	self.height = 42;
	self.width = 198;
	self.fill;
	self.fillOVER;
	self.callback;
	self.isCorrect = false;
	self.isWrong = false;
	self.id;
	self.fillColor;

	self.fillShowing = 0;
	self.isOver = false;


	self.build = function ( args ) {
		var id = self.id = args.id || 'ActionBTN';
		var target = args.target || adData.elements.redAdContainer;
		var fontSize = args.fontSize || 14;
		var lineHeight = args.lineHeight || fontSize;
		var width = self.width = args.width || self.width;
		var height = self.height = args.height || self.height;
		var top = args.top || 0;
		var left = args.left || 0;
		var margin = args.margin || 5;
		var multiline = args.multiline || true;
		var copy = args.copy || 'START PLAYING';
		self.callback = args.callback || nocallback;
		self.isCorrect = args.isCorrect;
		self.fillShowing = args.fillShowing || 0;

		self.container = new UIComponent({
			id: id + '_btn_container',
			target: target,
			css: {
				width: width,
				height: height,
				top: top,
				left: left,
				position: 'absolute',
				opacity: 0
			}
		});


		var border = UIImage({
			id: id + '_btn_border',
			target: self.container,
			source: 'btnBorder',
			css: {
				width: width,
				height: height,
				position: 'absolute'
			}
		});





		self.fill = adData.elements[id + '_fill'] = CanvasDrawer.create({
			id: id + '_fillCanvas',
			target: self.container,
			css: {
				width: width,
				height: height
			},
    			styles: 'position: absolute;',
			display: true,
			retina: false,
			debug: false
		});

		var fillImg = self.fill.addImage({
			source: 'btnFill',
			id: id + '_btnFill',
			params: {
				x: 0,
				y: 0,
				width: width,
				height: height
			}
		});

		self.fillColor = self.fill.addShape({
		    type: CanvasDrawType.RECT,
		    id: id + '_fillColor',
		    params: {
		        width: width,
		        height: height
		    },
		    blendMode: CanvasBlendMode.SOURCE_IN,
		    fill: adData.huluColors.primaryGreen
		});

		self.fill.update();

		self.fillOVER = UIImage({
			id: id + '_btn_fillOVER',
			target: self.container,
			source: 'btnFillOVER',
			css: {
				width: width,
				height: height,
				position: 'absolute',
				opacity: 0
			}
		});

		self.copyTF = Markup.addTextfield({
			id: id + '_btn_text',
			target: self.container,
			css: {
				width: width,
				height: height
			},
			margin: margin,
			multiline: multiline,
			textStyles: 'color: ' + adData.whiteColor + '; font-size: ' + fontSize + 'px; line-height: ' + lineHeight + 'px; font-family: ' + adData.tertiaryFont + '; text-align: center;'
		}, copy, false, false );
		TextUtils.autosizeTF( self.copyTF.textfield );
		Align.move( Align.CENTER, self.copyTF.textfield );

		Gesture.disableChildren( self.container );
	}

	self.simpleShow = function() {
		Styles.setCss( self.container, 'opacity', 1 );
		Styles.setCss( self.fillOVER, 'opacity', 0 );
		self.fill.tween.set( self.id + '_btnFill', { opacity: 0 } );
		self.fill.tween.start();
		TweenLite.delayedCall( 0.2, self.registerEvents );
	}

	self.blink = function() {
		if (!self.isOver) {
			self.fill.tween.fromTo( self.id + '_btnFill', 0.5, { opacity: 0 }, { opacity: 1, ease:Quad.easeOut, onComplete: function() {
				trace('ActionBTN.blink() onComplete');
				self.fill.tween.kill();
				TweenLite.delayedCall( 0.1, function() {
					self.fill.tween.to( self.id + '_btnFill', 0.5, { opacity: 0, ease:Quad.easeIn });
					self.fill.tween.start();
				} );
			} } );
			self.fill.tween.start();
		}
	}

	self.updateText = function( copy ) {
		TextUtils.addText( self.copyTF.textfield, copy );
		TextUtils.autosizeTF( self.copyTF.textfield );
		Align.move( Align.CENTER, self.copyTF.textfield );
	}

	self.show = function (delay) {
		self.fillColor.fill = adData.huluColors.primaryGreen;
		self.fill.update();
		var showDelay = delay || 0;
		if ( adData.autoplay ) {
			TweenLite.delayedCall( showDelay, function() {
				Styles.setCss( self.container, 'opacity', 1 );
				TweenLite.fromTo( self.fillOVER, 0.25, { opacity: 1 }, { opacity:0, ease:Quad.easeOut } );
				self.fill.tween.fromTo( self.id + '_btnFill', 0.45, { opacity: 1 }, { opacity: self.fillShowing, ease:Quad.easeInOut } );
				self.fill.tween.start();
				TweenLite.delayedCall( 0.2, self.registerEvents );
			} );
		}
		else {
			Styles.setCss( self.container, 'opacity', 1 );
			TweenLite.set( self.fillOVER, { opacity:0 } );
			self.fill.tween.set( self.id + '_btnFill', { opacity: self.fillShowing } );
			self.fill.tween.start();
			self.registerEvents();
		}
	}

	self.hide = function(quickHide) {
		self.unregisterEvents();
		TweenLite.killDelayedCallsTo( self.registerEvents );
		TweenLite.killTweensOf( self.fillOVER );
		self.fill.tween.kill();
		if (quickHide)
			TweenLite.set( self.container, { opacity: 0 });
		else
			TweenLite.to( self.container, 0.25, { opacity: 0, ease:Quad.easeInOut });
	}

	self.reset = function() {
		self.fillColor.fill = adData.huluColors.primaryGreen;
		self.onHitRollOut();
	}

	self.onSetCorrect = function() {
		self.fillColor.fill = adData.huluColors.primaryGreen;
		self.onHitRollOver();
	}

	self.onSetWrong = function() {
		self.isWrong = true;
		self.fillColor.fill = adData.wrongColor;
		self.onHitRollOver();
	}

	self.onHitRollOver = function(event) {
		self.isOver = true;
		TweenLite.fromTo( self.fillOVER, 0.5, { opacity: 1 }, { opacity:0, ease:Quad.easeOut } );
		self.fill.tween.set( self.id + '_btnFill', { opacity: 1 } );
		self.fill.tween.start();
	}

	self.onHitRollOut = function(event) {
		self.isOver = false;
		TweenLite.to( self.fillOVER, 0.5, { opacity: 0, ease:Quad.easeOut } );
		self.fill.tween.fromTo( self.id + '_btnFill', 0.5, { opacity: 1 }, { opacity: self.fillShowing, ease:Quad.easeInOut } );
		self.fill.tween.start();
	}

	self.onResetState = function() {
		self.isOver = false;
		self.fill.tween.to( self.id + '_btnFill', 0.5, { opacity: self.fillShowing, ease:Quad.easeInOut } );
		self.fill.tween.start();	
	}

	function onHitClick(event) {
		adData.userInteracted = true;
		self.unregisterEvents();
		if ( self.isCorrect )
			self.onSetCorrect(self);
		else
			self.onSetWrong(self);
		self.callback();
	}

	self.unregisterEvents = function() {
		Gesture.removeEventListener( self.container, GestureEvent.OVER, self.onHitRollOver );
		Gesture.removeEventListener( self.container, GestureEvent.OUT, self.onHitRollOut );
		Gesture.removeEventListener( self.container, GestureEvent.CLICK, onHitClick );
	}

	self.registerEvents = function() {
		Gesture.addEventListener( self.container, GestureEvent.OVER, self.onHitRollOver );
		Gesture.addEventListener( self.container, GestureEvent.OUT, self.onHitRollOut );
		Gesture.addEventListener( self.container, GestureEvent.CLICK, onHitClick );
	}

	function nocallback() {

	}


	return self;
});









/* -- COMMON IMPLEMENTED: QuizCtaBTN.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var QuizCtaBTN = ( function() {

	var self = this;
	self.container;
	self.callback;

	self.arrow;
	self.isOver = false;
	self.maxOverTime = 1;

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

		self.container = new UIComponent({
			id: 'quiz_cta',
			target: target,
			css: {
				width: width,
				height: height,
				top: top,
				left: left,
				position: 'absolute',
			}
		});



		var copyTF = Markup.addTextfield({
			id: 'quiz_cta_text',
			target: self.container,
			css: {
				width: width,
				height: height
			},
			margin: margin,
			multiline: multiline,
			textStyles: 'color: ' + adData.whiteColor + '; font-size: ' + fontSize + 'px; line-height: ' + lineHeight + 'px; font-family: ' + adData.primaryFont + '; text-align: left;'
		}, adData.quizCTA, false, false );
		fontSize = lineHeight = TextUtils.autosizeTF( copyTF.textfield );

		var arrowLeft = Styles.getCss( copyTF.textfield, 'width' ) + 3;
		self.arrow = Markup.addTextfield({
			id: 'quiz_cta_arrow',
			target: self.container,
			css: {
				width: width,
				height: height,
				left: arrowLeft
			},
			margin: margin,
			multiline: multiline,
			textStyles: 'color: ' + adData.huluColors.primaryGreen + '; font-size: ' + fontSize + 'px; line-height: ' + lineHeight + 'px; font-family: ' + adData.primaryFont + '; text-align: left;'
		}, '›', false, false );

		TextUtils.fitContainerToText( self.arrow, true, true );

		Styles.setCss( self.container, 'width', arrowLeft + Styles.getCss( self.arrow.textfield, 'width' ) );


		Gesture.disableChildren( self.container );

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
		TweenLite.to( self.arrow.textfield, animationTime, { x: 3, color: adData.whiteColor, ease:easeFunc, onComplete: function() {
			TweenLite.to( self.arrow.textfield, animationTime, { x: 0, color: adData.huluColors.primaryGreen, ease:easeFunc, onComplete: function() {
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
		Gesture.removeEventListener( self.container, GestureEvent.OVER, self.onHitRollOver );
		Gesture.removeEventListener( self.container, GestureEvent.OUT, self.onHitRollOut );
		Gesture.removeEventListener( self.container, GestureEvent.CLICK, onHitClick );
	}

	function registerEvents() {
		Gesture.addEventListener( self.container, GestureEvent.OVER, self.onHitRollOver );
		Gesture.addEventListener( self.container, GestureEvent.OUT, self.onHitRollOut );
		Gesture.addEventListener( self.container, GestureEvent.CLICK, onHitClick );
	}

	function nocallback() {

	}


	return self;
});









/* -- COMMON IMPLEMENTED: QuizQuestion.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var QuizQuestion = ( function() {

	var self = this;
	self.container;
	self.id;
	self.imageContainer;
	self.image;
	self.btns;
	self.imageWidth;
	self.answers;
	self.correctAnswerBTN;
	self.answerCORRECT;
	self.answerWRONG;

	self.callback;
	self.onAnswered;
	self.startScale = 3;
	self.imageAnimation;
	self.isCorrect = false;
	self.question = '';
	self.firstPlay = true;
	self.showing = false;


	self.build = function ( args ) {
		self.id = args.id || 1;
		var target = args.target || adData.elements.redAdContainer;
		self.callback = args.callback || nocallback;
		self.onAnswered = args.onAnswered || nocallback;
		self.imageWidth = args.imageWidth || 520;
		var answersWidth = adParams.adWidth - self.imageWidth;
		

		self.container = new UIComponent({
			id: 'question_' + self.id,
			target: target,
			css: {
				width: adParams.adWidth,
				height: adParams.adHeight,
				position: 'absolute'
			}
		});
		Gesture.disable( self.container );
		self.answersContainer = new UIComponent({
			id: 'answersContainer_' + self.id,
			target: self.container,
			css: {
				width: answersWidth - 6,
				height: 137,
				position: 'absolute'
			}
		})

		var answersInnerContainer = new UIComponent({
			id: 'answersInnerContainer_' + self.id,
			target: self.answersContainer,
			css: {
				width: 407,
				height: 97,
				top: 96,
				position: 'absolute'
			}
		})

		var answerKey = [ 'a', 'b', 'c', 'd' ];
		self.answers = [];
		var answer;
		var spacer = 12;
		var top = 0;
		var left = 0;
		var questionData = adData.questions[self.id - 1];
		self.question = questionData.question;
		var isCorrect;
		for (var i = 0; i < 4; i++) {
			if (i > 1) {
				top = answer.height + spacer;
			}
			left = (i + 1) % 2 ? 0 : answer.width + spacer;
			isCorrect = (questionData.answer.toLowerCase() == answerKey[i]);
			answer = new ActionBTN();
			answer.build({
				id: 'answer_' + self.id + '_' + (i + 1),
				target: answersInnerContainer,
				copy: questionData.answers[i],
				top: top,
				left: left,
				isCorrect: isCorrect,
				callback: isCorrect ? onCorrectAnswer : onWrongAnswer
			});
			if ( isCorrect )
				self.correctAnswerBTN = answer;
			self.answers.push( answer );
		}

		var lastAnswer = self.answers[self.answers.length - 1];
		Styles.setCss( answersInnerContainer, 'width', Styles.getCss( lastAnswer.container, 'left' ) + lastAnswer.width );
		Styles.setCss( answersInnerContainer, 'height', Styles.getCss( lastAnswer.container, 'top' ) + lastAnswer.height );
		Align.moveX( Align.CENTER, answersInnerContainer );

		self.answersCover = new UIComponent({
			id: 'answersCover_' + self.id,
			target: answersInnerContainer,
			css: {
				width: answersWidth - 6,
				height: 137,
				position: 'absolute',
				backgroundColor: adData.greyColor,
				opacity: 0
			}
		})
		self.imageContainer = new UIComponent({
			id: 'questionImageContainer_' + self.id,
			target: self.container,
			css: {
				width: self.imageWidth,
				height: adParams.adHeight,
				left: answersWidth,
				position: 'absolute',
				overflow: 'hidden',
				opacity: 0
			}
		});

		self.image = new UIImage({
			id: 'questionImage_' + self.id,
			target: self.imageContainer,
			source: adData.questions[self.id - 1].image,
			css: {
			}
		});
		TweenLite.set( self.image, { scale: self.startScale } );

		self.video = new QuizQuestionVideo();
		self.video.build({
			id: 'video_' + self.id,
			target: self.imageContainer,
			videoID: adData.videoIDs[self.id - 1],
			callback: self.callback
		});




		self.answerCORRECT = new QuizResultMarker();
		self.answerCORRECT.build({
			target: self.imageContainer,
			id: self.id + '_CORRECT',
			isCorrect: true,
			callback: playVideo
		});
		Align.move( Align.CENTER, self.answerCORRECT.container );

		self.answerWRONG = new QuizResultMarker();
		self.answerWRONG.build({
			target: self.imageContainer,
			id: self.id + '_WRONG',
			isCorrect: false,
			callback: playVideo
		});
		Align.move( Align.CENTER, self.answerWRONG.container );



		Styles.setCss( self.container, 'display', 'none' );
	}

	self.reset = function() {
		TweenLite.set( self.container, { opacity: 0 } );
		TweenLite.set( self.image, { scale: self.startScale } );
		for (var i = 0; i < self.answers.length; i++)
			self.answers[i].reset();
		enableBTNs();
	}

	self.resolve = function() {
		stop();
		TweenLite.to( self.image, adData.questionQuickResolveTime, { scale: 1, ease:Quad.easeOut, onComplete: showAnswer } );
	}

	self.timerAnimation = function() {
		self.imageAnimation = TweenLite.fromTo( self.image, adData.questionTime, { scale: self.startScale }, { scale: 1, ease:Circ.easeOut, onComplete: onWrongAnswer } );
	}

	self.show = function() {
		trace('QuizQuestion.show() self.id:' + self.id);
		TweenLite.set( self.container, { opacity: 1, display: 'inherit' } );
		for (var i = 0; i < self.answers.length; i++)
			self.answers[i].show( 0.5 + (0.2 * i) );
		if ( self.firstPlay == !adData.autoplay ) {
			self.firstPlay = false;
			TweenLite.set( self.imageContainer, { opacity: 1 } );
		}
		else if (self.showing)
			TweenLite.to( self.imageContainer, 0.5, { opacity: 1, ease:Quad.easeInOut } );
		else
			TweenLite.fromTo( self.imageContainer, 0.5, { opacity: 0 }, { opacity: 1, ease:Quad.easeInOut } );
		self.showing = true;
	}

	self.resetAnswers = function() {
		for (var i = 0; i < self.answers.length; i++)
			self.answers[i].hide();
		TweenLite.killTweensOf( self.image );
		TweenLite.to( self.image, 1.5, { scale: self.startScale, ease:Quad.easeOut });
	}

	self.hide = function() {
		for (var i = 0; i < self.answers.length; i++)
			self.answers[i].hide();
		TweenLite.to( self.container, 1, { opacity: 0, ease:Quad.easeInOut, onComplete: function() {
			self.showing = false;
			Styles.setCss( self.container, 'display', 'none' );
		} } );
	}

	function stop() {
		TweenLite.killTweensOf( self.image );
	}

	self.pause = function() {
		if ( adData.autoplay )
			TweenLite.to( self.answersCover, 0.5, { opacity: 0.85, ease:Quad.easeOut });
		else
			TweenLite.set( self.answersCover, { opacity: 0.85 });
		disableBTNs();
		if (self.imageAnimation)
			self.imageAnimation.pause();
	}

	self.replay = function() {
		TweenLite.to( self.answersCover, 0.5, { opacity: 0, ease:Quad.easeOut });
		self.timerAnimation();
	}

	function enableBTNs() {
		for (var i = 0; i < self.answers.length; i++)
			self.answers[i].registerEvents();
	}

	function disableBTNs() {
		for (var i = 0; i < self.answers.length; i++)
			self.answers[i].unregisterEvents();
	}

	function setAnsweredButtonStates() {
		var answerBTN;
		for (var i = 0; i < self.answers.length; i++) {
			answerBTN = self.answers[i];
			answerBTN.unregisterEvents();
			if ( !answerBTN.isCorrect && !answerBTN.isWrong )
				answerBTN.onResetState();
		}
	}

	function onCorrectAnswer() {
		self.isCorrect = true;
		disableBTNs();
		setAnsweredButtonStates();
		self.onAnswered(true);

		self.resolve();
	}

	function onWrongAnswer() {
		self.isCorrect = false;
		disableBTNs();
		setAnsweredButtonStates();
		self.onAnswered(false);
		TweenLite.delayedCall( 0.5, self.correctAnswerBTN.onSetCorrect );
		self.resolve();
	}

	function showAnswer() {
		if ( self.isCorrect )
			self.answerCORRECT.show();
		else
			self.answerWRONG.show();
	}

	function playVideo() {
		self.video.show();
	}

	function nocallback() {

	}


	return self;
});









/* -- COMMON IMPLEMENTED: Timer.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var Timer = ( function() {

	var self = this;

	self.container;
	self.width;
	self.segments;
	self.segment;


	self.build = function ( args ) {
		var target = args.target || adData.elements.redAdContainer;
		self.width = args.width || 6;
		var left = args.left || 0;
		self.container = new UIComponent({
			id: 'timer',
			target: target,
			css: {
				width: self.width,
				height: adParams.adHeight,
				left: left,
				position: 'absolute',
			}
		});
		self.bg = new UIComponent({
			id: 'timerBG',
			target: self.container,
			css: {
				width: self.width,
				height: adParams.adHeight,
				position: 'absolute',
				backgroundColor: '#404041'
			}
		});
		TweenLite.set( self.bg, { transformOrigin:'left top', scaleY: 0 } );
		self.segments = [];
		var segmentHeight = adParams.adHeight / adData.questions.length;
		var segment;
		for (var i = 0; i < adData.questions.length; i++) {
			segment = new TimerSegment();
			segment.build({
				id: i + 1,
				target: self.container,
				hasBullet: (i < (adData.questions.length - 1)),
				height: segmentHeight,
				top: segmentHeight * i
			});
			self.segments.push(segment);
		}

		self.segment = self.segments[0];
	}

	self.resolve = function(isCorrect) {
		self.segment.resolve(isCorrect);
	}

	self.pause = function() {
		self.segment.pause();
	}

	self.reset = function() {
		self.segment.reset();
	}

	self.replay = function() {
		self.timerAnimation(self.segment.id);
	}

	self.resetAll = function() {
		self.segment = self.segments[0];
		TweenLite.set( self.bg, { scaleY: 0 } );
		for (var i = 0; i < self.segments.length; i++)
			self.segments[i].reset(true);
	}

	self.timerAnimation = function(segmentNum) {
		self.segment = self.segments[segmentNum - 1];
		self.segment.timerAnimation();
	}

	self.show = function() {
		if ( adData.autoplay )
			TweenLite.to( self.bg, 0.5, { scaleY: 1, ease:Quad.easeOut } );
		else
			TweenLite.set( self.bg, { scaleY: 1 } );
		for (var i = 0; i < self.segments.length; i++)
			self.segments[i].show();
	}

	self.hide = function() {
	}

	function nextQuestion() {
	}

	function nocallback() {

	}


	return self;
});









/* -- COMMON IMPLEMENTED: GalleryNavBTN.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var GalleryNavBTN = ( function() {

	var self = this;
	self.container;
	self.arrow;

	self.callback;
	self.isOver = false;
	self.maxOverTime = 1;

	self.build = function ( args ) {
		var id = args.id || 'galleryNavBTN';
		var target = args.target || adData.elements.redAdContainer;
		var top = args.top || 0;
		var left = args.left || 0;
		var width = args.width || 16;
		var height = args.height || 32;
		self.callback = args.callback || nocallback;

		self.container = new UIComponent({
			id: 'galleryNavBTN_' + id,
			target: target,
			css: {
				width: width,
				height: height,
				top: top,
				left: left,
				position: 'absolute',
				rotation: id.toLowerCase().indexOf('right') ? 180 : 0,
				opacity: 0,
			}
		});

		self.arrow = new UIImage({
			id: 'galleryNavBTN_arrow_' + id,
			target: self.container,
			source: 'galleryArrow',
			css: {
			}
		});

		Align.moveY( Align.CENTER, self.arrow );


		Gesture.disableChildren( self.container );

		self.show();
	}


	self.show = function () {
		registerEvents();
		TweenLite.fromTo( self.container, 0.5, { x: -40, opacity: 0 }, { delay: 0.5, x: 0, opacity: 1, ease:Quad.easeOut } );
	}

	self.hide = function() {
	}


	function onHitRollOver(event) {
		if (!self.isOver) {
			self.isOver = true;
			TweenLite.killDelayedCallsTo( onHitRollOut );
			TweenLite.delayedCall( self.maxOverTime, onHitRollOut );
		}
		var animationTime = 0.25;
		var easeFunc = Quad.easeInOut;
		TweenLite.to( self.arrow, animationTime, { x: 4, color: adData.whiteColor, ease:easeFunc, onComplete: function() {
			TweenLite.to( self.arrow, animationTime, { x: 0, color: adData.huluColors.primaryGreen, ease:easeFunc, onComplete: function() {
				if (self.isOver)
					onHitRollOver();
			} })
		} } );
	}

	function onHitRollOut(event) {
		TweenLite.killDelayedCallsTo( onHitRollOut );
		self.isOver = false;
	}

	function onHitClick(event) {
		self.callback();
	}

	self.unregisterEvents = function() {
		Gesture.removeEventListener( self.container, GestureEvent.OVER, onHitRollOver );
		Gesture.removeEventListener( self.container, GestureEvent.OUT, onHitRollOut );
		Gesture.removeEventListener( self.container, GestureEvent.CLICK, onHitClick );
	}

	function registerEvents() {
		Gesture.addEventListener( self.container, GestureEvent.OVER, onHitRollOver );
		Gesture.addEventListener( self.container, GestureEvent.OUT, onHitRollOut );
		Gesture.addEventListener( self.container, GestureEvent.CLICK, onHitClick );
	}

	function nocallback() {

	}


	return self;
});









/* -- COMMON IMPLEMENTED: GalleryThumbBTN.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var GalleryThumbBTN = ( function() {

	var self = this;
	self.container;
	self.image;

	self.id;
	self.url;
	self.callback;
	self.height;
	self.width;

	self.build = function ( args ) {
		var id = self.id = args.id || 'galleryThumbBTN';
		var target = args.target || adData.elements.redAdContainer;
		var top = args.top || 0;
		var left = args.left || 0;
		var source = args.source;
		thumbData = args.thumbData;
		self.width = args.width || thumbData.width;
		self.height = args.height || thumbData.height;
		self.url = args.url || 'http://www.hulu.com/start';
		self.callback = args.callback || nocallback;

		self.container = new UIComponent({
			id: id,
			target: target,
			css: {
				width: self.width,
				height: self.height,
				top: top,
				left: left,
				position: 'absolute',
			}
		});
		Gesture.disable( self.container );

		var backImage = new UIImage({
			id: id + '_backImage',
			target: self.container,
			source: source,
			css: {
			}
		});

		self.bg = new UIComponent({
			id: id + '_border',
			target: self.container,
			css: {
				width: self.width,
				height: self.height,
				position: 'absolute',
				opacity: 0.65,
				backgroundColor: adData.huluColors.primaryGreen
			}
		});

		self.image = new UIImage({
			id: id + '_image',
			target: self.container,
			source: source,
			css: {
			}
		});



		TweenLite.set( self.image, { clip:'rect(0px ' + self.width + 'px ' + self.height + 'px 0px)' } );
	}


	self.show = function (args) {
		var border = 20;
		registerEvents();
		TweenLite.fromTo( self.container, args.animationTime, { opacity: 0, x: args.startX }, { delay: args.delay, opacity: 1, x: 0, ease: Quad.easeOut } );
		TweenLite.fromTo( self.image, 0.5, { clip:'rect(' + border + 'px ' + (self.width - border) + 'px ' + ( self.height - border ) + 'px ' + border + 'px)' }, { delay: args.delay, clip:'rect(0px ' + self.width + 'px ' + self.height + 'px 0px)', ease:Quad.easeInOut });
	}

	self.hide = function() {
	}


	self.onHitRollOver = function(event) {
		var border = 6;
		TweenLite.to( self.image, 0.5, { clip:'rect(' + border + 'px ' + (self.width - border) + 'px ' + ( self.height - border ) + 'px ' + border + 'px)', ease:Expo.easeOut });
	}

	self.onHitRollOut = function(event) {
		TweenLite.to( self.image, 0.5, { clip:'rect(0px ' + self.width + 'px ' + self.height + 'px 0px)', ease:Quad.easeInOut });
	}

	function onHitClick(event) {
		trace('GalleryThumbBTN.onHitClick()');
		var id = parseInt(self.id.replace('gallery_thumb_', ''));
		trace('		id:' + id);
		var clickTagURL = adData.endframeURLs[ id - 1 ];
		trace('		clickTagURL:' + clickTagURL);
		adData.networkExit( [ 2, clickTagURL ] );
		self.callback();
	}

	self.unregisterEvents = function() {
		Gesture.removeEventListener( self.container, GestureEvent.OVER, self.onHitRollOver );
		Gesture.removeEventListener( self.container, GestureEvent.OUT, self.onHitRollOut );
		Gesture.removeEventListener( self.container, GestureEvent.CLICK, onHitClick );
	}

	function registerEvents() {
		Gesture.addEventListener( self.container, GestureEvent.OVER, self.onHitRollOver );
		Gesture.addEventListener( self.container, GestureEvent.OUT, self.onHitRollOut );
		Gesture.addEventListener( self.container, GestureEvent.CLICK, onHitClick );
	}

	function nocallback() {

	}


	return self;
});









/* -- COMMON IMPLEMENTED: QuizResultMarker.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var QuizResultMarker = ( function() {

	var self = this;
	self.container;
	self.answerCORRECT;
	self.answerWRONG;

	self.callback;

	self.build = function ( args ) {
		var id = args.id || 1;
		var target = args.target || adData.elements.redAdContainer;
		var width = args.width || 54;
		var height = args.height || 54;
		var fontSize = args.fontSize || 34;
		var lineHeight = args.lineHeight || 30;
		var color = args.isCorrect ? adData.huluColors.primaryColo : adData.wrongColor;
		var copy = args.isCorrect ? '√' : 'X';
		self.callback = args.callback || nocallback;

		self.container = new UIComponent({
			id: 'quizResultMarker_' + id,
			target: target,
			css: {
				width: width,
				height: height,
				position: 'absolute'
			}
		});



		var fill = CanvasDrawer.create({
			id: 'quizFillCanvas_' + id,
			target: self.container,
			css: {
				width: width,
				height: height
			},
    			styles: 'position: absolute;',
			display: true,
			retina: false,
			debug: false
		});

		var fillImg = fill.addImage({
			source: 'circle',
			id: 'quizFillImg' + id,
			params: {
				x: 0,
				y: 0,
				width: width,
				height: height
			}
		});

		var fillColor = fill.addShape({
		    type: CanvasDrawType.RECT,
		    id: 'quizFillColor_' + id,
		    params: {
		        width: width,
		        height: height
		    },
		    blendMode: CanvasBlendMode.SOURCE_IN,
		    fill: color
		});

		fill.update();



		var answerCORRECTCheck = Markup.addTextfield({
			id: 'quizAnserMarkerSimbol_' + id,
			target: self.container,
			css: {
				width: width,
				height: height,
			},
			margin: 0,
			multiline: false,
			textStyles: 'color: ' + adData.whiteColor + '; font-size: 34px; line-height: 30px; font-family: ' + adData.primaryFont + '; text-align: center;'
		}, copy, false, false );
		Align.move( Align.CENTER, answerCORRECTCheck.textfield, 0, 2 );
		Styles.hide( self.container );
	}


	self.show = function() {
		Styles.show( self.container );
		TweenLite.fromTo( self.container, 0.75, { opacity: 1 }, { opacity: 0, ease:Quad.easeIn, onComplete: function() {
			self.callback();
			Styles.hide( self.container );
		} } );
	}

	function nocallback() {

	}


	return self;
});









/* -- COMMON IMPLEMENTED: QuizQuestionVideo.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var QuizQuestionVideo = ( function() {

	var self = this;
	self.container;
	self.ftVideo;
	self.playPause;

	self.showCallback;
	self.videoPlaying = false;;

	self.build = function ( args ) {
		var id = args.id;
		var target = args.target || adData.elements.redAdContainer;
		var width = args.width || 520;
		var height = args.height || adParams.adHeight;
		var videoID = args.videoID || '60277/126184_imdb_quiz_Blindspot_520x250';
		self.callback = args.callback || nocallback;

		self.container = new UIComponent({
			id: id,
			target: target,
			css: {
				width: width,
				height: height,
				position: 'absolute',
				backgroundColor: adData.greyColor
			}
		});

		self.ftVideo = myFT.insertVideo({
			parent: self.container,
			video: videoID,
			height: 250,
			width: 520,
			controls:false,
			autoplay:false
		});

		self.ftVideo.on("ended", function() {
			hide();
		});


		Gesture.disable( self.container );





		self.skip = new VideoControlsBTN();
		self.skip.build({
			target: self.container,
			id: 'video_skip' + id,
			imageID: 'video_skip',
			width: 100,
			height: 20,
			callback: hide,
			copy: 'SKIP',
			fontSize: 13
		})





		var controlsSize = 21;

		var controlsContainer = new UIComponent({
			id: 'videoControlsContainer_' + id,
			target: self.container,
			css: {
				width: (controlsSize * 2) + 5,
				height: controlsSize,
				position: 'absolute'
			}
		});


		self.playPause = new VideoControlsBTN();
		self.playPause.build({
			target: controlsContainer,
			id: 'video_pause' + id,
			imageID: 'video_pause',
			width: controlsSize,
			height: controlsSize,
			callback: self.onPlayPause
		});

		self.mute = new VideoControlsBTN();
		self.mute.build({
			target: controlsContainer,
			id: 'video_audioOn' + id,
			imageID: 'video_audioOn',
			width: controlsSize,
			height: controlsSize,
			left: controlsSize + 5,
			callback: onSoundOnOff
		});


		


		var yOffset = -6;//-21;
		Align.moveX( Align.CENTER, controlsContainer );
		Align.moveY( Align.BOTTOM, controlsContainer, yOffset );
		Align.move( Align.TOP_RIGHT, self.skip.container, -8, 17 );


		Styles.hide( self.container );

	}


	self.show = function() {
		trace('QuizQuestionVideo.show()');
		adData.curVideoPlayer = self;
		Styles.show( self.container );
		TweenLite.fromTo( self.container, 0.25, { opacity: 0 }, { opacity: 1, ease:Quad.easeInOut } );
		
		(adData.isMobile)? self.videoPlaying =  false: self.videoPlaying = true;
		self.mute.updateIcon( adData.videoMuted ? 'video_audioOff' : 'video_audioOn' );
		self.ftVideo.video.currentTime = 0;
		(adData.isMobile)?self.ftVideo.video.pause():self.ftVideo.video.play();
		self.ftVideo.video.muted = adData.videoMuted;
		(adData.isMobile)?self.playPause.updateIcon( 'video_play' ):self.playPause.updateIcon( 'video_pause' );
		self.playPause.show();
		self.skip.show();
		self.mute.show();
	}

	function onSoundOnOff() {
		if ( adData.videoMuted ) {
			adData.videoMuted = false;
			self.ftVideo.video.muted = false;
			self.mute.updateIcon( 'video_audioOn' );
		}
		else {
			adData.videoMuted = true;
			self.ftVideo.video.muted = true;
			self.mute.updateIcon( 'video_audioOff' );
		}
	}

	self.onPlayPause = function(forcePause) {
		trace('QuizQuestionVideo.onPlayPause()');
		trace('		self.videoPlaying:' + self.videoPlaying);
		self.videoPlaying = forcePause ? true : self.videoPlaying;
		if ( self.videoPlaying ) {
			self.videoPlaying = false;
			self.ftVideo.video.pause();
			self.playPause.updateIcon( 'video_play' );
		}else{
			self.videoPlaying = true;
			self.ftVideo.video.play();
			self.playPause.updateIcon( 'video_pause' );
		}
	}

	function hide() {
		adData.curVideoPlayer = null;
		self.videoPlaying = false;
		self.ftVideo.video.pause();

		self.playPause.unregisterEvents();
		self.skip.unregisterEvents();
		self.mute.unregisterEvents();

		TweenLite.delayedCall( 1, function() {
			Styles.hide( self.container );
		});

		self.callback();
	}

	function nocallback() {

	}


	return self;
});









/* -- COMMON IMPLEMENTED: TimerSegment.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var TimerSegment = ( function() {

	var self = this;

	self.container;
	self.line;
	self.bullet;
	self.id = 0;

	self.animation;


	self.build = function ( args ) {
		var id = self.id = args.id || 1;
		var target = args.target || adData.elements.redAdContainer;
		var width = args.width || 6;
		var height = args.height || 4;
		var top = args.top || 0;
		var hasBullet = args.hasBullet || false;
		var bulletHeight = args.bulletHeight || 4;
		self.container = new UIComponent({
			id: 'timerSegment_' + id,
			target: target,
			css: {
				width: width,
				height: height,
				top: top,
				position: 'absolute',
			}
		});
		self.line = new UIComponent({
			id: 'line_' + id,
			target: self.container,
			css: {
				width: width,
				height: hasBullet ? height - bulletHeight : height,
				position: 'absolute',
				backgroundColor: adData.huluColors.primaryGreen
			}
		});
		TweenLite.set( self.line, { transformOrigin:'left top', scaleY: 0 });
		if ( hasBullet ) {
			self.bullet = new UIComponent({
				id: 'bullet_' + id,
				target: self.container,
				css: {
					width: width,
					height: bulletHeight,
					top: height - bulletHeight,
					position: 'absolute',
					backgroundColor: adData.whiteColor,
					opacity: 0
				}
			});
		}

	}

	self.show = function(ignoreDelay) {
		if ( self.bullet ) {
			var mydelay = ignoreDelay ? 0 : 0.15 * self.id;
			TweenLite.killTweensOf( self.bullet );
			if ( adData.autoplay )
				TweenLite.fromTo( self.bullet, 0.25, { opacity: 0, scale: 4 }, { delay: mydelay, opacity: 1, scale: 1, ease:Quad.easeOut });
			else
				TweenLite.set( self.bullet, { opacity: 1, scale: 1 });
		}
	}

	self.reset = function(skipAnimation) {
		TweenLite.killTweensOf( self.line );
		if (skipAnimation) {
			TweenLite.set( self.line, { scaleY: 0 });
			if (self.bullet)
				TweenLite.set( self.bullet, { opacity: 0 });
		}
		else
			TweenLite.to( self.line, 1.5, { scaleY: 0, ease:Quad.easeOut });
	}

	function stop() {
		TweenLite.killTweensOf( self.line );
	}

	self.pause = function() {
		adData.quizTimerTicking = false;
		if (self.animation)
			self.animation.pause();
	}

	self.resolve = function(isCorrect) {
		adData.quizTimerTicking = false;
		stop();
		self.show(true);
		TweenLite.to( self.line, adData.questionQuickResolveTime, { scaleY: 1 } );
		var color = isCorrect ? adData.huluColors.primaryGreen : adData.wrongColor;
		TweenLite.fromTo( self.line, 1, { backgroundColor: adData.whiteColor }, { backgroundColor: color, ease:Quad.easeOut } );
	}

	self.timerAnimation = function() {
		adData.quizTimerTicking = true;
		TweenLite.set( self.line, { backgroundColor: adData.huluColors.primaryGreen } );
		self.animation = TweenLite.fromTo( self.line, adData.questionTime, { scaleY: 0 }, { scaleY: 1, ease:Linear.easeNone, onComplete: onComplete } );
	}

	function onComplete() {
		self.resolve(false);
	}



	return self;
});









/* -- COMMON IMPLEMENTED: VideoControlsBTN.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var VideoControlsBTN = ( function() {

	var self = this;
	self.container;
	self.icon;
	self.iconOVER;
	self.copyTF;

	self.callback;

	self.build = function ( args ) {
		var id = args.id || 'playPause';
		var imageID = args.imageID || 'playPause';
		var target = args.target || adData.elements.redAdContainer;
		var width = args.width || 20;
		var height = args.height || 20;
		var top = args.top || 0;
		var left = args.left || 0;
		var copy = args.copy;
		var fontSize = args.fontSize || 13;
		var lineHeight = args.lineHeight || fontSize;
		self.callback = args.callback || nocallback;

		self.container = new UIComponent({
			id: 'videoControlsBTN_' + id + imageID,
			target: target,
			css: {
				width: width,
				height: height,
				top: top,
				left: left,
				position: 'absolute',
			}
		});


		if (copy) {
			self.copyTF = Markup.addTextfield({
				id: 'videoControlsBTN_copy_' + id + imageID,
				target: self.container,
				css: {
					width: width,
					height: height
				},
				margin: 0,
				multiline: false,
				textStyles: 'color: ' + adData.huluColors.primaryGreen + '; font-size: ' + fontSize + 'px; line-height: ' + lineHeight + 'px; font-family: ' + adData.tertiaryFont + '; text-align: center;'
			}, copy, false, false );
			TextUtils.fitContainerToText( self.copyTF, true, true );

			Styles.setCss( self.container, 'width', Styles.getCss( self.copyTF.container, 'width' ) );
			Styles.setCss( self.container, 'height', Styles.getCss( self.copyTF.container, 'height' ) );
		}
		else {
			self.icon = new UIImage({
				id: 'videoControlsBTN_icon_' + id + imageID,
				target: self.container,
				source: imageID,
				css: {
					width: width,
					height: height
				}
			});

			self.iconOVER = new UIImage({
				id: 'videoControlsBTN_iconOVER_' + id + imageID,
				target: self.container,
				source: imageID + '_OVER',
				css: {
					width: width,
					height: height,
					opacity: 0
				}
			});
		}


		Gesture.disableChildren( self.container );
	}

	self.updateIcon = function( id ) {
		trace('VideoControlsBTN.updateIcon()');
		trace('		id:' + id);
		Styles.setCss( self.icon , 'background-image', ImageManager.get( id ).src );
		Styles.setCss( self.iconOVER , 'background-image', ImageManager.get( id + '_OVER' ).src );
	}


	self.show = function () {
		registerEvents();
	}

	self.hide = function() {
	}


	self.onHitRollOver = function(event) {
		trace('VideoControlsBTN.onHitRollOver()');
		if ( self.copyTF )
			TweenLite.to( self.copyTF.textfield, 0.15, { color: adData.whiteColor, ease:Quad.easeOut });
		else
			TweenLite.to( self.iconOVER, 0.15, { opacity: 1, ease:Quad.easeOut } );
	}

	self.onHitRollOut = function(event) {
		trace('VideoControlsBTN.onHitRollOut()');
		var animationTime = 0.5;
		if ( self.copyTF )
			TweenLite.to( self.copyTF.textfield, animationTime, { color: adData.huluColors.primaryGreen, ease:Quad.easeInOut });
		else
			TweenLite.to( self.iconOVER, animationTime, { opacity: 0, ease:Quad.easeInOut } );
	}

	function onHitClick(event) {
		trace('VideoControlsBTN.onHitClick()');
		trace('		self.callback:' + self.callback);
		self.callback();
	}

	self.unregisterEvents = function() {
		Gesture.removeEventListener( self.container, GestureEvent.OVER, self.onHitRollOver );
		Gesture.removeEventListener( self.container, GestureEvent.OUT, self.onHitRollOut );
		Gesture.removeEventListener( self.container, GestureEvent.CLICK, onHitClick );
		self.onHitRollOut();
	}

	function registerEvents() {
		Gesture.addEventListener( self.container, GestureEvent.OVER, self.onHitRollOver );
		Gesture.addEventListener( self.container, GestureEvent.OUT, self.onHitRollOut );
		Gesture.addEventListener( self.container, GestureEvent.CLICK, onHitClick );
	}

	function nocallback() {

	}


	return self;
});



















/* -- BUILD SIZE( 970x250 ): build.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
/* Template: Flashtalking - Base, AdApp: 1.1.99, AdHtml: v2.6.2, Instance: 08/25/16 10:06am */
var Control = new function() {
	this.prepareBuild = function() {
		trace( 'Control.prepareBuild()' );
		Control.preMarkup();
		View.buildMarkup();
		Control.postMarkup();
		Animation.startScene();
	}
	this.preMarkup = function() {
		trace( 'Control.preMarkup()' );
	}
	this.postMarkup = function() {
		trace( 'Control.postMarkup()' );
		Gesture.addEventListener( adData.elements.startBTN, GestureEvent.CLICK, Control.onStartClicked);
		Gesture.addEventListener( adData.elements.startBTN, GestureEvent.OVER, adData.elements.intro.btn.onHitRollOver);
		Gesture.addEventListener( adData.elements.startBTN, GestureEvent.OUT, adData.elements.intro.btn.onHitRollOut);
	}
	this.onStartClicked = function(event) {
		adData.userInteracted = true;
		Animation.skipIntro();
	}

	this.reset = function() {
		adData.autoplay = true;		// -- if it's a unit that doesnt' autoplay, must set autoplay to true when replaying
		Gesture.removeEventListener( adData.elements.exitBTN, GestureEvent.OVER, adData.elements.endframe.endframeCTA.onHitRollOver);
		Gesture.removeEventListener( adData.elements.exitBTN, GestureEvent.OUT, adData.elements.endframe.endframeCTA.onHitRollOut);
		adData.elements.quiz.reset();
		Animation.showQuiz();
	}
}
var View = new function() {
	this.buildMarkup = function() {
		trace( 'View.buildMarkup()' );
		if (adData.guide) {
			adData.elements.guide = new UIImage ({
				id: 'guide',
				target: adData.elements.redAdContainer,
				source: adData.guide,
				css: {}
			});
		}


		adData.elements.bg = new UIComponent({
			id: 'bg',
			target: adData.elements.redAdContainer,
			css:{
				width: adParams.adWidth,
				height: adParams.adHeight,
				position: 'absolute',
				backgroundColor: adData.greyColor
			}
		});



		adData.elements.exitBTN = new UIComponent({
			id: 'exitBTN',
			target: adData.elements.redAdContainer,
			css:{
				width: adParams.adWidth,
				height: adParams.adHeight,
				position: 'absolute'
			}
		});


		adData.elements.quiz = new Quiz();
		adData.elements.quiz.build({
			target: adData.elements.redAdContainer,
			quizWidth: 444,
			callback: Animation.showResults,
			question: {
				imageWidth: 520
			},
			marker: {
				width: 30,
				height: 30,
				top: 17,
				leftOffset: 8,
				fontSize: 11,
				lineHeight: 11,
			},
			header: {
				height: 50,
				fontSize: 28,
				lineHeight: 28,
				top: 23
			},
			cta: {

			}
		});


		adData.elements.results = new Results();
		adData.elements.results.build({
			callback: Animation.showEndframe,
			showCallback: Animation.hideQuiz
		});

		adData.elements.endframe = new Endframe();
		adData.elements.endframe.build({
			callback: Animation.showQuiz,
			resetCallback: Control.reset
		});


		adData.elements.intro = new Intro();
		adData.elements.intro.build({
			callback: Animation.skipIntro
		});

		adData.elements.startBTN = new UIComponent({
			id: 'startBTN',
			target: adData.elements.redAdContainer,
			css:{
				width: adParams.adWidth,
				height: adParams.adHeight,
				position: 'absolute'
			}
		});


		var logoLabel = 'logo';
		adData.elements.logo = new UIImage({
			id: logoLabel,
			target: adData.elements.redAdContainer,
			source: logoLabel,
			css: {

			}
		});
		Align.move( Align.BOTTOM_LEFT, adData.elements.logo, 19, -13 );
		Gesture.disable( adData.elements.logo );
		Markup.addBorder( 'main', adData.elements.redAdContainer, 2, '#000000' );
		Styles.setBackgroundColor( adData.elements.redAdContainer, '#cccccc' );
	}
}
var Animation = new function() {
	this.startScene = function() {
		trace( 'Animation.startScene()' );
		Styles.setCss( global.adData.elements.redAdContainer, 'opacity', '1' );
		var preloader = document.getElementById( "preloader" );
		TweenLite.fromTo( preloader, 0.5, {clip:'rect( 0px, ' + adParams.adWidth + 'px, ' + adParams.adHeight + 'px, 0px )'}, {clip:'rect( 0px, ' + adParams.adWidth + 'px, ' + adParams.adHeight + 'px, ' + adParams.adWidth + 'px )', ease:Quad.easeInOut, onComplete: function() {
				global.removePreloader();
			}
		} );

		if ( adData.autoplay )
			adData.elements.intro.show();
		else {
			Animation.skipIntro();
		}
	}

	this.skipIntro = function() {
		trace('Animation.skipIntro()');
		adData.elements.intro.btn.onHitRollOver();
		Gesture.removeEventListener( adData.elements.startBTN, GestureEvent.CLICK, Animation.skipIntro);
		Gesture.removeEventListener( adData.elements.startBTN, GestureEvent.OVER, adData.elements.intro.btn.onHitRollOver);
		Gesture.removeEventListener( adData.elements.startBTN, GestureEvent.OUT, adData.elements.intro.btn.onHitRollOut);
		Gesture.addEventListener( adData.elements.exitBTN, GestureEvent.CLICK, function() { 
			adData.networkExit( clickTag );
		});
		Gesture.disable( adData.elements.startBTN );
		if ( adData.autoplay )
			adData.elements.intro.hide();
		Animation.showQuiz();
	}

	this.showQuiz = function() {
		if (adData.skipQuiz) {
			adData.elements.quiz.hide();		// DEBUG -- skip quiz
			Animation.showResults();			// DEBUG -- skip quiz
		}
		else {
			adData.elements.quiz.show();
			Gesture.addEventListener( adData.elements.exitBTN, GestureEvent.OVER, adData.elements.quiz.quizCTA.onHitRollOver);
			Gesture.addEventListener( adData.elements.exitBTN, GestureEvent.OUT, adData.elements.quiz.quizCTA.onHitRollOut);
		}
	}

	this.showResults = function() {
		trace('Animation.showResults()');
		adData.elements.results.show();
	}

	this.hideQuiz = function() {
		Gesture.removeEventListener( adData.elements.exitBTN, GestureEvent.OVER, adData.elements.quiz.quizCTA.onHitRollOver);
		Gesture.removeEventListener( adData.elements.exitBTN, GestureEvent.OUT, adData.elements.quiz.quizCTA.onHitRollOut);
		adData.elements.quiz.hide();
	}

	this.showEndframe = function() {
		adData.elements.endframe.show();
		Gesture.addEventListener( adData.elements.exitBTN, GestureEvent.OVER, adData.elements.endframe.endframeCTA.onHitRollOver);
		Gesture.addEventListener( adData.elements.exitBTN, GestureEvent.OUT, adData.elements.endframe.endframeCTA.onHitRollOut);
	}
}
































