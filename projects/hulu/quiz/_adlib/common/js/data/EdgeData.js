var EdgeData = ( function( arg ) {

	var self = this;
	arg = arg || {};

	/*-- Red.Edge.data.start --*/



	/*-- Red.Edge.data.end --*/



	

	/* --------------------------------------------------------------------------- */
	// PUBLIC 
	self.getMaskCssFor = function( instanceId ) {
		return '-webkit-clip-path: ' + self.convertMaskShapeToMaskCss( self.getMaskShapeBy( instanceId ).update() );
	}
	self.getMaskShapeBy = function( instanceId ) {
		for( var key in maskShapes ) {
			if( key == instanceId )
				return maskShapes[key];
		}
	}
	self.convertMaskShapeToMaskCss = function( maskPoints ) {
		var maskCss = 'polygon( '
		for( var i=0; i < maskPoints.length; i++ ) {
			maskCss += String( maskPoints[i][0] ) + 'px ' + String( maskPoints[i][1] ) + 'px, '
		}
		return maskCss.slice( 0, maskCss.length-2 ) + ' )'		
	}




	/* --------------------------------------------------------------------------- 
	// PRIVATE 
	var _exampleVar = new ExampleClass();

	function exampleFunc( point ) {

	}
	*/
	
});