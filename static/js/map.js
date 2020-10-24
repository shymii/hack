const script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB-g39QK3WxgK7Pk1E_j41_4JL0_w2OnLc&callback=initMap&libraries=places';
script.defer = true;

var map;

const createMarker = (place, ID) => {
    const marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        position: place.geometry.location,
        title: place.name
    });
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
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i], results[i].place_id);
        }
    }
};

window.initMap = function () {
    const canvas = document.getElementById('map');
    const location = new google.maps.LatLng(50.3013283, 18.5795769);
    const options = {
        center: location,
        zoom: 10
    };

    map = new google.maps.Map(canvas, options);

    const request = {
        location: location,
        radius: '5000',
        type: ['gym']
    };

    infowindow = new google.maps.InfoWindow({ maxWidth: 250 });
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);

};

document.head.appendChild(script);