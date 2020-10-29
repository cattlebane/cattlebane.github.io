(function(){
	var count = 0;
	var dependencies = [
		'mixin/LoaderTicker.js',
		'mixin/LoaderBase.js',
		'mixin/LoaderSource.js',
		'mixin/LoaderUtils.js',
		'single/InlineLoader.js',
		'single/DataLoader.js',
		'single/ImageLoader.js',
		'single/FontLoader.js',
		'single/FbvLoader.js',
		'Loader.js'
	];


	function loadDependencies(i){
		var scriptElem = document.createElement( "script" );
		scriptElem.type = "text/javascript";
		scriptElem.onload = handleLoadComplete;
		scriptElem.onerror = failAd;
		scriptElem.src = adParams.loaderPath + dependencies[i];
		document.getElementsByTagName( "head" )[0].appendChild( scriptElem );
	}

	function handleLoadComplete(event){
		count++;
		if ( count == dependencies.length ){
			trace ( 'LoaderController -> All Loaders Loaded')
			global.dispatchEvent( new CustomEvent('loaderControllerReady'))
		} else {
			trace ( 'LoaderController ->', event.target.src.replace(/.*\//,'') )
			loadDependencies(count);
		}
	}

	loadDependencies(0);
})();


/* 
- clear out this file
- add all the dependencies in order
- add this line last in the file:

global.dispatchEvent( new CustomEvent('loaderControllerReady'))

*/


/*

// change to the index file:

			function loadDependencies() {
				trace( "Index.loadDependencies()" );
				
				new Loader( adParams.dependencies, {
					name: "coreLibLoader", 
					onComplete: handleDependenciesComplete,
					onFail: failAd, 
					scope: global
				}).load();				
			}
			function handleDependenciesComplete(event){
				trace ( 'Index.handleDependenciesComplete()' )
				if ( event.content[0].fileType == 'fba' ){
					trace ( '\t\tProcess FBA')
					new Loader( event, {
						name: "fbaLoader", 
						onComplete: prepareCore,
						onFail: failAd, 
						scope: global
					}).load();
				} else {
					prepareCore();
				}
			}


			function prepareCore( event ) {
				trace( "\n\n\n -- Index.prepareCore() --" );
				PrepareCore.init( prepareCommon, event );
			}

*/