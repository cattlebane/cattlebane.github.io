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
	
		// Set Mime Type
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

					// IE10 does not have overrideMimeType() so pulling binary data is on responseBody
					// but only use for binary because json/text is still on responseText
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

