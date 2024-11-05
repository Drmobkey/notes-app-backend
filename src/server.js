const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 8001,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'], // Atur CORS untuk menerima dari semua asal
      },
    },
  });
  

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();