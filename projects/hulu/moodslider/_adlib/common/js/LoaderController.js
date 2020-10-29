





/* -- POLYFILLS --------------------------------------------
 *
 *
 */
Polyfills = new function() {

	trace ( 'Polyfills:' )
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
	if ( !Date.now ) {
		trace( ' -> Date.now')
		Date.now = function() { 
			return new Date().getTime(); 
		};
	}
	
}




/* -- LOADER: LoaderTicker.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
function LoaderTicker(){
	var L = this;
	L._setTicker = function ( args ) {
		
		var node = document.createElement('div');
		node.innerHTML = args.content;
		node.style.cssText = args.css || '';

		document.body.appendChild(node);

		var width = args.width != undefined ? args.width : node.offsetWidth;
		
		node.style.fontFamily = args.font || '';

		var _timeOut = setTimeout(function() {
			clearInterval( _interval );
			L._handleFail();
		}, 5000 );

		var _interval = setInterval(function(){
			if ( node.offsetWidth != width ){
				clearTimeout( _timeOut );
				clearInterval( _interval );
				
				L._handleTickerComplete(node);
			}
		}, 10 );
	},

	L._removeTickerNode = function ( node ){
		node.parentNode.removeChild( node );
	}
}









/* -- LOADER: LoaderBase.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
function LoaderBase(){
	var L = this;
	var arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {};
	
	L.onComplete = arg.onComplete || function(){};
	L.onFail = arg.onFail || function(){};
	L.onProgress = arg.onProgress || function(){};
	L.name = arg.name || '';
	L.scope = arg.scope || L;
	L.dataRaw;
	L.cacheBuster = arg.cacheBuster || false;

	L._failCalled = false;
	L._handleFail = function () {
		trace ( 'LoaderBase._handleFail()' )
		if ( !L._failCalled ){
			L._failCalled = true;
			L.onFail.call( L.scope, L );

			trace ( 'Loader "'+ L.name + '" Fail:', L.url );
		}
	}
}









/* -- LOADER: LoaderSource.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
function LoaderSource(){
	var L = this;
	var arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {};
	
	L.url = global.matchProtocolTo( arguments[0] || '' );
	
	if ( arg.platformGetUrl ){ 
		L.platformGetUrl = arg.platformGetUrl;
		L.url = arg.platformGetUrl ( L.url );
	}

	L.fileName = arg.id === undefined ? LoaderUtils.getFileName ( L.url ) : arg.id;
	L.fileType = arg.fileType || LoaderUtils.getFileType ( L.url );
}









/* -- LOADER: LoaderUtils.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
var LoaderUtils = new function(){
	var L = this;

	L.createXMLHttpRequest = function() {
		try { return new XMLHttpRequest(); } catch(e){}
		try { return new ActiveXObject("Msxml2.XMLHTTP"); } catch(e){}
		alert("XMLHttpRequest not supported");
		return null;
	}

	L.getFileName = function ( url ){
		var extension = url.lastIndexOf('.');
		var directory = url.lastIndexOf('/') + 1;
		if ( directory > extension ) extension = undefined;
		return url.substring( directory, extension );
	}

	L.getFontName = function ( url ){
		return url.substring( url.lastIndexOf('/') + 1, url.indexOf( '.' ));
	}

	L.getFileType = function ( url ) {
		url = url || '';
		var _index = url.indexOf ( '?' );
		if ( _index > -1 ){
			url = url.substr ( 0, _index );
		}
		var _split = url.match ( /[^\\]*\.(\w+)$/ );
		var _base64 = url.match ( /image\/(jpeg|jpg|png)/ );
		var _type = _split ? _split[1] : _base64 ? _base64[1] : 'unknown' ;
		
		return _type;
	}

	L.getFullUrl = function( prepend, file, platformGetUrl ){
		var _prepend = LoaderUtils._getUrlPrepend ( prepend );
		var _url = global.matchProtocolTo( _prepend + _file );
		if ( platformGetUrl ){ 
			_url = platformGetUrl ( _url );
		}
		return url;
	}

	L.getUrlPrepend = function(path){
		return path ? path.replace(/\/?$/, '/') : '' ;
	}

	L.getParamsFromData = function ( query ) {
		if( typeof query === 'string' ){
			return query;
		} else {
			var queryString = '';			
			for( var prop in query ) {
				trace ( "      prop =", prop )
				queryString += prop + '=' + query[ prop ] + '&';
			}

			return queryString.substr( 0, queryString.length - 1 );
		}
	}
	L.binaryToString = function ( bin ){
		
		var xhr = L.createXMLHttpRequest();
		var hasOverwrite = xhr.overrideMimeType != undefined;

		var characters = [];
		for( var i = 0; i < bin.length; i++ ) {
			var id = bin[i];
			if ( hasOverwrite ){
				id = id.charCodeAt(0)
			}

			var character = String.fromCharCode( ( id & 0xff ) );			
			characters.push( character );
		}
		
		return characters.join('');
	}

}










/* -- LOADER: InlineLoader.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
function InlineLoader(){	
	var I = this;
	LoaderSource.apply(I,arguments);
	LoaderBase.apply(I,arguments);
}

InlineLoader.prototype = {
	load : function(){
		var I = this;
		var elem = I.fileType == 'css' ? I._createLink() : I._createScript();
		elem.charset = 'utf-8';
		elem.onload = I._handleComplete.bind(I);
		elem.onerror = I._handleFail;
		I.fileType == 'css' ? elem.href = this.url : elem.src = I.url;
		document.getElementsByTagName( 'head' )[0].appendChild( elem );
	},

	_createScript : function(){
		var elem = document.createElement( 'script' );
		elem.type = 'text/javascript';
		return elem;
	},

	_createLink : function(){
		var elem = document.createElement( 'link' );
		elem.rel = 'stylesheet';
		elem.type = 'text/css';
		return elem;
	},

	_handleComplete : function (event) {
		var I = this;
		I.dataRaw = event.target;
		I.onComplete.call( I.scope, I );
	}
}
InlineLoader.prototype.constructor = InlineLoader;
LoaderSource.call( InlineLoader.prototype );
LoaderBase.call( InlineLoader.prototype );










/* -- LOADER: DataLoader.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
function DataLoader(){	
	var D = this;
	LoaderSource.apply(D,arguments);
	LoaderBase.apply(D,arguments);

	var arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {};
	
	this.method = (arg.method || 'get').toLowerCase();
	this.query = arg.query || null;
	this.responseType = arg.responseType || null;
}

DataLoader.prototype = {
	load : function(){		
		var D = this;
		var queryString = null;
		var isPost = D.method === 'post';

		D.req = LoaderUtils.createXMLHttpRequest();

		if ( D.responseType )
			D.req.responseType = D.responseType;

		var url = D.url;
		if ( D.req.overrideMimeType ) {
			switch ( D.fileType ){
				case 'xml' :
					D.req.overrideMimeType( 'text/xml' );
					break;
				case 'json' :
					D.req.overrideMimeType( 'application/json' );
					break;
				case 'fba' :
				case 'bin' :
				case 'binary' :
					D.req.overrideMimeType( 'text/plain; charset=x-user-defined' );
					break;
			}
		}

		if ( D.query ) {
			queryString = LoaderUtils.getParamsFromData( D.query );
			encodeURIComponent( queryString );
			if ( !isPost ){
				url += '?' + queryString;
				queryString = null;
			}			
		}
		
		if ( D.cacheBuster ){
			url += D.query && !isPost ? '&' : '?' ;
			url += 'cb=' + new Date().getTime();
		}
		
		D.req.onreadystatechange = D._handleStateChange.bind ( D );
		D.req.open( D.method, url, true );

		if( D.method === 'post'){
			D.req.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );
		}

		D.req.send( queryString );	
	},

	_handleStateChange : function ( target ) {
		var D = this;
		switch ( D.req.readyState ){
			case 3 :
				if ( this.req.status == 200 ){
					D.dataRaw = D.responseType ? D.req.response : D.req.responseText;
					D._handleProgress(D);
				}
				break;
			case 4 :
				if ( D.req.status == 200 ){		
					D.dataRaw = D.responseType ? D.req.response : D.req.responseText;
					if ( D.fileType == 'fba' && !D.req.overrideMimeType ) {
						D.dataRaw = D.req.responseBody.toArray();
					} 

					D._handleComplete(D);
				} else {
					D._handleFail ({ target:target });
				}
				break;
		}
	},

	_handleProgress : function(){
		var D = this;
		D.onProgress.call( D.scope, D );
	},

	_handleComplete : function(){
		var D = this;
		D.onComplete.call( D.scope, D );
	}
}
DataLoader.prototype.constructor = DataLoader;
LoaderSource.call( DataLoader.prototype );
LoaderBase.call( DataLoader.prototype );











/* -- LOADER: ImageLoader.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
function ImageLoader(){	
	var I = this;
	LoaderSource.apply(I,arguments);
	LoaderBase.apply(I,arguments);	
	LoaderTicker.apply(I,arguments);	

	var arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {};
	I.renderOnly = !!arg.renderOnly;
}

ImageLoader.prototype = {
	load : function(){
		var I = this;
		if ( I.renderOnly ){
			I._setTicker({
				content : I.url,
				width : 0	
			});
		} else {
			var img = new Image();
			img.id = I.fileName;
			if ( I.url.indexOf( 'http' ) > -1 ) 
				img.crossOrigin = 'anonymous';
			img.onload = I._handleComplete.bind(I);
			img.onerror = I._handleFail;
			
			img.src = I.url;
		}
	},

	_handleTickerComplete : function( node ) {
		var I = this;
		var children = node.childNodes;
		for( var i = 0; i < children.length; i++ ){
			var child = children[i]
			if ( child instanceof SVGElement ){
				child.id = I.fileName;
				break;
			}
		}
		I._handleComplete({ target:child });
		I._removeTickerNode ( node );
	},

	_handleComplete : function (event) {
		trace ( 'ImageLoader complete' )
		var I = this;
		I.dataRaw = event.target;
		I.onComplete.call( I.scope, I );
	}
}

ImageLoader.prototype.constructor = ImageLoader;
LoaderSource.call( ImageLoader.prototype );
LoaderBase.call( ImageLoader.prototype );
LoaderTicker.call( ImageLoader.prototype );










/* -- LOADER: FontLoader.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
function FontLoader(){	
	var F = this;
	LoaderSource.apply(F,arguments);
	LoaderBase.apply(F,arguments);
	LoaderTicker.apply(F,arguments);	
}

FontLoader.prototype = {
	load : function (){
		var F = this;

		F.fileName = F.fileName.split('.')[0];

		var assembledFontRule = '@font-face { font-family: ' + F.fileName + '; src: url(' + F.url + ');}';
		
		var getSheet = document.getElementById('RED_fontStyleSheet');
		if ( getSheet ){
			getSheet.innerHTML += assembledFontRule;
		} else {
			var styleScript = document.createElement('style');
			styleScript.type = 'text/css';
			styleScript.media = 'screen';
			styleScript.id = 'RED_fontStyleSheet';
			styleScript.appendChild(document.createTextNode( assembledFontRule ));
			document.getElementsByTagName( 'head' )[0].appendChild( styleScript );
		}	

		F._setTicker({
			content : " !\"\\#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~",
			css : 'position:absolute; top:-1000px; font-size:100px; font-family:san-serif; font-variant:normal; font-style:normal; font-weight:normal; letter-spacing:0; white-space:nowrap;',
			font : F.fileName
		});
	},

	_handleTickerComplete : function( node ) {
		var F = this;
		setTimeout(function(){
			F._removeTickerNode ( node );
		}, 300);

		F._handleComplete();
	},

	_handleComplete : function (event) {
		trace ( 'FontLoader complete' )
		var F = this;
		F.dataRaw = F.fileName;
		F.onComplete.call( F.scope, F );
	}
}

FontLoader.prototype.constructor = FontLoader;
LoaderSource.call( FontLoader.prototype );
LoaderBase.call( FontLoader.prototype );
LoaderTicker.call( FontLoader.prototype );










/* -- LOADER: FbvLoader.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
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
	F._byteBuffer = 3000;
	F._imageRequestMax = 6; 
	
	F._imageRequestExcess = false;
}

FbvLoader.prototype = Object.create(DataLoader.prototype);
FbvLoader.prototype.constructor = FbvLoader;
FbvLoader.prototype._handleProgress = function( event ){
	var F = this;
	if ( F._imageRequestExcess && !F.isBytesLoaded ){
		F._manageImageCreate ();
		return;
	}
	var _byteDiff = event.dataRaw.length - F._byteLength;
	F._byteLength = event.dataRaw.length;
	if ( _byteDiff < F._byteBuffer && _byteDiff > 0 && F._specs ){
		trace ( 'skip' )
		return;
	}
	F._imagesRaw = event.dataRaw.split(':::');
	if ( F._imagesRaw.length > 1 ) {
		var splitSpecs = F._imagesRaw[0].split(';;;');
		if ( !F._specs ) {
			F._specs = JSON.parse(splitSpecs[0]);
			trace ( 'FBV Specs:', F._specs );
			trace ( F )
			F.onSpecs.call( F.scope, F );
		}
		F._imagesRaw[0] = splitSpecs[1];
		F._manageImageCreate();
	} 
}

FbvLoader.prototype._manageImageCreate = function(){
	var F = this;
	var total = F._imagesRaw.length;
	if ( !F.isBytesLoaded ) {
		total -= 2;
	}	
	var diff = total - F._prev;				
	var loadedImagesBuffer = F._prev - F.available;
	if ( loadedImagesBuffer > F._imageRequestMax ){
		F._imageRequestExcess = true;
		return;
	}
	if ( diff > F._imageRequestMax ){
		F._imageRequestExcess = true;
		total = total - diff + F._imageRequestMax;
	} else {
		F._imageRequestExcess = false;
	}
	for ( var i = F._prev; i < total; i++ ){
		F._imageCreateStart(i);
	}

	if ( F._imageRequestExcess ){
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
	var frameRawInfo = F._imagesRaw[id].split(')');

	F.images[id] = {
		dataRaw : frameRawInfo
	}
	var src = 'data:image/jpg;base64,' + frameRawInfo[1];
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
	F.images[img.id].image = img;
	
	F.available++;
	var progress = F.available / F._specs.frames;
	F.onProgress.call( F.scope, F, img );
	if ( F.isBytesLoaded && F._imageRequestExcess ){
		if ( F.available + F._imageRequestMax >= F._prev ){
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









/* -- LOADER: Loader.js-----------------------------------------------------------------------------------------
 *
 *
 *
 */
