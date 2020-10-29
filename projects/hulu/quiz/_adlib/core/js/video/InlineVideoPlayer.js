/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	InlineVideoPlayer

	Description:
		Creates either a VideoPlayer or Flipbook.  This module does the device detection and returns the best player.
		The format for the parameters is identical to either player type, see <VideoPlayer> or <Flipbook> for futher documentation.

	Note:
		The only instantiation difference is the source is defined as an object with both video files.
		
	(start code)
		var myInlineVideo = new InlineVideoPlayer({
			// Boiler Plate
			source: {
				fbv: adParams.videosPath + 'RED_Html5_Showcase_300x250.fbv',
				mp4: adParams.videosPath + 'RED_Html5_Showcase_300x250.mp4'
			},
			target: adData.elements.redAdContainer,
			id: 'My_Unique_ID',
			css: {
				x:0,
				y:0,
				width: 300,
				height: 168
			},
			
			// Optional Params
			preload: false,
			autoPlay: false,

			// Optional Event Handlers
			onReady: function(event){
				trace ( 'flipbook is ready to play' )
			},
			onComplete: function(event){
				trace ( 'flipbook ended' )
			},
			onProgress: function(event){
				trace ( 'flipbook progress' )
			},
			onFail: function(event){
				trace ( 'flipbook FAIL' )
			}				
		});
		
		myInlineVideo.load();
	(end code)
	
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */
var InlineVideoPlayer = function(arg){
	var src;
	if ( Device.type != 'desktop' && !Device.canAutoPlayVideo ){
		trace ( 'InlineVideoPlayer -> Flipbook. Device.type =', Device.type + ', Device.canAutoPlayVideo =', Device.canAutoPlayVideo );
		src = arg.source.fbv;
		arg.source = src;
		return new Flipbook ( arg );
	} else {
		trace ( 'InlineVideoPlayer -> VideoPlayer. Device.type =', Device.type + ', Device.canAutoPlayVideo =', Device.canAutoPlayVideo );
		src = arg.source.mp4;
		arg.source = src;
		return new VideoPlayer ( arg );
	}
}