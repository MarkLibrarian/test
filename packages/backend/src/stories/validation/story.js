const ow = require('ow');
const { pipe } = require('sanctuary');

const { isPositiveIntegerString } = require('./index');

const LABEL_STORY_ID = 'storyId';
const LABEL_SCENE_ID = 'sceneId';
const LABEL_IMAGE_ID = 'imageId';

const storyIdValidator = ow.create(
  LABEL_STORY_ID,
  ow.string.numeric.validate((value) => ({
    validator: isPositiveIntegerString(value),
    message: `Expected \`${LABEL_STORY_ID}\` to be a positive integer, got \`${value}\``,
  }))
);

const imageIdValidator = ow.create(
  LABEL_IMAGE_ID,
  ow.string.numeric.validate((value) => ({
    validator: isPositiveIntegerString(value),
    message: `Expected \`${LABEL_IMAGE_ID}\` to be a positive integer, got \`${value}\``,
  }))
);

const sceneIdValidator = (optional = false) =>
  ow.create(
    LABEL_SCENE_ID,
    (optional ? ow.optional.string : ow.string).numeric.validate((value) => ({
      validator: isPositiveIntegerString(value),
      message: `Expected \`${LABEL_SCENE_ID}\` to be a positive integer, got \`${value}\``,
    }))
  );

const completeStoryValidator = ow.create(
  ow.object.exactShape({
    id: ow.number.positive,
    title: ow.string.nonEmpty.maxLength(255),
    authors: ow.array.nonEmpty.ofType(
      ow.object.exactShape({
        id: ow.number.positive,
        name: ow.string.nonEmpty.maxLength(255),
      })
    ),
    scenes: ow.array.nonEmpty.ofType(
      ow.object.exactShape({
        id: ow.number.positive,
        storyId: ow.number.positive,
        isOpeningScene: ow.any(ow.undefined, ow.boolean),
        title: ow.string.nonEmpty.maxLength(255),
        content: ow.string.nonEmpty,
        image: ow.any(
          ow.undefined,
          ow.object.exactShape({
            id: ow.number.positive,
            url: ow.string.nonEmpty.maxLength(255),
            thumbnailUrl: ow.string.nonEmpty.maxLength(255),
          })
        ),
      })
    ),
  })
);

const sceneContentValidator = ow.create(
  ow.object.exactShape({
    content: ow.string.nonEmpty,
  })
);

const sceneTitleValidator = ow.create(
  ow.object.exactShape({
    title: ow.string.nonEmpty,
  })
);

const validateStoryId = (get) => pipe([get, storyIdValidator]);

const validateImageId = (get) => pipe([get, imageIdValidator]);

const validateSceneId = (optional = false) => (get) =>
  pipe([get, sceneIdValidator(optional)]);

const validateCompleteStory = (get) => pipe([get, completeStoryValidator]);

const validateSceneTitle = (get) => pipe([get, sceneTitleValidator]);

const validateSceneContent = (get) => pipe([get, sceneContentValidator]);

module.exports = {
  validateImageId,
  validateSceneId,
  validateStoryId,
  imageIdValidator,
  completeStoryValidator,
  validateCompleteStory,
  sceneContentValidator,
  validateSceneContent,
  sceneTitleValidator,
  validateSceneTitle,
};
