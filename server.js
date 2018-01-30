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

	//and remove cacheing so we get the most recent comments
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
		// looks at Comment schema
		Party.find(function(err, parties) {
			if (err) res.send(err);
			res.json(parties);
		});
	})

// 	// post new comment to db
// 	.post(function(req, res) {
// 		var comment = new Comment();
// 		// bodyParser lets us use req.body
// 		comment.author = req.body.author;
// 		comment.text = req.body.text;

// 		comment.save(function(err) {
// 			if (err) res.send(err);
// 			res.json({ message: "Comment successfully added!" });
// 		});
// 	});

// router
// 	.route("/comments/:comment_id")
// 	.put(function(req, res) {
// 		Comment.findById(req.params.comment_id, function(err, comment) {
// 			if (err) res.send(err);
// 			req.body.author ? (comment.author = req.body.author) : null;
// 			req.body.text ? (comment.text = req.body.text) : null;

// 			comment.save(function(err) {
// 				if (err) res.send(err);
// 				res.json({ message: "Comment has been updated" });
// 			});
// 		});
// 	})

// 	.delete(function(req, res) {
// 		Comment.remove({ _id: req.params.comment_id }, function(err, comment) {
// 			if (err) res.send(err);
// 			res.json({ message: "Comment has been deleted" });
// 		});
// 	});

//Use our router configuration when we call /api
app.use("/api", router);

//starts the server and listens for requests
app.listen(port, function() {
	console.log(`api running on port ${port}`);
});
