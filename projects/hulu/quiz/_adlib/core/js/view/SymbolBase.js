/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	SymbolBase

	Description:
		This class provides a basic structure for building additional, instantiable view classes. It was conceived originally 
		for compatibility with the Edge build process, so there was a way to write Symbols into their own classes. 

		It can also be used to modularize your markup from the build.js into more logical chunks. 

	Usage:
		To use this class to build a view class
			1) Copy it into "_adlib/common/js/view/"
			2) Rename the file to a name of your choosing, like "Endframe_300x250.js"
			3) Then, in this file, rename the top-most "SymbolBase" to the same name( without extension ), like "Endframe_300x250"
			4) Don't forget to add the path in your index' includes array, like 

		(start code)
			// in your index.html, import the class by adding it to the includes function
			var includes = function() { return [
				adParams.commonPath + "js/view/Endframe_300x250.js",
				adParams.adPath + "build.js",
			]};
		(end code)

		Lastly, you need to instantiate the class and add it to your existing build markup. That would look something like

		(start code)
			adData.elements.Endframe_300x250__container = Markup.addDiv({
				id: 'Endframe_300x250__container',
				css: { 
					width:			'100px',
					height:			'100px',
					transform:		'translate( 53, 78 )',
				},
				styles: '',
				target: 'redAdContainer'
			});
			adData.elements.Endframe_300x250__build = new Endframe_300x250();
			adData.elements.Endframe_300x250__build.control.prepare(
				adData.elements.Endframe_300x250__container, {
					startTime: 0,
					onStartCallback: function() {},
					onCompleteCallback: function() {}
			});
		(end code)

		Notice that you can set the "startTime"( in seconds ) and callbacks for animation start and complete. Please note,
		the complete-callback needs to be called after your last Tween has completed.

		From there, you should be able to use this class like you would the build.js, by using <Markup>, <Styles>, and TweenLite 
		to build out your view and animation.
*/
var SymbolBase = function() {
	var inst = this;

	inst.id;
	inst.scope;
	inst.scopeId;
	inst.target;


	/* == CONTROL ===========================================================================================================
	 *
	 *
	 *
	 */
	inst.control = new function() {

		this.prepare = function( _args ) {
			inst.id = _args.id;
			inst.scope = _args.scope;
			inst.scopeId = _args.scopeId;
			inst.target = _args.target;
			trace( inst.id + '.control.prepare()' );

			// begin building -->
			inst.control.preMarkup();

			inst.view.buildMarkup();

			inst.control.postMarkup();

			inst.animation.prepareToPlay( _args || {} );
		}

		// PRE-MARKUP Control...
		this.preMarkup = function() {
			trace( inst.id + '.control.preMarkup()' );
			//  Hand-coded control( pre-view.buildMarkup ) -->

		}

		// POST-MARKUP Control... 
		this.postMarkup = function() {
			trace( inst.id + '.control.postMarkup()' );
			//  Hand-coded control( post-view.buildMarkup ) -->

		}
	}



	/* == VIEW ==============================================================================================================
	 *
	 *
	 *
	 */
	inst.view = new function() {

		this.buildMarkup = function() {
			trace( inst.id + '.view.buildMarkup()' );

			//  Hand-coded markup( pre-Edge ) -->

			/* ---- Red.Markup.start --------------------------------------------------------------- */
			/* ---- Red.Markup.end ----------------------------------------------------------------- */

			//  Hand-coded markup( post-Edge ) -->
		}
	}




	/* == ANIMATION =========================================================================================================
	 *
	 *
	 *
	 */
	inst.animation = new function() {

		this.onStartCallback;
		this.onCompleteCallback;

		this.prepareToPlay = function( _args ) {
			var startTime = _args.startTime !== undefined ? _args.startTime : 0;
			trace( inst.id + '.animation.prepareToPlay(), startTime: ' + startTime + 's' );

			this.onStartCallback = _args.onStartCallback && _args.onStartCallback !== undefined ? _args.onStartCallback : function() {};
			this.onCompleteCallback = _args.onCompleteCallback && _args.onCompleteCallback !== undefined ? _args.onCompleteCallback : function() {};

			setTimeout( this.play.bind( inst.animation ), startTime * 1000 );
		}

		this.play = function() {
			trace( inst.id + '.animation.play()' );
			this.onStartCallback.call();

			//  Hand-coded animation( pre-Edge ) -->

			/* ---- Red.Animation.start ------------------------------------------------------------ */
			/* ---- Red.Animation.end -------------------------------------------------------------- */

			//  Hand-coded animation( post-Edge ) -->
		}
	}
}


