const express = require("express");

const mealRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

// get all meals
mealRoutes.route("/meals").get(function (req, res) {
	let db_connect = dbo.getDb("production");
	db_connect
	  .collection("meals")
	  .find({})
	  .toArray(function (err, result) {
		if (err) throw err;
		res.json(result);
	  });
   });

// get meal by id
mealRoutes.route("/meals/:id").get(function (req, res) {
	let db_connect = dbo.getDb();
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect
	  .collection("meals")
	  .findOne(myquery, function (err, result) {
		if (err) throw err;
		res.json(result);
	  });
   });

// add meal
mealRoutes.route("/meals/add").post(function (req, response) {
	let db_connect = dbo.getDb();
	let myobj = {
		meal_name: req.body.meal_name,
		meal_type: req.body.meal_type,
		publisher: req.body.meal_publisher,
		ingredients: req.body.meal_ingredients, // array
		instructions: req.body.meal_instructions, // array
		//meal_image: req.body.meal_image, // TODO: need to figure out how to upload image
		public: req.body.public,
		tags: req.body.tags
	};
	db_connect.collection("meals").insertOne(myobj, function (err, res) {
	  if (err) throw err;
	  response.json(res);
	});
   });

// update meal
mealRoutes.route("meal/update/:id").post(function (req, response) {
	let db_connect = dbo.getDb();
	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = {
	  $set: {

	  },
	};
	db_connect
	  .collection("meals")
	  .updateOne(myquery, newvalues, function (err, res) {
		if (err) throw err;
		console.log("1 document updated");
		response.json(res);
	  });
   });

// delete meal
// This section will help you delete a record
mealRoutes.route("meals/:id").delete((req, response) => {
	let db_connect = dbo.getDb();
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("meals").deleteOne(myquery, function (err, obj) {
	  if (err) throw err;
	  console.log("1 document deleted");
	  response.json(obj);
	});
   });

module.exports = mealRoutes;