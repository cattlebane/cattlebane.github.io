/* ################################################################################################
 * #
 * #		RED Interactive - Digital Advertising
 * #		Under_Armour | Unlike_Any | Product Velvet | To Deliver | 1.7
 * #
 * ################################################################################################ */
trace( "----------------------------------------------------------------------------------------------------------------------------" );
trace( " ad.js[ Under_Armour | Unlike_Any | Product Velvet | To Deliver | 300x600_jessie | 1.7 ]" );
trace( "  " );
trace( "  VERSION - template.txt[ BUILD SOURCE: Velvet - Base / OPTIONS:  / AdApp: 1.5.3 / AdHtml: v2.8.1 / Created: 07/31/17 01:52pm ]" );
trace( "----------------------------------------------------------------------------------------------------------------------------" );









/* -- COMMON: js/control/PrepareCommon.js -----------------------------------------------------------------------------------------
 *
 *
 *
 */
var PrepareCommon = new function() {
	var id = 'PrepareCommon';
	var self = this;
	
	var async;
	self.completeCallback;
	self.init = function( completeCallback ) {
		trace( id + '.init()' );

		self.completeCallback = completeCallback;
		async = new Async();
		async.onComplete( self.initComplete );
		async.wait();
		prepareDateManagement();
		prepareVelvet();

		async.done();
	}
	function prepareDateManagement() {
		trace( 'PrepareCommon.prepareDateManagement()' );
		DateManager.init( adParams.dateSettings );
	}
	function prepareVelvet() {
		trace( 'PrepareCommon.prepareVelvet()' );
		async.wait();
		Velvet.init( 
			adParams.velvet, 
			loadJsonComplete 
		);
	}
	function loadJsonComplete() {
		async.done();
	}
	self.initComplete = function() {
		trace( id + '.initComplete()' );
		async = new Async();
		async.onComplete( self.completeCallback );
		async.wait();

		self.prepareAdData();
		self.loadImageQueue();

		async.done();
	}
	self.prepareAdData = function() {
		trace( id + '.prepareAdData()' );
		global.adData = new AdData();
	}
	self.loadImageQueue = function() {
		trace( id + '.loadImageQueue()' );
		async.wait();
		ImageManager.load( 
			self.loadImageQueueComplete,
			self.loadImageQueueFail
		);
	}
	self.loadImageQueueFail = function() {
		global.failAd();
	}
	self.loadImageQueueComplete = function() {
		trace( id + '.loadImageQueueComplete()');
		async.done();	
	}

}




















/* -- COMMON: js/data/AdData.js -----------------------------------------------------------------------------------------
 *
 *
 *
 */
