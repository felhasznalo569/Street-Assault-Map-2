$(document).ready(function(){
  var mapcenter = {
    lat: 47.49, 
    lng: 19.04
  };
  
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: mapcenter
  });

 


let markers = [];
  myCrimes.forEach(function(crime){
    let title = crime.name
    let position = {
      lat: crime.location.coordinates[1],
      lng: crime.location.coordinates[0]
    };
    let wherecrime = crime.when
    console.log(crime.when)

    var icon;


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
            'Description: '+ crime.description + '\n' + wherecrime +
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

