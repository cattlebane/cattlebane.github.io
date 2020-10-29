/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	ColorUtils
		This class contains methods for manipulating color.
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */
var ColorUtils = new function() {

	var CU = this;

	/**	Method: toRgba()
			Returns the rgba() string representing a given color and optional alpha

		color				- the color to convert, represented as a HEX string:"#ff0000", an RGB/A string: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)" ), or an RGB/A object: {r:255,g:0,b:0} / {r:255,g:0,b:0,a:1}.
		alpha 				- the optional alpha value for the return string: overrides the alpha value of an RGBA color. If undefined, will default to the alpha value of the color. */
	CU.toRgba = function(color, alpha){
		switch(typeof color){
			case 'object':
				color = color || { r:0, g:0, b:0, a:1 }
				break;
			default:
				if (color.indexOf('rgb') >= 0){
				    color = color.substring(color.indexOf('(') + 1, color.lastIndexOf(')')).split(/,\s*/);
					color = { r:color[0], g:color[1], b:color[2], a:color[3]};
				} else if (color.indexOf('#') >= 0){
					var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec( color );
				    color = result ? {
				        r: parseInt( result[1], 16 ),
				        g: parseInt( result[2], 16 ),
				        b: parseInt( result[3], 16 ),
				        a: result[4] ? parseInt( result[4], 16 ) : 1
				    } : null;
				} else {
					console.log('');
					trace("ERROR: ColorUtils.toRgba does not accept color names such as '" + color + "'. Use HEX or an RGB/A string or object per documentation");
					trace("Returning the color '" + color + "' without any alpha");
					console.log('');
					return color;
				}
				break;
		}
		if( !color.a ) color.a = 1;
		if( alpha >= 0 ) color.a = alpha;
		
		return 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + color.a + ')'
	}

}
