'use strict';
// const https = require('https');
const axios = require('axios');
/**
 * @author Sid
 * @description get link preview
 */

const lib = require('../../lib');

/**
 * Validation of req.body, req, param,
 * and req.query
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function validateParams (req, res, next) {
  let paramsSchema = {
    url: {
      notEmpty: {
        errorMessage: 'Missing Resource: url String'
      }
    }
  };

  req.checkParams(paramsSchema);
  return req.getValidationResult()
  .then(validationErrors => {
    if (validationErrors.array().length !== 0) {
      return res.status(400)
      .send(new lib.rpc.ValidationError(validationErrors.array()));
    }

    return next();
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));
  });
}

const getData = async url => {
  return axios.get(url);
};
/**
 * get json data of url
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function logic (req, res, next) {
  let url = `&q=${req.$params.url}`;

  getData(`https://api.linkpreview.net/?key=5a2e292e7d25bb63a2d3b4c63524cd10abe39420dc68c${url}`)
  .then(res => {
    req.$scope.responseArray = res.data;
    return next();
  }).catch(err => {
    res.status(500).send(new lib.rpc.InternalError(err));
  });
  // https.get(`https://api.linkpreview.net/?key=5b54e80a65c77848ceaa4630331e8384950e09d392365${url}`, (resp) => {
  //   let data = '';

  //   // A chunk of data has been recieved.
  //   resp.on('data', (chunk) => {
  //     data += chunk;
  //   });

  //   // The whole response has been received. Print out the result.
  //   let responseArray;
  //   resp.on('end', () => {
  //     responseArray = JSON.parse(data).explanation;
  //     next();
  //     req.$scope.responseArray = responseArray;
  //   });
  // }).on('error', (err) => {
  //   res.status(500).send(new lib.rpc.InternalError(err));
  // });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let data = req.$scope.responseArray;

  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    data: data
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = logic;
module.exports.response = response;
