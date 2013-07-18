var stringify = require('ndarray-json').stringify
var parse = require('ndarray-json').parse
var isndarray = require('isndarray')

module.exports = storage

function storage(db, field, options) {
  options = options || {}

  var index = options.index || defaultIndexer
  var store = { index: index }

  field.getter = wrapGetter(db, field.getter, store)

  store.saveall = saveall
  function saveall() {
    field.each(save)
  }

  store.save = save
  function save(chunk) {
    db.put(index(chunk.position), stringify(chunk))
  }

  return store
}

function defaultIndexer(position) {
  return position.join(':')
}

function wrapGetter(db, fn, store) {
  return function getter(position, done) {
    var key = store.index(position)
    var self = this

    db.get(key, function(err, stored) {
      if (stored) return done(null, parse(stored))

      return fn.call(self, position, function(err, generated) {
        if (err) return done(err)

        db.put(key, stringify(generated), function(err) {
          done(err, generated)
        })
      })
    })
  }
}
