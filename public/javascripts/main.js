$(document).ready(function(){
  var ironhackBCN = {
    lat: 47.49, 
    lng: 19.04
  };

  
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: ironhackBCN
  });

  var center = {
    lat: undefined,
    lng: undefined
  };  


let markers = [];
  myCrimes.forEach(function(crime){
    let title = crime.name
    let position = {
      lat: crime.location.coordinates[1],
      lng: crime.location.coordinates[0]
    };
    var pin = new google.maps.Marker({ position, map, title  });

      var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            crime.name +
            '<div id="bodyContent">'+
            'leiras: '+ crime.description +
            '</div>'+
            '</div>';

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

    pin.addListener('click', function() {
          infowindow.open(map, pin);
        });

    markers.push(pin)
  });

});

