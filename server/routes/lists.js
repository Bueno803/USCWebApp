const express = require("express");

const listRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

// get all lists
listRoutes.route("/lists").get(function (req, res) {
	console.log("GET /lists");
	let db_connect = dbo.getDb("production");
	db_connect
	  .collection("lists")
	  .find({})
	  .toArray(function (err, result) {
		if (err) throw err;
		res.json(result);
	  });
   });

// get list by id
listRoutes.route("/lists/:id").get(function (req, res) {
	console.log("GET /lists/:id");
	let db_connect = dbo.getDb();
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect
	  .collection("lists")
	  .findOne(myquery, function (err, result) {
		if (err) throw err;
		res.json(result);
	  });
});

// update list by id
listRoutes.route("/lists/:id/name").put(function (req, res) {
	console.log("PUT /lists/:id/name");
	let db_connect = dbo.getDb();
	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = { $set: { listName: req.body.listName } };
	db_connect
	  .collection("lists")
	  .updateOne(myquery, newvalues, function (err, result) {
		if (err) throw err;
		res.json(result);
	  });
});



// gets all the items in a specific list
listRoutes.route("/lists/:id/items").get(function (req, res) {
	console.log("GET /lists/:id/items");
	let db_connect = dbo.getDb();
	var listOfObjectIds = [];
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect
	  .collection("lists")
	  .findOne(myquery, function (err, result) {
		if (err) throw err;
		for(let i = 0; i < result.listItems.length; i++) {
			var objId = ObjectId(result.listItems[i]);
			listOfObjectIds.push(objId);
		}
		db_connect
		  .collection("items")
		  .find({ _id: { $in: listOfObjectIds } })
		  .toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		  });
	});
});

// add an item to a list given the list id and item id
listRoutes.route("/lists/:id/additem").post(function (req, res) {
	console.log("POST /lists/:id/additem");
	// make sure item isnt already in list
	let db_connect = dbo.getDb();
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect
	  .collection("lists")
	  .findOne(myquery, function (err, result) {
		if (err) throw err;
		for (let i = 0; i < result.listItems.length; i++) {
			if (result.listItems[i].toString() == req.body.itemId) {
				console.log("Item already in list");
				res.json({ message: "Item already in list" });
				return;
			}
		}
	
		let myquery = { _id: ObjectId(req.params.id) };
		let newvalues = { $push: { listItems: ObjectId(req.body.itemId) } };
		db_connect
			.collection("lists")
			.updateOne(myquery, newvalues, function (err, result) {
				if (err) throw err;
				res.json(result);
			});
	});
});

// remove an item from a list given the list id and item id
listRoutes.route("/lists/:id/deleteItem").post(function (req, res) {
	console.log("POST /lists/:id/deleteItem");
	// make sure item is in list
	let db_connect = dbo.getDb();
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect
	  .collection("lists")
	  .findOne(myquery, function (err, result) {
		if (err) throw err;
		let itemInList = false;
		for (let i = 0; i < result.listItems.length; i++) {
			if (result.listItems[i].toString() == req.body.itemId) {
				itemInList = true;
				break;
			}
		}
		if (!itemInList) {
			console.log("Item not in list");
			res.json({ message: "Item not in list" });
			return;
		}
		let myquery = { _id: ObjectId(req.params.id) };
		let newvalues = { $pull: { listItems: ObjectId(req.body.itemId) } };
		db_connect
			.collection("lists")
			.updateOne(myquery, newvalues, function (err, result) {
				if (err) throw err;
				res.json(result);
			}
		);
	});
});

// create a new list
listRoutes.route("/lists/add").post(function (req, res) {
	console.log("POST /lists/add");
	let db_connect = dbo.getDb();
	let myobj = { listName: req.body.listName, listItems: [] };
	db_connect.collection("lists").insertOne(myobj, function (err, result) {
		if (err) throw err;
		res.json(result);
	});
});

// delete a list
listRoutes.route("/lists/:id/delete").delete(function (req, res) {
	console.log("DELETE /lists/:id/delete");	
	let db_connect = dbo.getDb();
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("lists").deleteOne(myquery, function (err, result) {
		if (err) throw err;
		res.json(result);
	});
});

module.exports = listRoutes;