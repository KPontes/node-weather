const yargs = require('yargs');
const geocode = require('./geocode/geocode.js')

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
    console.log(JSON.stringify(results, undefined, 2));
  }
});
