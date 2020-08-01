const S = require('sanctuary');
const { isNil, partial } = require('ramda');

function getStoryForView(getStory, toSceneContent) {
  const toStory = partial(toStoryForView, [toSceneContent]);

  return ({ storyId, sceneId }) =>
    getStory(storyId).then(
      S.pipe([
        S.maybeToEither(`Can't find story [${storyId}]`),
        S.chain(toStory(sceneId)),
      ])
    );
}

function toStoryForView(toSceneContent, sceneId) {
  return (story) =>
    S.pipe([
      getSceneForView(sceneId),
      S.chain((scene) =>
        S.pipe([
          S.prop('content'),
          toSceneContent,
          S.map(({ passages }) => ({
            id: story.id,
            title: story.title,
            scene: { title: scene.title, image: scene.image, passages },
          })),
        ])(scene)
      ),
    ])(story);
}

function getSceneForView(sceneId) {
  return (story) =>
    S.pipe([
      S.find(isNil(sceneId) ? isOpeningScene : isSceneWithId(sceneId)),
      S.maybe_(() => S.Just(story.scenes[0]))(S.Just),
      S.maybeToEither(`Can't find scene [${sceneId}] in story [${story.id}]`),
    ])(story.scenes);
}

function isOpeningScene(scene) {
  return !!scene.isOpeningScene;
}

function isSceneWithId(sceneId) {
  return (scene) => scene.id === sceneId;
}

module.exports = {
  getStoryForView,
  getSceneForView,
};
