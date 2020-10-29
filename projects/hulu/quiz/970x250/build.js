/* Template: Flashtalking - Base, AdApp: 1.1.99, AdHtml: v2.6.2, Instance: 08/25/16 10:06am */
/* -- CONTROL ----------------------------------------------------------------------------------------------------
 *
 *
 *
 */
var Control = new function() {

	/** -- CONTROL: PREPARE-BUILD - build runtime begins here ----------->
	 *
	 *
	 */ 
	this.prepareBuild = function() {
		trace( 'Control.prepareBuild()' );
		/*-- Red.Component.control_preparebuild_premarkup.start --*/
		Control.preMarkup();
		/*-- Red.Component.control_preparebuild_premarkup.end --*/

		/*-- Red.Component.control_preparebuild_buildmarkup.start --*/
		View.buildMarkup();
		/*-- Red.Component.control_preparebuild_buildmarkup.end --*/

		/*-- Red.Component.control_preparebuild_postmarkup.start --*/
		Control.postMarkup();
		/*-- Red.Component.control_preparebuild_postmarkup.end --*/

		/*-- Red.Component.control_preparebuild_startscene.start --*/
		Animation.startScene();
		/*-- Red.Component.control_preparebuild_startscene.end --*/
	}


	/** -- CONTROL: PRE-MARKUP ---------------------------------->
	 *
	 *
	 */
	this.preMarkup = function() {
		trace( 'Control.preMarkup()' );
		/*-- Red.Component.control_premarkup_click.start --*/
		// listen for default exit
		/*Gesture.addEventListener( adData.elements.redAdContainer, GestureEvent.CLICK, function() { 
			Network.exit( clickTag ); 
		});*/
		/*-- Red.Component.control_premarkup_click.end --*/

		/*-- Red.Component.control_premarkup_misc.start --*/
		/*-- Red.Component.control_premarkup_misc.end --*/

		// USER-DEFINED Control( pre-View.buildMarkup ) -->
	}


	/** -- CONTROL: POST-MARKUP ----------------------------------> 
	 *
	 *
	 */
	this.postMarkup = function() {
		trace( 'Control.postMarkup()' );
		/*-- Red.Component.control_postmarkup_misc.start --*/
		/*-- Red.Component.control_postmarkup_misc.end --*/

		// USER-DEFINED Control( post-View.buildMarkup ) -->
		Gesture.addEventListener( adData.elements.startBTN, GestureEvent.CLICK, Control.onStartClicked);
		Gesture.addEventListener( adData.elements.startBTN, GestureEvent.OVER, adData.elements.intro.btn.onHitRollOver);
		Gesture.addEventListener( adData.elements.startBTN, GestureEvent.OUT, adData.elements.intro.btn.onHitRollOut);
	}




	/** -- CONTROL: MISC --------------------------------------> 
	 *
	 *
	 */
	/*-- Red.Component.control_misc_functions.start --*/
	/*-- Red.Component.control_misc_functions.end --*/

	// USER-DEFINED Control( Misc Functions )
	this.onStartClicked = function(event)
	{
		adData.userInteracted = true;
		Animation.skipIntro();
	}

	this.reset = function()
	{
		adData.autoplay = true;		// -- if it's a unit that doesnt' autoplay, must set autoplay to true when replaying
		Gesture.removeEventListener( adData.elements.exitBTN, GestureEvent.OVER, adData.elements.endframe.endframeCTA.onHitRollOver);
		Gesture.removeEventListener( adData.elements.exitBTN, GestureEvent.OUT, adData.elements.endframe.endframeCTA.onHitRollOut);
		adData.elements.quiz.reset();
		Animation.showQuiz();
	}
}







/* -- VIEW ----------------------------------------------------------------------------------------------------
 *
 *
 *
 */
var View = new function() {

	/** -- VIEW: BUILD-MARKUP ---------------------------------->
	 *
	 *
	 */
	this.buildMarkup = function() {
		trace( 'View.buildMarkup()' );
		/*-- Red.Component.view_buildmarkup_preedge.start --*/
		/*-- Red.Component.view_buildmarkup_preedge.end --*/

		// USER-DEFINED Markup( pre-Edge ) -->

		/*-- Red.Component.view_buildmarkup_edge.start --*/
		/*-- Red.Edge.markup.start --*/
		if (adData.guide)
		{
			adData.elements.guide = new UIImage ({
				id: 'guide',
				target: adData.elements.redAdContainer,
				source: adData.guide,
				css: {}
			});
		}


		adData.elements.bg = new UIComponent({
			id: 'bg',
			target: adData.elements.redAdContainer,
			css:{
				width: adParams.adWidth,
				height: adParams.adHeight,
				position: 'absolute',
				backgroundColor: adData.greyColor
			}
		});



		adData.elements.exitBTN = new UIComponent({
			id: 'exitBTN',
			target: adData.elements.redAdContainer,
			css:{
				width: adParams.adWidth,
				height: adParams.adHeight,
				position: 'absolute'
			}
		});


		adData.elements.quiz = new Quiz();
		adData.elements.quiz.build({
			target: adData.elements.redAdContainer,
			quizWidth: 444,
			callback: Animation.showResults,
			question: {
				imageWidth: 520
			},
			marker: {
				width: 30,
				height: 30,
				top: 17,
				leftOffset: 8,
				fontSize: 11,
				lineHeight: 11,
			},
			header: {
				height: 50,
				fontSize: 28,
				lineHeight: 28,
				top: 23
			},
			cta: {

			}
		});


		adData.elements.results = new Results();
		adData.elements.results.build({
			callback: Animation.showEndframe,
			showCallback: Animation.hideQuiz
		});

		adData.elements.endframe = new Endframe();
		adData.elements.endframe.build({
			callback: Animation.showQuiz,
			resetCallback: Control.reset
		});


		adData.elements.intro = new Intro();
		adData.elements.intro.build({
			callback: Animation.skipIntro
		});

		adData.elements.startBTN = new UIComponent({
			id: 'startBTN',
			target: adData.elements.redAdContainer,
			css:{
				width: adParams.adWidth,
				height: adParams.adHeight,
				position: 'absolute'
			}
		});


		var logoLabel = 'logo';
		adData.elements.logo = new UIImage({
			id: logoLabel,
			target: adData.elements.redAdContainer,
			source: logoLabel,
			css: {

			}
		});
		Align.move( Align.BOTTOM_LEFT, adData.elements.logo, 19, -13 );

		// adData.elements.logo.enabled = false;
		Gesture.disable( adData.elements.logo );


		// add borders and background color to ad if needed
		Markup.addBorder( 'main', adData.elements.redAdContainer, 2, '#000000' );
		Styles.setBackgroundColor( adData.elements.redAdContainer, '#cccccc' );
		/*-- Red.Edge.markup.end --*/
		/*-- Red.Component.view_buildmarkup_edge.end --*/

		/*-- Red.Component.view_buildmarkup_misc.start --*/
		/*-- Red.Component.view_buildmarkup_misc.end --*/

		// USER-DEFINED Markup( post-Edge ) -->
	}


	/** -- VIEW: MISC ------------------------------------------> 
	 *
	 *
	 */
	/*-- Red.Component.view_misc_functions.start --*/
	/*-- Red.Component.view_misc_functions.end --*/
}







