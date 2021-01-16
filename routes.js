const {router: Router} = require('json-server');

// Note: routes.json needs to be removed in future when everything is implemented perfectly
const router = Router('routes.json');

router.get('/lmao', (req, res) => {
    res.json({ message: 'Say my name' });
});

module.exports = router;
