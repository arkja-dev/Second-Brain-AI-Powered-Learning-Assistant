import { useState } from "react";
import API from "../services/api";

function Quiz() {

  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState("");

  const generateQuiz = async () => {

    const res = await API.post("/quiz", {
      topic: topic
    });

    setQuiz(res.data.quiz);

  };

  return (

    <div className="p-10 max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Generate Quiz
      </h1>

      <input
        className="border p-2 w-full mb-4"
        placeholder="Enter topic..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <button
        onClick={generateQuiz}
        className="bg-purple-600 text-white px-6 py-2 rounded"
      >
        Generate Quiz
      </button>

      {quiz && (

        <div className="mt-6 bg-white p-6 shadow rounded">

          <h2 className="text-xl font-semibold mb-3">
            Quiz
          </h2>

          <pre className="whitespace-pre-wrap">
            {quiz}
          </pre>

        </div>

      )}

    </div>

  );
}

export default Quiz;
