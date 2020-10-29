/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	CanvasDrawerStage
		Is the returned object from CanvasDrawer.create()

		width		- the visual WIDTH of the HTMLCanvasElement adjusted for CanvasDrawer's retina display option
		height		- the visual HEIGHT of the HTMLCanvasElement adjusted for CanvasDrawer's retina display option
			
		See: 
			- CanvasDrawer for creation markup
			- CanvasDrawerStage for adding and maniplating images, shapes, and text
			- CanvasDrawerElement for element creation base
			- CanvasBlendMode for all available blend modes
			- CanvasDrawType for all available draw types
			- CanvasLineTo for all line drawing functions

		NOTE::

			- The update() method is key to displaying any element added through addImage(), addShape(), or addText(). If you add something and don't see it, you might not have used update()
			- You *SHOULD NOT* run the update() method after every individual element is added, but rather *once* after the creation of all your elements

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

/** TODO
	check to see if canvas ID already exists

	*** ELIMINATE addShape._type - figure out the kind of thing based on the parameters

	add textBaseline so that all the text offset business isn't necessary

	*/

function CanvasDrawerStage(id, target, css, styles, display, qualityScale) {

	/**	Object: elements
			Object containing all of the drawing elements created by the CanvasDrawerStage.addImage(), CanvasDrawerStage.addShape(), and CanvasDrawerStage.addText() methods.
			*/

	/**	Object: elementsLength
		Number of total elements
		*/

	/**	Object: tween
		Object containing functions to create a paused TweenLite animation which will re-draw this CanvasDrawer on tween.start()

		Available functions, which use the exact same parameters and formatting in TweenLite tweens, are:
		- tween.to();
		- tween.from();
		- tween.fromTo();
		- tween.set();

		See:
		http://greensock.com/docs/#/HTML5/GSAP/TweenLite/

		EXAMPLES::
		
		(start code)
		// referring to an object to tween directly through the elements object
		_canvasDrawerInstance.tween.to(_canvasDrawerInstance.elements.circle, 1, {rotation: 360, width: 100, delay: 5 });

		// referring to an object to tween by its ID, which should be a string
		_canvasDrawerInstance.tween.from('arc', 1, {rotation: 360, width: 100, delay: 5 });
		_canvasDrawerInstance.tween.start();
		(end)

		USED AS AN ALTERNATIVE TO:: 
		- TweenLite.to(_canvasDrawerInstance.elements.circle, 3, {rotation: 360, width: 100, delay: 5, *onUpdate: _canvasDrawerInstance.update.bind(_canvasDrawerInstance)*});
		- TweenLite.to(_canvasDrawerInstance.elements.arc, 3, {rotation: 360, width: 100, delay: 5, *onUpdate: _canvasDrawerInstance.update.bind(_canvasDrawerInstance)*});

		*THE REASON FOR THIS*: notice how directly calling TweenLite requires an *onUpdate* function for each tween?
		- Doing so calls CanvasDrawerStage.update() simultaneously from two sources (one per tween; in this case, two in total), increasing the work done to clear and re-draw the canvas 

		- Using TweenLite.to() instead of CanvasDrawer.tween.to() might make sense for single tweens, but not multiple starting at the same time
		*/

	/**	Method: tween.start()
		Starts tweening all tweens created by CanvasDrawer.tween and creates a dummy tween which runs CanvasDrawerStage.update() so drawings will get cleared and re-drawn
		
		args - 		an object with accepts parameters for overall tween

		(start code)
		args = {
					delay: 				a NUMBER by which to delay the entirety of a CanvasDrawer tween; defaults to 0
					timePadding: 		a NUMBER by which to pad the total duration of a CanvasDrawer tween. Useful if a tween appears to be completing early; defaults to 0
					onStart: 			a FUNCTION to run at the beginning of the CanvasDrawer tween
					onStartParams: 		an ARRAY of paramters for the onStart function
					onUpdate: 			a FUNCTION to run during the life of the CanvasDrawer tween
					onUpdateParams: 	an ARRAY of paramters for the onUpdate function
					onComplete: 		a FUNCTION to run at the conclussion of the CanvasDrawer tween
					onCompleteParams: 	an ARRAY of paramters for the onComplete function
		}
		(end code)

		EXAMPLES::

		(start code)
		_canvasDrawerInstance.tween.to(_canvasDrawerInstance.elements.circle, 1, {rotation: 360, width: 100, delay: 5 });
		_canvasDrawerInstance.tween.to(_canvasDrawerInstance.elements.arc, 1, {rotation: 360, width: 100, delay: 5 });
		_canvasDrawerInstance.tween.start( { delay: 2, timePadding: 0.02, onUpdate: trace, onUpdateParams:['look at this tween go!'] } );
		(end)
		*/

	/** Method: tween.kill()
		Kills all active tweens of this CanvasDrawer instance; clears CanvasDrawer.allTweens as well

		EXAMPLES::
		
		(start code)
		// referring to an object to tween directly through the elements object
		_canvasDrawerInstance.tween.to('circle', 1, {rotation: 360, width: 100, delay: 5 });
		_canvasDrawerInstance.tween.start();

		_canvasDrawerInstance.tween.kill();
		(end)

		*/

	var CDS = this;

	CDS.qualityScale = qualityScale;

	css.width *= CDS.qualityScale;
	css.height *= CDS.qualityScale;

	CDS.canvas = Markup.addCanvas({
		id: id,
		target: target,
		css: css,
		styles: styles
	}, display);

	if (CDS.qualityScale !== 1) {
		TweenLite.set(CDS.canvas, {
			scale: 1 / CDS.qualityScale,
			transformOrigin: '0% 0%'
		});
	}

	CDS.ctx = CDS.canvas.getContext('2d');

	CDS.elements = {};
	CDS.allTweens = {};
	CDS.allTweensSize = 0;
	CDS.elementsLength = 0;
	CDS.dummyTween;

	CDS.tween = {
		to: function(target, time, args) {
			CDS._tweenEngine('to', [target, time, args]);
		},
		from: function(target, time, args) {
			CDS._tweenEngine('from', [target, time, args]);
		},
		fromTo: function(target, time, argsFrom, argsTo) {
			CDS._tweenEngine('fromTo', [target, time, argsFrom, argsTo]);
		},
		set: function(target, args) {
			CDS._tweenEngine('set', [target, args]);
		},
		start: function(args) {
			CDS._tweenStart(args);
		},
		kill: function() {
			CDS._tweenKill();
		}
	}

	Object.defineProperty(CDS, 'width', {
		get: function() {
			return CDS.canvas.width / CDS.qualityScale;
		},
		set: function(value) {
			CDS.canvas.width = value * CDS.qualityScale;
		}
	});

	Object.defineProperty(CDS, 'height', {
		get: function() {
			return CDS.canvas.height / CDS.qualityScale;
		},
		set: function(value) {
			CDS.canvas.height = value * CDS.qualityScale;
		}
	});

}

