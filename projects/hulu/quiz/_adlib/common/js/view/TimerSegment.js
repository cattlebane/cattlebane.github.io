var TimerSegment = ( function() {

	var self = this;

	self.container;
	self.line;
	self.bullet;
	self.id = 0;

	self.animation;


	self.build = function ( args )
	{
		var id = self.id = args.id || 1;
		var target = args.target || adData.elements.redAdContainer;
		var width = args.width || 6;
		var height = args.height || 4;
		var top = args.top || 0;
		var hasBullet = args.hasBullet || false;
		var bulletHeight = args.bulletHeight || 4;


		// -- CONTAINER
		self.container = new UIComponent({
			id: 'timerSegment_' + id,
			target: target,
			css: {
				width: width,
				height: height,
				top: top,
				position: 'absolute',
			}
		});




		// -- LINE
		self.line = new UIComponent({
			id: 'line_' + id,
			target: self.container,
			css: {
				width: width,
				height: hasBullet ? height - bulletHeight : height,
				position: 'absolute',
				backgroundColor: adData.huluColors.primaryGreen
			}
		});
		TweenLite.set( self.line, { transformOrigin:'left top', scaleY: 0 });



		// -- BULLET
		if ( hasBullet )
		{
			self.bullet = new UIComponent({
				id: 'bullet_' + id,
				target: self.container,
				css: {
					width: width,
					height: bulletHeight,
					top: height - bulletHeight,
					position: 'absolute',
					backgroundColor: adData.whiteColor,
					opacity: 0
				}
			});
		}

	}

	self.show = function(ignoreDelay)
	{
		if ( self.bullet )
		{
			var mydelay = ignoreDelay ? 0 : 0.15 * self.id;
			TweenLite.killTweensOf( self.bullet );
			if ( adData.autoplay )
				TweenLite.fromTo( self.bullet, 0.25, { opacity: 0, scale: 4 }, { delay: mydelay, opacity: 1, scale: 1, ease:Quad.easeOut });
			else
				TweenLite.set( self.bullet, { opacity: 1, scale: 1 });
		}
	}

	self.reset = function(skipAnimation)
	{
		TweenLite.killTweensOf( self.line );
		if (skipAnimation)
		{
			TweenLite.set( self.line, { scaleY: 0 });
			if (self.bullet)
				TweenLite.set( self.bullet, { opacity: 0 });
		}
		else
			TweenLite.to( self.line, 1.5, { scaleY: 0, ease:Quad.easeOut });
	}

	function stop()
	{
		TweenLite.killTweensOf( self.line );
	}

	self.pause = function()
	{
		adData.quizTimerTicking = false;
		if (self.animation)
			self.animation.pause();
	}

	self.resolve = function(isCorrect)
	{
		adData.quizTimerTicking = false;
		stop();
		self.show(true);
		TweenLite.to( self.line, adData.questionQuickResolveTime, { scaleY: 1 } );
		var color = isCorrect ? adData.huluColors.primaryGreen : adData.wrongColor;
		TweenLite.fromTo( self.line, 1, { backgroundColor: adData.whiteColor }, { backgroundColor: color, ease:Quad.easeOut } );
	}

	self.timerAnimation = function()
	{
		adData.quizTimerTicking = true;
		TweenLite.set( self.line, { backgroundColor: adData.huluColors.primaryGreen } );
		self.animation = TweenLite.fromTo( self.line, adData.questionTime, { scaleY: 0 }, { scaleY: 1, ease:Linear.easeNone, onComplete: onComplete } );
	}

	function onComplete()
	{
		self.resolve(false);
	}



	return self;
});