const express = require('express');
const next = require('next');
const fetch = require('node-fetch');
const { setContext } = require('apollo-link-context');
const { HttpLink } = require('apollo-link-http');
const { introspectSchema, makeRemoteExecutableSchema } = require('apollo-server');
const { ApolloServer } = require('apollo-server-express');

const serverSettings = {
  port: parseInt(process.env.PORT, 10) || 3000,
  dev: process.env.NODE_ENV !== 'production',
};
const app = next({ dev: serverSettings.dev });
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
introspectSchema(link).then((schema) => {
  graphQLServer = new ApolloServer({
    schema: makeRemoteExecutableSchema({
      schema,
      link,
    }),
  });
});

// Start the Next/Express server
const proxyAddress = `http${
  serverSettings.dev ? '' : 's'
}://local.inquisitivedev.com:${serverSettings.port.toString()}`;

app.prepare().then(() => {
  const server = express();
  if (serverSettings.dev) {
    graphQLServer.applyMiddleware({ app: server, cors: { origin: proxyAddress, credentials: true } });
  } else {
    graphQLServer.applyMiddleware({ app: server });
  }

  server.get('/detail/:alias', (req, res) => {
    return app.render(req, res, '/detail', { alias: req.params.alias });
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  if (serverSettings.dev) {
    server.listen(serverSettings.port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${serverSettings.port}`);
    });
  } else {
    server.listen();
  }
});
