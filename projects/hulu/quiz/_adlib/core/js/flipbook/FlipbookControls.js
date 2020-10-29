/** ============================================================================================================================================= */
/** == SEEK BAR  ================================================================================================================================ */
/** ============================================================================================================================================= */
Flipbook.SeekBar = function( arg ){
	var f = this;

	trace ( 'seek bar:', arg )

	f.container = Markup.addDiv({
		target : arg.container,
		id : arg.id + '_seekBar',
		css : {
			width : arg.css.width
		}
	});
	f.scrubberLoader = Markup.addDiv({
		target : f.container,
		id : arg.id + '_loader',
		css : {
			width : 0
		}
	});
	f.scrubberAvailable = Markup.addDiv({
		target : f.container,
		id :  arg.id + '_available',
		css : {
			width : 0
		}
	});
	f.scrubberPlayHead = Markup.addDiv({
		target : f.container,
		id : arg.id + '_head',
		css : {
			width : 0
		}
	});

	f.onLoadProgress = function(perc){
		f.scrubberLoader.style.width = (arg.css.width * perc) + 'px';
	}

	f.onLoadAvailable = function(perc){
		f.scrubberAvailable.style.width = (arg.css.width * perc) + 'px';
	}

	f.onProgress = function(perc){
		f.scrubberPlayHead.style.width = (arg.css.width * perc) + 'px';
	}

	Gesture.addEventListener ( f.container, GestureEvent.CLICK, handleClick );
	function handleClick ( event ) {
		var _event = Gesture.isIOS || Gesture.isAndroid ? event.changedTouches[0] : event ;
		//trace ( '_event:', _event )
		//trace ( '_event.clientX:', _event.clientX )	
		var perc = _event.clientX / arg.css.width;
		var time = arg.getTotalTime() * perc;
		trace ( perc, time )
		arg.seek ( time );
	}
}

/** ============================================================================================================================================= */
/** == PLAY PAUSE ICON  ========================================================================================================================= */
/** ============================================================================================================================================= */
Flipbook.ScreenControls = function( arg ){
	var f = this;

	var _isShowing = false;
	var _timeout;

	f.container = Markup.addDiv({
		target : arg.container,
		id : arg.id + '_screenControls',
		css : {
			height : arg.css.height,
			width : arg.css.width,
			opacity : 0
		}
	});

	f.playIcon = createCanvas();	
	var ctx = f.playIcon.getContext('2d');
	ctx.fillStyle = "rgba(0,0,0,.5)";
	ctx.arc(25, 25, 25, 0, 2 * Math.PI);
	ctx.fill();
	ctx.fillStyle = "white";
	ctx.beginPath();
	ctx.moveTo(15,10);
	ctx.lineTo(40,25);
	ctx.lineTo(15,40);
	ctx.closePath();
	ctx.fill();
	f.container.appendChild( f.playIcon  );	
	Align.centerHorizontal ( f.playIcon );
	Align.centerVertical ( f.playIcon );	
	
	f.pauseIcon = createCanvas();	
	var ctx = f.pauseIcon.getContext('2d');
	ctx.fillStyle = "rgba(0,0,0,.5)";
	ctx.arc(25, 25, 25, 0, 2 * Math.PI);
	ctx.fill();
	ctx.beginPath();
	ctx.rect(13, 12, 9, 26);
	ctx.rect(28, 12, 9, 26);
	ctx.fillStyle = "white";
	ctx.fill();
	f.container.appendChild( f.pauseIcon  );	
	Align.centerHorizontal ( f.pauseIcon );
	Align.centerVertical ( f.pauseIcon );			
	

	Gesture.addEventListener ( f.container, GestureEvent.CLICK, handleClick );

	function handleClick ( event ){
		if ( !_isShowing ){
			f.pauseIcon.style.visibility = 'visible';
			f.playIcon.style.visibility = 'hidden';
			showHide(true);
			_timeout = setTimeout(function(){
				showHide(false)
			}, 2000)
		} else {
			clearTimeout(_timeout)
			if ( arg.getIsPlaying() ){
				arg.pause();
				dim(true);
				trace (f.pauseIcon)
				f.pauseIcon.style.visibility = 'hidden';
				f.playIcon.style.visibility = 'visible';
			} else {
				arg.play();
				showHide(false);
				dim(false);
			}
		}
	}

	function showHide ( isShowing ){
		_isShowing = isShowing;
		TweenLite.to ( f.container, .2, { opacity:isShowing ? 1 : 0 })
	}

	function dim ( isDim ){
		var opacity = isDim ? .5 : 0 ;
		f.container.style.backgroundColor = 'rgba(0,0,0,' + opacity + ')'
	}

	function createCanvas(){
		var c = document.createElement( 'canvas' );		
		c.width = 50;
		c.height = 50;
		c.style.position = 'absolute';
		return c;
	}
}