CanvasDrawerStage.prototype = {

	/**	Method: addImage()
			Add a canvas or bitmap image source to the drawer based on a given object, and return a reference to that CanvasDrawerElement; requires ImageManager.js

			imgObj				- an object containing the arguments for defining / orienting the image
								
			(start code)
			imgObj = 	{
							source: 	a canvas element (CanvasDrawerInstance.canvas or CanvasDrawerInstance, NOT the ID of the DOM object), an image ID to be used by ImageManager.get(), or ImageManager.get('id')
							id: 		STRING which defines the name by which the image will be referenced,

							params: 	an OBJECT of optional parameters

							params = {
								sourceX: 		left X NUMBER from where to get the image data, 
								sourceY: 		top Y NUMBER from where to get the image data,
								sourceW: 		NUMBER width value from where to get the image data, 
								sourceH: 		NUMBER height value from where to get the image data,
	
								x: 				NUMBER X coordinate for where to draw the image data,
								y: 				NUMBER Y coordinate for where to draw the image data, 
								width: 			NUMBER width value for how wide to draw the image, 
								height: 		NUMBER height value for how tall to draw the image,
								scaleX: 		NUMBER for X scale of the drawing, scaling from drawing center,
								scaleY: 		NUMBER for Y scale of the drawing, scaling from drawing center,
								rotation: 		NUMBER IN DEGREES for the start rotation of the given drawing,
								alpha: 			NUMBER for alpha of the drawing,
								dropShadow: 	an optional OBJECT defining properties of the image's drop shadow
									dropShadow = {
										angle: 		NUMBER IN DEGREES for the angle to position the shadow,
										distance: 	NUMBER for how far away from the image the shadow is,
										blur: 		NUMBER for how blurry the shadow is,
										color: 		optional color of shadow as either a HEX STRING :"#ff0000", RGB/A STRING: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)", or an RGB/A OBJECT:{r:255,g:0,b:0} / {r:255,g:0,b:0,a:1}; Defaults to '#000000',
										alpha: 		NUMBER for the alpha of the shadow; Defaults to 1, overrides the alpha of an RGBA color.
									}
							}

							blendMode: 			an optional STRING for the globalCompositeOperation - controls overlays, screens, multiply, masking, etc. If undefined, defaults to 'source-over'.
							transformOrigin: 	an optional STRING defining an element's origin for scale and rotation, written as two values in a string with either a '%' or 'px' marker. Defaults to '50% 50%'.
							isActive: 			an optional BOOLEAN that, when set to false, will not render the element. Defaults to true.
						}
						(end)
			
			
			EXAMPLES:: 

			Defining an image source: 
				define a source either with the image name or the ImageUtil.get() return

					(start code)
					_canvasDrawerInstance.addImage({
						source: 'smoke',
						id: 'smoke',
						params: {
							x: 0,
							y: 0,
							width: 256,
							height: 256
						}
					});

					var _myImage = _canvasDrawerInstance.addImage({
						source: ImageManager.get('smoke'),
						id: 'smoke',
						params: {
							x: 0,
							y: 0,
							width: 256,
							height: 256
						}
					});

					_canvasDrawerInstance.update();
					(end)

				define a source with an existing canvas element by referring to the CanvasDrawer or the CanvasDrawer's HTMLCanvasElement element directly

				(start code)
				var originalCD = CanvasDrawer.create({
					id: 'myCanvasDrawer', 
					target: adData.elements.redAdContainer,
					css: {
						left:0,
						top:0,
						width: 300,
						height:	250
					},
					display: true, 
					debug: false
				});

				// referring to the CanvasDrawer object
				var _myImage = _canvasDrawerInstance.addImage({
					source: originalCD,
					id: 'smoke',
					params: {
						x: 0,
						y: 0,
						width: 256,
						height: 256
					}
				});

				// referring to the CanvasDrawer object's HTMLCanvasElement element
				var _myImage2 = _canvasDrawerInstance.addImage({
					source: originalCD.canvas,
					id: 'smoke2',
					params: {
						x: 0,
						y: 0,
						width: 256,
						height: 256
					}
				});

				_canvasDrawerInstance.update();
				(end)
				*/
	addImage: function(imgObj) {

		imgObj.params = imgObj.params || {};

		var CDS = this,
			_isSourceCanvas = CDS._getIsSourceCanvas(imgObj.source),
			_dItem = new CanvasDrawerElement(CDS, imgObj, 'image');

		_dItem.src = _isSourceCanvas ? (imgObj.source.tagName === 'CANVAS' ? imgObj.source : imgObj.source.canvas) : (imgObj.source.tagName === 'IMG' ? imgObj.source : ImageManager.get(imgObj.source));

		_dItem.sourceX = imgObj.params.sourceX || 0;
		_dItem.sourceY = imgObj.params.sourceY || 0;
		_dItem.sourceW = imgObj.params.sourceW || _dItem.src.width;
		_dItem.sourceH = imgObj.params.sourceH || _dItem.src.height;

		_dItem.width = imgObj.params.width || _dItem.src.width / CDS.qualityScale;
		_dItem.height = imgObj.params.height || _dItem.src.height / CDS.qualityScale;
		_dItem.x = imgObj.params.x || imgObj.params.left || 0;
		_dItem.y = imgObj.params.y || imgObj.params.top || 0;

		CDS.setTransformOrigin(_dItem, imgObj.transformOrigin || '50% 50%');

		return _dItem;
	},

	/**	Method: addShape()
		Add an arc, rectangle, or series of line coordinates to the drawer based on a given object, and return a reference to that CanvasDrawerElement

		shapeObj 				- an object containing the arguments for defining / orienting the shape

		(start code)
		shapeObj =	{
						type: 			STRING determining the kind of shape to draw: CanvasDrawType.CIRC, CanvasDrawType.RECT, CanvasDrawType.PATH,
						id: 			STRING which defines the name by which the shape will be referenced,

						params:			ARRAY of arguments defining the shape of the shape (see below for more detail),

						params = {
							x: 				NUMBER X coordinate for where to draw the image data,
							y: 				NUMBER Y coordinate for where to draw the image data,
							scaleX: 		NUMBER for X scale of the drawing, scaling from drawing center,
							scaleY: 		NUMBER for Y scale of the drawing, scaling from drawing center,
							rotation: 		NUMBER IN DEGREES for the start rotation of the given drawing,
							alpha: 			NUMBER for alpha of the drawing
							dropShadow: 	an optional OBJECT defining properties of the shape's drop shadow
								dropShadow = {
									angle: 		NUMBER IN DEGREES for the angle to position the shadow,
									distance: 	NUMBER for how far away from the shape the shadow is,
									blur: 		NUMBER for how blurry the shadow is,
									color: 		optional color of shadow as either a HEX STRING :"#ff0000", RGB/A STRING: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)", or an RGB/A OBJECT:{r:255,g:0,b:0} / {r:255,g:0,b:0,a:1}; defaults to '#000000',
									alpha: 		NUMBER for the alpha of the shadow; Defaults to 1, overrides the alpha of an RGBA color.
								}
						}

						blendMode: 			an optional STRING for the globalCompositeOperation - controls overlays, screens, multiply, masking, etc. If undefined, defaults to 'source-over'.
						fill: 				an optional STRING or gradiant variable defining the color fill of the shape. If undefined, defaults to none / invisible.
						stroke: 			an optional OBJECT defining properties of the shape's stroke
							stroke = {
								fill, : 	an optional STRING or gradiant variable defining the color fill of the shape stroke. If undefined, defaults to  none / invisible.
								width: 		an optional NUMBER value determining stroke width. If undefined, defaults to 0.
								position: 	an optional STRING determining if the stroke will be 'outer' or 'center'. Defaults to 'outer', there is no 'inner'.
								cap: 		an optional STRING value determining a line's cap style: 'butt', 'round', and 'square'. If undefined, defaults to 'butt'.
								(end)
						(see canvasdrawer/lineCap.jpg)
						(start code)
		(stroke cont)			
								join: 		an optional STRING value determining how two lines/corners connect: 'round', 'bevel', and 'miter'. If undefined, defaults to 'miter'.
								(end)
						(see canvasdrawer/lineJoin.jpg)
		(start code)
		(stroke cont)			
								dashSize: 	an optional NUMBER value determining the length of each segment in a dashed line.
								dashGap: 	an optional NUMBER value determining the gap between each segment in a dashed line. Defaults to 0, unless dashSize is defined, then defaults to dashSize.
								dashOffset: an optional NUMBER value which offsets the positioning of the dash segments. A positive number moves them counter-clockwise; defaults to 0.
							} 		
						transformOrigin: 	an optional STRING defining an element's origin for scale and rotation, written as two values in a string with either a '%' or 'px' marker. CanvasDrawType.RECT defaults to '0% 0%', others to '50% 50%'.
						drawScale: 			an optional NUMBER which sizes up a CanvasDrawType.PATH shape based on a scale percentage. Usefull for changing a shape's size without the need to scaleX or scaleY, or recalculate points.
						isActive: 			an optional BOOLEAN that, when set to false, will not render the element. Defaults to true.
					}
					(end)

		NOTE:: 
		- shapeObj.params.width and shapeObj.params.height values for shapeObj do not affect the width and height: those values should be defined in the shape's arguments
				
		- x, y, width, and height properties *will* be defined when the shape is created internal to this class based on the arguments given, and you can manipulate them later *EXCEPT...*

		- width and height properties do NOT affect CanvasDrawType.PATH - use scaleX and scaleY to manipulate the size of these objects

		
		EXAMPLES::

		adding an semi-circle arc with a red fill and no lines::
		params is an OBJECT of arguments for an arc: 
		
		(start code)
		params = {
					x: ARC CENTER X, 
					y: ARC CENTER Y, 
					radius: ARC RADIUS,
					width: ARC DIAMETER (overrides radius), 
					startRad: RADIANS for starting angle, 
					endRad: RADIANS for ending angle
					startAngle: DEGREES for starting angle (overrides startRad), 
					endAngle: DEGREES for ending angle (overrides endRad), 
				};
		(end)

			(start code)
			var _myShape = _canvasDrawerInstance.addShape({
				type: CanvasDrawType.CIRC,
				id: 'myCircle', 
				params: {
					x: 150,
					y: 125,
					radius: 100,
					startRad: MathUtils.toRadians(0),
					endRad: MathUtils.toRadians(180)
				},
				fill: 'red'
			});

			_canvasDrawerInstance.update();
			(end)

		adding the same circle using WIDTH and DEGREES instead of RADIUS and RADIANS::

			(start code)
			var _myShape = _canvasDrawerInstance.addShape({
				type: CanvasDrawType.CIRC, 
				id: 'myCircle', 
				params: {
					x:150, 
					y:125, 
					width:200, 
					startAngle:0, 
					endAngle:180 
				}, 
				fill: 'red'
			});

			_canvasDrawerInstance.update();
			(end)

		adding a rectangle with an overlay blend, blue fill, 5px yellow stroke::
			params is an OBJECT of arguments for a rect:

			(start code)
			params = {
						x: LEFT position value, 
						y: TOP position value, 
						width: box WIDTH, 
						height: box HEIGHT 
					};
			(end)

			(start code)
			var _myShape = _canvasDrawerInstance.addShape({
				type: CanvasDrawType.RECT,
				id: 'myRect',
				params: {
					x: 20,
					y: 20,
					width: 100,
					height: 100
				},
				blendMode: 'overlay',
				fill: 'blue',
				stroke: {
					fill: 'yellow',
					width: 5
				}
			});

			_canvasDrawerInstance.update();
			(end)

		adding a shape defined by lines with a screen blend, red fill, 10px black stroke: : 
			params is an ARRAY of objects for a shape:

			(start code)
			params = {
						x: HORIZONTAL position value of shape's center point, 
						y: VERTICAL position value of shape's center point, 
						points: [ 
									{fun: a STRING reference to the line function to use, points: [ Array contains whatever points the line function requires ] }
							 	]
					};
			(end)

			fun: CanvasLineTo.MOVE (or 'moveTo') requires ONE x-y value - points: [x1, y1]
			fun: CanvasLineTo.LINE (or 'lineTo') requires ONE x-y value - points: [x1, y1]
			fun: CanvasLineTo.ARC (or 'arcTo') requires TWO x-y values and ONE radius of the arc value - points: [x1, y1, x2, y2, radius]
			fun: CanvasLineTo.QUAD (or 'quadraticCurveTo') requires TWO x-y values - points: [x1, y1, x2, y2]
			fun: CanvasLineTo.BEZIER (or 'bezierCurveTo') requires THREE x-y values - points: [x1, y1, x2, y2, x3, y3]

			(start code)
			var _myShape = _canvasDrawerInstance.addShape({
				type: CanvasDrawType.PATH,
				id: 'myLines',
				params: {
					points: [
							{ fun: CanvasLineTo.MOVE, 	points: [.5, -3.5] }, 
							{ fun: CanvasLineTo.BEZIER, points: [-3.5, -2.8, -3, .2, -2.5, .2] }, 
							{ fun: CanvasLineTo.QUAD, 	points: [2, -3, .5, -3.5] }
					]
				},
				blendMode: 'screen',
				fill: 'red',
				stroke: {
					fill: 'black',
					width: 10,
					cap: 'round'
				}
			});

			_canvasDrawerInstance.update();
			(end)
			*/
	addShape: function(shapeObj) {
		var CDS = this,
			_dItem = new CanvasDrawerElement(CDS, shapeObj);

		_dItem.drawScale = shapeObj.drawScale || 1;

		_dItem.fill = shapeObj.fill;

		_dItem.strokeFill = shapeObj.stroke.fill || null;
		_dItem.strokeWidth = shapeObj.stroke.width || 0;
		_dItem.strokeCap = shapeObj.stroke.cap || 'butt';
		_dItem.strokeJoin = shapeObj.stroke.join || 'miter';
		_dItem.strokeDashSize = shapeObj.stroke.dashSize || 10000;
		_dItem.strokeDashGap = shapeObj.stroke.dashGap || 0;
		_dItem.strokeDashOffset = shapeObj.stroke.dashOffset || 0;
		_dItem.strokePosition = shapeObj.stroke.position || 'outer';

		if (_dItem.strokeDashGap === 0 && _dItem.strokeDashSize != 10000) _dItem.strokeDashGap = _dItem.strokeDashSize;

		CDS._setDrawArgs(_dItem, shapeObj.params || [0, 0, 0, 0, 0], shapeObj);

		return _dItem;
	},



	/**	Method: addText()
			Add a text field to the drawer based on a given object, and return a reference to that CanvasDrawerElement

			textObj 				- an object containing the arguments for defining / orienting the text

			(start code)
			textObj =	{
							id: 			STRING which defines the name by which the text will be referenced,

							css = {
								x: 				NUMBER X coordinate for where to draw the image data,
								y: 				NUMBER Y coordinate for where to draw the image data,
								fontSize: 		NUMBER or STRING (12, '12', '12px', or '12pt') representing the font size,
								fontFamily: 	STRING defining the font name,
								textAlign: 		STRING defining text's horizontal alingment: 'center', 'left', or 'right',
								scaleX: 		NUMBER for X scale of the text, scaling from drawing center unless transformOrigin is changed,
								scaleY: 		NUMBER for Y scale of the text, scaling from drawing center unless transformOrigin is changed,
								rotation: 		NUMBER IN DEGREES for the start rotation of the text,
								alpha: 			NUMBER for alpha of the drawing,
								dropShadow: 	an optional OBJECT defining properties of the text's drop shadow
									dropShadow = {
										angle: 		NUMBER IN DEGREES for the angle to position the shadow,
										distance: 	NUMBER for how far away from the text the shadow is,
										blur: 		NUMBER for how blurry the shadow is,
										color: 		optional color of shadow as either a HEX STRING :"#ff0000", RGB/A STRING: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)", or an RGB/A OBJECT:{r:255,g:0,b:0} / {r:255,g:0,b:0,a:1}; defaults to '#000000',
										alpha: 		NUMBER for the alpha of the shadow; Defaults to 1, overrides the alpha of an RGBA color.
									},
								marginLeft: 	NUMBER providing offset on X coordinate for text,
								marginTOP: 		NUMBER providing offset on Y coordinate for text,
								maxWidth: 		NUMBER which determines the maximum width of the text field, which is used to create MUTLI-LINE text,
								lineHeight: 	NUMBER which determines the line height between lines of text with defined maxWidth values

							}

							blendMode: 			an optional STRING for the globalCompositeOperation - controls overlays, screens, multiply, masking, etc. If undefined, defaults to 'source-over'.
							fill: 				an optional STRING or gradiant variable defining the color fill of the text. If undefined, defaults to none / invisible.
							stroke: 			an optional OBJECT defining properties of the shape's stroke
								stroke = {
									fill, : 	an optional STRING or gradiant variable defining the color fill of the shape stroke. If undefined, defaults to  none / invisible.
									width: 		an optional NUMBER value determining stroke width. If undefined, defaults to 0.
									position: 	an optional STRING determining if the stroke will be 'outer' or 'center'. Defaults to 'outer', there is no 'inner'.
									join: 		an optional STRING value determining how two lines/corners connect: 'round', 'bevel', and 'miter'. If undefined, defaults to 'miter'.
									(end)
							(see canvasdrawer/lineJoin.jpg)
			(start code)
			(stroke cont)			
									dashSize: 	an optional NUMBER value determining the length of each segment in a dashed line.
									dashGap: 	an optional NUMBER value determining the gap between each segment in a dashed line. Defaults to 0, unless dashSize is defined, then defaults to dashSize.
								}
							transformOrigin: 	an optional STRING defining an element's origin for scale and rotation, written as two values in a string with either a '%' or 'px' marker. Defaults to '0% 0%'.
							isActive: 			an optional BOOLEAN that, when set to false, will not render the element. Defaults to true.
						}
						(end)

			NOTE:: 
				- transformOrigin is based on the text alignment. '0% 0%' for text aligned right will be at that text's TOP-RIGHT, '100% 0%' would be its TOP-LEFT. Centered and left-aligned text's '0% 0%' is its TOP-LEFT.

			EXAMPLES::

			adding a red text field with a 4px outer stroke

				(start code)
				var _myText = _canvasDrawerInstance.addText({
					id: 'textItem',
					copy: 'Watch the Trailer',
					css: {
						x: 0,
						y: 0,
						fontSize: 40,
						fontFamily: 'FuturaBold',
						textAlign: 'left',
						marginLeft: -5,
						marginTop: 5,
						maxWidth: 50,
						lineHeight: 100
					},
					fill: 'red',
					stroke: {
						fill: 'yellow',
						position: 'outer',
						width: 4
					}
					blendMode: CanvasBlendMode.OVERLAY
				});

				_canvasDrawerInstance.update();
				(end)
				*/
	addText: function(textObj) {
		textObj.params = textObj.css || {};

		var CDS = this,
			_dItem = new CanvasDrawerElement(CDS, textObj, 'text');

		_dItem.copy = textObj.copy;

		_dItem.maxWidth = textObj.params.maxWidth || null;

		_dItem.fontFamily = textObj.params.fontFamily || '_serif';
		_dItem.fontSize = textObj.params.fontSize >= 0 ? Number(textObj.params.fontSize.toString().replace(/px/g, '').replace(/pt/g, '')) : 12;

		_dItem.x = textObj.params.x || textObj.params.left || 0;
		_dItem.y = textObj.params.y || textObj.params.top || 0;

		_dItem.marginLeft = textObj.params.marginLeft || 0;
		_dItem.marginTop = textObj.params.marginTop || 0;

		_dItem.textAlign = textObj.params.textAlign || 'left';

		if (_dItem.textAlign === 'centered') _dItem.textAlign = 'center';

		_dItem.fill = textObj.fill;

		_dItem.strokeFill = textObj.stroke.fill || null;
		_dItem.strokeWidth = textObj.stroke.width || 0;
		_dItem.strokeJoin = textObj.stroke.join || 'round';
		_dItem.strokeDashSize = textObj.stroke.dashSize || 10000;
		_dItem.strokeDashGap = textObj.stroke.dashGap || 0;
		_dItem.strokeDashOffset = textObj.stroke.dashOffset || 0;
		_dItem.strokePosition = textObj.stroke.position || 'outer';

		if (_dItem.strokeDashGap === 0 && _dItem.strokeDashSize != 10000) _dItem.strokeDashGap = _dItem.strokeDashSize;

		_dItem.transOffsetX = 0;
		_dItem.transOffsetY = 0;

		//_dItem.letterSpacing = textObj.params.letterSpacing || _dItem.fontSize / 2;
		_dItem.lineHeight = textObj.params.lineHeight || _dItem.fontSize * 0.75;
		_dItem.maxWidth = textObj.params.maxWidth || 100000;


		// THESE ARE PROPERTIES THAT WOULD NECESITATE RECALCULATING THE TEXT'S WIDTH, HEIGHT, POSITIONING, OR OTHER VALUES TO DRAW
		_dItem.deltaProps = {
			fontFamily: 'empty',
			fontSize: 'empty',
			lineHeight: 'empty',
			maxWidth: 'empty',
			marginLeft: 'empty',
			marginTop: 'empty',
			strokeWidth: 'empty',
			textAlign: 'empty',
			transOffsetX: 'empty',
			transOffsetY: 'empty',
			// x: 'empty',
			// y: 'empty',
			// scaleX: 'empty',
			// scaleY: 'empty',
			// rotation: 'empty'
		}

		_dItem.drawProps = {

			// THESE VALUES ARE ONES THAT WOULD GET RECALCULATED CONSTANTLY, SO WE'RE STORING THEM
			drawX: 'empty',
			drawY: 'empty',
			offsetX: 'empty',
			offsetY: 'empty',
			strokeOffset: 'empty',

			// the final string to be output
			copy: 'empty'

		}

		CDS.ctx.font = _dItem.fontSize + 'px ' + _dItem.fontFamily;

		CDS._wrapText(_dItem, false, false)
		var _originDefault;
		switch (_dItem.textAlign) {
			case 'left':
				_originDefault = '0% 0%';
				break;
			case 'right':
				_originDefault = '0% 0%';
				break;
			case 'center':
				_originDefault = '50% 0%';
				break;

		}
		CDS.setTransformOrigin(_dItem, textObj.transformOrigin || _originDefault);


		CDS.ctx.font = null;

		return _dItem;

	},
	/**	Method: setTransformOrigin()
			Removes a specific CanvasDrawer.elements by given ID

			element				- the STRING ID or direct reference to a CanvasDrawer.element object to affect
			str 				- a STRING defining an element's origin for scale and rotation, written as two values in a string with either a '%' or 'px' marker, with the first value representing X and the second Y.
			

			NOTE::

				- '50% 50%' is centered, based on percentage.
				- '50px 50px' is 50 px away from '0% 0%' vertically and horizontally.
				- '50 50' is the same as '50px 50px'.
				- Values can be mixed: '50% 10px', for instance.

			EXAMPLES::

			(start code)
			_canvasDrawerInstance.setTransformOrigin('smoke', '50% 50%');
			_canvasDrawerInstance.setTransformOrigin(_canvasDrawerInstance.elements.smoke, '10px 100px');
			_canvasDrawerInstance.setTransformOrigin(_canvasDrawerInstance.elements.smoke, '10 100');
			(end)
			*/
	setTransformOrigin: function(element, str) {
		var CDS = this,
			_xTran = str.split(' ')[0],
			_yTran = str.split(' ')[1],
			_dItem = (typeof element === 'string') ? CDS.elements[element] : element;

		// REMOVE ALL STRING ELEMENTS FROM THE transformOrigin VALUE AND CONVERT TO A PERCENTAGE OF THE element's WIDTH AND HEIGHT
		if (_xTran.indexOf('%') >= 0) {
			_xTran = +_xTran.replace(/%/g, '') / 100;
		} else if (_xTran.indexOf('px') >= 0) {
			_xTran = +_xTran.replace(/px/g, '') / _dItem.width;
		} else {
			_xTran = +_xTran / _dItem.width;
		}

		if (_yTran.indexOf('%') >= 0) {
			_yTran = +_yTran.replace(/%/g, '') / 100;
		} else if (_yTran.indexOf('px') >= 0) {
			_yTran = +_yTran.replace(/px/g, '') / _dItem.height;
		} else {
			_yTran = +_yTran / _dItem.height;
		}


		switch (_dItem._type) {
			case 'arc':
			case 'path':
				_xTran -= 0.5;
				_yTran -= 0.5;
			default:
				_dItem.offsetX = _dItem.width * _xTran;
				_dItem.offsetY = _dItem.height * _yTran;
				break;
			case 'text':
				// THE OFFSET VALUE FOR text OBJECTS IS BEING SET HERE BECAUSE THE ACTUAL width AND height OF THE TEXT IS YET UNKNOWN
				_dItem.transOffsetX = _xTran;
				_dItem.transOffsetY = _yTran;

				switch (_dItem.textAlign) {
					case 'center':
						_dItem.transOffsetX -= 0.5;
						break;
					case 'right':
						_dItem.transOffsetX *= -1;
						break;
				}

				CDS._wrapText(_dItem, false, false)
				break;
		}
	},

	/**	Method: removeElement()
		Removes a specific CanvasDrawer.elements by given element or its ID

		id 						- the STRING ID used to reference an element or a reference to the ELEMENT itself

		EXAMPLES::

		(start code)
		_canvasDrawerInstance.removeElement('smoke');
		_canvasDrawerInstance.removeElement(_canvasDrawerInstance.elements.smoke);
		(end)
		*/
	removeElement: function(target) {
		var CDS = this;
		CDS.elementsLength--;
		if (target.id) delete CDS.elements[target.id];
		else delete CDS.elements[target];
	},

	/**	Method: removeAllItems()
		Removes every CanvasDrawer.elements

		EXAMPLES::

		(start code)
		_canvasDrawerInstance.removeAllItems();
		(end)
		*/
	removeAllItems: function() {
		var CDS = this;
		for (var dI in CDS.elements) {
			CDS.elementsLength--;
			delete CDS.elements[dI];
		}
		CDS.elementsLength = 0;
	},

	/** Method: makeLinearGradient()
		Returns a linear gradient between two given points as part of thie CanvasDrawer's context element

		x1 						- X coordinate of start of gradient
		y1 						- Y coordinate of start of gradient
		x2 						- X coordinate of end of gradient
		y2 						- Y coordinate of end of gradient
		colors					- ARRAY of objects: {stop: Percentage from 0-1 inclusive for where the color is at its maximum value, color: 'rgb()' or 'rgba()' string of color values }

		EXAMPLES::

		adding a 100x100 rectangle at 0, 0 with a linear gradient going from coordinate 0,0 to coordinate 0,100 fading from solid black to transparent black: : 

		(start code)
		var _canvasDrawerInstance = CanvasDrawer.create({
			id: 'myCanvasDrawer', 
			target: adData.elements.redAdContainer,
			css: {
				left:0,
				top:0,
				width: 300,
				height:	250
			},
			display: true, 
			debug: false
		});

		var gradient = _canvasDrawerInstance.makeLinearGradient({
			xStart: 0,
			yStart: 0,
			xEnd: 0, 
			yEnd: 200, 
			colors: [	{stopVal: 0, color: 'rgb(0, 0, 0)'},
						{stopVal: 1, color: 'rgba(0, 0, 0, 0)'}
					]
		});
		_canvasDrawerInstance.addShape({
			type: CanvasDrawType.RECT,
			id: 'myRect',
			params: {
				x: 0,
				y: 0,
				width: 100,
				height: 100
			},
			fill: gradient,
		});
		(end) 
		*/
	makeLinearGradient: function(args) {
		var CDS = this,
			grd = CDS.ctx.createLinearGradient(args.xStart, args.yStart, args.xEnd, args.yEnd);
		for (var i = 0; i < args.colors.length; i++) grd.addColorStop(args.colors[i].stopVal, args.colors[i].color)
		return grd;
	},

	/** Method: makeRadialGradient()
		Returns a radial gradient between two given points as part of thie CanvasDrawer's context element

		x1 						- X coordinate of start of gradient
		y1 						- Y coordinate of start of gradient
		rad1					- Radius of start color of gradient
		x2 						- X coordinate of end of gradient
		y2 						- Y coordinate of end of gradient
		rad2					- Radius of end color of gradient
		colors					- ARRAY of objects: {stop: Percentage from 0-1 inclusive for where the color is at its maximum value, color: 'rgb()' or 'rgba()' string of color values }

		EXAMPLES::

		adding a circle with a radius of 400 at 0, 0 with a radial gradient starting from a radius of 50 to a radius of 200 and fading from solid red to transparent green: : 

		(start code)
		var _canvasDrawerInstance = CanvasDrawer.create({
			id: 'myCanvasDrawer', 
			target: adData.elements.redAdContainer,
			css: {
				left:0,
				top:0,
				width: 300,
				height:	250
			},
			display: true, 
			debug: false
		});

		var gradient = _canvasDrawerInstance.makeRadialGradient({
			xInner: 0,
			yInner: 0,
			radiusInner: 50,
			xOuter: 0,
			yOuter: 0,
			radiusOuter: 200,
			colors: [ 	{stopVal: 0, color: 'rgb(255, 0, 0)'},
							{stopVal: 1, color: 'rgba(0, 255, 0, 0)'} 
						]
		});
		_canvasDrawerInstance.addShape({
			type: CanvasDrawType.CIRC,
			id: 'myCircle',
			params: {
				x:0,
				y:0,
				radius: 400,
				startAngle: 0,
				endAngle: 360
				}, 
			fill: gradient
		});
		(end)
		*/
	makeRadialGradient: function(args) {
		var CDS = this,
			grd = CDS.ctx.createRadialGradient(args.xInner, args.yInner, args.radiusInner, args.xOuter, args.yOuter, args.radiusOuter);
		for (var i = 0; i < args.colors.length; i++) grd.addColorStop(args.colors[i].stopVal, args.colors[i].color)
		return grd;
	},

	/** Method: makePattern()
		Returns a pattern given an image source and repeat style

		img 					- A canvas element (CanvasDrawerInstance.canvas or CanvasDrawerInstance, NOT the ID of the DOM object), an image ID to be used by ImageManager.get(), or ImageManager.get('id')
		repeat					- STRING determining repeat style (See: CanvasDrawType)

		EXAMPLES::

		adding a circle with a radius of 400 at 0, 0 with a pattern from an image named 'tileJPG' which only repeats horizontally

		(start code)
		var _canvasDrawerInstancePattern = CanvasDrawer.create({
			id: 'myCanvasDrawer', 
			target: adData.elements.redAdContainer,
			css: {
				left:0,
				top:0,
				width: 300,
				height:	250
			},
			display: true, 
			debug: false
		});

		var _canvasDrawerInstancePattern = _canvasDrawerInstance.makePattern({
			source: 'tileJPG', 
			repeat: CanvasDrawType.REPEAT_X
		});
		_canvasDrawerInstancePattern.addShape({
			type: CanvasDrawType.CIRC,
			id: 'myCircle', 
			params: {
				x: 0,
				y: 0,
				radius: 400,
				startAngle: 0,
				endAngle: 360
			},
			fill: pattern
		});
		(end)

		adding a circle with a radius of 400 at 0, 0 with a pattern from an the above canvas source which repeats horizontally and vertically

		(start code)
		var _canvasDrawerInstanceCanvasPattern = CanvasDrawer.create({
			id: 'myCanvasDrawer', 
			target: adData.elements.redAdContainer,
			css: {
				left:0,
				top:0,
				width: 300,
				height:	250
			},
			display: true, 
			debug: false
		});

		var pattern = _canvasDrawerInstance.makePattern({
			source: _canvasDrawerInstancePattern.canvas,
			repeat: CanvasDrawType.REPEAT
		});

		_canvasDrawerInstanceCanvasPattern.addShape({
			type: CanvasDrawType.CIRC,
			id: 'myCircle',
			params: {
				x: 0,
				y: 0,
				radius: 400,
				startAngle: 0,
				endAngle: 360
			},
			fill: pattern
		});
		(end)
		*/
	makePattern: function(args) {
		var CDS = this,
			_img = args.source,
			_repeat = args.repeat || 'repeat',
			_isSourceCanvas = CDS._getIsSourceCanvas(_img),
			_imgSrc = _isSourceCanvas ? (_img.tagName === 'CANVAS' ? _img : _img.canvas) : (_img.tagName === 'IMG' ? _img : ImageManager.get(_img)),
			_pattern = CDS.ctx.createPattern(_imgSrc, _repeat);

		return _pattern;
	},

	/**	Method: update()
		Clear and draw all draw items associated with this CanvasDrawer

		will not draw the item if elements.isActive !== true or elements.alpha === 0
		*/
	update: function() {
		var CDS = this,
			_dItem;

		CDS.ctx.clearRect(0, 0, CDS.canvas.width, CDS.canvas.height);
		for (var dI in CDS.elements) {
			_dItem = CDS.elements[dI];

			if (_dItem.isActive && _dItem.alpha > 0) {
				CDS.ctx.save();

				var _isArc = _dItem._type === 'arc';

				CDS.ctx.globalAlpha = _dItem.alpha;
				CDS.ctx.globalCompositeOperation = _dItem.blendMode;

				_dItem.rotation = _dItem.rotation % 360;

				var _isTranslated = (_dItem.rotation != 0 || _dItem.scaleX != 1 || _dItem.scaleY != 1);
				if (_isTranslated) {
					//var translation = [_dItem.x, _dItem.y];
					var translation = [(_dItem.x + _dItem.offsetX) * CDS.qualityScale, (_dItem.y + _dItem.offsetY) * CDS.qualityScale];
					CDS.ctx.translate.apply(CDS.ctx, translation);

					if (_dItem.rotation != 0) CDS.ctx.rotate(MathUtils.toRadians(_dItem.rotation));
					if (_dItem.scaleX != 1 || _dItem.scaleY != 1) {
						if (_dItem.scaleX === 0) _dItem.scaleX = 0.000001;
						if (_dItem.scaleY === 0) _dItem.scaleY = 0.000001;
						CDS.ctx.scale(_dItem.scaleX, _dItem.scaleY);
					}
				}

				CDS._drawShape(_dItem, _isArc, _isTranslated);
				CDS.ctx.restore();
			}
		}

		_dItem = null;
	},

	/**	Method: start()
		Adds a FrameRate.js event listener to update the CanvasDrawerStage constantly
		*/
	start: function() {
		var CDS = this;
		FrameRate.register(CDS, CDS.update);
	},

	/**	Method: stop()
		Removes the FrameRate.js event listener
		*/
	stop: function() {
		var CDS = this;
		FrameRate.unregister(CDS, CDS.update);
	},

	/* ------------------------------------------------

	PRIVATE FUNCTIONS!

	NOTHING BELOW HERE SHOULD GET CALLED EXTERNAL TO THIS CLASS

	/* ------------------------------------------------
		The primary engine which handles all the tweening
		
		CALLED ONLY FROM CanvasDrawer.tween();
		*/
	_tweenEngine: function(tweenFun, args) {
		var CDS = this,
			_hasTransform = false,
			_tempStartFun,
			_tranIndex;
		args[0] = (typeof args[0] === 'string') ? CDS.elements[args[0]] : args[0];
		for (var i = 1; i < args.length; i++) {
			if (args[i].transformOrigin) {
				_tranIndex = i;

				switch (tweenFun) {
					case 'set':
					case 'from':
						//CDS.setTransformOrigin(args[0], args[_tranIndex].transformOrigin);
					case 'to':
					case 'fromTo':
						if (args[_tranIndex].onStart) _tempStartFun = args[_tranIndex].onStart;
						CDS._updateOnStart(args, _tranIndex, _tempStartFun);
						break;
				}

				break;
			}
		}


		var _newTween = TweenLite[tweenFun].apply(CDS, args).pause();
		CDS.allTweens['newTween' + CDS.allTweensSize++] = _newTween;
		if (args[args.length - 1].paused === false) CDS._tweenStart();
	},

	/* ------------------------------------------------
			This function updates a drawItem's transformOrigin before a tween begins
			
			CALLED ONLY FROM CanvasDrawerStage._tweenEngine();
			*/
	_updateOnStart: function(args, index, startFun) {
		var CDS = this;
		args[index].onStart = function() {
			if (startFun) startFun.apply(CDS, args[index].onStartParams || null);
			CDS.setTransformOrigin(args[0], args[index].transformOrigin);
		}
	},

	/* ------------------------------------------------
		The start function for all of this CanvasDrawerStage's tweens
		
		CALLED ONLY FROM CanvasDrawer.tween.start();
		*/
	_tweenStart: function(args) {
		var CDS = this,
			_duration = 0,
			_tweenDuration,
			_args = args || [];

		for (var dI in CDS.allTweens) {
			CDS.allTweens[dI].delay(CDS.allTweens[dI].delay() + (_args.delay || 0));

			_tweenDuration = CDS.allTweens[dI].duration() + CDS.allTweens[dI].delay();

			if (_tweenDuration > _duration) _duration = _tweenDuration;
			CDS.allTweens[dI].play();
		}

		// dummy tween to clear canvas and draw all elements
		if (CDS.dummyTween) {
			if (_tweenDuration < _duration) _tweenDuration = _duration;
			CDS.dummyTween.kill();
		}

		var _startFun = null,
			_updateFun,
			_completeFun;

		if (_args.onStart) {
			_startFun = function() {
				_args.onStart.apply(this, _args.onStartParams ? _args.onStartParams : null);
			}
		}
		if (_args.onUpdate) {
			_updateFun = function() {
				_args.onUpdate.apply(this, _args.onUpdateParams ? _args.onUpdateParams : null);
				CDS.update();
			}
		} else {
			_updateFun = CDS.update.bind(CDS);
		}

		if (_args.onComplete) {
			_completeFun = function() {
				CDS._tweenKill()
				_args.onComplete.apply(this, _args.onCompleteParams ? _args.onCompleteParams : null);
			}
		} else {
			_completeFun = CDS._tweenKill.bind(CDS);
		}

		_duration += _args.timePadding && _args.timePadding > 0 ? _args.timePadding : 0;
		if (true) {
			CDS.dummyTween = TweenLite.to({}, _duration, {
				onStart: _startFun,
				onUpdate: _updateFun,
				onComplete: _completeFun,
				delay: _args.delay || 0
			});
		}
		//_updateFun();
	},

	/* ------------------------------------------------
		The kill function for all of this CanvasDrawerStage's tweens
		
		CALLED ONLY FROM CanvasDrawer.tween.kill();
		*/

	_tweenKill: function() {
		var CDS = this;

		for (var dI in CDS.allTweens) {
			if (CDS.allTweens[dI]) CDS.allTweens[dI].kill();
			delete CDS.allTweens[dI];
		}

		CDS.allTweens = {};
		CDS.allTweensSize = 0;

		if (CDS.dummyTween) CDS.dummyTween.kill();
		CDS.dummyTween = null;
	},

	/* ------------------------------------------------
		draw the elements into the canvas based on given elements object, whether or not it is an arc, and any translations
		
		CALLED ONLY FROM CanvasDrawerStage.update();
		*/
	_drawShape: function(dItem, isArc, translation) {
		var CDS = this;

		if (dItem.shadowColor && (dItem.shadowBlur > 0 || dItem.shadowDistance != 0)) {
			CDS.ctx.shadowColor = dItem.shadowColor;
			CDS.ctx.shadowOffsetX = dItem._shadowOffsetX * CDS.qualityScale;
			CDS.ctx.shadowOffsetY = dItem._shadowOffsetY * CDS.qualityScale;
			CDS.ctx.shadowBlur = dItem.shadowBlur * CDS.qualityScale;
		}

		// CASE FOR DRAWING AN IMAGE
		if (dItem._type === 'image') {
			try {
				if (translation) {
					CDS.ctx.drawImage(dItem.src, dItem.sourceX, dItem.sourceY, dItem.sourceW, dItem.sourceH, -dItem.offsetX * CDS.qualityScale, -dItem.offsetY * CDS.qualityScale, dItem.width * CDS.qualityScale, dItem.height * CDS.qualityScale);
				} else {
					CDS.ctx.drawImage(dItem.src, dItem.sourceX, dItem.sourceY, dItem.sourceW, dItem.sourceH, dItem.x * CDS.qualityScale, dItem.y * CDS.qualityScale, dItem.width * CDS.qualityScale, dItem.height * CDS.qualityScale);
				}
			} catch (err) {
				console.log('');
				trace("ERROR: Source for CanvasDrawerStage: '" + CDS.canvas.id + "' element: '" + dItem.id + "' failed to load; the image source of " + dItem.src + " may not be named or loaded properly.");
				console.log('');
			}
		} else if (dItem._type === 'text') {
			//spaceText();
			CDS._wrapText(dItem, translation);
		} else {
			if (dItem.strokeDashSize > 0 && dItem.strokeDashGap > 0) CDS.ctx.setLineDash([dItem.strokeDashSize * CDS.qualityScale, dItem.strokeDashGap * CDS.qualityScale]);
			CDS.ctx.lineDashOffset = dItem.strokeDashOffset;

			var _outer = dItem.strokePosition === 'outer';
			var _strokeDepth = dItem.strokeWidth > 0;

			CDS.ctx.beginPath();
			CDS.ctx.strokeStyle = dItem.strokeFill;
			CDS.ctx.lineWidth = dItem.strokeWidth * CDS.qualityScale * (_outer ? 2 : 1);
			CDS.ctx.lineCap = dItem.strokeCap;
			CDS.ctx.lineJoin = dItem.strokeJoin;

			// CASE FOR DRAWING LINES
			if (dItem._type === 'path') {
				var i, p;
				for (i = 0; i < dItem.args.length; i++) {
					for (p = 0; p < dItem.args[i].points.length; p += 2) {
						if (translation) {
							dItem.drawArgs[i].points[p] = ((dItem.args[i].points[p] * dItem.drawScale) - dItem.offsetX) * CDS.qualityScale;
							dItem.drawArgs[i].points[p + 1] = ((dItem.args[i].points[p + 1] * dItem.drawScale) - dItem.offsetY) * CDS.qualityScale;
						} else {
							dItem.drawArgs[i].points[p] = ((dItem.args[i].points[p] * dItem.drawScale) + dItem.x) * CDS.qualityScale;
							dItem.drawArgs[i].points[p + 1] = ((dItem.args[i].points[p + 1] * dItem.drawScale) + dItem.y) * CDS.qualityScale;
						}
					}
				}

				for (i = 0; i < dItem.drawArgs.length; i++) CDS.ctx[dItem.drawArgs[i].fun].apply(CDS.ctx, dItem.drawArgs[i].points);

				// Debugging - shows center of line-based shape
				// CDS.ctx.beginPath();
				// CDS.ctx.fillStyle = 'cyan';
				// if (translation) CDS.ctx.arc(0, 0, 5, 0, 2 * Math.PI);
				// else CDS.ctx.arc(dItem.x + dItem.offsetX, dItem.y + dItem.offsetY, 5, 0, 2 * Math.PI);
				// CDS.ctx.fill();
			} else {

				// CASE FOR DRAWING AN ARC OR RECT

				if (translation) {
					dItem.args[0] = -dItem.offsetX * CDS.qualityScale;
					dItem.args[1] = -dItem.offsetY * CDS.qualityScale;
				} else {
					dItem.args[0] = dItem.x * CDS.qualityScale;
					dItem.args[1] = dItem.y * CDS.qualityScale;
				}

				if (isArc) {
					dItem.args[2] = (dItem.width / 2) * CDS.qualityScale;
				} else {
					dItem.args[2] = dItem.width * CDS.qualityScale;
					dItem.args[3] = dItem.height * CDS.qualityScale;
				}

				// arcs can't have negative radius, so this prevents that from happening
				if (isArc && dItem.args[2] < 0) dItem.args[2] = 0;

				CDS.ctx[dItem._type].apply(CDS.ctx, dItem.args);
			}

			CDS.ctx.closePath();

			if (_outer && _strokeDepth) CDS.ctx.stroke();
			if (dItem.fill) {
				CDS.ctx.fillStyle = dItem.fill;
				CDS.ctx.fill();
			}
			if (!_outer && _strokeDepth) {
				CDS.ctx.shadowColor = 'rgba(0, 0, 0, 0)';
				CDS.ctx.shadowOffsetX = 0;
				CDS.ctx.shadowOffsetY = 0;
				CDS.ctx.shadowBlur = 0;
				CDS.ctx.stroke();
			}

		}

	},

	/* ------------------------------------------------
		Function used for creating a unique object / array to represent elements.drawArgs, which will be contain identical values of elements.args but be a unique object
			
		When values within elements.drawArgs are changed, elements.args values will not be affected

		CALLED ONLY FROM CanvasDrawerStage.addShape();
		*/
	_setLineDrawArgs: function(dItem, index) {
		if (index) {
			dItem.drawArgs[index] = {
				fun: dItem.args[index].fun,
				points: dItem.args[index].points.slice()
			};
		} else {
			for (var i = 0; i < dItem.args.length; i++) {
				dItem.drawArgs[i] = {
					fun: dItem.args[i].fun,
					points: dItem.args[i].points.slice()
				};
			}
		}
	},

	/* ------------------------------------------------
		sets various arguments defining an elements.args paramter given an initial shapeObj
		for line drawings, an argument (dItem.drawArgs) will be defined so the initial drawing paramters will be separated from any translated values

		CALLED ONLY FROM CanvasDrawerStage.addShape();
	*/
	_setDrawArgs: function(dItem, args, shapeObj) {
		var CDS = this;

		switch (dItem._type) {
			case 'rect':
				args = [args.x || args.left || 0, args.y || args.top || 0, args.width, args.height];
				break;
			case 'arc':
				var _startVal = args.startAngle === undefined ? args.startRad : MathUtils.toRadians(args.startAngle),
					_endVal = args.endAngle === undefined ? args.endRad : MathUtils.toRadians(args.endAngle);

				if (!_startVal) _startVal = 0;
				if (!_endVal) _endVal = 2 * Math.PI;

				args = [args.x || args.left || 0, args.y || args.top || 0, args.width >= 0 ? args.width / 2 : args.radius, _startVal, _endVal];
				break;
		}

		dItem.args = args;
		shapeObj = shapeObj || {};

		switch (dItem._type) {
			case 'rect':
				dItem.x = args[0];
				dItem.y = args[1];
				dItem.width = args[2];
				dItem.height = args[3];
				break;

			case 'arc':
				dItem.x = args[0];
				dItem.y = args[1];
				dItem.width = dItem.height = args[2] * 2;
				break;

			case 'path':
				dItem.width = 0;
				dItem.height = 0;

				dItem.args = args.points;

				dItem.drawArgs = dItem.args.slice();

				dItem.offsetX = 100000000;
				dItem.offsetY = 100000000;

				var i, p;
				for (i = 0; i < dItem.args.length; i++) {
					for (p = 0; p < dItem.args[i].points.length; p += 2) {

						if (dItem.args[i].points[p] < dItem.offsetX) {
							dItem.offsetX = dItem.args[i].points[p];
						} else if (dItem.args[i].points[p] > dItem.width) {
							dItem.width = dItem.args[i].points[p];
						}

						if (dItem.args[i].points[p + 1] < dItem.offsetY) {
							dItem.offsetY = dItem.args[i].points[p + 1];
						} else if (dItem.args[i].points[p + 1] > dItem.height) {
							dItem.height = dItem.args[i].points[p + 1];
						}
					}
				}

				dItem.width = dItem.width - dItem.offsetX;
				dItem.height = dItem.height - dItem.offsetY;

				// this loop adjusts every point
				// origin will now be in center of shape rather than away from it
				for (i = 0; i < dItem.args.length; i++) {
					for (p = 0; p < dItem.args[i].points.length; p += 2) {
						dItem.args[i].points[p] -= dItem.offsetX + (dItem.width / 2);
						dItem.args[i].points[p + 1] -= dItem.offsetY + (dItem.height / 2);
					}
					CDS._setLineDrawArgs(dItem, i);
				}

				dItem.x = shapeObj.params.x >= 0 || shapeObj.params.x <= 0 ? shapeObj.params.x : dItem.offsetX + (dItem.width / 2);
				dItem.y = shapeObj.params.y >= 0 || shapeObj.params.y <= 0 ? shapeObj.params.y : dItem.offsetY + (dItem.height / 2);

				break;

		}
		CDS.setTransformOrigin(dItem, shapeObj.transformOrigin || (dItem._type === 'rect' ? '0 0' : '50% 50%'));
	},
	/* ------------------------------------------------
		Determines if a given draw source is a canvas element or an image

		CALLED ONLY FROM CanvasDrawerStage.addImage() and CanvasDrawerStage.makePattern();
		*/
	_getIsSourceCanvas: function(img) {
		return img.tagName === 'CANVAS' || (typeof img === 'object' && img.tagName === undefined);
	},
	/*_spaceText: function(dItem, x, y, offsetX, offsetY) {
		var CDS = this,
			words = dItem.copy.split(''),
			line = '',
			n,
			_tempLine,
			metrics,
			_strokeWidth;

		for (n = 0; n < words.length; n++) {
			CDS.ctx.fillText(line, x + offsetX, y + offsetY);
			line = words[n] + ' ';
			offsetX += dItem.letterSpacing;
		}
		CDS.ctx.fillText(line, x + offsetX, y + offsetY);
	},*/

	/* ------------------------------------------------
		wrap the text of a given draw object with type === CanvasDrawType.TEXT to multiline based on its max width

		CALLED ONLY FROM CanvasDrawerStage.addText() and CanvasDrawerStage._drawShape()
		*/
	_wrapText: function(dItem, translation, draw) {

		var CDS = this,
			_recalc = (draw === false ? true : false),
			_prop = 'empty';

		// IF ONE OF THE deltaProps IS NOT EQUAL TO A VALUE OF THE TEXT FIELD, RECALCULATE ITS DIMENSIONS AND OFFSETS
		if (!_recalc) {
			for (var item in dItem.deltaProps) {
				if (dItem.deltaProps[item] != dItem[item]) {
					_prop = item;
					_recalc = true;
					break;
				}
			}
		}

		if (_recalc) {
			// THIS DOES A SERIES OF CHECKS TO FIND OFFSETS BASED ON strokeWidth, marginTop, and marginLeft

			dItem.deltaProps.strokeOffset = (dItem.strokePosition === 'outer' || dItem.strokePosition === 'center' ? (dItem.strokeWidth / 4) : 0) * CDS.qualityScale;

			dItem.drawProps.offsetX = dItem.marginLeft + ((dItem.textAlign === 'right' ? -1 : 1) *  dItem.deltaProps.strokeOffset);
			dItem.drawProps.offsetY = dItem.marginTop + dItem.deltaProps.strokeOffset;
			//dItem.drawProps.drawX = dItem.x;
			//dItem.drawProps.drawY = dItem.y;

			// THIS RESTRICTS THE TEXT TO ITS maxWidth AND ALSO FINDS THE width AND height OF THE TEXT

			var _words = dItem.copy.split(' '),
				_returnLine = '',
				_tempLine,
				_strokeWidth,
				_finalTextWidth = 0,
				_finalText = [];

			// GET THE WIDTH OF THE TEXT FIELD
			for (var n = 0; n < _words.length; n++) {
				_tempLine = _returnLine + _words[n] + ' ';
				_strokeWidth = CDS.ctx.measureText(_tempLine).width;
				if (_strokeWidth > dItem.maxWidth && n > 0) {
					_strokeWidth = CDS.ctx.measureText(_returnLine).width;
					if (_finalTextWidth < _strokeWidth) _finalTextWidth = _strokeWidth;

					_finalText.push({
						copy: _returnLine,
						y: dItem.drawProps.offsetY
					});

					_returnLine = _words[n] + ' ';
					dItem.drawProps.offsetY += dItem.lineHeight;
				} else {
					_returnLine = _tempLine;
					if (_finalTextWidth < _strokeWidth) _finalTextWidth = _strokeWidth;
				}
			}

			// THIS IS EACH GROUP OF TEXT, BROKEN UP BY LINE
			_finalText.push({
				copy: _returnLine,
				y: dItem.drawProps.offsetY
			});

			// NEWLY DEFINED width AND height VALUES
			dItem.width = _finalTextWidth + (dItem.deltaProps.strokeOffset * 2);
			dItem.height = dItem.drawProps.offsetY + (dItem.deltaProps.strokeOffset * 2);


			// OFFSETS ADJUSTED BASED ON DIMENSIONS
			dItem.offsetX = dItem.width * dItem.transOffsetX;
			dItem.offsetY = dItem.height * dItem.transOffsetY;

			// SET THE deltaProps TO THE MOST UPDATED VALUES
			for (item in dItem.deltaProps) dItem.deltaProps[item] = dItem[item];

			dItem.drawProps.copy = _finalText.slice();
		}

		if (draw !== false) {
			var _offsetX = -dItem.drawProps.offsetX,
				_offsetY = 0 //dItem.drawProps.offsetY,
			_drawX = dItem.x,
				_drawY = dItem.y;

			if (translation) {
				//_offsetX -= dItem.offsetX;
				//_offsetY -= dItem.offsetY;
				_offsetX = dItem.offsetX + (dItem.strokeWidth / 2);
				_offsetY = dItem.offsetY;
				_drawX = 0;
				_drawY = 0;
			}

			// ACTUALLY DRAW THE VARIOUS LINES OF TEXT
			var copy;
			for (n = 0; n < dItem.drawProps.copy.length; n++) {
				//gif (translation) dItem.drawProps.copy[n].y -= _offsetY;
				copy = dItem.drawProps.copy[n].copy;
				if (copy.lastIndexOf(' ') === copy.length - 1) copy = copy.substring(0, copy.length - 1);
				CDS._drawText(dItem, copy, _drawX - _offsetX, _drawY + dItem.drawProps.copy[n].y - _offsetY);
			}
		}
	},

	/* ------------------------------------------------
			draw the text of a given draw object with type === CanvasDrawType.TEXT

			CALLED ONLY FROM CanvasDrawerStage._wrapText()
			*/
	_drawText: function(element, copy, x, y) {
		var CDS = this,
			_outer = element.strokePosition === 'outer',
			_strokeDepth = element.strokeWidth > 0;

		if (element.strokeDashSize > 0 && element.strokeDashGap > 0) CDS.ctx.setLineDash([element.strokeDashSize * CDS.qualityScale, element.strokeDashSize * CDS.qualityScale]);
		CDS.ctx.lineDashOffset = element.strokeDashOffset;
		CDS.ctx.lineJoin = element.strokeJoin;
		CDS.ctx.font = (element.fontSize * CDS.qualityScale) + 'px ' + element.fontFamily;
		CDS.ctx.fillStyle = element.fill;
		CDS.ctx.strokeStyle = element.strokeFill;
		CDS.ctx.textAlign = element.textAlign;
		CDS.ctx.textBaseline = 'top';
		CDS.ctx.lineWidth = element.strokeWidth * CDS.qualityScale * (_outer ? 2 : 1);

		if (_outer && _strokeDepth) CDS.ctx.strokeText(copy, x * CDS.qualityScale, y * CDS.qualityScale);
		CDS.ctx.fillText(copy, x * CDS.qualityScale, y * CDS.qualityScale);
		if (!_outer && _strokeDepth) {
			CDS.ctx.shadowColor = 'rgba(0, 0, 0, 0)';
			CDS.ctx.shadowOffsetX = 0;
			CDS.ctx.shadowOffsetY = 0;
			CDS.ctx.shadowBlur = 0;
			CDS.ctx.strokeText(copy, x * CDS.qualityScale, y * CDS.qualityScale);
		}
	},

}

