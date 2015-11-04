'use strict';

const got = require('got');
const pos = require('pos');

const util = require('./utility');
const sentence = require('./sentence');

const nounCodes = ['NN', 'NNP', 'NNS', 'NNPS'];

function isNoun(word) {
  let tagger = new pos.Tagger();
  word = tagger.tag([word]);
  if (nounCodes.indexOf(word[0][1]) > -1) {
    return true;
  }
  return false;
}

function getRhyme(word) {
  let url = `http://api.wordnik.com:80/v4/word.json/${word}/relatedWords?useCanonical=false&relationshipTypes=rhyme&limitPerRelationshipType=100&api_key=${process.env.WORDNIK_API_KEY}`;
  return new Promise((resolve, reject) => {
    got(url)
      .then(response => {
        let data = JSON.parse(response.body)[0];
        if (data === undefined) {
          reject('no rhymes');
        }

        let favorableRhymes = [];
        let rhymes = data.words;
        rhymes.forEach(rhyme => {
          if (rhyme.length > 3 && isNoun(rhyme)) {
            favorableRhymes.push(rhyme);
          }
        });
        let r;
        if (favorableRhymes.length > 0) {
          r = util.randomElement(favorableRhymes);
        } else {
          r = util.randomElement(rhymes);
        }
        r = r.toLowerCase();
        resolve(r);
      }).catch(err => {
        reject(err.response.body);
      }
    );
  });
}

function lyrics() {
  return new Promise(function(resolve, reject) {
    let firstSentence, secondSentence, endWord;

    let sentences = sentence.makeSentences(2);

    firstSentence = sentences[0].split(' ');
    secondSentence = sentences[1].split(' ');
    endWord = firstSentence[firstSentence.length - 1];

    getRhyme(endWord).then(rhyme => {
      firstSentence = firstSentence.join(' ');
      secondSentence[secondSentence.length - 1] = rhyme;
      secondSentence = secondSentence.join(' ');

      resolve([
        firstSentence,
        secondSentence
      ]);
    }).catch(err => {
      reject(err);
    });
  });
}

module.exports = {
  lyrics
};
