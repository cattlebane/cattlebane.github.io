/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	UIControlBar

	Description:
		This object creates the Control Bar, called INTERALLY from VideoControls.js.  The Control Bar is the container for all the video Control Buttons.

	Sample Players:
		> myVideoPlayer.controlBar
		
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */

function UIControlBar ( arg ){

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// MARKUP
	var U = document.createElement('div');
	U.setAttribute('class', 'rvp-controlbar');
	//U.id = arg.id;
	if ( arg.css ) 
		Styles.setCss( U, arg.css );
	arg.target.appendChild( U );

	var _displayPriority = 'internal';
	
	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PUBLIC METHODS
	/**	Method: hide()
			Visually removes the control bar from the DOM by setting its display property to none

		Parameters:
			calledInternally 	- Optional Boolean used when part of a larger system, such as the Video Control Bar. Can be called internally but the priority will be when called directly.
		
		> myVideoPlayer.controlBar.show();
	*/
	U.hide = function ( calledInternally ){
		if ( calledInternally ){
			if ( _displayPriority == 'external' ) return;
		} else {
			_displayPriority = 'external';
		}
		U.style.display = 'none';
	}

	/**	Method: show()
			Visually displays the control bar in the DOM

		Parameters:
			calledInternally 	- Optional Boolean used when part of a larger system, such as the Video Control Bar. Can be called internally but the priority will be when called directly.
		
		> myVideoPlayer.controlBar.show();
	*/
	U.show = function ( calledInternally ){
		if ( calledInternally ){
			if ( _displayPriority == 'external' ) return;
		} else {
			_displayPriority = 'external';
		}
		try {
			U.style.removeProperty ( 'display' );
		} catch (e) {
			U.style.display = null;
		}

	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	
	return U;
}