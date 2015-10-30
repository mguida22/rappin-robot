'use strict';

require('dotenv').load();
const rap = require('./rap');
const Twit = require('twit');

let T = new Twit({
  consumer_key:         process.env.T_CONSUMER_KEY,
  consumer_secret:      process.env.T_CONSUMER_SECRET,
  access_token:         process.env.T_ACCESS_TOKEN,
  access_token_secret:  process.env.T_ACCESS_TOKEN_SECRET
});

rap.lyrics().then(lyrics => {
  let tweet;

  tweet = lyrics[0] + "\n" + lyrics[1];

  T.post('statuses/update', { status: tweet }, function(err, data) {
    if (err) {
      console.log(err);
    }
    console.log(data.text);
  });
}).catch(err => {
  console.log(err);
});
