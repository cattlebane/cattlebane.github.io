/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	Effects
		Utilities for adding effects to elements
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */
var Effects = (function() {
	
	/* --------------------------------------------------------------------------------- */
	// PUBLIC METHODS

	/** Method: blur()
		Blurs a dom element.
		
		obj 		-	object containing blur arguments
		(start code)
		obj = {
			target: 	dom element 
			amount: 	the level of blurriness 
		}
		(end)

		EXAMPLE::

				(start code)
					Effects.blur({
						target: _myDiv,
						amount: 10
					});
				(end)
	*/
	function blur ( obj ) {
		if ( obj.amount >= 0 ) Styles.setCss( obj.target, { filter : 'blur(' + obj.amount + 'px)' });
	}

	/** Method: dropShadow()
		Adds a drop shadow to a dom element. Follows the same use specs as Photoshop.
			
		obj 		-	object containing drop shadow arguments
		(start code)
		obj = {
			target:		dom element 
			angle: 		optional NUMBER IN DEGREES for the angle at which the shadow will project. Defaults to 0.
			distance: 	optional NUMBER for how far away the shadow will offset. Defaults to 0.
			size: 		optional NUMBER for shadow radius. Defaults to 0.
			spread: 	optional NUMBER for how much extra the shadow will increase before it begins its gradient fade. Defaults to 0.
			color:      optional color of shadow as a HEX STRING :"#ff0000", RGB/A STRING: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)", or an RGB/A OBJECT:{r:255,g:0,b:0} / {r:255,g:0,b:0,a:1}. Defaults to "#000000".
			alpha:		optional NUMBER of shadow opacity, if set will overwrite color.a. Defaults to 1.
			inner: 		optional BOOLEAN to set the shadow as inset. Defaults to false.
		}
		(end)

		EXAMPLE::

				(start code)
					Effects.dropShadow ( {
						target:_myDiv,
						angle: 135,
						distance: 50,
						size: 20, 
						spread: 10,
						color: 'rgb(90, 0, 0)',
						alpha: 0.1,
						inner: true
					});
				(end)
	*/
	function dropShadow ( obj ) {
		Styles.setCss( obj.target, { boxShadow : createShadow ( obj.angle || 0, obj.distance || 0, obj.size || 0, obj.spread || 0, obj.color || '#000000', obj.alpha, obj.inner ) });
	}

	/** Method: textDropShadow()
		Adds a drop shadow to text within a dom element. Follows the same use specs as Photoshop.
			
		obj 		-	object containing drop shadow arguments
		(start code)
		obj = {
			target:		dom element 
			angle: 		optional NUMBER IN DEGREES for the angle at which the shadow will project. Defaults to 0.
			distance: 	optional NUMBER for how far away the shadow will offset. Defaults to 0.
			size: 		optional NUMBER for shadow radius. Defaults to 0.
			color:      optional color of shadow as a HEX STRING :"#ff0000", RGB/A STRING: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)", or an RGB/A OBJECT:{r:255,g:0,b:0} / {r:255,g:0,b:0,a:1}. Defaults to "#000000".
			alpha:		optional NUMBER of shadow opacity, if set will overwrite color.a. Defaults to 1.
		}
		(end)

		EXAMPLE::

				(start code)
					Effects.textDropShadow ({
						target:_myText.textfield, 
						angle: 45, 
						distance: 15, 
						size: 1, 
						color: '#ff0000', 
						alpha: 0.5
					});
				(end)
	*/
	function textDropShadow ( obj ) {
		Styles.setCss( obj.target, { textShadow : createShadow ( obj.angle || 0, obj.distance || 0, obj.size || 0, null, obj.color || '#000000', obj.alpha ) });
	}

	/** Method: glow()
		Adds a glow to a dom element. Follows the same use specs as Photoshop.
			
		obj 		-	object containing glow arguments
		(start code)
		obj = {
			target:		dom element 
			size: 		optional NUMBER for glow radius. Defaults to 0.
			spread: 	optional NUMBER for how much extra the glow will increase before it begins its gradient fade. Defaults to 0.
			color:      optional color of glow as a HEX STRING :"#ff0000", RGB/A STRING: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)", or an RGB/A OBJECT:{r:255,g:0,b:0} / {r:255,g:0,b:0,a:1}. Defaults to "#000000".
			alpha:		optional NUMBER of glow opacity, if set will overwrite color.a. Defaults to 1.
			inner: 		optional BOOLEAN to set the glow as inset. Defaults to false.
		}
		(end)

		EXAMPLE::

				(start code)
					Effects.glow ( {
						target: _myDiv,
						size: 20, 
						spread: 0,
						color: 'rgb(90, 0, 0)',
						alpha: 0.5,
						inner: true
					});
				(end)
	*/
	function glow ( obj){
		obj.angle = 0;
		obj.distance = 0;
		dropShadow( obj );
	}

	/** Method: linearGradient()
		Changes the background of a given dom element to be a linear gradient.
			
		obj 		-	object containing gradient arguments
		(start code)
		obj = {
			target:		dom element 
			colors: 	ARRAY of colors as either a HEX STRING :"#ff0000" or an RGB/A STRING: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)".
			angle: 		NUMBER IN DEGREES of angle to draw linear-gradient at. Defaults to 0.
		}
		(end)

		EXAMPLE::

			Adding a horizontal gradient from red, to blue, fading to a transparent yellow.

				(start code)
					Effects.linearGradient({
						target: _myDiv, 
						colors: ['red', 'blue', 'rgba(255, 255, 0, 0.5)'], 
						angle: 90
					});
				(end)
	*/
	function linearGradient ( obj ) {
		Styles.setCss( obj.target, { background: 'linear-gradient(' + (obj.angle || 0) + 'deg, ' + obj.colors.toString() + ')' });
	}

	/** Method: radialGradient()
		Changes the background of a given dom element to be a radial gradient.
			
		obj 		-	object containing gradient arguments
		(start code)
		obj = {
			target:		dom element 
			colors: 	ARRAY of colors as either a HEX STRING :"#ff0000" or an RGB/A STRING: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)". To add stops, append a % value to the color string: ["#ff0000 50%, "#00ff00 90%"].
			angle: 		NUMBER IN DEGREES of angle to draw linear-gradient at. Defaults to 0.
		}
		(end)

		EXAMPLE::

			Adding a gradient from red to blue, with a very large choke on the blue.

				(start code)
					Effects.radialGradient({
						target: _myDiv, 
						colors: ['#ff0000', '#0000ff 10%']
					});
				(end)
	*/
	function radialGradient ( obj ) {
		Styles.setCss( obj.target, { background: 'radial-gradient(' + obj.colors.toString() + ')' });
	}

	/* --------------------------------------------------------------------------------- */
	// PRIVATE METHODS
	function createShadow ( angle, distance, size, spread, color, alpha, inner ) {
		var val = ''
		var deg = angle * -1 + 180
		var rad = MathUtils.toRadians( deg );
		val += (Math.cos(rad) * distance).toFixed(8) + 'px ';
		val += (Math.sin(rad) * distance).toFixed(8) + 'px ';
		val += size + 'px';
		
		if( spread ) val += ' ' + spread + 'px';
		
		/*
		color = color || { r:0, g:0, b:0, a:1 }
		if(( typeof color ) == 'string' ){
			//color = ImageUtils.hexToRgba( color );
		}
		if( !color.a ) color.a = 1;
		if( alpha ) color.a = alpha;
		val += ' rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + color.a + ')'
		*/
		val += ' ' + ColorUtils.toRgba(color, alpha);
		trace("VAL!", val)

		inner = !!inner;
		if( inner ) val += ' inset';

		return val;
	}

	/* --------------------------------------------------------------------------------- */
	// PUBLIC ACCESS
	return {
		blur 			: blur,
		dropShadow 		: dropShadow,
		textDropShadow	: textDropShadow,
		linearGradient 	: linearGradient,
		radialGradient 	: radialGradient,
		glow		 	: glow
	}

})();
