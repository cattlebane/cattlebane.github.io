/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	CanvasDrawType

	Description: 
		Custom constants to identify the type of content which CanvasDrawer will draw and how patterns will repeat.
	
	See: 
		CanvasDrawerElement
		
		NOTE::
			To import, add the following to your index.html
			(start code)
			adParams.corePath + "js/view/canvas/CanvasDrawType.js",
			(end)

		---------------------------------------------------------------------------------------------------------------------------------------------------------- */

var CanvasDrawType = new function() {
	return {
		/**	Constant: IMAGE
			Represents 'image'. Used for SVG, Canvas, and Bitmap sources.
			> CanvasDrawType.IMAGE
			*/
		IMAGE: 'image',

		/**	Constant: PATH
			Represents 'path'. Used for creating shapes using arrays of points.
			> CanvasDrawType.PATH
			*/
		PATH: 'path',

		/**	Constant: RECT
			Represents 'rect'. Used for rectangles.
			> CanvasDrawType.RECT
			*/
		RECT: 'rect',

		/**	Constant: TEXT
			Represents 'text'. Used for text fields.
			> CanvasDrawType.TEXT
			*/
		TEXT: 'text',

		/**	Constant: CIRC
			Represents 'arc'. Used for arcs and circles.
			> CanvasDrawType.CIRC
			*/
		CIRC: 'arc',

		/**	Constant: REPEAT
			Represents 'repeat'. Used for patterns which repeat infinitely vertically and horizontally.
			> CanvasDrawType.REPEAT
			*/
		REPEAT: 'repeat',

		/**	Constant: REPEAT_X
			Represents 'repeat-x'. Used for fillStyle patterns with only horizontal repetiion (infinite columns, 1 rows).
			> CanvasDrawType.REPEAT_X
			*/
		REPEAT_X: 'repeat-x',

		/**	Constant: REPEAT_Y
			Represents 'repeat-y'. Used for fillStyle patterns with only vertical repetiion (1 column, infinite rows).
			> CanvasDrawType.REPEAT_Y
			*/
		REPEAT_Y: 'repeat-y',

		/**	Constant: REPEAT_NONE
			Represents 'no-repeat'. Used for fillStyle patterns with no repetition.
			> CanvasDrawType.REPEAT_NONE
			*/
		REPEAT_NONE: 'no-repeat',
	}
};