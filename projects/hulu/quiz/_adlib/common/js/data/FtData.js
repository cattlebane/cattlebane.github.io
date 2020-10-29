/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	FtData

	Description:
		This class is the data-interface for the FLASHTALKING platform. It proxies their dynamic platform with our build.

		Be sure to use the "@ft-text" or "@ft-image" comments for new properties. This is how AdApp knows which functions 
		should be written into the Flashtalking manifest.js file.

		Also, for images, make sure you validate the image path with validateImagePath(). This ensures that the images 
		will load in all of the different environments.

	
	Instantiation:
		To access this class, you should instantiate it in <PrepareCommon>, the same way <AdData> is prepared:
	
		(start code)
			global.ftData = new FtData();
		(end code)

		Then you can reference your data anywhere, like:

		>> trace( ftData.dynamicText1 );


	Load Dynamic Images:
		To get the dynamic images loaded, you should add them to the load-queue in <PrepareCommon>. You should check if 
		the image is null, since Flashtalking will provide incomplete sub-paths for images that have not been
		uploaded, causing the image-request to fail.

		(start code)
			for( var imageKey in ftData.imageMap ) {
				var img = ftData.getImage( imageKey, adParams.adSize );
				if( img )
					adData.gallery.push( ImageManager.addToLoad( img, adParams.adPath ) );
			}
		(end code)



	---------------------------------------------------------------------------------------------------------------------------------------------------------- */
