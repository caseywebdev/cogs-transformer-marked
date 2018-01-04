const helper = require('cogs-test-helper');

helper.run({
  'test/config.json': {
    'test/input.md': helper.getFileBuffer('test/output.html')
  }
});
