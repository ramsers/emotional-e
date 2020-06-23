const express = require('express');
const router = express.Router();
const fs = require('fs');
const clicksData = require('../data/clicks.json');
const cors =require('cors');
const bodyParser  = require('body-parser');

router.use(bodyParser.json());
router.use(cors());



router.get("/", (req,res)=> {
    res.json(clicksData);
})


router.post('/', (req, res) => {
    let data = JSON.stringify(req.body)
    const newData = {
        ...clicksData,
        ...req.body
    }
    console.log(data)
    fs.writeFile('./data/clicks.json', JSON.stringify(newData), () => {
      res.status(201).json({
                      success: true,
                      ...newData 
                  })
    });
  });



module.exports = router;