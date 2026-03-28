const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  title: String,
  chunks: [String],
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Document", DocumentSchema);
