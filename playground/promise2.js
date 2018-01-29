const request = require('request');

var geocodeAdress = (address) => {
  return new Promise((resolve, reject) => {
    var encodedAddress = encodeURIComponent(address);
    var uri = 'http://maps.googleapis.com/maps/api/geocode/json?address=' + encodedAddress;

    request({
      url: uri,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject('Unable to connect to Google servers');
      } else if (body.status !== 'OK') {
        reject(`Error returned: ${body.status}`);
      } else {
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
      }
    });
  });
}

geocodeAdress('18521').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
  console.log(errorMessage);
});
