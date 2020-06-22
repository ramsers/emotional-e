const express = require('express');
const path = require("path");
const app = express();
// const logger = require("./middleware/logger");
const cors = require('cors');

// require('dotenv').config();

const angerResourcesRoute = require('./routes/anger');
const anxietyResourcesRoute = require('./routes/anxiety');
const depressionResourcesRoute = require ('./routes/depression');
const anxietyClickRoute = require ('./routes/clicks')
const notesDataRoute = require('./routes/journal');

const port = process.env.PORT || 5000;


app.use(cors());

// app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(express.static("../client"));


  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });

app.use('/api/anger', angerResourcesRoute);

app.use('/api/anxiety', anxietyResourcesRoute)

app.use('/api/depression', depressionResourcesRoute)

app.use('/api/clicks', anxietyClickRoute)

app.use('/api/journal', notesDataRoute)


    // Set static folder

app.listen(port, ()=> {
    console.log('server is running on ${port}');
})