function AdData(){
	var self = this;
	
	self.elements = {};
	self.elements.redAdContainer = Markup.get( 'redAdContainer' );
	
	self.edgeData = new EdgeData();

	var dynamicImagesPath = adParams.adPath + 'dynamic_images/';
	self.useProductType = false;

	self.color = {
		white: '#ffffff',
		black: '#000000',
		lightGrey: '#f0f0f0', 	// ** athlete bg
		daryGrey: '#949494', 	// ** border
	}


	self.font = {
		primary: {
			regular: 'Stanley-Regular',
			bold: 'Stanley-Poster',
		},
		secondary: {
			regular: 'Stanley-Regular',
			bold: 'Stanley-Poster',
		}
	}



	self.copy = {
		cta: Velvet.get( 'cta.copy' ),
	}


	self.animation = {
		sliding: {
			duration: 0.75,
			ease: Power2.easeOut
		}
	}



	self.useWhiteLockup = Velvet.get( 'useWhiteLockup' );
	var lockupColor = self.useWhiteLockup ? 'white' : 'black';
	var lockupData = Velvet.get( 'lockup' );
	self.lockup = {
		unlikeAny: ImageManager.addToLoad( Velvet.get( Velvet.get( lockupData, 'unlikeAny_' + lockupColor ), 'image_' + adParams.adSize ).url ),
		logo: ImageManager.addToLoad( Velvet.get( Velvet.get( lockupData, 'logo_' + lockupColor ), 'image_' + adParams.adSize ).url ),
		unlikeAny_dark: lockupColor == 'white' ? ImageManager.addToLoad( Velvet.get( Velvet.get( lockupData, 'unlikeAny_black' ), 'image_' + adParams.adSize ).url ) : '',
		logo_dark: lockupColor == 'white' ? ImageManager.addToLoad( Velvet.get( Velvet.get( lockupData, 'logo_black' ), 'image_' + adParams.adSize ).url ) : ''
	}
	self.athleteQuotes = [];
	var maxQuotes = 3;
	var quotesData = Velvet.get( Velvet.get( 'quotes' ), 'quotes_' + adParams.adSize );
	self.animateFromLeft = Velvet.get( quotesData, 'animateFromLeft' );
	var quoteData;
	for ( var i = 0; i < maxQuotes; i++ ) {
		quoteData = Velvet.get( quotesData, 'image_' + ( i + 1 ) );
		if ( quoteData )
			self.athleteQuotes.push( ImageManager.addToLoad( quoteData.url ) );
	}
	self.products = [];
	var productsData = Velvet.get( 'products' );
	var productData;
	var productInfoData;
	var product
	var thumb;
	for ( var i = 0; i < productsData.length; i++ ) {
		productData = productsData[ i ];
		productInfoData = Velvet.get( productData, 'productInfo' );
		thumb = Velvet.get( productData, 'thumb_' + adParams.adSize );
		thumb = thumb ? thumb.url : Velvet.get( productData, 'thumb_300x250' ).url;
		product = {
			name: Velvet.get( productInfoData, 'name' ),
			type: Velvet.get( productInfoData, 'type' ),
			price: Velvet.get( productInfoData, 'price' ),
			url: global['clickTag' + ( i + 1 )] || clickTag || Velvet.get( productInfoData, 'url' ),	// ** use product specific clicktag, then genenral, then velvet product clicktag
			thumb: ImageManager.addToLoad( thumb ),
			hero: ImageManager.addToLoad( Velvet.get( productData, 'image_' + adParams.adSize ).url )	
		}
		self.products.push( product );
	}
	var athleteInfo = Velvet.get( 'athleteInfo' );
	self.athlete = {
		name: Velvet.get( athleteInfo, 'name' ).toUpperCase(),
		description: Velvet.get( athleteInfo, 'description' ),
		hero: ImageManager.addToLoad( Velvet.get( 'athleteImages.image_' + adParams.adSize ).url ),
	}



	self.resetClickTag = function() {
		self.clickTag = clickTag;
	};
	self.resetClickTag();

}
























/* -- COMMON: js/data/EdgeData.js -----------------------------------------------------------------------------------------
 *
 *
 *
 */
var EdgeData = ( function( arg ) {

	var self = this;
	arg = arg || {};
	self.getMaskCssFor = function( instanceId ) {
		return '-webkit-clip-path: ' + self.convertMaskShapeToMaskCss( self.getMaskShapeBy( instanceId ).update() );
	}
	self.getMaskShapeBy = function( instanceId ) {
		for( var key in maskShapes ) {
			if( key == instanceId )
				return maskShapes[key];
		}
	}
	self.convertMaskShapeToMaskCss = function( maskPoints ) {
		var maskCss = 'polygon( '
		for( var i=0; i < maskPoints.length; i++ ) {
			maskCss += String( maskPoints[i][0] ) + 'px ' + String( maskPoints[i][1] ) + 'px, '
		}
		return maskCss.slice( 0, maskCss.length-2 ) + ' )'		
	}
	
});



















/* -- COMMON IMPLEMENTED: js/view/Athlete.js -----------------------------------------------------------------------------------------
 *
 *
 *
 */
