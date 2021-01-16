const jsonServer = require('json-server');
const generator = require('./generator');
const router = require('./routes');
const consola = require('consola');
const fs = require('fs');

consola.LogLevel = 4;
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const generateDevBuild = () => {
    const mode = process.env.NODE_ENV;
    const data = generator(mode);
    consola.success('Generation completed. Populating latest json into db.json');

    fs.writeFile(
        mode === 'dev' ? 'dev_db.json' : 'db.json',
        JSON.stringify(data),
        'utf8',
        () => consola.success('db.json populated!')
    );
};

generateDevBuild();
server.listen(process.env.PORT, () => consola.success('Listening on port', process.env.PORT));
