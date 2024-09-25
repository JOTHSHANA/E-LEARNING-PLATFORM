import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import './App.css'
import Dashboard from './pages/Dashboard/Dashboard'
import LoginSignup from "./pages/Login/Login";
import { ThemeProviderComponent } from "./components/appLayout/muiTheme";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import Course from "./pages/Course/course";
import Courses from "./pages/Courses/Courses";
import Forum from "./pages/DiscussionForum/Forum";

function App() {
  return (
    <div>
      <ThemeProviderComponent>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/login" element={<LoginSignup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/" element={<LandingPage />} />
              <Route path="/landingPage" element={<LandingPage />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/forum" element={<Forum />} />
            </Routes>
            <div className="area">
              <ul className="circles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
          </div>
        </BrowserRouter>
      </ThemeProviderComponent>
    </div >
  )
}

export default App
