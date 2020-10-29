// TODO - ? add Extension of some kind to pass more values
/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	GestureEvent

	Description:
		This module has custom events to be used with the Gesture module.
	
	See:
		Gesture
		
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */
function GestureEvent (){
 
	
	var _dragStart = new CustomEvent ( 'onDragStart' );
	_dragStart.position = { 
		x : 0,
		y : 0
	}
	_dragStart.element = {
		x : 0,
		y : 0
	}
	
	var _drag = new CustomEvent ( 'onDrag' );
	_drag.position = {
		x : 0,
		y : 0
	}
	_drag.velocity = {
		x : 0,
		y : 0
	}
	_drag.element = {
		x : 0,
		y : 0
	}
	_drag.page = {
		x : 0,
		y : 0
	}
		
	var _dragStop = new CustomEvent ( 'onDragStop' );
	_dragStop.position = {
		x : 0,
		y : 0
	}
	_dragStop.velocity = {
		x : 0,
		y : 0
	}
		
	var _swipe = new CustomEvent ( 'onSwipe' );
	_swipe.direction = {
		x : null,
		y : null
	}
	_swipe.distance = {
		x : 0,
		y : 0
	}
	_swipe.velocity = {
		x : 0,
		y : 0
	}
	
	var _press = new CustomEvent ( 'onPress' ); 
	_press.position = {
		x : 0,
		y : 0
	}
	_press.page = {
		x : 0,
		y : 0
	}
	
	var _release = new CustomEvent ( 'onRelease' );

	var _finish = new CustomEvent ( 'onFinishGestures' );

	var _clickType = Device.type != 'desktop' ? 'touchend' : 'click';


	return {

		/**	Constant: OVER
			Represents a 'mouseover', fired on desktop cursor roll over
			> GestureEvent.OVER
		*/
		OVER		: 	'mouseover', 

		/**	Constant: OUT
			Represents a 'mouseout', fired on desktop cursor roll out
			> GestureEvent.OUT
		*/
		OUT			: 	'mouseout', 

		/**	Constant: DOWN
			Represents an 'onPress', fired on mousedown / touch start. Synonymous to PRESS
			> GestureEvent.DOWN
		*/
		DOWN		: 	'onPress',
		
		/**	Constant: PRESS
			Represents an 'onPress', fired on mousedown / touch start. Synonymous to DOWN
				
			> GestureEvent.PRESS

			(start code)				
				Gesture.addEventListener ( myDiv, GestureEvent.PRESS, handleGesture );

				// or 
				Gesture.addEventListener ( myDiv, GestureEvent.DOWN, handleGesture );				
			(end code)
		*/
		PRESS		: 	'onPress',

		/**	Constant: UP
			Represents an 'onRelease', fired on mouseup / touch end. Synonymous to RELEASE
			> GestureEvent.UP
		*/
		UP			: 	'onRelease',
		
		/**	Constant: RELEASE
			Represents an 'onRelease', fired on mouseup / touch end. Synonymous to UP
		
			> GestureEvent.RELEASE
		
			(start code)				
				Gesture.addEventListener ( myDiv, GestureEvent.RELEASE, handleGesture );

				// or 
				Gesture.addEventListener ( myDiv, GestureEvent.UP, handleGesture );				
			(end code)
		*/
		RELEASE		: 	'onRelease',	

		/**	Constant: CLICK
			Represents a 'click', fired on click / touch end. Synonymous to SELECT | TAP
			> GestureEvent.CLICK
		*/
		CLICK		: 	_clickType,

		/**	Constant: DRAG
			Represents an 'onDrag', fired after an element is selected and before released. 
			Element data objects included: selection position, element position, velocity of move
			
			> GestureEvent.DRAG

			(start code)				
				Gesture.addEventListener ( myDiv, GestureEvent.DRAG, handleDrag );

				function handleDrag ( event ){
					// coordinate position of mouse/touch
					trace ( event.position );

					// coordinate position of target element
					trace ( event.element );

					// velocity, ie change in distance, of target element
					trace ( event.velocity );
				}
			(end code)
		*/
		DRAG 		: 	'onDrag',
		
		/**	Constant: DRAG_START
			Represents an 'onDragStart', fired after an element is selected, when first moved and before released. 
			Element data objects included: selection position, element position
			
			> GestureEvent.DRAG_START

			(start code)				
				Gesture.addEventListener ( myDiv, GestureEvent.DRAG_STOP, handleDragStop );

				function handleDragStop ( event ){
					// coordinate position of mouse/touch
					trace ( event.position );

					// coordinate position of target element
					trace ( event.element );
				}
			(end code)
		*/
		DRAG_START 	: 	'onDragStart',
		
		/**	Constant: DRAG_STOP
			Represents an 'onDragStop', fired after an element is selected, moved, then released. 
			Element data objects included: selection position, velocity of last move
			
			> GestureEvent.DRAG_STOP

			(start code)				
				Gesture.addEventListener ( myDiv, GestureEvent.DRAG_STOP, handleDragStop );

				function handleDragStop ( event ){
					// coordinate position of mouse/touch
					trace ( event.position );

					// velocity, ie change in distance, of target element
					trace ( event.velocity );
				}
			(end code)
		*/
		DRAG_STOP 	: 	'onDragStop',


		/**	Constant: SWIPE
			Represents an 'onSwipe', fired just after a DRAG_STOP, but different event properties available. 
			Element data objects included: direction, distance, velocity
			
			> GestureEvent.SWIPE

			(start code)				
				Gesture.addEventListener ( myDiv, GestureEvent.DRAG_STOP, handleDragStop );

				function handleDragStop ( event ){
					// direction of swipe, as strings 
					trace ( event.direction );

					// distance covered from down to release
					trace ( event.distance );

					// velocity, aka speed of swipe
					trace ( event.velocity );
				}
			(end code)
		*/
		SWIPE 		: 	'onSwipe',

		drag 		: 	_drag,
		dragStart 	: 	_dragStart,
		dragStop 	: 	_dragStop,
		swipe 		: 	_swipe,
		press 		: 	_press,
		release 	: 	_release,

		// internal use for handling clicks
		finish 		: 	_finish,
		FINISH 		: 	'onFinishGestures'
	}
}
