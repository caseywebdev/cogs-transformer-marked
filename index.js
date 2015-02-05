module.exports = function (file, options, cb) {
  var source = file.buffer.toString();
  if (source.indexOf(options.errorText) > -1) return cb(new Error('No good!'));
  cb(null, {buffer: new Buffer('bar\n')});
};
