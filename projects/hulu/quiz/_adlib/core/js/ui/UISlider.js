/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	UISlider

	Description:
		This is a display object class, expanding on the Markup.addDiv() system. Has inherit methods for enabling, show, hide, etc. Is a base class that can be extended
		for custom buttons. All the VideoControl Buttons extend from this class.

	Sample:
		(start code)
			var mySlider = new UISlider({
				id : 'my-btn',
				target : adData.elements.redAdContainer,
				css : {
					x : 0,
					y : 0,
					width : 50,
					height : 20
				},
				bg : {
					height:'30%',
					top:'35%'
				},
				track : {
					height:'30%',
					top:'35%'
				},
				handle : {
					height:'70%',
					top:'15%'
				},

				onUpdate : handleSliderUpdate
			})

			
			// OR assign it after the fact
			mySlider.onUpdate = handleSliderUpdate

			// OR listen for the event
			mySlider.addEventListener ( 'sliderUpdate', handleSliderUpdate );

			function handleSliderUpdate ( event ){
				trace ( mySlider.percent );
			}

		(end code)

	Sample Extension:
		(start code)
			function UICustomSlider( arg ){
				var U = new UISlider(arg);

				U._controlListeners = function(enable){
					var listener = enable ? 'addEventListener' : 'removeEventListener' ;					
					U[listener] ( 'sliderUpdate', handleBaseSliderUpdate );
				}
			
				function handleBaseSliderUpdate ( event ){
					player.screen.volume = U.percent;
				}

				U.enabled(true);

				return U;
			}
		(end code)
		
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */
function UISlider(arg){

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// BASE CSS
	var getSheet = document.getElementById('RED_uiSliderSheet');
	if ( !getSheet ){
		var cssRules = ".ui-slider { position:relative; width:100%; height:100%; }"
		cssRules += ".ui-slider-bg,	.ui-slider-track, .ui-slider-loaded, .ui-slider-handle, .ui-slider-hitState { position: absolute; width:100%; height:inherit; }"
		cssRules += ".ui-slider-bg { background-color: #666666; }"
		cssRules += ".ui-slider-loaded { width:0%; background-color: #560000; }"
		cssRules += ".ui-slider-track { background-color: #cc0000; width:0%; }"
		cssRules += ".ui-slider-handle { background-color: #ffffff; width:5%; left:0%; }"

		var styleScript = document.createElement('style');
		styleScript.type = 'text/css';
		styleScript.media = 'screen';
		styleScript.id = 'RED_uiSliderSheet';
		styleScript.appendChild(document.createTextNode( cssRules ));
		document.getElementsByTagName( 'head' )[0].appendChild( styleScript );
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PRIVATE PROPERTIES
	var _enabled = true;
	var _displayPriority = 'internal';
	var _showing = false;

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// MARKUP
	var U = document.createElement('div');
	U.setAttribute('class', 'ui-slider');
	U.id = arg.id;
	if ( arg.css ) 
		Styles.setCss( U, arg.css );
	arg.target.appendChild( U );

	var children = [ 'bg', 'loaded', 'track', 'handle', 'hitState' ];
	U.elements = [];
	for ( var i = 0; i < children.length; i++ )
		createChild ( children[i] );

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PUBLIC PROPERTIES

	/**	Variable: percent
			A Number 0-1 representing the percent position. */
	U.percent = 0;
	
	U.dragging = false;

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// GETTERS | SETTERS
	/**	Method: enabled(Boolean)
			Get|Set: Changes the event handling state of the slider, without effecting its display properties. If the parameter is null, it returns the current active state.

		Parameters:
			state 	- A boolean, either true or false.
		
		(start code)
			// GET
			var enabled = mySlider.enabled();

			// SET
			mySlider.enabled(false);			
		(end code)
	*/
	U.enabled = function(state){
		// GET
		if ( state == undefined ) return _enabled;

		// SET
		_enabled = state;
		controlListeners ( state );
	}

	/**	Method: showing(Boolean)
			Get only: Whether or not the slider is displayed in the DOM
				
		> var showing = mySlider.showing();		
	*/
	U.showing = function(){
		return _showing;
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PUBLIC METHODS
	/**	Method: hide()
			Visually removes the slider from the DOM by setting its display property to none

		Parameters:
			calledInternally 	- Optional Boolean used when part of a larger system, such as the Video Control Bar. Can be called internally but the priority will be when called directly.
		
		> mySlider.hide();
	*/
	U.hide = function ( calledInternally ){
		if ( calledInternally ){
			if ( _displayPriority == 'external' ) return;
		} else {
			_displayPriority = 'external';
		}
		U.style.display = 'none';
		_showing = true;
	}

	/**	Method: show()
			Visually displays the slider in the DOM

		Parameters:
			calledInternally 	- Optional Boolean used when part of a larger system, such as the Video Control Bar. Can be called internally but the priority will be when called directly.
		
		> mySlider.show();
	*/
	U.show = function ( calledInternally ){
		if ( calledInternally ){
			if ( _displayPriority == 'external' ) return;
		} else {
			_displayPriority = 'external';
		}
		try {
			U.style.removeProperty ( 'display' );
		} catch (e) {
			U.style.display = null;
		}

		_showing = false;
	}

	U.onUpdate = arg.onUpdate || function(event){
		//trace ( 'UISlider.onUpdate()' )
	}

	U.update = function( perc ){
		U._update ( perc );
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PROTECTED METHODS
	U._update = function ( perc ){
		U.percent = MathUtils.restrict( perc, 0, 1 );
		U.track.style.width = (U.percent * 100) + '%';
		U.handle.style.left = getHandlePercent() + '%';
	}

	U._controlListeners = function(){
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// PRIVATE METHODS
	function positionToPercent ( newX ){
		U._update ( newX / U.offsetWidth );
	}

	function getHandlePercent (){
		var thumbHalf = (U.handle.offsetWidth / U.offsetWidth) / 2;
		var perc = MathUtils.restrict ( U.percent, thumbHalf, 1 - thumbHalf ) - thumbHalf;

		return perc * 100;
	}

	function createChild ( name ){
		U[name] = document.createElement('div');
		U[name].setAttribute('class', 'ui-slider-' + name );
		U[name].id = arg.id + '-' + name;
		if ( arg[name] ) Styles.setCss( U[name], arg[name] );
		if ( arg[name] == false ) U[name].style.display = 'none';
		U.appendChild( U[name] );
		U.elements.push ( U[name] );
	}

	function controlListeners ( enable ){
		var listener = enable ? 'addEventListener' : 'removeEventListener' ;
		Gesture[listener]( U.hitState, GestureEvent.DOWN, handleDown );
		Gesture[listener]( U.hitState, GestureEvent.UP, handleUp );
		Gesture[listener]( U.hitState, GestureEvent.DRAG, handleDrag );
		
		U._controlListeners.call(U,enable);
	}

	function dispatch () {
		// dispatching upward for extended classes such as UIProgress
		var event = new CustomEvent ( 'sliderUpdate' );
		U.dispatchEvent ( event );	
		U.onUpdate.call( U, event );
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// EVENT HANDLERS
	function handleDown ( event ){
		U.dragging = true;
		positionToPercent ( event.position.x );
		_x = event.page.x - event.position.x;
		
		dispatch();
	}

	function handleUp ( event ){
		U.dragging = false;	
	}

	function handleDrag ( event ){
		pos = event.position.x ;

		if ( event.page.x <= _x )
			pos = 0;

		if ( event.page.x >= _x + U.offsetWidth )
			pos = U.offsetWidth;
		
		positionToPercent ( pos );
		dispatch();
	}

	/* ------------------------------------------------------------------------------------------------------------------------------- */
	// INIT
	U.enabled(true);

	return U;
}
