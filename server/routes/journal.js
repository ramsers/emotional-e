const express = require('express');
const router = express.Router();
const notesData = require('../data/notes.json');
const { v4: uuidv4} = require('uuid');
const fs = require('fs');
const cors =require('cors');
const bodyParser  = require('body-parser');

router.use(bodyParser.json());
router.use(cors());

router.get('/', (req, res)=> {
    res.json(notesData)
})

router.post('/', (req, res)=> {
    let data = JSON.stringify(req.body);
    // console.log(data)

    if(!req.body.title || !req.body.notes) {
        res.status(404).json("Your note title or description is empty")
    } else {
        const newNote = {
            "id": uuidv4(),
            "title": req.body.title,
            "notes": req.body.notes
        }

        notesData.push(newNote)

        res.status(201).json({
            success: true,
            newNote: newNote
        })
        

        // fs.appendFile('./data/notes.json', JSON.stringify(newNote),{
        //     flag: 'a'
        // }, ()=>{
            
        //     res.status(201).json({
        //         success: true,
        //         newNote: newNote
        //     })
        // })  
    }
    // notesData.push(newNote)
})


module.exports = router