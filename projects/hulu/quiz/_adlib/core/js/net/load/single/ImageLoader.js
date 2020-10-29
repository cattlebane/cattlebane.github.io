// TODO - support for base64 internally with boolean
function ImageLoader(){	
	var I = this;
	LoaderSource.apply(I,arguments);
	LoaderBase.apply(I,arguments);	
	LoaderTicker.apply(I,arguments);	

	var arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {};

	// used when only needing to render, such as an svg coming from binary
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