var Athlete = ( function( args ) {
	var textColor = adData.useWhiteLockup ? adData.color.white : adData.color.black;

	var self = UIComponent( args );
	self.animateQuotesFirst = args.animateQuotesFirst;

	self.image = AnimateImage({
		target: self,
		id: self.id + '_image',
		source: adData.athlete.hero,
		retina: args.retina
	});

	Clamp.set( self, Clamp.XY );
	if ( args.align )
		Align.set( self, args.align );


	var copyCSS = args.copy.css;
	copyCSS.color = textColor;
	self.descriptionTF = new UITextField({
		target: self,
		id: self.id + '_descriptionTF',
		css: copyCSS,
		fontSize: args.copy.description.fontSize,
		fontFamily: adData.font.primary.regular,
		format: TextFormat.INLINE_FIT_CLAMP,
		align: args.copy.description.align,
		spacing: 0.3,
		text: adData.athlete.description
	});


	if ( args.copy.name.align.y.against )
		args.copy.name.align.y.against = self[args.copy.name.align.y.against];
	self.nameTF = new UITextField({
		target: self,
		id: self.id + '_nameTF',
		css: copyCSS,
		fontSize: args.copy.name.fontSize,
		fontFamily: adData.font.primary.bold,
		format: TextFormat.INLINE_FIT_CLAMP,
		align: args.copy.name.align,
		text: adData.athlete.name
	});


	self.descriptionTF.defaultX = self.descriptionTF.x;
	self.nameTF.defaultX = self.nameTF.x;


	self.quotes = [];
	for ( var i = 0; i < adData.athleteQuotes.length; i++ ) {
		self.quotes.push( new UIImage({
			target: self,
			id: self.id + '_quote_' + i,
			source: adData.athleteQuotes[ i ],
			retina: true
		}) );
	}
	

	Gesture.disable( self );


	self.animateIN = function( newDelay ) {
		var delay = newDelay || 0;
		var duration = adData.animation.sliding.duration;
		var ease = adData.animation.sliding.ease;

		self.show();

		TweenLite.killTweensOf( [ self.descriptionTF, self.nameTF ] );

		if ( !self.animateQuotesFirst ) {
			self.image.animateIN( delay );
			if ( delay )
				delay += duration;
		}

		for ( var i = 0; i < self.quotes.length; i++ ) {
			TweenLite.killTweensOf( self.quotes[ i ] );
			var quotesFromX = adData.animateFromLeft ? -self.quotes[ i ].width : adParams.adWidth;
			TweenLite.fromTo( self.quotes[ i ], duration, { x: quotesFromX }, { delay: delay, x: 0, ease: ease } );
			delay += 0.1;
		}

		if ( self.animateQuotesFirst ) {
			delay += 2;
			for ( var i = 0; i < self.quotes.length; i++ ) {
				TweenLite.to( self.quotes[ i ], duration, { delay: delay, opacity: 0, ease: Power1.easeInOut } );
				delay += 0.1;
			}
			delay += duration * 0.75;
			self.image.animateIN( delay );
		}

		delay += 0.15;
		TweenLite.fromTo( self.descriptionTF, duration, { x: -self.descriptionTF.width }, { delay: delay, x: self.descriptionTF.defaultX, ease: ease } );
		delay += 0.15;
		TweenLite.fromTo( self.nameTF, duration, { x: -self.nameTF.width }, { delay: delay, x: self.nameTF.defaultX, ease: ease } );
	}

	self.animateOUT = function() {
		self.hide();
	}

	return self;
});



















/* -- COMMON IMPLEMENTED: js/view/AnimateImage.js -----------------------------------------------------------------------------------------
 *
 *
 *
 */
var AnimateImage = ( function ( args ) {
	trace('AnimateImage() args.id:' + args.id);
	var self = new UIImage( args );







	self.animateIN = function ( delay ) {
		delay = delay || 0;

		TweenLite.set( self, { opacity: 0 });
		TweenLite.fromTo( self, 0.5, { scale: 1.1 }, { delay: delay, opacity: 1, scale: 1, ease: Power2.easeInOut });		// ** Fade and Scale

		if ( self.cdContainer ) {
			delay += 0.25;
			TweenLite.fromTo( self.cdContainer, 0.5, { opacity: 1 }, { delay: delay, opacity: 0, ease: Power2.easeInOut });
		}
	}

	self.animateOUT = function() {
		TweenLite.to( self, 0.5, { opacity: 0, ease: Power2.easeInOut });
	}

	self.focus = function() {
		if ( self.cdContainer )
			TweenLite.to( self.cdContainer, 0.5, { opacity: 0, ease: Power2.easeOut });
		TweenLite.to( self, 0.5, { opacity: 1, scale: 1, ease: Power2.easeOut });		// ** Fade and Scale
	}

	self.unfocus = function() {
		if ( self.cdContainer )
			TweenLite.to( self.cdContainer, 0.5, { opacity: 1, ease: Power2.easeOut });
		TweenLite.to( self, 0.5, { opacity: 0.75, scale: 0.8, ease: Power2.easeOut });		// ** Fade and Scale
	}

	return self;
})



















