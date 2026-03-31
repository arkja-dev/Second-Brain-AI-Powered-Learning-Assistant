import { Link } from "react-router-dom";

function Navbar() {

  return (

    <div className="bg-gray-900 text-white p-4 flex justify-between">

      <h1 className="text-xl font-bold">
        Cortex Learning Assistant
      </h1>

      <div className="flex gap-6">

        <Link to="/">Dashboard</Link>
        <Link to="/ask">Ask</Link>
        <Link to="/quiz">Quiz</Link>
        <Link to="/upload">Upload</Link>
        <Link to="/study-plan">Study Plan</Link>

      </div>

    </div>

  );
}

export default Navbar;
