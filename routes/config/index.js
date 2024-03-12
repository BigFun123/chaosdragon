// express ejs router for config page
//
const router = require('express').Router();
const defaultResponse = { id: 0, name: 'default' };
router.get('/', (req, res) => {
    res.render('config', { title: 'Config' });
});
module.exports = router;