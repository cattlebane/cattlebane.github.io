var VideoControlsBTN = ( function() {

	var self = this;
	self.container;
	// self.iconCanvas;
	// self.iconImg;
	// self.iconColor;
	self.icon;
	self.iconOVER;
	self.copyTF;

	self.callback;

	self.build = function ( args )
	{
		var id = args.id || 'playPause';
		var imageID = args.imageID || 'playPause';
		var target = args.target || adData.elements.redAdContainer;
		var width = args.width || 20;
		var height = args.height || 20;
		var top = args.top || 0;
		var left = args.left || 0;
		var copy = args.copy;
		var fontSize = args.fontSize || 13;
		var lineHeight = args.lineHeight || fontSize;
		self.callback = args.callback || nocallback;

		self.container = new UIComponent({
			id: 'videoControlsBTN_' + id + imageID,
			target: target,
			css: {
				width: width,
				height: height,
				top: top,
				left: left,
				position: 'absolute',
				// opacity: 0
			}
		});


		if (copy)
		{
			self.copyTF = Markup.addTextfield({
				id: 'videoControlsBTN_copy_' + id + imageID,
				target: self.container,
				css: {
					width: width,
					height: height
				},
				margin: 0,
				multiline: false,
				textStyles: 'color: ' + adData.huluColors.primaryGreen + '; font-size: ' + fontSize + 'px; line-height: ' + lineHeight + 'px; font-family: ' + adData.tertiaryFont + '; text-align: center;'
			}, copy, false, false );
			TextUtils.fitContainerToText( self.copyTF, true, true );

			Styles.setCss( self.container, 'width', Styles.getCss( self.copyTF.container, 'width' ) );
			Styles.setCss( self.container, 'height', Styles.getCss( self.copyTF.container, 'height' ) );
		}
		else
		{
			self.icon = new UIImage({
				id: 'videoControlsBTN_icon_' + id + imageID,
				target: self.container,
				source: imageID,
				css: {
					width: width,
					height: height
				}
			});

			self.iconOVER = new UIImage({
				id: 'videoControlsBTN_iconOVER_' + id + imageID,
				target: self.container,
				source: imageID + '_OVER',
				css: {
					width: width,
					height: height,
					opacity: 0
				}
			});
		}


		Gesture.disableChildren( self.container );

		// self.show();
	}

	self.updateIcon = function( id )
	{
		trace('VideoControlsBTN.updateIcon()');
		trace('		id:' + id);
		Styles.setCss( self.icon , 'background-image', ImageManager.get( id ).src );
		Styles.setCss( self.iconOVER , 'background-image', ImageManager.get( id + '_OVER' ).src );
	}


	self.show = function ()
	{
		registerEvents();
	}

	self.hide = function()
	{
	}


	self.onHitRollOver = function(event)
	{
		trace('VideoControlsBTN.onHitRollOver()');
		if ( self.copyTF )
			TweenLite.to( self.copyTF.textfield, 0.15, { color: adData.whiteColor, ease:Quad.easeOut });
		else
			TweenLite.to( self.iconOVER, 0.15, { opacity: 1, ease:Quad.easeOut } );
	}

	self.onHitRollOut = function(event)
	{
		trace('VideoControlsBTN.onHitRollOut()');
		// var animationTime = event ? 0.5 : 0.01;
		var animationTime = 0.5;
		if ( self.copyTF )
			TweenLite.to( self.copyTF.textfield, animationTime, { color: adData.huluColors.primaryGreen, ease:Quad.easeInOut });
		else
			TweenLite.to( self.iconOVER, animationTime, { opacity: 0, ease:Quad.easeInOut } );
	}

	function onHitClick(event)
	{
		trace('VideoControlsBTN.onHitClick()');
		trace('		self.callback:' + self.callback);
		self.callback();
	}

	self.unregisterEvents = function()
	{
		Gesture.removeEventListener( self.container, GestureEvent.OVER, self.onHitRollOver );
		Gesture.removeEventListener( self.container, GestureEvent.OUT, self.onHitRollOut );
		Gesture.removeEventListener( self.container, GestureEvent.CLICK, onHitClick );
		self.onHitRollOut();
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