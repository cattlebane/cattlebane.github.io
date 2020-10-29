function AudioPlayer ( arg ) {
	"use strict";

	// ------------------------------------------------------------------------------------------------------------------------------- 
	var A = new Audio;

	if ( arg.target ){
		arg.target.appendChild( A )
	}

	A.onComplete = arg.onComplete || function(){};
	A.onFail = arg.onFail || function(){};
	A.onBuffer = arg.onBuffer || function(){};
	A.onProgress = arg.onProgress || function(){};
	A.onReady = arg.onReady || function(){}
	
	var _preload = !!arg.preload;
	var _autoPlay = !!arg.autoPlay;
	var _source = [];

	// ------------------------------------------------------------------------------------------------------------------------------- 
	// GETTERS | SETTERS
	Object.defineProperties ( A, {

		autoPlay: {
			get: function() {
				return _autoPlay;
			},
			set: function ( value ) {
				_autoPlay = value;

				value ? A.setAttribute('autoplay','') : A.removeAttribute('autoplay');
			}
		},

		percent: {
			get: function() {
				return (A.currentTime / A.duration) || 0;
			}
		},
		
		source: {
			get: function() {
				return A.src;
			},
			set: function ( value ) {				
				_source = value;

				A.preload = 'none';
				A.src = value;
			}
		}	
	})

	// ------------------------------------------------------------------------------------------------------------------------------- 
	// PUBLIC METHODS	
	A.seek = function ( sec ) {
		if ( sec > A.duration ) sec = A.duration;
		else A.complete = false;
		
		A.currentTime = sec;
	
		trace ( '\t\tseek()', sec, A.currentTime )
	}

	A.stop = function(){
		trace ( 'AudioPlayer.stop()' )
		A.pause();

		A.currentTime = 0;
		A.dispatchEvent ( new CustomEvent( 'stop' ))
	}

	A.mute = function(){
		trace ( 'AudioPlayer.mute()' )		
		A.muted = true;		
	}

	A.unmute = function(){
		trace ( 'AudioPlayer.unmute()' )
		A.muted = false;
	}
		
	// ------------------------------------------------------------------------------------------------------------------------------- 
	// EVENT HANDLERS
	function handlePlay ( event ){
		A.complete = false;

		// In Safari, if the preload=none attribute is present, plays will not fire when called manually
		A.removeAttribute('preload');
	}

	function handleComplete ( event ){
		trace ( 'handleComplete(), audio.paused =', A.paused )

		A.complete = true;
		A.onComplete.call(A, event);
	}

	// ------------------------------------------------------------------------------------------------------------------------------- 
	A.addEventListener ( 'play', handlePlay, false );
	A.addEventListener ( 'ended', handleComplete, false );
	A.addEventListener ( 'seeking', A.onProgress, false );
	A.addEventListener ( 'error', A.onFail, false );
	A.addEventListener ( 'waiting', A.onBuffer, false );
	A.addEventListener ( 'canplay', A.onReady, false );

	A.source = arg.source;
	
	A.autoPlay = _autoPlay;
	
	A.volume = arg.volume || 1;
	A.muted = !!arg.muted;

	if ( _autoPlay ){
		A.play();
	} else if ( _preload ){
		A.load();
	}

	return A
}

