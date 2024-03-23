
const router = require('express').Router();
const defaultResponse = { id: 0, name: 'default' };
router.get('/', (req, res) => {
    res.render('telemetry', { title: 'Telemetry' });
});

router.get('/memory', (req, res) => {

    // get memory statistics
    // send memory statistics
    const memory = process.memoryUsage();
    res.json({ memory: memory });
});

module.exports = router;