"use strict";

var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB-g39QK3WxgK7Pk1E_j41_4JL0_w2OnLc&callback=initMap&libraries=places&language=pl&region=PL';
script.defer = true;
var map;
var markers = [];
var place_;
var image = {
  url: '../static/img/marker-dark.png'
};
var output_div = document.querySelector('#output');
var style = [{
  "elementType": "geometry",
  "stylers": [{
    "color": "#212121"
  }]
}, {
  "elementType": "labels.icon",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#757575"
  }]
}, {
  "elementType": "labels.text.stroke",
  "stylers": [{
    "color": "#212121"
  }]
}, {
  "featureType": "administrative",
  "elementType": "geometry",
  "stylers": [{
    "color": "#757575"
  }]
}, {
  "featureType": "administrative.country",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#9e9e9e"
  }]
}, {
  "featureType": "administrative.land_parcel",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "administrative.locality",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#bdbdbd"
  }]
}, {
  "featureType": "poi",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#757575"
  }]
}, {
  "featureType": "poi.park",
  "elementType": "geometry",
  "stylers": [{
    "color": "#181818"
  }]
}, {
  "featureType": "poi.park",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#616161"
  }]
}, {
  "featureType": "poi.park",
  "elementType": "labels.text.stroke",
  "stylers": [{
    "color": "#1b1b1b"
  }]
}, {
  "featureType": "road",
  "elementType": "geometry.fill",
  "stylers": [{
    "color": "#2c2c2c"
  }]
}, {
  "featureType": "road",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#8a8a8a"
  }]
}, {
  "featureType": "road.arterial",
  "elementType": "geometry",
  "stylers": [{
    "color": "#373737"
  }]
}, {
  "featureType": "road.highway",
  "elementType": "geometry",
  "stylers": [{
    "color": "#3c3c3c"
  }]
}, {
  "featureType": "road.highway.controlled_access",
  "elementType": "geometry",
  "stylers": [{
    "color": "#4e4e4e"
  }]
}, {
  "featureType": "road.local",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#616161"
  }]
}, {
  "featureType": "transit",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#757575"
  }]
}, {
  "featureType": "water",
  "elementType": "geometry",
  "stylers": [{
    "color": "#000000"
  }]
}, {
  "featureType": "water",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#3d3d3d"
  }]
}];

var createMarker = function createMarker(place, ID) {
  var distance = new google.maps.DistanceMatrixService();
  document.querySelector('#output').innerHTML = '';
  distance.getDistanceMatrix({
    origins: [place_],
    destinations: [place.geometry.location],
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC,
    drivingOptions: {
      departureTime: new Date(Date.now() + 600000),
      trafficModel: 'bestguess'
    }
  }, function (response, status) {
    if (status === 'OK') {
      var origins = response.originAddresses;
      var destinations = response.destinationAddresses;
      var template_string = "";
      var marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        position: place.geometry.location,
        title: place.name,
        icon: image
      });
      markers.push(marker);
      marker.addListener('click', function () {
        var request = {
          placeId: ID
        };
        service.getDetails(request, function (details, status) {
          var marker_name = "<p>".concat(details.name, "</p>");
          var marker_address = "<div>".concat(details.vicinity, "</div>");
          var marker_url = "<a href=\"".concat(details.url, "\" target=\"_blank\">link do google maps</a>");
          infowindow.setContent([marker_name, marker_address, marker_url].join('\n'));
          infowindow.open(map, marker);
        });
      });

      for (var i = 0; i < origins.length; i++) {
        results = response.rows[i].elements;

        for (var j = 0; j < destinations.length; j++) {
          if (results[j].duration.value < 900) {
            template_string += "<p><span>".concat(place.name, "</span> znajduje si\u0119 w odleg\u0142o\u015Bci <span>").concat(results[j].distance.text, "</span> od Ciebie. Przybli\u017Cony czas dojazdu: <span>").concat(results[j].duration.text, "</span></p>");
          }
        }
      }

      output_div.innerHTML += template_string;
    }
  });
};

var callback = function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i], results[i].place_id);
    }
  } else {
    output_div.innerHTML = "<p><span>Nie znaleziono sportowych obiekt\xF3w w twojej okolicy</span></p>";
  }
};

var remove_markers = function remove_markers() {
  markers.forEach(function (marker) {
    marker.setMap(null);
  });
  markers = [];
};

window.initMap = function () {
  var input = document.querySelector('#search');
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.setFields(['address_components', 'geometry', 'icon', 'name']);
  var canvas = document.getElementById('map');
  var location;
  var default_location = new google.maps.LatLng(50.2942602, 18.6635169);
  var options = {
    center: default_location,
    zoom: 13,
    disableDefaultUI: true,
    gestureHandling: "cooperative",
    styles: style
  };
  map = new google.maps.Map(canvas, options);
  service = new google.maps.places.PlacesService(map);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      place_ = location;
      map.setCenter(location);
      var request = {
        location: location,
        //radius: '2000',
        type: ['physiotherapist'],
        rankBy: google.maps.places.RankBy.DISTANCE
      };
      document.querySelector('.alert-success').classList.add('alert');
      document.querySelector('.alert-message').innerHTML = 'Pobrano lokalizację automatycznie';
      setTimeout(function () {
        document.querySelector('.alert-success').classList.add("alert-hide");
      }, 3000);
      remove_markers();
      service.nearbySearch(request, callback);
    }, function (error) {
      var request = {
        location: default_location,
        //radius: '2000',
        type: ['physiotherapist'],
        rankBy: google.maps.places.RankBy.DISTANCE
      };
      place_ = default_location;
      remove_markers();
      service.nearbySearch(request, callback);
    });
  }

  infowindow = new google.maps.InfoWindow({
    maxWidth: 250
  });
  autocomplete.addListener('place_changed', function () {
    var place = autocomplete.getPlace();

    if (place.geometry) {
      remove_markers();
      location = place.geometry.location;
      place_ = location;
      map.setCenter(location);
      var request = {
        location: location,
        //radius: '2000',
        type: ['physiotherapist'],
        rankBy: google.maps.places.RankBy.DISTANCE
      };
      service.nearbySearch(request, callback);
    }
  });
};

document.querySelector('main').addEventListener('scroll', function () {
  document.querySelector('.pac-container').style.display = 'none';
});
document.head.appendChild(script);