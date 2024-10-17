import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import './App.css'
import Dashboard from './pages/Dashboard/Dashboard'
import LoginSignup from "./pages/Login/Login";
import Login from "./pages/Login/google";
import { ThemeProviderComponent } from "./components/appLayout/muiTheme";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import Course from "./pages/Course/course";
import Courses from "./pages/Courses/Courses";
import Forum from "./pages/DiscussionForum/Forum";
import CourseDetails from "./pages/CourseDetails/CourseDetails";
import Learning from "./pages/learning/learning";
import Practice from "./pages/Practice/Practice";
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <div>
      <Toaster />
      <ThemeProviderComponent>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/login" element={<LoginSignup />} />
              <Route path="/google" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/" element={<LandingPage />} />
              <Route path="/landingPage" element={<LandingPage />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courseDetails" element={<CourseDetails />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/learning" element={<Learning />} />
              <Route path="/practice" element={<Practice />} />
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
