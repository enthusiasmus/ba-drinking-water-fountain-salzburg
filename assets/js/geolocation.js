function getUserLocation(){

  $('#feed').hide();
  $('#map_canvas').show();
  appRouter.navigate('#');

	if(navigator.geolocation){
		//TODO: Important to know that the watchPosition() function is still in development
		//so we have to check the correct working of the function in more browsers
		//otherwise we have to set the intervall, but then get sure, that the user
		//gives complete access, not only once, because otherwise the permission message
		//apears every second
		
		navigator.geolocation.getCurrentPosition(function(position){
			var lat = position.coords.latitude;
			var lng = position.coords.longitude;
			var time = position.timestamp;
      var lat = position.coords.latitude; //dezimal Grad
      var lng = position.coords.longitude; //dezimal Grad
      var precision = position.coords.accuracy; //Meter
      var altitude = position.coords.altitude; //Meter
      var altitudeAcc = position.coords.altitudeAccuracy; //Meter
      var speed = position.coords.speed; //Meter pro Sek.
      var heading = position.coords.heading; //Grad von wahrem Norden
			
      userLocationModel.set({
      	latitude: lat,
      	longitude: lng,
      	time: time,
      	precisionRadius: precision,
      	altitude: altitude,
      	altitudeAcc: altitudeAcc,
      	speed: speed,
      	heading: heading
      });

			mapView.removePositionMarker();
      mapView.placePositionMarker(userLocationModel);
    	mapView.centerMap(userLocationModel);
		}, 
		function(error){
			clearInterval(checkPositionInterval);
			switch (error.code) {
        case error.PERMISSION_DENIED:
        	alert("Zugriff auf Position wurde verweigert!");
        	break;
        case error.POSITION_UNAVAILABLE: 
        	alert("Position konnte nicht ermittelt werden!");
        	break;
        case error.TIMEOUT:
        	alert("Zeitüberschreitung beim Ermitteln der Position!");
        	break;
        case error.UNKNOWN_ERROR: 
        	alert("Positionsbestimmung zur Zeit nicht möglich!");
        	break;
        default:
        	alert("Fehler bei der Positionsbestimmung!");
        	break;
   		}
		},{enableHighAccuracy:true, timeout:5000, maximumAge:60000});
	}
	else{
		console.log("Ihr Browser unterstützt keine Positionsbestimmung!");
	}
}
