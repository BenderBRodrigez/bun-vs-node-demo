import { Route, Routes } from "react-router-dom";

import { Home } from "./pages/home";
import { Interview } from "./pages/interview";
import { NotFound } from "./pages/not-found";
import { Review } from "./pages/review";
import { VoiceCheck } from "./pages/voice-check";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/voice-check" element={<VoiceCheck />} />
      <Route path="/interview" element={<Interview />} />
      <Route path="/review/:interviewId" element={<Review />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
