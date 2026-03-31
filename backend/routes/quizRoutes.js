const express = require("express");
const router = express.Router();
const { GoogleGenAI } = require("@google/genai");

const Document = require("../models/Document");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

router.post("/generate-quiz", async (req, res) => {

  try {

    const { documentId, numQuestions } = req.body;

    const doc = await Document.findById(documentId);

    if (!doc) {
      return res.status(404).json({ error: "Document not found" });
    }

    const text = doc.chunks.map(c => c.text).join("\n").slice(0, 5000);

    const prompt = `
You are a study assistant.

Generate ${numQuestions || 5} multiple choice quiz questions from the following study material.

Material:
${text}

Return JSON format like this:

[
{
"question": "...",
"options": ["A","B","C","D"],
"answer": "..."
}
]
`;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });

    const quiz = result.text;

    res.json({ quiz });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message
    });

  }

});

module.exports = router;
