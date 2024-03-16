// express ejs router for config page
//
const router = require('express').Router();
const defaultResponse = { id: 0, name: 'default' };
const config = require("../../config.json");
router.get('/', (req, res) => {
    
    res.render('chaos', {data: config.agents});
});
module.exports = router;