$.ajaxSetup({
	async: true,
	dataType: "json",
	timeoutNumber: 5000,
	url: "db/elements.php",
	success: function(data){	
		for(idx in data){
		  var marker = new google.maps.Marker({
		      position: new google.maps.LatLng(data[idx].latitude, data[idx].longitude),
		      map: mainMap,
		      title: data[idx].f_key + ": " + data[idx].water_distributor + " - " + data[idx].fontain_name,
		  });
		}
	},
	error: function(data){
		alert("Die Trinkbrunnen konnten nicht geladen werden!");
	}
});

$.ajax();
