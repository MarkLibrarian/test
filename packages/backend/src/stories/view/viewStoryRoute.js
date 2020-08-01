const { tap } = require('ramda');
const Express = require('express');
const { map, either } = require('sanctuary');
const HttpStatus = require('http-status-codes');

const { validateRequest } = require('../validation');
const { getPathParameter, getQueryParameter } = require('../../express');
const { validateStoryId, validateSceneId } = require('../validation/story');

const getStoryId = getPathParameter('storyId');
const getSceneId = getQueryParameter('sceneId');

function viewStoryRoute(log, getStory) {
  return Express.Router().get(
    '/stories/:storyId',
    validateRequest(
      validateStoryId(getStoryId),
      validateSceneId(true)(getSceneId)
    ),
    (req, res) => {
      const storyId = Number.parseInt(getStoryId(req), 10);
      const sceneId = (() => {
        const sid = getSceneId(req);
        return sid ? Number.parseInt(sid, 10) : undefined;
      })();

      const notFoundOnFailure = (err) => {
        log.warn({ err }, "Can't view story");
        res.status(HttpStatus.NOT_FOUND).json();
      };

      const renderStory = (story) =>
        res.status(HttpStatus.OK).render('story', story);

      return getStory({ storyId, sceneId })
        .then(map(tap((story) => log.info({ story }, 'Viewing story'))))
        .then(map(toModel))
        .then(either(notFoundOnFailure)(renderStory));
    }
  );
}

function toModel(story) {
  return {
    title: `${story.scene.title} • ${story.title}`,
    story,
  };
}

module.exports = { viewStoryRoute };
