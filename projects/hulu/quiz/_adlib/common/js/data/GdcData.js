/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	GdcData

	Description:
		Central data container for processing data provided by the GDC platform.

		It is instantiated in AdData.

		Direct calls to this class to retrieve its data are possible, however best practice
		would be to use this class to create variables in AdData.  This allows for easy porting
		of code to other enviroments because all variable references throughout the markup code
		will be tied to AdData, as they would be in any other ad.

		The init function, called automatically within AdData, creates an object containing testing data
		corresponding to the campaign's GDC spreadsheet.  This object is used while developing locally,
		but is replaced with the actual region specific data when live.

		The code in the init function is copied and pasted from step 4 in the Dynamic Content tab in DC
		for the campaign. DO NOT paste over this line in the init function:

		Enabler.setDevDynamicContent( this.devDynamicContent );

		After pasting in the step 4 code, make sure to add "this." in front of each line, like:

		this.devDynamicContent.Netflix__Special_Correspondents_Global__033016_3 = ...

		Create a getter for each line in the step 4 code, excluding _id, ID, and is_default.

		Please take notice of the slight difference between the getter code and the code within
		the init function.  Each getter retrieves data via the actual GDC object, rather than the dev obect:

		In the init function:

		this.devDynamicContent.Netflix__Special_Correspondents_Global__033016_3[0]

		In the getters:

		dynamicContent.Netflix__Special_Correspondents_Global__033016_3[ 0 ]

	(start code)

		// setting a var from within adData, (preferred method):
		this.myVar = this.gdc.oneOfTheGdcGetters();

		// direct call to data in this class from anywhere in the markup code or prepareCommon:
		adData.gdc.oneOfTheGdcGetters();

	(end code)
		
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */
function GdcData()
{
	this.init = function()
	{
		this.devDynamicContent = {};
		this.prepareGdcData();
	}

	this.prepareGdcData = function()
	{
		Enabler.setProfileId( 1074970 );

		this.devDynamicContent.Netflix__Special_Correspondents_Global__033016_3= [{}];
		this.devDynamicContent.Netflix__Special_Correspondents_Global__033016_3[0]._id = 0;
		this.devDynamicContent.Netflix__Special_Correspondents_Global__033016_3[0].ID = 1;
		this.devDynamicContent.Netflix__Special_Correspondents_Global__033016_3[0].is_default = true;
		this.devDynamicContent.Netflix__Special_Correspondents_Global__033016_3[0].reporting_label = "United States";
		this.devDynamicContent.Netflix__Special_Correspondents_Global__033016_3[0].titleTreatment = false;
		this.devDynamicContent.Netflix__Special_Correspondents_Global__033016_3[0].netflixTagTxt = "A Netflix Original Film";
		this.devDynamicContent.Netflix__Special_Correspondents_Global__033016_3[0].tuneIn = "Now Streaming";
		this.devDynamicContent.Netflix__Special_Correspondents_Global__033016_3[0].ctaWatchNow = "Watch Now";
		this.devDynamicContent.Netflix__Special_Correspondents_Global__033016_3[0].trailer = "Trailer";
		this.devDynamicContent.Netflix__Special_Correspondents_Global__033016_3[0].tagline = "Fake news. Real disaster.";
		this.devDynamicContent.Netflix__Special_Correspondents_Global__033016_3[0].rating = false;
		this.devDynamicContent.Netflix__Special_Correspondents_Global__033016_3[0].nonLatinFont = false;
		this.devDynamicContent.Netflix__Special_Correspondents_Global__033016_3[0].trailerID = "3kKTFAEQgSY";
		this.devDynamicContent.Netflix__Special_Correspondents_Global__033016_3[0].introVideo_300x250 = {"300x250_intro_video_united_states.fbv.js":{"Type":"file","Url":"https://s0.2mdn.net/ads/richmedia/studio/42317321/29443470_20160331153002157_300x250_intro_video_united_states.fbv.js"}};
		this.devDynamicContent.Netflix__Special_Correspondents_Global__033016_3[0].introVideo_300x600 = {"300x600_intro_video_united_states.mp4":{"Type":"video","Progressive_Url":"https://gcdn.2mdn.net/videoplayback/id/9872c12e272504f3/itag/15/source/doubleclick/ratebypass/yes/mime/video%2Fmp4/acao/yes/ip/0.0.0.0/ipbits/0/expire/3603985377/sparams/id,itag,source,ratebypass,mime,acao,ip,ipbits,expire/signature/57CC5EF11C90E9B131318DF92B8419AF0AA3D3E6.1B01F0226C1332D0A831E3E056122723F441DDF2/key/ck2/file/file.mp4","Stream_Url":""},"300x600_intro_video_united_states.fbv.js":{"Type":"file","Url":"https://s0.2mdn.net/ads/richmedia/studio/42334292/29443470_20160401103231660_300x600_intro_video_united_states.fbv.js"}};
		this.devDynamicContent.Netflix__Special_Correspondents_Global__033016_3[0].introVideo_728x90 = {"728x90_intro_video_united_states.fbv.js":{"Type":"file","Url":"https://s0.2mdn.net/ads/richmedia/studio/42317322/29443470_20160331153439329_728x90_intro_video_united_states.fbv.js"}};
		this.devDynamicContent.Netflix__Special_Correspondents_Global__033016_3[0].introVideo_970x250 = {"970x250_intro_video_united_states.mp4":{"Type":"video","Progressive_Url":"https://gcdn.2mdn.net/videoplayback/id/d06a86682c928a47/itag/15/source/doubleclick/ratebypass/yes/mime/video%2Fmp4/acao/yes/ip/0.0.0.0/ipbits/0/expire/3603985377/sparams/id,itag,source,ratebypass,mime,acao,ip,ipbits,expire/signature/994AFE48597EE5459D5927F600F59B05AC251CDB.3C4F1B1C327D6483B49326A532E2021067ECE4DF/key/ck2/file/file.mp4","Stream_Url":""},"970x250_intro_video_united_states.fbv.js":{"Type":"file","Url":"https://s0.2mdn.net/ads/richmedia/studio/42310047/29443470_20160331112837576_970x250_intro_video_united_states.fbv.js"}};
		this.devDynamicContent.Netflix__Special_Correspondents_Global__033016_3[0].introVideo_160x600 = {"160x600_intro_video_united_states.fbv.js":{"Type":"file","Url":"https://s0.2mdn.net/ads/richmedia/studio/42336219/29443470_20160401103451147_160x600_intro_video_united_states.fbv.js"}};
		this.devDynamicContent.Netflix__Special_Correspondents_Global__033016_3[0].introVideo_320x50 = {"320x50_intro_video_united_states.fbv.js":{"Type":"file","Url":"https://s0.2mdn.net/ads/richmedia/studio/42337022/320x50_intro_video_united_states.fbv.js"}};

		Enabler.setDevDynamicContent( this.devDynamicContent );
	}

	this.region = function()
	{
		return dynamicContent.Netflix__Special_Correspondents_Global__033016_3[ 0 ].reporting_label.toLowerCase().replace( ' ', '_' );
	}

	this.useTranslatedTitleTreatment = function()
	{
		return dynamicContent.Netflix__Special_Correspondents_Global__033016_3[ 0 ].titleTreatment;
	}

	this.showRatingBug = function()
	{
		return dynamicContent.Netflix__Special_Correspondents_Global__033016_3[ 0 ].rating;
	}

	this.nonLatinFont = function()
	{
		return dynamicContent.Netflix__Special_Correspondents_Global__033016_3[ 0 ].nonLatinFont;
	}

	this.netflixTagline = function()
	{
		return dynamicContent.Netflix__Special_Correspondents_Global__033016_3[ 0 ].netflixTagTxt.toUpperCase();
	}

	this.movieTagline = function()
	{
		return dynamicContent.Netflix__Special_Correspondents_Global__033016_3[ 0 ].tagline;
	}

	this.footerMessage = function()
	{
		return dynamicContent.Netflix__Special_Correspondents_Global__033016_3[ 0 ].tuneIn;
	}

	this.footerButtonText_2 = function()
	{
		return dynamicContent.Netflix__Special_Correspondents_Global__033016_3[ 0 ].ctaWatchNow.toUpperCase();
	}

	this.replayButtonText = function()
	{
		return dynamicContent.Netflix__Special_Correspondents_Global__033016_3[ 0 ].trailer.toUpperCase();
	}

	this.trailerID = function()
	{
		return dynamicContent.Netflix__Special_Correspondents_Global__033016_3[ 0 ].trailerID;
	}

	this.introVideo = function()
	{	
		var videoUrl = undefined;
		var videoObj = dynamicContent.Netflix__Special_Correspondents_Global__033016_3[ 0 ][ 'introVideo_' + adParams.adWidth + 'x' + adParams.adHeight ];
		var useVideoIntro = (adParams.adWidth === 970 || (adParams.adWidth === 300 && adParams.adHeight === 600)) && Device.type === 'desktop';

		for( var prop in videoObj )
		{
			if( useVideoIntro && videoObj[ prop ].Type === 'video' )
			{
				videoUrl = videoObj[ prop ].Progressive_Url;
				break;
			}
			else if( !useVideoIntro && videoObj[ prop ].Type === 'file' )
			{
				//if( adParams.environmentId === 'staging' )
				videoUrl = videoObj[ prop ].Url;
				//else videoUrl = videoObj[ prop ].Url.replace( '.js', '' );
				break;
			}
		}

		trace( 'intro video url: ' + videoUrl );

		return videoUrl;
	}
}