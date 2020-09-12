const Postgres = require('pg');
const Config = require('config');
const Express = require('express');
const ContinuationLocalStorage = require('continuation-local-storage');

const {
  deleteImageFromDatabase,
} = require('./stories/db/deleteImageFromDatabase');
const { deleteImageRoute, deleteImage } = require('./stories/deleteSceneRoute');

const {
  deleteStoryFromDatabase,
} = require('./stories/db/deleteStoryFromDatabase');
const { deleteStoryRoute } = require('./stories/deleteStoryRoute');

const { saveSceneToDatabase } = require('./stories/db/saveSceneToDatabase');
const {
  saveSceneImageToDatabase,
} = require('./stories/db/saveSceneImageToDatabase');

const {
  saveSceneContentToDatabase,
} = require('./stories/db/saveSceneContentToDatabase');

const {
  saveSceneTitleToDatabase,
} = require('./stories/db/saveSceneTitleToDatabase');

const {
  saveStoryRoute,
  createNewSceneInStoryRoute,
  createNewSceneInStory,
} = require('./stories/saveStoryRoute');

const {
  saveSceneContentRoute,
  saveSceneImageRoute,
  saveSceneTitleRoute,
  saveSceneImage,
  uploadImageViaCloudinary,
  deleteImageFromCloudinary,
} = require('./stories/scenes');

const {
  makeTransactional,
  getTransactionalConnectionFromNamespace,
} = require('./stories/db/support/tx');

const { getConnectionFromPool } = require('./stories/db/support/pool');

const { pingRoute } = require('./pingRoute');

const {
  createStoryByAuthor,
  createStoryByAuthorRoute,
} = require('./stories/createStoryByAuthorRoute');

const { getStoryForView } = require('./stories/view/getStory');
const { viewStoryRoute } = require('./stories/view/viewStoryRoute');
const { parseSceneContent } = require('./stories/format/parseSceneContent');

const { getStoryRoute } = require('./stories/getStoryRoute');
const { getStoryFromDatabase } = require('./stories/db/getStoryFromDatabase');

const { getAuthorFromDatabase } = require('./stories/db/getAuthorFromDatabase');
const { saveStoryToDatabase } = require('./stories/db/saveStoryToDatabase');

const {
  getStoriesByAuthorRoute,
} = require('./stories/getStoriesByAuthorRoute');
const {
  getStoriesByAuthorFromDatabase,
} = require('./stories/db/getStoriesByAuthorFromDatabase');

function createRoutes(log) {
  const [tx, getConnection] = (() => {
    const namespace = ContinuationLocalStorage.createNamespace('vsp@tx');

    const tx = makeTransactional(
      log,
      getConnectionFromPool(log, new Postgres.Pool(Config.get('db'))),
      namespace
    );

    const getConnection = getTransactionalConnectionFromNamespace(
      log,
      namespace
    );

    return [tx, getConnection];
  })();

  const getStory = tx(getStoryFromDatabase(log, getConnection));

  return [
    pingRoute({ log: Config.log, port: Config.port }),

    viewStoryRoute(log, getStoryForView(getStory, parseSceneContent())),

    Express.Router().use('/api', [
      getStoryRoute(getStory),
      saveStoryRoute(tx(saveStoryToDatabase(log, getConnection))),
      saveSceneContentRoute(
        tx(saveSceneContentToDatabase(log, getConnection)),
        getStory
      ),
      saveSceneTitleRoute(
        tx(saveSceneTitleToDatabase(log, getConnection)),
        getStory
      ),
      saveSceneImageRoute(
        log,
        saveSceneImage(
          uploadImageViaCloudinary(),
          tx(saveSceneImageToDatabase(log, getConnection))
        )
      ),
      getStoriesByAuthorRoute(
        tx(getStoriesByAuthorFromDatabase(log, getConnection))
      ),
      createStoryByAuthorRoute(
        tx(
          createStoryByAuthor(
            getAuthorFromDatabase(log, getConnection),
            saveStoryToDatabase(log, getConnection)
          )
        )
      ),
      createNewSceneInStoryRoute(
        createNewSceneInStory(log, tx(saveSceneToDatabase(log, getConnection))),
        getStory
      ),
      deleteStoryRoute(tx(deleteStoryFromDatabase(log, getConnection))),
      deleteImageRoute(
        deleteImage(
          tx(deleteImageFromDatabase(log, getConnection)),
          deleteImageFromCloudinary()
        )
      ),
    ]),
  ];
}

module.exports = {
  createRoutes,
};
