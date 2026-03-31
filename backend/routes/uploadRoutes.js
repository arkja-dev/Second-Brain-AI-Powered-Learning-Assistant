const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

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
      return res.status(400).json({
        error: "No file uploaded"
      });
    }

    const dataBuffer = fs.readFileSync(req.file.path);

    const pdfData = await pdfParse(dataBuffer);

    const textChunks = splitIntoChunks(pdfData.text);

    const chunkObjects = [];

    for (const chunk of textChunks) {

      const result = await ai.models.embedContent({
        model: "gemini-embedding-001",
        contents: chunk
      });

      const embedding = result.embeddings[0].values;

      chunkObjects.push({
        text: chunk,
        embedding: embedding
      });

    }

    const newDoc = new Document({
      title: req.file.originalname,
      chunks: chunkObjects
    });

    await newDoc.save();

    res.json({
      message: "PDF uploaded and embeddings stored successfully"
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
