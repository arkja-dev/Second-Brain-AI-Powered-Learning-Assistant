const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash"
});

async function askGemini(context, question) {

  const prompt = `
You are an AI learning assistant.

Answer the question using ONLY the context below.

Context:
${context}

Question:
${question}

Give a clear answer in bullet points.
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;

  return response.text();
}

module.exports = askGemini;
