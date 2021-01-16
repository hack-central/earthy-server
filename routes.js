const {create: Server} = require('json-server');

const router = Server();

router.get('/lmao', (req, res) => {
    return res.json({ message: 'Say my name' });
});

module.exports = router;
