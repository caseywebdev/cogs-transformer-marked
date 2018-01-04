const marked = require('marked');

module.exports = ({file: {buffer}, options}) => ({
  buffer: new Buffer(marked.setOptions(options)(buffer.toString()))
});
