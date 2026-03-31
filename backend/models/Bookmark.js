const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({

  topic: {
    type: String,
    required: true
  },

  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Bookmark", bookmarkSchema);
