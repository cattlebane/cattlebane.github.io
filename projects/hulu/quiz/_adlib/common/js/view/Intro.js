var Intro = ( function() {

	var self = this;
	self.container;
	self.images;
	self.imageQueue;
	self.btn;
	self.introText1;
	self.introText2;
	self.delay = 0.1;
	self.showing = true;

	self.callback;


	self.build = function ( args )
	{
		var target = args.target || adData.elements.redAdContainer;
		var fontSize = args.fontSize || 38;
		var lineHeight = args.lineHeight || fontSize;
		var textWidth = args.textWidth || 580;
		var textHeight = args.textHeight || 50;
		var margin = args.margin || 0;
		var multiline = args.multiline || false;
		var spacer = args.spacer || 10;
		self.callback = args.callback || nocallback;

		self.container = new UIComponent({
			id: 'intro',
			target: target,
			css: {
				width: adParams.adWidth,
				height: adParams.adHeight,
				position: 'absolute'
			}
		});
		Gesture.disable( self.container );

		var imagesContainer = UIComponent({
			id: 'introImagesContainer',
			target: self.container,
			css: {
				width: adParams.adWidth,
				height: adParams.adHeight,
				position: 'absolute'
			}
		});

		self.images = [];
		var image;
		for (var i = adData.totalIntroImages; i > 0; i--)
		{
			image = new UIImage({
				id: 'introImage_' + i,
				target: imagesContainer,
				source: adData.questions[i].image,
				css: {
					position: 'absolute',
					backgroundSize: 'contain',
				}
			});
			Align.moveX( Align.CENTER, image );
			TweenLite.set( image, { scale: 3 } );
			if ( i < adData.totalIntroImages )
			{
				// TweenLite.set( image, { clip:'rect(0px, 0px, ' + image.height + 'px, 0px)' } );
				TweenLite.set( image, { opacity: 0 } );
				self.images.push( image );
			}
		}

		self.imageQueue = self.images.slice();


		var introGradient = new UIImage({
			id: 'introGradient',
			target: self.container,
			source: 'introGradient',
			css: {
				// width: adParams.adWidth,
				// height: adParams.adHeight
			}
		})


		var contentContainer = UIComponent({
			id: 'introContentContainer',
			target: self.container,
			css: {
				width: textWidth,
				height: adParams.adHeight,
				position: 'absolute'
			}
		});

		var totalHeight = 0;
		var introText1 = self.introText1 = Markup.addTextfield({
			id: 'introText1',
			target: contentContainer,
			css: {
				width: textWidth,
				height: textHeight
			},
			margin: margin,
			multiline: multiline,
			textStyles: 'color: ' + adData.whiteColor + '; font-size: ' + fontSize + 'px; line-height: ' + lineHeight + 'px; font-family: ' + adData.primaryFont + '; text-align: center;'
		}, adData.introText1, false, false );
		TextUtils.autosizeTF( introText1.textfield );
		Align.moveX( Align.CENTER, introText1.textfield );
		totalHeight += Styles.getCss( introText1.textfield, 'height' ) + spacer;

		var introText2 = self.introText2 = Markup.addTextfield({
			id: 'introText2',
			target: contentContainer,
			css: {
				width: textWidth,
				height: textHeight,
				top: totalHeight
			},
			margin: margin,
			multiline: multiline,
			textStyles: 'color: ' + adData.whiteColor + '; font-size: ' + fontSize + 'px; line-height: ' + lineHeight + 'px; font-family: ' + adData.primaryFont + '; text-align: center;'
		}, adData.introText2, false, false );
		TextUtils.autosizeTF( introText2.textfield );
		Align.moveX( Align.CENTER, introText2.textfield );
		totalHeight += Styles.getCss( introText2.textfield, 'height' ) + spacer;


		var actionBTN = self.btn = new ActionBTN();
		actionBTN.build({
			id: 'intro',
			target: contentContainer,
			copy: adData.startCTA,
			top: totalHeight,
			isCorrect: true,
			callback: self.callback
		});
		TweenLite.set( actionBTN.container, { opacity: 0 });
		// actionBTN.registerEvents();
		Align.moveX( Align.CENTER, actionBTN.container );
		// Gesture.addEventListener( actionBTN.container, GestureEvent.CLICK, self.callback );

		Gesture.disable( contentContainer );

		totalHeight += actionBTN.height;

		Styles.setCss( contentContainer, 'height', totalHeight );

		Align.move( Align.CENTER, contentContainer );

		self.container.hide();

		// self.show();
	}

	self.show = function()
	{
		self.container.show();
		var startX = -40;
		var animationTime = 0.5;
		TweenLite.from( self.introText1.container, animationTime, { delay: 0.1, x: startX, ease:Quad.easeOut });
		TweenLite.from( self.introText2.container, animationTime, { delay: 0.2, x: startX, ease:Quad.easeOut });
		self.btn.simpleShow();
		TweenLite.fromTo( self.btn.container, animationTime, { x: startX, opacity: 0 }, { delay: 0.3, x: 0, opacity: 1, ease:Quad.easeOut });
		// TweenLite.delayedCall( 0.4, self.btn.show );
		TweenLite.delayedCall( 2, self.btn.blink );
		
		TweenLite.delayedCall( 1, nextImage );
	}

	self.hide = function()
	{
		if (self.showing)
		{
			self.showing = false;
			// TweenLite.killTweensOf();
			TweenLite.killDelayedCallsTo( self.callback );
			TweenLite.fromTo( self.container, 0.5, { clip:'rect(0px ' + adParams.adWidth + 'px ' + adParams.adHeight + 'px 0px)' }, { delay:0.35, clip:'rect(0px ' + adParams.adWidth + 'px ' + adParams.adHeight + 'px ' + adParams.adWidth + 'px)', ease:Quad.easeInOut, onComplete: function() {
				Styles.setCss( self.container, 'display', 'none' );
			} } );
			// TweenLite.delayedCall( 0.25, self.btn.hide );
		}
	}

	function nextImage()
	{
		if (self.showing)
		{
			if ( self.imageQueue.length > 0 )
			{
				var image = self.imageQueue.shift();
				TweenLite.to( image, 1, { delay: self.delay, opacity: 1, ease:Quad.easeInOut, onComplete: function() {
					TweenLite.delayedCall( 0.5, nextImage );
				} } );
				// TweenLite.to( image, 1, { delay: self.delay, clip:'rect(0px, ' + image.width + 'px ' + image.height + 'px 0px)', ease:Quad.easeInOut, onComplete:nextImage } );
			}
			else
			{
				// if ( adData.autoplay )
					TweenLite.delayedCall( self.delay, self.callback );
			}
		}
	}

	function nocallback()
	{

	}


	return self;
});