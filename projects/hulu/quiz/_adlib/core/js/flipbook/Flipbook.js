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
	var _specs;
	var _currentFrame = 0;
	var _loader;
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
		if ( _loader ) return;

		_clock.start = Date.now();

		_loader = new FbvLoader ( arg.source, {
			scope : this,
			onComplete : handleImagesCreateComplete,
			onSpecs : handleSpecs,
			onProgress : handleImagesCreateProgress,
			onFail : _onFail
		});
		_loader.load();
	}

	/**	Method: play()
			Plays the current video.
		> myFlipbook.play();
	*/
	F.play = function (){
		trace ( 'Flipbook.play(), f.paused =', F.paused )
		F.paused = false;
		F.screen.paused = false;
		FrameRate.register( F, update, _specs.fps );
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
	
	function update() {
		//trace ( 'tick', _currentFrame );
		if ( _loader.available >= _currentFrame ){
			// checks that it is an image to avoid errors
			if ( _loader.images[_currentFrame].image instanceof HTMLImageElement ){
				_ctx.drawImage ( _loader.images[_currentFrame].image, 0, 0, _loader.images[_currentFrame].image.width, _loader.images[_currentFrame].image.height, _display.x, _display.y, _display.width, _display.height );
				
				if ( _loader.images[_currentFrame].cue ){
					_loader.images[_currentFrame].cue.handler.apply( F, _loader.images[_currentFrame].cue.params )
				}
			}

			F.percent = _currentFrame / _specs.frames;
			F.currentTime = _currentFrame / _specs.fps;
			_onProgress.call(F);

			//F.screen.dispatchEvent( new CustomEvent('timeupdate') );
			
			_currentFrame++;
		} else {
			// pause for buffering
			trace ( 'Flipbook : ...DRAG... available:', _loader.available + ', _currentFrame:', _currentFrame );
			
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

	function clearCanvas(){
		_ctx.clearRect ( 0, 0, F.css.width, F.css.height );
	}

	/** ------------------------------------------------------------------------------------------------------------- */
	// EVENT HANDLERS
	function handleSpecs ( event ){
		_specs = event._specs;
		
		F.duration = _specs.time;

		// if it is a short video, check total time against buffer time 
		if ( _buffer.seconds >= _specs.time ){
			var _newTime = _specs.time * .9;
			_buffer.seconds = _newTime;
			trace ( 'Flipbook : change buffer time to', _buffer.seconds );
		}

		_buffer.frames = Math.floor(_buffer.seconds * _specs.fps);
		trace ( 'Flipbook : _buffer.frames:', _buffer.frames );

		if ( !_clock.max ) _clock.max = _specs.time * 2000;
		_clock.max -= (Date.now() - _clock.start);
		_clock.max /= 1000;
		//trace ( ' _clock.max:', _clock.max )
		_clock.maxTimer = setTimeout ( handleMaxRuntime, _clock.max );

		F.setDisplay();

		setCuePointsFrames();
	}

	function handleImagesCreateProgress ( event, img ){

		event.images[img.id].cue = _cuePoints[img.id] || null;
		//trace ( img.id, event.images[img.id], _cuePoints )

		// Maybe used later to not let e pause land on a scaled frame?
		//event.images[img.id].scaled = ( img.width == this._specs.width && img.height == this._specs.height );

		//trace ( 'handleImagesCreateProgress()', event.available, _buffer.frames )
		if ( event.available === _buffer.frames ) {
			//var _timeInitBuffer = Date.now() - _clock.start;
			//trace ( 'Time initial buffer (_timeInitBuffer) :', _timeInitBuffer )
			_onReady.call( this );
			//trace ( 'Flipbook.handleImagesCreateProgress() onReady()' );
			if ( _autoPlay ) F.play();
		}

		if ( _buffer.isActive ) {
			if ( event.available >= _currentFrame + _buffer.frames || event.isBytesLoaded ){
				trace ( 'Flipbook : BUFFER END');
				setBuffer ( false );
			} else {
				trace ( 'Flipbook : buffering... _currentFrame:', _currentFrame, ', available:', event.available, ':::' )
			}
		}
	}

	function handleImagesCreateComplete ( event ){
		//trace ( 'Flipbook : ALL IMAGES CREATED' )
		clearTimeout( _clock.maxTimer );
		_onLoadComplete.call(F)
		
		//trace ( _loader.images )
		var totalTime = Date.now() - _clock.start;
		trace ( 'Flipbook : TOTAL LOAD TIME =', totalTime )

		// DEBUG to see if an images were missed
		/*for ( var i = 0; i < _loader.images.length; i++ ) {
			if ( !(_loader.images[i].image instanceof HTMLImageElement) ){
				trace ( 'FAIL --> frameImage [', i, '] is NOT an Image' );
			}
		}*/
	}

	function handleMaxRuntime(){
		trace ( 'Flipbook : MAX TIME HIT')

		// check if all the images are not ready first
		if ( _loader.available !== _specs.frames ){
			trace ( _loader.available, _specs.frames, F.paused, _buffer.isActive )
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
	