/* -- COMMON IMPLEMENTED: js/view/CtaBTN.js -----------------------------------------------------------------------------------------
 *
 *
 *
 */
var CtaBTN = ( function ( args ) {
	var copyArgs = args.copy;
	var fontSize = copyArgs.fontSize || 11;
	var copyOffsetY = copyArgs.offsetY;
	var copySpacing = copyArgs.spacing;

	args.css.backgroundColor = adData.color.white;
	var self = new UIButton( args );

	self.copyTF = new UITextField({
		id: args.id + '_copy',
		target: self,
		css: {
			width: '100%',
			height: '100%',
			y: copyOffsetY,
			color: adData.color.black
		},
		fontSize: fontSize,
		fontFamily: adData.font.primary.bold,
		alignText: Align.CENTER,
		format: TextFormat.INLINE_FIT,
		spacing: copySpacing,
		text: adData.copy.cta
	});


	self.over = new UIComponent({
		target: self,
		id: self.id + '_over',
		css: {
			width: '100%',
			height: '100%',
			backgroundColor: adData.color.black,
			opacity: 0
		}
	})

	self.border = new UIBorder({
		target: self,
		id: self.id + '_border',
		size : 1,
		color : adData.color.black,
		css: {
			opacity: 0
		}
	})
	
	Gesture.disableChildren( self );

	self.destX = self.x;

	self._onOver = function() {
		var duration = 0.5;
		var ease = Power2.easeOut;

		TweenLite.fromTo( self.border, duration, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, ease: ease });
		TweenLite.fromTo( self.over, duration, { scale: 0.5, opacity: 1 }, { scale: 1, opacity: 0, ease: ease });
	}

	self._onOut = function() {
		TweenLite.to( self.border, 0.5, { opacity: 0, ease: Power1.easeInOut });
	}

	self.animateIN = function( delay ) {
		TweenLite.killTweensOf( self );
		TweenLite.fromTo( self, adData.animation.sliding.duration, { x: adParams.adWidth }, { delay: delay, x: self.destX, ease: adData.animation.sliding.ease });
	}

	self.animateOUT = function() {
		TweenLite.killTweensOf( self );
		TweenLite.to( self, 0.25, { x: adParams.adWidth, ease: adData.animation.sliding.ease });
	}

	return self
});



















/* -- COMMON IMPLEMENTED: js/view/Logo.js -----------------------------------------------------------------------------------------
 *
 *
 *
 */
var Logo = ( function ( args ) {
	var self = new UIComponent( args );

	self.unlikeAny = new UIImage({
		target: self,
		id: self.id + '_unlikeAny',
		source: adData.lockup.unlikeAny,
		retina: true,
		css: {
			opacity: 0
		},
	});

	self.ua = new UIImage({
		target: self,
		id: self.id + '_ua',
		source: adData.lockup.logo,
		retina: true,
		css: {
			opacity: 0
		},
		align: {
			x: {
				type: Align.CENTER,
				against: self.unlikeAny
			},
			y: {
				type: Align.BOTTOM,
				against: self.unlikeAny,
				outer: true,
				offset: args.spacing,
			},
			snap: true
		}
	});



	if ( adData.lockup.unlikeAny_dark && adData.lockup.logo_dark ) {
		self.darkLogos = new UIComponent({
			target: self,
			id: 'darkLogos',
			css: {
				opacity: 0
			}
		});

		var unlikeAnyDark = new UIImage({
			target: self.darkLogos,
			id: self.id + '_unlikeAny_dark',
			source: adData.lockup.unlikeAny_dark,
			retina: true,
		});

		var uaDark = new UIImage({
			target: self.darkLogos,
			id: self.id + '_ua_dark',
			source: adData.lockup.logo_dark,
			retina: true,
			align: {
				x: {
					type: Align.CENTER,
					against: unlikeAnyDark
				},
				y: {
					type: Align.BOTTOM,
					against: unlikeAnyDark,
					outer: true,
					offset: args.spacing,
				},
				snap: true
			}
		});

		Clamp.set( self.darkLogos, Clamp.XY );
	}

	Clamp.set( self, Clamp.XY );
	Align.set( self, args.align );

	Gesture.disable( self );

	self.animateIN = function( delay ) {
		var duration = 0.5;
		var ease = Power1.easeInOut;

		TweenLite.to( self.unlikeAny, duration, { delay: delay, opacity: 1, ease: ease } );
		delay += 0.25;
		TweenLite.to( self.ua, duration, { delay: delay, opacity: 1, ease: ease } );
	}

	self.showDark = function() {
		if ( self.darkLogos )
			TweenLite.to( self.darkLogos, 0.25, { opacity: 1, ease: Power1.easeInOut });
	}

	self.hideDark = function() {
		if ( self.darkLogos )
			TweenLite.to( self.darkLogos, 0.25, { opacity: 0, ease: Power1.easeInOut });
	}

	return self;
});



















