const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const Document = require("../models/Document");

const upload = multer({ dest: "uploads/" });

function splitIntoChunks(text, size = 1000) {
  const chunks = [];
  for (let i = 0; i < text.length; i += size) {
    chunks.push(text.slice(i, i + size));
  }
  return chunks;
}

router.post("/upload", upload.single("file"), async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("Uploaded File:", req.file);

    const dataBuffer = fs.readFileSync(req.file.path);

    const pdfData = await pdfParse(dataBuffer);

    const chunks = splitIntoChunks(pdfData.text, 1000);

    const newDoc = new Document({
      title: req.file.originalname,
      chunks: chunks
});

    await newDoc.save();

    res.json({
      message: "PDF uploaded and processed successfully"
    });

  } catch (error) {

    console.log("UPLOAD ERROR:", error);

    res.status(500).json({
      error: "PDF processing failed",
      details: error.message
    });

  }
});

module.exports = router;
