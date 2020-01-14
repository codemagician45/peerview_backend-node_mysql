'use strict';

const jwt = require('jwt-simple');

function encode (payload, secret/*this will be the token associated to user*/) {
  let encode = jwt.encode(payload, secret);

  return encode;
}

function decode (token, secret) {
  let decoded = jwt.decode(token, secret);

  return decoded;
}

module.exports.encode = encode;
module.exports.decode = decode;
