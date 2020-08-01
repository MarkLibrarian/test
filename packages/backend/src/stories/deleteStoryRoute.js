const Express = require('express');
const HttpStatus = require('http-status-codes');

const { getPathParameter } = require('../express');
const { validateRequest } = require('./validation');
const { validateStoryId } = require('./validation/story');

const getStoryId = getPathParameter('storyId');

function deleteStoryRoute(deleteStory) {
  return Express.Router().delete(
    '/story/:storyId',
    validateRequest(validateStoryId(getStoryId)),
    (req, res) => {
      const id = Number.parseInt(getStoryId(req), 10);

      return deleteStory(id).then(() => res.status(HttpStatus.OK).json());
    }
  );
}

module.exports = {
  deleteStoryRoute,
};
