var QuizQuestionVideo = ( function() {

	var self = this;
	self.container;
	self.ftVideo;
	self.playPause;

	self.showCallback;
	self.videoPlaying = false;;

	self.build = function ( args )
	{
		var id = args.id;
		var target = args.target || adData.elements.redAdContainer;
		var width = args.width || 520;
		var height = args.height || adParams.adHeight;
		var videoID = args.videoID || '60277/126184_imdb_quiz_Blindspot_520x250';
		self.callback = args.callback || nocallback;

		self.container = new UIComponent({
			id: id,
			target: target,
			css: {
				width: width,
				height: height,
				position: 'absolute',
				backgroundColor: adData.greyColor
			}
		});

		self.ftVideo = myFT.insertVideo({
			parent: self.container,
			video: videoID,
			//poster: "images/video_coverImage_970x250.jpg",
			height: 250,
			width: 520,
			controls:false,
			autoplay:false
		});

		self.ftVideo.on("ended", function() {
			hide();
		});


		Gesture.disable( self.container );





		self.skip = new VideoControlsBTN();
		self.skip.build({
			target: self.container,
			id: 'video_skip' + id,
			imageID: 'video_skip',
			width: 100,
			height: 20,
			callback: hide,
			copy: 'SKIP',
			fontSize: 13
		})





		var controlsSize = 21;

		var controlsContainer = new UIComponent({
			id: 'videoControlsContainer_' + id,
			target: self.container,
			css: {
				width: (controlsSize * 2) + 5,
				height: controlsSize,
				position: 'absolute'
			}
		});


		self.playPause = new VideoControlsBTN();
		self.playPause.build({
			target: controlsContainer,
			id: 'video_pause' + id,
			imageID: 'video_pause',
			width: controlsSize,
			height: controlsSize,
			callback: self.onPlayPause
		});

		self.mute = new VideoControlsBTN();
		self.mute.build({
			target: controlsContainer,
			id: 'video_audioOn' + id,
			imageID: 'video_audioOn',
			width: controlsSize,
			height: controlsSize,
			left: controlsSize + 5,
			callback: onSoundOnOff
		});


		


		var yOffset = -6;//-21;
		Align.moveX( Align.CENTER, controlsContainer );
		Align.moveY( Align.BOTTOM, controlsContainer, yOffset );
		// Align.move( Align.BOTTOM_LEFT, self.playPause.container, 5, yOffset );
		// Align.move( Align.BOTTOM_LEFT, self.mute.container, controlsSize + (5 * 2), yOffset );
		Align.move( Align.TOP_RIGHT, self.skip.container, -8, 17 );


		Styles.hide( self.container );

	}


	self.show = function()
	{
		trace('QuizQuestionVideo.show()');
		adData.curVideoPlayer = self;
		Styles.show( self.container );
		TweenLite.fromTo( self.container, 0.25, { opacity: 0 }, { opacity: 1, ease:Quad.easeInOut } );
		
		(adData.isMobile)? self.videoPlaying =  false: self.videoPlaying = true;
		self.mute.updateIcon( adData.videoMuted ? 'video_audioOff' : 'video_audioOn' );
		self.ftVideo.video.currentTime = 0;
		(adData.isMobile)?self.ftVideo.video.pause():self.ftVideo.video.play();
		self.ftVideo.video.muted = adData.videoMuted;
		(adData.isMobile)?self.playPause.updateIcon( 'video_play' ):self.playPause.updateIcon( 'video_pause' );
		self.playPause.show();
		self.skip.show();
		self.mute.show();
	}

	function onSoundOnOff()
	{
		if ( adData.videoMuted )
		{
			adData.videoMuted = false;
			self.ftVideo.video.muted = false;
			self.mute.updateIcon( 'video_audioOn' );
		}
		else
		{
			adData.videoMuted = true;
			self.ftVideo.video.muted = true;
			self.mute.updateIcon( 'video_audioOff' );
		}
	}

	self.onPlayPause = function(forcePause)
	{
		trace('QuizQuestionVideo.onPlayPause()');
		trace('		self.videoPlaying:' + self.videoPlaying);
		self.videoPlaying = forcePause ? true : self.videoPlaying;
		if ( self.videoPlaying )
		{
			self.videoPlaying = false;
			self.ftVideo.video.pause();
			self.playPause.updateIcon( 'video_play' );
		}else{
			self.videoPlaying = true;
			self.ftVideo.video.play();
			self.playPause.updateIcon( 'video_pause' );
		}
	}

	function hide()
	{
		adData.curVideoPlayer = null;
		self.videoPlaying = false;
		self.ftVideo.video.pause();
		// self.playPause.updateIcon( 'video_pause' );

		self.playPause.unregisterEvents();
		self.skip.unregisterEvents();
		self.mute.unregisterEvents();

		TweenLite.delayedCall( 1, function() {
			Styles.hide( self.container );
		});

		self.callback();
	}

	function nocallback()
	{

	}


	return self;
});