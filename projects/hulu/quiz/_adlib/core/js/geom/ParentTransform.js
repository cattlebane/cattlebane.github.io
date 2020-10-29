/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	ParentTransform
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */


// pseudo?
// TODO - change order of translations, possible seperate methods that have indexes which can be a re-orderable aray
//		- convert to prototype pattern for multiple instances?
var ParentTransform = (function (arg) {

	var self = this;

	arg = arg || {};
	/* --------------------------------------------------------------------------- */
	// PUBLIC / PASSED-IN VARIABLES
	self.rotation = arg.rotation || 0,  // in degrees, gets converted to radians before passing to Matrix2D
	self.x = arg.x || 0,
	self.y = arg.y || 0,
	self.scaleX = arg.scaleX || 1,
	self.scaleY = arg.scaleY || 1,
	self.originX = arg.originX || 0,
	self.originY = arg.originY || 0;
	self.points = arg.points || [];

	/* --------------------------------------------------------------------------- */
	// PUBLIC 
	self.calculatedPoints = [];

	/* --------------------------------------------------------------------------- */
	// PRIVATE VARIABLES	
	var _matrix = new Matrix2D();
	trace ( _matrix )

	/* --------------------------------------------------------------------------- */
	// PUBLIC METHODS
	self.addPoint = function ( toAdd ){
		self.points.push ( toAdd );
	}

	self.addPoints = function ( toAdd ){
		self.points = self.points.concate ( toAdd );
	}

	self.update = function( callback ) {
		_matrix.clear();
		_matrix.translate( self.x, self.y );
		_matrix.scale( self.scaleX, self.scaleY );
		_matrix.rotate( MathUtils.toRadians( self.rotation ));
		
		self.calculatedPoints = []
		for( var i = 0; i < this.points.length; i++ ) {				
			var newPt = transformPoint( self.points[i] );
			self.calculatedPoints.push( newPt );
		}
		if( callback ) callback( self.calculatedPoints );
		return self.calculatedPoints;
	}

	/* --------------------------------------------------------------------------- */
	// PRIVATE METHODS	
	function transformPoint ( point ) {
		/*trace ( "x:", x, "y:", y )
		trace ( "------------------------")
		trace ( mtx[0], mtx[1], mtx[2] );
		trace ( mtx[3], mtx[4], mtx[5] );
		trace ( 0, 0, 1 );
		trace ( "------------------------")
		*/

		var _offSetX = point[0] - self.originX;
		var _offSetY = point[1] - self.originY;
				
		var _newX = _offSetX * _matrix.data[0] + _offSetY * _matrix.data[3] + _matrix.data[2];
		var _newY = _offSetX * _matrix.data[1] + _offSetY * _matrix.data[4] + _matrix.data[5];
		_newX += self.originX;
		_newY += self.originY;

		return [ _newX, _newY ]
	}
	
});