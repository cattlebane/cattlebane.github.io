function LoaderBase(){
	var L = this;
	//trace ( 'LoaderBase arguments:', arguments)
	var arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {};
	
	L.onComplete = arg.onComplete || function(){};
	L.onFail = arg.onFail || function(){};
	L.onProgress = arg.onProgress || function(){};
	L.name = arg.name || '';
	L.scope = arg.scope || L;
	L.dataRaw;
	L.cacheBuster = arg.cacheBuster || false;

	L._failCalled = false;


	/* ---------------------------------------------------------------------------------------------------------------- */
	// HANDLERS
	L._handleFail = function () {
		trace ( 'LoaderBase._handleFail()' )
		if ( !L._failCalled ){
			L._failCalled = true;
			L.onFail.call( L.scope, L );

			trace ( 'Loader "'+ L.name + '" Fail:', L.url );
		}
	}
}