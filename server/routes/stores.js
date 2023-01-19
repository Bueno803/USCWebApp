const express = require("express");

const storeRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

// get all stores
storeRoutes.route("/stores").get(function (req, res) {
	let db_connect = dbo.getDb("production");
	db_connect
	  .collection("stores")
	  .find({})
	  .toArray(function (err, result) {
		if (err) throw err;
		res.json(result);
	  });
   });

// get store by id
storeRoutes.route("/stores/:id").get(function (req, res) {
	let db_connect = dbo.getDb();
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect
	  .collection("stores")
	  .findOne(myquery, function (err, result) {
		if (err) throw err;
		res.json(result);
	  });
   });

// add store
storeRoutes.route("/stores/add").post(function (req, response) {
	let db_connect = dbo.getDb();
	let myobj = {
		name: req.body.name,
		address: req.body.address,
		//store_image: req.body.store_image, // todo: add image upload
		sections: req.body.sections // array
	};
	db_connect.collection("stores").insertOne(myobj, function (err, res) {
	  if (err) throw err;
	  response.json(res);
	});
   });

// update store
storeRoutes.route("store/update/:id").post(function (req, response) {
	let db_connect = dbo.getDb();
	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = {
	  $set: {
		name: req.body.name,
		address: req.body.address,
		//store_image: req.body.store_image, // todo: add image upload
		sections: req.body.sections // array
	  },
	};
	db_connect
	  .collection("stores")
	  .updateOne(myquery, newvalues, function (err, res) {
		if (err) throw err;
		console.log("1 document updated");
		response.json(res);
	  });
   });

// delete store
// This section will help you delete a record
storeRoutes.route("stores/:id").delete((req, response) => {
	let db_connect = dbo.getDb();
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("stores").deleteOne(myquery, function (err, obj) {
	  if (err) throw err;
	  console.log("1 document deleted");
	  response.json(obj);
	});
   });

module.exports = storeRoutes;