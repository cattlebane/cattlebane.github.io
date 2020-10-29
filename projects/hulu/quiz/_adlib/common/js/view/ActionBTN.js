var ActionBTN = ( function() {

	var self = this;
	self.container;
	self.height = 42;
	self.width = 198;
	self.fill;
	self.fillOVER;
	self.callback;
	self.isCorrect = false;
	self.isWrong = false;
	self.id;
	self.fillColor;

	self.fillShowing = 0;
	self.isOver = false;


	self.build = function ( args )
	{
		var id = self.id = args.id || 'ActionBTN';
		var target = args.target || adData.elements.redAdContainer;
		var fontSize = args.fontSize || 14;
		var lineHeight = args.lineHeight || fontSize;
		var width = self.width = args.width || self.width;
		var height = self.height = args.height || self.height;
		var top = args.top || 0;
		var left = args.left || 0;
		var margin = args.margin || 5;
		var multiline = args.multiline || true;
		var copy = args.copy || 'START PLAYING';
		self.callback = args.callback || nocallback;
		self.isCorrect = args.isCorrect;
		self.fillShowing = args.fillShowing || 0;

		self.container = new UIComponent({
			id: id + '_btn_container',
			target: target,
			css: {
				width: width,
				height: height,
				top: top,
				left: left,
				position: 'absolute',
				opacity: 0
			}
		});


		var border = UIImage({
			id: id + '_btn_border',
			target: self.container,
			source: 'btnBorder',
			css: {
				width: width,
				height: height,
				position: 'absolute'
			}
		});





		self.fill = adData.elements[id + '_fill'] = CanvasDrawer.create({
			id: id + '_fillCanvas',
			target: self.container,
			css: {
				width: width,
				height: height
			},
    			styles: 'position: absolute;',
			display: true,
			retina: false,
			debug: false
		});

		var fillImg = self.fill.addImage({
			source: 'btnFill',
			id: id + '_btnFill',
			params: {
				x: 0,
				y: 0,
				width: width,
				height: height
			}
		});

		self.fillColor = self.fill.addShape({
		    type: CanvasDrawType.RECT,
		    id: id + '_fillColor',
		    params: {
		        width: width,
		        height: height
		    },
		    blendMode: CanvasBlendMode.SOURCE_IN,
		    // fill: adData.wrongColor
		    fill: adData.huluColors.primaryGreen
		});

		self.fill.update();




		/*self.fill = UIImage({
			id: id + '_btn_fill',
			target: self.container,
			source: 'btnFill',
			css: {
				width: width,
				height: height,
				position: 'absolute',
				opacity: 0
			}
		});*/

		self.fillOVER = UIImage({
			id: id + '_btn_fillOVER',
			target: self.container,
			source: 'btnFillOVER',
			css: {
				width: width,
				height: height,
				position: 'absolute',
				opacity: 0
			}
		});

		self.copyTF = Markup.addTextfield({
			id: id + '_btn_text',
			target: self.container,
			css: {
				width: width,
				height: height
			},
			margin: margin,
			multiline: multiline,
			textStyles: 'color: ' + adData.whiteColor + '; font-size: ' + fontSize + 'px; line-height: ' + lineHeight + 'px; font-family: ' + adData.tertiaryFont + '; text-align: center;'
		}, copy, false, false );
		TextUtils.autosizeTF( self.copyTF.textfield );
		Align.move( Align.CENTER, self.copyTF.textfield );

		Gesture.disableChildren( self.container );
	}

	self.simpleShow = function()
	{
		Styles.setCss( self.container, 'opacity', 1 );
		Styles.setCss( self.fillOVER, 'opacity', 0 );
		self.fill.tween.set( self.id + '_btnFill', { opacity: 0 } );
		self.fill.tween.start();
		TweenLite.delayedCall( 0.2, self.registerEvents );
	}

	self.blink = function()
	{
		if (!self.isOver)
		{
			// self.show();
			// self.show(0.1);
			/*TweenLite.fromTo( self.fillOVER, 0.25, { opacity: 0 }, { opacity: 0.75, ease:Quad.easeIn, onComplete: function() {
				TweenLite.to( self.fillOVER, 0.25, { opacity: 0, ease:Quad.easeOut } );
			} } );*/
			self.fill.tween.fromTo( self.id + '_btnFill', 0.5, { opacity: 0 }, { opacity: 1, ease:Quad.easeOut, onComplete: function()
			{
				trace('ActionBTN.blink() onComplete');
				self.fill.tween.kill();
				TweenLite.delayedCall( 0.1, function() {
					self.fill.tween.to( self.id + '_btnFill', 0.5, { opacity: 0, ease:Quad.easeIn });
					self.fill.tween.start();
				} );
			} } );
			self.fill.tween.start();
		}
	}

	self.updateText = function( copy )
	{
		TextUtils.addText( self.copyTF.textfield, copy );
		TextUtils.autosizeTF( self.copyTF.textfield );
		Align.move( Align.CENTER, self.copyTF.textfield );
	}

	self.show = function (delay)
	{
		self.fillColor.fill = adData.huluColors.primaryGreen;
		self.fill.update();
		var showDelay = delay || 0;
		if ( adData.autoplay )
		{
			TweenLite.delayedCall( showDelay, function() {
				Styles.setCss( self.container, 'opacity', 1 );
				TweenLite.fromTo( self.fillOVER, 0.25, { opacity: 1 }, { opacity:0, ease:Quad.easeOut } );
				self.fill.tween.fromTo( self.id + '_btnFill', 0.45, { opacity: 1 }, { opacity: self.fillShowing, ease:Quad.easeInOut } );
				self.fill.tween.start();
				TweenLite.delayedCall( 0.2, self.registerEvents );
			} );
		}
		else
		{
			Styles.setCss( self.container, 'opacity', 1 );
			TweenLite.set( self.fillOVER, { opacity:0 } );
			self.fill.tween.set( self.id + '_btnFill', { opacity: self.fillShowing } );
			self.fill.tween.start();
			self.registerEvents();
		}
	}

	self.hide = function(quickHide)
	{
		self.unregisterEvents();
		TweenLite.killDelayedCallsTo( self.registerEvents );
		TweenLite.killTweensOf( self.fillOVER );
		self.fill.tween.kill();
		// TweenLite.killTweensOf( [self.fillOVER, self.fill] );
		if (quickHide)
			TweenLite.set( self.container, { opacity: 0 });
		else
			TweenLite.to( self.container, 0.25, { opacity: 0, ease:Quad.easeInOut });
	}

	self.reset = function()
	{
		self.fillColor.fill = adData.huluColors.primaryGreen;
		self.onHitRollOut();
	}

	self.onSetCorrect = function()
	{
		// self.unregisterEvents();
		self.fillColor.fill = adData.huluColors.primaryGreen;
		self.onHitRollOver();
	}

	self.onSetWrong = function()
	{
		// self.unregisterEvents();
		self.isWrong = true;
		self.fillColor.fill = adData.wrongColor;
		self.onHitRollOver();
	}

	self.onHitRollOver = function(event)
	{
		self.isOver = true;
		TweenLite.fromTo( self.fillOVER, 0.5, { opacity: 1 }, { opacity:0, ease:Quad.easeOut } );
		self.fill.tween.set( self.id + '_btnFill', { opacity: 1 } );
		self.fill.tween.start();
	}

	self.onHitRollOut = function(event)
	{
		self.isOver = false;
		TweenLite.to( self.fillOVER, 0.5, { opacity: 0, ease:Quad.easeOut } );
		self.fill.tween.fromTo( self.id + '_btnFill', 0.5, { opacity: 1 }, { opacity: self.fillShowing, ease:Quad.easeInOut } );
		self.fill.tween.start();
	}

	self.onResetState = function()
	{
		self.isOver = false;
		// TweenLite.to( self.fillOVER, 0.5, { opacity: 0, ease:Quad.easeOut } );
		self.fill.tween.to( self.id + '_btnFill', 0.5, { opacity: self.fillShowing, ease:Quad.easeInOut } );
		self.fill.tween.start();	
	}

	function onHitClick(event)
	{
		adData.userInteracted = true;
		self.unregisterEvents();
		if ( self.isCorrect )
			self.onSetCorrect(self);
		else
			self.onSetWrong(self);
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