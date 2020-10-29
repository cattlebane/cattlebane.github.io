var Results = ( function() {

	var self = this;
	self.container;
	self.contentContainer;
	self.score;
	self.resultText1;
	self.resultText2;

	self.showCallback
	self.fontSize;

	self.build = function ( args )
	{
		var target = args.target || adData.elements.redAdContainer;
		var width = args.width || adParams.adWidth;
		var height = args.height || adParams.adHeight;
		self.fontSize = args.fontSize || 34;
		var lineHeight = args.lineHeight || self.fontSize;
		self.callback = args.callback || nocallback;
		self.showCallback = args.showCallback || nocallback;

		self.container = new UIComponent({
			id: 'results',
			target: target,
			// source: 'circle',
			css: {
				width: width,
				height: height,
				position: 'absolute',
				backgroundColor: adData.greyColor
			}
		});


		self.contentContainer = new UIComponent({
			id: 'results_content_container',
			target: self.container,
			css: {
				width: width,
				height: height,
				position: 'absolute'
			}
		})


		self.score = Markup.addTextfield({
			id: 'score_TF',
			target: self.contentContainer,
			css: {
				width: width,
				height: height
			},
			margin: 5,
			multiline: false,
			textStyles: 'color: ' + adData.huluColors.primaryGreen + '; font-size: 30px; line-height: 30px; font-family: ' + adData.primaryFont + '; text-align: center;'
		}, adData.score + '/' + adData.questions.length, false, false );


		self.resultText1 = Markup.addTextfield({
			id: 'resultText1_TF',
			target: self.contentContainer,
			css: {
				width: width,
				height: height,
				// top: contentHeight
			},
			margin: 5,
			multiline: false,
			textStyles: 'color: ' + adData.whiteColor + '; font-size: ' + self.fontSize + 'px; line-height: ' + lineHeight + 'px; font-family: ' + adData.secondaryFont + '; text-align: center;'
		}, adData.resultText(1), false, false );


		self.resultText2 = Markup.addTextfield({
			id: 'resultText2_TF',
			target: self.contentContainer,
			css: {
				width: width,
				height: height,
				// top: contentHeight
			},
			margin: 5,
			multiline: false,
			textStyles: 'color: ' + adData.whiteColor + '; font-size: ' + self.fontSize + 'px; line-height: ' + lineHeight + 'px; font-family: ' + adData.primaryFont + '; text-align: center;'
		}, adData.resultText(2), false, false );

		Gesture.disable( self.container );

		TweenLite.set( self.container, { display:'none', clip:'rect(0px 0px ' + height + 'px 0px)' } );
	}


	self.show = function()
	{
		trace('Results.show()');
		var startX = -40;
		var animationTime = 0.5;
		var easeFunc = Quad.easeOut;
		var delay = 0;

		TweenLite.set( self.container, { display:'inherit', clip:'rect(0px 0px ' + adParams.adHeight + 'px 0px)' } );
		TweenLite.set( self.score.container, { opacity: 1 });
		TweenLite.set( self.resultText1.container, { opacity: 1 });
		TweenLite.set( self.resultText2.container, { opacity: 1 });


		// -- udpate score
		TextUtils.addText( self.score.textfield, adData.score + '/' + adData.questions.length );

		TextUtils.fitContainerToText( self.score, true, true );
		Align.moveX( Align.CENTER, self.score.container );
		var contentHeight = Styles.getCss( self.score.textfield, 'height' ) + 20;

		// -- udpate resultText1
		Styles.setCss( self.resultText1.textfield, 'font-size', self.fontSize );
		TextUtils.addText( self.resultText1.textfield, adData.resultText(1) );
		TextUtils.autosizeTF( self.resultText1.textfield );
		// TextUtils.fitContainerToText( self.resultText1, true, true );
		Align.moveX( Align.CENTER, self.resultText1.textfield );
		Styles.setCss( self.resultText1.container, 'top', contentHeight );

		contentHeight += Styles.getCss( self.resultText1.textfield, 'height' ) + 7;

		// -- udpate resultText2
		TextUtils.addText( self.resultText2.textfield, adData.resultText(2) );
		TextUtils.autosizeTF( self.resultText2.textfield );
		// TextUtils.fitContainerToText( self.resultText2, true, true );
		Align.moveX( Align.CENTER, self.resultText2.textfield );
		Styles.setCss( self.resultText2.container, 'top', contentHeight );

		// -- udpate contentContainer size and positioning
		contentHeight += Styles.getCss( self.resultText2.textfield, 'height' );
		Styles.setCss( self.contentContainer, 'height', contentHeight );

		Align.moveX( Align.CENTER, self.resultText1.container );
		Align.moveX( Align.CENTER, self.resultText2.container );
		Align.moveY( Align.CENTER, self.contentContainer, -11 );



		// -- animation
		TweenLite.to( self.container, animationTime, { clip:'rect(0px ' + adParams.adWidth + 'px ' + adParams.adHeight + 'px 0px)', ease: Quad.easeInOut, onComplete: self.showCallback });
		TweenLite.from( self.score.container, animationTime, { delay: delay, x: startX, ease: easeFunc } );
		delay += 0.1;
		TweenLite.from( self.resultText1.container, animationTime, { delay: delay, x: startX, ease: easeFunc } );
		delay += 0.1;
		TweenLite.from( self.resultText2.container, animationTime, { delay: delay, x: startX, ease: easeFunc } );

		TweenLite.delayedCall( 3, hide );
	}

	function hide()
	{
		var destX = 40;
		var animationTime = 0.5;
		var easeFunc = Expo.easeIn;
		var delay = 0;

		TweenLite.to( self.score.container, animationTime, { delay: delay, x: destX, opacity: 0, ease: easeFunc } );
		delay += 0.1;
		TweenLite.to( self.resultText1.container, animationTime, { delay: delay, x: destX, opacity: 0, ease: easeFunc } );
		delay += 0.1;
		TweenLite.to( self.resultText2.container, animationTime, { delay: delay, x: destX, opacity: 0, ease: easeFunc, onComplete: function() {
			Styles.setCss( self.container, 'display', 'none' );
			self.callback();
		}});	
	}

	function nocallback()
	{

	}


	return self;
});