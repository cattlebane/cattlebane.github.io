function FontLoader(){	
	var F = this;
	LoaderSource.apply(F,arguments);
	LoaderBase.apply(F,arguments);
	LoaderTicker.apply(F,arguments);	
}

FontLoader.prototype = {
	load : function (){
		var F = this;

		F.fileName = F.fileName.split('.')[0]

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
		// added timeout to leave a rendered textfield on stage for initial textfields
		// to return proper offsetWidth values
		setTimeout(function(){
			// leave the test textfield temporarily to allow dom 
			// to have a reference to rendered characters. hack?
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
