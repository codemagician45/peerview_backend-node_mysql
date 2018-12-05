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

const assignNullIfUndefined = (value) => {
  if (!value) {
    return null;
  }

  return value;
};

const root = (() => {
  let pathDir = `$dirname`;
  pathDir = path.dirname(pathDir);

  return pathDir;
})();

module.exports.isJsonString = isJsonString;
module.exports.assignNullIfUndefined = assignNullIfUndefined;
module.exports.root = root;
