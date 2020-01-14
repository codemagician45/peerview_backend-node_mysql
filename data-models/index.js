'use strinct';

const path = require('path');
const fs = require('fs');

// IGNORE: Any file in the models/ directory that should be ignored
// when exporting this package.
const IGNORE = [
  'index.js',
  'user-category.js'
];

// MODELS_DIR: Static constant
const MODELS_DIR = path.resolve(__dirname, '.');

// files: We'll export each one of these that aren't marked for ignoring.
const files = fs.readdirSync(MODELS_DIR).filter(function (directory) {
  return (IGNORE.indexOf(directory) == -1);
});

files.forEach(function (filename) {
  let modelName = camelCase(filename).slice(0, -2);
  module.exports[modelName] = path.resolve(MODELS_DIR, filename);
});

// camelCase :: String -> String
function camelCase (str) {
  let words = str.split(/\W+/).map(function (word) {
    return word.toLowerCase();
  });

  let jsString = words.shift();

  while (words.length) {
    let word = words.shift();
    jsString += word.slice(0, 1).toUpperCase() + word.slice(1);
  }

  return jsString;
}
