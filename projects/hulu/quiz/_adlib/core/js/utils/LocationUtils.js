/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	LocationUtils

	Description:
		This object contains utilities for interfacing with the device's GPS.
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */
var LocationUtils = new function()
{
	this.gpsSuccessCallback;
	this.gpsFailCallback;

	/** Method: getGPSData()
			Queries the device for current location. Asyncronous and dependent on user permission, 
			so callback functions must be used.

		callbackSuccess 			- 	upon successful acquisition of device location, this funciton is called with 
										global coordinates. 
		callbackFail 				-	called if the query fails */	
	this.getGPSData = function( callbackSuccess, callbackFail )
	{
		if( navigator.geolocation )
		{
			LocationUtils.gpsSuccessCallback = callbackSuccess;
			LocationUtils.gpsFailCallback = callbackFail;
			navigator.geolocation.getCurrentPosition( LocationUtils.onLocationRetrieved, LocationUtils.onLocationFailed );
		}
		else trace( 'geolocation not available' );
	}

	this.onLocationRetrieved = function( position )
	{
		LocationUtils.gpsSuccessCallback( position.coords );
	}

	this.onLocationFailed = function( error )
	{
		trace( 'Error retrieving location data' );

		switch( error.code )
		{
			case 0:
				trace( '0 - unknown error' );
			break;

			case 1:
				trace( '1 - permission denied' );
			break;

			case 2:
				trace( '2 - position unavailable (error response from locaton' );
			break;

			case 3:
				trace( '3 - timed out' );
			break;
		}

		if( LocationUtils.gpsFailCallback ) LocationUtils.gpsFailCallback( error );
	}
}

