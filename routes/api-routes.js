//scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

//handles routing
var express = require("express");
var router = express.Router();

var db = require("../models");

// A GET route for scraping the NPR Science page
router.get("/scrape", function(req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://www.npr.org/sections/science/").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);
  
      // Now, we grab every h2 within an article tag, and do the following:
      $(".title").each(function(i, element) {
        // Save an empty result object
        var result = {};
  
        // Add the text and href of every link
        result.title = $(this)
          .children("a")
          .text();
        result.link = $(this)
          .children("a")
          .attr("href");
  
        // only add Article if not found in the database
        db.Article.find({title: result.title})
        .then(function(dbArticle) {
          if(dbArticle.length === 0) {
            // Create a new Article using the `result` object built from scraping
            db.Article.create(result)
            .then(function(dbArticle) {
              // View the added result in the console
              console.log(dbArticle);
              res.end();
            })
            .catch(function(err) {
              // If an error occurred, log it
              console.log(err);
            });
          }
        });
       
      });
    });
});
  
// Route for saving/updating an Article's associated Note
router.post("/articles/:id", function(req, res) {
  // Create a new note and pass the req.body to the entry
  db.Note.create(req.body)
      .then(function(dbNote) {
      // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
      })
      .then(function(dbArticle) {
      // If we were able to successfully update an Article, send it back to the client
      res.json(dbArticle);
      })
      .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
      });
});

// Route for saving/updating an Article's associated Note
router.delete("/articles/:id", function(req, res) {
  // Destroys entry from database
  db.Article.remove({_id : req.params.id})
  .then(function(data) {
    console.log('deleted', data);
    res.json(data);
  });
});


module.exports = router;