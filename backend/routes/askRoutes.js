const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Document = require("../models/Document");

function findRelevantChunks(question, docs, topK = 3) {

  const words = question.toLowerCase().split(" ");

  const scoredChunks = [];

  docs.forEach(doc => {
    doc.chunks.forEach(chunk => {

      let score = 0;

      words.forEach(word => {
        if (chunk.toLowerCase().includes(word)) {
          score++;
        }
      });

      scoredChunks.push({
        chunk,
        score
      });

    });
  });

  scoredChunks.sort((a, b) => b.score - a.score);

  return scoredChunks.slice(0, topK).map(item => item.chunk);
}

router.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

const docs = await Document.find();

const relevantChunks = findRelevantChunks(question, docs, 3);

const context = relevantChunks.join("\n");

    const prompt = `
Use the following study material to answer the question.

Material:
${context}

Question:
${question}
`;

    const result = await model.generateContent(prompt);

    const answer = result.response.text();

    res.json({ answer });

  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
