/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	StaticGenerator

	Description:
		This class enables the creation of a schedule of dates and labels that can be consumed by an external application 
		designed to, in return, force the date of the ad, listen for screenshot-requests, and do so accordingly.
	
	Setting the Schedule:
		(start code)
			// set the schedule to a specific tune-in
			StaticGenerator.setSchedule(
				[DateUtils.parseToDate( '2015-11-15 16:00:00' )],
				DateUtils.TZ_EST
			);

		(end code)

		(start code)
			// set the schedule to all of the dates in a <DateStates> scenario.
			StaticGenerator.setSchedule(
				dateStates.getDates()
			);
		(end code)
	
	Notes:
		Some notes forthcoming.

	---------------------------------------------------------------------------------------------------------------------------------------------------------- */


var StaticGenerator = new function() {

	var self = this;

	self.schedule = [];

	/**	Method: setSchedule()

		This method will make a list of dates available to the Static Generator application which will then make 
		snapsnots of the ad's endframe on each of these dates. If only one date is submitted, Static Generator will
	 	assume the same intervals that <DateUtils>.selectMessagingForDate uses.
	 
	 	_dates					- list of dates that snapshots will be taken on
		_tzDesignation				- the timezone in which this schedule expresses its dates
		_dateLabels 				- list of custom labels, which will be used in the static filename. Length must match _dates.  */
	self.setSchedule = function( _dates, _tzDesignation, _dateLabels ) {
		trace( 'StaticGenerator.setStaticSchedule()' );
		if( !_tzDesignation ) _tzDesignation = DateUtils.TZ_LOCAL;
		if( !_dateLabels ) _dateLabels = [];
		if( _dates.length == 1 ) {
			trace( ' - single tune-in date: generating dates for messaging states...' );
			var _eventDayStart = new Date( _dates[0] );
			_eventDayStart.setTime( 
				_eventDayStart.getTime() - (
					( _dates[0].getHours() * DateUtils.MS_PER_HOUR ) + 
					( _dates[0].getMinutes() * DateUtils.MS_PER_MINUTE ) +
					( _dates[0].getSeconds() * 1000 ) -
					( DateUtils.newDayStartsAt * DateUtils.MS_PER_MINUTE )
				)
			);
			// week before
			var _weekBefore = new Date( _eventDayStart );
			_weekBefore.setTime( _weekBefore.getTime() - DateUtils.MS_PER_WEEK );
			// week of
			var _weekOf = new Date( _eventDayStart );
			_weekOf.setTime( _weekOf.getTime() - ( DateUtils.MS_PER_WEEK - ( DateUtils.MS_PER_DAY * 2 )));
			// day before
			var _dayBefore = new Date( _eventDayStart );
			_dayBefore.setTime( _dayBefore.getTime() - ( DateUtils.MS_PER_HOUR * 6 ));
			// day of
			var _dayOf = new Date( _eventDayStart );
			_dayOf.setTime( _dayOf.getTime() + ( DateUtils.MS_PER_HOUR * 6 ));
			// live
			var _live = new Date( _dates[0] );
			_live.setTime( _live.getTime() + ( DateUtils.MS_PER_MINUTE * 15 ));
			_dates = [
				_weekBefore, _weekOf, _dayBefore, _dayOf, _live
			];
			_dateLabels = ['week_before', 'week_of', 'day_before', 'day_of', 'live'];
		}
		else {
			trace( ' - date range' );
			var _generatedDateLabels = [];
			for( var i=0; i < _dates.length; i++ ) {
				var _year = TextUtils.pad( _dates[i].getFullYear(), 4 );
				var _month = TextUtils.pad( _dates[i].getMonth()+1, 2 );
				var _day = TextUtils.pad( _dates[i].getDate(), 2 );
				var _time = TextUtils.pad( _dates[i].getHours(), 2 ) + TextUtils.pad( _dates[i].getMinutes(), 2 );	
				_generatedDateLabels.push( _year + _month + _day + '_' + _time );
			}
			if( _dateLabels.length != _dates.length ) 
				_dateLabels = _generatedDateLabels;
			else {
				for( var j=0; j < _dateLabels.length; j++ ) {
					_dateLabels[j] = _dateLabels[j].replace( /\'|\"|\-|\s|\/|\\|/g, '_' );
				}
			}
		}
		var dateStrings = [];
		for( var i=0; i < _dates.length; i++ ) {
			dateStrings.push(
				DateUtils.toTimestamp( _dates[i] ) + ' ' + DateUtils.getDstAccurateGmtString( _dates[i], _tzDesignation )
			);
		}
		trace( '==DATES:', _dates );
		trace( '==DATE-STRINGS:', dateStrings );
		self.staticSchedule = {
			dates: dateStrings,
			dateObjects: _dates,
			dateLabels: _dateLabels,
			tzDesignation: _tzDesignation
		};

		self.dispatchSchedule();
	}




	/**	Method: dispatchSchedule()

		When the schedule is set, the staticSchedule object is dispatched with the information the external application needs
		to force date-states, listen for snapshot events, and save the resultant images. */
	self.dispatchSchedule = function() {
		trace( 'StaticGenerator.dispatchSchedule()' );
		if( typeof window.callPhantom === 'function' ) {
			window.callPhantom({
				event: 'staticSchedule',
				data: self.staticSchedule
			});
		}		
	}




	/**	Method: getStaticSchedule()

		Globally scoped so that an external application can discover the ad's messaging schedule and subsequently 
		force those date-states into the ad. */
	global.getStaticSchedule = function() {
		trace( 'StaticGenerator.getStaticSchedule()' );
		return StaticGenerator.staticSchedule;
	}





	/** Method: takeSnapshot()

		Dispatches an event to the external system managing static generation. */
	self.generateStatic = function() {
		trace( 'StaticGenerator.generateStatic()' );
		if( typeof window.callPhantom === 'function' ) {
			window.callPhantom({
				event: 'takeScreenshot',
				data: {}
			});
		}		
	}
}