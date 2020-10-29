/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	Network

	Description:
		This class centralizes all exit logic and creates a standard exit interface, regardless of environment, publisher, or ad-network.
		It also contains the logic which determines if the ad is running in a "preview" location, which is relevant primarily for <AdManager>.

	Define click tags( INDEX.HTML ):
		*Standard* 
			( DCM, site-served, etc ), Doubleclick Campaign Manager( DCM )recognizes variables with the word "clickTag" and creates an additional
			line-item for each such variable that it finds in the index. In this way, you can define as many "click tags" as your 
			project requires.
		(start code)
			// DCM-recognized exits - if you override these vars in AdData, you will lose platform-tracking
			var clickTag 			  	= "https://twitter.com/ESPNTennis"; 	// failover exit
			var clickTag1				= ""; 								// upcoming exit
			var clickTag2				= "";								// live exit
			// var clickTag3, clickTag4...etc
		(end code)

		*Doubleclick Studio*
			Doubleclick Studio( DCS )recognizes exits through their Enabler library. So, to keep our exit functionality consistent
			in our builds, you should define your exits as callback functions. This way, you can still use <Network>.exit() to call 
			your particular click tag.
		(start code)
			var clickTag 			  	= function() {
				Enabler.exit( "clickTag" );
			}
			var studioExit				= function() {
				Enabler.exit( "studio_exit" );
			}
			var overrideStudioExit		= function() {
				Enabler.exitOverride( 'id', 'dynamic_url' ); 	// NOTE: this callback would need to be redefined with the dynamic url, once it was available
			}
			// define more as needed
		(end code)


	Perform an exit( BUILD.JS ):
		*single exit*
		(start code)
			Gesture.addEventListener( adData.elements.redAdContainer, GestureEvent.CLICK, function() { 
				Network.exit( clickTag ); 
			});
		(end code)

		*multiple exits with logic*
		(start code)
			Gesture.addEventListener( adData.elements.redAdContainer, GestureEvent.CLICK, function() {
				Network.exit( !adData.gameIsLive ? clickTag1 : clickTag2 );
			});
		(end code)


	Override exit-vars with <AdManager> json urls( AD-DATA.JS ):
		*NOTE!!!*
		This scenario only makes sense when the client is managing their own tracking, like ESPN On-Channel or Netflix.
		(start code)
			if( adParams.environmentId == 'espn' ) {
				if( Device.type == 'mobile' ) {
					clickTag1 = this.adDataRaw.mobile_upcoming_url;
					clickTag2 = this.adDataRaw.mobile_live_url;
				}
				else {
					clickTag1 = this.adDataRaw.tablet_upcoming_url;
					clickTag2 = this.adDataRaw.tablet_live_url;
				}
			}
		(end code)
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */
var Network = new function() {



	/** Method: exit() -- DEPRECATED
		This is the standardized exit method for all networks. This is the method that should be implemented throughout
		your build, regardless of where this ad ultimately is deployed. */
	this.exit = function( _clickTag ) { 
		
	};




	/** Variable: STANDARD
		Staging, DCM( dfp, dfa, dart, etc ), site-served exits. */
	this.STANDARD = {
		meta: {

		},
		script: {

		},
		onload: {
			init();
		},
		clicktags: {
			var clickTag 			  	= "http://www.changeme.com/";
		},
		exit: { 
			this.exit = function( _clickTag ) {
				trace( "Network -> STANDARD EXIT" );
				window.open( _clickTag, "_blank" );
			}
		}
	};




	/** Variable: ADWORDS
		Google AdWords exits. */
	this.ADWORDS = {
		meta: {
			<meta name="ad.size" content="width=300,height=250">
		},
		script: {
			<script type="text/javascript" src="https://tpc.googlesyndication.com/pagead/gadgets/html5/api/exitapi.js"></script>
		},
		onload: {
			init();
		},
		clicktags: {
			var clickTag 			  	= ""; // ...DEFINED BY ADWORDS PLATFORM 
		},
		exit: { 
			this.exit = function( _clickTag ) {
				trace( "Network -> ADWORDS EXIT" );
				ExitApi.exit();
			}
		}
	};





	/** Variable: DC_STUDIO
		Doubleclick Studio. */
	this.DC_STUDIO = {
		meta: {

		},
		script: {
			<script id="doubleclick" src="https://s0.2mdn.net/ads/studio/Enabler.js"></script>
		},
		onload: {
			if( !Enabler.isInitialized() ) 
				Enabler.addEventListener( studio.events.StudioEvent.INIT, onDoubleClickInitialized );
			else onDoubleClickInitialized( null );

			function onDoubleClickInitialized( evt ) {
				trace( "Index.onDoubleClickInitialized()" );
				getDeployProfile( "doubleclick" )["runPath"] = Enabler.getUrl( "./" );
				if ( !Enabler.isVisible() ) 
					Enabler.addEventListener( studio.events.StudioEvent.VISIBLE, init ); 
				else init();
			}
		},
		clicktags: {
			var clickTag 			  	= function() {
				Enabler.exit( "clickTag" );
			}
			var overridePlatformExit		= function() {
				Enabler.exitOverride( "id", "http://example.com" );
			}

			var collapsedExit			= function(){
				Enabler.exit('USER_EXITED_WHILE_COLLAPSED');
			}

			var expandedExit			= function(){
				Enabler.exit('USER_EXITED_WHILE_EXPANDED');
			}
			// define more as needed
		},
		exit: { 
			this.exit = function( _clickTag ) {
				trace( "Network -> DC_STUDIO EXIT" );
				if( typeof _clickTag == "function" )
					_clickTag.call();
				else trace( " - ERROR: a clickTag for this platform needs to be a function that wraps a platform exit. See <Network> docs." );
			}
		}
	};	







	/** Variable: ESPN
		ESPN On-channel exits.

		The variable "clickUrlUnesc" is meant to be defined alongside the clickTag vars in the index. Any variable defined in that block
		gets included on the Ad Tag generated during the Deploy Process, thereby allowing it to define the macro. */
	this.ESPN = {
		meta: {

		},
		script: {
			
		},
		onload: {
			init();
		},
		clicktags: {
			var clickTag 			  	= "http://www.changeme.com/";
			var clickTag1				= "http://www.upcoming-event.com/";
			var clickTag2				= "http://www.live-event.com/";
		},
		exit: { 
			this.exit = function( _clickTag ) {
				trace( "Network -> ESPN EXIT" );
				window.open( this.appendMacro( "%%CLICK_URL_UNESC%%", _clickTag ), "_blank" );
			}
		}
	};







	/** Variable: ESPN_FFL_APP
		ESPN FFL-App exits.

		The variable "clickUrlUnesc", "fflAppAdId", and "fflAppCb" are meant to be defined alongside the clickTag vars in the index. Variables defined in that block
		are included on the Ad Tag generated during the Deploy Process, thereby allowing it to define the macro. */
	this.ESPN_FFL_APP = {
		meta: {

		},
		script: {
			
		},
		onload: {
			init();
		},
		clicktags: {
			var clickTag 			  	= "http://www.changeme.com/";
			var clickTag1				= "http://www.upcoming-event.com/";
			var clickTag2				= "http://www.live-event.com/";
		},
		exit: { 
			this.exit = function( _clickTag ) {
				trace( "Network -> ESPN FFL APP EXIT" );

				var clickUrl = "%%CLICK_URL_UNESC%%" + _clickTag; //"%%DEST_URL%%";
				var adId = "%%PATTERN:adId%%";
				var cachebuster = "%%CACHEBUSTER%%";

				if( typeof window.parent.app === "object" ) {
					if( adId ) {
						if( navigator.userAgent.toLowerCase().indexOf( "android" ) > -1 ) 
							window.parent.app.ads.clickThrough( clickUrl + "?ord=" + cachebuster, adId );
						else window.parent.app.ads.clickThrough( clickUrl, adId );
					} 
					else {
						if( navigator.userAgent.toLowerCase().indexOf( "android" ) > -1 ) 
							window.parent.app.ads.clickThrough( clickUrl + "?ord=" + cachebuster );
						else window.parent.app.ads.clickThrough( clickUrl );
					}
					return false;
				}
			}
		}
	};





	/** Variable: MRAID
		Mobile Rich-media Ad Interface Definition

		http://www.iab.net/media/file/IAB_MRAID_v2_FINAL.pdf

		This is an IAB-proposed spec that attempts to create a consistent interface between 
		banner function and site experience. The most common of these interactions is to cause the exit-click 
		to open in an "In App" experience.

		Another example, pushdowns need to move page content. MRAID, when implemented by the publisher, 
		offers a standard interface of methods that can be used to effect these changes on the publisher page. */
	this.MRAID = {
		meta: {

		},
		script: {
			<script src="mraid.js"></script>
		},
		onload: {
			// if the mraid script is loaded, wait for it to initialize
			if( typeof mraid !== "undefined" ) {
				trace( " - loading MRAID" );
				if( mraid.getState() === "loading" ) 
 					mraid.addEventListener( "ready", init );
 				else init();
 			}
 			else init();
		},
		clicktags: {
			var clickTag 			  	= "http://www.changeme.com/";
			var clickTag1				= "http://www.upcoming-event.com/";
			var clickTag2				= "http://www.live-event.com/";
		},
		exit: { 
			this.exit = function( _clickTag ) {
				trace( "Network -> MRAID EXIT" );
				// espn logic
				if( _clickTag.search( /^sportscenter/ ) > -1 )
					mraid.open( _clickTag );
				// standard
				else mraid.open( this.appendMacro( "%%CLICK_URL_UNESC%%", _clickTag ));
			}
		}
	};







	/** Variable: SIZMEK
		Sizmek/Mediamind/Eyeblaster. */
	this.SIZMEK = {
		meta: {

		},
		script: {
			<script src="//ds.serving-sys.com/BurstingScript/EBLoader.js"></script>
		},
		onload: {
			trace( " - SIZMEK TEMPLATES MUST BE RUN IN LOCAL-SERVER!!!" );
			if( !EB.isInitialized() ) 
				EB.addEventListener( EBG.EventName.EB_INITIALIZED, init ); 
			else init();
		},
		clicktags: {
			// standard single platform exit
			var clickTag 				= function() {
				EB.clickthrough();
			}

			// multiple platform exits 
			/*var clickTag1 			  	= function() {
				EB.clickthrough( "clickTag1" );
			}*/

			// override platform exit
			/*var overridePlatformExit		= function() {
				EB.clickthrough( "id", "http://example.com" );
			}*/
		},
		exit: { 
			this.exit = function( _clickTag ) {
				trace( "Network -> SIZMEK EXIT" );
				if( typeof _clickTag == "function" )
					_clickTag.call();
				else trace( " - ERROR: a clickTag for this platform needs to be a function that wraps a platform exit. See <Network> docs." );
			}
		}
	};






	/** Variable: FLASHTALKING
		Flashtalking tracks clicktags by index. The name of the variable does not matter. 
		The first exit( or the default )in the platform is 1, not zero. The next would be 2, etc.

		To override the platform url, the index is still required( for tracking ). The second array 
		value would then be the dynamic url.

		For more advanced exit-url manipulation, see the Flashtalking docs:

		http://www.flashtalking.net/helpSystem/EN/HTML5/jsDocs/   */
	this.FLASHTALKING = {
		meta: {

		},
		script: {

		},
		onload: {
			trace( "!!! FLASHTALKING TEMPLATES REQUIRE LOCAL-SERVER !!!" );

			if( isDevEnvironment() ) {
				var scriptElem = document.createElement( "script" );
				scriptElem.type = "text/javascript";
				scriptElem.src = "http://cdn.flashtalking.com/frameworks/js/api/2/9/html5API.js";
				document.getElementsByTagName( "head" )[ 0 ].appendChild( scriptElem );
				var ftLoadIntervalId = setInterval( function() {
					if( typeof myFT != "undefined" ) {
						clearInterval( ftLoadIntervalId );
						myFT.on( "instantads", init );
					}
				}, 20 );
			}
			else init();

		},
		clicktags: {
			// standard platform exit - do not assign a url here, or it will override the platform
			var clickTag 			= [ 1 ];

			// multiple platform exits - do not assign a url here, or it will override the platform
			/*var secondExit 				= [ 2 ];*/

			// override platform exit
			/*var overridePlatformExit		= [ 3, "http://example.com" ];*/

			// append query-string to platform exit
			/*var appendPlatformExit			= [ 4, myFT.getClickTag( 4, "?zipCode=90405" ) ];*/
		},
		exit: { 
			this.exit = function( _clickTag ) {
				trace( "Network -> FLASHTALKING EXIT" );
				trace('		_clickTag:' + _clickTag);
				if( Object.prototype.toString.call( _clickTag ) == "[object Array]" ) {
					trace('		_clickTag.length:' + _clickTag.length);
					if( _clickTag.length == 1 ) 
						myFT.clickTag( _clickTag[ 0 ]);
					else myFT.clickTag( _clickTag[ 0 ], _clickTag[ 1 ] );
				}
				else trace( " - ERROR: a clickTag for this platform needs to be an array with an index that corresponds to the platform. See <Network> docs." );
			}
		}
	};





	/** Variable: ATLAS
		Atlas exits. */
	this.ATLAS = {
		meta: {

		},
		script: {

		},
		onload: {
			init();
		},
		clicktags: {
			var clickTag 			  	= "{{PUB_CLICKTHROUGH}}";
		},
		exit: { 
			this.exit = function( _clickTag ) {
				trace( "Network -> ATLAS EXIT" );
				window.open( _clickTag, "_blank" );
			}
		}
	};





	/** Variable: ADMOTION
		An international ad-network */
	this.ADMOTION = {
		meta: {

		},
		script: {

		},
		onload: {
			var VERSION = "4-5-8-21852";
			var args = new function() { 
				var e = location.search.substring( 1 );
				var t = e.split( "&" );
				for( var n = 0; n < t.length; n++ ) {
					var r = t[n].indexOf( "=" );
					if( r != -1 ) {
						var i = t[n].substring( 0, r );
						var s = t[n].substring( r + 1 );
						this[i] = unescape( s );
					}
				}
			};
			var loadJS = function( e ) {
				if( e ) {
					var t = document.createElement( "script" );
					t.src = e;
					document.body.appendChild( t );
					//
					init();
					//
				}
			};
			var fDomain = "http://akfs.nspmotion.com/files";
			try { 
				if( document.location.protocol == "https:" )
					fDomain = "https://s-akfs.nspmotion.com/files";
			} 
			catch(e) {}
			if( typeof( args.fileDomain ) !== "undefined" && args.fileDomain != null && args.fileDomain != "" ) 
				fDomain = args.fileDomain;
			window.ADMFileDomain = fDomain + "/htmlcreative/";
			var HTMLCreativeURL = window.ADMFileDomain + VERSION + ".js";
			loadJS( HTMLCreativeURL );
			trace( "ADMOTION.HTMLCreativeURL: " + HTMLCreativeURL );
		},
		clicktags: {
			var clickTag 			  	= function() {
				HTMLCreative.clickThrough();
			}
		},
		exit: { 
			this.exit = function( _clickTag ) {
				trace( "Network -> ADMOTION EXIT" );
				if( typeof _clickTag == "function" )
					_clickTag.call();
				else trace( " - ERROR: a clickTag for this platform needs to be a function that wraps a platform exit. See <Network> docs." );
			}
		}
	};
		
}


