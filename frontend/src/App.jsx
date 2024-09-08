import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import './App.css'
import Dashboard from './pages/Dashboard/Dashboard'
import LoginSignup from "./pages/Login/Login";
import { ThemeProviderComponent } from "./components/appLayout/muiTheme";
import LandingPage from "./pages/LandingPage/LandingPage";
import Courses from "./pages/Courses/Courses";
import Forum from "./pages/DiscussionForum/Forum";

function App() {
  return (
    <div>
      <ThemeProviderComponent>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/landingPage" element={<LandingPage />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/forum" element={<Forum />} />
          </Routes>
        </BrowserRouter>
      </ThemeProviderComponent>
    </div>
  )
}

export default App
