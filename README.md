# continuous-storage [![experimental](https://rawgithub.com/hughsk/stability-badges/master/dist/experimental.svg)](http://github.com/hughsk/stability-badges) #

Store a continuous ndarray in a [level](http://github.com/level) database -
using either [levelup](http://github.com/rvagg) with Node or
[level.js](http://github.com/maxogden/level.js) in the browser.

Example incoming in the
[topdown-physics demo](http://hughsk.github.io/topdown-physics).

## Installation ##

``` bash
npm install continuous-storage
```

## Usage ##

### `store = storage(db, field[, options])` ###

Creates a store instance for your database and continuous array:

* `db` is a [level](http://github.com/level) database.
* `field` is the continuous ndarray you want to store.

With the following options:

* `options.index` is a function which maps a position array to a
  string key for each chunk in the database. Defaults to
  `position.join(':')`.

### `store.saveall()` ###

Saves all of the currently instantiated chunks to the database.

### `store.save(chunk)` ###

Saves a chunk to the database.
