/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	Flipbook

	Description:
		Flipbook is an image sequencer which allows for video to auto play inline on all devices.  It consumes an .fbv file format.
		
	(start code)
		var myFlipbook = new Flipbook({
			// Boiler Plate
			source: adParams.videosPath + 'RED_Html5_Showcase_300x250.fbv',
			target: adData.elements.redAdContainer,
			id: 'My_Unique_ID',
			css: {
				x:0,
				y:0,
				width: 300,
				height: 168
			},
			
			// Optional Params
			preload: true,
			autoPlay: false,
			scale: Scale.EXACT,
			align: Align.RIGHT,

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
		
		myFlipbook.load();
	(end code)
	
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */
// 1.2.42 - added DoubleClick .js extension 
// 1.2.43 - updated FrameRate methods
// 1.2.44 - added dispatchEvents for use with controls, only Progress and PlayPause supported initially
//		  - added onLoadComplete for the entire load complete

// TODO - add cuePoints after load() called?
//		- poster div
//		- check file type is .fbv?
//		- pass in the buffer image rather than internally creating?

var Flipbook = function( arg ){
	var F = this;

	F.id = (arg.id || '' + Date.now()) + '-fbvPlayer';
	F.css = arg.css;
	F.scale = arg.scale || Scale.EXACT;
	F.align = arg.align || Align.CENTER;

	/**	Variable: paused
			A Boolean representing if the video is playing. */
	F.paused = true;

	/**	Variable: percent
			A Number 0-1 representing the video timeline percent position. */
	F.percent = 0;

	/**	Variable: currentTime
			A Number representing the video time position. */
	F.currentTime = 0;	
	
	// Constructor arguments

	/**	Variable: onReady
		A callback for when the Video is able to be played.  */
	var _onReady = arg.onReady || function(){};
	//var _onStart = arg.onStart || function(){};

	/**	Variable: onComplete
		A callback for when the Video is finished.  */
	var _onComplete = arg.onComplete || function(){};

	/**	Variable: onFail
		A callback for when the Video fails.  */
	var _onFail = arg.onFail || function(){};

	/**	Variable: onLoadComplete
		A callback for when the entire FBV has finished loading.  */
	var _onLoadComplete = arg.onLoadComplete || function(){};
	var _onLoadTimeout = arg.onLoadTimeout || function(){};

	var _onProgress = arg.onProgress || function(){};

	/**	Variable: onBuffer
		A callback for when the Video pauses due to buffering.  */
	var _onBuffer = arg.onBuffer || function(){}
	
	var _autoPlay = arg.autoPlay !== false; // default true 
	var _preload = arg.preload !== false;
	var _cb = !!arg.cacheBuster; // default false

	var _display = { x:0, y:0, width:0, height:0 };
		
	var _req;
	var _dataRaw;
	var _framesRaw = [];
	var _frameImages = [];
	var _prev = -1;
	var _available = 0;
	
	var _specs;
	var _currentFrame = 0;
	

	var _byteLength = 0;
	var _byteBuffer = 3000; // approx largest value != a single base64 image
	var _isBytesLoadComplete = false;

	var _imageRequestMax = 6; // six is the best number for cross playform/browser no drag on draw
	var _imageRequestExcess = false;

	var _clock = {
		//start
		//max - possibly set from constructor?
		//maxTimer
		//maxIsOver
	}

	var _buffer = {
		isActive : false,
		seconds : 3,
		frames : 10000 // will be set once you get the fps
	}
	
	var _cuePointsRaw = [];	
	var _cuePoints = [];
			
	/** ------------------------------------------------------------------------------------------------------------- */
	// MARK-UP

	arg.id = F.id;

	/**	Variable: container
		A <div>, the top level container for the entire player instance. */
	F.container = Markup.addDiv(arg);
	
	var canvas = document.createElement( 'canvas' );
	canvas.id = F.id + '-screen';		
	canvas.width = F.css.width;
	canvas.height = F.css.height;
	canvas.style.position = 'absolute';
	canvas.style.backgroundColor = 'rgba(0,0,0,1)';
	var _ctx = canvas.getContext('2d');	
	F.container.appendChild( canvas );

	/**	Variable: screen
			the <canvas> element. */
	F.screen = canvas;

	F.seekBar = {
		onLoadProgress : function(){},
		onLoadAvailable : function(){},
		onProgress : function(){}
	};

	F.screenControls = null;
	
	/** ------------------------------------------------------------------------------------------------------------- */
	// PUBLIC GETTERS

	F.getTotalTime = function(){ //duration
		return _specs.frames / _specs.fps;
	}

	/** ------------------------------------------------------------------------------------------------------------- */
	// PUBLIC METHODS

	/**	Method: load()
			Loads the current video source. If preload is true, this is redundant.
		> myFlipbook.load();
	*/	
	F.load = function (){
		if ( _req ) return;

		_req = createXMLHttpRequest();
		
		var url = global.matchProtocolTo( arg.source );

		_clock.start = Date.now();

		if ( _cb ) url += '?cb=' + _clock.start;		
		
		_req.onreadystatechange = handleStateChange;
		_req.open( 'get', url, true );
		_req.send();
	}

	/**	Method: play()
			Plays the current video.
		> myFlipbook.play();
	*/
	F.play = function (){
		trace ( 'Flipbook.play(), f.paused =', F.paused )
		//if ( !f.paused ){
			F.paused = false;
			F.screen.paused = false;
			FrameRate.register( F, update, _specs.fps );
		//}
		F.screen.dispatchEvent( new CustomEvent('play') );
	}

	/**	Method: pause()
			Pauses the current video.
		> myFlipbook.pause();
	*/
	F.pause = function (){
		F.paused = true;
		F.screen.paused = true;
		FrameRate.unregister ( F, update, _specs.fps );

		F.screen.dispatchEvent( new CustomEvent('pause') );
	}

	/**	Method: seek()
			Skips the video to a specific time.

		Parameters:
			sec 	- The time to skip the video to in seconds.

		> myFlipbook.seek(4);
	*/
	F.seek = function ( sec ){
		clearCanvas();
		_currentFrame = getTimeAsFrames ( sec );
		if ( F.paused ){
			update();
		}
	}

	/**	Method: stop()
			Stops the video and resets it to the beginning.
		> myFlipbook.stop();
	*/	
	F.stop = function (){
		F.pause();
		_ctx.clearRect ( 0, 0, canvas.width, canvas.height );
		_currentFrame = 0;
	}

	/**	Method: addCuePoint()
		Add to the load queue: a single or array of files or even another Loader.

		Parameters:
			time 		- The time, inseconds, to fire the call back.
			handler 	- A callback function
			params 		- Optional parameters to pass back through the call back

		Warn: Must be added before load() called
		
		(start code)
			myFlipbook.addCuePoint ( 3, handleCuePoint, [ true, .3, {} ])

			function handleCuePoint ( isVar, num, obj ){
				trace ( 'cue point', isVar, num, obj );
			}			
		(end code)
	*/
	F.addCuePoint = function ( time, handler, params ){
		var cuePoint = {
			time : time,
			handler : handler,
			frame : -1
		}
		if ( params ) {
			cuePoint.params = params;
		}
		_cuePointsRaw.push ( cuePoint );
	}

	/**	Method: resize()
		Changes the size of the Video Player

		Parameters:
			width 	- A number of the width
			height 	- A number of the height
		
		> myFlipbook.resize ( 400, 300 )
	*/
	F.resize = function(width, height){
		canvas.width = F.css.width = width;
		canvas.height = F.css.height = height;
		F.setDisplay();
	}

	F.setDisplay = function(){
		clearCanvas();
		// Set the Display type
		Scale.resize ( F.scale, _specs, F.css, _display );
		// Position the drawing
		_display.x = Align.horizontal ( F.align, _display.width, F.css.width );
		_display.y = Align.vertical ( F.align, _display.height, F.css.height );
	}

	F.kill = function(){
	}

	F.dispose = function(){	
	}

	F.addControls = function(obj){
		if ( !F.controls )
			F.controls = new VideoControls ( F, obj );
	}
	
	/** ------------------------------------------------------------------------------------------------------------- */
	// PRIVATE METHODS
	function createXMLHttpRequest () {
		try { return new XMLHttpRequest(); } catch(e){}
		try { return new ActiveXObject("Msxml2.XMLHTTP"); } catch(e){}
		trace ( 'XMLHttpRequest not supported' );
		return null;
	}
	
	function setCuePointsFrames(){
		for ( var i = 0; i < _cuePointsRaw.length; i++ ){
			_cuePointsRaw[i].frame = getTimeAsFrames( _cuePointsRaw[i].time );
			_cuePoints [ _cuePointsRaw[i].frame ] = _cuePointsRaw[i];
		}
		trace ( 'cuePoints:', _cuePoints )
	}

	function getTimeAsFrames ( sec ){
		var count = Math.floor(sec * _specs.fps);
		count = count > _specs.frames ? _specs.frames : count < 0 ? 0 : count ;
		return count;
	}

	function setBuffer ( active ){
		trace ( 'setBuffer() is', active )
		_buffer.isActive = active;
		FrameRate [ active ? 'register' : 'unregister' ] ( F, update, _specs.fps );
		_onBuffer.call( F, active );
	}
	
	// Reads .fbv data as it becomes available
	function dataParsing (){	

		// checks if too many simultanious requests were called on the previous iteration
		// if so, skip parsing
		if ( _imageRequestExcess && !_isBytesLoadComplete ){
			//trace ( '     dataParsing() calling manageImageCreate() EXCESS')
			manageImageCreate ();
			return;
		}

		// check the amount of bytes loaded, if less than buffer, most likely not enough for another frame
		var _byteDiff = _dataRaw.length - _byteLength;

		// set to the length for next iteration
		_byteLength = _dataRaw.length;

		// if too little data recieved, but is more than 0 (to avoid skipping first time) and the specs have been read
		if ( _byteDiff < _byteBuffer && _byteDiff > 0 && _specs ){
			//trace ( 'skip' )
			return;
		}

		// split the data into an array
		_framesRaw = _dataRaw.split(':::')

		// is more than one incomplete string
		if ( _framesRaw.length > 1 ) {

			// INIT of .fbv data
			// create the video specs object: frames, fps, width, height
			var splitSpecs = _framesRaw[0].split(';;;');
			if ( !_specs ) {
				_specs = JSON.parse(splitSpecs[0]);
				trace ( 'FBV Specs:', _specs )

				F.duration = _specs.time;
				F.screen.duration = F.duration;

				// if it is a short video, check total time against buffer time 
				if ( _buffer.seconds >= _specs.time ){
					var _newTime = _specs.time * .9;
					_buffer.seconds = _newTime;
					trace ( 'Flipbook : change buffer time to', _buffer.seconds );
				}

				_buffer.frames = Math.floor(_buffer.seconds * _specs.fps);
				//trace ( 'Flipbook : _buffer.frames:', _buffer.frames );

				if ( !_clock.max ) _clock.max = _specs.time * 2000;
				_clock.max -= (Date.now() - _clock.start);
				trace ( ' _clock.max:', _clock.max )
				_clock.maxTimer = setTimeout( handleMaxRuntime, _clock.max );

				F.setDisplay();

				setCuePointsFrames();
			}
			_framesRaw[0] = splitSpecs[1];
			

			// GRAPHIC LOADER
			var progress = _framesRaw.length / _specs.frames;
			F.seekBar.onLoadProgress.call( F, progress );

			//trace ( '     dataParsing() calling manageImageCreate()');
			manageImageCreate();
		} 
	}

	function manageImageCreate () {
		
		// unless last call, check length minus 1 minus 1 more as it will be an incomplete string
		var total = _framesRaw.length;
		if ( !_isBytesLoadComplete) {
			total -= 2;
		}	

		//trace ( ' ! manageImageCreate() total =', total, '!')

		// >>> Throttle check HERE <<<
		// the amount of base64's ready to be created into images
		var diff = total - _prev;				
		//if ( diff > 0 ) trace ( 'Flipbook: ' + diff + ' create image calls');
		//trace ( '  - total:', total );
		//trace ( '  = avaliable:', _available, ', _prev:', _prev )

		// how many images are loading: have been created but have not fully loaded
		var loadedImagesBuffer = _prev - _available;
		//trace ( '  == image load buffer:', loadedImagesBuffer );
		
		// if too many images are pending, stop method and wait for next iteration
		if ( loadedImagesBuffer > _imageRequestMax ){
			//trace ( '     ^^^^^^^^^ too many Image loads pending ^^^^^^^^^' );
			_imageRequestExcess = true;
			return;
		}

		// stops too many ready base64's from being called at once
		if ( diff > _imageRequestMax ){
			trace ( '>>>>>>>>>>>>>>> EXCESSIVE SIMULTANIOUS CALLS: ' + diff + ' <<<<<<<<<<<<<<<')
			_imageRequestExcess = true;

			// adjusts the total back to Max requests above _prev
			total = total - diff + _imageRequestMax;
			trace ( '  -- adjusted total:', total )
		} else {
			_imageRequestExcess = false;
		}

		// actual image load calls
		for ( var i = _prev; i < total; i++ ){
			imageCreateStart ( i )
		}

		if ( _imageRequestExcess ){
			// sets prev to only the adjusted total which is prev + Max
			_prev = total;			
		} else {
			_prev = _framesRaw.length - 2;
		}
	}

	function imageCreateStart ( id ){
		if ( id < 0 ) return;

		if ( _frameImages[id] ){
			trace ( 'Flipbook : frame ' + id + ' already populated')
			return;
		}

		//trace ( 'Image create ' + id );
		var img = new Image();
		img.setAttribute('id', id);
		img.onload = function() {
			//trace ( '      ' + img.id + ' Image Loaded' )
			/*_frameImages[img.id] = {
				image : img,
				cue : null,
				scaled : false,
				width : 0,
				height : 0
			}*/
			_frameImages[img.id].image = img;

			if ( _cuePoints[img.id] ){
				trace ( 'Flipbook : add cue point' );
				_frameImages[img.id].cue = _cuePoints[img.id];
			}

			_available = +img.id;

			// GRAPHIC LOADER
			var progress = _available / _specs.frames;
			F.seekBar.onLoadAvailable.call( F, progress );


			if ( _available === _buffer.frames ) {
				//var _timeInitBuffer = Date.now() - _clock.start;
				//trace ( 'Time initial buffer (_timeInitBuffer) :', _timeInitBuffer )
				_onReady.call(F);
				if ( _autoPlay ) F.play();
			}

			// if data is fully loaded, manually call next set of image creation
			// necessary as parseData() no longer being called
			if ( _isBytesLoadComplete && _imageRequestExcess ){
				//trace ( "::::::::::  DATA LOAD COMPLETE & EXCESS ::::::::::::")
				if ( _available + _imageRequestMax >= _prev ){
					//trace ( 'loop it back ->^' );
					manageImageCreate();
				}					
			}

			if ( _buffer.isActive ) {
				if ( _available >= _currentFrame + _buffer.frames || _isBytesLoadComplete ){
					trace ( 'Flipbook : BUFFER END');
					setBuffer ( false );
				} else {
					trace ( 'Flipbook : buffering... _currentFrame:', _currentFrame, ', _available:', _available, ':::' )
				}
			}

			if ( +img.id === _specs.frames - 1 ){
				imageCreateComplete();
			}
		};
		img.onerror = function() {
			trace ( 'Flipbook : FAILED - video frame ' + img.id + ' Image' );
		}

		// create the frame object
		_frameImages[id] = {
			image : null,
			cue : null
		}
		// extract dimensions here
		var frameRawInfo = _framesRaw[id].split(')');
		var dimensions = frameRawInfo[0].split('x');
		_frameImages[id].width = +dimensions[0];
		_frameImages[id].height = +dimensions[1];

		if ( _frameImages[id].width == _specs.width && _frameImages[id].height == _specs.height ){
			// Maybe used later to not let e pause land on a scaled frame?
			_frameImages[id].scaled = true;
		}

		img.src = 'data:image/jpeg;base64,' + frameRawInfo[1];//_framesRaw[id];
		//_frameImages[id] = _framesRaw[id];
	}

	function update() {
		//trace ( 'tick', _currentFrame );
		if ( _available >= _currentFrame ){
			// checks that it is an image to avoid errors
			if ( _frameImages[_currentFrame].image instanceof HTMLImageElement ){
				_ctx.drawImage ( _frameImages[_currentFrame].image, 0, 0, _frameImages[_currentFrame].width, _frameImages[_currentFrame].height, _display.x, _display.y, _display.width, _display.height );
				
				if ( _frameImages[_currentFrame].cue ){
					_frameImages[_currentFrame].cue.handler.apply( F, _frameImages[_currentFrame].cue.params )
				}
			}

			F.percent = _currentFrame / _specs.frames;
			F.currentTime = _currentFrame / _specs.fps;
			_onProgress.call(F);

			F.seekBar.onProgress.call( F, F.percent );

			// assign to screen for controls usage
			F.screen.currentTime = F.currentTime;

			//F.screen.dispatchEvent( new CustomEvent('timeupdate') );
			
			_currentFrame++;
		} else {
			// pause for buffering
			trace ( 'Flipbook : ...DRAG... _available:', _available + ', _currentFrame:', _currentFrame );
			
			// if the max time has been reached but it was playing, let it go to end or if buffers again
			if ( _clock.maxIsOver ){
				_onLoadTimeout.call();
			} else {
				setBuffer ( true );					
			}
		}
		if ( _currentFrame >= _specs.frames ){
			trace ( 'Flipbook : Timeline Complete' )
			FrameRate.unregister ( F, update, _specs.fps );

			_onComplete.call(F);
			F.screen.dispatchEvent( new CustomEvent('ended') );
		}
	}

	function imageCreateComplete(){
		trace ( 'Flipbook : ALL IMAGES CREATED')
		clearTimeout( _clock.maxTimer );

		_onLoadComplete.call(F)

		//trace ( _frameImages )
		var totalTime = Date.now() - _clock.start;
		trace ( 'Flipbook : TOTAL LOAD TIME =', totalTime )

		// DEBUG to see if an images were missed
		/*for ( var i = 0; i < _frameImages.length; i++ ) {
			if ( !(_frameImages[i].image instanceof HTMLImageElement) ){
				trace ( 'FAIL --> frameImage [', i, '] is NOT an Image' );
			}
		}*/
	}

	function clearCanvas(){
		_ctx.clearRect ( 0, 0, F.css.width, F.css.height );
	}

	/** ------------------------------------------------------------------------------------------------------------- */
	// EVENT HANDLERS
	function handleStateChange ( event ) {
		//trace ( '_handleStateChange:', _req.readyState, _req.status )
		switch ( _req.readyState ){
			case 3 :
				if ( _req.status == 200 ){				
					_dataRaw = _req.responseText;
					dataParsing ();
				} 
				break;
			case 4 :
				if ( _req.status == 200 ){
					_dataRaw = _req.responseText;
					handleDataLoadComplete();
				} else {
					_onFail.call(F);
				} 
				break;
		}
	}

	function handleDataLoadComplete(){
		trace ( 'Flipbook : ALL DATA LOADED' )
		_isBytesLoadComplete = true;
		dataParsing ();
	}

	function handleMaxRuntime(){
		trace ( 'Flipbook : MAX TIME HIT')

		// check if all the images are not ready first
		if ( _available !== _specs.frames ){
			trace ( _available, _specs.frames, F.paused, _buffer.isActive )
			// if its already playing, let it keep going but flag it
			if ( _buffer.isActive ){
				// otherwise just call the max time handler
				_onLoadTimeout.call();
			} else {					
				_clock.maxIsOver = true;
			}
		}
	}

	/** ------------------------------------------------------------------------------------------------------------- */
	// INIT
	if ( _autoPlay || _preload ) F.load();


	/* ----------------------------------------------------------------------- */
	// COMPONENTS
	if ( arg.controls )
		F.addControls ( arg.controls );
}
	

