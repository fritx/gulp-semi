var semi = require('../');
var should = require('should');
var path = require('path');
var File = require('gulp-util').File;
var Buffer = require('buffer').Buffer;
require('mocha');

describe('gulp-semi', function () {
  describe('semi()', function () {
    var input;

    input = ['var a=1\nvar b=2'];
    testFiles(semi.add(), input, ['var a=1;\nvar b=2;']);

    input = ['var a=1;\nvar b=2;'];
    testFiles(semi.remove(), input, ['var a=1\nvar b=2']);
    

    function testFiles(stream, contentses, results) {
      it('should semi one or several files', function (done) {
        var count = 0;
        stream.on('data', function (newFile) {
          should.exist(newFile);
          should.exist(newFile.contents);

          var newFileIndex = newFile.index;

          String(newFile.contents).should.equal(results[newFileIndex]);
          Buffer.isBuffer(newFile.contents).should.equal(true);

          if (++count === contentses.length) done();
        });

        contentses.forEach(function (contents, i) {
          var file = new File({
            cwd: '/home/contra/',
            base: '/home/contra/test',
            path: '/home/contra/test/file' + i + '.js',
            contents: new Buffer(contents)
          });
          file.index = i;
          stream.write(file);
        });

        stream.end();
      });
    }
  });
});
