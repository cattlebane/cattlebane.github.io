function LoaderTicker(){
	var L = this;
	
	/* ---------------------------------------------------------------------------------------------------------------- */
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