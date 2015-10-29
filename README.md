# rappin-robot

A robot that raps.

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

Note: this project requires node 4.0+

### Install
```
$ git clone <repo>
$ cd rappin-robot
$ npm install
```

### Add .env

Create a `.env` file in the root directory and add the [api](http://developer.wordnik.com/) key in the following format:

```
API=<your-api-key-here>
```

### Run

```
$ node main.js
```

## License
MIT

This project makes heavy use of apis and work provided by:
- [kylestetz/metaphorpsum](https://github.com/kylestetz/metaphorpsum)
- [dariusk/pos-js](https://github.com/dariusk/pos-js)
- [wordnik.com](https://www.wordnik.com/)
