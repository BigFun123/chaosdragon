
const router = require('express').Router();
const defaultResponse = { id: 0, name: 'default' };
router.get('/', (req, res) => {
    res.render('telemetry', { title: 'Telemetry' });
});
module.exports = router;