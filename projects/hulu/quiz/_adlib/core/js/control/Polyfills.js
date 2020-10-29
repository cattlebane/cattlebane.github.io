/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: Polyfills
	
	Description:
		Internal, replaces native functionality. Especially important in patching older browser deficiencies,
		without having to write gads of extra implementation code in the build. 

		Because these methods override JS functionality, they need to be available before any of the JS
		dependencies are loaded. A synchronous load would take too much time, we want to keep the index as 
		light as possible. The final choice is to put these overrides in <Loader>. But to do so permanently 
		is organizationally confusing.

		Therefore, this class remains a stand-alone. But it is not loaded into the ad. It is written into 
		the head of Loader.js during Deploy.
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */
Polyfills = new function() {

	trace ( 'Polyfills:' )

	/** Method: bind() */
	if( typeof Function.prototype.bind != 'function' ) {
		trace( ' -> bind()')
		Function.prototype.bind = function bind( obj ) {
			var args = Array.prototype.slice.call( arguments, 1 ),
				self = this,
				nop = function() {},
				bound = function() {
					return self.apply(
						this instanceof nop ? this : (obj || {}), args.concat( Array.prototype.slice.call( arguments ))
					);
				};
			nop.prototype = this.prototype || {};
			bound.prototype = new nop();
			return bound;
		};
	}

	/** Method: CustomEvent() */
	try {
		new CustomEvent('test');
	} catch(e) {
		trace( ' -> CustomEvent')
		function CustomEvent2 ( event, params ) {
			params = params || { bubbles: false, cancelable: false, detail: undefined };
			var evt = document.createEvent( 'CustomEvent' );
			evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
			return evt;
		}
		CustomEvent2.prototype = window.Event.prototype;
		window.CustomEvent = CustomEvent2;
	}	

	/** Variable: Date.now */
	if ( !Date.now ) {
		trace( ' -> Date.now')
		Date.now = function() { 
			return new Date().getTime(); 
		};
	}
	
}

