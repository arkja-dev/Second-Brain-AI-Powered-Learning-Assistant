const express = require("express");
const router = express.Router();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

router.post("/study-plan", async (req, res) => {

  try {

    const { topic, days } = req.body;

    const prompt = `
Create a ${days}-day study plan to learn the topic: ${topic}.

Each day should include:
- Topic to study
- Key concept
- Practice task

Format clearly.
`;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });

    res.json({
      plan: result.text
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

module.exports = router;
