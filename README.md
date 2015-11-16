# rappin-robot

A [robot](https://twitter.com/rappin_robot) that raps.

## Sample Outputs

```
A description is a friction from the right perspective
A kettle is a stative retrospective

Few can name a fulgid porter that isn't a feckless slash
A restaurant is a berry from the right hash

A hydrant is a control from the right perspective
In recent years, memories are quenchless detective
```

## Setup

Note: this project requires node 4.2.1+

### Install
```
$ git clone <repo>
$ cd rappin-robot
$ npm install
```

### Add .env

Create a `.env` file in the root directory and add the [twitter credentials](https://dev.twitter.com/) key in the following format:

```
T_CONSUMER_KEY=<your_key_here>
T_CONSUMER_SECRET=<your_secret_here>
T_ACCESS_TOKEN=<your_token_here>
T_ACCESS_TOKEN_SECRET=<your_token_secret_here>
NODE_ENV=<development|production>
```

You can set the `NODE_ENV` to either `production` (tweets to your account, you will need credentials) or `development` (outputs to console, no credentials required).

### Run

```
$ node main.js
```

### Heroku

This program makes use of [heroku's scheduler](https://devcenter.heroku.com/articles/scheduler) to run one off tasks on an interval. This allows the program to automatically run every hour (only posts to twitter if it got a rhyme).

To push changes to heroku

```
$ git push heroku master
```

To manually run the task (while logged in)
```
$ heroku run worker
```

## License
MIT

This project makes heavy use of the work provided by:
- [kylestetz/Sentencer](https://github.com/kylestetz/Sentencer)
- [dariusk/pos-js](https://github.com/dariusk/pos-js)
- [cmusphinx/cmudict](https://github.com/cmusphinx/cmudict)
