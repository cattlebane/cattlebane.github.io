/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	Vector2D

	Description:
		A simple 2D Vector classs 
	
		(start code)
			var myVector1 = new Vector2D( 0, 320 );
			var myVector2 = new Vector2D( -3, 5.5 );
		(end code)

	---------------------------------------------------------------------------------------------------------------------------------------------------------- */

var Vector2D = function ( x, y ) {
	this.x = x || 0;
	this.y = y || 0;
};

Vector2D.prototype = {

	/** Method: add()
			Adds another vector to itself
        Parameters:
            v - Vector2D

        Returns:
			Vector2D
        
        (start code)
        	myVector1.add( myVector2 );
		(end code)
    */
    add: function ( v ) {
		this.x += v.x;
		this.y += v.y;
		return this;
	},

	/** Method: sub()
			Subtracts another vector from itself
        Parameters:
            v - Vector2D

        Returns:
			Vector2D
        
        (start code)
        	myVector1.sub( myVector2 );
		(end code)
    */
	sub: function ( v ) {
		this.x -= v.x;
		this.y -= v.y;
		return this;
	},

	/** Method: dist()
			Returns the distance between two vectors as locations
        Parameters:
            v - Vector2D

        Returns:
			Number of the distance
        
        (start code)
        	var distance = myVector.dist( myVector2 );
		(end code)
    */
	dist: function ( v ) {
		var x = this.x - v.x;
		var y = this.y - v.y;
		return Math.sqrt( x * x + y * y );
	},

	/** Method: mult()
			Multiplies X and Y of the vector by s

        Parameters:
            s - number

        Returns:
			Vector2D
        
        (start code)
        	myVector.mult( 10.3 );
		(end code)
    */
	mult: function ( s ) { 
		this.x *= s;
		this.y *= s;
		return this;
	},

	/** Method: div()
			Divides X and Y of the vector by s
        
        Parameters:
            s - number

        Returns:
			Vector2D
        
        (start code)
        	myVector.div( 2 );
		(end code)
    */
	div: function ( s ) {
		this.x /= s;
		this.y /= s;
		return this;
	},
	/** Method: limit()
			Limits the length of the vector if it's longer than s
        Parameters:
            s - number

        Returns:
			Vector2D
        
        (start code)
        	myVector.limit( 18.2 );
		(end code)
    */
	limit: function ( s ) {
		var m = this.length();
		if( m > s ) {
			this.mult( s / m );
		}
		return this;
	},
	/** Method: length()
			Returns the length of the vector

        Returns:
			Number

        (start code)
        	var length = myVector.length();
		(end code)
    */
	length: function () {
		return Math.sqrt( this.x * this.x + this.y * this.y );
	},
	/** Method: normalize()
			Normalizes the vector( ie scale the vector to length of 1 )

        Returns:
			Vector2D

        (start code)
        	myVector.normalize();
		(end code)
    */
	normalize: function () {
		var ratio = 1 / this.length();
		return this.mult( ratio );
	},
	/** Method: clone()
			Creates a new Vector2D with and same x and y

        Returns:
			Vector2D

        (start code)
        	var newVecotor = myVector.clone();
		(end code)
    */
	clone: function () {
		return new Vector2D( this.x, this.y );
	}

};
/** Method: degreeToVector()
		Converts a degree 0 - 360 to a normalized vector

    Returns:
		Vector2D

    (start code)
    	var myVecotor = Vector2D.degreeToVector( 45 );
	(end code)
*/
Vector2D.degreeToVector = function ( d ) {
	var theta = MathUtils.toRadians( d );
	return new Vector2D( Math.cos( theta ), Math.sin( theta ));
}
/** Method: random()
		Returns a random normalized vector 

	Parameters:
            degreeIncrement - optional, the degree increment of the random vector, defaults to 0.01
    
    Returns:
		Vector2D

    (start code)
    	var myVecotor1 = Vector2D.random();
    	var myVecotor2 = Vector2D.random( 1 );
	(end code)
*/
Vector2D.random = function ( degreeIncrement ) {
	var inc = degreeIncrement || 0.01;
	return Vector2D.degreeToVector( MathUtils.random( 0, 360, inc ));
};