"use strict";

var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB-g39QK3WxgK7Pk1E_j41_4JL0_w2OnLc&callback=initMap&libraries=places&language=pl&region=PL';
script.defer = true;
var map;
var markers = [];
var place_;

var createMarker = function createMarker(place, ID) {
  var image = {
    url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
  };
  var marker = new google.maps.Marker({
    map: map,
    animation: google.maps.Animation.DROP,
    position: place.geometry.location,
    title: place.name,
    icon: image
  });
  markers.push(marker);
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
      var output_div = document.querySelector('#output');
      var template_string = "";

      for (var i = 0; i < origins.length; i++) {
        var results = response.rows[i].elements;

        for (var j = 0; j < destinations.length; j++) {
          if (results[j].duration.value < 900) {
            template_string += "<p><span>".concat(origins[i], "</span><span>").concat(place.name, "</span><span>").concat(results[j].distance.text, "</span><span>").concat(results[j].duration.text, "</span></p>");
          }
        }
      }

      output_div.innerHTML += template_string;
    } else {
      output_div.innerHTML = 'Nie znaleziono obiektów w twojej okolicy';
    }
  });
  marker.addListener('click', function () {
    var request = {
      placeId: ID
    };
    service.getDetails(request, function (details, status) {
      var marker_name = "<p>".concat(details.name, "</p>");
      var marker_address = "<div>".concat(details.adr_address, "</div>");
      var marker_url = "<a href=\"".concat(details.url, "\">link do google maps</a>");
      infowindow.setContent([marker_name, marker_address, marker_url].join('\n'));
      infowindow.open(map, marker);
    });
  });
};

var callback = function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i], results[i].place_id);
    }
  }
};

var remove_markers = function remove_markers() {
  markers.forEach(function (marker) {
    marker.setMap(null);
  });
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
    zoom: 13
  };
  map = new google.maps.Map(canvas, options);
  service = new google.maps.places.PlacesService(map);

  if (!navigator.geometry) {
    var request = {
      location: default_location,
      radius: '2000',
      type: ['gym']
    };
    place_ = default_location;
    service.nearbySearch(request, callback);
  }

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
        radius: '2000',
        type: ['gym']
      };
      document.querySelector('#xdd').innerHTML = 'Znaleziono lokalizacje';
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
      var _request = {
        location: location,
        radius: '2000',
        type: ['gym']
      };
      service.nearbySearch(_request, callback);
    }
  });
};

document.head.appendChild(script);