/* -- COMMON IMPLEMENTED: js/view/Products.js -----------------------------------------------------------------------------------------
 *
 *
 *
 */
var Products = ( function ( args ) {
	args.css.backgroundColor = adData.color.lightGrey;
	args.css.opacity = 0;
	var self = new UIComponent( args );

	self.isShowing = false;

	self.products = [];
	for ( var i = 0; i < adData.products.length; i++ ) {
		self.products.push( new Product({
			target: self,
			id: self.id + '_image_' + i,
			css: {
				height: args.css.height,
			},
			retina: args.retina,
			copy: args.copy,
			data: adData.products[ i ]
		}));
	}

	self.showProduct = function( id ) {

		if ( self.curProduct )
			self.curProduct.animateOUT();

		TweenLite.to( self, 0.5, { opacity: 1, ease: Power1.easeInOut });

		self.curProduct = self.products[ id ];
		self.curProduct.parent.addChild( self.curProduct );
		self.curProduct.animateIN();
	}

	self.hideProduct = function() {
		TweenLite.to( self, 0.5, { opacity: 0, ease: Power1.easeInOut });
		if ( self.curProduct )
			self.curProduct.animateOUT();
	}


	return self;
})



















/* -- COMMON IMPLEMENTED: js/view/Product.js -----------------------------------------------------------------------------------------
 *
 *
 *
 */
var Product = ( function( args ) {
	var data = args.data;

	var self = new UIComponent( args );

	self.animationElements = [];

	self.image = new AnimateImage({
		target: self,
		id: self.id + '_image',
		css: {
			height: args.css.height,
			backgroundColor: 'green',
			backgroundSize: 'cover',
			backgroundPosition: 'center'
		},
		source: data.hero,
		retina: args.retina,
	});

	var imageContainer = new UIComponent({
		target: self,
		id: self.id + '_imageContainer',
		css: {
			overflow: 'hidden'
		}
	});

	imageContainer.addChild( self.image );
	Clamp.set( imageContainer, Clamp.XY );
	var copy = new UIComponent({
		target: self,
		id: self.id + '_copy',
		css: args.copy.css
	});



	self.nameTF = new UITextField({
		target: copy,
		id: copy.id + '_nameTF',
		css: {
			width: '100%',
			height: '100%'
		},
		fontSize: args.copy.name.fontSize,
		fontFamily: adData.font.secondary.bold,
		format: TextFormat.PARAGRAPH_FIT_CLAMP,
		alignText: args.copy.textAlign,
		align: {
			x: args.copy.textAlign,
			snap: true
		},
		text: data.name
	});

	self.animationElements.push( self.nameTF );

	if ( data.type ) {
		self.descriptionTF = new UITextField({
			target: copy,
			id: copy.id + '_descriptionTF',
			css: {
				width: '100%',
				height: '100%'
			},
			fontSize: args.copy.description.fontSize,
			fontFamily: adData.font.secondary.regular,
			format: TextFormat.PARAGRAPH_FIT_CLAMP,
			alignText: args.copy.textAlign,
			text: data.type
		});

		Align.set( self.nameTF, {
			x: args.copy.textAlign,
			y: {
				type: Align.BOTTOM,
				against: self.descriptionTF,
				outer: true,
				offset: args.copy.description.yOffset
			},
			snap: true
		});

		self.animationElements.push( self.descriptionTF );
	}

	self.priceTF = new UITextField({
		target: copy,
		id: copy.id + '_priceTF',
		css: args.copy.price.css || {

		},
		fontSize: args.copy.price.fontSize,
		fontFamily: adData.font.secondary.bold,
		format: TextFormat.INLINE_FIT_CLAMP,
		alignText: args.copy.textAlign,
		align: {
			x: args.copy.textAlign,
			y: {
				type: Align.BOTTOM,
				against: self.nameTF,
				outer: true,
				offset: args.copy.price.yOffset
			},
			snap: true
		},
		text: data.price
	});

	self.animationElements.push( self.priceTF );

	Clamp.set( self, Clamp.XY );
	Clamp.set( copy, Clamp.XY );
	Align.set( copy, args.copy.align );


	if ( self.descriptionTF )
		self.descriptionTF.defaultX = self.descriptionTF.x;
	self.nameTF.defaultX = self.nameTF.x;
	self.priceTF.defaultX = self.priceTF.x;

	self.hide();


	self.animateIN = function() {
		var duration = adData.animation.sliding.duration;
		var ease = adData.animation.sliding.ease;
		var delay = 0;
		var delayIncrement = 0.15;

		self.show();
		self.image.animateIN( 0, 0.35 );

		TweenLite.killTweensOf( self.animationElements );

		if ( self.descriptionTF ) {
			delay += delayIncrement;
			TweenLite.fromTo( self.descriptionTF, duration, { x: self.descriptionTF.defaultX - 20, opacity: 0 }, { delay: delay, opacity: 1, x: self.descriptionTF.defaultX, ease: ease } );
		}
		delay += delayIncrement;
		TweenLite.fromTo( self.nameTF, duration, { x: self.nameTF.defaultX - 20, opacity: 0 }, { delay: delay, opacity: 1, x: self.nameTF.defaultX, ease: ease } );
		delay += delayIncrement;
		TweenLite.fromTo( self.priceTF, duration, { x: self.priceTF.defaultX - 20, opacity: 0 }, { delay: delay, opacity: 1, x: self.priceTF.defaultX, ease: ease } );
	}

	self.animateOUT = function() {
		self.hide();
		self.image.animateOUT();
	}


	return self;
});



















