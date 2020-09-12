const Express = require('express');
const HttpStatus = require('http-status-codes');

const { getPathParameter } = require('../express');
const { validateRequest } = require('./validation');
const { validateSceneId, validateImageId } = require('./validation/story');

const getSceneId = getPathParameter('sceneId');
const getImageId = getPathParameter('imageId');

function deleteImageRoute(deleteImage) {
  return Express.Router().delete(
    '/scene/:sceneId/image/:imageId',
    validateRequest(validateSceneId()(getSceneId), validateImageId(getImageId)),
    (req, res) => {
      const sceneId = Number.parseInt(getSceneId(req), 10);
      const imageId = Number.parseInt(getImageId(req), 10);

      return deleteImage({ sceneId, imageId }).then(() =>
        res.status(HttpStatus.OK).json()
      );
    }
  );
}

function deleteImage(deleteImageFromDatabase, deleteImageFromStorage) {
  return ({ sceneId, imageId }) => {
    // TODO delete image from Cloudinary
    return deleteImageFromDatabase({ sceneId, imageId });
  };
}

module.exports = {
  deleteImage,
  deleteImageRoute,
};
