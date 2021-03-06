const script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB-g39QK3WxgK7Pk1E_j41_4JL0_w2OnLc&callback=initMap&libraries=places&language=pl&region=PL';
script.defer = true;

var map;
var markers = [];
var place_;
var image = {
    url: '../static/img/marker-light.png',
};
var output_div = document.querySelector('#output');

var style = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dadada"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#c9c9c9"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    }
  ];

const createMarker = (place, ID) => {
    const distance = new google.maps.DistanceMatrixService();
    document.querySelector('#output').innerHTML = '';
    distance.getDistanceMatrix(
        {
            origins: [place_],
            destinations: [place.geometry.location],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            drivingOptions: {
                departureTime: new Date(Date.now() + 600000),
                trafficModel: 'bestguess'
            }
        },
        (response, status) => {
            if (status === 'OK') {
              const origins = response.originAddresses;
              const destinations = response.destinationAddresses;
              var template_string = ``;

              const marker = new google.maps.Marker({
                map: map,
                animation: google.maps.Animation.DROP,
                position: place.geometry.location,
                title: place.name,
                icon: image
              });
              markers.push(marker);

              marker.addListener('click', () => {
                const request = {
                    placeId: ID
                };
                service.getDetails(request, (details, status) => {
                    let marker_name = `<p>${details.name}</p>`;
                    let marker_address = `<div>${details.vicinity}</div>`;
                    let marker_url = `<a href="${details.url}" target="_blank">link do google maps</a>`;
                    infowindow.setContent([marker_name, marker_address, marker_url].join('\n'));
                    infowindow.open(map, marker);
                });
              });
              for (let i = 0; i < origins.length; i++) {
                  results = response.rows[i].elements;
                  for (let j = 0; j < destinations.length; j++) {
                      if (results[j].duration.value < 900) {
                          template_string += `<p><span>${place.name}</span> znajduje się w odległości <span>${results[j].distance.text}</span> od Ciebie. Przybliżony czas dojazdu: <span>${results[j].duration.text}</span></p>`;
                      }
                  }
              }
              output_div.innerHTML += template_string;
            }
    }
    );
};

const callback = (results, status) =>  {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          createMarker(results[i], results[i].place_id);
        }
    } else {
      output_div.innerHTML = `<p><span>Nie znaleziono obiektów sportowych w twojej okolicy<span></p>`;
    }
};

const remove_markers = () => {
    markers.forEach(marker => {
        marker.setMap(null);
    });
    markers = [];
}

window.initMap = function () {
    const input = document.querySelector('#search');
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.setFields(['address_components', 'geometry', 'icon', 'name']);
    const canvas = document.getElementById('map');
    let location;
    const default_location = new google.maps.LatLng(50.2942602, 18.6635169);

    const options = {
        center: default_location,
        zoom: 13,
        disableDefaultUI: true,
        gestureHandling: "cooperative",
        styles: style
    };

    map = new google.maps.Map(canvas, options); 
    service = new google.maps.places.PlacesService(map);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
        position => {
            location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            };
            place_ = location;
            map.setCenter(location);
            const request = {
                location: location,
                //radius: '2000',
                type: ['gym'],
                rankBy: google.maps.places.RankBy.DISTANCE
            };
            document.querySelector('.alert-success').classList.add('alert');
            document.querySelector('.alert-message').innerHTML = 'Pobrano lokalizację automatycznie';
            setTimeout(function(){ document.querySelector('.alert-success').classList.add("alert-hide"); }, 3000);
            remove_markers();
            service.nearbySearch(request, callback);
        },
        error => {
          const request = {
            location: default_location,
            //radius: '2000',
            type: ['gym'],
            rankBy: google.maps.places.RankBy.DISTANCE
          };
          place_ = default_location;
          remove_markers();
          service.nearbySearch(request, callback);
          }
        );
    }
    infowindow = new google.maps.InfoWindow({ maxWidth: 250 });

    autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
            remove_markers();
            location = place.geometry.location;
            place_ = location;
            map.setCenter(location);
            const request = {
                location: location,
                //radius: '2000',
                type: ['gym'],
                rankBy: google.maps.places.RankBy.DISTANCE
            };
            service.nearbySearch(request, callback);
        }
    });
};

document.querySelector('main').addEventListener('scroll', () => {
  document.querySelector('.pac-container').style.display = 'none';
});

document.head.appendChild(script);