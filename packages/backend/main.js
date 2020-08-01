const Log = require('pino');
const Config = require('config');

const { createRoutes, createExpressApplication } = require('./src');

const log = Log({
  ...Config.get('log'),
  serializers: {
    err: Log.stdSerializers.err,
    req: Log.stdSerializers.req,
    res: Log.stdSerializers.res,
  },
});

const app = createExpressApplication(log, createRoutes(log));

const port = Config.get('port');

return app.listen(port, () => log.info({ port }, 'Server started'));
