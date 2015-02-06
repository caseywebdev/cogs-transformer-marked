var config = require('cogs/src/config');
var crypto = require('crypto');
var expect = require('chai').expect;
var fs = require('fs');
var getBuild = require('cogs/src/get-build');
var path = require('path');

var beforeEach = global.beforeEach;
var describe = global.describe;
var it = global.it;

var getHash = function (buffer) {
  var hash = crypto.createHash('md5');
  hash.end(buffer);
  return hash.read().toString('hex');
};

var getFileHash = function (filePath) {
  return getHash(fs.readFileSync(filePath));
};

var FIXTURES = {
  'test/config.json': {
    'test/input.txt': {
      path: 'test/input.txt',
      buffer: fs.readFileSync('test/output.txt'),
      hash: getFileHash('test/output.txt'),
      requires: [{
        path: 'test/input.txt',
        hash: getFileHash('test/input.txt')
      }],
      links: [],
      globs: []
    },
    'test/error.txt': Error
  }
};

Object.keys(FIXTURES).forEach(function (configPath) {
  var builds = FIXTURES[configPath];

  describe(configPath, function () {
    beforeEach(function () {
      config.set(require(path.resolve(configPath)));
    });

    Object.keys(builds).forEach(function (inputPath) {
      var expected = builds[inputPath];

      describe(inputPath, function () {
        var expectsError = expected === Error;

        it(expectsError ? 'fails' : 'succeeds', function (done) {
          getBuild(inputPath, function (er, build) {
            if (expectsError) expect(er).to.be.an.instanceOf(Error);
            else expect(build).to.deep.equal(expected);
            done();
          });
        });
      });
    });
  });
});
