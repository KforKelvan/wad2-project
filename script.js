// Function to initialize the map
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: YOUR_LATITUDE, lng: YOUR_LONGITUDE }, // Set the initial center of the map
        zoom: 12, // Set the initial zoom level
    });

    // Add markers
    var marker = new google.maps.Marker({
        position: { lat: MARKER_LATITUDE, lng: MARKER_LONGITUDE },
        map: map,
        title: 'Marker Title',
    });
}
