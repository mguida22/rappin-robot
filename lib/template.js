'use strict';

const Sentencer = require('sentencer');
const templates = require('../data/templates');
const util = require('./utility');

function sentence() {
  let template = util.randomElement(templates);
  return Sentencer.make(template);
}

module.exports = {
  sentence
};
