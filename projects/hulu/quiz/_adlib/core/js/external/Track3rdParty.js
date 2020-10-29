var Track3rdParty = new function(){

	this.pixel = function ( url ){
		trace ( 'Track3rdParty.pixel()\n\turl =', url )
		var img = new Image();
		img.src = url;
	}
}