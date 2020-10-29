/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	ImageManager

	Description:
		This module is used to add/load/manage all Images.
		
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */
var ImageManager = new function(){
	var I = this;

	var _pending = [];
	var _imageManagerLoader;
	var _dict = {};
	var _isLoading = false;
	var _onComplete = function(){};

	/* ------------------------------------------------------------------------------------------------------------- */
	// PUBLIC METHODS

	/**	Method: addToLoad()
			Add an image file-path to be loaded.

		Parameters:
			file		- A filename or path
			prepend 	- Optional. Prepends a file path to the file name
		
		(start code)
			// Add an image from the "images/" folder
			ImageManager.addToLoad( 'sample.png', adParams.imagesPath );

			// Add an image full path, and get the result key back
			var sampleImageId = ImageManager.addToLoad( 'http://some/full/file/path/sample.png' );
		(end code)

		Returns:
			An "imageId" which can be used to get <ImageManager>.get( imageId )
	*/
	I.addToLoad = function( file, prepend ) {
		if ( !checkLoading( 'addToLoad', file ) ){
			file = ( prepend || '' ) + file;
			_pending.push( file );  
			return LoaderUtils.getFileName( file );
		}
	}

	/** Method: addLoader()
			Add a Loader to loaded along with any other queued image requests.

		Parameters:
			loader 	- A <Loader>

		(start code)
			// 
			ImageManager.addLoader( new Loader( 
				assets.images, { 
					name: 'imageLocalLoader', 
					prepend: adParams.imagesPath 
			}));
		(end code) */
	I.addLoader = function( loader ) {
		if ( !checkLoading( 'addLoader', loader ) ){
			checkLoader();
			_imageManagerLoader.add( loader );
		}
	}

	/**	Method: get()
			Add an image file to be loaded along with local and edge images.

		Parameters:
			imageId		- A String id of an Image
		
		> ImageManager.get ( 'sample' );
	*/
	I.get = function ( imageId ){
		if( _dict[ imageId ] ) 
			return _dict[ imageId ];
		else
			throw new Error ( "ImageManager : No image named '" + imageId + "' has been loaded" );
	}

	/** 	Method: load()
			Executes load queue, which, on success, will yield all of the requested images available with <ImageManager>.get()

		Parameters:
			callback 	- All images are loaded. If any images fail to load, the ad will fail-over. */ 
	I.load = function ( callback ){
		if ( !checkLoading( 'load' ) ){
			_isLoading = true;
			checkLoader();
			_onComplete = callback;
			_imageManagerLoader.add( new Loader( _pending, { name: 'dynamicImages' }) );	
			_imageManagerLoader.load();
		}
	}

	I.addFbaImages = function ( target ){
		if ( target )
			addToDictionary ( target.getAllContentRaw() );
	}

	/* ------------------------------------------------------------------------------------------------------------- */
	// PRIVATE METHODS
	function addToDictionary ( content ){
		for ( var i = 0; i < content.length; i++ ){
			if ( content[i] instanceof Image || content[i] instanceof SVGElement ){
				var img = content[i];
				checkId ( img.id )
				_dict [ img.id ] = img;
			}
		}
		trace ( 'ImageManager:', _dict );
		_onComplete.call();		
	}

	function checkLoader(){
		if ( !_imageManagerLoader ){
			_imageManagerLoader = new Loader({ 
				name : 'imageManagerLoader',
				onComplete : handleLoadComplete,
				onFail : global.failAd
			});
		}
	}

	function checkLoading( method, target ){
		if ( _isLoading )
			throw new Error ( 'ImageManager is currently loading...\n\n\tCan NOT call ImageManager.' + method + '(' + (target||'') + ') until previous callback is fired.\n\n' )
		return _isLoading
	}

	function checkId ( id ){
		if ( _dict[id] )
			throw new Error ( 'Duplicate Image Id - One or more images loading in have the same name. Each Image needs a unique file name.' );
	}

	/* ------------------------------------------------------------------------------------------------------------- */
	// EVENT HANDLERS
	function handleLoadComplete ( target ){
		_imageManagerLoader = null;
		_pending = [];
		_isLoading = false;

		addToDictionary ( target.getAllContentRaw() );
	}

}
