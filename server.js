const jsonServer = require('json-server');
const customRouter = require('./routes');
const consola = require('consola');

consola.LogLevel = 4;
const server = jsonServer.create();

const db = process.env.NODE_ENV === 'development' ? 'dev_db.json' : 'db.json';
const router = jsonServer.router(db);

server.use(jsonServer.bodyParser);
server.use('/api', customRouter);
server.use('/api', router);

server.listen(process.env.PORT, () =>
    consola.success('Listening on port', process.env.PORT)
);
