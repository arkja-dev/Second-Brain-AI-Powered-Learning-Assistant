const express = require("express");
const router = express.Router();
const { GoogleGenAI } = require("@google/genai");
const cosineSimilarity = require("compute-cosine-similarity");

const Document = require("../models/Document");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

router.post("/search", async (req, res) => {

  try {

    const { query } = req.body;

    const embeddingResult = await ai.models.embedContent({
      model: "gemini-embedding-001",
      contents: query
    });

    const queryEmbedding = embeddingResult.embeddings[0].values;

    const docs = await Document.find();

    let results = [];

    docs.forEach(doc => {

      doc.chunks.forEach(chunk => {

        const score = cosineSimilarity(
          queryEmbedding,
          chunk.embedding
        );

        results.push({
          text: chunk.text,
          score: score
        });

      });

    });

    results.sort((a, b) => b.score - a.score);

    const topResults = results.slice(0, 5);

    res.json({
      results: topResults
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

module.exports = router;
