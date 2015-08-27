'use strict';

var through = require('through2');
var PluginError = require('gulp-util').PluginError;
var semi = require('semi');

exports.add = create(semi.add);
exports.remove = create(semi.remove);

function create(fn) {

  return function (options) {

    return through.obj(function (file, enc, cb) {
      if (file.isStream()) {
        this.emit('error', new PluginError('gulp-semi', 'Streaming not supported'));
        return cb();
      }

      if (file.isBuffer()) {
        try {
          var str = file.contents.toString();
          str = fn(str, options);
          file.contents = new Buffer(str);
        } catch (e) {
          this.emit('error', e);
        }
      }

      this.push(file);
      cb();
    });
  };
  
}
