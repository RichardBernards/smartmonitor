'use strict';
process.stdin.resume();
process.stdin.setEncoding('utf8');
var util = require('util');

const os = require('os');

var lifxObj = require('lifx-api');
var lifx = new lifxObj("__ACCESSTOKEN__");

var duration = 2.0;
var power_on = true;

process.stdin.on('data', function(text) {
	var cmdString = text.replace(os.EOL, '')
	var cmdSplit = cmdString.split(' ');
	switch(cmdSplit[0]) {
		case 'quit':
			done();
			break;
		case 'listLights':
			listLights(cmdSplit);
			break;
		case 'setColor':
			setColor(cmdSplit);
			break;
		case 'togglePower':
			togglePower(cmdSplit);
			break;
		case 'setState':
			setState(cmdSplit);
			break;
		case 'breatheEffect':
			breatheEffect(cmdSplit);
			break;
		case 'pulseEffect':
			pulseEffect(cmdSplit);
			break;
		case 'listScenes':
			listScenes();
			break;
		case 'set':
			switch(cmdSplit[1]) {
				case 'duration':
					console.log('old duration', duration);
					duration = cmdSplit[2];
					console.log('new duration', duration);
					break;
				case 'power_on':
					console.log('old power_on', power_on);
					power_on = (cmdSplit[2] == 'true' ? true : false);
					console.log('new power_on', power_on);
					break;
				default:
					console.log('no option for set, valid options are: duration, power_on');
					break;
			}
			break;
		case 'get':
			switch(cmdSplit[1]) {
				case 'duration':
					console.log('duration', duration);
					break;
				case 'power_on':
					console.log('power_on', power_on);
					break;
				default:
					console.log('no option for get, valid options are: duration, power_on');
					break;
			}
			break;
		default:
			console.log('VALID INPUTS:', os.EOL, os.EOL,
				'listLights [selector]', os.EOL,
				'setColor *color [selector] #ff0000 | red | kelvin:2900 | hue:120', os.EOL,
				'togglePower [selector]', os.EOL,
				'setState *state [selector] -- on | off', os.EOL,
				'breatheEffect *color [selector]', os.EOL,
				'pulseEffect *color [selector]', os.EOL,
				'listScenes', os.EOL,
				'set [help]', os.EOL,
				'get [help]', os.EOL,
				'quit', os.EOL);
			break;
	}
});

function listScenes() {
	lifx.listScenes(function(response) {
		var json = JSON.parse(response);
		console.log(json);
		console.log(os.EOL);
	});
}

function listLights(args) {
	var selector = 'all';
	if (args.length > 1) { selector = args[1]; }
	lifx.listLights(selector, function(response) {
		var json = JSON.parse(response);
		for (var i = 0; i < json.length; i++) {
			var light = json[i];
			console.log('new light', light);
		}
		console.log(os.EOL);
	});
}

function setColor(args) {
	var selector = 'all';
	if (args.length > 2) { selector = args[2]; }	
	lifx.setColor(selector, args[1], duration, power_on, function(response) {
		var json = JSON.parse(response);
		console.log(json);
		console.log(os.EOL);
	});
}

function togglePower(args) {
	var selector = 'all';
	if(args.length > 1) { selector = args[1]; }
	lifx.togglePower(selector, function(response) {
		var json = JSON.parse(response);
		console.log(json);
		console.log(os.EOL);
	});
}

function setState(args) {
	var selector = 'all';
	if (args.length > 2) { selector = args[2]; }	
	lifx.setState(selector, args[1], duration, function(response) {
		var json = JSON.parse(response);
		console.log(json);
		console.log(os.EOL);
	});
}

function breatheEffect(args) {
	var selector = 'all';
	if (args.length > 2) { selector = args[2]; }
	lifx.breatheEffect(selector, args[1], function(response) {
		var json = JSON.parse(response);
		console.log(json);
		console.log(os.EOL);
	});
}

function pulseEffect(args) {
	var selector = 'all';
	if (args.length > 2) { selector = args[2]; }
	lifx.pulseEffect(selector, args[1], function(response) {
		var json = JSON.parse(response);
		console.log(json);
		console.log(os.EOL);
	});
}






function done() {
	process.exit();
}
