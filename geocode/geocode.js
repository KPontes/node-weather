const request = require('request');

var geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);
  var uri = 'http://maps.googleapis.com/maps/api/geocode/json?address=' + encodedAddress;

  request({
    url: uri,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Google servers');
    } else if (body.status !== 'OK') {
      callback(`Error returned: ${body.status}`);
    } else {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    }
  });
};

module.exports.geocodeAddress = geocodeAddress;