/* -- COMMON IMPLEMENTED: js/view/ProductMenu.js -----------------------------------------------------------------------------------------
 *
 *
 *
 */
var ProductMenu = ( function ( args ) {
	args.css.backgroundColor = adData.color.white;
	args.css.opacity = 0;
	var self = new UIButton( args );


	var menu = new UIComponent({
		target: self,
		id: self.id + '_menu',
	});

	Gesture.disable( self );

	self.menuItems = [];
	var menuItem;
	var prevMenuItem;
	for ( var i = 0; i < adData.products.length; i++ ) {
		menuItem = new ProductMenuItem({
			target: menu,
			id: menu.id + '_item',
			num: i,
			bg: new AnimateImage({
				id: menu.id + '_item_bg_' + i,
				source: adData.products[ i ].thumb
			})
		});

		if ( i == 2 && args.stacked )
			prevMenuItem = null;

		if ( prevMenuItem ) {
			Align.set( menuItem, {
				x: {
					type: Align.RIGHT,
					against: prevMenuItem,
					outer: true,
					offset: args.thumb.xOffset
				}
			})
		}

		if ( args.stacked && i > 1 ) {
			Align.set( menuItem, {
				y: {
					type: Align.BOTTOM,
					against: self.menuItems[ 0 ],
					outer: true,
					offset: args.thumb.yOffset
				}
			})
		}

		self.menuItems.push( menuItem );
		prevMenuItem = menuItem;
	}


	Clamp.set( menu, Clamp.XY );
	if ( args.innerAlign )
		Align.set( menu, args.innerAlign );

	self.rect = { 
		top: self.y + menu.y, 
		right: self.x + menu.x + menu.width,
		bottom: self.y + menu.y + menu.height, 
		left: self.x + menu.x
	};

	function checkMouseLocation( event ) {
		if ( ! ( MathUtils.inRange( event.layerX, self.rect.left, self.rect.right ) && MathUtils.inRange( event.layerY, self.rect.top, self.rect.bottom ) ) )
			Control.hideProduct();
	}

	self.animateIN = function( delay ) {
		TweenLite.to( self, 0.5, { delay: delay, opacity: 1, ease: Power1.easeInOut });
		for ( var i = 0; i < self.menuItems.length; i++ ) {
			self.menuItems[ i ].animateIN( delay );
			delay += 0.15;
		}
	}

	self.menuRoll = function( num ) {
		Gesture.add( self, GestureEvent.OUT, checkMouseLocation );
		var menuItem;
		for ( var i = 0; i < self.menuItems.length; i++ ) {
			menuItem = self.menuItems[ i ];
			if ( i != num )
				menuItem.onUnfocus();
		}
	}

	self._onClick = function() {
		trace('ProductMenu._onClick()');
		Control.networkExit();
	}

	self.menuRollOut = function() {
		Gesture.remove( self, GestureEvent.OUT, checkMouseLocation );
		self.resetMenu();
	}

	self.resetMenu = function() {
		for ( var i = 0; i < self.menuItems.length; i++ ) {
			menuItem = self.menuItems[ i ];
			menuItem.onReset();
		}
	}

	return self;
});



















