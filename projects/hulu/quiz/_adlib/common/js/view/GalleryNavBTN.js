var GalleryNavBTN = ( function() {

	var self = this;
	self.container;
	self.arrow;

	self.callback;
	self.isOver = false;
	self.maxOverTime = 1;

	self.build = function ( args )
	{
		var id = args.id || 'galleryNavBTN';
		var target = args.target || adData.elements.redAdContainer;
		var top = args.top || 0;
		var left = args.left || 0;
		var width = args.width || 16;
		var height = args.height || 32;
		self.callback = args.callback || nocallback;

		self.container = new UIComponent({
			id: 'galleryNavBTN_' + id,
			target: target,
			css: {
				width: width,
				height: height,
				top: top,
				left: left,
				position: 'absolute',
				rotation: id.toLowerCase().indexOf('right') ? 180 : 0,
				opacity: 0,
			}
		});

		self.arrow = new UIImage({
			id: 'galleryNavBTN_arrow_' + id,
			target: self.container,
			source: 'galleryArrow',
			css: {
				// width: width,
				// height: height
			}
		});

		Align.moveY( Align.CENTER, self.arrow );


		Gesture.disableChildren( self.container );

		self.show();
	}


	self.show = function ()
	{
		registerEvents();
		TweenLite.fromTo( self.container, 0.5, { x: -40, opacity: 0 }, { delay: 0.5, x: 0, opacity: 1, ease:Quad.easeOut } );
	}

	self.hide = function()
	{
	}


	function onHitRollOver(event)
	{
		if (!self.isOver)
		{
			self.isOver = true;
			TweenLite.killDelayedCallsTo( onHitRollOut );
			TweenLite.delayedCall( self.maxOverTime, onHitRollOut );
		}
		var animationTime = 0.25;
		var easeFunc = Quad.easeInOut;
		TweenLite.to( self.arrow, animationTime, { x: 4, color: adData.whiteColor, ease:easeFunc, onComplete: function() {
			TweenLite.to( self.arrow, animationTime, { x: 0, color: adData.huluColors.primaryGreen, ease:easeFunc, onComplete: function() {
				if (self.isOver)
					onHitRollOver();
			} })
		} } );
	}

	function onHitRollOut(event)
	{
		TweenLite.killDelayedCallsTo( onHitRollOut );
		self.isOver = false;
	}

	function onHitClick(event)
	{
		self.callback();
	}

	self.unregisterEvents = function()
	{
		Gesture.removeEventListener( self.container, GestureEvent.OVER, onHitRollOver );
		Gesture.removeEventListener( self.container, GestureEvent.OUT, onHitRollOut );
		Gesture.removeEventListener( self.container, GestureEvent.CLICK, onHitClick );
	}

	function registerEvents()
	{
		Gesture.addEventListener( self.container, GestureEvent.OVER, onHitRollOver );
		Gesture.addEventListener( self.container, GestureEvent.OUT, onHitRollOut );
		Gesture.addEventListener( self.container, GestureEvent.CLICK, onHitClick );
	}

	function nocallback()
	{

	}


	return self;
});