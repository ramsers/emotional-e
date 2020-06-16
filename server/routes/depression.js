const express = require('express');
const router = express.Router();
const depressionResources = require('../data/depression.json');

router.get("/", (req,res)=> {
    res.json(depressionResources);
})

module.exports = router;