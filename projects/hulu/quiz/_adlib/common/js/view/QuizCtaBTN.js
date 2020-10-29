var QuizCtaBTN = ( function() {

	var self = this;
	self.container;
	self.callback;

	self.arrow;
	self.isOver = false;
	self.maxOverTime = 1;

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
		var multiline = args.multiline || true;
		self.callback = args.callback || nocallback;

		self.container = new UIComponent({
			id: 'quiz_cta',
			target: target,
			css: {
				width: width,
				height: height,
				top: top,
				left: left,
				position: 'absolute',
				// opacity: 0
			}
		});



		var copyTF = Markup.addTextfield({
			id: 'quiz_cta_text',
			target: self.container,
			css: {
				width: width,
				height: height
			},
			margin: margin,
			multiline: multiline,
			textStyles: 'color: ' + adData.whiteColor + '; font-size: ' + fontSize + 'px; line-height: ' + lineHeight + 'px; font-family: ' + adData.primaryFont + '; text-align: left;'
		}, adData.quizCTA, false, false );
		fontSize = lineHeight = TextUtils.autosizeTF( copyTF.textfield );

		var arrowLeft = Styles.getCss( copyTF.textfield, 'width' ) + 3;
		self.arrow = Markup.addTextfield({
			id: 'quiz_cta_arrow',
			target: self.container,
			css: {
				width: width,
				height: height,
				left: arrowLeft
			},
			margin: margin,
			multiline: multiline,
			textStyles: 'color: ' + adData.huluColors.primaryGreen + '; font-size: ' + fontSize + 'px; line-height: ' + lineHeight + 'px; font-family: ' + adData.primaryFont + '; text-align: left;'
		}, '›', false, false );

		TextUtils.fitContainerToText( self.arrow, true, true );

		Styles.setCss( self.container, 'width', arrowLeft + Styles.getCss( self.arrow.textfield, 'width' ) );


		Gesture.disableChildren( self.container );

		self.show();
	}


	self.show = function ()
	{
		registerEvents();
	}

	self.hide = function()
	{
	}


	self.onHitRollOver = function(event)
	{
		if (!self.isOver)
		{
			self.isOver = true;
			TweenLite.killDelayedCallsTo( self.onHitRollOut );
			TweenLite.delayedCall( self.maxOverTime, self.onHitRollOut );
		}
		var animationTime = 0.25;
		var easeFunc = Quad.easeInOut;
		TweenLite.to( self.arrow.textfield, animationTime, { x: 3, color: adData.whiteColor, ease:easeFunc, onComplete: function() {
			TweenLite.to( self.arrow.textfield, animationTime, { x: 0, color: adData.huluColors.primaryGreen, ease:easeFunc, onComplete: function() {
				if (self.isOver)
					self.onHitRollOver();
			} })
		} } );
	}

	self.onHitRollOut = function(event)
	{
		TweenLite.killDelayedCallsTo( self.onHitRollOut );
		self.isOver = false;
	}

	function onHitClick(event)
	{
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