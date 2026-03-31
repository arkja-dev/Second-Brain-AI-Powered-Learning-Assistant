const express = require("express");
const router = express.Router();
const { GoogleGenAI } = require("@google/genai");

const Document = require("../models/Document");
const cosineSimilarity = require("compute-cosine-similarity");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

router.post("/ask", async (req, res) => {
  try {

    const { question, documentId } = req.body;

    // Create embedding for the question
    const embeddingResult = await ai.models.embedContent({
      model: "gemini-embedding-001",
      contents: question
    });

    const questionEmbedding = embeddingResult.embeddings[0].values;

    // Fetch documents
    let docs;

    if (documentId) {
      docs = await Document.find({ _id: documentId });
    } else {
      docs = await Document.find();
    }

    let scoredChunks = [];

    docs.forEach(doc => {

      doc.chunks.forEach(chunk => {

        const score = cosineSimilarity(
          questionEmbedding,
          chunk.embedding
        );

        scoredChunks.push({
          text: chunk.text,
          score: score
        });

      });

    });

    // Sort by similarity
    scoredChunks.sort((a, b) => b.score - a.score);

    // Take top 3 chunks
    const topChunks = scoredChunks.slice(0, 3);

    const context = topChunks.map(c => c.text).join("\n");

    const prompt = `
Use the following study material to answer the question.

Material:
${context}

Question:
${question}
`;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });

    const answer = result.text;

    res.json({ answer });

  } catch (error) {

    console.log("ERROR:", error);

    res.status(500).json({
      error: error.message
    });

  }
});

module.exports = router;
