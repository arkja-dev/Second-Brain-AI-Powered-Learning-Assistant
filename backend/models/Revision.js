const mongoose = require("mongoose");

const revisionSchema = new mongoose.Schema({

  topic: {
    type: String,
    required: true
  },

  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document"
  },

  revisionDate: {
    type: Date,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Revision", revisionSchema);
