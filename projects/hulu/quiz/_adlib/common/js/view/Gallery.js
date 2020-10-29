var Gallery = ( function() {

	var self = this;
	self.container;
	self.rightBTN;
	self.leftBTN;
	self.slides;

	self.height;
	self.width;
	self.isAnimating = false;
	self.currentSlideIndex = 0;
	self.thumbsContainerWidth = 0;

	self.build = function ( args )
	{
		var target = args.target || adData.elements.redAdContainer;
		var top = args.top || 102;
		var left = args.left || 0;
		var width = self.width = args.width || adParams.adWidth;
		var height = self.height = args.height || adParams.adHeight;

		self.container = new UIComponent({
			id: 'endframe_gallery',
			target: target,
			css: {
				width: width,
				height: height,
				top: top,
				left: left,
				position: 'absolute',
			}
		});

		Gesture.disable( self.container );


		var thumbData = ImageManager.get( adData.endframeImages[0] );

		var imagesPerPanel = 5;
		var spacer = 1;
		self.thumbsContainerWidth = imagesPerPanel * ( thumbData.width + spacer );// - spacer;
		self.thumbsContainer = new UIComponent({
			id: 'thumbs_container',
			target: self.container,
			css: {
				width: self.thumbsContainerWidth,
				height: height,
				position: 'absolute',
				overflow: 'hidden'
			}
		});

		var thumb;
		self.thumbs = [];
		var thumbsWidth = 0;
		var i;
		// create slides
		self.slides = [];
		var slide;
		var slideOpacity = 1;
		for (i = 0; i < adData.endframeImages.length / imagesPerPanel; i++)
		{
			slide = new UIComponent({
				id: 'gallery_slide_' + (i + 1),
				target: self.thumbsContainer,
				css: {
					width: self.thumbsContainerWidth,
					height: thumbData.height,
					left: i * self.thumbsContainerWidth,
					position: 'absolute',
					// opacity: slideOpacity
				}
			});
			self.slides.push( slide );
			slideOpacity -= 0.25;
		}
		var slideNum = -1;
		// -- create thumbs
		for (var i = 0; i < adData.endframeImages.length; i++)
		{
			if ( i % 5 == 0 )
			{
				slideNum++;
				thumbsWidth = 0;
			}
			thumbData = ImageManager.get( adData.endframeImages[i] );
			trace('		thumbData.width:' + thumbData.width);
			thumb = new GalleryThumbBTN();
			thumb.build({
				id: 'gallery_thumb_' + (i+1),
				thumbData: thumbData,
				// target: self.thumbsContainer,
				target: self.slides[slideNum],
				source: adData.endframeImages[i],
				// url: adData.endframeURLs[i],
				left: thumbsWidth,
				/*callback: function() {
					trace('Endframe.build() thumb.CLICK');
					adData.networkExit( clickTag );
				}*/
			})
			thumbsWidth += thumbData.width + spacer;
			self.thumbs.push(thumb);
		}


		if ( adData.endframeImages.length > 5 )
		{

			self.leftBTN = new GalleryNavBTN();
			self.leftBTN.build({
				id: 'left',
				target: self.container,
				left: 5,
				height: thumbData.height,
				callback: onPrev
			});

			self.rightBTN = new GalleryNavBTN();
			self.rightBTN.build({
				id: 'right',
				target: self.container,
				// left: 5,
				height: thumbData.height,
				callback: onNext
			});

			Align.moveX( Align.RIGHT, self.rightBTN.container, -5 );
		}

		// Styles.setCss( self.thumbsContainer, 'width', thumbsWidth );

		Align.moveX( Align.CENTER, self.thumbsContainer );

		Styles.setCss( self.container, 'height', thumbData.height );
		Styles.setCss( self.thumbsContainer, 'height', thumbData.height );
		

		// Align.moveY( Align.CENTER, rightBTN.container );
		// Align.moveY( Align.CENTER, leftBTN.container );


		

	}


	self.show = function (args)
	{
		TweenLite.set( self.container, { clip:'rect(0px ' + self.width + 'px ' + self.height + 'px 0px)' } );
		if ( self.rightBTN )
			self.rightBTN.show();
		if ( self.leftBTN )
			self.leftBTN.show();
		var delay = args.delay;
		for (var i = self.thumbs.length - 1; i >= 0; i--)
		{
			self.thumbs[i].show(args);
			if (i % 5 == 0)
				args.delay = delay;
			else
				args.delay += 0.1;
		}
	}

	self.hide = function()
	{
		TweenLite.to( self.container, 0.5, { clip:'rect(0px ' + self.width + 'px ' + self.height + 'px ' + self.width + 'px)', ease:Quad.easeInOut } );
	}

	function onNext()
	{
		trace('Gallery.onNext()');
		if ( !self.isAnimating )
		{
			var animationTime = 0.5;
			var easeFunc = Quad.easeOut;
			self.isAnimating = true;

			var nextSlide = self.currentSlideIndex + 1 > self.slides.length - 1 ? self.slides[0] : self.slides[self.currentSlideIndex + 1];
			TweenLite.to( self.slides[self.currentSlideIndex], animationTime, { left: -self.thumbsContainerWidth, ease: easeFunc, onComplete: function() {
				self.isAnimating = false;
			} } );

			TweenLite.fromTo( nextSlide, animationTime, { left: self.thumbsContainerWidth }, { left: 0, ease: easeFunc });

			self.currentSlideIndex++;
			if ( self.currentSlideIndex >= self.slides.length )
				self.currentSlideIndex = 0;
		}
	}

	function onPrev()
	{
		trace('Gallery.onPrev();');
		if ( !self.isAnimating )
		{
			var animationTime = 0.5;
			var easeFunc = Quad.easeOut;
			self.isAnimating = true;

			var nextSlide = self.currentSlideIndex - 1 < 0 ? self.slides[self.slides.length - 1] : self.slides[self.currentSlideIndex - 1];
			TweenLite.to( self.slides[self.currentSlideIndex], animationTime, { left: self.thumbsContainerWidth, ease: easeFunc, onComplete: function() {
				self.isAnimating = false;
			} } );

			TweenLite.fromTo( nextSlide, animationTime, { left: -self.thumbsContainerWidth }, { left: 0, ease: easeFunc });

			self.currentSlideIndex--;
			if ( self.currentSlideIndex < 0 )
				self.currentSlideIndex = self.slides.length - 1;
		}
	}



	return self;
});