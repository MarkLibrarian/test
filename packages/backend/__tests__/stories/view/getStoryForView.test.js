const { Authors, Stories } = require('../../__fixtures__');

const { Just, either } = require('sanctuary');

const { getStoryForView } = require('../../../src/stories/view/getStory');

const {
  parseSceneContent,
} = require('../../../src/stories/format/parseSceneContent');

/**
 * @group unit
 */
describe('getStoryForView', () => {
  const storyId = Stories.TheNameOfTheRose.id;

  const getStory = getStoryForView(getStoryStub, parseSceneContent());

  test(
    'with no explicit scene ID yields the scene' +
      ' explicitly tagged as the opening scene',
    async () => {
      const assertStory = (story) =>
        expect(story).toMatchObject({
          id: storyId,
          title: 'The Name Of The Rose',
          scene: {
            title: 'The Abbey',
            passages: [
              {
                header: {
                  text: 'The Abbey',
                  name: 'the-abbey',
                },
                content: [
                  {
                    type: 'text',
                    text: 'The abbey loomed in the distance',
                  },
                ],
              },
            ],
          },
        });

      const story = await getStory({ storyId });

      either(failOnError)(assertStory)(story);
    }
  );

  test('with an explicit scene ID yields the scene with that ID', async () => {
    const assertStory = (story) =>
      expect(story).toMatchObject({
        id: storyId,
        title: 'The Name Of The Rose',
        scene: {
          title: 'Introduction',
          passages: [
            {
              header: {
                text: 'Introduction',
                name: 'introduction',
              },
              content: [
                {
                  type: 'text',
                  text: 'I was handed a book',
                },
              ],
            },
          ],
        },
      });

    const story = await getStory({ storyId, sceneId: 1 });

    either(failOnError)(assertStory)(story);
  });
});

function getStoryStub(storyId) {
  return Promise.resolve(
    Just({
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
          isOpeningScene: true,
        },
      ],
    })
  );
}

function failOnError(err) {
  throw err;
}
