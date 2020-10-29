var ReplayBTN = ( function() {

	var self = this;
	self.container;
	self.callback;

	self.arrow;
	self.isOver = false;
	self.maxOverTime = 1;
	self.opacity = 0.6;

	self.build = function ( args )
	{
		var target = args.target || adData.elements.redAdContainer;
		var fontSize = args.fontSize || 18;
		var lineHeight = args.lineHeight || fontSize;
		var width = self.width = args.width || self.width;
		var height = self.height = args.height || self.height;
		var top = args.top || 0;
		var left = args.left || 0;
		var margin = args.margin || 0;
		var multiline = args.multiline || false;
		var letterSpacing = args.letterSpacing || 0;
		self.callback = args.callback || nocallback;

		self.container = new UIComponent({
			id: 'ReplayBTN',
			target: target,
			css: {
				width: width,
				height: height,
				top: top,
				left: left,
				position: 'absolute',
				opacity: self.opacity
				// display: 'none'
			}
		});



		var copyTF = Markup.addTextfield({
			id: 'replay_text',
			target: self.container,
			css: {
				width: width,
				height: height
			},
			margin: margin,
			multiline: multiline,
			textStyles: 'color: ' + adData.huluColors.primaryGreen + '; font-size: ' + fontSize + 'px; line-height: ' + lineHeight + 'px; font-family: ' + adData.tertiaryFont + '; text-align: left; letter-spacing: ' + letterSpacing + 'px;'
		}, adData.replay, false, false );
		TextUtils.autosizeTF( copyTF.textfield );
		Align.moveY( Align.CENTER, copyTF.textfield, 1 );

		var arrowLeft = Styles.getCss( copyTF.textfield, 'width' ) + 3;
		var arrowImg = ImageManager.get('replay');
		self.arrow = new UIImage({
			id: 'replay_arrow',
			target: self.container,
			source: 'replay',
			css: {
				left: arrowLeft
			}
		});

		Styles.setCss( self.container, 'width', arrowLeft + arrowImg.width );


		Gesture.disableChildren( self.container );

		// self.show();
	}


	self.show = function ( args )
	{
		trace('ReplayBTN.show()');
		trace('		args:' + args);
		for (var i in args)
			trace('			' + i + ':' + args[i]);
		TweenLite.fromTo( self.container, args.animationTime, { opacity: 0, x: args.startX }, { delay: args.delay, opacity: self.opacity, x: 0, ease: args.easeFunc } );
		registerEvents();
	}

	self.hide = function( args )
	{
		self.isOver = false;
		TweenLite.killDelayedCallsTo( self.onHitRollOut );
		self.unregisterEvents();
		TweenLite.killTweensOf( self.container );
		TweenLite.to( self.container, args.animationTime, { delay: args.delay, opacity: 0, x: args.destX, ease: args.easeFunc } );
	}


	self.onHitRollOver = function(event)
	{
		if (!self.isOver)
		{
			self.isOver = true;
			TweenLite.killDelayedCallsTo( self.onHitRollOut );
			TweenLite.delayedCall( self.maxOverTime, self.onHitRollOut );
		}
		var animationTime = 1;//0.5;
		// var easeFunc = Linear.easeNone;
		var easeFunc = Expo.easeOut;
		TweenLite.to( self.container, 0.25, { opacity: 1, ease: easeFunc });
		TweenLite.fromTo( self.arrow, animationTime, { rotation: 360 }, { transformOrigin:'50% 60%', rotation: 0, color: adData.whiteColor, ease:easeFunc, onComplete: function() {
			if (self.isOver)
				self.onHitRollOver();
		} } );
	}

	self.onHitRollOut = function(event)
	{
		TweenLite.to( self.container, 0.5, { opacity: self.opacity, ease: Quad.easeInOut });
		TweenLite.killDelayedCallsTo( self.onHitRollOut );
		self.isOver = false;
	}

	function onHitClick(event)
	{
		self.isOver = false;
		self.unregisterEvents();
		self.callback();
	}

	self.unregisterEvents = function()
	{
		Gesture.removeEventListener( self.container, GestureEvent.OVER, self.onHitRollOver );
		Gesture.removeEventListener( self.container, GestureEvent.OUT, self.onHitRollOut );
		Gesture.removeEventListener( self.container, GestureEvent.CLICK, onHitClick );
	}

	function registerEvents()
	{
		Gesture.addEventListener( self.container, GestureEvent.OVER, self.onHitRollOver );
		Gesture.addEventListener( self.container, GestureEvent.OUT, self.onHitRollOut );
		Gesture.addEventListener( self.container, GestureEvent.CLICK, onHitClick );
	}

	function nocallback()
	{

	}


	return self;
});