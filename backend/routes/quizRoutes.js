const express = require("express");
const router = express.Router();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

router.post("/quiz", async (req, res) => {

  try {

    const { topic } = req.body;

    const prompt = `
Generate 5 multiple choice questions about ${topic}.

Each question should have:
- Question
- 4 options (A,B,C,D)
- Correct answer
`;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });

    res.json({
      quiz: result.text
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

module.exports = router;
