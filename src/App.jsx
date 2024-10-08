import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ContestantProvider } from "./contexts/ContestantContext";
import { ChallengeProvider } from "./contexts/ChallengeContext";
import ContestantsPage from "./pages/ContestantsPage/ContestantsPage"
import ContestantDetailsPage from "./pages/ContestantDetailsPage/ContestantDetailsPage"
import ChallengesPage from "./pages/ChallengesPage/ChallengesPage"
import ChallengeDetailsPage from "./pages/ChallengeDetailsPage/ChallengeDetailsPage"
import Error404Page from "./pages/Error404Page/Error404Page"
import "./App.scss";

function App() {
  return (
      <BrowserRouter>
        <ContestantProvider>
        <ChallengeProvider>
          <Routes>
            <Route path="/" element={<ContestantsPage />} />
            <Route path="/contestants" element={<Navigate to="/" />} />
            <Route path="/contestants/:id" element={<ContestantDetailsPage />} />
            <Route path="/challenges" element={<ChallengesPage />} />
            <Route path="/challenges/:id" element={<ChallengeDetailsPage />} />
            <Route path="*" element={<Error404Page />} />
          </Routes>
        </ChallengeProvider>
        </ContestantProvider>
      </BrowserRouter>
  );
}

export default App;
