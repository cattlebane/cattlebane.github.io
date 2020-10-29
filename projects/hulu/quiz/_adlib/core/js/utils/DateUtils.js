/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	DateUtils

	Description:
		This class is the HTML equivilent of the flash classes DateSettings and DateUtils. The functionality and usage should be the same.
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */
var DateUtils = new function DateUtils() {

	var self = this;

	/** Method: initDateUtils()
			This function is meant to be called at the very beginning of the ad's lifespan. Automatically, it sets initial time which 
			is used to keep an internal clock that can is used to reference the lifespan of the ad, show countdowns, changes in live states, etc.
			Additional settings on _dateSettings include:

			tzDesignation 		- optionally overrides the system date with a hard-coded one.
			language 			- optionally sets the default language to be used for date-messaging
			newDayStartsAt		- optionally overrides when a "new day" is to begin other than midnight, in minutes
			eventDuration		- optionally overrides event duration, in minutes
			tonightStartsAt	- optionally overrides when "tonight" starts, in minutes */
	self.initDateUtils = function( _dateSettings ) {
		self.tzDesignation = _dateSettings.tzDesignation || self.TZ_LOCAL;
		self.initDate = self.getNow( self.tzDesignation );

		self.language = _dateSettings.language || 'english';

		// force date to an external setting - FORMAT NEEDS TO BE A UNIX TIMESTAMP, like: &externalDate=YYYY-MM-DD HH:MM:SS GMT-####
		var externalDate = NetUtils.getQueryParameterBy( 'externalDate' );
		if( externalDate ) {
			self.dateMode = self.DATE_EXTERNAL;
			self.setCurrentDate.apply( self, 
				self.parseUnixTimestamp( externalDate )
			);
		}
		// force date to an internal setting
		else if( _dateSettings.dateOverride && ( adParams.environmentId == 'staging' || adParams.environmentId == 'debug' )) {
			self.dateMode = self.DATE_INTERNAL;
			self.setCurrentDate.apply( self,
				_dateSettings.dateOverride.call()
			);
		}
		// use system date
		else {
			self.dateMode = self.DATE_SYSTEM;
		}
		self.newDayStartsAt = _dateSettings.newDayStartsAt || 0;
		self.eventDuration = _dateSettings.eventDuration || 120;
		self.tonightStartsAt = _dateSettings.tonightStartsAt || 1050;
	}

	/** Variable: language
			This controls what language date-messaging will use. */
	self.language;


	/** Variable: tzDesignation
			This sets a default timezone assumption for the ad...well, actually just for the json parse, at this time. I would like to 
			go through this class and change all defaults from TZ_LOCAL to this.tzDesignation.  */
	self.tzDesignation;


	/**	Variable: newDayStartsAt
			The number of minutes past midnight that <DateUtils> will consider to be a new day. Default is 0 minutes( midnight ). */
	self.newDayStartsAt;


	/**	Variable: eventDuration
			The number of minutes an event is presumed to be "Live Now". Default is 120 minutes( 2 hours ). */
	self.eventDuration;


	/** Variable: tonightStartsAt
			The number of minutes past midnight that <DateUtils> will message "tonight" instead of "today". 
			Default is 1050 minutes( 17.5 hours = 5:30pm ). */
	self.tonightStartsAt;











	/* -- CURRENT DATE LOGIC -------------------------------------------------------------------------------------------------------------------------------------
	 *
	 *
	 *
	 */
	self.DATE_INTERNAL = 'INTERNAL-DATE';
	self.DATE_EXTERNAL = 'EXTERNAL-DATE';
	self.DATE_SYSTEM = 'SYSTEM-DATE';
		
	self.dateMode = self.DATE_SYSTEM;
	self.initDate; // private
	self.internalDate; // private


	/** Method: getCurrentDate()
			Returns the current date. Current date is determined by the logic in initDateUtils(). The object returned from
			this function has two properties: 
		
		1) _date		- a date-time-string in the format of YYYY-MM-DD HH:MM:SS
		2) _tzDesignation	- one of the <DateUtils> TZ objects, with properties "label" and "gmtOffset" */
	self.getCurrentDate = function() {
		var currentDate = {
			date: self.parseToDate( self.toTimestamp( new Date()), self.TZ_LOCAL ),
			tzDesignation: self.TZ_LOCAL
		};
		if( self.internalDate ) {
			currentDate = {
				date: new Date( self.internalDate.date ),
				tzDesignation: self.internalDate.tzDesignation
			};
			currentDate.date.setMilliseconds( currentDate.date.getMilliseconds() + ( new Date().getTime() - self.initDate.getTime() ));
		}
		return currentDate;
	}

	/** Method: setCurrentDate()
			Used to override system date with some other date.

			_dateOrTimestamp	- a date or a date-time-string in the format of YYYY-MM-DD HH:MM:SS
			_tzDesignation		- optional, one of the <DateUtils> TZ objects, with properties "label" and "gmtOffset". Defaults to <DateUtils>.TZ_LOCAL */
	self.setCurrentDate = function( _dateOrTimestamp, _tzDesignation ) {
		var tzDesignation = _tzDesignation || self.TZ_LOCAL;
		self.internalDate = {
			date: _dateOrTimestamp instanceof Date ? _dateOrTimestamp : self.parseToDate( _dateOrTimestamp ),
			tzDesignation: tzDesignation
		};
		trace( '-- DATE SETTINGS -------------------------------------------------------------------------------------------' );
		trace( '' );
		trace( '' );
		trace( '    DATE-MODE: ' + self.dateMode );
		trace( '     Time for this unit is now assumed to be: ' );
		trace( '      ' + self.getCurrentDate().date.toString().replace( 
				/GMT(\+|\-)[0-9]{4}.*$/, 
				self.getDstAccurateGmtString( self.getCurrentDate().date, self.getCurrentDate().tzDesignation )
		));
		trace( '' );
		trace( '' );
		trace( '-------------------------------------------------------------------------------------------------------------' );
	}


	self.parseUnixTimestamp = function( _unixTimestamp ) {
		var dateParts = _unixTimestamp.split( 'GMT' );
		var date = self.parseToDate( dateParts[0] );
		var tzDesignation;
		// build the timezone portion of the date
		var gmtOffset = dateParts[1];
		if( gmtOffset.toUpperCase() == '-LOCAL' ) 
			tzDesignation = self.TZ_LOCAL;
		else {
			var gmtPlusMinus = gmtOffset.substr( 0, 1 ) == '-' ? -1 : 1;
			var hoursOffset = gmtPlusMinus * ( parseInt( gmtOffset.substr( 1, 2 ), 10 )) - self.getDstOffsetFor( date ); // correct offset for dst
			var standardGmtOffset = TextUtils.pad( hoursOffset, 2 ) + gmtOffset.substr( 3, 2 );
			tzDesignation = self.getTzDesignationByFor( 'gmtOffset', 'GMT' + standardGmtOffset );
		}
		return [
			date,
			tzDesignation
		];
	}
	self.getDstAccurateGmtString = function( _date, _tzDesignation ) {
		if( _tzDesignation == self.TZ_LOCAL )
			return self.TZ_LOCAL.gmtOffset;
		var gmtOffset = _tzDesignation.gmtOffset.split( 'GMT' )[1]
		var gmtPlusMinus = gmtOffset.substr( 0, 1 ) == '-' ? -1 : 1;
		var hoursOffset = gmtPlusMinus * ( parseInt( gmtOffset.substr( 1, 2 ), 10 )) + self.getDstOffsetFor( _date ); // correct offset for dst
		return 'GMT' + TextUtils.pad( hoursOffset, 2 ) + gmtOffset.substr( 3, 2 );
	}













	/* -- TIMEZONE LOGIC -------------------------------------------------------------------------------------------------------------------------------------
	 *
	 *
	 *
	 */
	/**	Constant: TZ_LOCAL
			Timezone constant for the client's machine. */
	self.TZ_LOCAL = { label: 'local', gmtOffset: 'GMT-LOCAL' };

	/**	Constant: TZ_UTC
			Timezone constant for Greenwich Mean Time. */
	self.TZ_UTC   = { label: 'utc', gmtOffset: 'GMT-0000' };

	/**	Constant: TZ_ART
			Timezone constant for Argentina Time. */
	self.TZ_ART   = { label: 'art', gmtOffset: 'GMT-0300' };

	/**	Constant: TZ_EST
			Timezone constant for Eastern Time, Columbia Time. */
	self.TZ_EST   = { label: 'est', gmtOffset: 'GMT-0500' };

	/**	Constant: TZ_CST
			Timezone constant for Central Time, Mexico Time. */
	self.TZ_CST   = { label: 'cst', gmtOffset: 'GMT-0600' };

	/**	Constant: TZ_MST
			Timezone constant for Mountain Time. */
	self.TZ_MST   = { label: 'mst', gmtOffset: 'GMT-0700' };

	/**	Constant: TZ_PST
			Timezone constant for Pacific Time. */
	self.TZ_PST   = { label: 'pst', gmtOffset: 'GMT-0800' };

	/**	Constant: TZ_AEST
			Timezone constant for Australian Eastern Time. */
	self.TZ_AEST   = { label: 'aest', gmtOffset: 'GMT+1000' };

	self.getTzConstants = function() {
		return [ self.TZ_LOCAL, self.TZ_UTC, self.TZ_ART, self.TZ_EST, self.TZ_CST, self.TZ_MST, self.TZ_PST, self.TZ_AEST ];
	}

	self.getTzDesignationByFor = function( key, argument ) {
		for( var i in self.getTzConstants()) {
			if( self.getTzConstants()[i][key] == argument )
				return self.getTzConstants()[i];
		}
		return null;
	}
	

	/** Method: getOffsetForIn()
			Returns the offset to the specified timezone designation in either hours or minutes.
	
		tzDesignation			- on the TZ constants specifying the timezone in question
		hoursOrMinutes			- how you would like your offset expressed, in either 'hours' (default) or 'minutes'. */
	self.getOffsetForIn = function( tzDesignation, hoursOrMinutes ) {
		if( !hoursOrMinutes )
			hoursOrMinutes = 'hours';
		if( tzDesignation == self.TZ_LOCAL ) {
			var local = new Date();
			return hoursOrMinutes == 'hours' ? local.timezoneOffset / 60 : local.timezoneOffset;
		}
		else {
			var minutesOffset = -( parseInt( tzDesignation.gmtOffset.substr( 3, 3 ), 10 ) * 60 ) +
				parseInt( tzDesignation.gmtOffset.substr( 6, 2 ), 10 );
			return hoursOrMinutes == 'hours' ? minutesOffset / 60 : minutesOffset;
		}
	}
	
	
	/** Method: getLocalTzDesignation()
			Returns a tzConstant object representing the timezone that the unit is currently running in. */
	self.getLocalTzDesignation = function() {
		var local = new Date();
		var timezoneOffset = local.timezoneOffset / 60;
		if( self.dateMode != self.DATE_SYSTEM ) {
			var currentDate = self.getCurrentDate();
			local = currentDate.date;
			timezoneOffset = self.getOffsetForIn( currentDate.tzDesignation, 'hours' );
		}
		var dstOffset = getDstOffsetFor( local );
		var numberOffset = timezoneOffset + dstOffset;

		var hoursOffset = Math.floor( numberOffset );
		var userMinutesOffset = ( hoursOffset * 60 ) + (( numberOffset - hoursOffset ) * 60 );
		for( var i in self.getTzConstants()) {
			if( self.getTzConstants()[i] != self.TZ_LOCAL ) {
				var tzOffset = self.getOffsetForIn( self.getTzConstants()[i], 'minutes' );
				if( userMinutesOffset == self.getTzConstants()[i] ) 
					return self.getTzConstants()[i];
			}
		}
		return null;
	}













	/* -- DATE MANIPULATION -------------------------------------------------------------------------------------------------------------------------------------
	 *
	 *
	 *
	 */

	/** Constant: MS_PER_MINUTE
			The number of milliseconds in a minute */
	self.MS_PER_MINUTE  = 1000 * 60;

	/** Constant: MS_PER_HOUR
			The number of milliseconds in a hour */
	self.MS_PER_HOUR    = self.MS_PER_MINUTE * 60;

	/** Constant: MS_PER_DAY
			The number of milliseconds in a day */
	self.MS_PER_DAY     = self.MS_PER_HOUR * 24;

	/** Constant: MS_PER_WEEK
			The number of milliseconds in a week */
	self.MS_PER_WEEK    = self.MS_PER_DAY * 7;



	/** Method: parseToDate()
			Parse a string into a Flash Date object.
		
			Please note, all dates in Flash or JavaScript are assumed to be in the local timezone. For example, if you have 
			a time in TZ_CST, it will still toString() with a UTC-offset that matches the local timezone, for me, TZ_PST.
			That means for time comparison, the "time" property of your non-local date will be wrong.  If you need to 
			figure out if a date's relationship to NOW, you will need to use the methond DateUtils.getNow() and submit
			the equivilent timezone to which you wish to compare.
	
		_date				- expected to be a date-string in the format of YYYY-MM-DD HH:MM:SS 
		_tzDesignation			- this is deprecated...timezone is ASSUMED - you must remember what the timezone of this date 
								is supposed to be so that you can compare apples-to-apples when you make a request to 
								<DateUtils>.getNow( [!!!matching timezone!!!]) */
	self.parseToDate = function( _date, _tzDesignation ) {
		var parsedDate = new Date( 
			parseInt( _date.substr( 0, 4 ), 10 ),
			parseInt( _date.substr( 5, 2 ), 10 ) - 1,
			parseInt( _date.substr( 8, 2 ), 10 ),
			parseInt( _date.substr( 11, 2 ), 10 ),
			parseInt( _date.substr( 14, 2 ), 10 ),
			parseInt( _date.substr( 17, 2 ), 10 )
		);
		return parsedDate;
	}


	/** Method: getNow()
			Returns the current date/time as a new Date object. 

			If you need a "now" Date Object for a timezone other than the user's local time, then you should pass one of the TZ_CONSTANTS
			as an argument to the function. This will offset the Date's time from the user's timezone to the requested one. 

			Programmers who are accustomed to working with date/time will find this approach very upsetting, wanting naturally to use 
			UTC and timestamps to compare time. The problem is that everyone working on these units, from the clients to creatives, assumes 
			a timezone when describing dates/times. Even AdManager v1.0 passes canonical time as Eastern Time( EST/EDT )strings.

			So what we end up with are a lot of hard-coded date/time _strings_, being served in many different timezones, and a Javascript interpretter 
			that will assume the local timezone when parsing these hard-coded strings. Furthermore, we have clients that want to express these
			times in specific timezones, regardless of the user's timezone.

			That is why we use DateUtils and the TZ_CONSTANTS.

			(start code)
				// parsing a time-string in Eastern Time to a Date
				var easternDate = DateUtils.parseToDate( '2016-01-10 15:00:00' ); // 3pm Eastern, even though the Date will specify the GMT-offset of the user's timezone

				// creating a "now" Date, also in the context of Eastern Time
				var easternNowDate = DateUtils.getNow( DateUtils.TZ_EST ); // actual HH:MM will be offset from the user's timezone to the requested timezone

				// comparing the dates
				if( easternDate.getTime() > easternNowDate.getTime() ) {
					trace( 'easternDate has not yet happened' );
				}
				else {
					trace( 'easternDate is passed' );
				}
			(end code)
		
		_tzDesignation		- a TZ_CONSTANT representing the context of this date. If comparing to another Date, the tzDesignation of the 
							two dates should match. */
	self.getNow = function( _tzDesignation ) {
		_tzDesignation = _tzDesignation ? _tzDesignation : self.TZ_LOCAL;
		var currentDate = self.getCurrentDate();
		var today = new Date( currentDate.date );

		var timeDifference = self.minutesFromUtcTo( currentDate.tzDesignation, today ) - self.minutesFromUtcTo( _tzDesignation, today );

		today.setMinutes( today.getMinutes() + timeDifference );
		return today;
	}



	/** Method: minutesFromUtcTo()
			Gets the number of minutes difference between tzDesignation and UTC. Basically just a dictionary, with
			timezones to be added as needed.
		
		tzDesignation		- any one of the supported timezone( TZ )constants */
	self.minutesFromUtcTo = function( tzDesignation, context ) {
		if( !context ) context = new Date();
		var dstOffset = self.getDstOffsetFor( context );
		var minutesToUtc;
		switch( tzDesignation.label ) {
			case self.TZ_UTC.label:
				minutesToUtc = 0
				break;
			case self.TZ_ART.label:
			case self.TZ_EST.label:
			case self.TZ_CST.label:
			case self.TZ_MST.label:
			case self.TZ_PST.label:
				minutesToUtc = ( self.getOffsetForIn( tzDesignation ) - dstOffset ) * 60;
				break;
			case self.TZ_AEST.label:
				minutesToUtc = ( self.getOffsetForIn( tzDesignation ) - ( 1 - dstOffset )) * 60;
				break;
			case self.TZ_LOCAL.label:
				minutesToUtc = context.getTimezoneOffset();
				break;
		}
		return minutesToUtc;
	}


	/** Method: getDstOffsetFor()
			Gets the hour offset caused by Daylight Savings.

		date - the date to check for dst */
	self.getDstOffsetFor = function( date ) {
		 var winter = new Date( 2011, 01, 01 );
		 var summer = new Date( 2011, 07, 01 );
	
		 var winterOffset = winter.getTimezoneOffset();
		 var summerOffset = summer.getTimezoneOffset();
		 var dateOffset = date.getTimezoneOffset();
	
		 if(( dateOffset == summerOffset ) && ( dateOffset != winterOffset )) return 1;
		 else return 0;
	}










	/* -- DATE FORMATTING -------------------------------------------------------------------------------------------------------------------------------------
	 *
	 *
	 *
	 */
	/** Method: toDateTime()
			Returns a string in the format "MM/DD/YYYY HH:MMa/p" 
		
		date - the date to convert to a string */
	self.toDateTime = function( date ) {
		return self.toDate( date ) + " " + self.toTime( date );
	}
	

	/** Method: toDate()
			Returns a string in the format "MM/DD/YYYY" 
	
		date - the date to convert to a string */
	self.toDate = function( date ) {
		return self.toSimpleDate( date ) + "/" + date.getFullYear();
	}
	

	/** Method: toSimpleDate()
			Returns a string in the format "MM/DD" 
	
		date - the date to convert to a string */
	self.toSimpleDate = function( date ) {
		return ( date.getMonth() + 1 ) + "/" + date.getDate();
	}
	

	/** Method: toTime()
			Returns a string in the format "HH:MM AM/PM" 
	
		date - the date to convert to a string */
	self.toTime = function( date ) {
		var time = self.toSimpleTime( date ) + ' ' + self.toMeridiem( date );
		return time;
	}
	

	/** Method: toSimpleTime()
			Returns a string in the format "HH:MM" 
	
		date - the date to convert to a string */
	self.toSimpleTime = function( date ) {
		var time = ( date.getHours() > 12 ? date.getHours() - 12 : date.getHours() == 0 ? 12 : date.getHours() ) + ":" + TextUtils.pad( date.getMinutes(), 2 );
		return time;
	}
	

	/** Method: toMeridiem()
			Returns the meridiem "AM/PM"
	
		date			- the date to be converted. */
	self.toMeridiem = function( date ) {
		return date.getHours() >= 12 ? self.getLabels().PM : self.getLabels().AM;
	}





	/** Method: toTimestamp()
			Converts a date object to a timestamp in the format of YYYY-MM-DD HH:MM:SS 
	
		date			- the date to be converted. */
	self.toTimestamp = function( date ) {
		var month = TextUtils.pad( date.getMonth() + 1, 2 );
		var day = TextUtils.pad( date.getDate(), 2 );
		var year = TextUtils.pad( date.getFullYear(), 4 );
		var hours = TextUtils.pad( date.getHours(), 2 );
		var mins = TextUtils.pad( date.getMinutes(), 2 );
		var secs = TextUtils.pad( date.getSeconds(), 2 );

		return year + '-' + month + '-' + day + ' ' + hours + ':' + mins + ':' + secs;
	}


	/** Method: toDay()
			Converts a date object to a string representing the day, like "Tuesday" or "Saturday". 
	
		date				- the date to be converted. 
		abbreviate			- return shortened versions of the days, like "Tues" or "Sat". */
	self.toDay = function( date, abbreviate ) {
		var _days = abbreviate ? self.getLabels().WEEKDAYS_ABRV : self.getLabels().WEEKDAYS_FULL;
		return _days[ date.getDay() ];
	}


	/** Method: toMonthAndDay()
			Converts a date object to a string representing the month, like "January" or "August". 
	
		date				- the date to be converted. 
		abbreviate			- return shortened versions of the months, like "Jan" or "Aug". */	
	self.toMonthAndDay = function( date, abbreviate, returnMonthsAsNumbers, padMonth ) {
		var _months = abbreviate ? self.getLabels().MONTHS_ABRV : self.getLabels().MONTHS_FULL;

		if( returnMonthsAsNumbers ) return self.getMonthAsNumber( date, padMonth ) + '/' + date.getDate();
		return _months[ date.getMonth() ] + ' ' + date.getDate();
	}


	/** Method: toDayAndMonth()
			Converts a date object to a string representing the month, like "January" or "August". 
	
		date				- the date to be converted. 
		abbreviate			- return shortened versions of the months, like "Jan" or "Aug". */	
	self.toDayAndMonth = function( date, abbreviate, returnMonthsAsNumbers, padMonth, useNumericSuffixes ) {
		var _months = abbreviate ? self.getLabels().MONTHS_ABRV : self.getLabels().MONTHS_FULL;
		if( returnMonthsAsNumbers ) 
			return date.getDate() + '-' + self.getMonthAsNumber( date, padMonth );
		else {
			var numericSuffix = useNumericSuffixes ? self.getNumericSuffixFor( date.getDate()) : ''
			return date.getDate() + numericSuffix + ' ' + self.getLabels().OF + ' ' + _months[ date.getMonth() ];
		}
	}


	/** Method: getMonthAsNumber()
			Converts a date object to a string representing the month, like "1" or "2". 
	
		date				- the date to be converted. 
		pad					- boolean to add padding, like "01" or "02". */	
	self.getMonthAsNumber = function( date, pad ) {
		var monthNumber = date.getMonth() + 1;
		return pad ? TextUtils.pad( monthNumber, 2 ) : monthNumber;
	}



	/** Adds the correct numeric suffix to a number. 
	
		$_value			- the number to be converted to an english numeral. */
	self.getNumericSuffixFor = function( value ) {
		var value = value.toString();
		var lastNumber = value.slice( value.length-1 );
		var lastTwoNumbers = value.length >= 2 ? value.slice( value.length-2 ) : value;
		switch( lastNumber ) {
			case '1': 
				return ( lastTwoNumbers != '11' ) ? value + self.getLabels().ST : value + self.getLabels().TH; 
			case '2': 
				return ( lastTwoNumbers != '12' ) ? value + self.getLabels().ND : value + self.getLabels().TH; 
			case '3': 
				return ( lastTwoNumbers != '13' ) ? value + self.getLabels().RD : value + self.getLabels().TH; 
			default: 
				return value + self.getLabels().TH; 
		}
	}

	/**	Method: getTimeDifference()
			Returns the number of Object = { days:hours:minutes:seconds } difference between two Dates. 
			If $_startTime exceeds $_endTime, then the function will return null. 
	
		startTime			- initial date
		endTime				- second date */
	self.getTimeDifference = function( _startTime, _endTime ) {
		var diff = _endTime.getTime() / 1000 - _startTime.getTime() / 1000;
		if( diff < 0 ) return null;
		return {
			days: diff / ( 24 * 60 * 60 ),
			hours: diff / ( 60 * 60 ) % 24,
			minutes: diff / ( 60 ) % 60,
			seconds: diff % 60
		};
	}


	/** Method: selectMessagingForDate()
			Returns a string that represents messaging for the date relative to the context date. For example
			"Live Now", "Tomorrow", "Tonight", "Today", "Wednesday", "September 1"
	
		date 				- the date of an upcoming event
		tzDesignation		- the timezone in which relative messaging should be derived. The default is the local timezone. 
								If your times are relative to a specific timezone, you must specify that timezone constant.  
								For example, for Easter Standard Time: DateUtils.TZ_EST
		abbreviateMonths	- abbreviate will cause month-names to be abbreviated, default is false
		abbreviateDays		- abbreviate will cause day-names to be abbreviated, default is false 
		monthsAsNumbers 	- to return the month as their numerical entities
		padMonth			- whether to pad the month in their numerical format */
	self.selectMessagingForDate = function( date, tzDesignation, abbreviateMonths, abbreviateDays, monthsAsNumbers, padMonth ) {
		tzDesignation = tzDesignation ? tzDesignation : self.TZ_LOCAL;
		abbreviateMonths = abbreviateMonths ? abbreviateMonths : false;
		abbreviateDays = abbreviateDays ? abbreviateDays : false;
		var _contextRequested = self.getNow( tzDesignation );
		var _contextLocal = self.getNow( self.TZ_LOCAL );
		var _eventPast = new Date( date );
		_eventPast.time += self.eventDuration * self.MS_PER_MINUTE
		switch( true ) {
			case self.isPast( _eventPast, _contextRequested ):
				return self.getLabels().PAST;
			case self.isLiveNow( date, _contextRequested ):
				return self.getLabels().NOW;
			case self.isTomorrow( date, _contextLocal ):
				return self.getLabels().TOMORROW;
			case self.isTonight( date, _contextLocal ):
				return self.getLabels().TONIGHT;
			case self.isToday( date, _contextLocal ):
				return self.getLabels().TODAY;
			case self.isThisWeek( date, _contextLocal ):
				return self.toDay( date, abbreviateDays );
			default:
				if( self.language == 'spanish' )
					return self.toDayAndMonth( date, abbreviateMonths, monthsAsNumbers, padMonth );
				else return self.toMonthAndDay( date, abbreviateMonths, monthsAsNumbers, padMonth );
		}
	}









	/* -- LANGUAGE LOGIC -------------------------------------------------------------------------------------------------------------------------------------
	 *
	 *
	 *
	 */
	/** Variable: languageLabels
			These objects define labels that date-messaging will use in the ad. */
	self.languageLabels = [
	{
		language: 'english',
		labels:
		{
			MONTHS_FULL: ['January','February','March','April','May','June','July','August','September','October','November','December'],
			MONTHS_ABRV: ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'],
			MONTHS_EXCP: ['','','','','','','','','sept','','',''],
			
			WEEKDAYS_FULL: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
			WEEKDAYS_ABRV: ['sun','mon','tue','wed','thu','fri','sat'],
			WEEKDAYS_EXCP1: ['','','tues','wednes','thur','',''],
			WEEKDAYS_EXCP2: ['','','','','thurs','',''],
			
			AM: 'am',
			PM: 'pm',
			
			ST: 'st',
			ND: 'nd',
			RD: 'rd',
			TH: 'th',
			OF: 'of',
			
			TOMORROW: 'Tomorrow',
			TODAY: 'Today',
			TONIGHT: 'Tonight',
			NOW: 'Live Now',
			PAST: 'Past'
		}
	},
	{
		language: 'spanish',
		labels:
		{
			MONTHS_FULL: ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'],
			MONTHS_ABRV: ['enero','feb','marzo','abr','mayo','jun','jul','agosto','sept','oct','nov','dic'],
			MONTHS_EXCP: ['','','','','','','','','set','','',''],
			
			WEEKDAYS_FULL: ['domingo','lunes','martes','mi&#201;rcoles','jueves','viernes','s&#193;bado'],
			WEEKDAYS_ABRV: ['dom','lun','mar','mi&#201;r','jue','vier','s&#193;b'],
			WEEKDAYS_EXCP1: ['','','tues','wednes','thur','',''],
			WEEKDAYS_EXCP2: ['','','','','thurs','',''],
			
			AM: 'am',
			PM: 'pm',
			
			ST: 'ro',
			ND: 'ndo',
			RD: 'rd',
			TH: 'th',
			OF: 'de',
			
			TOMORROW: 'ma&#209;ana',
			TODAY: 'hoy',
			TONIGHT: 'esta noche',
			NOW: 'en vivo',
			PAST: 'past'
		}
	}];
	self.getLabels = function() {
		for( var i = 0; i < self.languageLabels.length; i++ ) {
			if( self.languageLabels[ i ].language === self.language ) {
				return self.languageLabels[ i ].labels;
			}
		}
		return null;
	}









	/* -- DATE LOGIC -------------------------------------------------------------------------------------------------------------------------------------
	 *
	 *
	 *
	 */
	/** Method: isWeekDay()
			Returns true or false if the day-string passed is a weekday, versus a weekend

		day 				- a string representing a day of the week, like "Tuesday"
		abbrev 			- a flag to do the check against the abbreviated forms of weekdays. */
	function isWeekDay( day, abbrev ) {
		var isWD = false;
		var dayArray = abbrev ? self.getLabels().WEEKDAYS_ABRV : self.getLabels().WEEKDAYS_FULL;
		for( var i = 0; i < dayArray.length; i++ ) {
			if( day.toLowerCase() === dayArray[ i ] ) {
				isWD = true;
				break;
			}
		}
		return isWD;
	}


	/**	Method: isPast()
			Returns true for a date that has passed the context.

		date				- date to be compared
		context			- date to compare against, generally <DateUtils.getNow> */
	self.isPast = function( date, context ) {
		trace( 'checking isPast');
		return context.getTime() > date.getTime() + self.eventDuration * self.MS_PER_MINUTE;
	}


	/**	Method: isLiveNow()
			Returns true for a date that is after the context but before date + <DateUtils.eventDuration>.

		date				- date to be compared
		context			- date to compare against, generally <DateUtils.getNow> */
	self.isLiveNow = function( date, context ) {
		trace( 'checking isLiveNow');
		var _startPassed = context.getTime() >= date.getTime();
		var _elapsedTime = context.getTime() - date.getTime();
		var _isNotFinished = _elapsedTime <= self.eventDuration * self.MS_PER_MINUTE;
		return _startPassed && _isNotFinished;
	}


	/**	Method: isTonight()
			Returns true for a date that is tonight, ie: after <DateUtils.tonightStartsAt> and before <DateUtils.newDayStartsAt>.
		date				- date to be compared
		context			- date to compare against, generally <DateUtils.getNow> */	
	self.isTonight = function( date, context ) {
		var tonightAtHours = Math.floor( self.tonightStartsAt / 60 );
		var tonightAtMinutes = self.tonightStartsAt - ( tonightAtHours * 60 );
		return date.getTime() - context.getTime() < self.MS_PER_DAY && 
			date.getDate() == context.getDate() && 
			( date.getHours() > tonightAtHours || date.getHours() == tonightAtHours && date.getMinutes() > tonightAtMinutes ) && 
			context.getHours() >= self.newDayStartsAt / 60;
	}


	/**	Method: isToday()
			Returns true for a date that is today, ie: after <DateUtils.newDayStartsAt> and before 5pm.
		date				- date to be compared
		context			- date to compare against, generally <DateUtils.getNow> */
	self.isToday = function( date, context ) {
		return date.getTime() - context.getTime() < self.MS_PER_DAY && date.getDate() == context.getDate() && context.getHours() >= self.newDayStartsAt / 60;
	}


	/**	Method: isTomorrow()
			Returns true for a $_date that is tomorrow, ie: after <DateUtils.newDayStartsAt>.
		date				- date to be compared
		context			- date to compare against, generally <DateUtils.getNow> */
	self.isTomorrow = function( date, context ) {
		var _dateStart = new Date( date.getFullYear(), date.getMonth(), date.getDate());
		var _dayBeforeStart = new Date( _dateStart );
		_dayBeforeStart.setHours( _dateStart.getHours() - 24 );
		return ( context.getTime() >= _dayBeforeStart.getTime() + self.newDayStartsAt * 60 * 1000 ) && ( context.getTime() < _dateStart.getTime() + self.newDayStartsAt * 60 * 1000 );
	}


	/**	Method: isThisWeek()
			Returns true for a date that is within a week.

		date				- date to be compared
		context			- date to compare against, generally <DateUtils.getNow> */
	self.isThisWeek = function( date, context ) {
		return date.getTime() - context.getTime() <= self.MS_PER_WEEK && ( date.getDate() - context.getDate() == 6 && context.getHours() >= self.newDayStartsAt / 60 || date.getDate() - context.getDate() < 6 );
	}


	/** Method: isThisMonth()
			Returns true for a date that is in the same month as context 

		date				- date to be compared
		context			- date to compare against, generally <DateUtils.getNow> */	
	self.isThisMonth = function( date, context ) {
		return date.getMonth() == context.getMonth();
	}


	/** Method: isThisYear()
			Returns true for a date that is in the same year as context 

		date				- date to be compared
		context			- date to compare against, generally <DateUtils.getNow> */	
	self.isThisYear = function( date, context ) {
		return date.getFullYear() == context.getFullYear();
	}
}
