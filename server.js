const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"])


const dotenv = require('dotenv').config()
const express = require('express');
const morgan = require('morgan')
const path = require('path')
const mongoose = require('mongoose')
const Fruit = require('./models/fruits.js')

const app = express();


mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log(`Connected successfully to: ${mongoose.connection.name}`)
})


app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "public")))


//setup complete ⬆️⬆️⬆️⬆️⬆️



app.get("/", async (req, res) => {
    res.render("home.ejs");
});


app.get("/fruits", async (req, res) => {

    // let FruitList = await Fruit.find()
    // let FruitList = await Fruit.find({isReadyToEat: true})
    let FruitList = await Fruit.find({ name: 'MANGO'})

    res.send(FruitList)

});










app.listen(3000, () => {
    console.log('Listening on port 3000');
});


// CODE GRAVEYARD

// app.get("/fruits", async (req, res) => {
//     const fruitData = {}
//     fruitData.name = 'Blueberry'
//     fruitData.isReadyToEat = true

//     let createdFruit = await Fruit.create(fruitData)

//     res.send(createdFruit)

// });