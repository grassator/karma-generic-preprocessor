'use strict';

module.exports = {
  'preprocessor:generic': ['factory', function() {
    return function(content, file, done) {
      done(content);
    };
  }];
};
