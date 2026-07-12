const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const dotenv = require("dotenv").config();
const express = require("express");
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require("path");
const mongoose = require("mongoose");
const Fruit = require("./models/fruits.js");

const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected successfully to: ${mongoose.connection.name}`);
});

app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));

//setup complete ⬆️⬆️⬆️⬆️⬆️

// Just the home page.. not required
app.get("/", async (req, res) => {
  res.render("home.ejs", { title: "Home" });
});

//GET 'Index'  ------- A OK
app.get("/fruits", async (req, res) => {
  const fruitList = await Fruit.find();
  res.render("index.ejs", {
    fruits: fruitList,
    title: "Fruits Index",
  });
});

//GET 'New'  ------- A OK
app.get("/fruits/new", async (req, res) => {
  res.render("new.ejs", { title: "Create New Record" });
});

//GET 'Show' 
app.get("/fruits/:fruitId", async (req, res) => {
  const currFruit = await Fruit.findById(req.params.fruitId);
  res.render("show.ejs", {
    currFruit: currFruit,
    title: currFruit.name,
  });
});


//GET 'Edit'
app.get("/fruits/:fruitId/edit", async (req, res) => {
  const fruitToEdit = await Fruit.findById(req.params.fruitId);

  res.render("edit.ejs", {
    title: `Edit ${fruitToEdit.name}`,
    currFruit: fruitToEdit,
  });
});

//  POST to /fruits
app.post("/fruits", async (req, res) => {
  const fruitData = {};

  fruitData.name = req.body.name;
  fruitData.category = req.body.category;

  if (req.body.isReadyToEat === "on") {
    fruitData.isReadyToEat = true;
  } else {
    fruitData.isReadyToEat = false;
  }

  let msg = await Fruit.create(fruitData);
console.log('>>>>>>>>>>>>>>>', msg)
  //   res.send(msg);
  res.redirect("/fruits");
});

//PUT 'Update'
app.put("/fruits/:fruitId", async (req, res) => {
  const newRecord = {}
  
  newRecord.name = req.body.name
  console.log('Name>>>>>>>>>',req.body.name)
  if (req.body.isReadyToEat === "on") {
    newRecord.isReadyToEat = true;
  } else {
    newRecord.isReadyToEat = false;
  }

  newRecord.category = req.body.category

  console.log('>>>>>>>>>', newRecord)

  await Fruit.findByIdAndUpdate(req.params.fruitId, newRecord);

  res.redirect(`/fruits/${req.params.fruitId}`);
});

//DELETE 'Destroy'
app.delete("/fruits/:fruitId", async (req, res) => {
  await Fruit.findByIdAndDelete(req.params.fruitId);
  res.redirect("/fruits");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

/* prettier-ignore-start */

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

/* prettier-ignore-end */
