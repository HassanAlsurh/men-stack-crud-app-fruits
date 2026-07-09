const dns = require("node:dns");

dns.setServers(["8.8.8.8", "1.1.1.1"])

const dotenv = require('dotenv').config()

const express = require('express');
// const morgan = require('morgan')
// const path = require('path')
const mongoose = require('mongoose')

const app = express();

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
    console.log(`Connected successfully to: ${mongoose.connection.name}`)
})
 const Fruit = require('./models/fruits.js')
// app.use(morgan('dev'))
// app.use(express.static(path.join(__dirname, "public")))

app.get("/", async (req, res) => {
    res.render("home.ejs");
});

app.get("/fruits", async (req, res) => {
  // We will keep changing this code.
});






app.listen(3000, () => {
    console.log('Listening on port 3000');
});
