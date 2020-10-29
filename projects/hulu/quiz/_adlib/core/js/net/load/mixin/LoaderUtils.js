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
			/*
			 * TODO - check the string is formatted correctly?
			 */
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

	// Fba / Binary utils
	L.binaryToString = function ( bin ){
		
		var xhr = L.createXMLHttpRequest();
		var hasOverwrite = xhr.overrideMimeType != undefined;

		var characters = [];
		for( var i = 0; i < bin.length; i++ ) {
			var id = bin[i];
			
			// if its IE10, its already a character code, other wise get it here
			if ( hasOverwrite ){
				id = id.charCodeAt(0)
			}

			var character = String.fromCharCode( ( id & 0xff ) );			
			//var character = String.fromCharCode( ( bin[ i ].charCodeAt(0) & 0xff ) );			
			characters.push( character );
		}
		
		return characters.join('');
	}

	/*
	// use only if js included, but for now is being gzipped in different file
	L.jsStringToUrl = function ( str ){
		var data = new Blob([str], {type: 'application/javascript'}); 
		//text/plain
		var url = window.URL.createObjectURL(data);
		return url;
	}
	*/

}
