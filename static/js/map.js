const script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB-g39QK3WxgK7Pk1E_j41_4JL0_w2OnLc&callback=initMap&libraries=places&language=pl&region=PL';
script.defer = true;

var map;
var markers = [];
var place_;

const createMarker = (place, ID) => {
    const image = {
        url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    };
    const marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        position: place.geometry.location,
        title: place.name,
        icon: image
    });
    markers.push(marker);
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
                var output_div = document.querySelector('#output');
                var template_string = ``;

                for (let i = 0; i < origins.length; i++) {
                    const results = response.rows[i].elements;
                    for (let j = 0; j < destinations.length; j++) {
                        if (results[j].duration.value < 900) {
                            template_string += `<p><span>${origins[i]}</span><span>${place.name}</span><span>${results[j].distance.text}</span><span>${results[j].duration.text}</span></p>`;
                        }
                    }
                }
                output_div.innerHTML += template_string;
            } else {
                output_div.innerHTML = 'Nie znaleziono obiektów w twojej okolicy';
            }
    }
    );
    marker.addListener('click', () => {
        const request = {
            placeId: ID
        };
        service.getDetails(request, (details, status) => {
            let marker_name = `<p>${details.name}</p>`;
            let marker_address = `<div>${details.adr_address}</div>`;
            let marker_url = `<a href="${details.url}">link do google maps</a>`;
            infowindow.setContent([marker_name, marker_address, marker_url].join('\n'));
            infowindow.open(map, marker);
        });
    });
};

const callback = (results, status) =>  {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          createMarker(results[i], results[i].place_id);
        }
    }
};

const remove_markers = () => {
    markers.forEach(marker => {
        marker.setMap(null);
    });
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
    };

    map = new google.maps.Map(canvas, options);
    
    service = new google.maps.places.PlacesService(map);

    if(!navigator.geometry) {
        const request = {
            location: default_location,
            radius: '2000',
            type: ['gym']
        };
        place_ = default_location;
        service.nearbySearch(request, callback);
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
        (position) => {
            location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            };
            place_ = location;
            map.setCenter(location);
            const request = {
                location: location,
                radius: '2000',
                type: ['gym']
            };
            document.querySelector('#xdd').innerHTML = 'Znaleziono lokalizacje';
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
                radius: '2000',
                type: ['gym']
            };
            service.nearbySearch(request, callback);
        }
    });
};

document.head.appendChild(script);