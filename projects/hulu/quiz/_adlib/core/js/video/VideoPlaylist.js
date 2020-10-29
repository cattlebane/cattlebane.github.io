var VideoPlaylist = function ( player ){
	
	var V = this;

	//V([Array newPlaylist])
	var _index = 0;
	var _timeout;

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// GETTERS | SETTERS
	V.currentItem = function ( index ){
		// GET
		if ( index == undefined ) return _index;	

		// SET
		_index = index;
		// set the video, change the source
	}

	//V.contains = function(item){}
	//V.indexOf = function(item){}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PUBLIC METHODS
	V.next = function(){

	}

	V.previous = function(){

	}

	V.autoadvance = function(time){

	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// INIT
	
}