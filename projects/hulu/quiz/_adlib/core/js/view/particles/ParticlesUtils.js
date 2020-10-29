var ParticlesUtils = ParticlesUtils || {};
//object

ParticlesUtils = {

	objectDefault: function ( obj, defaultObj ) {
		var result = {};
		for( var key1 in obj ) {
			result[ key1 ] = obj[ key1 ];
		}

		for( var key2 in defaultObj ) {
			if( result[ key2 ] === undefined ) {
				result[ key2 ] = defaultObj[ key2 ];
			}
		}
		return result;
	},

	objectifier: function ( splits, create, obj ) {
		var result = obj || {};
		var i;
		var s;
		for( i=0; result && (s = splits[i]); i++) {
			result = (s in result ? result[s] : (create ? result[s] = {} : undefined));
		}
		return result;
	},

	/* Style */
	easyTween: function ( animations, maxDuration, frameCount ) {
		var style = {};

		for( var key in animations ) {
			var obj = animations[ key ];
			var steps = obj.steps;
			var duration = ( obj.duration === 'max' ) ? maxDuration : ( obj.duration || maxDuration );
			var perc = obj.loop ? ( frameCount % duration ) / duration : frameCount / duration;
			perc = MathUtils.restrict( perc, 0, 1 );
			var i;
	
			for( i=0; i<steps.length-1; i++ ) {
				//check current and next
				var s1 = steps[ i ];
				var s2 = steps[ i + 1 ];

				if ( MathUtils.inRange( perc, s1.s, s2.s )) {
					val = [];
					val = MathUtils.rel( s1.v, s2.v, s1.s, s2.s, perc );
					style[ key ] = val;
					break;
				}
			}
		}
		return style;
	},

	getRGBA: function ( rgb, alpha ) {
		var r = ~~MathUtils.restrict( rgb[ 0 ], 0, 255 );
		var g = ~~MathUtils.restrict( rgb[ 1 ], 0, 255 );
		var b = ~~MathUtils.restrict( rgb[ 2 ], 0, 255 );
		var a = MathUtils.restrict( alpha, 0, 1 );

		return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
	},

	randomNumInRange: function ( v, r, increment ) {
		if( !!!r ) {
			return v;
		}
		increment = increment || 0.01;
		return v + MathUtils.random( -r / 2, r / 2, increment );
	},

	randomArrayInRange: function ( v, r, increment ) {
		increment = increment || 0.01;
		var result = [];
		var i;
		for( i=0; i<v.length; i++ ) {
			result.push( this.randomNumInRange( v[ i ], r[ i ], increment ));
		}

		return result;
	},

	randomVectorInRange: function ( v, r, shape ) {

		var center = new Vector2D( v.x, v.y );
		var rx = r.x / 2;
		var ry = r.y / 2;
		var rnd;

		switch( shape ) {
			case 'rect':
				var x = MathUtils.random( -rx, rx, 0.01 );
				var y = MathUtils.random( -ry, ry, 0.01 );
				rnd = new Vector2D( x, y );
			break;

			case 'oval':
			default:
				var rnd = Vector2D.random();
				rnd.x *= rx * Math.random();
				rnd.y *= ry * Math.random();
		}

		center.add( rnd );

		return center;
	},

	secToFrameCount: function ( v, fps ) {
		return ~~( v * fps );
	},

	frameCountToSec: function ( v, fps ) {
		return v / fps;
	}
}

