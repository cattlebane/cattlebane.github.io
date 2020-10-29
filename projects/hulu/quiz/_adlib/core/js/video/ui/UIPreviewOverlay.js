function UIPreviewOverlay ( player, arg ){

	arg.target = player.container;

	var U = new UIButton(arg);
	Styles.setCss ( U, { width:'inherit', height:'inherit', position:'absolute' })

	U.onComplete = arg.onComplete || function(){}
	U.onClick = arg.onClick || function(){}

	var _originalVideoId;
	var _timer;
	var _time = arg.time || 30;
	
	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PUBLIC METHODS
	U.start = function(){
		//trace ( 'UIPreviewOverlay timer STARTED' )
		_timer = setTimeout( handleComplete, _time * 1000 );
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PROTECTED METHODS
	U._onClick = function(event){
		U.hide();

		clearTimeout(_timer);

		U.onClick.call( U, event );
		
		player.source ( _originalVideoId );
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// EVENT HANDLERS
	function handleComplete (){
		trace ( 'UIPreviewOverlay timer COMPLETE' )
		U.onComplete.call( U );
		player.pause();
	}
	
	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// INIT
	U.enabled(true);

	_originalVideoId = player._addPreview ( arg.videoId )
	
	return U;
}
