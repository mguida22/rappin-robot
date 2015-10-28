'use strict';

require('dotenv').load();
const got = require('got');
const pos = require('pos');

const nounCodes = ['NN', 'NNP', 'NNS', 'NNPS'];

function randomElement(arr) {
  return arr[Math.floor(Math.random()*arr.length)];
}

function isNoun(word) {
  let tagger = new pos.Tagger();
  word = tagger.tag([word]);
  if (nounCodes.indexOf(word[0][1]) > -1) {
    return true;
  }
  return false;
}

function getSentences() {
  return new Promise((resolve, reject) => {
    got('http://metaphorpsum.com/sentences/20')
      .then(response => {
        let sentences = [];
        response.body.split('.').forEach(sentence => {
          if (sentence && sentence.length < 60 && sentence.indexOf(';') === -1) {
            sentences.push(sentence);
          }
        });
        return resolve(sentences);
      }).catch(err => {
        reject(err.response.body);
      }
    );
  });
}

function getRhyme(word) {
  let url = `http://api.wordnik.com:80/v4/word.json/${word}/relatedWords?useCanonical=false&relationshipTypes=rhyme&limitPerRelationshipType=100&api_key=${process.env.API_KEY}`;
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
          r = randomElement(favorableRhymes);
        } else {
          r = randomElement(rhymes);
        }
        r = r.toLowerCase();
        resolve(r);
      }).catch(err => {
        reject(err.response.body);
      }
    );
  });
}

getSentences().then(sentences => {
  let firstSentence = randomElement(sentences);
  let secondSentence = firstSentence;
  while (firstSentence === secondSentence) {
    secondSentence = randomElement(sentences);
  }

  firstSentence = firstSentence.split(' ');
  secondSentence = secondSentence.split(' ');
  let endWord = firstSentence[firstSentence.length - 1];

  getRhyme(endWord).then(rhyme => {
    console.log(firstSentence.join(' '));
    secondSentence[secondSentence.length - 1] = rhyme;
    console.log(secondSentence.join(' '));
  }).catch(err => {
    console.log(err);
  });
});
