/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	GestureBase

	Description:
		-- INTERNAL MODULE --
		This module is used exclusively by Gesture.  When a dom element has an event listener registered, it creates an instance of this module 
		to hold all the event handlers for the dom element.  Every dom element gets a new GestureBase instance.

	See:
		Gesture
	
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */
function GestureBase (elem){
	var G = this;
	G.elem = elem;
	G.hasActiveChildren = true;
	G.debug = false;

	G._isDragging = false;
	G._isDrag = false;
	G._give = 2;
	G._total = 0; // how many events are tracked

	G._xOff = 0;
	G._xPrev = 0;
	G._xPrev2 = 0;
	G._xStart = 0;
	G._xVelocity = 0;
	
	G._yOff = 0;
	G._yPrev = 0;
	G._yPrev2 = 0;
	G._yStart = 0;
	G._yVelocity = 0;

	G._isSelectBubbleStop = false;
	
	G.init();
}

GestureBase.prototype = {
	
	init : function (){		
		var G = this;
		if( G.debug ) trace( 'GestureBase.init()' );
		G._handleDrag = G._handleDrag.bind ( G );
		G._handleSwipe = G._handleSwipe.bind ( G );
		G._handleDown = G._handleDown.bind ( G );
		G._handleUp = G._handleUp.bind ( G );		
		G._handleDragStart = G._handleDragStart.bind ( G );
		G._handleTouchStart = G._handleTouchStart.bind ( G );
		G._handleTouchMove = G._handleTouchMove.bind ( G );
		G._handleTouchDrag = G._handleTouchDrag.bind ( G );
		G._handleTouchEnd = G._handleTouchEnd.bind ( G );
		G._handleSelectStopBubble = G._handleSelectStopBubble.bind ( G );
		
		G.addEventListener = G.elem.addEventListener.bind ( G.elem );
		G.removeEventListener = G.elem.removeEventListener.bind ( G.elem );
	
		G.elem.addEventListener ( 'touchstart', G._handleTouchStart );
		G.elem.addEventListener ( 'mousedown', G._handleDown );

		// used to prevent a click from bubbling when dragging
		G.elem.addEventListener ( GestureEvent.CLICK, G._handleSelectStopBubble );
	},

	/* ------------------------------------------------------------------------------------------------------------- */
	// CLICKS
	_handleDown : function ( event ){
		var G = this;
		if( G.debug ) trace( 'GestureBase._handleDown()' );

		G._isDragging = false;
		G._isDrag = false;

		window.addEventListener ( 'mouseup', G._handleUp );
		window.addEventListener ( 'touchend', G._handleTouchEnd );

		window.addEventListener ( 'mousemove', G._handleDragStart );
		window.addEventListener ( 'touchmove', G._handleTouchMove );	
		
		var touch = G._getEventScope ( event );
		var rect = event.target.getBoundingClientRect();
	
		GestureEvent.press.position.x = touch.pageX - rect.left;
		GestureEvent.press.position.y = touch.pageY - rect.top;
		GestureEvent.press.page.x = touch.pageX;
		GestureEvent.press.page.y = touch.pageY;

		if( G.debug ) trace ( '  -> dispatch ( PRESS ), event:', touch, 'touch.layerX:', touch.layerX, 'press:', GestureEvent.press.position.x )
		G.elem.dispatchEvent ( GestureEvent.press );
	},

	_handleUp : function ( event, bypass ){
		var G = this;
		if( G.debug ) trace( 'GestureBase._handleUp()' );

		window.removeEventListener ( 'mouseup', G._handleUp );
		window.removeEventListener ( 'touchend', G._handleTouchEnd );
		window.removeEventListener ( 'mousemove', G._handleDragStart );
		window.removeEventListener ( 'touchmove', G._handleTouchMove );
		window.removeEventListener ( 'mousemove', G._handleDrag );
		window.removeEventListener ( 'touchmove', G._handleTouchDrag );	
						
		if ( bypass !== true ){
			if( G.debug ) trace( ' - dispatch GestureEvent.RELEASE' )
			G.elem.dispatchEvent ( GestureEvent.release );
		}

		if ( G._isDragging ){
			G._handleDragStop ( event );
		} 
		
		G.elem.addEventListener ( 'touchstart', G._handleTouchStart );
		G.elem.addEventListener ( 'mousedown', G._handleDown );

		event.preventDefault();
		if( G.debug ) trace ( '  _handleUp(), event.preventDefault(), kills second mousedown event')		
	},
	

	/* ------------------------------------------------------------------------------------------------------------- */
	// TOUCH BYPASSING
	// This will stop from both touch and mouse events firing, thus doubling every Gesture Event fired.
	_handleTouchStart : function ( event ){	
		var G = this;
		if( G.debug ) trace( 'GestureBase._handleTouchStart()' );
		
		// TODO - set this var then create a dictionary for what events to use
		//this._isTouchSystem = true;
		
		G._handleDown(event);
	},

	_handleTouchMove : function ( event ){
		var G = this;
		if( G.debug ) trace( 'GestureBase._handleTouchMove()' );
		//event.preventDefault();
		G._handleDragStart(event);
	},

	_handleTouchDrag : function ( event ){
		var G = this;
		if( G.debug ) trace( 'GestureBase._handleTouchDrag()' );
		//event.preventDefault();
		G._handleDrag(event);
	},

	_handleTouchEnd : function ( event ){
		var G = this;
		if( G.debug ) trace( 'GestureBase._handleTouchEnd()' );
		//event.preventDefault();
		G._handleUp(event);
	},

	/* ------------------------------------------------------------------------------------------------------------- */
	// EVENT SCOPE
	// Android stores things like pageX in an array. This scopes the internally used event properly
	_getEventScope : function ( event ){
		if( this.debug ) trace( 'GestureBase._getEventScope(), event:', event );
		return ( Device.os == 'android' && event instanceof TouchEvent ) ? event.changedTouches[0] : event ;
	},
	
	/* ------------------------------------------------------------------------------------------------------------- */
	// BUBBLING CONTROL
	// stops a click or touchend faux click from firing when dragging
	_handleSelectStopBubble : function ( event ){
		var G = this;
		if( G.debug ) trace( 'GestureBase._handleSelectStopBubble()' );
		if ( G._isDrag ) {
			event.stopImmediatePropagation();
			if( G.debug ) trace ( 'Gesture : ' + G.elem.id + ' is Dragging, CLICK not fired' );
			G.elem.dispatchEvent ( GestureEvent.finish )
		} 
	},

	finishPostStopBubble : function (event){		
		var G = this;
		if( G.debug ) trace( 'GestureBase.finishPostStopBubble()' );
		
		G.elem.removeEventListener ( 'touchstart', G._handleTouchStart );
		G.elem.removeEventListener ( 'mousedown', G._handleDown );	

		G._handleUp(event, true);
	},

	/* ------------------------------------------------------------------------------------------------------------- */
	// DRAG
	_handleDragStart : function ( event ){
		var G = this;
		if( G.debug ) trace( 'GestureBase._handleDragStart()' );
		//G._isDragging = true;

		var touch = G._getEventScope ( event );
		
		var rect = event.target.getBoundingClientRect();
		var _layerX = touch.pageX - rect.left;
		var _layerY = touch.pageY - rect.top;

		G._xStart = G._xPrev = G._xPrev2 = _layerX;
		G._yStart = G._yPrev = G._yPrev2 = _layerY;

		// for dragging an element
		var _x = parseInt(G.elem.style.left.replace( /px/, '' ),10);
		var _y = parseInt(G.elem.style.top.replace( /px/, '' ),10);
		G._xOff = _layerX - _x;
		G._yOff = _layerY - _y;

		// update the event details
		GestureEvent.dragStart.position.x = _layerX;
		GestureEvent.dragStart.position.y = _layerY;
		GestureEvent.dragStart.element.x = _x;
		GestureEvent.dragStart.element.y = _y;
		
		window.removeEventListener ( 'mousemove', G._handleDragStart );
		window.removeEventListener ( 'touchmove', G._handleTouchMove );

		window.addEventListener ( 'mousemove', G._handleDrag );
		window.addEventListener ( 'touchmove', G._handleTouchDrag );
	},
	
	_handleDrag : function ( event ){
		var G = this;
		if( G.debug ) trace( 'GestureBase._handleDrag()' );

		var touch = G._getEventScope ( event );

		var rect = event.target.getBoundingClientRect();
		var _layerX = touch.pageX - rect.left;
		var _layerY = touch.pageY - rect.top;
		
		var _diffx1 = _layerX - G._xPrev;
		var _diffx2 = _layerX - G._xPrev2;
		G._xVelocity = ( _diffx2 - _diffx1 ) / 2 + _diffx1;

		var _diffy1 = _layerY - G._yPrev;
		var _diffy2 = _layerY - G._yPrev2;
		G._yVelocity = ( _diffy2 - _diffy1 ) / 2 + _diffy1;

		// update the event details
		GestureEvent.drag.position.x = _layerX;
		GestureEvent.drag.position.y = _layerY;
		GestureEvent.drag.element.x = _layerX - G._xOff;
		GestureEvent.drag.element.y = _layerY - G._yOff;
		GestureEvent.drag.velocity.x = G._xVelocity;
		GestureEvent.drag.velocity.y = G._yVelocity;
		GestureEvent.drag.page.x = touch.pageX;
		GestureEvent.drag.page.y = touch.pageY;

		if ( G._isDragging )	{
			G.elem.dispatchEvent ( GestureEvent.drag );
		} else {			
			// check the inital movement to register as dragging or just a click
			if ( Math.abs(G._xStart - _layerX) > G._give || Math.abs(G._yStart - _layerY) > G._give ){
				G._isDragging = true;
				G._isDrag = true;
				// dispatch when offset distance is exceeded
				G.elem.dispatchEvent ( GestureEvent.dragStart );
			}
		}

		G._xPrev2 = G._xPrev;
		G._xPrev = _layerX;

		G._yPrev2 = G._yPrev;
		G._yPrev = _layerY;
	},

	_handleDragStop : function ( event ){
		var G = this;
		if( G.debug ) trace( 'GestureBase._handleDragStop()' );

		G._isDragging = false;
		
		// update the event details
		// NOTE: changedTouches array not on touchend, throws Error, so must use last touchmove info
		GestureEvent.dragStop.position.x = G._xPrev;
		GestureEvent.dragStop.position.y = G._yPrev;
		GestureEvent.dragStop.velocity.x = G._xVelocity;
		GestureEvent.dragStop.velocity.y = G._yVelocity;

		G.elem.dispatchEvent ( GestureEvent.dragStop );

		G._handleSwipe ( event );
	},

	/* ------------------------------------------------------------------------------------------------------------- */
	// SWIPE
	_handleSwipe : function ( event ){
		var G = this;
		if( G.debug ) trace( 'GestureBase._handleSwipe()' );

		GestureEvent.swipe.direction.x = G._xVelocity > 0 ? 'right' : G._xVelocity < 0 ? 'left' : null ;
		GestureEvent.swipe.direction.y = G._yVelocity > 0 ? 'down' : G._yVelocity < 0 ? 'up' : null ;
		GestureEvent.swipe.distance.x = G._xPrev - G._xStart;
		GestureEvent.swipe.distance.y = G._yPrev - G._yStart;
		GestureEvent.swipe.velocity.x = G._xVelocity;
		GestureEvent.swipe.velocity.y = G._yVelocity;

		G.elem.dispatchEvent ( GestureEvent.swipe );
	}

}
