const { Authors, Stories } = require('../../__fixtures__');

const { either } = require('sanctuary');

const { getSceneForView } = require('../../../src/stories/view/getStory');

/**
 * @group unit
 */
describe('getSceneForView', () => {
  test(
    'with no explicit scene ID AND no opening scene' +
      ' we just default to yielding the first scene',
    () => {
      const storyId = Stories.TheNameOfTheRose.id;

      const assertScene = (scene) =>
        expect(scene).toMatchObject({
          id: 1,
          storyId: storyId,
          title: 'Introduction',
          content: `# Introduction

I was handed a book
`,
        });

      const scene = getSceneForView(undefined)(getStoryStub(storyId));

      either(failOnError)(assertScene)(scene);
    }
  );
});

function getStoryStub(storyId) {
  return {
    id: storyId,
    authors: [Authors.UmbertoEco],
    title: 'The Name Of The Rose',
    scenes: [
      {
        id: 1,
        storyId: storyId,
        title: 'Introduction',
        content: `# Introduction

I was handed a book
`,
      },
      {
        id: 2,
        storyId: storyId,
        title: 'The Abbey',
        content: `# The Abbey

The abbey loomed in the distance
`,
      },
    ],
  };
}

function failOnError(err) {
  throw err;
}
