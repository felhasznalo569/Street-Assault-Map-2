$(document).ready(function() {
	
	var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: {lat: -34.397, lng: 150.644}
	});

	var marker = new google.maps.Marker({
		position: {lat: -34.397, lng: 150.644}
	});  
		marker.setMap(map);
	
	google.maps.event.addListener(map, "click", function (e) {

    //lat and lng is available in e object
		var latLng = e.latLng;
		
		console.log(e.latLng.lat())
		console.log(e.latLng.lng())

		marker.setPosition(latLng);

	});
	
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
