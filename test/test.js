var helper = require('cogs-test-helper');

helper.run({
  'test/config.json': {
    'test/input.md': {
      path: 'test/input.md',
      buffer: helper.getFileBuffer('test/output.html'),
      hash: helper.getFileHash('test/output.html'),
      requires: [{
        path: 'test/input.md',
        hash: helper.getFileHash('test/input.md')
      }],
      links: [],
      globs: []
    }
  }
});
