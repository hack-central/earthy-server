const jsonServer = require('json-server');
const customRouter = require('./routes');
const consola = require('consola');
const cors = require('cors');

consola.LogLevel = 4;
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

const db = process.env.NODE_ENV === 'development' ? 'dev_db.json' : 'db.json';
const router = jsonServer.router(db);

server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);
server.use('/api', customRouter, router);

server.listen(process.env.PORT, () =>
    consola.success('Listening on port', process.env.PORT)
);
