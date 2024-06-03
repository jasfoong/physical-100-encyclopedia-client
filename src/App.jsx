import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.scss";
import ContestantsPage from "./pages/ContestantsPage/ContestantsPage"
import ChallengesPage from "./pages/ChallengesPage/ChallengesPage"
import ContestantDetailsPage from "./pages/ContestantDetailsPage/ContestantDetailsPage"

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ContestantsPage />} />
          <Route path="/contestants/:id" element={<ContestantDetailsPage />} />
          <Route path="/challenges" element={<ChallengesPage />} />
          <Route path="/challenges/:id" element={<ChallengesPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
