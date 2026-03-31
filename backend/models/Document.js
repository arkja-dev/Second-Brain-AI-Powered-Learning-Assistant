const mongoose = require("mongoose");

const chunkSchema = new mongoose.Schema({
  text: String,
  embedding: [Number]
});

const documentSchema = new mongoose.Schema({
  title: String,
  chunks: [chunkSchema]
});

module.exports = mongoose.model("Document", documentSchema);
