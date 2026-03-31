import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudyPlan from "./pages/StudyPlan";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Ask from "./pages/Ask";
import Quiz from "./pages/Quiz";
import Upload from "./pages/Upload";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/ask" element={<Ask />} />

        <Route path="/quiz" element={<Quiz />} />

        <Route path="/upload" element={<Upload />} />

        <Route path="/study-plan" element={<StudyPlan />} />
      </Routes>

    </BrowserRouter>

  );

}

export default App;
