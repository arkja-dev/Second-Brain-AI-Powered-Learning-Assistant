const express = require("express");
const router = express.Router();
const Document = require("../models/Document");

router.get("/documents", async (req, res) => {

  try {

    const docs = await Document.find().select("_id title");

    res.json(docs);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

module.exports = router;
