const request = require('request');

var getweather = (x, y, callback) => {
  request({
    url:`https://api.darksky.net/forecast/ac874d8b528d7e231d6590beb9c871c2/${x},${y}`,
    json:true
  },(error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, { temperature: body.currently.temperature,
                            apparent: body.currently.apparentTemperature});
    } else {
      callback('Unable to fetch weather');
    }
  });
}

module.exports = {
  getweather
}
