'use strict';

// RUN "npm install dark-sky --save" beforehand

const DarkSky = require('dark-sky')
const forecast = new DarkSky('9df7637b6c5e1384d9313c3393da2cd6')

forecast
    .latitude('37.8267')            // required: latitude, string.
    .longitude('-122.423')          // required: longitude, string.
    .time('2016-01-28')             // optional: date, string 'YYYY-MM-DD'.
    .units('ca')                    // optional: units, string, refer to API documentation.
    .language('en')                 // optional: language, string, refer to API documentation.
    .exclude('minutely,daily')      // optional: exclude, string, refer to API documentation.
    .extendHourly(true)             // optional: extend, boolean, refer to API documentation.
    .get()                          // execute your get request.
    .then(res => {                  // handle your success response.
        console.log(res)
    })
    .catch(err => {                 // handle your error response.
        console.log(err)
    })