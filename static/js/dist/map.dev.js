"use strict";

var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB-g39QK3WxgK7Pk1E_j41_4JL0_w2OnLc&callback=initMap&libraries=places';
script.defer = true;
var map;

var createMarker = function createMarker(place, ID) {
  var marker = new google.maps.Marker({
    map: map,
    animation: google.maps.Animation.DROP,
    position: place.geometry.location,
    title: place.name
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

window.initMap = function () {
  var canvas = document.getElementById('map');
  var location = new google.maps.LatLng(50.3013283, 18.5795769);
  var options = {
    center: location,
    zoom: 10
  };
  map = new google.maps.Map(canvas, options);
  var request = {
    location: location,
    radius: '5000',
    type: ['gym']
  };
  infowindow = new google.maps.InfoWindow({
    maxWidth: 250
  });
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
};

document.head.appendChild(script);