/*
GRAVEYARD

	/* ------------------------------------------------
		gets the count of how many elements this CanvasDrawerStage
		_canvasDrawerInstance._getElementsLength();

		CALLED ONLY FROM CanvasDrawerStage.addImage() and CanvasDrawerStage.addShape();
		
	_getElementsLength: function() {
		var CDS = this,
			total = 0;
		for (var thing in CDS.elements) total++;
		return total;
	},

// THIS VERSION OF TEXT DRAW DRAWS THE OUTER STROKE FOR THE WHOLE TEXT FIELD FIRST BEFORE BEGINNING THE FILL
// RATHER THAN DRAWING THE OUTER STROKE AND THEN THE FILL ONE LETTER AT A TIME
// PREVENTS OUTER STROKE FROM OVERLAPPING COPY
if (translation) {
			_offsetX -= dItem.offsetX;
			_offsetY -= dItem.offsetY;
			_drawX = 0;
			_drawY = 0;
		}

		CDS.ctx.font = dItem.fontSize + 'px ' + dItem.fontFamily;
		CDS.ctx.fillStyle = dItem.fill;
		CDS.ctx.strokeStyle = dItem.strokeFill;
		CDS.ctx.textAlign = dItem.textAlign;
		CDS.ctx.lineWidth = dItem.strokeWidth;

		if (_outerText) {
			for (n = 0; n < _finalText.length; n++) {
				if (translation) _finalText[n].y -= dItem.offsetY;
				CDS._drawText(_finalText[n].copy, _drawX + _offsetX, _drawY + _finalText[n].y, 'stroke');
			}
		}
		for (n = 0; n < _finalText.length; n++) {
			if (!_outerText && translation) _finalText[n].y -= dItem.offsetY;
			CDS._drawText(_finalText[n].copy, _drawX + _offsetX, _drawY + _finalText[n].y, 'fill');
			if (_centerText) CDS._drawText(_finalText[n].copy, _drawX + _offsetX, _drawY + _finalText[n].y, 'stroke');
		}
	},

	_drawText: function(copy, x, y, textType) {
		var CDS = this;

		switch (textType) {
			case 'fill':
				CDS.ctx.fillText(copy, x, y);
				break;
			default:
				CDS.ctx.strokeText(copy, x, y);
				break;
		}
	}
}
*/