/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	Matrix2D
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */


// Version : Mar 17, 2015 2:15 PM
/*
 * TODO - write Documentation
 *		- convert to  a, c, b, d, tx, ty ?
 *		- inverse?
 */ 

var Matrix2D = function() {
	var M = this;
	// initial set identity base matrix array to data
	M.identity = new Float32Array([ 1, 0, 0, 0, 1, 0 ]);
	M.data = new Float32Array( M.identity );
};

Matrix2D.prototype = {
	clear : function() {
		var M = this;
		M.data.set ( M.identity );
	},

	rotate : function(radians) {
		var M = this;
		// copy the identity to be modified
		var _m = new Float32Array ( M.identity );
		
		var c = Math.cos(radians).toFixed(15);
		var s = Math.sin(radians).toFixed(15);
			
		_m[0] = c;
		_m[1] = s;
		_m[3] = -s;
		_m[4] = c;
		//  cos(rad),  sin(rad), 0,
		//  -sin(rad), cos(rad), 0,
		//  0,         0,        1 

		M.multiply ( _m );
		return M;
	},

	scale : function(x, y) {
		var M = this;
		// copy the identity to be modified
		var _m = new Float32Array ( M.identity );

		_m[0] = x;
		_m[4] = y;
		//  x, 0, 0,
		//  0, y, 0,
		//  0, 0, 1 

		M.multiply ( _m );
		return M;
	},

	skew : function(ax, ay) {
		var M = this;
		// copy the identity to be modified
		var _m = new Float32Array ( M.identity );

		_m[1] = Math.tan(ax);
		_m[3] = Math.tan(ay);
		//  1,       tan(ax), 0,
		//  tan(ay), 1,       0,
		//  0,       0,       1

		M.multiply ( _m );
		return M;
	},

	translate : function(x, y) {
		var M = this;
		// copy the identity to be modified
		var _m = new Float32Array ( M.identity );

		_m[2] = x || 0;
		_m[5] = y || 0;
		//  1, 0, x,
		//  0, 1, y,
		//  0, 0, 1 

		M.multiply ( _m );
		return M;
	},

	multiply : function(m) {	
		var M = this;
		// copy the current matrix data into '_c'
		var _c = new Float32Array ( M.data );
		
		for ( var i = 0; i < 6; i++ ){
			var k = Math.floor ( i / 3 ) * 3;
			var q = i % 3;
			//trace ( i, '-', a[_a], b[_b], a[_a+1], b[_b+3], a[_a+2], b[_b+6] )
			M.data[i] = _c[k] * m[q] + _c[k+1] * m[q+3];
		}
		M.data[2] += _c[2];
		M.data[5] += _c[5];

		// a[0] * b[0] + a[1] * b[3] + a[2] * 0
		// a[0] * b[1] + a[1] * b[4] + a[2] * 0
		// a[0] * b[2] + a[1] * b[5] + a[2] * 1
		// a[3] * b[0] + a[4] * b[3] + a[2] * 0
		// a[3] * b[1] + a[4] * b[4] + a[2] * 0
		// a[3] * b[2] + a[4] * b[5] + a[5] * 1
		// 0
		// 0
		// 1
	},

	setFromCss : function( matrixString ) {
		var cssMatrix = matrixString.match( /\(([^\)]+)\)/ )[ 1 ].replace( /\s/g, '' ).split( ',' ).map( Number );
		this.data = [
			cssMatrix[ 0 ],
			cssMatrix[ 1 ],
			cssMatrix[ 4 ],
			cssMatrix[ 2 ],
			cssMatrix[ 3 ],
			cssMatrix[ 5 ]
		];
	},

	getCss : function() {
		// a, c, tx
		// b, d, ty
		// 0, 0, 1
		// matrix(a, c, b, d, tx, ty)
		var M = this;
		return 'matrix(' + M.data[0] + ',' + M.data[1] + ',' + M.data[3] + ',' + M.data[4] + ',' + M.data[2] + ',' + M.data[5] + ')';
	}
}


//http://www.wikihow.com/Inverse-a-3X3-Matrix
/*function getMatrixInverse (m){	
	var t = [
		m[0], m[3], m[6], 
		m[1], m[4], m[7],
		m[2], m[5], m[8]
	];

	// 0,  1,  2,
	// 3,  4,  5,
	// 6,  7,  8

	// a,  b,  0 
	// c,  d,  0
	// tx, ty, 1
	trace ( m );
	trace ( t );
	
	[
		m[4],	-m[1],	m[1] * m[5] - m[4] * m[2],
		-m[3],	m[0],	(m[0] * m[5] - m[3] * m[2]) * -1,
		0,		0,		m[0] * m[4] - m[3] * m[1]
	]

	var d11 = m[4]
	var d12 = - m[1]
	var d13 = m[1] * m[5] - m[4] * m[2]
	var d21 = - m[3]
	var d22 = m[0]
	var d23 = (m[0] * m[5] - m[3] * m[2]) * -1
	var d31 = 0 
	var d32 = 0
	var d33 = m[0] * m[4] - m[3] * m[1]

	var d11 = t[4]
	var d12 = - t[3]
	var d13 = t[3] * t[7] - t[4] * t[6]
	var d21 = - t[1]
	var d22 = t[0]
	var d23 = (t[0] * t[7] - t[1] * t[6]) * -1
	var d31 = 0 
	var d32 = 0
	var d33 = t[0] * t[4] - t[1] * t[3]

	var d11 = t[4] * t[8] - t[5] * t[7]
	var d12 = (t[3] * t[8] - t[5] * t[6]) * -1
	var d13 = t[3] * t[7] - t[4] * t[6]
	var d21 = (t[1] * t[8] - t[2] * t[7]) * -1
	var d22 = t[0] * t[8] - t[2] * t[6]
	var d23 = (t[0] * t[7] - t[1] * t[6]) * -1
	var d31 = t[1] * t[5] - t[2] * t[4]
	var d32 = (t[0] * t[5] - t[2] * t[3]) * -1
	var d33 = t[0] * t[4] - t[1] * t[3]



	return [ d11, d12, d13, d21, d22, d23, d31, d32, d33 ];
}*/

