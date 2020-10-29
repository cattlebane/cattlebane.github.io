var Endframe = ( function() {

	var self = this;
	self.container;
	self.resultText1;
	self.endframeOnHulu;
	self.gallery;
	self.endframeCTA;
	self.replay;
	self.termsTF;

	self.callback;
	self.resetCallback;

	self.build = function ( args )
	{
		var target = args.target || adData.elements.redAdContainer;
		var width = args.width || adParams.adWidth;
		var height = args.height || adParams.adHeight;
		self.callback = args.callback || nocallback;
		self.resetCallback = args.resetCallback || nocallback;
		var galleryTop = 90;

		self.container = new UIComponent({
			id: 'endframe',
			target: target,
			// source: 'circle',
			css: {
				width: width,
				height: height,
				position: 'absolute',
				backgroundColor: adData.greyColor
			}
		});



		var endframeHeadlineCopy = adData.resultText(1);
		var endframeHeadlineLetterSpacing = 0;
		if (adData.endframeHeadline.length > 0)
		{
			endframeHeadlineCopy = adData.endframeHeadline;
			endframeHeadlineLetterSpacing = 2;
		}


		var headerContainer = new UIComponent({
			id: 'endframe_header_container',
			target: self.container,
			css: {
				width: width,
				height: galleryTop,
				position: 'absolute'
			}
		})

		self.resultText1 = Markup.addTextfield({
			id: 'endframe_resultText1_TF',
			target: headerContainer,
			css: {
				width: 800,
				height: height,
				top: 10
			},
			margin: 5,
			multiline: false,
			textStyles: 'color: ' + adData.whiteColor + '; font-size: 34px; line-height: 34px; letter-spacing: ' + endframeHeadlineLetterSpacing + 'px; font-family: ' + adData.secondaryFont + '; text-align: center;'
		}, endframeHeadlineCopy, false, false );
		/*TextUtils.autosizeTF( self.resultText1.textfield );
		TextUtils.fitContainerToText( self.resultText1, true, true );
		Align.moveX( Align.CENTER, self.resultText1.container );*/


		self.termsTF = Markup.addTextfield({
			id: 'endframe_terms_TF',
			target: self.container,
			css: {
				width: 200,
				height: 20,
				// top: 10
			},
			margin: 0,
			multiline: false,
			textStyles: 'color: ' + adData.huluColors.primaryGreen + '; font-size: 8px; font-family: ' + adData.quaternaryFont + ';'
		}, '*TERMS APPLY', false, false );
		TextUtils.fitContainerToText( self.termsTF, true, true );
		Align.move( Align.BOTTOM_RIGHT, self.termsTF.container, -15, -10 );



		self.endframeOnHulu = Markup.addTextfield({
			id: 'endframeOnHulu_TF',
			target: self.container,
			css: {
				width: width,
				height: height,
				top: 52
				// top: 67
			},
			margin: 5,
			multiline: false,
			textStyles: 'color: ' + adData.huluColors.primaryGreen + '; font-size: 24px; line-height: 24px; font-family: ' + adData.tertiaryFont + '; text-align: center;'
		}, adData.endframeOnHulu, false, false );
		TextUtils.autosizeTF( self.endframeOnHulu.textfield );
		TextUtils.fitContainerToText( self.endframeOnHulu, true, true );
		Align.moveX( Align.CENTER, self.endframeOnHulu.container );




		Gesture.disable( self.container );



		self.gallery = new Gallery();
		self.gallery.build({
			target: self.container,
			width: width,
			height: height,
			top: galleryTop
		});




		self.endframeCTA = new EndframeCtaBTN();
		self.endframeCTA.build({
			target: self.container,
			width: 360,
			height: 22,
			fontSize: 24,
			multiline: false,
			callback: function() {
				trace('Endframe.build() endframeCTA.CLICK');
				adData.networkExit( clickTag );
			}
		});
		self.endframeCTA.unregisterEvents();
		// Align.move( Align.BOTTOM_CENTER, self.endframeCTA.container, 0, -11 );
		Align.moveX( Align.CENTER, self.endframeCTA.container );
		Align.moveY( Align.BOTTOM, self.endframeCTA.container, -11 );



		self.replay = new ReplayBTN();
		self.replay.build({
			target: headerContainer,
			width: 100,
			height: ImageManager.get('replay').height,
			fontSize: 14,
			lineHeight: 12,
			letterSpacing: 1,
			callback: hide
		});
		Align.move( Align.TOP_RIGHT, self.replay.container, -14, 14 );



		Styles.setCss( self.container, 'display', 'none' );
	}



	self.show = function()
	{
		var startX = -40;
		var animationTime = 0.5;
		var easeFunc = Quad.easeOut;
		var delay = 0;

		self.endframeCTA.registerEvents();
		Styles.setCss( self.container, 'display', 'inherit' );


		var endframeHeadlineCopy = adData.resultText(1);
		var endframeHeadlineLetterSpacing = 0;
		if (adData.endframeHeadline.length > 0)
		{
			endframeHeadlineCopy = adData.endframeHeadline;
			endframeHeadlineLetterSpacing = 2;
		}
		Styles.setCss( self.resultText1.textfield, 'letter-spacing', endframeHeadlineLetterSpacing );
		TextUtils.addText( self.resultText1.textfield, endframeHeadlineCopy );
		// TextUtils.autosizeTF( self.resultText1.textfield );
		TextUtils.autosizeTF( self.resultText1.textfield, Styles.getCss( self.resultText1.textfield, 'line-height') / Styles.getCss( self.resultText1.textfield, 'font-size') );
		// TextUtils.autosizeTF( self.resultText1.textfield, Styles.getCss( self.resultText1.textfield, 'font-size') / Styles.getCss( self.resultText1.textfield, 'line-height') );
		// TextUtils.fitContainerToText( self.resultText1, true, true );
		Align.moveX( Align.CENTER, self.resultText1.container, -2 );

		if ( adData.endframeOnHulu.length < 1 )
		{
			Align.moveY( Align.CENTER, self.resultText1.container );
			// Align.moveY( Align.CENTER, self.replay.container );
		}
			


		// -- animation
		// TweenLite.to( self.container, animationTime, { clip:'rect(0px ' + adParams.adWidth + 'px ' + adParams.adHeight + 'px 0px)', ease: Quad.easeInOut, onComplete: self.showCallback });
		// TweenLite.fromTo( self.replay.container, animationTime, { opacity: 0, x: startX }, { delay: delay, opacity: 1, x: 0, ease: easeFunc } );
		self.replay.show({
			animationTime: animationTime,
			startX: startX,
			delay: delay,
			easeFunc: easeFunc
		});
		delay += 0.1;
		var termsX = Styles.getCss( self.termsTF.container, 'x' );
		TweenLite.fromTo( self.termsTF.container, animationTime, { opacity: 0, x: termsX + startX }, { delay: delay, opacity: 1, x: termsX, ease: easeFunc } );
		delay += 0.1;
		TweenLite.fromTo( self.resultText1.container, animationTime, { opacity: 0, x: startX }, { delay: delay, opacity: 1, x: 0, ease: easeFunc } );
		delay += 0.1;
		TweenLite.fromTo( self.endframeOnHulu.container, animationTime, { opacity: 0, x: startX }, { delay: delay, opacity: 1, x: 0, ease: easeFunc } );
		delay += 0.1;
		TweenLite.fromTo( self.endframeCTA.container, animationTime, { opacity: 0, x: startX }, { delay: delay, opacity: 1, x: 0, ease: easeFunc } );

		self.gallery.show({
			animationTime: animationTime,
			startX: startX,
			delay: delay,
		});
	}

	function hide()
	{
		var destX = 40;
		var animationTime = 0.5;
		var easeFunc = Expo.easeIn;
		var delay = 0;

		self.endframeCTA.unregisterEvents();

		Styles.setCss( self.container, 'display', 'inherit' );


		// -- animation
		// TweenLite.to( self.container, animationTime, { clip:'rect(0px ' + adParams.adWidth + 'px ' + adParams.adHeight + 'px 0px)', ease: Quad.easeInOut, onComplete: self.showCallback });
		self.gallery.hide();
		// TweenLite.to( self.replay.container, animationTime, { delay: delay, opacity: 0, x: destX, ease: easeFunc } );
		self.replay.hide({
			animationTime: animationTime,
			delay: delay,
			destX: destX,
			easeFunc: easeFunc
		} );
		delay += 0.1;
		TweenLite.to( self.resultText1.container, animationTime, { delay: delay, opacity: 0, x: destX, ease: easeFunc } );
		delay += 0.1;
		TweenLite.to( self.endframeOnHulu.container, animationTime, { delay: delay, opacity: 0, x: destX, ease: easeFunc } );
		delay += 0.1;
		TweenLite.to( self.endframeCTA.container, animationTime, { delay: delay, opacity: 0, x: destX, ease: easeFunc, onComplete: function() {
			Styles.setCss( self.container, 'display', 'none' );
			self.resetCallback();
		} } );
		
	}


	function nocallback()
	{

	}


	return self;
});