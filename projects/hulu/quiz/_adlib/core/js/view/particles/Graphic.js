/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	Graphic

	Description:
		A simple, light weight class for rendering shapes and images on canvas element with assigned style to work with the particle system.
		 Graphic.Shape is the parent class that remains netural to keep the flexiblity to create more classes based on needs in different projects.
		To keep it practical while maintaining it as light as possible, there are three classes currently available - Graphic.Image, Graphic.Circle, Graphic.Rect. 

	---------------------------------------------------------------------------------------------------------------------------------------------------------- */

var Graphic = Graphic || {};

Graphic = {
	DEFAULTSIZE: 10,
	DEFAULTSTYLE: {
		x: 0,
		y: 0,
		alpha: 1,
		scale: 1,
		rotation: 0,
		transformOrigin: { x: 0.5, y: 0.5 },
		color: [ 255, 0, 0 ], 
		strokeWidth: 0,
		strokeColor: 'rgba(0, 0, 0, 1)'
	},
	Shape: function () {}
};

/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	Graphic.Shape

	Description:
		The parent class of other Graphic classes. It handles color, alpha, translation, rotation and scaling. 

	---------------------------------------------------------------------------------------------------------------------------------------------------------- */


Graphic.Shape.prototype = {

	render: function ( ctx, style ) {

		style = style || {};
		style = ParticlesUtils.objectDefault( style, this.style );
		style.scale = MathUtils.restrict( style.scale, 0, Infinity );
		style.alpha = MathUtils.restrict( style.alpha, 0, 1 );
		var w = this.width * style.scale;
		var h = this.height * style.scale;
		var isImage = this instanceof Graphic.Image

		style.color = ParticlesUtils.getRGBA( style.color, style.alpha );
		
		ctx.save();

		if( style.alpha < 1 && isImage ) { 
			ctx.globalAlpha = style.alpha;
		}
		
		ctx.translate( w * -style.transformOrigin.x, h * -style.transformOrigin.y );
		
		if( style.rotation !== 0 ) {
			var tw = style.x + w * style.transformOrigin.x;
			var th = style.y + h * style.transformOrigin.y;
			ctx.translate( tw, th );
			ctx.rotate( MathUtils.toRadians( style.rotation ));
			ctx.translate( -tw, -th );
		}

		if( !isImage ) {
			ctx.beginPath();
		}

		this.draw( ctx, style, w, h );

		if( !isImage ) {
			ctx.closePath();
			ctx.fillStyle = style.color;
			ctx.fill();

			if ( style.strokeWidth > 0 ) {
				ctx.lineWidth = style.strokeWidth;
				ctx.strokeStyle = style.strokeColor;
				ctx.stroke();
			}
		}

		ctx.restore();
	}
};

/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	Graphic.Image

	Description: A class for rendering images on canvas. The size parameter applys to width. The height
	             is calculated base the the image width and height ratio and call draw method of the child
	             class.


	---------------------------------------------------------------------------------------------------------------------------------------------------------- */

Graphic.Image = function ( image, size, style ) {
	var self = this;

	self.image = image;
	self.width = size || image.width;
	self.height = self.width * ( image.height / image.width );
	self.style = ParticlesUtils.objectDefault( style || {}, Graphic.DEFAULTSTYLE );

	self.draw = function ( ctx, style, w, h ) {
		ctx.drawImage( self.image, style.x, style.y, w, h );
	}
}

Graphic.Image.prototype = Object.create( Graphic.Shape.prototype );


/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	Graphic.Circle

	Description: A class for rendering circles on canvas
	
	Parameters:
		size - diameter of the circle
		style - an object. Default to Graphic.DEFAULTSTYLE
	
		

	---------------------------------------------------------------------------------------------------------------------------------------------------------- */

Graphic.Circle = function ( size, style ) {
	var self = this;

	self.width = size * 0.5 || Graphic.DEFAULTSIZE * 0.5;
	self.height = self.width;
	self.style = ParticlesUtils.objectDefault( style || {}, Graphic.DEFAULTSTYLE );

	self.draw = function ( ctx, style, w ) {
		ctx.arc( style.x + w * 0.5, style.y + w * 0.5, w, 0, Math.PI * 2 );
	}
}

Graphic.Circle.prototype = Object.create( Graphic.Shape.prototype );

/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	Graphic.Rect

	Description: A class for rendering rectangles on canvas

	Parameters:
		width - width of the rectangle
		height - height o fht rectangle
		style - an object. Default to Graphic.DEFAULTSTYLE
		

	---------------------------------------------------------------------------------------------------------------------------------------------------------- */

Graphic.Rect = function ( width, height, style ) {
	var self = this;

	self.width = width || Graphic.DEFAULTSIZE;
	self.height = height || Graphic.DEFAULTSIZE;
	self.style = ParticlesUtils.objectDefault( style || {}, Graphic.DEFAULTSTYLE );

	self.draw = function ( ctx, style, w, h ) {
		ctx.rect( style.x, style.y, w, h );
	}
}

Graphic.Rect.prototype = Object.create( Graphic.Shape.prototype );

