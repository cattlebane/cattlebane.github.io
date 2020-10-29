function InlineLoader(){	
	var I = this;
	LoaderSource.apply(I,arguments);
	LoaderBase.apply(I,arguments);
}

InlineLoader.prototype = {
	load : function(){
		var I = this;
		var elem = I.fileType == 'css' ? I._createLink() : I._createScript();
		//elem.id = I.filename;
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
