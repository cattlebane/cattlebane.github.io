/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	MotionUtils
		This object is for accessing the mobile/tablet's accelerometer for tilt shifting values
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */
var MotionUtils = (function(){
	var ax = 0,
		ay = 0;

	var _zeroX = 0,
		_zeroY = 0,
		_isInit = true,
		_negX,
		_posX,
		_negY,
		_posY,
		_multi = 1,
		_callback;

	/* ----------------------------------------------------------------------------------------------- */
	// PUBLIC METHODS

	/** Method: setSpeedLimits()
			Set the minimum and maximum values that can be returned

		negX 				- minimum value returned when tilting left ( will be a negative number )
		posX				- maximum value returned when tilting right ( will be a positive number )
		negY 				- minimum value returned when tilting backward ( will be a negative number )
		posY				- maximum value returned when tilting forward ( will be a positive number )  */
	function setSpeedLimits ( negX, posX, negY, posY ) {
		_negX = negX;
		_posX = posX;
		_negY = negY;
		_posY = posY;
	}

	/** Method: setSpeedMultiplier()
			Set a percentage multiplier to amplify or minimize the returned value.

		multi 				- a number to multiply the returned value by. Defaults to 1.  */
	function setSpeedMultiplier ( multi ) {
		_multi = ( multi <= 0 ) ? 1 : multi ;
	}

	/** Method: activate()
			Starts the listening for a move of the device

		callback 			- a passed in method that will be called every time a device movement is detected.  */
	function activate (callback) {
		_callback = callback;
		window.addEventListener( 'deviceorientation', onOrientation, false );
	}

	/** Method: deactivate()
			Stops the listening for a move of the device.
	 */
	function deactivate () {
		window.removeEventListener( 'deviceorientation', onOrientation, false );
	}

	/** Method: callibrate()
			Sets the relative zero position to the current orientation of the device.
	 */
	function callibrate () {
		_isInit = true;
	}

	/* ----------------------------------------------------------------------------------------------- */
	// EVENT HANDLERS
	function onOrientation ( e ) {
	    switch( window.orientation ) {
	        case -90:
	          // Landscape, right-side down
	          ay = e.gamma;
	          ax = -e.beta;
	          break;
	        case 90:
	          // Landscape, left-side down
	          ay = -e.gamma;
	          ax = e.beta;
	          break;
	        case 180:
	          // Upside-down portrait
	          ay = -e.beta;
	          ax = -e.gamma;
	          break;
	        default:
	          // Portrait
	          ay = e.beta;
	          ax = e.gamma;
	    }

	    if ( _isInit ) {
	    	_zeroX = ax;
	    	_zeroY = ay;
	    	_isInit = false;
	    }

	    ax -= _zeroX;
	    ay -= _zeroY;

	    ax *= _multi;
	    ay *= _multi;

	    if ( _negX && ax < _negX ) ax = _negX;
	    if ( _posX && ax > _posX ) ax = _posX;
	    if ( _negY && ay < _negY ) ay = _negY;
	    if ( _posY && ay > _posY ) ay = _posY;

		_callback ( ax, ay );
	}

	/* ----------------------------------------------------------------------------------------------- */
	// PUBLIC ACCESS
	return {
		ax : ax, 
		ay : ay,
		callibrate : callibrate,
		setSpeedLimits : setSpeedLimits,
		setSpeedMultiplier : setSpeedMultiplier,
		activate : activate,
		deactivate : deactivate
	}
})();
