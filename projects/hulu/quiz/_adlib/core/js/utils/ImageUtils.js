/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	ImageUtils
		This object contains methods necessary for manipulating images.
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */
var ImageUtils = new function(){

	var self = this;

	/** Method: smooth() 
			Applies known css to smooth image assignment.

		target 				-	target dom element id or reference  */
	self.smooth = function( target ){
		var elem = Markup.getElement( target );

		elem.style.cssText += ' image-rendering: optimizeSpeed; image-rendering: -moz-crisp-edges; image-rendering: -o-crisp-edges; image-rendering: -webkit-optimize-contrast; image-rendering:optimize-contrast; -ms-interpolation-mode:nearest-neighbor;';
	}


	/** Method: tintImageAndReturnCanvas() 
			Converts an image to a byte array and then tints it to the specified perecentage of hex color
			
		image 				-	js Image object
		hex 				-	hex value representing a color
		percent 			-	the amount of tint 0-1  */
	self.tintImageAndReturnCanvas = function( image, hex, percent ) {
		if( !percent ) percent = 1;
		var color = ColorUtils.toRgba( hex );

		var canvas = document.createElement( 'canvas' );
		canvas.width = image.width;
		canvas.height = image.height;
		var context = canvas.getContext( '2d' );
		context.drawImage( 
			image, 0, 0
		);
		var byteArray = context.getImageData(
			0, 0, canvas.width, canvas.height
		);
		for( var i=0; i < byteArray.data.length; ) {
			byteArray.data[i] = byteArray.data[i++] * ( 1-color.a ) + ( color.r * color.a );
		    byteArray.data[i] = byteArray.data[i++] * ( 1-color.a ) + ( color.g * color.a );
		    byteArray.data[i] = byteArray.data[i++] * ( 1-color.a ) + ( color.b * color.a );
		    byteArray.data[i] = byteArray.data[i++] * 1 + 0;
		}
		context.putImageData( 
			byteArray, 0, 0
		);
		return canvas;	
	}

	/** Method: fitImageAtCoordinate() 
			Positions a background image to fit the div size while centering around a point.  If the point is beyond the size bounds, it will align to that side.
			
		source 		- The div with a background image
		originX 	- The x position to center on
		originY		- The y position to center on */
	self.fitImageAtCoordinate = function( source, originX, originY ){
		var child = new Image();
		if ( originX === undefined && originY === undefined ){
			source.style.backgroundPosition = '50% 50%';
		} else {
			// make sure the image is loaded first
			child.onload = function(){
				var coord = { width : originX || 0, height : originY || 0 };
				var parent = { width:source.offsetWidth, height:source.offsetHeight };				
				var parentAspectRatio = parent.width / parent.height;
				var childAspectRatio = child.width / child.height;

				if ( parentAspectRatio > childAspectRatio ){
					// child max fits in horizontal, move y
					fit('width','height')
				} else if ( parentAspectRatio < childAspectRatio ){
					//  child max fits in vertical, move x
					fit('height','width')
				} 

				function fit(a,b){
					// child width is parent height times ratio of child width over child height
					// child height is parent width times ratio of child height over child width
					var childSize = parent[a] * (child[b] / child[a]);

					// parent to child scale ratio
					var scalePercent = parent[a] / child[a];

					// parent size, halfed then subtract the scaled coordinate point
					var childMove = (parent[b] / 2) - (coord[b] * scalePercent);

					// make sure the image doesn't exceed the bounds
					var maxMove = parent[b] - childSize;
					if ( childMove > 0 ) childMove = 0;
					else if ( childMove < maxMove ) childMove = maxMove;

					source.style.backgroundPosition = a === 'height' ? childMove + 'px 0px' : '0px ' + childMove + 'px';
				}
			}
		}
		child.src = source.style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
		source.style.backgroundSize = 'cover';
		source.style.backgroundRepeat = 'no-repeat';
	}
}
