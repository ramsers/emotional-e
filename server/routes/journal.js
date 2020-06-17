const express = require('express');
const router = express.Router();
const notesData = require('../data/notes.json');
const { v4: uuidv4} = require('uuid');
const fs = require('fs');
var data = fs.readFileSync('./data/notes.json');
var notes =JSON.parse(data);
console.log(notes)
const cors =require('cors');
const bodyParser  = require('body-parser');

router.use(bodyParser.json());
router.use(cors());

router.get('/', (req, res)=> {
    res.json(notesData)
})

router.post('/', (req, res)=> {

    if(!req.body.title || !req.body.notes) {
        res.status(404).json("Your note title or description is empty")
    } else {
        const newNote = [
            
            ...notesData,
            {   
                id: uuidv4(),
                ...req.body
            }
        ]
        
        fs.writeFile('./data/notes.json', JSON.stringify(newNote, null, 2), ()=>{
            res.status(201).json({
                success: true,
                ...newNote
            })
        })
    }
})


module.exports = router