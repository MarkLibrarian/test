const run = require('execa');
const Config = require('config');

// slice off the `node` and file path arguments
const argv = require('minimist')(process.argv.slice(2));

function databaseUrl() {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }
  const db = Config.get('db');
  return db.connectionString
    ? db.connectionString
    : `${db.driver}://${db.user}:${db.password}@${db.host}:${db.port}/${db.database}`;
}

(() => {
  const migrate = run(`DATABASE_URL=${databaseUrl()} db-migrate`, argv._, {
    shell: true,
  });
  migrate.stdout.pipe(process.stdout);
  return migrate.catch((err) => {
    console.error(err);
    process.exit(1);
  });
})();
