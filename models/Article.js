var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor create comments
var CommentSchema = new Schema({
  user: {type: String},
  body: {type: String}
});

var ArticleSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true
  },
  // `link` is required and of type String
  link: {
    type: String,
    required: true
  },

  summary: {
    type: String
  },

  // comments are an array of objects containing the comment_id and the reference
  comments: { 
    type: [CommentSchema]
  }
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;