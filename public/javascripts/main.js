$(document).ready(function(){
  var ironhackBCN = {
    lat: 41.3977381, 
    lng: 2.090471916
  };

  
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: ironhackBCN
  });

  var center = {
    lat: undefined,
    lng: undefined
  };  

let markers = [];
  myRestaurants.forEach(function(restaurant){
    let title = restaurant.name
    let position = {
      lat: restaurant.location.coordinates[1],
      lng: restaurant.location.coordinates[0]
    };
    var pin = new google.maps.Marker({ position, map, title  });
    markers.push(pin)
  });

});

