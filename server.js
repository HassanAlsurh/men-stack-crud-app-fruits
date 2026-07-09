const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const dotenv = require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const mongoose = require("mongoose");
const Fruit = require("./models/fruits.js");

const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected successfully to: ${mongoose.connection.name}`);
});

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));

//setup complete ⬆️⬆️⬆️⬆️⬆️

// GET Home page
app.get("/", async (req, res) => {
  res.render("home.ejs");
});

//GET to the /fruits/new page to create a new fruit
app.get("/fruits/new", async (req, res) => {
  res.render("new.ejs");
});

//  POST to /fruits
app.post("/fruits", async (req, res) => {
  const fruitData = {};

  fruitData.name = req.body.name;

  if (req.body.isReadyToEat === "on") {
    fruitData.isReadyToEat = true;
  } else {
    fruitData.isReadyToEat = false;
  }

  let msg = await Fruit.create(fruitData);

  //   res.send(msg);
  res.redirect("/fruits/new");
});

app.get("/fruits", (req, res) => {
     const fruitList = await Fruit.find()

     res.render()

});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

// prettier - ignore
// CODE GRAVEYARD

// app.get("/fruits", async (req, res) => {
//     const fruitData = {}
//     fruitData.name = 'Blueberry'
//     fruitData.isReadyToEat = true

//     let createdFruit = await Fruit.create(fruitData)

//     res.send(createdFruit)

// });

// //-----------------------------

// app.get("/fruits", async (req, res) => {

//     // let FruitList = await Fruit.find()
//     // let FruitList = await Fruit.find({isReadyToEat: true})
//     let FruitList = await Fruit.find({ name: 'MANGO'})

//     res.send(FruitList)

// });

// -------------------------------

// app.get("/fruits", async (req, res) => {
//     //Find the first thing and update it!
//     //let FruitList = await Fruit.findOneAndUpdate({ name: 'MANGO', isReadyToEat: true},{name: 'Sweet Mango'},{new: true})

//     //Update a record by its ID
//     //let FruitList = await Fruit.findByIdAndUpdate( '6a4f6c53e74c3f62c30223be' ,{name: 'Sweet to eat'},{new: true})

//     //Delete a record by its ID
//     //let FruitList = await Fruit.findByIdAndDelete('6a4f6c53e74c3f62c30223be')
//     let FruitList = await Fruit.findById('6a4f6c53e74c3f62c30223be')

//     res.send(FruitList)

// });
