var express = require("express");
var router = express.Router();


// Import the model to use its database functions.
var db = require("../models");


// Create home route and serve db data
router.get("/", function(req, res) {
  db.Article.find({})
  .then(function(dbArticle) {
    //show newest articles first
    var articles = {article : dbArticle.reverse()}
    res.render('index', articles);
  })
});

// Route for getting all Articles from the db
router.get("/articles", function(req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
        .then(function(dbArticle) {
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbArticle);
        })
        .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
        });
});

// Route for grabbing a specific Article by id, populate it with it's note
router.get("/comments/:id", function(req, res) {
    db.Article.findOne({ _id: req.params.id })
      .then(function(dbArticle) {
        // If we were able to successfully find an Article with the given id, send it back to the client
        res.render('comments', dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
});

module.exports = router;