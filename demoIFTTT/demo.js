'use strict';

// RUN "npm install iftttmaker --save" beforehand

var apiKey = 'VJWqWLSLX3gfbvhR1bmYfi';
var IFTTTMaker = require('iftttmaker')(apiKey);
 
IFTTTMaker.send('notify', 'hello', 'world').then(function () {
  console.log('Request was sent');
}).catch(function (error) {
  console.log('The request could not be sent:', error);
});