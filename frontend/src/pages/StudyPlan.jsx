import { useState } from "react";
import API from "../services/api";

function StudyPlan() {

  const [topic, setTopic] = useState("");
  const [days, setDays] = useState(7);
  const [plan, setPlan] = useState("");

  const generatePlan = async () => {

    const res = await API.post("/study-plan", {
      topic,
      days
    });

    setPlan(res.data.plan);

  };

  return (

    <div className="p-10 max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        AI Study Plan Generator
      </h1>

      <input
        className="border p-2 w-full mb-4"
        placeholder="Topic..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <input
        type="number"
        className="border p-2 w-full mb-4"
        value={days}
        onChange={(e) => setDays(e.target.value)}
      />

      <button
        onClick={generatePlan}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Generate Plan
      </button>

      {plan && (

        <div className="mt-6 bg-white p-6 shadow rounded">

          <h2 className="text-xl font-semibold mb-3">
            Study Plan
          </h2>

          <pre className="whitespace-pre-wrap">
            {plan}
          </pre>

        </div>

      )}

    </div>

  );
}

export default StudyPlan;
