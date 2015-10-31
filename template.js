'use strict';

const Sentencer = require('sentencer');
const templates = require('./templates');

let s = Sentencer.make(templates[0]);

console.log(s);

function sentence() {

}

module.exports = {
  sentence
};
