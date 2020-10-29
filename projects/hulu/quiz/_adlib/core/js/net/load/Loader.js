/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	Loader

	Description:
		This class is designed to handle all load processes: images, fonts and data, even other Loaders! Below are multiple use case scenarios.
	
	Single Load:
		(start code)
			var singleLoader = new Loader('images/img0.jpg', { onComplete:handleLoadComplete, scope:this });
			singleLoader.load();
			
			function handleLoadComplete( target ) {
				trace( target.content[0].dataRaw );
			}
		(end code)
	
	Array of loads from one Constructor:
		(start code)
			// Array load - you can pass in multiple files on creation of a Loader
			var arrayLoader = new Loader(['font1.ttf', 'font2.ttf'], { name:'fontLoader', onComplete:handleLoadComplete, prepend:adParams.commonPath + 'fonts/' });
			arrayLoader.load();

			function handleLoadComplete( target ) {
				trace( target.content[0].dataRaw );
			}
		(end code)
	
	Complex Load:	
		(start code)
			var myLoader = new Loader('images/img0.jpg', { onComplete:handleLoadComplete, scope:this });	
			
			// append to that loader
			myLoader.add('images/img1.jpg');
			
			// append multiple
			myLoader.add(['images/img2.jpg', 'images/img3.jpg']);
			myLoader.load();

			function handleLoadComplete( target ) {
				trace( target.content[0].dataRaw );
			}
		(end code)

	Nested Loads:
		(start code)		
			// Nested loads - best practice is to make a loader for one file type
			var masterLoader = new Loader({ name:'master', onComplete:handleAllComplete, onProgress:handleAllProgress, onFail:handleLoadFail, scope:this });

			// declare a var to reference later, then add it to main loader
			var _imgLoader = new Loader( [ 'images/img2.jpg', 'images/img3.jpg' ], { name:'load_images', prepend:'images/' });
			masterLoader.add( _imgLoader );
			
			// or just add a new loader instance
			masterLoader.add( new Loader( [ 'font1.ttf', 'font2.ttf' ], { name:'load_fonts', prepend:adParams.commonPath + 'fonts/' }) );
			masterLoader.add( new Loader( ['Ad_Data.js', 'NetUtils.js', 'Align.js', 'Analytics.js'], { name:'load_js', prepend:adParams.corePath + 'utils/' }) );
			masterLoader.load();


			function handleLoadComplete( target ) {
				trace( target.content[0].dataRaw );
			}

			function handleLoadProgress( target ) {
				trace( target.progress, target.rawProgress )
			}

			function handleLoadFail( target ) {
				trace( target );
			}

			function handleAllComplete( target ) {
				var a = target.getLoader( _imgLoader )
				trace( "Loader found by var:", a )

				var b = target.getContent( 'font1.ttf' );
				trace( "Content found by name:", b );

				var c = target.getLoader( 'load_fonts' );
				trace( "Loader found by url:", c );
			}
		(end code)

	Notes:
		Public variables can be passed into the Loader instance as optional parameters for customizing the load routine.
			- query
			- name
			- prioritize
			- cacheBuster
			- method
			- scope
			- onComplete
			- onProgress
			- onFail
			- prepend
			- platformGetUrl
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */

/* TODO
	- change getAllContent() to take secret boolean so can call getAllContentRaw(true) for no extra loop
	- ? comment out progress calculations
*/

function Loader(){
	var L = this;

	LoaderBase.apply(L,arguments);

	var arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {};

	L._queue = {};
	L._total = 0;
	L._active = false;
	L._startedCount = 0;

	/**	Variable: prepend
			A file path to be added to all loader targets. 
		> var myLoader = new Loader('img.jpg', { prepend:'../../images/' });
	*/
	L.prepend = arg.prepend || '';
	
	/**	Variable: content
			An array of all loaded content as LoaderData objects. */
	L.content = [];
	
	/**	Variable: platformGetUrl
			A callback method to wrap the url, such as DoubleClick. 
		> var myLoader = new Loader('img.jpg', { platformGetUrl:Enabler.getUrl });
	*/
	L.platformGetUrl = arg.platformGetUrl;

	/**	Variable: fileType
			Manually assign the file type, eg jpg, svg */
	L.fileType = arg.fileType || null;

	L.add ( arguments[0] );
}

