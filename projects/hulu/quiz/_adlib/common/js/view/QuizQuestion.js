var QuizQuestion = ( function() {

	var self = this;
	self.container;
	self.id;
	self.imageContainer;
	self.image;
	self.btns;
	self.imageWidth;
	self.answers;
	self.correctAnswerBTN;
	self.answerCORRECT;
	self.answerWRONG;

	self.callback;
	self.onAnswered;
	self.startScale = 3;
	self.imageAnimation;
	self.isCorrect = false;
	self.question = '';
	self.firstPlay = true;
	self.showing = false;


	self.build = function ( args )
	{
		self.id = args.id || 1;
		var target = args.target || adData.elements.redAdContainer;
		self.callback = args.callback || nocallback;
		self.onAnswered = args.onAnswered || nocallback;
		self.imageWidth = args.imageWidth || 520;
		var answersWidth = adParams.adWidth - self.imageWidth;
		

		self.container = new UIComponent({
			id: 'question_' + self.id,
			target: target,
			css: {
				width: adParams.adWidth,
				height: adParams.adHeight,
				position: 'absolute'
			}
		});
		Gesture.disable( self.container );





		// -- ANSWERS
		self.answersContainer = new UIComponent({
			id: 'answersContainer_' + self.id,
			target: self.container,
			css: {
				width: answersWidth - 6,
				height: 137,
				position: 'absolute'
			}
		})

		var answersInnerContainer = new UIComponent({
			id: 'answersInnerContainer_' + self.id,
			target: self.answersContainer,
			css: {
				width: 407,
				height: 97,
				top: 96,
				position: 'absolute'
			}
		})

		var answerKey = [ 'a', 'b', 'c', 'd' ];
		self.answers = [];
		var answer;
		var spacer = 12;
		var top = 0;
		var left = 0;
		var questionData = adData.questions[self.id - 1];
		self.question = questionData.question;
		var isCorrect;
		for (var i = 0; i < 4; i++)
		{
			if (i > 1)
			{
				top = answer.height + spacer;
			}
			left = (i + 1) % 2 ? 0 : answer.width + spacer;
			isCorrect = (questionData.answer.toLowerCase() == answerKey[i]);
			answer = new ActionBTN();
			answer.build({
				id: 'answer_' + self.id + '_' + (i + 1),
				target: answersInnerContainer,
				copy: questionData.answers[i],
				top: top,
				left: left,
				isCorrect: isCorrect,
				callback: isCorrect ? onCorrectAnswer : onWrongAnswer
			});
			if ( isCorrect )
				self.correctAnswerBTN = answer;
			self.answers.push( answer );
		}

		var lastAnswer = self.answers[self.answers.length - 1];
		Styles.setCss( answersInnerContainer, 'width', Styles.getCss( lastAnswer.container, 'left' ) + lastAnswer.width );
		Styles.setCss( answersInnerContainer, 'height', Styles.getCss( lastAnswer.container, 'top' ) + lastAnswer.height );
		Align.moveX( Align.CENTER, answersInnerContainer );

		self.answersCover = new UIComponent({
			id: 'answersCover_' + self.id,
			target: answersInnerContainer,
			css: {
				width: answersWidth - 6,
				height: 137,
				position: 'absolute',
				backgroundColor: adData.greyColor,
				opacity: 0
			}
		})






		// -- HERO IMAGE
		self.imageContainer = new UIComponent({
			id: 'questionImageContainer_' + self.id,
			target: self.container,
			css: {
				width: self.imageWidth,
				height: adParams.adHeight,
				left: answersWidth,
				position: 'absolute',
				overflow: 'hidden',
				opacity: 0
			}
		});

		self.image = new UIImage({
			id: 'questionImage_' + self.id,
			target: self.imageContainer,
			source: adData.questions[self.id - 1].image,
			css: {
				// opacity: 0
			}
		});
		TweenLite.set( self.image, { scale: self.startScale } );
		// TweenLite.set( self.imageContainer, { clip:'rect(0px 0px ' + adParams.adHeight + 'px 0px)' } );

		self.video = new QuizQuestionVideo();
		self.video.build({
			id: 'video_' + self.id,
			target: self.imageContainer,
			videoID: adData.videoIDs[self.id - 1],
			callback: self.callback
		});




		self.answerCORRECT = new QuizResultMarker();
		self.answerCORRECT.build({
			target: self.imageContainer,
			id: self.id + '_CORRECT',
			isCorrect: true,
			callback: playVideo
		});
		Align.move( Align.CENTER, self.answerCORRECT.container );

		self.answerWRONG = new QuizResultMarker();
		self.answerWRONG.build({
			target: self.imageContainer,
			id: self.id + '_WRONG',
			isCorrect: false,
			callback: playVideo
		});
		Align.move( Align.CENTER, self.answerWRONG.container );



		Styles.setCss( self.container, 'display', 'none' );
	}

	self.reset = function()
	{
		TweenLite.set( self.container, { opacity: 0 } );
		TweenLite.set( self.image, { scale: self.startScale } );
		for (var i = 0; i < self.answers.length; i++)
			self.answers[i].reset();
		enableBTNs();
	}

	self.resolve = function()
	{
		stop();
		TweenLite.to( self.image, adData.questionQuickResolveTime, { scale: 1, ease:Quad.easeOut, onComplete: showAnswer } );
	}

	self.timerAnimation = function()
	{
		self.imageAnimation = TweenLite.fromTo( self.image, adData.questionTime, { scale: self.startScale }, { scale: 1, ease:Circ.easeOut, onComplete: onWrongAnswer } );
	}

	self.show = function()
	{
		trace('QuizQuestion.show() self.id:' + self.id);
		TweenLite.set( self.container, { opacity: 1, display: 'inherit' } );
		for (var i = 0; i < self.answers.length; i++)
			self.answers[i].show( 0.5 + (0.2 * i) );

		// TweenLite.to( self.image, 0.25, { opacity: 1, ease:Quad.easeInOut } );
		// TweenLite.to( self.imageContainer, 0.5, { clip:'rect(0px ' + self.imageWidth + 'px ' + adParams.adHeight + 'px 0px)', ease:Quad.easeInOut } );
		if ( self.firstPlay == !adData.autoplay )
		{
			self.firstPlay = false;
			// adData.autoplay = false;
			TweenLite.set( self.imageContainer, { opacity: 1 } );
		}
		else if (self.showing)
			TweenLite.to( self.imageContainer, 0.5, { opacity: 1, ease:Quad.easeInOut } );
		else
			TweenLite.fromTo( self.imageContainer, 0.5, { opacity: 0 }, { opacity: 1, ease:Quad.easeInOut } );
		// self.timerAnimation();
		self.showing = true;
	}

	self.resetAnswers = function()
	{
		for (var i = 0; i < self.answers.length; i++)
			self.answers[i].hide();
		TweenLite.killTweensOf( self.image );
		TweenLite.to( self.image, 1.5, { scale: self.startScale, ease:Quad.easeOut });
	}

	self.hide = function()
	{
		for (var i = 0; i < self.answers.length; i++)
			self.answers[i].hide();
		TweenLite.to( self.container, 1, { opacity: 0, ease:Quad.easeInOut, onComplete: function() {
			self.showing = false;
			Styles.setCss( self.container, 'display', 'none' );
		} } );
	}

	function stop()
	{
		TweenLite.killTweensOf( self.image );
	}

	self.pause = function()
	{
		if ( adData.autoplay )
			TweenLite.to( self.answersCover, 0.5, { opacity: 0.85, ease:Quad.easeOut });
		else
			TweenLite.set( self.answersCover, { opacity: 0.85 });
		disableBTNs();
		if (self.imageAnimation)
			self.imageAnimation.pause();
	}

	self.replay = function()
	{
		TweenLite.to( self.answersCover, 0.5, { opacity: 0, ease:Quad.easeOut });
		self.timerAnimation();
	}

	function enableBTNs()
	{
		for (var i = 0; i < self.answers.length; i++)
			self.answers[i].registerEvents();
	}

	function disableBTNs()
	{
		for (var i = 0; i < self.answers.length; i++)
			self.answers[i].unregisterEvents();
	}

	function setAnsweredButtonStates()
	{
		var answerBTN;
		for (var i = 0; i < self.answers.length; i++)
		{
			answerBTN = self.answers[i];
			answerBTN.unregisterEvents();
			if ( !answerBTN.isCorrect && !answerBTN.isWrong )
				answerBTN.onResetState();
		}
	}

	function onCorrectAnswer()
	{
		self.isCorrect = true;
		disableBTNs();
		setAnsweredButtonStates();
		self.onAnswered(true);

		self.resolve();
	}

	function onWrongAnswer()
	{
		self.isCorrect = false;
		disableBTNs();
		setAnsweredButtonStates();
		self.onAnswered(false);
		TweenLite.delayedCall( 0.5, self.correctAnswerBTN.onSetCorrect );
		self.resolve();
	}

	function showAnswer()
	{
		if ( self.isCorrect )
			self.answerCORRECT.show();
		else
			self.answerWRONG.show();

		// TweenLite.delayedCall( 1, playVideo );
	}

	function playVideo()
	{
		// video playse
		// on complete
		// TweenLite.delayedCall( 1, self.callback );	// temporary until we have a video player
		self.video.show();
	}

	function nocallback()
	{

	}


	return self;
});