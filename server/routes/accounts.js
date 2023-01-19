const express = require("express");
const bcrypt = require('bcrypt');

const accountRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;
var nodemailer = require('nodemailer');
const jwt=require("jsonwebtoken")

const JWT_SECRET = "WPOI292834NF)(##N89D2389@#\[P[EPROGE024JLEFKWEF029ELOKF;W-0@#)"

// get all accounts
accountRoutes.route("/accounts").get(function (req, res) {
	console.log("get all accounts");
	let db_connect = dbo.getDb("production");
	db_connect
	  .collection("accounts")
	  .find({})
	  .toArray(function (err, result) {
		if (err) throw err;
		res.json(result);
	  });
   });

// get account by id
accountRoutes.route("/accounts/:id").get(function (req, res) {
	let db_connect = dbo.getDb();
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect
	  .collection("accounts")
	  .findOne(myquery, function (err, result) {
		if (err) throw err;
		res.json(result);
	  });
   });

   //verify account
	accountRoutes.route("/accounts/verify").post(async function (req, res) {
		console.log("verify account");
		let db_connect = dbo.getDb();


		var em = req.body.email;
		var pw = req.body.password;
		var ver = req.body.verified

		const found = await db_connect.collection("accounts").findOne({email: em});

		// Nested Object with string inside reference
		const found2 = await db_connect.collection("accounts").findOne({'password.realPassword': pw});
		const verified = await db_connect.collection("accounts").findOne({verified: ver});

		// console.log(found2)

		if (found) {
			const token = jwt.sign({em}, JWT_SECRET);
			return res.json({status: "OK", data: token});
		}	
		else {
			return res.status(404).send("Account not found");
		}
	});



   // get account by Email
accountRoutes.route("/accounts/:email").get(function (req, res) {
	let db_connect = dbo.getDb();
	let myquery = { email: ObjectId(req.params.email) };
	db_connect
	  .collection("accounts")
	  .findOne(myquery, function (err, result) {
		if (err) throw err;
		res.json(result);
	  });
   });

// add account
accountRoutes.route("/accounts/add").post( async (req, response)=> {
	try{

	
	let db_connect = dbo.getDb();
		
	if (!(req.body.first_name && req.body.last_name && req.body.email&& req.body.password)) {
		return response.status(400).send("All input is required");
	}
	var em = req.body.email ;
	const oldUser = await db_connect.collection("accounts").findOne({email: em});

	if (oldUser) {
		return response.status(409).send("User Already Exists. Please Login");
	  }

	  //send email verification code

	  var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
		  user: 'hamadusc@gmail.com',
		  pass: 'sebzcwaidvpllqrx'
		}
	  });
	  
	  
	  var mailOptions = {
		from: 'hamadusc@gmail.com',
		to: req.body.email,
		subject: 'Sending Email using Node.js',
		text: '123455'
	  };
	  
	  transporter.sendMail(mailOptions, function(err, res){
		if (err) {
		  throw err;
		} else {
		  console.log('Email sent: ' + response.json(res));
		  var pass = req.body.password;
		  var encryptedPassword = bcrypt.hash(pass, 10);
	  
		  let myobj = {
			  first_name: req.body.first_name,
			  last_name: req.body.last_name,
			  email: req.body.email,
			  password: encryptedPassword,
			  verified: req.body.verified,
		  };
		  db_connect.collection("accounts").insertOne(myobj, function (err, res) {
			if (err) throw err;
			response.json(res);
		  });
		}
	  });

	  //**************** */
}
catch(err){
	console.log(err);
}
});

//verification check
//get account by Token
accountRoutes.route("/accounts/checkverified").post(async function (req, res) {
	console.log("Check Verification");
	let db_connect = dbo.getDb();
	var em = req.body.email;

	const found = await db_connect.collection("accounts").findOne({email: em});
	console.log(found.verified);
	if (found.verified == true) {
		return res.json(true);
	} 
	else 
		return res.json(false);
});

//get account by Token
accountRoutes.route("/accounts/LoggedIn").post(function (req, res) {
	console.log("LoggedIn");
	
	const token = req.body.body.token;
	const temp = req.body.body.token;
	console.log(temp);
	try{
		// return res.json("OK");
		const user = jwt.verify(token, JWT_SECRET);
		console.log(user);
		const userEmail = user.em;
		console.log(userEmail);

			return res.json(userEmail);

	} catch (error) {

	}
});


   // get account by Email
//    accountRoutes.route("/accounts/addnewfield").get(function (req, res) {
// 	let db_connect = dbo.getDb();
// 	let myquery = { email: ObjectId(req.params.email) };
// 	db_connect
// 	  .collection("accounts")
// 	  .findOne(myquery, function (err, result) {
// 		if (err) throw err;
// 		res.json(result);
// 	  });
//    });


// update account
accountRoutes.route("account/update/:id").post(function (req, response) {
	let db_connect = dbo.getDb();
	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = {
	  $set: {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		password: req.body.password,
		currency: req.body.currency,
		dietaryRestrictions: req.body.dietaryRestrictions,
		language: req.body.language,
		default_store: req.body.default_store
	  },
	};
	db_connect
	  .collection("accounts")
	  .updateOne(myquery, newvalues, function (err, res) {
		if (err) throw err;
		console.log("1 document updated");
		response.json(res);
	  });
   });

// delete account
accountRoutes.route("accounts/:id").delete((req, response) => {
	let db_connect = dbo.getDb();
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("accounts").deleteOne(myquery, function (err, obj) {
	  if (err) throw err;
	  console.log("1 document deleted");
	  response.json(obj);
	});
   });

module.exports = accountRoutes;