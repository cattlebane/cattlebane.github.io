// Version Feb 26, 2016
var AlphaVideoPlayer = function(arg){
		
	arg.addChild = false;
	var A = new VideoPlayer(arg);
		
	var isStatic = arg.mask != undefined;

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// MARK-UP
	if ( isStatic ){
		if ( arg.mask.src.match( /[^\\]*\.(\w+)$/ ) == 'png' ){
			// PNG mask
			maskCtx.drawImage ( arg.mask, 0, 0);
		} else {
			// JPG create a mask from a MATTE
			var maskCanvas = document.createElement( 'canvas' );	
			maskCanvas.width = arg.mask.width;
			maskCanvas.height = arg.mask.height;
			var maskCtx = maskCanvas.getContext('2d');
			
			maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
			var blackImage = maskCtx.getImageData(0, 0, maskCanvas.width, maskCanvas.height);
			var blackImageData = blackImage.data;

			maskCtx.drawImage ( arg.mask, 0, 0);
			var maskImage = maskCtx.getImageData(0, 0, maskCanvas.width, maskCanvas.height);
			var maskImageData = maskImage.data;

			for (var i = 3, len = blackImageData.length; i < len; i = i + 4) {
				blackImageData[i] = maskImageData[i-1];
			}

			maskCtx.putImageData(blackImage, 0, 0);
		}
	} else {
		var videoCanvas = document.createElement( 'canvas' ),
			startPos = arg.videoStacked === false ? [arg.css.width, 0] : [0, arg.css.height];
			trace('AlphaVideoPlayer videpStacked:', !(arg.videoStacked === false));
		if (arg.videoStacked === false){
			videoCanvas.width = arg.css.width * 2;
			videoCanvas.height = arg.css.height;
		} else {
			videoCanvas.width = arg.css.width;
			videoCanvas.height = arg.css.height * 2;
		}
		
		var videoCtx = videoCanvas.getContext('2d');
	}
	
	var outputCanvas = document.createElement( 'canvas' );
	outputCanvas.id = 'outputCanvas';		
	outputCanvas.width = arg.css.width;
	outputCanvas.height = arg.css.height;
	outputCanvas.style.position = 'absolute';
	var outputCtx = outputCanvas.getContext('2d');	
	A.container.appendChild( outputCanvas );

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PRIVATE METHODS
	function updateStatic(){
		clear();

		outputCtx.drawImage ( A.screen, 0, 0 );
		outputCtx.globalCompositeOperation = 'destination-in';
		outputCtx.drawImage ( maskCanvas, 0, 0 )
	}

	function updateDynamic(){
		videoCtx.drawImage (A.screen, 0, 0, videoCanvas.width, videoCanvas.height);

		var image = videoCtx.getImageData ( 0, 0, arg.css.width, arg.css.height ),
			imageData = image.data,
			alphaData = videoCtx.getImageData ( startPos[0], startPos[1], arg.css.width, arg.css.height ).data;

		for ( var i = 3; i < imageData.length; i = i + 4 ) {
			imageData[i] = alphaData[i-1];
		}

		outputCtx.putImageData(image, 0, 0);
	}

	function clear(){
		outputCtx.clearRect ( 0, 0, arg.css.width, arg.css.height );
		outputCtx.globalCompositeOperation = 'source-over';
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// EVENT HANDLERS
	function handlePlay ( event ){
		trace ( 'AlphaVideoPlayer.handlePlay()')
		FrameRate.register ( A, isStatic ? updateStatic : updateDynamic );
	}

	function handleComplete ( event ){
		FrameRate.unregister ( A, isStatic ? updateStatic : updateDynamic );
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// INIT
	A.screen.addEventListener('play', handlePlay, false);
	A.screen.addEventListener('ended', handleComplete, false);

	return A;
	
}