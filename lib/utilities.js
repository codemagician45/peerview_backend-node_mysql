'use strict';

const path = require('path');

const isJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }

  return true;
};

const root = (() => {
  let pathDir = `$dirname`;
  pathDir = path.dirname(pathDir);

  return pathDir;
})();

module.exports.isJsonString = isJsonString;
module.exports.root = root;
