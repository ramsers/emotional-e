const express = require('express');
const path = require("path");
const app = express();
const angerResourcesRoute = require('./routes/anger');
const anxietyResourcesRoute = require('./routes/anxiety');
const depressionResourcesRoute = require ('./routes/depression');
const anxietyClickRoute = require ('./routes/clicks')
const notesDataRoute = require('./routes/journal');
const cors = require('cors');

require('dotenv').config();

const port = process.env.PORT || 3000


app.use(cors());

// app.use(logger);

app.use(express.json());

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.use('/api/anger', angerResourcesRoute);

app.use('/api/anxiety', anxietyResourcesRoute)

app.use('/api/depression', depressionResourcesRoute)

app.use('/api/clicks', anxietyClickRoute)

app.use('/api/journal', notesDataRoute)

app.listen(port, ()=> {
    console.log('server is running on 8080');
})

