'use strict';

const fs = require('fs');
const pug = require('pug');

function convertPug (file, values) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (error, content) => {
      if (error) {
        return reject(error);
      } else {
        const compiledToPug = pug.compile(content, {
          filename: file
        });
        const html = compiledToPug(values);
        return resolve(html);
      }
    });
  });
}

module.exports.convert = convertPug;
