function getUserLocation(){
  $('#feed').hide();
  
	if(navigator.geolocation){
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

      mapView.placePositionMarker(userLocationModel);

    	/*var watchID = navigator.geolocation.watchPosition(function(position){
	      var lat = position.coords.latitude; //dezimal Grad
	      var lng = position.coords.longitude; //dezimal Grad
	    	mainMap.setCenter(new google.maps.LatLng(lat, lng));
	    	userLocationPrecisionCircle.setCenter(new google.maps.LatLng(lat, lng));
    	}, 
    	function(error){
     		switch (error.code) {
          case error.PERMISSION_DENIED: break;
          case error.POSITION_UNAVAILABLE: break;
          case error.TIMEOUT: break;
          case error.UNKNOWN_ERROR: break;
     		}
     		window.console.log(error.message);
    	});*/
		}, 
		function(){
			console.log("Fehler bei der Positionsbestimmung!");
		},
		{enableHighAccuracy:true, timeout:5000, maximumAge:1000});
	}
	else{
		console.log("Bitte updaten Sie Ihren Browser!");
	}
}
//http://wiki.selfhtml.org/wiki/Doku:JavaScript/API/Geolocation#Position_verfolgen