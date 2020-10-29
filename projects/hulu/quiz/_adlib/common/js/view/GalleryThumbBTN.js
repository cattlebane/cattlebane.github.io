var GalleryThumbBTN = ( function() {

	var self = this;
	self.container;
	self.image;

	self.id;
	self.url;
	self.callback;
	self.height;
	self.width;

	self.build = function ( args )
	{
		var id = self.id = args.id || 'galleryThumbBTN';
		var target = args.target || adData.elements.redAdContainer;
		var top = args.top || 0;
		var left = args.left || 0;
		var source = args.source;
		thumbData = args.thumbData;
		self.width = args.width || thumbData.width;
		self.height = args.height || thumbData.height;
		self.url = args.url || 'http://www.hulu.com/start';
		self.callback = args.callback || nocallback;

		self.container = new UIComponent({
			id: id,
			target: target,
			css: {
				width: self.width,
				height: self.height,
				top: top,
				left: left,
				position: 'absolute',
				// opacity: 0,
				// backgroundColor: adData.huluColors.primaryGreen
			}
		});
		Gesture.disable( self.container );

		var backImage = new UIImage({
			id: id + '_backImage',
			target: self.container,
			source: source,
			css: {
			}
		});

		self.bg = new UIComponent({
			id: id + '_border',
			target: self.container,
			css: {
				width: self.width,
				height: self.height,
				position: 'absolute',
				opacity: 0.65,
				backgroundColor: adData.huluColors.primaryGreen
			}
		});

		self.image = new UIImage({
			id: id + '_image',
			target: self.container,
			source: source,
			css: {
			}
		});



		TweenLite.set( self.image, { clip:'rect(0px ' + self.width + 'px ' + self.height + 'px 0px)' } );

		// self.show();
	}


	self.show = function (args)
	{
		var border = 20;
		registerEvents();
		TweenLite.fromTo( self.container, args.animationTime, { opacity: 0, x: args.startX }, { delay: args.delay, opacity: 1, x: 0, ease: Quad.easeOut } );
		TweenLite.fromTo( self.image, 0.5, { clip:'rect(' + border + 'px ' + (self.width - border) + 'px ' + ( self.height - border ) + 'px ' + border + 'px)' }, { delay: args.delay, clip:'rect(0px ' + self.width + 'px ' + self.height + 'px 0px)', ease:Quad.easeInOut });
	}

	self.hide = function()
	{
	}


	self.onHitRollOver = function(event)
	{
		// var border = 12;
		var border = 6;
		TweenLite.to( self.image, 0.5, { clip:'rect(' + border + 'px ' + (self.width - border) + 'px ' + ( self.height - border ) + 'px ' + border + 'px)', ease:Expo.easeOut });
	}

	self.onHitRollOut = function(event)
	{
		TweenLite.to( self.image, 0.5, { clip:'rect(0px ' + self.width + 'px ' + self.height + 'px 0px)', ease:Quad.easeInOut });
	}

	function onHitClick(event)
	{
		trace('GalleryThumbBTN.onHitClick()');
		var id = parseInt(self.id.replace('gallery_thumb_', ''));
		// var id = 2;	// -- all of these clickTags are dynamic using URLs specified in the FT data
		trace('		id:' + id);
		var clickTagURL = adData.endframeURLs[ id - 1 ];
		trace('		clickTagURL:' + clickTagURL);
		adData.networkExit( [ 2, clickTagURL ] );
		self.callback();
	}

	self.unregisterEvents = function()
	{
		Gesture.removeEventListener( self.container, GestureEvent.OVER, self.onHitRollOver );
		Gesture.removeEventListener( self.container, GestureEvent.OUT, self.onHitRollOut );
		Gesture.removeEventListener( self.container, GestureEvent.CLICK, onHitClick );
	}

	function registerEvents()
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