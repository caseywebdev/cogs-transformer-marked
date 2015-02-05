var config = require('cogs/src/config');
var expect = require('chai').expect;
var fs = require('fs');
var getBuild = require('cogs/src/get-build');
var path = require('path');

var beforeEach = global.beforeEach;
var describe = global.describe;
var it = global.it;

var FIXTURES = {
  'test/config.json': {
    'test/input.txt': 'test/output.txt',
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
      var outputPath = builds[inputPath];

      describe(inputPath, function () {
        var expectsError = outputPath === Error;

        it(expectsError ? 'fails' : 'succeeds', function (done) {
          getBuild(inputPath, function (er, build) {
            if (expectsError) expect(er).to.be.an.instanceOf(Error);
            else {
              if (er) return done(er);
              var output = fs.readFileSync(outputPath);
              expect(build.buffer).to.deep.equal(output);
            }
            done();
          });
        });
      });
    });
  });
});
