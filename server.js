// Here is where we import modules
// We begin by loading Express
const express = require('express');
const morgan = require('morgan')
const path = require('path')

const app = express();

// app.use(morgan('dev'))
// app.use(express.static(path.join(__dirname, "public")))







// server.js

// GET /
app.get("/", async (req, res) => {
  res.render("home.ejs");
});


app.listen(3000, () => {
    console.log('Listening on port 3000');
});
