const express = require('express');
const app = express();
const angerResourcesRoute = require('./routes/anger');
const anxietyResourcesRoute = require('./routes/anxiety');
const depressionResourcesRoute = require ('./routes/depression');
const anxietyClickRoute = require ('./routes/clicks')
const notesDataRoute = require('./routes/journal');
const cors = require('cors');


app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.use('/anger', angerResourcesRoute);

app.use('/anxiety', anxietyResourcesRoute)

app.use('/depression', depressionResourcesRoute)

app.use('/clicks', anxietyClickRoute)

app.use('/journal', notesDataRoute)

app.listen(8080, ()=> {
    console.log('server is running on 8080');
})

