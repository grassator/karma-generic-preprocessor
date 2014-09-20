# karma-generic-preprocessor

Provides a way to define preprocessors inline in the karma configuration
files. This can be very handy in some situations, for example:

  * URL rewriting
  * using exotic JS / CSS preprocessors without having to write dedicated plugin
  * whatever else you decide to do :)

## Installation

``` bash
npm install karma-generic-preprocessor --save
```

**Note:** Karma will automatically see and include plugins whose names start with `karma-*`. However, it is possible that, in your IDE or console configurations, you're running Karma as a global Node module. In that case, you'll have to install this plugin too globally, i.e

``` bash
npm install karma-generic-preprocessor -g
```

## Configuration and Usage

``` js
// karma.conf.js
module.exports = function(config) {
  config.set({
    preprocessors: {
      // it's probably best to keep this as generic as possible
      // since `karma-generic-preprocessor` has it's own matcher
      '**/*': ['generic'] 
    },
    genericPreprocessor: {
      rules: [{
        match: "*.coffee",
        // almost  same as karam-coffee-preprocessor
        process: function (content, file, basePath, done, log) {
          file.path = file.originalPath.replace(/\.coffee$/g, '.js');
          try {
            done(coffee.compile(content));
          } catch (e) {
            log.error('%s\n  at %s', e.message, file.originalPath);
          }
        }
      }, {
        // if no match is specified all the files matched by
        // `preprocessors` config above will be processed
        process: function (content, file, basePath, done, log) {
          log.debug('Processing "%s".', file.originalPath);
          done(content);
        }
      }]
    }
  })
}
```

## LICENSE

Available under MIT style license.
