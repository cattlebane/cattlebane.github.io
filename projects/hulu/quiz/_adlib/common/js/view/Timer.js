var Timer = ( function() {

	var self = this;

	self.container;
	self.width;
	self.segments;
	self.segment;


	self.build = function ( args )
	{
		var target = args.target || adData.elements.redAdContainer;
		self.width = args.width || 6;
		var left = args.left || 0;


		// -- CONTAINER
		self.container = new UIComponent({
			id: 'timer',
			target: target,
			css: {
				width: self.width,
				height: adParams.adHeight,
				left: left,
				position: 'absolute',
			}
		});


		// -- BG
		self.bg = new UIComponent({
			id: 'timerBG',
			target: self.container,
			css: {
				width: self.width,
				height: adParams.adHeight,
				position: 'absolute',
				backgroundColor: '#404041'
			}
		});
		TweenLite.set( self.bg, { transformOrigin:'left top', scaleY: 0 } );



		// -- SEGMENTS
		self.segments = [];
		var segmentHeight = adParams.adHeight / adData.questions.length;
		var segment;
		for (var i = 0; i < adData.questions.length; i++)
		{
			segment = new TimerSegment();
			segment.build({
				id: i + 1,
				target: self.container,
				hasBullet: (i < (adData.questions.length - 1)),
				height: segmentHeight,
				top: segmentHeight * i
			});
			self.segments.push(segment);
		}

		self.segment = self.segments[0];
	}

	self.resolve = function(isCorrect)
	{
		// self.pause();
		self.segment.resolve(isCorrect);
	}

	self.pause = function()
	{
		self.segment.pause();
	}

	self.reset = function()
	{
		self.segment.reset();
	}

	self.replay = function()
	{
		// self.segment = self.segments[0];
		self.timerAnimation(self.segment.id);
	}

	/*self.resume = function()
	{
		self.segment.resume();
	}*/

	self.resetAll = function()
	{
		self.segment = self.segments[0];
		TweenLite.set( self.bg, { scaleY: 0 } );
		for (var i = 0; i < self.segments.length; i++)
			self.segments[i].reset(true);
	}

	self.timerAnimation = function(segmentNum)
	{
		self.segment = self.segments[segmentNum - 1];
		self.segment.timerAnimation();
	}

	self.show = function()
	{
		if ( adData.autoplay )
			TweenLite.to( self.bg, 0.5, { scaleY: 1, ease:Quad.easeOut } );
		else
			TweenLite.set( self.bg, { scaleY: 1 } );
		for (var i = 0; i < self.segments.length; i++)
			self.segments[i].show();
	}

	self.hide = function()
	{
	}

	function nextQuestion()
	{
	}

	function nocallback()
	{

	}


	return self;
});