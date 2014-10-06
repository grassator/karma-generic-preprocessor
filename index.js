var minimatch = require('minimatch');
var reduce = require('async-reduce');

function factory(args, config, logger, basePath) {
  "use strict";
  config = config || {};
  var rules = config.rules || [];
  var log = logger.create("preprocessor.generic");

  return function preprocess(content, file, done) {
    var relativePath = file.originalPath.replace(basePath + '/', '');
    reduce(rules, content, function step(prevContent, rule, callback) {
      var pattern = rule.match || "**/*";
      var next = callback.bind(null, null);
      if (minimatch(relativePath, pattern)) {
        try {
          rule.process(prevContent, file, next, log);
        } catch (e) {
          log.error('%s\n  for file %s', e.message, file.originalPath);
          done(e, null);
        }
      } else {
        next(prevContent);
      }
    }, function (err, result) {
      done(result);
    });
  };
};

factory.$inject = [
  "args", "config.genericPreprocessor", "logger", "config.basePath"
];

module.exports = {
  "preprocessor:generic": ["factory", factory]
};
