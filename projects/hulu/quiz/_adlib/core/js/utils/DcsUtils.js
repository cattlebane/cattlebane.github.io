/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	DcsUtils
		DcsUtils Support.
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */
var DcsUtils = new function() {

	var D = this;

	D.counterWithVars = function (str, impression) {
		if (impression) Enabler.reportCustomVariableCount1(str);
		else Enabler.reportCustomVariableCount2(str);
	}

	/*function exit(id, dynamicUrl) {
		trace('DcsUtils.dc.exit');

		if (dynamicUrl) {
			trace('  dynamic url - exit to: ' + dynamicUrl);
			enabler.exitOverride(id, dynamicUrl);
		} else {
			trace('platform provided url');
			enabler.exit(id);
		}
	}*/

	D.loadImage = function (path, fromCommon, callbackComplete, callbackFail) {
		var path = fromCommon ? global.adParams.commonPath + path : global.adParams.assetPath + path;
		path = Enabler.getUrl(path);

		ImageUtils.loadSingleImage(path, callbackComplete, callbackFail);
	}

	/**	Method: addVideoMetrics()
			Adds DoubleClick Tracking metrics to a video player.

		Parameters:
			player 		- The video player instance to track
			message 	- The message passed as the metric, defaults to 'Video Report 1'
		
		> DcsUtils.addVideoMetrics ( adData.elements.videoPlayer, 'Intro Video' );
	*/
	D.addVideoMetrics = function ( player, message ) {
		Enabler.loadModule(studio.module.ModuleId.VIDEO, function() {
			studio.video.Reporter.attach(
				message || 'Video Report 1',
				player instanceof VideoPlayer ? player.screen : player
			);
		});
	}

}