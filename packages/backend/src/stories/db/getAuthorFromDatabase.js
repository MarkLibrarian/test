const { Just, Nothing } = require('sanctuary');

function getAuthorFromDatabase(log, connect) {
  const forAuthor = (authorId) => ({
    name: 'getAuthor',
    text: `
      SELECT
        author.id as author_id,
        author.name as author_name
      FROM author
      WHERE author.id = $1
    `,
    values: [authorId],
  });

  return (authorId) => {
    log.info({ authorId }, 'Getting author from DB');

    return connect()
      .then((connection) => connection.query(forAuthor(authorId)))
      .then(({ rows }) => {
        return rows.length === 0 ? Nothing : Just(toAuthor(rows[0]));
      });
  };
}

function toAuthor(row) {
  return {
    id: row['author_id'],
    name: row['author_name'],
  };
}

module.exports = {
  getAuthorFromDatabase,
};
