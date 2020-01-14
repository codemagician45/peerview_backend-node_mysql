
function returnValue (value) {
  if (!value
    || value === 'undefined'
    || value === null
    || value === 'null') {
    return undefined;
  }

  return value;
}

module.exports.returnValue = returnValue;