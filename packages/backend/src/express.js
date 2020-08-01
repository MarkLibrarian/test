const { path } = require('ramda');
const { ArgumentError } = require('ow');
const HttpStatus = require('http-status-codes');

const getBody = (req) => req.body;
const getPathParameter = (name) => path(['params', name]);
const getQueryParameter = (name) => path(['query', name]);

function errorHandlerForArgumentError() {
  return (err, req, res, next) => {
    if (err instanceof ArgumentError) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: err.message,
      });
    } else {
      next(err);
    }
  };
}

function errorHandlerForAnyOtherError() {
  return (err, req, res, _next) => {
    res.format({
      json: () => {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: err.message });
      },
      default: () => {
        res.status(HttpStatus.NOT_ACCEPTABLE).send();
      },
    });
  };
}

module.exports = {
  getBody,
  getPathParameter,
  getQueryParameter,
  errorHandlerForArgumentError,
  errorHandlerForAnyOtherError,
};
