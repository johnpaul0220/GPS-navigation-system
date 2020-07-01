function addMarker(lat, lng) {
  var marker = new google.maps.Marker({
    position: { lat: lat, lng: lng },
    map: map,
    title: "current position"
  });
}
function displayRoute(directionsService, directionsRenderer, dash) {
  var e_lat = dash.lat;
  var e_lon = dash.lon;
  var s_lat = dash.curr_lat;
  var s_lon = dash.curr_lng;
  directionsService.route(
    {
      origin: { lat: s_lat, lng: s_lon },
      destination: { lat: e_lat, lng: e_lon },
      travelMode: "DRIVING"
    },
    function(response, status) {
      console.log("test");
      if (status === "OK") {
        directionsRenderer.setDirections(response);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
}
function locationPointer(lat, lng, map, circle) {
  map.setCenter({
    lat: lat,
    lng: lng
  });
  circle.setCenter({
    lat: lat,
    lng: lng
  });
}
function requestGeofence(layerId, position) {
  return new Promise((resolve, request) => {
    geofencing.request(
      H.service.extension.geofencing.Service.EntryPoint.SEARCH_PROXIMITY,
      {
        apikey: "uD6iDXLk6zPGnHxXg1t-XiieVFHvac2CWGixV8RdJdE",
        layer_ids: layerId,
        proximity: position.lat + "," + position.lng,
        key_attributes: ["NAME"]
      },
      result => {
        resolve(result);
      },
      error => {
        reject(error);
      }
    );
  });
}

function sendMessage(receiver, message) {
  return new Promise((resolve, reject) => {
    fetch("/sendMessage", {
      method: "post",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        receiver: receiver,
        message: message
      })
    })
      .then(resolve(result))
      .catch(reject(err));
  });
}
