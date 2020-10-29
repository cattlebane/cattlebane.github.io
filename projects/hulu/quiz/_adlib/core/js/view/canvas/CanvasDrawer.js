/*
Version 16.06.16
*/

/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	CanvasDrawer
		Creates a canvas element used for drawing images and shapes which can be manipulated via position, size, alpha, rotation, scaleX, and scaleY

		Any drawing items added through the CanvasDrawer.addImage(), CanvasDrawer.addShape(), and CanvasDrawer.addText() functions can be referenced via YourInstanceOfCanvasDrawer.elements.YourItemID
			and can be manipulated via x, y, width, height, scaleX, scaleY, alpha, rotation, blendMode, and other properties where noted.
			
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

		/*
			BUGS

			TODO
		*/

var CanvasDrawer = new function() {

	/**	Method: create()
			Returns a new CanvasDrawerStage instance and sets up some basic parameters used for drawing

			containerData		- an object containing the arguments for defining / orienting the new CanvasDrawer

			(start code)
			containerData =	{
								id: 		a STRING id suffix the canvas DOM element will go by; is appeneded to 'cd_'
								target: 	the target DOM element in which to place the canvas element

								css: 		an optional CSS object defining the style of the canvas. If undefined, will size canvas to the width and height of the target DOM element.
								styles: 	an optional STRING of css styles applied independently of the CSS. Will override comparable values of css object.
								display: 	an optional BOOLEAN which determines whether or not to create this particular canvas DOM element; defaults to true.
								retina: 	an optional BOOLEAN which determine whether or not to create the canvas and its elements at retina (double) resolution; defaults to false.
								debug: 		an optional BOOLEAN value of true will make the canvas background green; defaults to false.
							}
							(end)

			EXAMPLES::

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
				styles: 'position: relative;',
				display: true, 
				retina: true,
				debug: false
			});
			(end)
			*/

	this.create = function(containerData) {
		var _css = {
			left: 0,
			top: 0,
			width: (containerData.css && containerData.css.width) ? containerData.css.width : Styles.getCss(containerData.target, 'width') || adParams.adWidth,
			height: (containerData.css && containerData.css.height) ? containerData.css.height : Styles.getCss(containerData.target, 'height') || adParams.adHeight,
			background: containerData.debug === true ? 'green' : '',
			display: 'inherit',
			position: 'absolute',
			pointerEvents: 'none'
		};

		if (containerData.css)
			for (var cssItem in containerData.css) _css[cssItem] = containerData.css[cssItem];

		return new CanvasDrawerStage('cd_' + containerData.id, containerData.target, _css, containerData.styles || '', containerData.display === false ? false : true, containerData.retina === true ? 2 : 1);
	}
};