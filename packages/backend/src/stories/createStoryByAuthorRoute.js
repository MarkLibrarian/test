const Express = require('express');
const HttpStatus = require('http-status-codes');
const { isJust, maybeToNullable, Left, Right, maybe } = require('sanctuary');

const { getPathParameter } = require('../express');
const { validateAuthorId } = require('./validation/author');
const { validateRequest } = require('./validation');

function createStoryByAuthorRoute(createStoryByAuthor) {
  const getAuthorId = getPathParameter('authorId');

  return Express.Router().post(
    '/author/:authorId/story',
    validateRequest(validateAuthorId(getAuthorId)),
    (req, res, next) => {
      const authorId = Number.parseInt(getAuthorId(req), 10);
      const { title } = req.body;

      return createStoryByAuthor({
        authorId,
        title: title || 'My Story',
      }).then((storyId) =>
        res
          .status(HttpStatus.CREATED)
          .header('Location', `/api/story/${storyId}`)
          .json()
      );
    }
  );
}

function createStoryByAuthor(getAuthor, saveStory) {
  const createStory = (author, title) =>
    saveStory(
      startingStory({
        author: maybeToNullable(author),
        title,
      })
    ).then((story) => story.id);

  return ({ authorId, title }) =>
    getAuthor(authorId).then((author) =>
      isJust(author)
        ? createStory(author, title)
        : Promise.reject(Error(`No author with ID=${authorId}`))
    );
}

function startingStory({ author, title }) {
  return {
    authors: [author],
    title,
    scenes: [
      {
        title: 'Opening Scene',
        content: '# Introduction\n\nIt was a dark and stormy night\n',
        isOpeningScene: true,
      },
    ],
  };
}

module.exports = {
  createStoryByAuthor,
  createStoryByAuthorRoute,
};
