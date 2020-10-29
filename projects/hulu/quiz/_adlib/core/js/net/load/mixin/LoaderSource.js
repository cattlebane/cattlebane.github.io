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