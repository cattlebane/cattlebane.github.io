function FbvLoader(){	
	var F = this;
	trace ( 'FbvLoader arguments:', arguments, F );
	DataLoader.apply(F,arguments);

	var arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {};

	F.onSpecs = arg.onSpecs || function(){};
	F.available = 0;
	F.images = [];
	F.isBytesLoaded = false;

	F._imagesRaw = [];
	F._prev = -1;
	F._specs;
	F._byteLength = 0;

	// approx largest value != a single base64 image
	F._byteBuffer = 3000;

	// six is the best number for cross playform/browser no drag on draw 
	F._imageRequestMax = 6; 
	
	F._imageRequestExcess = false;
}

FbvLoader.prototype = Object.create(DataLoader.prototype);
FbvLoader.prototype.constructor = FbvLoader;

// Reads .fbv data as it becomes available
FbvLoader.prototype._handleProgress = function( event ){
	var F = this;
	// checks if too many simultanious requests were called on the previous iteration
	// if so, skip parsing
	if ( F._imageRequestExcess && !F.isBytesLoaded ){
		//trace ( '     _handleProgress() calling manageImageCreate() EXCESS')
		F._manageImageCreate ();
		return;
	}

	// check the amount of bytes loaded, if less than buffer, most likely not enough for another frame
	var _byteDiff = event.dataRaw.length - F._byteLength;

	// set to the length for next iteration
	F._byteLength = event.dataRaw.length;

	// if too little data received, but is more than 0 (to avoid skipping first time) and the specs have been read
	if ( _byteDiff < F._byteBuffer && _byteDiff > 0 && F._specs ){
		trace ( 'skip' )
		return;
	}

	// split the data into an array
	F._imagesRaw = event.dataRaw.split(':::');

	// is more than one incomplete string
	if ( F._imagesRaw.length > 1 ) {

		// INIT of .fbv data
		// create the video specs object: frames, fps, width, height
		var splitSpecs = F._imagesRaw[0].split(';;;');
		if ( !F._specs ) {
			F._specs = JSON.parse(splitSpecs[0]);
			trace ( 'FBV Specs:', F._specs );
			trace ( F )
			F.onSpecs.call( F.scope, F );
		}
		F._imagesRaw[0] = splitSpecs[1];

		//trace ( '     _handleProgress() calling manageImageCreate()');
		F._manageImageCreate();
	} 
}

FbvLoader.prototype._manageImageCreate = function(){
	var F = this;
	// unless last call, check length minus 1 minus 1 more as it will be an incomplete string
	var total = F._imagesRaw.length;
	if ( !F.isBytesLoaded ) {
		total -= 2;
	}	

	//trace ( ' ! manageImageCreate() total =', total, '!')

	// >>> Throttle check HERE <<<
	// the amount of base64's ready to be created into images
	var diff = total - F._prev;				
	//if ( diff > 0 ) trace ( 'FbvLoader: ' + diff + ' create image calls');
	//trace ( '  - total:', total );
	//trace ( '  = avaliable:', F.available, ', _prev:', F._prev )

	// how many images are loading: have been created but have not fully loaded
	var loadedImagesBuffer = F._prev - F.available;
	//trace ( '  == image load buffer:', loadedImagesBuffer );
	
	// if too many images are pending, stop method and wait for next iteration
	if ( loadedImagesBuffer > F._imageRequestMax ){
		//trace ( '     ^^^^^^^^^ too many Image loads pending ^^^^^^^^^' );
		F._imageRequestExcess = true;
		return;
	}

	// stops too many ready base64's from being called at once
	if ( diff > F._imageRequestMax ){
		//trace ( '>>>>>>>>>>>>>>> EXCESSIVE SIMULTANIOUS CALLS: ' + diff + ' <<<<<<<<<<<<<<<')
		F._imageRequestExcess = true;

		// adjusts the total back to Max requests above _prev
		total = total - diff + F._imageRequestMax;
		//trace ( '  -- adjusted total:', total )
	} else {
		F._imageRequestExcess = false;
	}

	// actual image load calls
	for ( var i = F._prev; i < total; i++ ){
		F._imageCreateStart(i);
	}

	if ( F._imageRequestExcess ){
		// sets prev to only the adjusted total which is prev + Max
		F._prev = total;			
	} else {
		F._prev = F._imagesRaw.length - 2;
	}
}

FbvLoader.prototype._imageCreateStart = function ( id ){
	if ( id < 0 ) return;

	var F = this;

	if ( F.images[id] ){
		trace ( 'FbvLoader : frame ' + id + ' already populated')
		return;
	}
	//trace ( 'Image create ' + id );

	// extract dimensions here
	var frameRawInfo = F._imagesRaw[id].split(')');

	F.images[id] = {
		dataRaw : frameRawInfo
	}
	var src = 'data:image/jpg;base64,' + frameRawInfo[1];

	//trace ( 'start:', id, F.images[id] )
	new ImageLoader ( src, {
		id : id,
		scope: F,
		fileType: 'jpg',
		onComplete : F._handleImageLoadComplete, 
		onFail : function(event){
			trace ( 'FbvLoader : FAILED -> ImageLoader video frame ' + event.target.id + ' Image' );
		} 
	}).load();
}

FbvLoader.prototype._handleImageLoadComplete = function( event ){
	var F = this;
	var img = event.dataRaw;
	//trace ( '      ' + img.id + ' Image Loaded' )

	// assign the actual image to the frame object
	F.images[img.id].image = img;
	
	F.available++;

	// GRAPHIC LOADER
	var progress = F.available / F._specs.frames;
	F.onProgress.call( F.scope, F, img );

	// if data is fully loaded, manually call next set of image creation
	// necessary as parseData() no longer being called
	if ( F.isBytesLoaded && F._imageRequestExcess ){
		//trace ( "::::::::::  DATA LOAD COMPLETE & EXCESS ::::::::::::")
		if ( F.available + F._imageRequestMax >= F._prev ){
			//trace ( 'loop it back ->^' );
			F._manageImageCreate();
		}					
	}

	if ( +img.id === F._specs.frames - 1 ){
		trace ( 'FbvLoader : ALL IMAGES CREATED' )
		F.onComplete.call( F.scope, F );
	}
}

FbvLoader.prototype._handleComplete = function( event ){
	trace ( 'FbvLoader : ALL DATA LOADED' )
	var F = this;
	F.isBytesLoaded = true;
	F._handleProgress ( event );
}