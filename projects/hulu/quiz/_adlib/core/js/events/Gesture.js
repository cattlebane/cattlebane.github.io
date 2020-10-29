// TODO - ? remove gestureBase if no events added
// 		- ? total distance

/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	Gesture

	Description:
		This module is used for seamless use of Mouse / Touch Events, such as click vs tap, mousedown vs touch down, etc.  
		This class figures which to use and reports custom events.
	
	See:
		GestureEvent for available events.
		
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */
var Gesture = new function(){
	var G = this;

	var _targets = [];
	var _disableList = [];
	var _eventPass = (document.createEventObject != undefined);
		
	/* ------------------------------------------------------------------------------------------------------------- */
	// PUBLIC METHODS
	G.init = function(){
		global.GestureEvent = new GestureEvent();
	}

	/**	Method: addEventListener()
			Registers an event so that the listener receives notification of an event.

		Parameters:
			target  	- The DOM element
			name 		- The event's name as a String or GestureEvent constant
			handler		- The function to be called on event trigger
		(start code)
			Gesture.addEventListener ( myDiv, GestureEvent.CLICK, handleClick );
			
			function handleClick ( event ){
				trace ( 'Click heard' );
			}					
		(end code)
	*/
	G.addEventListener = function ( target, name, handler ){
		var _gestureBase = getGestureBase ( target );
		_gestureBase.addEventListener ( name, handler );
		_gestureBase._total++;
		Styles.setCss( target, 'cursor', 'pointer' );

		// OVERWRITES mouseChildren(false) of parent
		Styles.setCss( target, 'pointer-events', 'auto' );
	}

	/**	Method: removeEventListener()
			Unregisters an event of notifications.

		Parameters:
			target  	- The DOM element
			name 		- The event's name as a String or GestureEvent constant
			handler		- The function registered for call on event trigger
		(start code)
			Gesture.removeEventListener ( myDiv, GestureEvent.CLICK, handleClick );					
		(end code)
	*/
	G.removeEventListener = function ( target, name, handler ){
		var _gestureBase = getGestureBase ( target );
		if ( _gestureBase ) {
			_gestureBase.removeEventListener ( name, handler );
			_gestureBase._total++;
			if ( _gestureBase._total <= 0 ){
				Styles.setCss( target, 'cursor', 'auto' );
			}
		}
	}

	/**	Method: disable()
			Disables a DOM element from responding the mouse/touch/gesture events. For bubbling events, such as click, this will disable its children as well.

		Parameters:
			target  	- The DOM element
			
			> Gesture.disable ( myDiv );
	*/
	G.disable = function ( target ){		
		var gestureBase = getGestureBase ( target );
		_disableList.push(gestureBase);

		if ( _eventPass ) {
			gestureBase.addEventListener ( GestureEvent.CLICK, handlePassThroughClick );
			Styles.setCss( target, 'cursor', 'auto' );
		} else {
			Styles.setCss( target, 'pointer-events', 'none' );
		}	
	}

	/**	Method: disableChildren()
			Disables all child DOM elements from responding the mouse/touch/gesture events. For bubbling events, such as click, this is unnecessary

		Parameters:
			target  	- The DOM element
			
			> Gesture.disableChildren ( myDiv );
	*/
	G.disableChildren = function ( target ){
		setActiveChildren ( target, false );
	}
	
	/**	Method: enable()
			Enables all a DOM element to responding the mouse/touch/gesture events. For bubbling events, such as click, this will enable its children as well.

		Parameters:
			target  	- The DOM element
			
			> Gesture.disable ( myDiv );
	*/	
	G.enable = function ( target ){
		var gestureBase = getGestureBase ( target );

		for ( var i = 0; i < _disableList.length; i++ ){
			if ( gestureBase == _disableList[i] ){
				if ( _eventPass ) {
					gestureBase.removeEventListener ( GestureEvent.CLICK, handlePassThroughClick );
				} else {
					Styles.setCss( target, 'pointer-events', 'auto' );
					Styles.setCss( target, 'cursor', 'pointer' );
				}
				break;
			}
		}
	}

	/**	Method: enableChildren()
			Enables all child DOM elements to responding the mouse/touch/gesture events. For bubbling events, such as click, this is unnecessary

		Parameters:
			target  	- The DOM element
			
			> Gesture.enableChildren ( myDiv );
	*/
	G.enableChildren = function ( target ){
		setActiveChildren ( target, true );
	}

	/* ------------------------------------------------------------------------------------------------------------- */
	// PRIVATE METHODS
	function getGestureBase ( target ){
		var _gestureBase = null;
		for ( var i = 0; i < _targets.length; i++ ){
			if ( _targets[i].elem === target ){
				_gestureBase = _targets[i]
				break;
			}
		}	
		if ( !_gestureBase ){
			_gestureBase = createGestureBase ( target );
		}	
		return _gestureBase;
	}

	function createGestureBase ( target ){
		_gestureBase = new GestureBase ( target );
		_gestureBase.addEventListener(GestureEvent.FINISH, handleGestureFinish)
		_targets.push( _gestureBase );
		return _gestureBase;
	}

	function setActiveChildren ( target, active ){
		var gestureBase = getGestureBase ( target );
		if ( gestureBase.hasActiveChildren != active ){
			gestureBase.hasActiveChildren = active;
			var children = gestureBase.elem.getElementsByTagName('*');
			for( var i = 0; i < children.length; i++ ){
				//trace ( typeof children[i], ' ; ', children[i].id )
				// gets only the children, not grand-children
				if ( children[i].parentNode == target ){
					active ? G.enable(children[i]) : G.disable(children[i]);
				} 
			}
		}
	}

	function getNextLayerElement ( target, x, y, list ){
		target.style.visibility = 'hidden';
		list.push(target);

		var elem = document.elementFromPoint( x, y );
		//trace ( 'elementFromPoint() : ', elem.id );

		for ( var i = 0; i < _disableList.length; i++ ){
			//trace ( ' => disable list: ', i, ' : ', _disableList[i].elem.id )
			if ( _disableList[i].elem == elem ){
				//trace ( '  -^ match so go again')
				return getNextLayerElement(elem,x,y,list)
			}
		}
		
		return elem;
	}

	function getForwardedTarget ( event ){
		var hiddenList = [];		
		
		var el = getNextLayerElement( event.target, event.clientX, event.clientY, hiddenList );
		//trace ( ' returned element: (', event.clientX, ', ', event.clientY, ') ', el.id )

		//trace ( 'hidden list:')
		for ( var i = 0; i < hiddenList.length; i++ ){
			//trace ( '  -> ', i, ' ', hiddenList[i].id )
			hiddenList[i].style.visibility = 'visible';
		}
		hiddenList = [];

		event.stopImmediatePropagation();
		//trace ( ' - STOP - ')

		return el;
	}

	/* ------------------------------------------------------------------------------------------------------------- */
	// EVENT HANDLERS
	function handleGestureFinish ( event ){
		for ( var i = 0; i < _targets.length; i++ ){
			_targets[i].finishPostStopBubble(event);
		}
	}

	// IE 9+ needs to have events captured and passed to the next layer dom element
	function handlePassThroughClick ( event ){	
		//trace ( 'pass through:', event )
		var el = getForwardedTarget ( event );

		// IE 9+
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent(event.type,true,false);
		//trace ( '     # ', el.id, ' is dispatching ' )
		el.dispatchEvent ( evt );

		// IE 8-
		//var evt = document.createEventObject();
		//var type = 'on' + event.type;
		//elem.fireEvent(type, evt)					
	}

}
