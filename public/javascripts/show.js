$(document).ready(function(){

	var titleTag = document.getElementById('crimeName');
	var url = 'http://localhost:3000/api/' + titleTag.dataset.id;

	$.ajax({
    url: url,
    method: 'GET',
    success: printMapAndMarker,
    error: function(error) {
      console.log('error'); 
    }
  });

  function printMapAndMarker(crime){
  	var position = {
  	  lat: crime.location.coordinates[1], 
  	  lng: crime.location.coordinates[0]
  	};
  	
  	var map = new google.maps.Map(document.getElementById('map'), {
  	  zoom: 15,
  	  center: position
  	});

  	var marker = new google.maps.Marker({
      position: position,
      map: map,
      title: crime.name
    });
  }
});