/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	Device

	Description:
		Provides information about the device the ad is viewed on. Reports  brand, product, device type, browser and version, OS and version,
		screen width, height, and orientation, pixel ratio, user agent.  For > Windows 8, type currently defaults to 'tablet'.

		NOTE - detection order of product and OS matters, windows UA string pretends to be everything else, so windows must be deteceted first.
			 As Windows versions advance, their signatures will need to be added to the windowsVersions array.

	Use:
		(start code)
			Device.init();

			var brand          = Device.brand
			var product        = Device.product;
			var type           = Device.type;
			var windowWidth    = Device.windowWidth;
			var windowHeight   = Device.windowHeight;
			var orientation    = Device.orientation;
			var browser        = Device.browser;
			var browserVersion = Device.browserVersion;
			var os             = Device.os;
			var osVersion      = Device.osVersion;
			var userAgent      = Device.userAgent;
		(end code)
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */

/* TODO - add native features detection, touch, accelerometer, gps.  Find way to determine if on desktop or tablet when windows > 8.
		 NT check not sufficient.
*/

var Device = new function(){
	var D = this;

	/** Property: agentString

		Returns:
			current user agent of browser. */
	D.agentString = undefined;



	/** Property: brand

		Returns:
			Brand of device - possible values are: microsoft, apple, android, rim, unknown. */
	D.brand = 'unknown';



	/** Property: product

		Returns:
			Brand subtype - possible values are: windows phone, windows, iphone, ipad, ipod, mac, android, blackberry. */
	D.product = 'unknown';



	/** Property: type

		Returns:
			Device type - possible values are: mobile, tablet, dekstop.  Windows > 8 currently returns tablet, curerntly no way to differentiate from desktop. */
	D.type = undefined;



	/** Property: os

		Returns:
			Operating system of device. */
	D.os = 'unknown';



	/** Property: osVersion

		Returns:
			Version of operating system of device. */
	D.osVersion = 'unknown';



	/** Property: browser

		Returns:
			Brand of browser. */
	D.browser = undefined;



	/** Property: browserVersion

		Returns:
			Version of browser. */
	D.browserVersion = undefined;



	/** Property: windowWidth

		Returns:
			Width of device viewport. */
	D.windowWidth = undefined;



	/** Property: windowHeight

		Returns:
			Height of device viewport.  */
	D.windowHeight = undefined;



	/** Property: orientation

		Returns:
			Orientaion of device viewport. */
	D.orientation = undefined;



	/** Property: pixelRatio

		Returns:
			Pixel ratio of device viewport . */
	D.pixelRatio = undefined;



	/** Property: canAutoPlayVideo

		Returns:
			A boolean determining if autoplay video is available, used for mobile & tablet devices. */
	D.canAutoPlayVideo = false;



	/** Property: documentTouch

		Returns:
			window.DocumentTouch. */
	D.documentTouch = undefined;



	/** Method: init()
			Initializes the module.
	*/
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

		// Apple
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

		// Microsoft
		else if( productMatches.microsoft ) {
			D.brand = 'microsoft';
			D.os = 'windows';
			D.product = productMatches.microsoft[ 0 ].toLowerCase();

			if( productMatches.nt ) {
				var windowsVersions = [
					{ signature: '5.1',  name: 'xp'    },
					{ signature: '5.2',  name: 'xp'    },
					{ signature: '6.0',  name: 'vista' },
					{ signature: '6.1',  name: '7'     },
					{ signature: '6.2',  name: '8'     },
					{ signature: '6.3',  name: '8.1'   },
					{ signature: '10.0', name: '10'    }
				];

				// windows IE breaks with ; where as windows Chrome breaks with )
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

		// Android
		else if( productMatches.android ) {
			D.brand = D.product = D.os = 'android';
			D.osVersion = D.agentString.substr( 
				D.agentString.indexOf( 'Android ' ) + 8, 3
			);
		} 

		// Chrome OS
		else if( productMatches.chromeOS ) {
			D.brand = D.product = D.os = 'chromeos';
			var osVersionMatch = /CrOS\s\S+\s(\d+\.\d+\.\d+)/.exec( D.agentString );
			if( osVersionMatch )
				D.osVersion = osVersionMatch[ 1 ];
			D.type = 'desktop';
		}

		// Blackberry
		else if( productMatches.blackberry ) {
			D.product = productMatches.blackberry[ 0 ].toLowerCase();
			D.brand = 'rim';
		} 

		D.pixelRatio = window.devicePixelRatio || 'unknown';
		D.getOrientation();

		getBrowserVersion();
		testAutoPlayVideo();
	}





	/** Method: trace()

		Outputs all of the known information regarding the device.
	*/
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


	/** Method: getOrientation()

		Returns:
			current orientation of the device's viewport.
	*/
	D.getOrientation = function() {
		D.getScreenResolution();
		D.orientation = D.windowWidth > D.windowHeight ? 'landscape' : 'portrait';
		return D.orientation;
	}

	/** Method: getScreenResolution()
			gets current width and height of the device's viewport.

		Returns:
			object containing the current width and height of the device's viewport
	*/
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

	/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////  PRIVATE  ////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

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

		// IE 11+
		if( agentMatches[ 1 ].match( /trident/i )) {
			D.browser = 'ie';
			var versionMatch = /\brv[ :]+(\d+)/g.exec( D.agentString );
			if( versionMatch )
				D.browserVersion = versionMatch[ 1 ];
			return;
		} 

		// Opera  
		versionMatch = D.agentString.match( /\bOPR\/([0-9\.]+)/ );
		if( agentMatches[ 1 ] == 'Chrome' && versionMatch ) {
			D.browser = 'opera';
			D.browserVersion = versionMatch[ 1 ];
			return;
		}  

		// Mobile Chrome
		versionMatch = D.agentString.match( /\bCriOS\/([0-9\.]+)/ );
		if( versionMatch ) {
			D.browser = 'chrome';
			D.browserVersion = versionMatch[ 1 ];
			return;
		}

		// IE <= 10
		if( agentMatches[ 1 ].match( /msie/i )) {
			D.browser = 'ie';
			D.browserVersion = agentMatches[ 2 ];
			return;
		}

		// Safari
		if( agentMatches[ 1 ].match( /safari/i )) {
			D.browser = 'safari';
			versionMatch = D.agentString.match( /\sversion\/([0-9\.]+)\s/i );
			if( versionMatch )
				D.browserVersion = versionMatch[ 1 ];
			return;
		}

		// Chrome and Firefox
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
		/* wait for the next tick to add the listener, otherwise the element may
		   not have time to play in high load situations */
		setTimeout(function() {
			elem.addEventListener('playing', handleTimeout, false);
			timeout = setTimeout(handleTimeout, 1000);
		}, 0);		
	}

}