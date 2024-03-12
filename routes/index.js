// default ejs route express
//
const router = require('express').Router();
const defaultResponse = { id: 0, name: 'default' };
router.get('/', (req, res) => {
    //res.send(defaultResponse);
    res.render('index', { title: 'Home' });
});

module.exports = router;