/* -- COMMON IMPLEMENTED: js/view/ProductMenuItem.js -----------------------------------------------------------------------------------------
 *
 *
 *
 */
var ProductMenuItem = ( function( args ) {
	var self = new UIButton( args );

	self.num = args.num;


	self.over = new UIComponent({
		target: self,
		id: self.id + '_over',
		css: {
			width: '100%',
			height: '100%',
			backgroundColor: adData.color.black,
			opacity: 0
		}
	})

	self.border = new UIBorder({
		target: self,
		id: self.id + '_border',
		size : 1,
		color : adData.color.black,
		css: {
			opacity: 0
		}
	})

	Gesture.disableChildren( self );

	self._onOver = function() {
		var duration = 0.5;

		Control.showProduct( self.num );
		self.bg.focus();

		TweenLite.fromTo( self.border, duration, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, ease: Power2.easeOut });
		TweenLite.fromTo( self.over, duration, { scale: 0.5, opacity: 1 }, { scale: 1, opacity: 0, ease: Power2.easeOut });
	}
	self.onHitOut = function() {
		var duration = 0.5;
		TweenLite.to( self.border, duration, { opacity: 0, ease: Power1.easeInOut });
	}

	self.onUnfocus = function() {
		self.onHitOut();
		self.bg.unfocus();
	}

	self.onReset = function() {
		self.onHitOut();
		self.bg.focus();
	}

	self.animateIN = function( delay ) {
		TweenLite.from( self.bg, 0.5, { delay: delay, y: 20, ease: Power4.easeOut });
		self.bg.animateIN( delay );
	}

	return self;
});



















/* -- VIEWS( 300x600_jessie ): ViewStyles -----------------------------------------------------------------------------------------
 *
 *
 *
 */
var ViewStyles = {};









/* -- VIEWS( 300x600_jessie ): Views -----------------------------------------------------------------------------------------
 *
 *
 *
 */
var Views = {};









/* -- BUILD SIZE( 300x600_jessie ): build.js -----------------------------------------------------------------------------------------
 *
 *
 *
 */
