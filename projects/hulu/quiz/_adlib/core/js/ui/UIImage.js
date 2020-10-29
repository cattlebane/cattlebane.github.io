/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	UIImage

	Description:
		This is a display object class, extending UIComponent.  It is a DOM element that has default values for the background image styles.
		They can still be overwritten by simply changing them with Styles.setCss() or the native setCss() method directly on the UIImage instance.
		By default, UIImage has these styles set:

		(start code) 
			background-repeat : no-repeat; 
			background-size : cover; 
			background-position : 50% 50%;
		(end code)

		By extending UIComponent this has all of its native properties and methods.  See <UIComponent> for more info.

	Sample:
		(start code)
			
			// bare minimum creation - image source is required, but can be added to anything and named later.
			var myImage = new UIImage({
				source : 'template_image'
			})
			
			// simple creation - no style
			var myImage = new UIImage({
				target : adData.elements.redAdContainer,
				id : 'my-image',
				source : 'template_image'
			})

			// create with assigned styles
			var myImage = new UIImage({
				target : adData.elements.redAdContainer,
				id : 'my-image',
				source : 'template_image',
				css : {
					x : 36,
					y : 14,
					width : 120,
					height: 140
				}
			})
		(end code)
		
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */
function UIImage ( arg ){
	
	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// BASE CSS
	Styles.createClass ( 'uiImage', 
		'ui-image', 'position:absolute; background-repeat:no-repeat; background-size:cover;'
	)

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PRIVATE PROPERTIES
	var _source = null;
	var _css = arg.css || {}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// MARKUP
	if ( !arg.source ) throw new Error ( "UIImage : No image source set on '" + arg.id + "'" );
	
	var _source = ImageManager.get ( arg.source );
	
	arg.css = arg.css || {};
	arg.css.width = arg.css.width != undefined ? arg.css.width : _source.width;
	arg.css.height = arg.css.height != undefined ? arg.css.height : _source.height;
	arg.css.backgroundImage = _source.src;
	
	var U = new UIComponent ( arg );
	Styles.addClass ( U, 'ui-image' );

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// GETTER | SETTTER
	
	/**	Variable: source
			A String of the name of the image file. Is initially set in the constructor at the root level of the object and is a required parameter
		
		(start code)
			// get
			trace ( myImage.source );

			// set
			myImage.source = 'template_image';
		(end code)
	*/
	/** */
	Object.defineProperty ( U, 'source', {
		get: function() {
			return _source;
		},
		set: function(value) {
			_source = value;
			U.style.backgroundImage = 'url(' + ImageManager.get ( value ).src + ')';
		}
	});
	
	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PUBLIC METHODS
	U.toString = function(){
		return '[object UIImage]';
	}
	
	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// INIT
	
	return U;
}