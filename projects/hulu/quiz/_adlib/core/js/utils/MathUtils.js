/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	MathUtils

	Description:
		Common math utilities.
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */
var MathUtils = (function(){
	
	/** Method: toRadians()
			Converts an angle value from Degrees to Radians.

		degree 				- An angle value as a degree  */
	function toRadians ( degree ) {
		return (Math.PI / 180.0) * degree;
	}

	/** Method: toDegrees()
			Converts an angle value from Radians to Degrees.

		radian 				- An angle value as a radian  */
	function toDegrees ( radian ) {
		return (180.0 / Math.PI) * radian;
	}

	/** Method: random()
			Get a random number between a range of two values, with an option to return to a decimal place. ( Note that
			 due to the inprecision of decimal number calculation in Javascript, you may not get a perfect result when 
			 your increment value is decimal, but the value will be close. A classic Javascript inpreciosn calculation example: 
			 0.1 + 0.2 = 0.30000000000000004 ) 

		a 				- the first value to find between  
		b 				- the second value to find between  
		increment		- optionaly set the increment of the random number. Defaults to 1  
		
		(start code)
			MathUtils.random ( 1, 3, 1 );	// returns 1 or 2 or 3
			MathUtils.random ( 1, 3, 0.5 )	// returns 1, 1.5, 2, 2.5 or 3
		(end code)

		*/
	function random ( a, b, increment ) {
		b = b || 0;
		increment = (increment != undefined && increment > 0) ? increment : 1;
		
		var min = Math.min(a, b);
		var max = Math.max(a, b);

		min = Math.ceil( min / increment ) * increment;
		max = Math.floor( max / increment ) * increment;
		
		var _num = min + (Math.floor(Math.random() * ((max - min + increment) / increment)) / (1 / increment));
		return _num;
	}

	/** Method: randomBoolean()
			Randomly returns a true or false;

		weight 				- change the outcome probabilty. Greater than .5 more likely true. Defaults to .5  */
	function randomBoolean ( weight ) {
		weight = weight || .5;
		return Math.random() < weight;
	}

	/** Method: rel()
			Calculates a value between two numbers relative to a value between 2 other numbers.
			Returns The proportion between a0 and a1 relative to the bX proportion between b0 and b1

		a0 				- the first value to find between 
		a1 				- the second value to find between  
		b0 				- the first value to use as relative to a0 
		b1 				- the second value to use as relative to a1 
		bX 				- the value between b0 and b1

		(start code)
			MathUtils.rel ( 0, 1, 10, 20, 15 );	// 0.5
			MathUtils.rel ( 100, 300, 3, 5, 3.5 ); // 150
		(end code)
		  */
	function rel ( a0, a1, b0, b1, bX ) {
		return ( (bX - b0) / (b1 - b0) ) * (a1 - a0) + a0;
	}

	/** Method: inRange()
		Checks if a value is in the range of two numbers.

		val 			- the number to check
		a 				- the first value of the range
		b 				- the second value of the range
		Returns:
	        Boolean

		(start code)
			MathUtils.inRange ( 5, 1, 10 );	// true
			MathUtils.inRange ( -5, 1, 10 ); // false
		(end code)
		  */

	function inRange ( val, a, b ) {
		var min = Math.min( a, b );
		var max = Math.max( a, b );
		return ( val <= max ) && ( val >= min );
	}

	/** Method: isNumber()
			Returns true if the passed var is a number.

		num 				- the variable to check */
	function isNumber ( num ) {
		return !isNaN( num );
	}

	/** Method: toNumber()
			Takes a numerical string and converts it to number type.

		str 				- the variable to convert */
	function toNumber ( str ) {
		return +str;
	}

	/* --------------------------------------------------------------------------------- */
	// DEV 
	/** Method: restrict()
			Restricts a value to with a range.

	*/
	function restrict ( num, min, max ) {
		return Math.max ( min, Math.min ( max, num ));
	}

	/** Method: getAnglePoint()
		Returns an array containing an [xValue, yValue] given x1, y1, distance from that starting coordinate, and angle (in *radians*) which the new point should be from the starting coordinate

		Assumes original coordinate rotation is 0 radians
	*/
	function getAnglePoint ( x, y, distance, angle ) {
		var x = x + ( Math.cos ( angle ) * distance );
		var y = y + ( Math.sin ( angle ) * distance );
		
		return [ x, y ];
	}

	/** Method: getAngle()
		Returns the angle (in *radians*) between two points given x1, y1, x2, y2
	*/
	function getAngle(x1, y1, x2, y2) {
		x2 = x2 || 0;
		y2 = y2 || 0;
		return Math.atan2((y2 - y1), (x2 - x1));
	}

	/** Method: getDistance()
		Returns the distance between two points given x1, y1, x2, y2
	*/
	function getDistance(x1, y1, x2, y2) {
		x2 = x2 || 0;
		y2 = y2 || 0;
		return Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1));
	}

	/* --------------------------------------------------------------------------------- */
	// PUBLIC ACCESS
	return {
		toRadians : toRadians,
		toDegrees : toDegrees, 
		random : random,
		randomBoolean : randomBoolean,
		rel : rel,
		inRange : inRange,
		isNumber : isNumber,
		toNumber : toNumber,
		restrict: restrict,
		getAnglePoint: getAnglePoint,
		getAngle: getAngle,
		getDistance: getDistance
	}
})();
