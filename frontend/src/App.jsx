import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import './App.css'
import Dashboard from './pages/Dashboard/Dashboard'
import LoginSignup from "./pages/Login/Login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