function FtData() {
	this.validateImagePath = function( target ) {
		if( target == '' || target.indexOf( 'null' ) > -1 || target.indexOf( 'ftBlankGif' ) > -1 )
			return null;
		else if( remoteControl.debug ) 
			return target.replace( /\.\.\//g, '' );
		else return target;
	}

		
	/* -- PUBLIC DYNAMIC VARIABLES ------------------------------
	 *
	 *	  
	 *
	 */


	// @ft-text
	this.introText1 = myFT.instantAds.intro_text_1 || 'Think you know your TV?';
	// @ft-text
	this.introText2 = myFT.instantAds.intro_text_2 || 'Let’s find out.';
	// @ft-text
	this.totalIntroImages = myFT.instantAds.total_intro_images || '4';

	// @ft-text
	this.startCTA = myFT.instantAds.start_cta || 'START PLAYING';
	// @ft-text
	this.continueCTA = myFT.instantAds.continueCTA || 'CONTINUE PLAYING';
	// @ft-text
	this.getReady = myFT.instantAds.get_ready || 'GET READY TO GUESS THE SHOW!';

	// @ft-text
	this.quizHeader = myFT.instantAds.quiz_header || 'If You Know TV...';
	// @ft-text
	this.quizCTA = myFT.instantAds.quiz_cta || 'Start Your Free Trial';//'Make Fall Yours. Start Your Free Trial';

	// @ft-text
	this.question1 = myFT.instantAds.question_1 || 'Then you should know this show';
	// @ft-text
	this.question1answerA = myFT.instantAds.question_1_answer_a || 'SEINFELD';
	// @ft-text
	this.question1answerB = myFT.instantAds.question_1_answer_b || 'CHEERS';
	// @ft-text
	this.question1answerC = myFT.instantAds.question_1_answer_c || "THREE'S COMPANY";
	// @ft-text
	this.question1answerD = myFT.instantAds.question_1_answer_d || "DAWSON'S CREEK";
	// @ft-text
	this.question1CorrectAnswer = myFT.instantAds.question_1_correct_answer || 'A';

	// @ft-text
	this.question2 = myFT.instantAds.question_2 || 'Then you should know this show';
	// @ft-text
	this.question2answerA = myFT.instantAds.question_2_answer_a || 'CHICAGO P.D.';
	// @ft-text
	this.question2answerB = myFT.instantAds.question_2_answer_b || 'CSI';
	// @ft-text
	this.question2answerC = myFT.instantAds.question_2_answer_c || 'MURDER IN THE FIRST';
	// @ft-text
	this.question2answerD = myFT.instantAds.question_2_answer_d || 'BLINDSPOT';
	// @ft-text
	this.question2CorrectAnswer = myFT.instantAds.question_2_correct_answer || 'D';

	// @ft-text
	this.question3 = myFT.instantAds.question_3 || 'Then you should know this movie';
	// @ft-text
	this.question3answerA = myFT.instantAds.question_3_answer_a || 'PROJECT ALMANAC';
	// @ft-text
	this.question3answerB = myFT.instantAds.question_3_answer_b || 'TERMINATOR GENISYS';
	// @ft-text
	this.question3answerC = myFT.instantAds.question_3_answer_c || 'TRANSFORMERS<br>AGE OF EXTINCTION';
	// @ft-text
	this.question3answerD = myFT.instantAds.question_3_answer_d || 'SHAUN THE SHEEP:<br>THE MOVIE';
	// @ft-text
	this.question3CorrectAnswer = myFT.instantAds.question_3_correct_answer || 'B';

	// @ft-text
	this.question4 = myFT.instantAds.question_4 || 'Then you should know this show';
	// @ft-text
	this.question4answerA = myFT.instantAds.question_4_answer_a || 'NEW GIRL';
	// @ft-text
	this.question4answerB = myFT.instantAds.question_4_answer_b || 'PARKS AND RECREATION';
	// @ft-text
	this.question4answerC = myFT.instantAds.question_4_answer_c || 'THE MINDY PROJECT';
	// @ft-text
	this.question4answerD = myFT.instantAds.question_4_answer_d || 'SUPERSTORE';
	// @ft-text
	this.question4CorrectAnswer = myFT.instantAds.question_4_correct_answer || 'C';

	// @ft-text
	this.question5 = myFT.instantAds.question_5 || 'Then you should know this show';
	// @ft-text
	this.question5answerA = myFT.instantAds.question_5_answer_a || 'THE STRAIN';
	// @ft-text
	this.question5answerB = myFT.instantAds.question_5_answer_b || 'RESCUE ME';
	// @ft-text
	this.question5answerC = myFT.instantAds.question_5_answer_c || 'TIMELESS';
	// @ft-text
	this.question5answerD = myFT.instantAds.question_5_answer_d || 'HOMELAND';
	// @ft-text
	this.question5CorrectAnswer = myFT.instantAds.question_5_correct_answer || 'D';

	// @ft-text
	this.resultText1Good = myFT.instantAds.result_text_1_good || 'What-the-Whaa? You really know your TV!';
	// @ft-text
	this.resultText1Ok = myFT.instantAds.result_text_1_ok || 'Okay, okay. Not too bad.';
	// @ft-text
	this.resultText1Bad = myFT.instantAds.result_text_1_bad || 'Umm. Not exactly a TV genius, are you?';

	// @ft-text
	this.resultText2Good = myFT.instantAds.result_text_2_good || 'You got all of them right!';
	// @ft-text
	this.resultText2Ok = myFT.instantAds.result_text_2_ok || "But you've got some catching up to do.";
	// @ft-text
	this.resultText2Bad = myFT.instantAds.result_text_2_bad || 'Thank goodness we found you.';

	// @ft-text
	this.endframeHeadline = myFT.instantAds.endframe_headline || "THIS FALL DON'T JUST WATCH TV, MAKE IT YOURS";//"Check out the fall's coolest shows and movies on Hulu:";
	// this.endframeHeadline = myFT.instantAds.endframe_headline || "<span style='color: #66AA33;'>LIMITED-TIME OFFER &#160;<span style='color:#ffffff; font-family: Flama-ExtraBold-optimized;'>GET HULU FOR $5.99/MONTH</span><sup style='font-size: 60%;'>*</sup></span>";
	// @ft-text
	this.endframeOnHulu = myFT.instantAds.endframe_on_hulu || '';//"Check out the fall's coolest shows and movies on Hulu:";
	// this.endframeOnHulu = myFT.instantAds.endframe_on_hulu || "<span style='color: #ffffff; font-size: 23px; line-height: 20px; letter-spacing: 2px; font-family: Flama-BookItalic-optimized; text-align: center;'>This Fall Don't Just Watch TV, Make It Yours</span>";
	// @ft-text
	this.endframeCTA1 = myFT.instantAds.endframe_cta_1 || '';//'Make Fall Yours.';
	// @ft-text
	this.endframeCTA2 = myFT.instantAds.endframe_cta_2 || 'Start Your Free Trial';

	// @ft-text
	this.replay = myFT.instantAds.replay || 'REPLAY';




	// @ft-text
	this.endframeImageUrl1 = myFT.instantAds.endframe_image_1_url || 'http://www.hulu.com/start?show=seinfeld';
	// @ft-text
	this.endframeImageUrl2 = myFT.instantAds.endframe_image_2_url || 'http://www.hulu.com/start?show=blindspot';
	// @ft-text
	this.endframeImageUrl3 = myFT.instantAds.endframe_image_3_url || 'http://www.hulu.com/watch/958003';
	// @ft-text
	this.endframeImageUrl4 = myFT.instantAds.endframe_image_4_url || 'http://www.hulu.com/start?show=the-mindy-project';
	// @ft-text
	this.endframeImageUrl5 = myFT.instantAds.endframe_image_5_url || 'http://www.hulu.com/start?show=homeland';
	// @ft-text
	this.endframeImageUrl6 = myFT.instantAds.endframe_image_6_url || 'http://www.hulu.com/start';
	// @ft-text
	this.endframeImageUrl7 = myFT.instantAds.endframe_image_7_url || 'http://www.hulu.com/start';
	// @ft-text
	this.endframeImageUrl8 = myFT.instantAds.endframe_image_8_url || 'http://www.hulu.com/start';
	// @ft-text
	this.endframeImageUrl9 = myFT.instantAds.endframe_image_9_url || 'http://www.hulu.com/start';
	// @ft-text
	this.endframeImageUrl10 = myFT.instantAds.endframe_image_10_url || 'http://www.hulu.com/start';
	// @ft-text
	this.endframeImageUrl11 = myFT.instantAds.endframe_image_11_url || 'http://www.hulu.com/start';
	// @ft-text
	this.endframeImageUrl12 = myFT.instantAds.endframe_image_12_url || 'http://www.hulu.com/start';
	// @ft-text
	this.endframeImageUrl13 = myFT.instantAds.endframe_image_13_url || 'http://www.hulu.com/start';
	// @ft-text
	this.endframeImageUrl14 = myFT.instantAds.endframe_image_14_url || 'http://www.hulu.com/start';
	// @ft-text
	this.endframeImageUrl15 = myFT.instantAds.endframe_image_15_url || 'http://www.hulu.com/start';
	// @ft-text
	this.endframeImageUrl16 = myFT.instantAds.endframe_image_16_url || 'http://www.hulu.com/start';
	// @ft-text
	this.endframeImageUrl17 = myFT.instantAds.endframe_image_17_url || 'http://www.hulu.com/start';
	// @ft-text
	this.endframeImageUrl18 = myFT.instantAds.endframe_image_18_url || 'http://www.hulu.com/start';
	// @ft-text
	this.endframeImageUrl19 = myFT.instantAds.endframe_image_19_url || 'http://www.hulu.com/start';
	// @ft-text
	this.endframeImageUrl20 = myFT.instantAds.endframe_image_20_url || 'http://www.hulu.com/start';






	// @ft-image
	this.question1Image = this.validateImagePath( 
		myFT.instantAds.question_1_image || 'instantAssets/quiz_seinfeld.jpg'
	);
	// @ft-image
	this.question2Image = this.validateImagePath( 
		myFT.instantAds.question_2_image || 'instantAssets/quiz_blindspot.jpg'
	);
	// @ft-image
	this.question3Image = this.validateImagePath( 
		myFT.instantAds.question_3_image || 'instantAssets/quiz_terminatorgenisys.jpg'
	);
	// @ft-image
	this.question4Image = this.validateImagePath( 
		myFT.instantAds.question_4_image || 'instantAssets/quiz_mindyproject.jpg'
	);
	// @ft-image
	this.question5Image = this.validateImagePath( 
		myFT.instantAds.question_5_image || 'instantAssets/quiz_homeland.jpg'
	);



	// @ft-image
	this.endframeImage1 = this.validateImagePath( 
		myFT.instantAds.endframe_image_1 || 'instantAssets/thumb_seindfeld.jpg'
	);
	// @ft-image
	this.endframeImage2 = this.validateImagePath( 
		myFT.instantAds.endframe_image_2 || 'instantAssets/thumb_blindspot.jpg'
	);
	// @ft-image
	this.endframeImage3 = this.validateImagePath( 
		myFT.instantAds.endframe_image_3 || 'instantAssets/thumb_terminatorgenisys.jpg'
	);
	// @ft-image
	this.endframeImage4 = this.validateImagePath( 
		myFT.instantAds.endframe_image_4 || 'instantAssets/thumb_mindyproject.jpg'
	);
	// @ft-image
	this.endframeImage5 = this.validateImagePath( 
		myFT.instantAds.endframe_image_5 || 'instantAssets/thumb_homeland.jpg'
	);
	// @ft-image
	this.endframeImage6 = this.validateImagePath( 
		myFT.instantAds.endframe_image_6 || 'instantAssets/ftBlankGif.gif'
	);
	// @ft-image
	this.endframeImage7 = this.validateImagePath( 
		myFT.instantAds.endframe_image_7 || 'instantAssets/ftBlankGif.gif'
	);
	// @ft-image
	this.endframeImage8 = this.validateImagePath( 
		myFT.instantAds.endframe_image_8 || 'instantAssets/ftBlankGif.gif'
	);
	// @ft-image
	this.endframeImage9 = this.validateImagePath( 
		myFT.instantAds.endframe_image_9 || 'instantAssets/ftBlankGif.gif'
	);
	// @ft-image
	this.endframeImage10 = this.validateImagePath( 
		myFT.instantAds.endframe_image_10 || 'instantAssets/ftBlankGif.gif'
	);
	// @ft-image
	this.endframeImage11 = this.validateImagePath( 
		myFT.instantAds.endframe_image_11 || 'instantAssets/ftBlankGif.gif'
	);
	// @ft-image
	this.endframeImage12 = this.validateImagePath( 
		myFT.instantAds.endframe_image_12 || 'instantAssets/ftBlankGif.gif'
	);
	// @ft-image
	this.endframeImage13 = this.validateImagePath( 
		myFT.instantAds.endframe_image_13 || 'instantAssets/ftBlankGif.gif'
	);
	// @ft-image
	this.endframeImage14 = this.validateImagePath( 
		myFT.instantAds.endframe_image_14 || 'instantAssets/ftBlankGif.gif'
	);
	// @ft-image
	this.endframeImage15 = this.validateImagePath( 
		myFT.instantAds.endframe_image_15 || 'instantAssets/ftBlankGif.gif'
	);
	// @ft-image
	this.endframeImage16 = this.validateImagePath( 
		myFT.instantAds.endframe_image_16 || 'instantAssets/ftBlankGif.gif'
	);
	// @ft-image
	this.endframeImage17 = this.validateImagePath( 
		myFT.instantAds.endframe_image_17 || 'instantAssets/ftBlankGif.gif'
	);
	// @ft-image
	this.endframeImage18 = this.validateImagePath( 
		myFT.instantAds.endframe_image_18 || 'instantAssets/ftBlankGif.gif'
	);
	// @ft-image
	this.endframeImage19 = this.validateImagePath( 
		myFT.instantAds.endframe_image_19 || 'instantAssets/ftBlankGif.gif'
	);
	// @ft-image
	this.endframeImage20 = this.validateImagePath( 
		myFT.instantAds.endframe_image_20 || 'instantAssets/ftBlankGif.gif'
	);




	// !!! important !!! - imageMap needs to be valid JSON:
	
	// ...add as many properties as needed




	/* -- IMAGE MAP Accessor ------------------------------------
	 *
	 *
	 */
	this.getImage = function( imageKey, adSize ) {
		var result;
		if( myFT.instantAds[ imageKey ] )
			result = myFT.instantAds[ imageKey ];
		else if( imageKey in this.imageMap ) {
			if( adSize in this.imageMap[ imageKey ] )
				result = this.imageMap[ imageKey ][ adSize ];
			else result = this.imageMap[ imageKey ][ 'default' ];
		}
		if( result ) return this.validateImagePath( result );
	}




}