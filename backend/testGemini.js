const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyC_zRnuiLM2llaqvS-MIQV38KbxwNTGu_Q");

async function run() {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const result = await model.generateContent("Explain binary search simply");

    console.log(result.response.text());
  } catch (error) {
    console.error("ERROR:", error);
  }
}

run();
