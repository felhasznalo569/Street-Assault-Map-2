$(document).ready(function() {
	
	var centerLat = 47.49;
	var centerLng = 19.04;

	var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: {lat: centerLat, lng: centerLng}
	});

	var marker = new google.maps.Marker({
		// position: {lat: centerLat, lng: centerLng}
	});  
		marker.setMap(map);

	// document.getElementById("latitude").value = centerLat;
	// document.getElementById("longitude").value = centerLng;
	
	google.maps.event.addListener(map, "click", function (e) {

    //lat and lng is available in e object
		var latLng = e.latLng;

		document.getElementById("latitude").value = e.latLng.lat();
		document.getElementById("longitude").value = e.latLng.lng();

		marker.setPosition(latLng);

	});

	document.getElementById("latitude").addEventListener('change', updateMap);
	document.getElementById("longitude").addEventListener('change', updateMap);

	function updateMap(){

		var latLngUpdate = new google.maps.LatLng(document.getElementById("latitude").value, document.getElementById("longitude").value);

		marker.setPosition(latLngUpdate);

		map.setCenter(latLngUpdate);
	}
	
  var geocoder = new google.maps.Geocoder();

  document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });
  
  function geocodeAddress(geocoder, resultsMap) {
	  var address = document.getElementById('address').value;
	  
	  geocoder.geocode({'address': address}, function(results, status) {
	    if (status === 'OK') {
	      resultsMap.setCenter(results[0].geometry.location);
	      var marker = new google.maps.Marker({
	        map: resultsMap,
	        position: results[0].geometry.location
	      });
	      // document.getElementById('latitude').value = results[0].geometry.location.lat();
				// document.getElementById('longitude').value = results[0].geometry.location.lng();
				
				document.getElementById('latitude').value = e.latLng.lat();
				document.getElementById('longitude').value = e.latLng.lng();
	    } else {
	      alert('Geocode was not successful for the following reason: ' + status);
	    }
	  });
	}
});