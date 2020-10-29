/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	Async
		The grassroots beginning of an AsyncMethodToken equivilent. This is setup currently to register tokens globally,
		and execute a single callback function when the token queue reaches zero. Very basic stuff.
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */

var Async = function Async() {

	var A = this;

	/** Method: wait()
			Adds a token to the Async queue. */
	A.wait = function() {
		tokens.push( 1 );
	}

	/** Method: done()
			Removes a token from the Async queue. */
	A.done = function() {
		tokens.pop();
	}

	/** Method: onComplete()
			Specifies a callback function, starts a setInterval if one is not currently running, and checks
			to run the callback. */	
	A.onComplete = function( _callback ) {
		callback = _callback;
	}

	/** Method: start()
			Begins checking the token list. When it is 0 length, the callback gets fired. */
	A.start = function() {
		asyncIntervalId = setInterval( checkAsyncComplete, INTERVAL_RATE_IN_MS );
		checkAsyncComplete();
	}


	// -- INTERNAL --
	var INTERVAL_RATE_IN_MS = 25;

	var asyncIntervalId = -1;
	var tokens = [];
	var callback;

	var checkAsyncComplete = function() {
		if( callback && !tokens.length ) {
			clearInterval( asyncIntervalId );
			callback.call();
		}
	}
}

