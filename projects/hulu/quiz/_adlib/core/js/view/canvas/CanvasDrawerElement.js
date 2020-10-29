/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	CanvasDrawerElement
		
		Method: CanvasDrawerElement()
			Is the returned instance of a CanvasDrawer object. *Only called from CanvasDrawerStage, so you should never call directly to these.*

			stage		- the CanvasDrawerStage in which to add the element
			obj			- the various parameters used to create the element from CanvasDrawerStage's addImage, addShape, and addText methods
			type 		- the CanvasDrawType (image, shape, text, etc) used to define the element

		The following are all of the properties available to every CanvasDrawerElement, except where noted::

			x					- NUMBER representing the horizontal position of the element
			left 				- NUMBER representing the reference to the x property
			y 					- NUMBER representing the vertical position of the element
			top 				- NUMBER representing the reference to the y property
			rotation			- NUMBER representing the rotation, in degrees, of the element
			alpha 				- NUMBER representing the opacity of the element
			opacity 			- NUMBER representing the reference to the alpha property
			scaleX 				- NUMBER representing the horizontal scale of the element
			scaleY 				- NUMBER representing the vertical scale of the element
			blendMode 			- NUMBER representing the blend or masking style applied to the element
			isActive 			- BOOLEAN representing whether or not the element should be drawn or not
			transformOrigin		- STRING representing the origin from which to perform scales and rotations. Written as two values in a string with either a '%' or 'px' marker (ie '50% 50%' or '5px 100px')
			shadowColor 		- STRING representing the color of the drop shadow in RGBA format
			shadowBlur 			- NUMBER representing the amount of blur on the drop shadow
			shadowAngle 		- NUMBER representing the angle, in degrees, of the drop shadow
			shadowDistance 		- NUMBER representing the distance of the drop shadow from the element

			The following *ONLY* apply to CanvasDrawType.IMAGE elements

			sourceX 			- NUMBER representing the horizontal value from which to start drawing data from the source image
			sourceY 			- NUMBER representing the vertical value from which to start drawing data from the source image
			sourceW 			- NUMBER representing the width value from which to draw data from the source image
			sourceH 			- NUMBER representing the height value from which to draw data from the source image

			The following *ONLY* apply to CanvasDrawType.TEXT elements

			fontSize			- NUMBER or STRING (12, '12', '12px', or '12pt') representing the font size
			fontFamily			- STRING representing the font name
			textAlign 			- STRING representing text's horizontal alingment: 'center', 'left', or 'right'
			marginLeft 			- NUMBER providing offset on X coordinate for text
			marginTOP 			- NUMBER providing offset on Y coordinate for text
			maxWidth 			- NUMBER which determines the maximum width of the text field, which is used to create MUTLI-LINE text
			lineHeight	 		- NUMBER which determines the line height between lines of text with defined maxWidth values

			The following *ONLY* apply to CanvasDrawType.IMAGE, CanvasDrawType.CIRC, and CanvasDrawType.RECT elements

			width 				- NUMBER representing the total width or diameter of the element
			height 				- NUMBER representing the total height or diameter of the element

			The following *ONLY* apply to CanvasDrawType.CIRC, CanvasDrawType.RECT, and CanvasDrawType.TEXT elements (heretofore referred to as 'shapes')

			fill 				- STRING, gradient, or texture representing the color used to fill the shape
			strokeFill 			- STRING, gradient, or texture representing the color used to fill the shape's stroke
			strokeWidth 		- NUMBER representing the width of the shape's outline 
			strokeJoin 			- STRING representing how two lines/corners form: 'round', 'bevel', and 'miter'
			strokeDashSize		- NUMBER representing the length of each segment in a dashed line
			strokeDashGap		- NUMBER representing the gap between each segment in a dashed line
			strokeDashOffset	- NUMBER representing the offset positioning of the dash segmentsg			
			strokePosition 		- STRING repsenting the position of the shape's stroke, 'outer' or 'center'; there is no 'inner'


			
		See: 
			- CanvasDrawer for creation markup
			- CanvasDrawerStage for adding and maniplating images, shapes, and text
			- CanvasDrawerElement for element creation base
			- CanvasBlendMode for all available blend modes
			- CanvasDrawType for all available draw types
			- CanvasLineTo for all line drawing functions

		NOTE::
			To use CanvasDrawer and all its classes, add the following imports to your index.html

			*these are required*
			(start code)
			adParams.corePath + "js/view/canvas/CanvasDrawer.js",
			adParams.corePath + "js/view/canvas/CanvasDrawerStage.js",
			adParams.corePath + "js/view/canvas/CanvasDrawerElement.js",
			(end)

			*these are optional, but recommended*
			(start code)
			adParams.corePath + "js/view/canvas/CanvasBlendMode.js",
			adParams.corePath + "js/view/canvas/CanvasDrawType.js",
			adParams.corePath + "js/view/canvas/CanvasLineTo.js",
			(end)

		---------------------------------------------------------------------------------------------------------------------------------------------------------- */

