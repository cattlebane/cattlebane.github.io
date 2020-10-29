/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
    Class:  SimpleNoise2D

    Description:
        SimpleNoise2D is a workaround for creating 2D noise with lightweight code. 
        It returns a Vector2D with x and y values between -0.5 - 0.5.
        For a more sophisticated purpose, please use Perline Noise https://github.com/josephg/noisejs

    ---------------------------------------------------------------------------------------------------------------------------------------------------------- */

var SimpleNoise2D = new function() {
    var S = this;

    var MAX_VERTICES = 256;
    var MAX_VERTICES_MASK = MAX_VERTICES - 1;

    var rx = [];
    var ry = [];

    for ( var i = 0; i < MAX_VERTICES; ++i ) {
        if( i === MAX_VERTICES - 1 ) {
            rx.push( rx[ 0 ]);
            ry.push( ry[ 0 ]); 
        }
        rx.push( Math.random() - 0.5 );
        ry.push( Math.random() - 0.5 );
    }

    //a : min value, b: max value, t: step
    S._lerp = function ( a, b, t ) {
        return a * ( 1 - t ) + b * t;
    };

    S._getVal = function ( axis, index ) {
        var vals = axis === 'x' ? rx : ry;

        index = index % MAX_VERTICES;
        var t = index - ~~index;
        var step = t * t * ( 3 - 2 * t );

        var min = ~~index & MAX_VERTICES_MASK;
        var max = ( min + 1 ) & MAX_VERTICES_MASK;

        return S._lerp( vals[ min ], vals[ max ], step );
    }

    /** Method: get()

        Parameters:
            x - number of location x of the desired noise value
            y - number of location y of the desired noise value 

        Returns:

            2D Noise value in Vector2D

        (start code)
            var noiseVec = SimpleNoise2D.get( 0, 5 );
        (end code)

    */
    S.get = function ( x, y ) {
        return new Vector2D( S._getVal( 'x', x ), S._getVal( 'y', y ));
    };
};
