import { BrowserRouter, Routes, Route } from "react-router-dom";

import SkillHomes from "./pages/skillhomes";
import Navbar from "./components/navbar";
import Dashboard from "./pages/dashboard";
import EditProfile from "./pages/editprofile";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<SkillHomes />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit/:id" element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;