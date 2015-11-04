'use strict';

const Sentencer = require('sentencer');
// const syllable = require('syllable');

const templates = require('../data/templates');
const util = require('./utility');

function makeSentences(n) {
  let sentences = [];
  for (let i = 0; i < n; i++) {
    let template = util.randomElement(templates);
    sentences.push(Sentencer.make(template));
  }

  return sentences;
}

module.exports = {
  makeSentences
};
