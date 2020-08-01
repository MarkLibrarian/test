const fs = require('fs');
const path = require('path');
const { either } = require('sanctuary');
const {
  parseSceneContent,
} = require('../../../src/stories/format/parseSceneContent');

function loadSceneContent(name) {
  return fs
    .readFileSync(
      path.join(__dirname, '..', '..', `__fixtures__/scenes/${name}.md`)
    )
    .toString('utf8');
}

/**
 * @group unit
 */
describe('parse scene content', function () {
  const parse = parseSceneContent();

  test('sunny day, Mark in the Sackler', () => {
    const content = loadSceneContent('mark-sackler');

    const failOnError = (err) => {
      throw err;
    };

    const assertSceneContent = (scene) =>
      expect(scene).toMatchObject({
        passages: [
          {
            header: {
              text: 'Introduction',
              name: 'introduction',
            },
            content: [
              {
                type: 'text',
                text: 'Mark entered the Sackler.',
              },
              {
                type: 'text',
                text: 'To his right are shelves of books.',
              },
              {
                type: 'text',
                text: 'To his left he sees Lucy, his colleague.',
              },
              {
                type: 'link',
                text: 'Examine the books',
                target: 'thebookshelves',
              },
              {
                type: 'link',
                text: 'Chat with Lucy',
                target: 'the-erudite-colleague',
              },
            ],
          },
          {
            header: {
              text: 'The Books',
              name: 'thebookshelves',
            },
            content: [
              {
                type: 'text',
                text: 'There are many valuable books to borrow.',
              },
            ],
          },
          {
            header: {
              text: 'The Erudite Colleague',
              name: 'the-erudite-colleague',
            },
            content: [
              {
                type: 'text',
                text: "Lucy's knowledge of Akkadian is peerless.",
              },
            ],
          },
        ],
      });

    either(failOnError)(assertSceneContent)(parse(content));
  });

  test("rainy day, content doesn't start with a header", () => {
    const content = loadSceneContent('no-header');

    const failOnSuccessfulParse = () => {
      throw new Error(
        "A passage that doesn't start with" +
          ' a header must not be parsed successfully'
      );
    };

    const isSyntaxError = (err) => expect(err.message).toMatch(/Syntax error/);

    either(isSyntaxError)(failOnSuccessfulParse)(parse(content));
  });
});
