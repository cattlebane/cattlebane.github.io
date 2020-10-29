/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	DateStates

	Description:
		Previously known in ad-as3 as "DateRange".

		Used to create a schedule of dates. Then this class can be queried for
			- a label representing the current valid date
			- an index which can be used to manually retrieve the current valid object

		Also interfaces with <StaticGenerator> in order to create a schedule of "static states" for the ad.

	ADDATA.js:
		It is recommended that you centralize your schedule in AdData. This way, changes to the schedule can easily 
		be achieved with one common update.

		(start code)
			this.dateStates = new DateStates();
			this.dateStates.addDate( '2015-08-01 12:00:00', DateUtils.TZ_LOCAL );
			this.dateStates.addDate( '2015-08-30 12:00:00', DateUtils.TZ_LOCAL );
			this.dateStates.traceSchedule();
		(end code)		

	BUILD.js:
		In View, you can write functions that build out the DOM for each of your states. 

		(start code)
			this.buildDateState0 = function() {
				trace( 'View.buildDateState0()' );
				// Markup...
			}
			this.buildDateState1 = function() {
				trace( 'View.buildDateState1()' );
				// Markup...
			}
			this.buildDateState2 = function() {
				trace( 'View.buildDateState2()' );
				// Markup...
			}
		(end code)

		In Control, you can write the logic to switch which build function gets called. Please *NOTE*, the first date is ALWAYS
		passed. In other words, index 0, or "date-0" is the default state, before any of your dates have passed.

		(start code)
			switch( adData.dateStates.getCurrentLabel()) {
				case 'date-0': // default state
					View.buildDateState0();
					break;

				case 'date-1': // first date has passed
					View.buildDateState1();
					break;

				case 'date-2': // second date has passed
					View.buildDateState2();
					break;
			}
		(end code)
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */
var DateStates = function() {
		
	this.dates = [];
	
	
	/** Method: addDate()

		Add a date/timezone and label the the 
	
		_date			- Expected to be either a Date object, or a date-time string in the format of YYYY-MM-DD HH:MM:SS, where HH:MM:SS are optional. 
		_tzDesignation		- any one of the supported DateUtils timezone ("TZ_") constants, assumes the client's timezone, but if your
							list of dates is in EST, for example, then you would need to switch this argument to DateUtils.TZ_EST. 
		_label			- Optionally specify a label, which can make the logic read a little easier in the build. 
		_args			- Optionally specify any other random arguments or callback functions that may be required for your build */
	this.addDate = function( _date, _tzDesignation, _label, _args ) {
		_tzDesignation = _tzDesignation || DateUtils.TZ_LOCAL;
		if( !( _date instanceof Date ))
			_date = DateUtils.parseToDate( _date, _tzDesignation );
		this.dates.push({ 
			date: _date,
			tzDesignation: _tzDesignation,
			label: _label,
			args: _args
		});
		this.sortDates();
		this.confirmLabels();
	}



	/** Method: traceSchedule()

		Write the schedule and associated indexes/labels to the console. */
	this.traceSchedule = function() {
		trace( 'DateStates.traceSchedule()' );
		for( var i in this.dates ) {
			trace( ' - ' + this.dates[i].date + '( ' + this.dates[i].tzDesignation.label + ' ), index: "' + i.toString() + '", label: "' + this.dates[i].label + '"' );
		}
	}
	
	
	/** Method: getCurrentLabel()

		Returns the label associated with the current date-state. If no label was specified for the current date, 
		this function will return labels, like 

		'date-0'			- before first date has passed
		'date-1' 			- first date has passed
		'date-2' 			- second date has passed */
	this.getCurrentLabel = function() {
		return this.dates[this.getCurrentIndex()].label;
	}

	
	
	/** Method: getCurrentIndex()

		Get the current date-state index. The 0-index date is ALWAYS passed, so if the first date in your list has
		NOT passed, this function will return 0.  */
	this.getCurrentIndex = function() {
		var currentIndex = -1;
		for( var _i=0; _i < this.dates.length; _i++ ) {
			var _now = DateUtils.getNow( this.dates[_i].tzDesignation );
			if( _now.getTime() >= this.dates[_i].date.getTime() ) {
				currentIndex = _i;
			}
		}
		return currentIndex;
	}
	
	
	/** Method: getDates()

		Return a list of the actual date objects */
	this.getDates = function() {
		var dates = [];
		for( var i in this.dates ) {
			dates.push( this.dates[i].date );
		}
		return dates;
	}




	this.sortDates = function() {
		function sortOnDateTime( a, b ) {
			if( a.date.getTime() < b.date.getTime()) return -1;
			if( a.date.getTime() > b.date.getTime()) return 1;
			return 0;				
		}
		this.dates.sort( sortOnDateTime );
	}
	this.confirmLabels = function() {
		for( var i in this.dates ) {
			if( !this.dates[i].label )
				this.dates[i].label = 'date-' + i.toString();
		}
	}


	this.addDate( '2000-01-01 00:00:00' );

}
