$(document).ready(function(){
  var mapcenter = {
    lat: 47.49, 
    lng: 19.04
  };
  
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: mapcenter
  });

 if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(function (position) {
         initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
         map.setCenter(initialLocation);
     });
 }


let markers = [];
  myCrimes.forEach(function(crime){
    let title = crime.name
    let position = {
      lat: crime.location.coordinates[1],
      lng: crime.location.coordinates[0]
    };
    let whencrime1 = crime.when
    let whencrime = 'not known'
    if(typeof whencrime1 != 'undefined') 
    {
      whencrime = whencrime1.substring(0,10)
    }
    var icon;
    let exactlywhen = crime.timeofday
    if (typeof exactlywhen == 'undefined') exactlywhen = 'time of day not known'


    if(title == 'Violence')
    {
    icon ='Violence.png'
    }

    if(title == 'Robbery')
    {
    icon ='Robbery.png'
    }

    

    var pin = new google.maps.Marker({ position, map, title, icon  });

      var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            crime.name.bold() +
            '<div id="bodyContent">'+
            'Description: '+ crime.description +
            '</div>'+
            '<div id="bodyContent">'+
            'When: ' + whencrime + ' (' + exactlywhen + ') ' +
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

