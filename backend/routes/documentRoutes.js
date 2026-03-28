const express = require("express");
const router = express.Router();
const Document = require("../models/Document");

router.post("/upload", async (req, res) => {
  try {
    const { title, content } = req.body;

    const newDoc = new Document({
      title,
      content
    });

    await newDoc.save();

    res.json({ message: "Document stored successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
