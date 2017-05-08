const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather.js');

const argv = yargs
  .options({
    a:{
      demand: true,
      alias: 'address',
      discribe: 'address to fetch weather for',
      string:true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage){
    console.log(errorMessage);
  } else {
    console.log(results.address);
    weather.getweather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
      if (errorMessage){
        console.log(errorMessage);
      } else {
        console.log(`It's currently ${weatherResults.temperature}, It feels like ${weatherResults.apparent}`);
      }
    });
  }
});
