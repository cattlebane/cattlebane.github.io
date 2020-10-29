/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	CanvasBlendMode

	Description:

	See also http://www.w3schools.com/tags/canvas_globalcompositeoperation.asp and here https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation

		DEFAULT / PLACEMENTS::
			(start code)
			NONE
			UNDER
			(end)
		
		MASKING BLENDS::

			Use the existing canvas drawings to act as the mask to the given drawing with this mode::
			(start code)
			SOURCE_IN
			SOURCE_OUT
			SOURCE_ATOP
			(end)

			Use the given drawing with this mode to act as the mask to existing canvas drawings::
			(start code)
			DEST_IN
			DEST_OUT
			DEST_ATOP
			(end)

			Miscellaneous::
			(start code)
			XOR
			COPY
			(end)

		UNIVERSAL BLEND MODES::
			(start code)
			ADD
			(end)

		NOT SUPPORTED BY THESE BROWSER VERSIONS AND EARLIER: Internet Explorer, Edge 12, Opera Mini 8, Android Browser 4.3::
			(start code)
			DARKEN
			LIGHTEN
			OVERLAY
			MULTIPLY
			SCREEN
			DODGE
			BURN
			HARD
			SOFT
			DIFFERENCE
			EXCLUSION
			HUE
			SATURATION
			COLOR
			LUMINOSITY
			(end)
	
		See:
			CanvasDrawerElement
		
		NOTE::
			To import, add the following to your index.html
			(start code)
			adParams.corePath + "js/view/canvas/CanvasBlendMode.js",
			(end)

		---------------------------------------------------------------------------------------------------------------------------------------------------------- */
