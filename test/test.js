var _ = require('underscore');
var config = require('cogs/src/config');
var expect = require('chai').expect;
var getBuild = require('cogs/src/get-build');
var path = require('path');
var fs = require('fs');

var beforeEach = global.beforeEach;
var describe = global.describe;
var it = global.it;

var FIXTURES = {
  'test/config.json': {
    'test/input.txt': 'test/output.txt',
    'test/error.txt': Error
  }
};

_.each(FIXTURES, function (builds, configPath) {
  describe(configPath, function () {
    beforeEach(function () {
      config.set(require(path.resolve(configPath)));
    });
    _.each(builds, function (outputPath, inputPath) {
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
