const { saveSceneImageRoute } = require('./saveSceneImageRoute');
const { saveSceneTitleRoute } = require('./saveSceneTitleRoute');
const { saveSceneContentRoute } = require('./saveSceneContentRoute');
const {
  saveSceneImage,
  uploadImageViaCloudinary,
  deleteImageFromCloudinary,
} = require('./image');

module.exports = {
  saveSceneImage,
  saveSceneImageRoute,
  uploadImageViaCloudinary,
  saveSceneTitleRoute,
  saveSceneContentRoute,
  deleteImageFromCloudinary,
};