Loader.prototype.constructor = Loader;
LoaderBase.call( Loader.prototype );

Loader.prototype = {
	
	/* ---------------------------------------------------------------------------------------------------------------- */
	// PUBLIC	

	/**	Method: add()
			Add to the load queue: a single or array of files or even another Loader.

		Parameters:
			arg 	- a file, array of files, or Loader instance.
		(start code)
			// Single load
			var imgLoader = new Loader({ name:'img_loader' });
			
			// add to that loader
			imgLoader.add('images/img1.jpg');
			
			// add multiple
			imgLoader.add(['images/img2.jpg', 'images/img3.jpg']);
		
			// Nested loads - best practice is to make a loader for one file type
			var mainLoader = new Loader({ name:'main', onComplete:handleComplete });

			mainLoader.add( imgLoader );
			
			// or just add a new loader instance
			mainLoader.add( new Loader(['font1.ttf', 'font2.ttf'], { name:'load_fonts' }) );				
		(end code)
	*/
	add : function ( arg ){
		var L = this;
		if ( typeof arg === 'string' ){
			// single load as first parameter
			L._addSingleLoad ( arg );
		} else if ( arg instanceof Array ){
			// first parameter is an Array of urls
			for ( var i = 0; i < arg.length; i++ ){
				L._addSingleLoad ( arg[i] );
			}
		} else if ( arg instanceof Loader ){
			if ( arg.content && arg.content[0] && arg.content[0].fileType == 'fba' ){
				L._addFbaSubLoads( arg.content[0] );
			} else {
				L._addSubLoad( arg );
			}
		}
	},

	/**	Method: load()
			Starts the load process.

		(start code)
			// Single load
			var imgLoader = new Loader({ onComplete:handleComplete });
			imgLoader.load();				
		(end code)
	*/
	load : function(){
		var L = this;
		L._active = true;
		if ( L._total <= 0 ){
			trace ( 'Loader "' + L.name + '" has NO assets to be loaded.' );
		} else {
			var _has = false;
			var _output = '';
			for ( var l in L._queue ) {
				if ( !(L._queue[l] instanceof Loader) ) {
					if ( !_has ){
						_has = true;
						_output += 'Loader "' + L.name + '" requesting:';
					}
					var fileName = L._queue[l].fileName;
					var extension = L._queue[l].fileType
					var extensionIndex = fileName.indexOf( '.' + extension )
					var fileAndExtension = extensionIndex > -1 ? fileName : fileName + '.' + extension;
					_output += '\n\t -> ' + (L._queue[l].prepend||'') + fileAndExtension;
				} 	
			}
			if ( _has ) trace ( _output );
		}
		
		L._startSingleLoad(0);
	},

	/**	Method: getAllContent()
			Get all loaded content from the Loader and all nested Loaders

		(start code)
			var myLoader = new Loader(['img1.jpg', 'img2.jpg', 'img3.jpg'], { onComplete:handleComplete });
			myLoader.load();

			function handleComplete( target ) {
				var myContent = target.getAllContent();
				trace( "Content found:", myContent );
			}
		(end code)

		Returns:
			An array of LoaderData Objects with relevant loading information (like an Event Object).  Access the loaded content via the property 'dataRaw': an image, raw Json, raw XML, or font name
	*/
	getAllContent : function(){
		var _found = [];
		function searchSubLoader ( content ){
			for ( var i = 0; i < content.length; i++ ){
				//trace ( "   -> sub:", content[i] )
				if ( content[i] instanceof Loader ){
					searchSubLoader ( content[i].content );
				} else {
					_found.push(content[i]);
				} 
			}
		}

		searchSubLoader ( this.content );

		if ( _found.length < 1 ) trace ( "No Content found" );
		
		return _found;
	},

	/**	Method: getAllContentRaw()
			Get all raw loaded content from the Loader and all nested Loaders, no LoaderData Objects

		(start code)
			var myLoader = new Loader(['img1.jpg', 'img2.jpg', 'img3.jpg'], { onComplete:handleComplete });
			myLoader.load();

			function handleComplete( target ) {
				var myContent = target.getAllContentRaw();
				trace( "Content found:", myContent );
			}
		(end code)

		Returns:
			An array of only the raw data: an image, raw Json, raw XML, or font name
	*/
	getAllContentRaw : function(){
		var _content = this.getAllContent();
		for ( var i = 0; i < _content.length; i++ ){
			_content[i] = _content[i].dataRaw;
		}
		return _content;
	},

	/**	Method: getLoader()
			Get the Loader instance from the Loader or any nested Loader

		Parameters:
			id 			- the string optionally assigned to the 'name' property or the variable assigned to the Loader instance

		(start code)
			var mainLoader = new Loader({ name:'main', onComplete:handleLoadComplete });
			mainLoader.add( new Loader( [ 'font1.ttf', 'font2.ttf' ], { name:'load_fonts', prepend:adParams.commonPath + 'fonts/' }) );
			mainLoader.add( new Loader( ['Ad_Data.js', 'NetUtils.js'], { name:'load_js', prepend:adParams.corePath + 'utils/' }) );
			mainLoader.load();

			function handleLoadComplete( target ) {
				var fontLoader = target.getLoader('load_fonts');
			}
		(end code)

		Returns:
			A Loader instance
	*/
	getLoader : function ( id ){
		var _found = null;
		function searchSubLoader ( content ){
			for ( var i = 0; i < content.length; i++ ){
				//trace ( "   -> sub:", content[i] )
				if ( content[i] instanceof Loader ){
					if ( content[i] && (content[i].name === id || content[i] === id) ){
						_found = content[i];
					} else {
						searchSubLoader ( content[i].content );
					}
				} 
			}
		}

		searchSubLoader ( this.content );

		if ( !_found ) trace ( "No Loader found of that name" );
		
		return _found;
	},

	/* ------------------------------------------------------------------------------------------------------------- */
	// PRIVATE METHODS
	_addSingleLoad : function ( url, fbaOverwrite, renderOnly ){
		var L = this;

		var _singleLoader;
		var _fileType = L.fileType || LoaderUtils.getFileType ( url );
		
		// either the data as binary OR the file path and name
		var _url = fbaOverwrite || L.prepend + url;
		var _data = {
			scope : L,
			platformGetUrl : L.platformGetUrl,
			onComplete : L._handleSingleLoadComplete,
			onFail : L.onFail,

			fileType : _fileType,
			renderOnly : renderOnly,
			cacheBuster : L.cacheBuster
		}

		switch ( _fileType ){
			case 'jpg' :
			case 'jpeg' :
			case 'gif' :
			case 'png' :
			case 'svg' :
				_singleLoader = new ImageLoader ( _url, _data );
				break;
			case 'ttf' :
				_singleLoader = new FontLoader ( _url, _data );
				break;
			case 'fba' :
			case 'json' :
			case 'bin' :
			case 'binary' :	
				_singleLoader = new DataLoader ( _url, _data );
				break;
			case 'fbv' :
				_singleLoader = new FbvLoader ( _url, _data );
				break;
			default :
				_singleLoader = new InlineLoader ( _url, _data );
		}

		// from fba, the files are binary strings, so there is
		// no file name to reference so set it here
		if ( fbaOverwrite )			
			_singleLoader.fileName = LoaderUtils.getFileName(url);

		
		_singleLoader.queueIndex = L._total;
		
		L._queue [ L._total ] = _singleLoader;
		L._total++;
	},

	_addSubLoad : function ( loader ){
		var L = this;
		//trace ( L.name, '_addSubLoad()' )
		loader.onComplete = L._handleSingleLoadComplete.bind(L);
		loader.onProgress = L._handleProgress.bind(L);
		loader.onFail = L._handleFail;
		//loader.platformGetUrl = L.platformGetUrl;
		loader.queueIndex = L._total;
		L._queue [ L._total ] = loader;
		L._total++;
	},

	_addFbaSubLoads : function ( loader ){
		var asString = LoaderUtils.binaryToString ( loader.dataRaw );
	
		var byType = asString.split(':|type|:');
		byType.pop();
		
		for ( var i = 0; i < byType.length; i++ ){
			var byLabel = byType[i].split(':||:');
			
			var byCount = byLabel[1].split(':|~|:');
			byCount.pop();

			if ( byLabel[0] == 'images' ){
				this._totalImages = byCount.length;
			}

			for ( var k = 0; k < byCount.length; k++ ){
				var byName = byCount[k].split(':|name|:');
				var renderOnly = false;
				
				switch ( byLabel[0] ){
					/*
					// use only if js included, but for now is being gzipped in different file
					case 'javascript' :
						byName[1] = LoaderUtils.jsStringToUrl ( byName[1] );
						break;
					*/
					case 'images' :				
						var fileName = byName[0].split('.');
						
						var type = fileName[1] == 'svg' ? 'svg+xml' : fileName[1] ;
						byName[1] = 'data:image/' + type + ';base64,' + btoa(byName[1]);

						/*if ( fileName[1] == 'svg' ){
							//renderOnly = true;
							byName[1] = "data:image/svg+xml;base64," + btoa(byName[1]);
						} else {
							byName[1] = 'data:image/' + fileName[1] + ';base64,' + btoa(byName[1]);
						}*/
						byName[0] = fileName.join('.');
						break;
				}
				
				this._addSingleLoad ( byName[0], byName[1], renderOnly )
			}
		}
	},

	_startSingleLoad : function(i){
		var L = this;
		var _inst = L._queue[i];
		//trace ( L.name, '_startSingleLoad()', 'index:', i, 'total:', L._total )
		if ( L._total == 0 ){
			// fire a complete because there are no requests
			L._handleComplete();
		} else {
			if ( i < L._total ){
				//trace ( L.name, '_startSingleLoad() ->', _inst )
				if ( !(_inst instanceof Loader) ){
					//trace ( _inst.name, 'is a subloader' )
				//} else {
					if ( i < L._total - 1 ) {
						L._startLoadTimeOut(++i);
					}
				}
				_inst.load();
			}
		}
	},

	_startLoadTimeOut : function(i){
		var L = this;
		setTimeout( function(){
			L._startSingleLoad(i)
		}, 10 );
	},

	/* ------------------------------------------------------------------------------------------------------------- */
	// EVENT HANDLERS
	_handleSingleLoadComplete : function ( target ) {
		var L = this;
		//trace ( "_handleSingleLoadComplete(), target:", target )
		L.content [ target.queueIndex ] = target;
		delete L._queue [ target.queueIndex ];
		
		L._handleProgress();

		// is a nested Loader
		if ( target.url == undefined ){
			//trace ( '"' + L.name + '" nested Loader "' + target.name + '" Complete' );
			if ( target.queueIndex < L._total - 1 ){
				L._startLoadTimeOut(target.queueIndex+1);
			}
		}
	},

	_handleProgress : function(){
		var L = this;
		var _length = L.content.length;
		var _count = 0;
		for ( var i = 0; i < _length; i++ ){
			if ( L.content[i] ) _count++;
		}	
		//trace ( L.name, '_handleProgress()', '_count:', _count, 'total:', L._total )

		var _consecutive = _count;
		var _subProgress = 0;
				
		if ( _count < L._total && L._queue[_count] ){			
			_subProgress = L._queue[_count].progress / L._total || 0;
		}	

		L.progress = _consecutive / L._total + _subProgress;
		L.rawProgress = _count / L._total + _subProgress;

		L.onProgress.call( L.scope, L );
		//trace ( 'progress')
		if ( _count >= L._total ){
			//trace ( 'Loader calling _handleComplete()')
			L._handleComplete();
		}
	},

	_handleComplete : function(){
		var L = this;
		trace ( 'Loader "' + L.name + '" is Complete' )
		L.onComplete.call( L.scope, L );
	}
}
