/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	Emitter

	Description:
		( v1.1 )
		Emitter is a particle system that emits and controls particles and renders on a canvas element.
		It comes with some basic physic features such as gravity, force, bounce and world boundary. 
		The default setting is in js/EmitterData.js that comes with standard-particles template. 
		To tweak the default data, launch particle simulator in AdApp and copy the genrated code 
		to js/EmitterData.js when reaches the desired effect. For more info about the simulator, visit
		 https://confluence.ff0000.com/display/AT/PARTICLES
	
		(start code)

			//create a canvas element
			adData.elements.particleCanvas = Markup.addCanvas({
				id: 'particle_canvas',
				target: adData.elements.redAdContainer,
				css: {
					width: adParams.adWidth,
					height: adParams.adHeight
				}
			});
			
			//create an instance of Emitter
			adData.particleSystem = new Emitter();

			//initiate the emitter with the target canvas element
			adData.particleSystem.init( adData.elements.particleCanvas );
			
			//start emitting
			adData.particleSystem.emit();
			
			//stop emitting
			adData.particleSystem.stopEmitting();

			

		(end code)

	---------------------------------------------------------------------------------------------------------------------------------------------------------- */

var Emitter = function () {
	var self = this;

	self.G = new Vector2D( 0, 0.1 );
	self.customBehaiver = { emitter: [ ], particle: [ ]};

	/** Method: init()
			Initiates the Emitter.

        Parameters:
            canvasElement - a canvas element
            setting - optional, contains fps and emitterData as properties to overide the default fps(60) and EmitterData

        (start code)
			var myEmitter = new Emitter();

			//init emitter with default setting
			myEmitter.init( canvasElement );


			//init emitter with custom setting
			var customSetting = {
				fps: 30,
				emitterData: myCustomEmitterData
			};
			myEmitter.init( canvasElement, customSetting );
		(end code)
    */

	self.init = function ( canvasElement, setting ) {

		setting = setting || {};
		var data = setting.emitterData || EmitterData;
		self.fps = setting.fps || 60;

		//canvas
		self.canvas = canvasElement;
		self.ctx = canvasElement.getContext( '2d' );
		self.ctxWidth = canvasElement.width;
		self.ctxHeight = canvasElement.height;

		self.active = false;
		self.frameCount = 0;
		self.startEmitFrame = 0;
		self.frameEmittedCount = 0;

		self.liveParticles = [];
		self.particles = [];
		self.models = [];

		self.properties = {};
		self.setProperties( data );

		self._drawBackground();

		FrameRate.register( self, self._run, self.fps );
	}

	/** Method: set()
			Sets a sinlge property of emitter properties. To set multiple properties at once, please use setProperties.

        Parameters:
            key - the name of the property (supports nested object key)
            val - the value of the property
            triggerChange - optional, it is for internal use
        
        (start code)
			myEmitter.set( 'emitRate', 0.1 );

			myEmitter.set( 'origin.value.x', 0 );
		(end code)
    */

	self.set = function ( key, val, triggerChange ) {
		triggerChange = ( triggerChange === undefined ) ? true : triggerChange;

		var splits = key.split( '.' );
		var lastKey = splits.pop();
		var result = ParticlesUtils.objectifier( splits, true, self.properties );
		result[ lastKey ] = val;

		if( triggerChange ) {
			self._afterPropertyChanged([ key.split( '.' )[ 0 ] ]);
		}
	}

	/** Method: get()
			Gets a sinlge property of emitter properties.

        Parameters:
            key - the name of the property (supports nested object key)
        
         Returns:
            The value of the property

        (start code)
			var rate = myEmitter.get( 'emitRate' );
			var lifeSpanValue = myEmitter.get( 'lifeSpan.value' );
		(end code)
    */

	self.get = function ( key ) {
		return ParticlesUtils.objectifier( key.split( '.' ), false, self.properties );
	}

	/** Method: setProperties()
			Sets a group of properties of emitter properties (supports nested object key)

        Parameters:
            obj - an objects containing properties and values
        
        (start code)
			myEmitter.setProperties({
				'emitRate': 0.1,
				'background.type': 'none',
				'origin.value.x': 100
			});
		(end code)
    */

	self.setProperties = function ( obj ) {
		var keyArr = [];

		for( var key in obj ) {
			self.set( key, obj[ key ], false );
			keyArr.push( key.split( '.' )[ 0 ] );
		}

		self._afterPropertyChanged( keyArr );
	}

	/** Method: addCustomBehavier()
			Adds on custom behavier in the run loop. If the type is 'particle' function, it will be called in each particle iteration in the run loop
			 with the iterated particle as the first parameter and an array of all particles as the second. If the type is 'emitter', it will be called
			  in each run loop with the emitter as a parameter. 

        Parameters:
            type - 'particle' or 'emitter'
            func - function to add
        
        (start code)
        	function customParticleBehavier1 ( particle, particleGroup ) {
				var particleLocation = particle.properties.location;
				var i;
				//if there is another particle in the range of 60, set the color to red
				//otherwise set it to yellow
			    for( i=0; i<particleGroup.length; i++ ) {
			        var particle2 = particleGroup[ i ];
			        var dist = particleLocation.dist( particle2.properties.location );
			        if( dist < 60 ) {
			            particle.properties.style.color = [ 255, 0, 0 ];
			        } else {
			            particle.properties.style.color = [ 255, 255, 0 ];
			        }
			    }
        	}

        	function customParticleBehavier2 ( particle, particleGroup ) {
				particle.properties.style.scale = particle.properties.location.y * 0.1;
        	} 

        	function customEmitterBehavier ( emitter ) {
    			//animate the gravityAmount using frameCount
				emitter.set( 'gravityAmount', Math.sin( emitter.frameCount * 0.1 ));
			};

			myEmitter.addCustomBehavier( 'particle', customParticleBehavier1 );
			myEmitter.addCustomBehavier( 'particle', customParticleBehavier2 );
			myEmitter.addCustomBehavier( 'emitter', customEmitterBehavier );

		(end code)
    */

	self.addCustomBehavier = function ( type, func ) {
		this.customBehaiver[ type ].push( func );
	}

	/** Method: removeCustomBehavier()
			Removes the custom behavier added.

        Parameters:
            type - 'particle' or 'emitter' 
            func - function to remove
        
        (start code)
			myEmitter.removeCustomBehavier( 'particle', customParticleBehavier1 );
			myEmitter.removeCustomBehavier( 'emitter', customEmitterBehavier );
		(end code)
    */
	this.removeCustomBehavier = function ( type, func ) {
		var arr = this.customBehaiver[ type ];
		var i;
		for( i=0; i<arr.length; i++ ) {
			if( arr[ i ] === func ) {
				this.customBehaiver[ type ].splice( i, 1 );
			}
		}
	}

	/** Method: emit()
			Starts emitting particles.

        (start code)
			myEmitter.emit();
		(end code)
    */

	self.emit = function () {
		self.active = true;
		self.startEmitFrame = self.frameCount;

		if( self.properties.emitRate === 0 ) {
			//emit once
			self.createParticles( self.properties.emitAmount );
		}
	}

	/** Method: stopEmitting()
			Stops emitting particles.

        (start code)
			myEmitter.stopEmitting();
		(end code)
    */

	self.stopEmitting = function () {
		self.active = false;
	}

	/** Method: empty()
			Emptys all particles.

        (start code)
			myEmitter.empty();
		(end code)
    */

	self.empty = function () {

		self.particles.forEach( function ( a ) {
			a = null;
		});
		self.particles = [];
	}

	/** Method: pause()
			Pause the run loop ( freeze it! ).

        (start code)
			myEmitter.pause();
		(end code)
    */
	self.pause = function () {
		FrameRate.unregister( self, self._run );
	}

	/** Method: resume()
			Resume the run loop after pause.

        (start code)
			myEmitter.resume();
		(end code)
    */
	self.resume = function () {
		FrameRate.register( self, self._run, self.fps );
	}
	
	//creates a object to hold tween functions
	self.tween = {};

	/** Method: tween.to()
			It creates a TweenLite animation for tweening emitter properties.
			 ( The purpose of this is to tween multiple nested keys in property object
			 , since TweenLite doesn't support nested keys. )
			 
        Parameters:
            duration - duration of the tween in seconds
            props - properties to use
        
        (start code)
        	myEmitter.tween.to( 0.3, {
				'emitRate': 1,
				'velocity.value.angle': 45,
				'origin.value.x': 100,
				'origin.value.y': 350,
				delay: 1,
				onComplete: function () {
					trace( 'Done!' );
				}
        	});
		(end code)
    */

	self.tween.to = function ( duration, props ) {
		props = props || {};

		// var self = self;
		var onUpdate = props.onUpdate || null;
		var delay = props.delay || 0;

		delete props.delay;

		return TweenLite.delayedCall( delay, function () {

			//strip out emitter properties
			var emitterProps = {};
			for( var k in props ) {
				if( self.get( k ) !== undefined ) {
					emitterProps[ k ] = self.get( k );
				}
			}

			props.onUpdate = function () {
				if( onUpdate ) { onUpdate(); }
				self.setProperties( emitterProps );
			}
			TweenLite.to( emitterProps, duration, props );
		});
	}


	/** Method: createParticles()
			Creates particles from the particle models of the emitter. 

        Parameters:
            amount - the amount of particles to create
    */
	self.createParticles = function ( amount ) {
		self.frameEmittedCount ++;

		if( self.models.length <= 0 ) { return; }
		var p = self.properties;
		var map = self.probabilityMap;
		var i;

		for( i=0; i<amount; i++ ) {
			var ms = self.models;
			var index;
			
			if( self.particles.length >= p.maxParticleAmount ) {
				return;
			}

			if( p.pickRandomModel ) {
				//select model base on probability
				var num = MathUtils.random( 0, self.totalProbability, 0.01 );
				var j;
				for( j=0; j<map.length-1; j++ ) {
					if( MathUtils.inRange( num, map[ j ], map[ j + 1 ] )) {
						index = j;
						break;						
					}
				}
			} else {
				index = ( self.frameEmittedCount - 1 ) % ( ms.length );
			}

			self.particles.push( new Particle( self.ctx, ms[ index ], self.fps ));
		}
	}

	/** Method: addModel()
			Add a particle model

        Parameters:
            modelObj - the object of the particle model to be added

        (start code)
        	var modelObj = {
				type: "Circle",
	            width: 12,
	            properties: {},
	            id: 'model5'
        	};
        	myEmitter.addModel( modelObj );
		(end code)
    */
	self.addModel = function ( modelObj ) {
		self.properties.particleModels.push( modelObj );
		self._afterPropertyChanged([ 'particleModels' ]);
	}

	/** Method: removeModel()
			Remove a particle model by its id

        Parameters:
            id - the id of the particle model to be removed

        (start code)
        	myEmitter.removeModel( 'model5' );
		(end code)
    */
	self.removeModel = function ( id ) {
		var i;
		var index = null;
		var pm = self.properties.particleModels;
		for( i=0; i<pm.length; i++ ) {
			if( id === pm[ i ].id ) { 
				index = i;
				break;
			}
		}

		if( index !== null ) { 
			pm.splice( index, 1 );
			self._afterPropertyChanged([ 'particleModels' ]);
		}
	}

	self._drawBackground = function () {

		var p = self.properties;
		var bg = p.background;
		if( p.clearCanvas ) {
			if( self.frameCount > 0 ){
				self.ctx.globalAlpha = bg.alpha;
			}
			switch( bg.type ) {
				case 'color':
					self.ctx.beginPath();
					self.ctx.rect( 0, 0, self.ctxWidth, self.ctxHeight );
					self.ctx.fillStyle = bg.color;
					self.ctx.fill();
					self.ctx.closePath();
				break;
				case 'image':
					self.ctx.drawImage( ImageManager.get( bg.image ), 0, 0, self.ctxWidth, self.ctxHeight );
				break;
				default:
					self.ctx.clearRect ( 0, 0, self.ctxWidth, self.ctxHeight );
			}
			self.ctx.globalAlpha = 1;
		}
	}

	self._afterPropertyChanged = function ( keys ) {
		keys = keys || [];

		//convert globalForce to vector
		if( keys.indexOf( 'globalForce' ) > -1 ) {
			var force = self.properties.globalForce;
			self._globalForce = Vector2D.degreeToVector( force.angle ).mult( force.amount );
		}

		//create models if it's changed
		if( keys.indexOf( 'particleModels' ) > -1 ) {

			self.models = [];
			self.totalProbability = 0;
			var map = [];
			var pm = self.properties.particleModels;
			for( i=0; i<pm.length; i++ ) {
				var pmi = pm[ i ]
				var g;
				var m;

				switch( pmi.type ) {
					case 'Image':
						g = new Graphic[ pmi.type ]( ImageManager.get( pmi.image ), pmi.width, pmi.style );
					break;
					case 'Circle':
						g = new Graphic[ pmi.type ]( pmi.width, pmi.style );
					break;
					case 'Rect':
						g = new Graphic[ pmi.type ]( pmi.width, pmi.height, pmi.style );
					break;
				}

				m = new ParticleModel( g, pmi.properties );
				m.setDefaultProperties( self.properties );
				self.models.push( m );

				map.push( self.totalProbability );

				var p = ( pmi.probability === undefined ) ? 1 : pmi.probability;
				self.totalProbability += p;
			}
			map.push( self.totalProbability );
			self.probabilityMap = map;

		} else {
			var prop = self.properties;
			self.models.forEach( function ( a ) {
				a.setDefaultProperties( prop );
			});
		}
	}.bind( self )

	self._run = function () {
		var p = self.properties;

		self._drawBackground();

		var i;
		for( i=0; i<self.particles.length; i++ ) {
			var a = this.particles[ i ];
			if( !a.isDead( self.ctxWidth, self.ctxHeight, p.killIfOutOfCanvas )) {
				self.liveParticles.push( a );
				a.update();
				a.applyForce( self._globalForce );
				if( p.gravityAmount !== 0 ) {
					var gravity = self.G.clone();
					gravity.mult( p.gravityAmount );
					a.applyForce( gravity );
				}

				if( p.world.active ) {
					a.checkWorld( p.world.value );
				}

				if( self.customBehaiver.particle !== 0 ) {
					var m;
					for( m=0; m<self.customBehaiver.particle.length; m++ ) {
						var func = self.customBehaiver.particle [ m ].call( func, a, self.particles );
					}
				}

				a.render();

			} else {
				a = null;
			}
		};
		//discard dead particles
		self.particles = self.liveParticles;
		self.liveParticles = [];

		if( self.customBehaiver.emitter !== 0 ) {
			var m;
			for( m=0; m<self.customBehaiver.emitter.length; m++ ) {
				var func = self.customBehaiver.emitter[ m ].call( func, self );
			}
		}

		//emit if active
		if( self.active ) {
			//emit if on frame
			var f = self.frameCount - self.startEmitFrame;
			if( f % ~~( 1 / p.emitRate ) === 0 ) {
				self.createParticles( p.emitAmount );
			}
		}

		self.frameCount ++;
	}

}
