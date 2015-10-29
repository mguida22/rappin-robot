'use strict';

require('dotenv').load();
const rap = require('./rap');

rap.lyrics().then(lyrics => {
  console.log(lyrics);
}).catch(err => {
  console.log(err);
});
