//server.js
"use strict";

require("dotenv").config();

//first we import our dependencies...
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var Party = require("./src/model/parties");

//and create our instances
var app = express();
var router = express.Router();

//set our port to either a predetermined port number if you have set it up, or 3001
var port = process.env.API_PORT || 3001;
var user = process.env.DB_USER;
var pass = process.env.DB_PASS;

//db config
mongoose.connect(
	`mongodb://${user}:${pass}@ds117888.mlab.com:17888/wedding-management`
);

//now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET,HEAD,OPTIONS,POST,PUT,DELETE"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
	);

	//and remove cacheing so we get the most recent parties
	res.setHeader("Cache-Control", "no-cache");
	next();
});

//now  we can set the route path & initialize the API
router.get("/", function(req, res) {
	res.json({ message: "API Initialized!" });
});

router
	.route("/parties")
	// retrieve all parties from db
	.get(function(req, res) {
		// looks at Party schema
		Party.find(function(err, parties) {
			if (err) res.send(err);
			res.json(parties);
		});
	})

	// post new party to db
	.post(function(req, res) {
		var party = new Party();
		// bodyParser lets us use req.body
		party.party_name = req.body.party_name;
		party.guests = req.body.guests; // array of objects
		party.partyBelongsTo = req.body.partyBelongsTo;
		party.isFamily = req.body.isFamily;
		party.priority = req.body.priority;
		party._id = req.body._id;

		party.save(function(err) {
			if (err) res.send(err);
			res.json({ message: "Party successfully added!" });
		});
	});

router
	.route("/parties/:party_id")

		.put(function(req, res) {
			Party.findById(req.params.party_id, function(err, party) {
				if (err) res.send(err);
				req.body.party_name ? (party.party_name = req.body.party_name) : null;
				req.body.guests ? (party.guests = req.body.guests) : null;
				req.body.partyBelongsTo ? (party.partyBelongsTo = req.body.partyBelongsTo) : null;
				req.body.isFamily ? (party.isFamily = req.body.isFamily) : null;
				req.body.priority ? (party.priority = req.body.priority) : null;

				party.save(function(err) {
					if (err) res.send(err);
					res.json({ message: "Party has been updated" });
				});
			});
		})

	.delete(function(req, res) {
		Party.remove({ _id: req.params.party_id }, function(err, party) {
			if (err) res.send(err);
			res.json({ message: "Party has been deleted" });
		});
	});

//Use our router configuration when we call /api
app.use("/api", router);

//starts the server and listens for requests
app.listen(port, function() {
	console.log(`api running on port ${port}`);
});
