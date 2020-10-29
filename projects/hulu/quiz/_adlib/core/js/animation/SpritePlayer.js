/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	SpritePlayer

	Description:
		This object creates a SpritePlayer instance for playing animation using on a png/jpg sheet of images

	Sample Players:
		(start code)
			// e.g. The myAnimationSheet would be a png with 34 images on one sheet, with 6 across
			adData.elements.spritePlayer = new SpritePlayer({
				target: adData.elements.redAdContainer,
				id: 'My_Unique_ID',
				css: {
					x:0,
					y:0,
					width: 100,
					height: 100
				},
				sheet : ImageManager.get('myAnimationSheet'),
				horizontal : 6,
				total : 34,
				speed : 18
			});
		(end code)
		
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */

function SpritePlayer ( arg ){
	var S = Markup.addDiv(arg);

	S.type = arg.data.horizontal != undefined ? 'standard' : 'atlas' ;
	S.frame = 0;
	S.total = arg.data.total || arg.data.frames.length ;

	var _hor = arg.data.horizontal || null;
	var _speed = arg.data.speed || 18;
	var _currentUpdate = S.type == 'standard' ? updateStandard : updateAtlas ;
	var _currentPlayingSpeed;
	var _isPlaying = false;

	/** ----------------------------------------------------------------------------------------------- */
	// MARKUP
	S.img = document.createElement('div');
	S.img.style.position = 'absolute';
	S.img.style.backgroundImage = 'url("' + arg.sheet.src + '")';
	S.img.style.backgroundPosition = '0px 0px';
	S.img.style.overflow = 'hidden';
	S.img.style.width = arg.css.width + 'px'
	S.img.style.height = arg.css.height + 'px'
	S.appendChild( S.img );

	/** ----------------------------------------------------------------------------------------------- */
	// GETTER | SETTERS
	/**	Method: enabled(Boolean)
			Get|Set: Changes the animation frames per second speed. If the parameter is null, it returns the current active state.

		Parameters:
			state 	- A boolean, either true or false.
		
		(start code)
			// GET
			var speed = mySpritePlayer.speed();

			// SET
			mySpritePlayer.speed(18);			
		(end code)
	*/
	S.speed = function(state){
		// GET
		if ( state == undefined ) return _speed;	

		// SET
		_speed = state;
	}

	/** ----------------------------------------------------------------------------------------------- */
	// PUBLIC METHODS
	/**	Method: play()
			Starts the animation, utilizing FrameRate class

		> mySpritePlayer.play();
	*/
	S.play = function (){
		if ( !_isPlaying ){
			_currentPlayingSpeed = _speed;
			FrameRate.register ( S, _currentUpdate, _speed );
			_isPlaying = true;
		}
	}

	/**	Method: gotoAndStop()
			Jumps to a specific frame of the animation, but does not play.

		Parameters:
			frame 	- An integer, the frame to jump to.
		
		> mySpritePlayer.gotoAndStop(4);
	*/
	S.gotoAndStop = function ( frame ){
		_isPlaying = false;
		S.frame = MathUtils.restrict ( frame, 0, S.total - 1 );
		_currentUpdate()
	}

	/**	Method: gotoAndPlay()
			Jumps to a specific frame of the animation and then plays.

		Parameters:
			frame 	- An integer, the frame to jump to.
		
		> mySpritePlayer.gotoAndPlay(4);
	*/
	S.gotoAndPlay = function ( frame ){
		S.gotoAndStop ( frame );
		S.play();
	}

	/**	Method: pause()
			Pauses the animation.

		> mySpritePlayer.pause();
	*/
	S.pause = function (){
		_isPlaying = false;
		FrameRate.unregister ( S, _currentUpdate, _currentPlayingSpeed );
	}

	/** ----------------------------------------------------------------------------------------------- */
	// PRIVATE METHODS
	function updateStandard(){
		var _x = arg.css.width * (S.frame % _hor);
		var _y = arg.css.height * Math.floor(S.frame / _hor)
		S.img.style.backgroundPosition = (-_x) + 'px ' + (-_y) + 'px';
		updateFrame()
	}

	function updateAtlas(){
		//trace ( 'updateAtlas()', this, S )
		var coor = arg.data.frames[S.frame];
		var f = coor.frame;
		var off = coor.spriteSourceSize;

		S.img.style.width = f.w + 'px';
		S.img.style.height = f.h + 'px';
		S.img.style.left = off.x + 'px';
		S.img.style.top = off.y + 'px';
		S.img.style.backgroundPosition = (-f.x) + 'px ' + (-f.y) + 'px';
		updateFrame();
	}

	function updateFrame(){
		S.frame++;
		if ( S.frame >= S.total ) {
			S.dispatchEvent( new CustomEvent('spritePlayerComplete'))
			S.frame = 0;
		}
	}

	/** ----------------------------------------------------------------------------------------------- */
	return S;
}
