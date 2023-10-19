// Function to initialize the map
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 1.2963, lng: 103.8502 }, // Set the initial center of the map
        zoom: 12, // Set the initial zoom level
    });

    // Add markers
    var marker = new google.maps.Marker({
        position: { lat: MARKER_LATITUDE, lng: MARKER_LONGITUDE },
        map: map,
        title: 'Marker Title',
    });
}
AIzaSyAIkO6mQjvyODa0h1w0xCgr5Z-ZofMRPok

var polyclinics = [
    { name: 'AMK Polyclinic', lat: 1.3744, lng: 103.8458 },
    { name: 'Geylang Polyclinic', lat: 1.3193, lng: 103.8873 },
    { name: 'Hougang Polyclinic', lat: 1.3698, lng: 103.8892 },
    { name: 'Kallang Polyclinic', lat: 1.3167, lng: 103.8587 },
    { name: 'Toa Payoh Polyclinic', lat: 1.3346, lng: 103.8589 },
    { name: 'Woodlands Polyclinic', lat: 1.4308, lng: 103.7751},
    { name: 'Yishun Polyclinic', lat: 1.4304, lng: 103.8391},
    { name: 'Bedok Polyclinic', lat: 	1.3269, lng: 103.9320},
    { name: 'Bukit Merah Polyclinic', lat: 1.2883, lng: 103.8412},
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