var EndframeCtaBTN = ( function() {

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
		var width = args.width || 360;
		var height = args.height || 22;
		var top = args.top || 0;
		var left = args.left || 0;
		var margin = args.margin || 0;
		var multiline = args.multiline || true;
		self.callback = args.callback || nocallback;
		var spacer = args.spacer || 4;

		self.container = new UIComponent({
			id: 'endframe_cta',
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



		var copy1TF = Markup.addTextfield({
			id: 'endframe_cta1_text',
			target: self.container,
			css: {
				width: width,
				height: height
			},
			margin: margin,
			multiline: multiline,
			textStyles: 'color: ' + adData.whiteColor + '; font-size: ' + fontSize + 'px; line-height: ' + lineHeight + 'px; font-family: ' + adData.secondaryFont + '; text-align: left;'
		}, adData.endframeCTA1, false, false );
		fontSize = lineHeight = TextUtils.autosizeTF( copy1TF.textfield );

		var btnWidth = Styles.getCss( copy1TF.textfield, 'width' ) + spacer;

		var copy2TF = Markup.addTextfield({
			id: 'endframe_cta2_text',
			target: self.container,
			css: {
				width: width,
				height: height,
				left: btnWidth
			},
			margin: margin,
			multiline: multiline,
			textStyles: 'color: ' + adData.whiteColor + '; font-size: ' + fontSize + 'px; line-height: ' + lineHeight + 'px; font-family: ' + adData.primaryFont + '; text-align: left;'
			// textStyles: 'color: ' + adData.huluColors.primaryGreen + '; font-size: ' + fontSize + 'px; line-height: ' + lineHeight + 'px; font-family: ' + adData.primaryFont + '; text-align: left;'
		}, adData.endframeCTA2, false, false );
		fontSize = lineHeight = TextUtils.autosizeTF( copy2TF.textfield );

		btnWidth += Styles.getCss( copy2TF.textfield, 'width' ) + spacer;

		self.arrow = Markup.addTextfield({
			id: 'endframe_cta_arrow',
			target: self.container,
			css: {
				width: width,
				height: height,
				left: btnWidth
			},
			margin: margin,
			multiline: multiline,
			textStyles: 'color: ' + adData.huluColors.primaryGreen + '; font-size: ' + fontSize + 'px; line-height: ' + lineHeight + 'px; font-family: ' + adData.primaryFont + '; text-align: left;'
		}, '›', false, false );

		TextUtils.fitContainerToText( self.arrow, true, true );

		Styles.setCss( self.container, 'width', btnWidth + Styles.getCss( self.arrow.textfield, 'width' ) );








		Gesture.disableChildren( self.container );

		self.show();
	}


	self.show = function ()
	{
		self.registerEvents();
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
		TweenLite.to( self.arrow.textfield, animationTime, { x: 5, color: adData.whiteColor, ease:easeFunc, onComplete: function() {
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

	self.registerEvents = function()
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