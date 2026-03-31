import { useState } from "react";
import API from "../services/api";

function Ask() {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {

    if (!question) return;

    setLoading(true);

    try {

      const res = await API.post("/ask", {
        question: question
      });

      setAnswer(res.data.answer);

    } catch (error) {

      console.log(error);

    }

    setLoading(false);
  };

  return (

    <div className="p-10 max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Ask Your Study Material
      </h1>

      <textarea
        className="w-full border p-3 rounded mb-4"
        rows="4"
        placeholder="Ask a question from your uploaded PDF..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button
        onClick={askQuestion}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Ask
      </button>

      {loading && (
        <p className="mt-4">Thinking...</p>
      )}

      {answer && (
        <div className="mt-6 bg-white p-6 shadow rounded">

          <h2 className="text-xl font-semibold mb-2">
            Answer
          </h2>

          <p className="mb-4">{answer}</p>

<button
  className="bg-green-600 text-white px-4 py-2 rounded"
  onClick={async () => {

    await API.post("/bookmark", {
      topic: question
    });

    alert("Bookmarked for revision!");

  }}
>
  Bookmark Topic
</button>


        </div>
      )}

    </div>

  );
}

export default Ask;