/* BUILD SOURCE: Velvet - Base / OPTIONS:  / AdApp: 1.5.3 / AdHtml: v2.8.1 / Created: 07/31/17 01:52pm */
var Control = new function() {
	this.prepareBuild = function() {
		trace( 'Control.prepareBuild()' );
		Control.preMarkup();
		View.buildMarkup();
		View.buildBorder();
		Control.postMarkup();
		Animation.startAd();
		Animation.startScene();
	}

	this.preMarkup = function() {
		trace( 'Control.preMarkup()' );
	}

	this.postMarkup = function() {
		trace( 'Control.postMarkup()' );
	}

	this.showProduct = function ( num ) {
		adData.clickTag = adData.products[ num ].url;
		adData.elements.athlete.animateOUT();
		adData.elements.products.showProduct( num );
		adData.elements.productMenu.menuRoll( num );
		adData.elements.logo.showDark();
		adData.elements.ctaBTN.animateOUT();
	}

	this.hideProduct = function() {
		adData.resetClickTag();
		adData.elements.products.hideProduct();
		adData.elements.athlete.animateIN();
		adData.elements.productMenu.menuRollOut();
		adData.elements.logo.hideDark();
		adData.elements.ctaBTN.animateIN( 0.25 );
	}

	this.networkExit = function( newClicktag ) {
		trace('Control.networkExit()');
		trace('		newClicktag:' + newClicktag );
		trace('		adData.clickTag:' + adData.clickTag );
		var myClickTag = newClicktag || adData.clickTag;
		trace('		myClickTag:' + myClickTag );
		Network.exit( myClickTag );
	}
}
var View = new function() {
	this.buildMarkup = function(){
		Styles.setCss( adData.elements.redAdContainer, { 'background-color': adData.color.white });

		adData.elements.exitBTN = new UIButton({
			target: adData.elements.redAdContainer,
			id: 'exitBTN',
			css: {
				width: '100%',
				height: '100%',
			},
			onClick: function() { Control.networkExit(); }
		})
		



		adData.elements.athlete = new Athlete({
			target: adData.elements.redAdContainer,
			id: 'athlete',
			copy: {
				css: {
					width: 204,
					x: 5,
				},
				description: {
					fontSize: 10,
					align: {
						y: {
							type: Align.BOTTOM,
							offset: -4
						},
						snap: true
					}
				},
				name: {
					fontSize: 11,
					align: {
						y: {
							type: Align.TOP,
							against: 'descriptionTF',
							outer: true,
							offset: -1
						},
						snap: true
					}
				}
			}
		})





		adData.elements.productGallery = new UIComponent({
			target: adData.elements.redAdContainer,
			id: 'productGallery',
			css: {
				width: adParams.adWidth,
				height: adParams.adHeight - 150,
				y: 150,
			}
		})

		adData.elements.products = new Products({
			target: adData.elements.productGallery,
			id: 'products',
			css: {
				width: '100%',
				height: 383
			},
			copy: {
				css: {
					width: 228,
					height: 100
				},
				name: {
					fontSize: 16
				},
				description: {
					fontSize: 10,
					yOffset: 0
				},
				price: {
					fontSize: 18,
					yOffset: 6
				},
				textAlign: Align.CENTER,
				align: {
					x: Align.CENTER,
					y: {
						type: Align.TOP,
						outer: true,
						offset: -15
					},
					snap: true
				}
			}
		});

		Gesture.disable( adData.elements.productGallery );
		Gesture.disableChildren( adData.elements.productGallery );



		adData.elements.productMenu = new ProductMenu({
			target: adData.elements.productGallery,
			id: 'productMenu',
			css: {
				width: '100%',
				height: adData.elements.productGallery.height - adData.elements.products.height
			},
			align: {
				y: Align.BOTTOM,
				snap: true
			},
			stacked: false,
			innerAlign: {
				x: Align.CENTER,
				y: Align.CENTER,
				snap: true
			},
			thumb: {
				xOffset: 6,
				yOffset: 6,
			}
		})
		



		adData.elements.ctaBTN = new CtaBTN({
			target: adData.elements.redAdContainer,
			id: 'ctaBTN',
			css: {
				width: 78,
				height: 26,
				y: 500
			},
			align: {
				x: {
					type: Align.RIGHT,
					offset: -9
				},
				snap: true
			},
			copy: {
				fontSize: 12,
				offsetY: 1,
				spacing: -0.5
			},
			onClick: function() { Control.networkExit(); }
		})




		adData.elements.logo = new Logo({
			target: adData.elements.redAdContainer,
			id: 'logo',
			css: {
				y: 16
			},
			spacing: 14,
			align: {
				x: Align.CENTER,
				snap: true
			}
		})
	}
		
	this.buildBorder = function(){
		new UIBorder({
			id : 'mainBorder',
			target : adData.elements.redAdContainer,
			size : 1,
			color : adData.color.darkGrey
		});
	}
}
var Animation = new function() {
	this.startAd = function() {
		trace( 'Animation.startAd()' );
		Styles.setCss( global.adData.elements.redAdContainer, { opacity:1 });
		TweenLite.to( Markup.get('preloader'), 0.5, { opacity: 0, ease: Quad.easeInOut, onComplete: function() {
			global.removePreloader();
		} });

	}

	this.startScene = function() {
		trace( 'Animation.startScene()' );		
		var delay = 0.25;

		adData.elements.athlete.animateIN( delay );
		delay += 0.25;
		adData.elements.logo.animateIN( delay );
		adData.elements.productMenu.animateIN( delay );
		delay += adData.animation.sliding.duration + 0.25;
		adData.elements.ctaBTN.animateIN( delay );
	}

}






















