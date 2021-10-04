// Creating the map object
var myMap = L.map("map", {
    center: [34.047422, -84.11828],
    zoom: 3
  });

//   34.04742264246289, -84.11828365745794

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


// var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson"
// Past 7 days Significant earthqueakes
// var url ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson"
var url ;
// Significant last 30 days
url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"
// all for last 30 months.
// url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"


// Get the data with d3.
d3.json(url).then(function(response) {
    
    // console.log(response);
    
    var features = response.features;
    // console.log("features lenght: " + features.length);
    

    // Create a new marker cluster group.
    var markers = L.markerClusterGroup();

    // Loop through the data.
    for (var i = 0; i < features.length; i++) {
    // console.log(" am in teh loop")
    
    
    // Set the data location property to a variable.
    
    var geometry = features[i].geometry;
    var properties = features[i].properties;
    // console.log("setting geometry object to " + geometry);

    // Check for the location property.
    if (geometry) {
        // console.log(properties);
        title = properties.title;
        // console.log(title);
        markers.addLayer(L.marker([geometry.coordinates[1], geometry.coordinates[0]])
        .bindPopup(title));
    }
}

// Add our marker cluster layer to the map.
myMap.addLayer(markers);

});