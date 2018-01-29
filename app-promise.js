const yargs = require('yargs');
const axios = require('axios');

var argv = yargs.options({
  a: {
    describe: 'Address to fetch weather for',
    demand: true,
    alias: 'address',
    string: true
  }
})
.help()
.alias('help', 'h')
.argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = 'http://maps.googleapis.com/maps/api/geocode/json?address=' + encodedAddress;

axios.get(geocodeUrl).then((response) => {
  debugger;
  if (response.data.status !== 'OK') {
    throw new Error('Error: ' + response.data.status);
  }
  //this lines only executed if error is not throwed
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.darksky.net/forecast/2f6097639160d21e9c88f7f4c94662ee/${lat},${lng}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It is currently ${temperature} but feels like ${apparentTemperature}`);
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unale to connect to to API server');
  } else {
    console.log(e.message);
  }
});
