const Path = require('path');

const Express = require('express');
const Helmet = require('helmet');
const Nunjucks = require('nunjucks');

const {
  errorHandlerForArgumentError,
  errorHandlerForAnyOtherError,
} = require('./express');

function createExpressApplication(log, routes) {
  const app = Express()
    .disable('x-powered-by')
    .use(Helmet({ hidePoweredBy: false }))
    .use(Express.json());

  Nunjucks.configure(Path.join(__dirname, 'views'), {
    autoescape: true,
    express: app,
  });
  app.set('view engine', '.njk');

  routes.forEach((route) => app.use(route));

  if (process.env.NODE_ENV === 'production') {
    log.debug('Serving frontend app from backend');

    const frontendPath = Path.join(__dirname, '../../frontend/build');

    app
      .use(Express.static(frontendPath))
      .get('*', (req, res) =>
        res.sendFile(Path.join(frontendPath, 'index.html'))
      );
  }

  return app
    .use(errorHandlerForArgumentError())
    .use(errorHandlerForAnyOtherError());
}

module.exports = {
  createExpressApplication,
};
