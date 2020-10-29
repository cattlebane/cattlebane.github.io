/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	PrepareCommon
		Initialization class runs after ad-params have been determined, scripts have been loaded, 
		fonts have been loaded, and other misc index events have completed.
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */
var PrepareCommon = new function() {
	var self = this;
	
	var async;
	var completeCallback


	/**	Method: init()
			This is where common-components specific to these sizes, like AdManager, Dates, 
			Analytics, etc can be prepared, asyncronously before the ad runs.

			Ad App now has the ability to add these components dynamically, after template 
			creation, which is why there are Red-hooks here.

			USER-DEFINED code can be added here if it is syncronous. Async operations need 
			to be threaded with Async. */	
	self.init = function( _completeCallback ) {
		trace( 'PrepareCommon.init()' );
		completeCallback = _completeCallback;

		// async for threading any number of async processes
		async = new Async();
		async.onComplete( self.initComplete );

		/*-- Red.Component.preparecommon_init.start --*/ 
		global.ftData = new FtData();
		/*-- Red.Component.preparecommon_init.end --*/

		async.start();
	}

	/*-- Red.Component.preparecommon_misc_functions.start --*/
	/*-- Red.Component.preparecommon_misc_functions.end --*/





	/** Method: initComplete()
			init() async-routines are complete. Prepare <AdData>, any USER-DEFINED code, and load all the images. */
	self.initComplete = function() {
		trace( 'PrepareCommon.initComplete()' );
		self.prepareAdData();
		self.loadImageQueue();
	}


	/** Method: prepareAdData()
			Custom, hand-coded code, needed for all ad-sizes should go here. */
	self.prepareAdData = function() {
		trace( 'PrepareCommon.prepareAdData()' );
		global.adData = new AdData( global.adParams.currentJsonData );

		/* ---- USER-DEFINED PrepareCommon -------------------------------------------------------
		 *
		 *		This is BEFORE the image-queue is loaded...
		 */
		 // -->
	} 




	/**	Method: loadImageQueue()
			This executes the <ImageManager> load queue. The load queue at this point includes all images 
			from global.assets, and any dynamic images added in <AdData>. */
	self.loadImageQueue = function() {
		trace( 'PrepareCommon.loadImageQueue()' );
		ImageManager.load( self.onLoadAllImagesComplete );
	}


	/**	Method: onLoadAllImagesComplete()
			When this method is called, your ad's data and assets are ready. Use this 
			function to prepare any elements or logic that will be shared across all
			of your ad sizes. */
	self.onLoadAllImagesComplete = function() {
		trace ( 'PrepareCommon.onLoadAllImagesComplete()');

		/* ---- USER-DEFINED PrepareCommon -------------------------------------------------------
		 *
		 *		This is AFTER the image-queue is loaded...
		 */
		 // -->


		// launches the build
		completeCallback();	
	}

}
