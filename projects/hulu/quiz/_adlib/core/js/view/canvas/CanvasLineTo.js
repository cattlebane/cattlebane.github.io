/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	CanvasLineTo

	Description: 
		Custom constants to identify the functions used for drawing shapes based on lines and curves
	
	See: 
		CanvasDrawerElement
		
		NOTE::
			To import, add the following to your index.html
			(start code)
			adParams.corePath + "js/view/canvas/CanvasLineTo.js",
			(end)

		---------------------------------------------------------------------------------------------------------------------------------------------------------- */
		
var CanvasLineTo = new function() {
	return {
		/**	Constant: MOVE
			Represents 'moveTo'.
			> CanvasLineTo.MOVE
			*/
		MOVE: 'moveTo',

		/**	Constant: LINE
			Represents 'lineTo'.
			> CanvasLineTo.LINE
			*/
		LINE: 'lineTo',

		/**	Constant: QUAD
			Represents 'quadraticCurveTo'.
			> CanvasLineTo.QUAD
			*/
		QUAD: 'quadraticCurveTo',

		/**	Constant: BEZIER
			Represents 'bezierCurveTo'.
			> CanvasLineTo.BEZIER
			*/
		BEZIER: 'bezierCurveTo',

		/**	Constant: ARC
			Represents 'arcTo'.
			> CanvasLineTo.ARC
			*/
		ARC: 'arcTo'
	}
}