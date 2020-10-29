/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	PrepareCore
		
	Description:

		THIS IS THE NodeAdApp VERSION. 
		The logic blocks for DateUtils, AdManager, and Analytics are now all included by build-source request.
		
		Boilerplate logic that is attempted for all ad templates happens here.
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */
var PrepareCore = new function() {

	var self = this;
	var assetLoader = undefined;
	var jsonPending = false;

	var async;



	// init
	self.init = function( _completeCallback ) {
		trace( 'PrepareCore.init()' );
		// async for threading any number of loads
		async = new Async();
		async.onComplete( _completeCallback );

		// fba payload
		prepareFbaPayload();

		// images
		queueRequestedImages();	

		// fonts
		loadFonts();

		// device
		Device.init();
		Device.trace();

		// gestures
		Gesture.init();

		// css
		CssManager.init();

		async.start();
	}


	// prepare fba-payload
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
		// passes in the Loader of the fba file
		ImageManager.addFbaImages( loader );
		async.done();
	}



	// queue index-requested images with ImageManager
	function queueRequestedImages() {
		// assets.images
		ImageManager.addLoader( new Loader( 
			assets.images, { 
				name: 'indexImages', 
				prepend: adParams.imagesPath 
		}));
		// assets.edgeImages
		ImageManager.addLoader( new Loader( 
			assets.edgeImages, { 
				name: 'edgeImages', 
				prepend: adParams.edgePath 
		}));
	}



	// preload fonts
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