function Loader(){
	var L = this;

	LoaderBase.apply(L,arguments);

	var arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {};

	L._queue = {};
	L._total = 0;
	L._active = false;
	L._startedCount = 0;
	L.prepend = arg.prepend || '';
	L.content = [];
	L.platformGetUrl = arg.platformGetUrl;
	L.fileType = arg.fileType || null;

	L.add ( arguments[0] );
}

Loader.prototype.constructor = Loader;
LoaderBase.call( Loader.prototype );

Loader.prototype = {
	add : function ( arg ){
		var L = this;
		if ( typeof arg === 'string' ){
			L._addSingleLoad ( arg );
		} else if ( arg instanceof Array ){
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
	getAllContent : function(){
		var _found = [];
		function searchSubLoader ( content ){
			for ( var i = 0; i < content.length; i++ ){
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
	getAllContentRaw : function(){
		var _content = this.getAllContent();
		for ( var i = 0; i < _content.length; i++ ){
			_content[i] = _content[i].dataRaw;
		}
		return _content;
	},
	getLoader : function ( id ){
		var _found = null;
		function searchSubLoader ( content ){
			for ( var i = 0; i < content.length; i++ ){
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
	_addSingleLoad : function ( url, fbaOverwrite, renderOnly ){
		var L = this;

		var _singleLoader;
		var _fileType = L.fileType || LoaderUtils.getFileType ( url );
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
		if ( fbaOverwrite )			
			_singleLoader.fileName = LoaderUtils.getFileName(url);

		
		_singleLoader.queueIndex = L._total;
		
		L._queue [ L._total ] = _singleLoader;
		L._total++;
	},

	_addSubLoad : function ( loader ){
		var L = this;
		loader.onComplete = L._handleSingleLoadComplete.bind(L);
		loader.onProgress = L._handleProgress.bind(L);
		loader.onFail = L._handleFail;
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
					case 'images' :				
						var fileName = byName[0].split('.');
						
						var type = fileName[1] == 'svg' ? 'svg+xml' : fileName[1] ;
						byName[1] = 'data:image/' + type + ';base64,' + btoa(byName[1]);
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
		if ( L._total == 0 ){
			L._handleComplete();
		} else {
			if ( i < L._total ){
				if ( !(_inst instanceof Loader) ){
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
	_handleSingleLoadComplete : function ( target ) {
		var L = this;
		L.content [ target.queueIndex ] = target;
		delete L._queue [ target.queueIndex ];
		
		L._handleProgress();
		if ( target.url == undefined ){
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

		var _consecutive = _count;
		var _subProgress = 0;
				
		if ( _count < L._total && L._queue[_count] ){			
			_subProgress = L._queue[_count].progress / L._total || 0;
		}	

		L.progress = _consecutive / L._total + _subProgress;
		L.rawProgress = _count / L._total + _subProgress;

		L.onProgress.call( L.scope, L );
		if ( _count >= L._total ){
			L._handleComplete();
		}
	},

	_handleComplete : function(){
		var L = this;
		trace ( 'Loader "' + L.name + '" is Complete' )
		L.onComplete.call( L.scope, L );
	}
}




















global.dispatchEvent( new CustomEvent( 'loaderControllerReady' ));

