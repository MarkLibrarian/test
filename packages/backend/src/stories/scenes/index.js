const { saveSceneImageRoute } = require('./saveSceneImageRoute');
const { saveSceneTitleRoute } = require('./saveSceneTitleRoute');
const { saveSceneContentRoute } = require('./saveSceneContentRoute');
const { saveSceneImage, uploadImageViaCloudinary } = require('./image');

module.exports = {
  saveSceneImage,
  saveSceneImageRoute,
  uploadImageViaCloudinary,
  saveSceneTitleRoute,
  saveSceneContentRoute,
};
