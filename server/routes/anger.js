const express = require('express');
const router = express.Router();
const angerResourcesData = require('../data/anger.json');

router.get("/", (req,res)=> {
    res.json(angerResourcesData);
})

module.exports = router;