function CanvasDrawerElement(stage, obj, type) {
	var CDE = this;

	CDE._type = obj.type || type;
	CDE.drawer = stage;

	CDE.id = obj.id || 'canvasdItem' + stage.elementsLength;
	stage.elements[CDE.id] = CDE;
	stage.elementsLength++;

	CDE.isActive = obj.isActive === false ? false : true;

	CDE.rotation = obj.params.rotation || 0;
	CDE.scaleX = obj.params.scaleX === 0 ? 0 : (obj.params.scaleX || 1);
	CDE.scaleY = obj.params.scaleY === 0 ? 0 : (obj.params.scaleY || 1);

	CDE.alpha = obj.params.alpha >= 0 ? obj.params.alpha : (obj.params.opacity >= 0 ? obj.params.opacity : 1);
	CDE.blendMode = obj.blendMode || 'source-over';

	obj.stroke = obj.stroke || {};

	var _hasShadow = obj.dropShadow ? true : false;
	obj.dropShadow = obj.dropShadow || {};

	CDE.init();

	CDE._shadowAngle = obj.dropShadow.angle || 0;
	CDE.shadowDistance = obj.dropShadow.distance || 0;
	CDE._shadowColor = obj.dropShadow.color || (_hasShadow ? '#000000' : null);
	CDE.shadowAlpha = obj.dropShadow.alpha || CDE._shadowAlpha;
	CDE.shadowBlur = obj.dropShadow.blur || 0;
}

CanvasDrawerElement.prototype = {
	// iitializes the getters and setters and related functions to the protoype
	init: function() {
		var CDE = this;

		Object.defineProperties(CDE, {
			left: {
				get: function() {
					return CDE.x;
				},
				set: function(value) {
					CDE.x = value;
				}
			},
			top: {
				get: function() {
					return CDE.y;
				},
				set: function(value) {
					CDE.y = value;
				}
			},
			opacity: {
				get: function() {
					return CDE.alpha;
				},
				set: function(value) {
					CDE.alpha = value;
				}
			},
			shadowAngle: {
				get: function() {
					return CDE._shadowAngle;
				},
				set: function(value) {
					CDE._shadowAngle = value;
					CDE._setOffsetPos();
				}
			},
			shadowDistance: {
				get: function() {
					return CDE._shadowDistance;
				},
				set: function(value) {
					CDE._shadowDistance = value;
					CDE._setOffsetPos();
				}
			},
			shadowColor: {
				get: function() {
					return CDE._shadowColor;
				},
				set: function(value) {
					CDE._shadowColor = value === null ? null : ColorUtils.toRgba(value, CDE._shadowAlpha);

					// The reason the alpha doesn't update when you change the shadow color is that if you pass in a HEX color, the alpha would reset to 1 if you didn't want it to
					// but this code is still here, just in case

					// CDE._shadowAlpha = CDE._shadowColor.split(',')[3];
					// CDE._shadowAlpha = parseInt(CDE._shadowColor.substring(0, CDE._shadowAlpha.lastIndexOf(')')));
				}
			},
			shadowAlpha: {
				get: function() {
					return CDE._shadowAlpha;
				},
				set: function(value) {
					CDE._shadowAlpha = value;
					CDE.shadowColor = CDE._shadowColor;
				}
			}
		});
	},
	_setOffsetPos: function(ang, dist) {
		var CDE = this;
		var radians = MathUtils.toRadians(CDE._shadowAngle * -1 + 180);
		CDE._shadowOffsetX = (Math.cos(radians) * CDE._shadowDistance).toFixed(8);
		CDE._shadowOffsetY = (Math.sin(radians) * CDE._shadowDistance).toFixed(8);
		//return CDE._shadowOffsetX;
	},

	toString: function() {
		return '[object CanvasDrawerElement]';
	}
}