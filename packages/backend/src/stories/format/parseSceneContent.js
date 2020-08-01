const S = require('sanctuary');
const nearley = require('nearley');
const grammar = require('./grammar.js');

function defaultParser() {
  return new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
}

function parseSceneContent(parser = defaultParser) {
  return (content) => {
    try {
      const { results } = parser().feed(content);
      return results.length === 0
        ? S.Left(Error("Can't parse the scene content: no passages found"))
        : S.Right(results[0]);
    } catch (err) {
      return S.Left(err);
    }
  };
}

module.exports = {
  parseSceneContent,
};
