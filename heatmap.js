var map;
function initialize() {

    var sanFrancisco = new google.maps.LatLng(37.7835, -122.441);

    var lima = new google.maps.LatLng(-12.100757399999999, -77.0275498);

    var canvas = document.getElementById('map-canvas');
    var mapOptions = {
        zoom: 16,
        center : lima
    };
    map = new google.maps.Map(canvas,mapOptions);

    // Heatmap layer
    $.getJSON('http://noobe.jinme.org:8080/gas', function (data) {

        var dataLength = data.length;
        var heatMapData = [];
        for (var i = 0; i < dataLength; i++) {
            // Este el formato de datos con "peso"
            // revisar https://developers.google.com/maps/documentation/javascript/reference#WeightedLocation
            heatMapData.push({
                location: new google.maps.LatLng(data[i].pos),
                weight: data[i].weight
            });
        }

        var heatmap = new google.maps.visualization.HeatmapLayer({
            data: heatMapData
            , radius: 30
            //, opacity: 0.5
            //, gradient: gradient
        });
        heatmap.setMap(map);
    });
    
}
google.maps.event.addDomListener(window, 'load', initialize);
