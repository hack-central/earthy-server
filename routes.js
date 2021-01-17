const jsonServer = require('json-server');

const router = jsonServer.create();
const middlewares = jsonServer.defaults();

router.use(jsonServer.bodyParser);
router.use(middlewares);
router.use(
    jsonServer.rewriter({
        '/posts': '/posts?_embed=comments',
        '/posts/:id': '/posts/:id?_embed=comments',
        '/users': '/users?_embed=posts&_embed=comments',
        '/users/:id': '/users/:id?_embed=posts&_embed=comments',
    })
);
router.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.createdAt = new Date().toISOString();
    }
    next();
});

router.get('/ping', (req, res) => {
    return res.json({ message: 'Say my name', date: new Date() });
});

module.exports = router;
