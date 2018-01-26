const request = require('request');

var getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/2f6097639160d21e9c88f7f4c94662ee/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    debugger;
    if (error) {
      callback('Unable to connect to forecast.io servers');
    } else if (response.statusCode !== 200) {
      callback('Unable to fetch weather');
    } else {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    }
  });
};

module.exports.getWeather = getWeather;
