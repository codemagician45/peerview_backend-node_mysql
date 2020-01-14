const crypto = require('crypto');

function cipher (value) {
  let cipher = crypto.createCipher('aes192', 'sample cipher here');
  let encrypted = cipher.update(value.toString(), 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return encrypted;
}

function decipher (value) {
  let decipher = crypto.createDecipher('aes192', 'sample cipher here');
  let decrypted = decipher.update(value.toString(), 'hex', 'utf8');

  decrypted += decipher.final('utf8');
  return decrypted;
}

module.exports.cipher = cipher;
module.exports.decipher = decipher;