/* -- ANIMATION ----------------------------------------------------------------------------------------------------
 *
 *
 *
 */
var Animation = new function() {

	/** -- ANIMATION: START-SCENE ------------------------------------------> 
	 *
	 *
	 */
	this.startScene = function() {
		trace( 'Animation.startScene()' );

		/* show the main container */
		// global.removePreloader();
		Styles.setCss( global.adData.elements.redAdContainer, 'opacity', '1' );

		// USER-DEFINED Animation( pre-Edge ) -->

		/*-- Red.Component.animation_startscene_edge.start --*/
		/*-- Red.Edge.animation.start --*/
		/*-- Red.Edge.animation.end --*/

		/*-- Red.Component.animation_startscene_edge.end --*/

		// USER-DEFINED Animation( post-Edge ) -->

		/*-- Red.Component.animation_startscene_misc.start --*/
		var preloader = document.getElementById( "preloader" );
		TweenLite.fromTo( preloader, 0.5,
			{clip:'rect( 0px, ' + adParams.adWidth + 'px, ' + adParams.adHeight + 'px, 0px )'},
			{clip:'rect( 0px, ' + adParams.adWidth + 'px, ' + adParams.adHeight + 'px, ' + adParams.adWidth + 'px )', ease:Quad.easeInOut, onComplete: function() {
				global.removePreloader();
			}
		} );

		if ( adData.autoplay )
			adData.elements.intro.show();
		else
		{
			Animation.skipIntro();
		}
		/*-- Red.Component.animation_startscene_misc.end --*/
	}

	/*-- Red.Component.animation_misc_functions.start --*/

	this.skipIntro = function()
	{
		trace('Animation.skipIntro()');
		adData.elements.intro.btn.onHitRollOver();
		Gesture.removeEventListener( adData.elements.startBTN, GestureEvent.CLICK, Animation.skipIntro);
		Gesture.removeEventListener( adData.elements.startBTN, GestureEvent.OVER, adData.elements.intro.btn.onHitRollOver);
		Gesture.removeEventListener( adData.elements.startBTN, GestureEvent.OUT, adData.elements.intro.btn.onHitRollOut);
		Gesture.addEventListener( adData.elements.exitBTN, GestureEvent.CLICK, function() { 
			adData.networkExit( clickTag );
		});
		Gesture.disable( adData.elements.startBTN );
		if ( adData.autoplay )
			adData.elements.intro.hide();
		Animation.showQuiz();
	}

	this.showQuiz = function()
	{
		if (adData.skipQuiz)
		{
			adData.elements.quiz.hide();		// DEBUG -- skip quiz
			Animation.showResults();			// DEBUG -- skip quiz
		}
		else
		{
			adData.elements.quiz.show();
			Gesture.addEventListener( adData.elements.exitBTN, GestureEvent.OVER, adData.elements.quiz.quizCTA.onHitRollOver);
			Gesture.addEventListener( adData.elements.exitBTN, GestureEvent.OUT, adData.elements.quiz.quizCTA.onHitRollOut);
		}
	}

	this.showResults = function()
	{
		trace('Animation.showResults()');
		adData.elements.results.show();
	}

	this.hideQuiz = function()
	{
		Gesture.removeEventListener( adData.elements.exitBTN, GestureEvent.OVER, adData.elements.quiz.quizCTA.onHitRollOver);
		Gesture.removeEventListener( adData.elements.exitBTN, GestureEvent.OUT, adData.elements.quiz.quizCTA.onHitRollOut);
		adData.elements.quiz.hide();
	}

	this.showEndframe = function()
	{
		adData.elements.endframe.show();
		Gesture.addEventListener( adData.elements.exitBTN, GestureEvent.OVER, adData.elements.endframe.endframeCTA.onHitRollOver);
		Gesture.addEventListener( adData.elements.exitBTN, GestureEvent.OUT, adData.elements.endframe.endframeCTA.onHitRollOut);
	}
	/*-- Red.Component.animation_misc_functions.end --*/
}


