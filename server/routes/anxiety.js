const express = require('express');
const router = express.Router();
const anxietyResources = require('../data/anxiety.json');

router.get("/", (req,res)=> {
    res.json(anxietyResources);
})

module.exports = router;