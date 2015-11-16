'use strict';

const readline = require('readline');
const fs = require('fs');
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

function findInDict(word) {
  return new Promise((resolve, reject) => {
    new Promise(function(resolve, reject) {
      let rl = readline.createInterface({
        input: fs.createReadStream('data/cmudict.txt')
      });

      rl.on('line', line => {
        line = line.split(' ');

        if (line[0] === word) {
          resolve({
            word: line.shift(),
            symbols: line
          });
        }
      });

      rl.on('close', () => {
        reject('No rhymes.');
      });
    }).then(word => {
      let rhymes = [];
      let rhyme = {};

      let rl = readline.createInterface({
        input: fs.createReadStream('data/cmudict.txt')
      });

      rl.on('line', line => {
        line = line.split(' ');

        rhyme = {
          word: line.shift(),
          symbols: line
        };

        if (word.symbols.slice(-3).join() === rhyme.symbols.slice(-3).join()) {
          rhyme.word = rhyme.word.replace(/[^a-zA-Z]/g, "");
          if (word.word !== rhyme.word) {
            rhymes.push(rhyme);
          }
        }
      });

      rl.on('close', () => {
        if (rhymes.length > 0) {
          resolve(rhymes);
        }
        reject('No rhymes.');
      });
    }).catch(err => {
      reject(err);
    });
  });
}

function getRhyme(word) {
  return new Promise((resolve, reject) => {
    findInDict(word)
      .then(rhymes => {
        let favorableRhymes = [];

        rhymes.forEach(rhyme => {
          if (rhyme.word.length > 3 && isNoun(rhyme.word)) {
            favorableRhymes.push(rhyme);
          }
        });

        let r;
        if (favorableRhymes.length > 0) {
          r = util.randomElement(favorableRhymes);
        } else {
          r = util.randomElement(rhymes);
        }

        r = r.word.toLowerCase();
        resolve(r);
      }).catch(err => {
        reject(err);
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
