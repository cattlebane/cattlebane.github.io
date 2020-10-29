var QuizResultMarker = ( function() {

	var self = this;
	self.container;
	self.answerCORRECT;
	self.answerWRONG;

	self.callback;

	self.build = function ( args )
	{
		var id = args.id || 1;
		var target = args.target || adData.elements.redAdContainer;
		var width = args.width || 54;
		var height = args.height || 54;
		var fontSize = args.fontSize || 34;
		var lineHeight = args.lineHeight || 30;
		var color = args.isCorrect ? adData.huluColors.primaryColo : adData.wrongColor;
		var copy = args.isCorrect ? '√' : 'X';
		self.callback = args.callback || nocallback;

		self.container = new UIComponent({
			id: 'quizResultMarker_' + id,
			target: target,
			// source: 'circle',
			css: {
				width: width,
				height: height,
				position: 'absolute'
			}
		});



		var fill = CanvasDrawer.create({
			id: 'quizFillCanvas_' + id,
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

		var fillImg = fill.addImage({
			source: 'circle',
			id: 'quizFillImg' + id,
			params: {
				x: 0,
				y: 0,
				width: width,
				height: height
			}
		});

		var fillColor = fill.addShape({
		    type: CanvasDrawType.RECT,
		    id: 'quizFillColor_' + id,
		    params: {
		        width: width,
		        height: height
		  //       	x: width / 2,
		  //       	y: width / 2,
				// width: width,
				// startAngle: 0,
				// endAngle: 360
		    },
		    blendMode: CanvasBlendMode.SOURCE_IN,
		    fill: color
		});

		fill.update();



		var answerCORRECTCheck = Markup.addTextfield({
			id: 'quizAnserMarkerSimbol_' + id,
			target: self.container,
			css: {
				width: width,
				height: height,
			},
			margin: 0,
			multiline: false,
			textStyles: 'color: ' + adData.whiteColor + '; font-size: 34px; line-height: 30px; font-family: ' + adData.primaryFont + '; text-align: center;'
		}, copy, false, false );
		Align.move( Align.CENTER, answerCORRECTCheck.textfield, 0, 2 );

		// self.show();
		Styles.hide( self.container );
	}


	self.show = function()
	{
		Styles.show( self.container );
		TweenLite.fromTo( self.container, 0.75, { opacity: 1 }, { opacity: 0, ease:Quad.easeIn, onComplete: function() {
			self.callback();
			Styles.hide( self.container );
		} } );
	}

	function nocallback()
	{

	}


	return self;
});