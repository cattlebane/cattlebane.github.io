/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	Border

	Description:
		This Module adds borders to an element by adding 4 divs to the target element.
	
	Parameters:
			id 			- a unique id to add to each div to avoid conflicts with other borders
			target 		- id or element to which borders should be applied
			size 		- number of pixels the border should be
			color 		- color the border should be
			alpha		- optional, transparency of border
			zIndex 		- optional, z-index of border

	> new Border ( 'main', 'redAdContainer', 1, '#ff0000' );

	Returns:
		A new Border Object
		
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */
function Border ( id, target, size, color, alpha, zIndex ) {
	
	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// BASE CSS
	Styles.createClass ( 'RED_Border', 
		'border-left, border-right', 'position:absolute; height:100%;',
		'border-top, border-bottom', 'position:absolute; width:100%;',
		'border-top', 'top:0px;',
		'border-bottom', 'bottom:0px;',
		'border-left', 'top:0px;',
		'border-right', 'right:0px; top:0px;'
	)

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// MARKUP
	var _container = Markup.getElement( target );
	var _size = size;

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// MARKUP
	alpha = alpha ? ' opacity: ' + alpha + ';' : '';
	zIndex = zIndex ? ' z-index: ' + zIndex + ';' : '';

	var labels = [ 'top', 'right', 'bottom', 'left' ];
	for ( var i = 0; i < 4; i++ ){
		var str = (i % 2 ? 'width' : 'height') + ':' + _size + 'px; '
		str += 'background-color: ' + color + ';' + alpha + zIndex;

		var d = document.createElement('div');
		d.id = id + '-' + i;
		d.style.cssText = str;
		Styles.addClass ( d, 'border-' + labels[i] )
		_container.appendChild(d);

		this [ labels[i] ] = d;
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// GETTER | SETTTER
	Object.defineProperty ( this, 'container', {
		get: function() {
			return _container;
		}
	});

	Object.defineProperty ( this, 'size', {
		get: function() {
			return _size;
		},
		set: function(value) {
			_size = value;
			for ( var i = 0; i < 4; i++ ){
				var key = i % 2 ? 'width' : 'height';
				Styles.setCss ( this [ labels[i] ], key, _size )
			}
		}
	});	

}
