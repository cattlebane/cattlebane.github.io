var Quiz = ( function() {

	var self = this;

	self.container;
	self.questions;
	self.questionsQueue;
	self.cta;
	self.questionMarker;
	self.question;
	self.gradient;
	self.headerTF;
	self.quizCTA;

	self.callback;
	self.countdownTime = 3;
	self.markerWidth;
	self.markerHeight;


	self.build = function ( args )
	{
		var target = args.target || adData.elements.redAdContainer;
		var quizWidth = args.quizWidth || 444;
		self.callback = args.callback || nocallback;



		// -- CONTAINER
		self.container = new UIComponent({
			id: 'quiz',
			target: target,
			css: {
				width: adParams.adWidth,
				height: adParams.adHeight,
				position: 'absolute',
				backgroundColor: adData.greyColor,
				// opacity: 0.5
			}
		});
		Gesture.disable( self.container );





		// -- QUESTIONS
		var questionsContainer = UIComponent({
			id: 'questionsContainer',
			target: self.container,
			css: {
				width: adParams.adWidth,
				height: adParams.adHeight,
				position: 'absolute'
			}
		});

		self.questions = [];
		var question;
		args.question.target = questionsContainer;
		args.question.callback = nextQuestion;
		args.question.quizWidth = quizWidth;
		for (var i = 0; i < adData.questions.length; i++)
		{
			question = new QuizQuestion();
			args.question.id = (i + 1);
			args.question.onAnswered = onAnswered;
			question.build( args.question );
			self.questions.push( question );
		}

		self.questionsQueue = self.questions.slice();







		// -- START BTN
		self.startBTN = new ActionBTN();
		self.startBTN.build({
			id: 'quizStartBTN',
			target: questionsContainer,
			copy: adData.startCTA,
			isCorrect: true,
			left: 124,
			top: 117,
			callback: getReady,
			fillShowing: 1
		});
		TweenLite.set( self.startBTN.container, { scale: 1.3 } );
		Gesture.disable( self.startBTN.container );
		// Align.move( Align.CENTER, self.startBTN.container );







		// -- GET READY
		var getReadyTop = 110;
		self.getReadyTF = Markup.addTextfield({
			id: 'quiz_getReadyTF',
			target: self.container,
			css: {
				width: quizWidth,
				height: args.header.height,
				top: getReadyTop,
				opacity: 0
			},
			margin: 5,
			multiline: false,
			textStyles: 'color: ' + adData.whiteColor + '; font-size: 15px; line-height: 15px; font-family: ' + adData.primaryFont + '; text-align: center;'
		}, adData.getReady, false, false );
		TextUtils.autosizeTF( self.getReadyTF.textfield );
		Align.moveX( Align.CENTER, self.getReadyTF.textfield );

		var circleSize = 54;
		self.countdown = new UIComponent({
			id: 'quiz_countdown',
			target: self.container,
			css: {
				width: quizWidth,
				height: circleSize,
				position: 'absolute',
				top: getReadyTop + 25,
				opacity: 0
			}
		});

		var circle = new UIImage({
			id: 'quiz_contdownCircle',
			target: self.countdown,
			source: 'circle',
			css: {
				width: circleSize,
				height: circleSize,
			}
		});

		self.countdownTF = Markup.addTextfield({
			id: 'quiz_countdownTF',
			target: circle,
			css: {
				width: circleSize,
				height: circleSize,
			},
			margin: 0,
			multiline: false,
			textStyles: 'color: ' + adData.whiteColor + '; font-size: 34px; line-height: 30px; font-family: ' + adData.primaryFont + '; text-align: center;'
		}, self.countdownTime.toString(), false, false );
		Align.move( Align.CENTER, self.countdownTF.textfield, 0, 2 );

		Align.moveX( Align.CENTER, circle );







		// -- HEADER
		self.headerTF = Markup.addTextfield({
			id: 'quiz_headerTF',
			target: self.container,
			css: {
				width: quizWidth,
				height: args.header.height,
				top: args.header.top
			},
			margin: 10,
			multiline: false,
			textStyles: 'color: ' + adData.whiteColor + '; font-size: ' + args.header.fontSize + 'px; line-height: ' + args.header.lineHeight + 'px; font-family: ' + adData.primaryFont + '; text-align: center;'
		}, adData.quizHeader, false, false );
		TextUtils.autosizeTF( self.headerTF.textfield );
		Align.moveX( Align.CENTER, self.headerTF.textfield );



		// -- SUB-HEADER
		self.subHeaderTF = Markup.addTextfield({
			id: 'quiz_subHeaderTF',
			target: self.container,
			css: {
				width: quizWidth,
				height: args.header.height,
				top: args.header.top + Styles.getCss( self.headerTF.textfield, 'height' ) + 8
			},
			margin: 5,
			multiline: false,
			textStyles: 'color: ' + adData.huluColors.primaryGreen + '; font-size: 18px; line-height: 18px; font-family: ' + adData.quaternaryFont + '; text-align: center;'
		}, adData.questions[0].question, false, false );
		TextUtils.autosizeTF( self.subHeaderTF.textfield );
		Align.moveX( Align.CENTER, self.subHeaderTF.textfield );







		// -- CTA
		self.quizCTA = new QuizCtaBTN();
		self.quizCTA.build({
			target: self.container,
			width: 240,
			height: 25,
			fontSize: 18,
			callback: function() {
				// Network.exit( clickTag );
				adData.networkExit( clickTag );
			}
		});

		Align.move( Align.BOTTOM_RIGHT, self.quizCTA.container, -534, 0 );






		var timerWidth = 6;




		// -- Hero gradient
		var gradientLeft = quizWidth + timerWidth - 1;
		self.gradient = new UIImage({
			id: 'quizGradient',
			target: self.container,
			source: 'quizHeroGradient',
			css: {
				left: gradientLeft,
				width: adParams.adWidth - gradientLeft,
				height: adParams.adHeight,
				position: 'absolute'
			}
		});
		TweenLite.set( self.gradient, { x: -self.gradient.width, clip:'rect(0px ' + self.gradient.width + 'px ' + self.gradient.height + 'px ' + self.gradient.width + 'px)' } );





		// -- TIMER
		self.timer = new Timer();
		self.timer.build({
			width: timerWidth,
			left: quizWidth,
			target: self.container
		});






		// -- QUESTION MARKER
		self.markerWidth = args.marker.width;
		self.markerHeight = args.marker.height;
		self.questionMarker = new Markup.addTextfield({
			id: 'quiz_marker',
			target: self.container,
			css: {
				width: self.markerWidth,
				height: self.markerHeight,
				top: args.marker.top,
				left: gradientLeft + args.marker.leftOffset
				// left: args.marker.left
			},
			margin: 0,
			multiline: false,
			textStyles: 'color: ' + adData.whiteColor + '; font-size: ' + args.marker.fontSize + 'px; line-height: ' + args.marker.lineHeight + 'px; font-family: ' + adData.primaryFont + '; text-align: right;'
		}, '1/' + adData.questions.length, false, false );
		TweenLite.set( self.questionMarker.container, { x: -self.markerWidth, clip:'rect(0px ' + self.markerWidth + 'px ' + self.markerHeight + 'px ' + self.markerWidth + 'px)' } );




	}

	self.reset = function()
	{
		adData.score = 0;
		self.questionsQueue = self.questions.slice();
		for (var i = 0; i < self.questionsQueue.length; i++)
			self.questionsQueue[i].reset();
		self.timer.resetAll();
	}

	self.pause = function( forcePause )
	{
		trace('Quiz.pause()');
		trace('		adData.userInteracted:' + adData.userInteracted);
		trace('		forcePause:' + forcePause);
		self.countdownTime = 3;
		TextUtils.addText( self.countdownTF.textfield, self.countdownTime.toString() );
		if ( !adData.userInteracted || forcePause )
		{
			// TweenLite.to( self.container, 0.5, { opacity: 0.25, ease:Quad.easeOut });
			self.question.pause();
			self.timer.pause();
			Gesture.enable( self.startBTN.container );
			if ( forcePause )
				getReady();
			else
				self.startBTN.show();
		}

		adData.autoplay = true;	// -- this makes it so that everything animates after initial start
	}

	function getReady()
	{
		Gesture.disable( self.startBTN.container );
		self.startBTN.hide();
		TweenLite.delayedCall( 0.25, function() {
			self.startBTN.updateText(adData.continueCTA);
		} );
		self.question.resetAnswers();
		self.timer.reset();
		TweenLite.to( self.getReadyTF.container, 0.25, { opacity: 1, ease:Quad.easeInOut });
		TweenLite.to( self.countdown, 0.25, { opacity: 1, ease:Quad.easeInOut });
		countdown();
	}

	function countdown()
	{
		TweenLite.fromTo( self.countdownTF.container, 0.5, { scale: 3, opacity: 0 }, { scale: 1, opacity: 1, ease:Expo.easeIn, onComplete: function() {
			TweenLite.to( self.countdownTF.container, 0.5, { scale: 0.2, opacity: 0, ease:Expo.easeIn, onComplete: function() {
				self.countdownTime--;
				if ( self.countdownTime < 1 )
					replay();
				else
				{
					if ( self.countdownTime == 1)
						TweenLite.set( self.countdownTF.container, { x: 1 } );
					TextUtils.addText( self.countdownTF.textfield, self.countdownTime.toString() );
					countdown();
				}
			} })
		} } );
	}

	function replay()
	{
		TweenLite.to( self.getReadyTF.container, 0.25, { opacity: 0, ease:Quad.easeInOut } );
		TweenLite.to( self.countdown, 0.25, { opacity: 0, ease:Quad.easeInOut } );
		self.question.show();
		self.question.replay();
		self.timer.replay();
	}

	self.show = function()
	{
		var animationTime = 1;
		var quizBeginDelay = 2;
		var fromX = -40;

		Styles.setCss( self.container, 'display', 'inherit' );

		if ( adData.autoplay )
		{
			TweenLite.delayedCall( animationTime, self.timer.show );
			TweenLite.fromTo( self.headerTF.container, animationTime, { opcacity: 0, x: fromX }, { opcacity: 1, x: 0, ease:Quad.easeOut } );
			TweenLite.fromTo( self.subHeaderTF.container, animationTime, { opacity: 0, x: fromX }, { delay: 0.2, opacity: 1, x: 0, ease:Quad.easeOut } );
			TweenLite.fromTo( self.quizCTA.container, animationTime, { opacity: 0, x: fromX }, { delay: 0.4, opacity: 1, x: 0, ease:Quad.easeOut } );
			TweenLite.fromTo( self.gradient, animationTime, { x: -self.gradient.width, clip:'rect(0px ' + self.gradient.width + 'px ' + self.gradient.height + 'px ' + self.gradient.width + 'px)' }, { delay: animationTime, x: 0, clip:'rect(0px ' + self.gradient.width + 'px ' + self.gradient.height + 'px 0px)', ease:Quad.easeInOut } );
			TweenLite.fromTo( self.questionMarker.container, animationTime, { x: -self.markerWidth, clip:'rect(0px ' + self.markerWidth + 'px ' + self.markerHeight + 'px ' + self.markerWidth + 'px)' }, { delay: animationTime, x: 0, clip:'rect(0px ' + Styles.getCss( self.questionMarker.container, 'width' ) + 'px ' + Styles.getCss( self.questionMarker.container, 'height' ) + 'px 0px)', ease:Quad.easeInOut } );


			if ( adData.userInteracted )
			{
				TweenLite.delayedCall( quizBeginDelay, function() {
					self.question = self.questionsQueue.shift();
					TextUtils.addText( self.questionMarker.textfield, self.question.id + '/' + adData.questions.length );
					// -- update sub-header (show vs movie)
					TextUtils.addText( self.subHeaderTF.textfield, self.question.question );

					self.pause(true);
				} );
			}
			else
			{
				TweenLite.delayedCall( quizBeginDelay, nextQuestion );
				TweenLite.delayedCall( (adData.questionTime * 0.4) + quizBeginDelay + 1, self.pause );
			}
		}
		else
		{
			self.timer.show();
			TweenLite.set( self.headerTF.container, { opcacity: 1, x: 0 } );
			TweenLite.set( self.subHeaderTF.container, { opacity: 1, x: 0 } );
			TweenLite.set( self.quizCTA.container, { opacity: 1, x: 0 } );
			TweenLite.set( self.gradient, { x: 0, clip:'rect(0px ' + self.gradient.width + 'px ' + self.gradient.height + 'px 0px)' } );
			TweenLite.set( self.questionMarker.container, { x: 0, clip:'rect(0px ' + Styles.getCss( self.questionMarker.container, 'width' ) + 'px ' + Styles.getCss( self.questionMarker.container, 'height' ) + 'px 0px)' } );

			nextQuestion(true);
			TweenLite.delayedCall( 0.01, self.pause );

		}
	}

	self.hide = function()
	{
		Styles.setCss( self.container, 'display', 'none' );
	}

	function onHide()
	{
		if ( self.question )
				self.question.hide();
		self.callback();
	}

	function onAnswered(isCorrect)
	{
		if ( isCorrect )
			adData.score++;
		self.timer.resolve(isCorrect);
	}


	function nextQuestion(stopAutoplay)
	{
		if ( self.questionsQueue.length > 0 )
		{
			if ( self.question )
				self.question.hide();
			self.question = self.questionsQueue.shift();
			self.question.show();
			if ( !stopAutoplay )
			{
				TweenLite.delayedCall( 1, function() {
					self.timer.timerAnimation(self.question.id);
					self.question.timerAnimation();
				});
			}
			TextUtils.addText( self.questionMarker.textfield, self.question.id + '/' + adData.questions.length );
			// TweenLite.from( self.questionMarker.container, 0.5, { scale: 1.5, ease:Quad.easeInOut });

			// -- update sub-header (show vs movie)
			TextUtils.addText( self.subHeaderTF.textfield, self.question.question );
		}
		else
			TweenLite.delayedCall( 0.2, onHide );
	}

	function nocallback()
	{

	}


	return self;
});