var CanvasBlendMode = new(function() {
	return {
		//
		/**	Constant: NONE
			Represents 'source-over'. Displays the source content over the destination content. This is the default setting.
			> CanvasBlendMode.NONE
			(see canvasdrawer/blend_none.jpg)
		*/
		NONE: 'source-over',

		/**	Constant: UNDER
			Represents 'destination-over'. Displays the destination content over the source content.
			> CanvasBlendMode.UNDER
			(see canvasdrawer/blend_under.jpg)
		*/
		UNDER: 'destination-over',

		
		// MASKS
		/**	Constant: SOURCE_IN
			Represents 'source-in'. Displays the source content within the destination content. Only the part of the source content that is INSIDE the destination content is shown, and the destination content is transparent.
			> CanvasBlendMode.SOURCE_IN
			(see canvasdrawer/blend_sourceIn.jpg)
		*/
		SOURCE_IN: 'source-in',
		
		/**	Constant: SOURCE_OUT
			Represents 'source-out'. Displays the source content outside of the destination content. Only the part of the source content that is OUTSIDE the destination content is shown, and the destination content is transparent.
			> CanvasBlendMode.SOURCE_OUT
			(see canvasdrawer/blend_sourceOut.jpg)
		*/
		SOURCE_OUT: 'source-out',

		/**	Constant: SOURCE_ATOP
			Represents 'source-atop'. Displays the destination content on top of the source content. The part of the destination content that is outside the source content is not shown.
			> CanvasBlendMode.SOURCE_ATOP
			(see canvasdrawer/blend_sourceAtop.jpg)
		*/
		SOURCE_ATOP: 'source-atop',

		/**	Constant: DEST_IN
			Represents 'destination-in'. Displays the destination content within the source content. Only the part of the destination content that is INSIDE the source content is shown, and the source content is transparent.
			> CanvasBlendMode.DEST_IN
			(see canvasdrawer/blend_destIn.jpg)
		*/
		DEST_IN: 'destination-in',

		/**	Constant: DEST_OUT
			Represents 'destination-out'. Displays the destination content outside of the source content. Only the part of the destination content that is OUTSIDE the source content is shown, and the source content is transparent.
			> CanvasBlendMode.DEST_OUT
			(see canvasdrawer/blend_destOut.jpg)
		*/
		DEST_OUT: 'destination-out',

		/**	Constant: DEST_ATOP
			Represents 'destination-atop'. Displays the destination content on top of the source content. The part of the destination content that is outside the source content is not shown.
			> CanvasBlendMode.DEST_ATOP
			(see canvasdrawer/blend_destAtop.jpg)
		*/
		DEST_ATOP: 'destination-atop',

		/**	Constant: XOR
			Represents 'xor'. Only areas where the destination content and source content do not overlap are displayed. The parts that do overlap are not shown.
			> CanvasBlendMode.XOR
			(see canvasdrawer/blend_xor.jpg)
		*/
		XOR: 'xor',

		/**	Constant: COPY
			Represents 'copy'. Displays the source content. The destination content is ignored.
			> CanvasBlendMode.COPY
			(see canvasdrawer/blend_copy.jpg)
		*/
		COPY: 'copy',

		// PROPER BLEND MODES
		/**	Constant: ADD
			Represents 'lighter'. Where both shapes overlap, the color is values are added together.
			> CanvasBlendMode.ADD
		*/
		ADD: 'lighter',

		// THE FOLLOWING BLEND MODES MIGHT NOT BE SUPPORTED BY INTERNET EXPLORER 11 (and earlier) OR SAFARI
		/**	Constant: DARKEN
			Represents 'darken'. Retains the darkest pixels of both layers.
			> CanvasBlendMode.DARKEN
		*/
		DARKEN: 'darken',

		/**	Constant: LIGHTEN
			Represents 'lighten'. Retains the lightest pixels of both layers.
			> CanvasBlendMode.LIGHTEN
		*/
		LIGHTEN: 'lighten',

		/**	Constant: OVERLAY
			Represents 'overlay'. A combination of multiply and screen. Dark parts on the base layer become darker, and light parts become lighter.
			> CanvasBlendMode.OVERLAY
		*/
		OVERLAY: 'overlay',

		/**	Constant: MULTIPLY
			Represents 'multiply'. The pixels are of the top layer are multiplied with the corresponding pixel of the bottom layer. A darker picture is the result.
			> CanvasBlendMode.MULTIPLY
		*/
		MULTIPLY: 'multiply',

		/**	Constant: SCREEN
			Represents 'screen'. The pixels are inverted, multiplied, and inverted again. A lighter picture is the result (opposite of multiply)
			> CanvasBlendMode.SCREEN
		*/
		SCREEN: 'screen',

		/**	Constant: DODGE
			Represents 'color-dodge'. Divides the bottom layer by the inverted top layer.
			> CanvasBlendMode.DODGE
		*/
		DODGE: 'color-dodge',

		/**	Constant: BURN
			Represents 'color-burn'. Divides the inverted bottom layer by the top layer, and then inverts the result.
			> CanvasBlendMode.BURN
		*/
		BURN: 'color-burn',

		/**	Constant: HARD
			Represents 'hard-light'. A combination of multiply and screen like overlay, but with top and bottom layer swapped.
			> CanvasBlendMode.HARD
		*/
		HARD: 'hard-light',

		/**	Constant: SOFT
			Represents 'soft-light'. A softer version of hard-light. Pure black or white does not result in pure black or white.
			> CanvasBlendMode.SOFT
		*/
		SOFT: 'soft-light',

		/**	Constant: DIFFERENCE
			Represents 'difference'. Subtracts the bottom layer from the top layer or the other way round to always get a positive value.
			> CanvasBlendMode.DIFFERENCE
		*/
		DIFFERENCE: 'difference',

		/**	Constant: EXCLUSION
			Represents 'exclusion'. Like difference, but with lower contrast.
			> CanvasBlendMode.EXCLUSION
		*/
		EXCLUSION: 'exclusion',

		/**	Constant: HUE
			Represents 'hue'. Preserves the luma and chroma of the bottom layer, while adopting the hue of the top layer.
			> CanvasBlendMode.HUE
		*/
		HUE: 'hue',

		/**	Constant: SATURATION
			Represents 'saturation'. Preserves the luma and hue of the bottom layer, while adopting the chroma of the top layer.
			> CanvasBlendMode.SATURATION
		*/
		SATURATION: 'saturation',

		/**	Constant: COLOR
			Represents 'color'. Preserves the luma of the bottom layer, while adopting the hue and chroma of the top layer.
			> CanvasBlendMode.COLOR
		*/
		COLOR: 'color',

		/**	Constant: LUMINOSITY
			Represents 'luminosity'. Preserves the hue and chroma of the bottom layer, while adopting the luma of the top layer.
			> CanvasBlendMode.LUMINOSITY
		*/
		LUMINOSITY: 'luminosity'

	}
})();