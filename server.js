const express = require('express');
const next = require('next');
const fetch = require('node-fetch');
const { setContext } = require('apollo-link-context');
const { HttpLink } = require('apollo-link-http');
const { introspectSchema, makeRemoteExecutableSchema } = require('apollo-server');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const url = require('url');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT, 10) || 3000;

// Multi-process to utilize all CPU cores.
if (!dev && cluster.isMaster) {
  console.log(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });
} else {
  const app = next({ dir: '.', dev });
  const handle = app.getRequestHandler();

  // Setup Yelp's GraphQL
  const http = new HttpLink({ uri: 'https://api.yelp.com/v3/graphql', fetch });
  const link = setContext(() => ({
    headers: {
      Authorization: `Bearer sOfHPH-giP_QM9iaumJW3LhAXDFkGi0OwI8IFf332gQdHix7mz0SikX59LOCOmE35mU4eFGUE1K-bflx2TpsXdbo9Z8j-9nxFHVGJeMJCT5WWgO43liA-HYY1SxiXHYx`,
      'Access-Control-Allow-Origin': '*',
    },
  })).concat(http);
  let graphQLServer;
  introspectSchema(link)
    .then((schema) => {
      graphQLServer = new ApolloServer({
        schema: makeRemoteExecutableSchema({
          schema,
          link,
        }),
      });
    })
    .catch((err) => {
      console.error(err);
    });

  // Start the Next/Express server
  const proxyAddress = `http${dev ? '' : 's'}://local.inquisitivedev.com:${port.toString()}`;

  app.prepare().then(() => {
    const server = express();
    graphQLServer.applyMiddleware({ app: server, cors: { origin: proxyAddress, credentials: true } });
    if (!dev) {
      // Enforce SSL & HSTS in production
      server.use(function(req, res, next) {
        var proto = req.headers['x-forwarded-proto'];
        if (proto === 'https') {
          res.set({
            'Strict-Transport-Security': 'max-age=31557600', // one-year
          });
          return next();
        }
        res.redirect('https://' + req.headers.host + req.url);
      });
    }

    server.get('/detail/:alias', (req, res) => {
      return app.render(req, res, '/detail', { alias: req.params.alias });
    });

    // Static files
    // https://github.com/zeit/next.js/tree/4.2.3#user-content-static-file-serving-eg-images
    server.use(
      '/static',
      express.static(path.join(__dirname, 'static'), {
        maxAge: dev ? '0' : '365d',
      })
    );

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
}
