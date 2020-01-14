'use strict';

const looPromise = (condition, action) => {
  return new Promise((resolve, reject) => {
    let loop = () => {
      if (!condition()) {
        return resolve();
      }

      return action()
      .then(loop)
      .catch(reject);
    };

    process.nextTick(loop);
  });
};

module.exports = looPromise;
