import { useState } from "react";
import API from "../services/api";

function Upload() {

  const [file, setFile] = useState(null);

  const uploadPDF = async () => {

    const formData = new FormData();
    formData.append("file", file);

    await API.post("/upload", formData);

    alert("PDF uploaded successfully");

  };

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Upload Study Material
      </h1>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={uploadPDF}
        className="ml-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Upload
      </button>

    </div>

  );
}

export default Upload;
