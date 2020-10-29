/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	AdData

	Description:
		Central data container for processing json and other pre-flight data.
		This is the local data container where you can prepare all of your json for easy access in your build.
		It was instantiated in PrepareCommon.init() and is available on adData.

		Operations common to this class may include parsing dates, assembling lists of images to preload, 
		creating hooks for additional modules, etc.
	
	Parameters:
			parsedJsonData		- raw json object

	(start code)
		// access the raw JSON like this
		global.adData.adDataRaw
		
		// assign a property in AdData like this
		this.myVar = true;

		// assign a property from anywhere like this
		adData.otherVar = [1,2,3];

		// access to a property from anywhere
		trace( adData.myVar ); // true
		trace( adData.otherVar ); // 1,2,3

		// store a DOM element such as a div or textfield in the elements var like this
		adData.elements.myDiv = Markup.addDiv({
			target:'redAdContainer',
			id:'my_div',
			styles:'position:absolute'
		});
	(end code)
		
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */
function AdData( parsedJsonData ){
	
	this.adDataRaw = parsedJsonData ? parsedJsonData : {};

	trace( '  adDataRaw:');
	trace( this.adDataRaw );

	this.elements = {};
	this.elements.redAdContainer = Markup.getElement( 'redAdContainer' );
	
	this.edgeData = new EdgeData();

	/*-- Red.Component.ad_data_init.start --*/
	/*-- Red.Component.ad_data_init.end --*/

	/*/////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////     EXTRACT JSON DATA HERE     ///////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////*/

	// -- DEBUG
	this.skipQuiz = getParameterByName('skipQuiz') == 'true' ? true : false;	// -- DEBUG
	// this.skipQuiz = true;						// -- DEBUG

	// -- Guides
	this.guideLabel = '';
	// this.guideLabel = 'guide1';				// -- DEBUG
	// this.guideLabel = 'guide2';				// -- DEBUG
	// this.guideLabel = 'guide3';				// -- DEBUG
	// this.guideLabel = 'guide4';				// -- DEBUG
	// this.guideLabel = 'guide5';				// -- DEBUG
	// this.guideLabel = 'guide6';				// -- DEBUG
	// this.guideLabel = 'guide7';				// -- DEBUG
	this.guide = this.guideLabel ? ImageManager.addToLoad( this.guideLabel + '.jpg', adParams.imagesPath ) : '';

	// -- Video
	this.videoMuted = false;
	this.videoIDs = [
		'video1',
		'video2',
		'video3',
		'video4',
		'video5',
	];
	this.curVideoPlayer;

	// -- Fonts
	this.primaryFont = 'Flama-ExtraBold-optimized';
	this.secondaryFont = 'Flama-ExtraboldItalic-optimized';
	this.tertiaryFont = 'Flama-BoldItalic-ALLCAPS';
	this.quaternaryFont = 'Flama-BookItalic-optimized';

	// -- Colors
	this.huluColors = {
		primaryGreen: '#66AA33',
		secondaryGreen: '#99CC33',
		tertiaryGreen: '#41811E',
		black: '#222222',
		darkGrey: '#666666',
		lightGrey: '#E8E8E8',
	}
	this.greyColor = '#212221';
	this.wrongColor = '#f30009';
	this.whiteColor = '#ffffff';

	this.userInteracted = false;



	this.autoplay = true;			// -- toggles between autoplay units and non-autoplay units

	// -- Copy Intro
	this.introText1 = ftData.introText1;
	this.introText2 = ftData.introText2;
	this.startCTA = ftData.startCTA.toUpperCase();

	// -- Copy Quiz
	this.quizHeader = ftData.quizHeader;
	this.getReady = ftData.getReady;
	this.quizCTA = ftData.quizCTA;
	this.continueCTA = ftData.continueCTA.toUpperCase();




	// -- Quiz
	this.quizTimerTicking = false;
	this.score = 0;
	this.questionTime = 7;
	this.questionQuickResolveTime = 0.25;
	this.questions = [];
	var curLabel;
	var maxQuestions = 5;
	var i;
	for ( i = 0; i < maxQuestions; i++ )
	{
		curLabel = 'question' + (i + 1);
		if ( ftData[curLabel + 'Image'] )
		{
			this.questions.push({
				id: curLabel,
				question: ftData[curLabel],
				answer: ftData[curLabel + 'CorrectAnswer'],
				answers: [
					ftData[curLabel + 'answerA'].toUpperCase(),
					ftData[curLabel + 'answerB'].toUpperCase(),
					ftData[curLabel + 'answerC'].toUpperCase(),
					ftData[curLabel + 'answerD'].toUpperCase(),
				],
				// image: ImageManager.addToLoad( ftData[curLabel + 'Image'], adParams.adPath ),
				image: ImageManager.addToLoad( ftData[curLabel + 'Image'] ),
				video: ''
			});
		}
	}

	this.totalIntroImages = parseInt(ftData.totalIntroImages) > this.questions.length ? this.questions.length : parseInt(ftData.totalIntroImages);


	// -- Copy Results
	this.resultText1Good = ftData.resultText1Good;
	this.resultText1Ok = ftData.resultText1Ok;
	this.resultText1Bad = ftData.resultText1Bad;
	this.resultText2Good = ftData.resultText2Good;
	this.resultText2Ok = ftData.resultText2Ok;
	this.resultText2Bad = ftData.resultText2Bad;


	this.resultText = function(num)
	{
		var resultText = this.score < 2 ? this['resultText' + num + 'Bad'] : this.score < this.questions.length ? this['resultText' + num + 'Ok'] : this['resultText' + num + 'Good'];
		return resultText;
	}


	// -- Copy Endframe
	this.endframeHeadline = ftData.endframeHeadline;//.toUpperCase();
	this.endframeOnHulu = ftData.endframeOnHulu;
	this.endframeCTA1 = ftData.endframeCTA1;
	this.endframeCTA2 = ftData.endframeCTA2;
	this.replay = ftData.replay;


	// -- Endframe Images
	this.endframeImages = [];
	this.endframeURLs = [];
	var maxEndframeImages = 20;
	for ( i = 0; i < maxEndframeImages; i++ )
	{
		curLabel = 'endframeImage' + (i + 1);
		if ( ftData[curLabel] )
		{
			// this.endframeImages.push(ImageManager.addToLoad( ftData[curLabel], adParams.adPath ));
			this.endframeImages.push(ImageManager.addToLoad( ftData[curLabel] ));
			this.endframeURLs.push( ftData['endframeImageUrl' + (i + 1)] );
			// global['clickTag' + (i + 1)] = ftData['endframeImageUrl' + (i + 1)];
		}
	}


	this.networkExit = function ( argsClickTag )
	{
		var exitClickTag = argsClickTag ? argsClickTag : clickTag;
		Network.exit( exitClickTag );
		if ( this.curVideoPlayer )
			this.curVideoPlayer.onPlayPause(true);
		else if ( this.quizTimerTicking )
		{
			adData.userInteracted = false;
			adData.elements.quiz.pause();
		}
	}



	function getParameterByName(name, url) {
	    if (!url) url = window.location.href;
	    name = name.replace(/[\[\]]/g, "\\$&");
	    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	        results = regex.exec(url);
	    if (!results) return null;
	    if (!results[2]) return '';
	    return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

	this.isMobile = (Device.type != 'desktop')?true:false;
	trace('!!!!!!!!! IS THIS DEVICE ON MOBILE !!!!!!!',this.isMobile)

	/* DYNAMIC IMAGES
		Dynamically loaded images need to be in their own directory, like "dynamic_images/".

		Then, you need to add your dynamic image-paths to the load-queue, so that when
		PrepareCommon performs the secondary preload, these assets will get loaded. For example:

	var theImageName = ImageManager.addToLoad( 'sample.jpg', adParams.imagesPath )
	 */



	/*-- Red.Component.ad_data_misc.start --*/
	/*-- Red.Component.ad_data_misc.end --*/

}




