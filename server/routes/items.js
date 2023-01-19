const express = require("express");

const itemRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

// get all items
itemRoutes.route("/items").get(function (req, res) {
	console.log("get all items");
	let db_connect = dbo.getDb("production");
	db_connect
	  .collection("items")
	  .find({})
	  .toArray(function (err, result) {
		if (err) throw err;
		res.json(result);
	  });
   });

// get item by id
itemRoutes.route("/items/:id").get(function (req, res) {
	console.log("get item by id");
	console.log(req.params.id);
	let db_connect = dbo.getDb();
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect
	  .collection("items")
	  .findOne(myquery, function (err, result) {
		if (err) throw err;
		res.json(result);
	  });
   });

// add item
itemRoutes.route("/items/add").post(async (req, response) =>{
	console.log("add item");
	let db_connect = dbo.getDb();
	let myobj = req.body;
	console.log(myobj);
	//check if item already exists
	let myquery = { itemName: myobj.itemName, 
					description: myobj.description 
	};
	
	let result = await db_connect.collection("items").findOne(myquery);
	if (result) {
		console.log("item already exists");
		response.json({ message: "item already exists" });
	} else {
		db_connect.collection("items").insertOne(myobj, function (err, res) {
			if (err) throw err;
			console.log("1 document inserted");
			response.json(res);
		});
	}
});

// update item
itemRoutes.route("item/update/:id").post(function (req, response) {
	let db_connect = dbo.getDb();
	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = {
	  $set: {
		item_name: req.body.item_name,
		item_description: req.body.item_description
		//item_image: req.body.item_image, need to figure out how to upload image
	  },
	};
	db_connect
	  .collection("items")
	  .updateOne(myquery, newvalues, function (err, res) {
		if (err) throw err;
		console.log("1 document updated");
		response.json(res);
	  });
   });

itemRoutes.route("items/:id").delete((req, response) => {
	let db_connect = dbo.getDb();
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("items").deleteOne(myquery, function (err, obj) {
	  if (err) throw err;
	  console.log("1 document deleted");
	  response.json(obj);
	});
   });

module.exports = itemRoutes;