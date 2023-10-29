var map;
var directionsService;
var directionsDisplay;
var markers = [];

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 1.2963, lng: 103.8502 }, 
    zoom: 15,
  });

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById("directionsPanel"));
}

function findNearestClinic() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      console.log(userLocation);

      createMarkerAtCurrentLocation(userLocation);
      map.setCenter(userLocation);
      clearMarkers();
      calculateNearestClinic(userLocation);
    }, function() {
      alert('Geolocation service failed. Please enable location services in your browser.');
    });
  } else {
    alert('Geolocation is not supported by your browser.');
  }
}

function createMarkerAtCurrentLocation(userLocation) {
  var marker = new google.maps.Marker({
  position: userLocation,
  map: map,
  title: 'Your Current Location',
  animation: google.maps.Animation.DROP
  });
}

function calculateNearestClinic(userLocation) {

  var polyclinics = [
    { name: 'AMK Polyclinic', lat: 1.3744, lng: 103.8458 },
    { name: 'Geylang Polyclinic', lat: 1.3193, lng: 103.8873 }, 
    { name: 'Hougang Polyclinic', lat: 1.3698, lng: 103.8892 },
    { name: 'Kallang Polyclinic', lat: 1.3167, lng: 103.8587 },
    { name: 'Toa Payoh Polyclinic', lat: 1.3346, lng: 103.8589 },
    { name: 'Woodlands Polyclinic', lat: 1.4308, lng: 103.7751},
    { name: 'Yishun Polyclinic', lat: 1.4304, lng: 103.8391},
    { name: 'Bedok Polyclinic', lat: 	1.3269, lng: 103.9320},
    { name: 'Bukit Merah Polyclinic', lat: 1.2820, lng: 103.8186},
    { name: 'Eunos Polyclinic', lat: 1.3174, lng: 103.9058},
    { name: 'Marine Parade Polyclinic', lat: 1.3024, lng: 103.9077},
    { name: 'Outram Polyclinic', lat: 1.2797, lng: 103.8382},
    { name: 'Pasir Ris Polyclinic', lat: 1.3685, lng: 103.9594},
    { name: 'Punggol Polyclinic', lat: 1.4027, lng: 103.9128},
    { name: 'Sengkang Polyclinic', lat: 1.3927, lng: 103.8943},
    { name: 'Tampines Polyclinic', lat: 1.3573, lng: 103.9459},
    { name: 'Tampines North Polyclinic', lat: 1.3631, lng: 103.9377},
    { name: 'Bukit Batok Polyclinic', lat: 1.3520, lng: 103.7479},
    { name: 'Bukit Panjang Polyclinic', lat: 1.3830, lng: 103.7598},
    { name: 'Chua Chu Kang Polyclinic', lat: 1.3822, lng: 103.7509},
    { name: 'Clementi Polyclinic', lat: 1.3128, lng: 103.7657},
    { name: 'Jurong Polyclinic', lat: 1.3498, lng: 103.7306},
    { name: 'Pioneer Polyclinic', lat: 1.3386, lng: 103.6990},
    { name: 'Queenstown Polyclinic', lat: 1.2985, lng: 103.80109}
  ];

  var hospitals = [
    { name: 'Changi General Hospital', lat: 1.3402, lng: 103.9496 },
    { name: 'KK Hospital', lat: 1.3098, lng: 103.8460 },
    { name: 'Sengkang General Hospital', lat: 1.3943, lng: 103.8931 },
    { name: 'Singapore General Hospital', lat: 1.2804, lng: 103.8348 },
    { name: 'Khoo Teck Puat Hospital', lat: 1.4241, lng: 103.8394 },
    { name: 'Tan Tock Seng Hospital', lat: 1.3214, lng: 103.8458 },
    { name: 'Alexandra Hospital', lat: 1.2866, lng: 103.8013 },
    { name: 'National University Hospital', lat: 1.2939, lng: 103.7831 },
    { name: 'Ng Teng Fong Hospital', lat: 1.3350, lng: 103.7439 },
]

  var clinics = polyclinics.concat(hospitals);

  var nearestClinic;
  var nearestDistance = Number.MAX_VALUE;

  clinics.forEach(function(clinic) {
    var distance = haversineDistance(userLocation, clinic);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestClinic = clinic;
    }
  })

  polyclinics.forEach(function(polyclinic) {
    var polyclinicMarker = new google.maps.Marker({
      map: map,
      position: { lat: polyclinic.lat, lng: polyclinic.lng },
      title: polyclinic.name,
      icon: {
        url:"https://pic.onlinewebfonts.com/thumbnails/icons_493655.svg",
        scaledSize: new google.maps.Size(35,35)
      }
    });
    markers.push(polyclinicMarker);
  });

  hospitals.forEach(function(hospital) {
    var hospitalMarker = new google.maps.Marker({
      map: map,
      position: { lat: hospital.lat, lng: hospital.lng },
      title: hospital.name,
      icon: {
        url: "https://icons.iconarchive.com/icons/pictogrammers/material/256/hospital-marker-icon.png",
        scaledSize: new google.maps.Size(40,40)
      }

    });
    markers.push(hospitalMarker);
  });

  console.log(nearestClinic)
  calculateAndDisplayRoute(userLocation, nearestClinic, directionsService, directionsDisplay);
}

function haversineDistance(point1, point2) {
  var lat1 = point1.lat;
  var lon1 = point1.lng;
  var lat2 = point2.lat;
  var lon2 = point2.lng;
  var R = 6371; 
  var dLat = (lat2 - lat1) * (Math.PI / 180);
  var dLon = (lon2 - lon1) * (Math.PI / 180);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var distance = R * c;
  return distance;
}

function calculateAndDisplayRoute(origin, destination, directionsService, directionsDisplay) {
    var travelMode = document.getElementById("travelMode").value;
    var request = {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode[travelMode]
    };
    console.log(request);

    directionsService.route(request, function(result, status) {
        console.log(result);
        console.log(status);
        if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(result);
        directionsDisplay.setMap(map);
        } else {
        alert('Directions request failed due to ' + status);
        }
    });
}

function clearMarkers() {
  markers.forEach(function(marker) {
    marker.setMap(null);
  });
  markers = [];
  directionsDisplay.setMap(null);
}