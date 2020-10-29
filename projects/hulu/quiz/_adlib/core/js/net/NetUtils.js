/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	NetUtils
		
		Utility functions that are common in making network requests.
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */
var NetUtils = new function() {

	/** Method: getQueryParameterBy()
			Analyses the URI query string and search for a key-value pair matching the requested var. 

		name 				- the query string variable name */
	this.getQueryParameterBy = function( name ) {
		name = name.replace( /[\[]/, "\\\[" ).replace( /[\]]/, "\\\]" );
		var regexS = "[\\?&]" + name + "=([^&#]*)";
		var regex = new RegExp( regexS );
		var results = regex.exec( window.location.search );
		if( results == null ) return "";
		else return decodeURIComponent( results[ 1 ].replace( /\+/g, " " ));
	}

}
