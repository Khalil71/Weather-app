const yargs = require('yargs');
const axios = require('axios');

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

var encodedAddess = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddess}`;
axios.get(geocodeUrl).then((response) =>{
  if (response.data.status === 'ZERO_RESULTS'){
    throw new Error('Unable to find that address');
  }
  var x = response.data.results[0].geometry.location.lat,
      y = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.darksky.net/forecast/ac874d8b528d7e231d6590beb9c871c2/${x},${y}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response) => {
  var temp = response.data.currently.temperature,
      apprent = response.data.currently.apparentTemperature;
console.log(`It's currently ${temp}, It feels like ${apprent}`);
}).catch((e) => {
  if (e.code === 'ENOTFOUND'){
    console.log('unable to connect to api servers');
  } else {
    console.log(e.message);
  }
});
