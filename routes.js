const jsonServer = require('json-server');

const router = jsonServer.create();

router.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.createdAt = new Date().toISOString();
    }
    next();
});

router.get('/ping', (req, res) =>
    res.json({
        message: 'Say my name',
        date: new Date(),
    })
);

module.exports = router;
