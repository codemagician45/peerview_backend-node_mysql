'use strict';

var defaults = require(__dirname + '/defaults');
var environment = process.env.NODE_ENV;
var activeConfig;

try {
  activeConfig = require(__dirname + '/' + environment);
} catch (e) {
  if (/Cannot find module/i.test(e.message)) {
    console.error('\t=============== ¡Warning! ===============\n\n'
                  + '  There is no matching configuration for Node environment %j\n'
                  + '  Using default configurations. See config/index.js for details.\n'
                  + '\t=========================================\n',
                  environment);
    activeConfig = defaults;
  } else {
    console.error(e.stack);
    process.exit(1);
  }
}

module.exports = activeConfig;
