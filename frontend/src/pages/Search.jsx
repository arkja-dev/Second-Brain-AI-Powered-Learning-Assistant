import { useState } from "react";
import API from "../services/api";

function Search() {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const search = async () => {

    try {

      const res = await API.post("/search", {
        query
      });

      console.log(res.data);   // DEBUG

      setResults(res.data.results || []);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="p-10 max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Semantic Search
      </h1>

      <input
        className="border p-2 w-full mb-4"
        placeholder="Search your study materials..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button
        onClick={search}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Search
      </button>

      {results.length === 0 && (
        <p className="mt-6 text-gray-500">
          No results yet. Try searching something.
        </p>
      )}

      <div className="mt-6 space-y-4">

        {results.map((r, index) => (

          <div
            key={index}
            className="bg-white p-4 shadow rounded"
          >

            <p>{r.text}</p>

          </div>

        ))}

      </div>

    </div>

  );
}

export default Search;
