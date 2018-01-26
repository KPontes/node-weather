const yargs = require('yargs');
const geocode = require('./geocode/geocode.js')
const weather = require('./weather/weather.js')

var argv = yargs.options({
  a: {
    describe: 'Address to fetch weather for',
    demand: true,
    alias: 'adress',
    string: true
  }
})
.help()
.alias('help', 'h')
.argv;

geocode.geocodeAddress(argv.a, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(results.address);
    weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`It is currently ${weatherResults.temperature} but feels like ${weatherResults.apparentTemperature}`);
      }
    });
  }
});
