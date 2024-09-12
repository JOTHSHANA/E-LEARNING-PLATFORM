import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AOS from 'aos'
import 'aos/dist/aos.css';

var width = window.innerWidth;

if (width <= 600) {
  AOS.init({
    offset: 200,
    duration: 1000
  });
} else if (width > 600 && width <= 900) {
  AOS.init({
    offset: 300,
    duration: 1000
  });
} else {
  AOS.init(
    {
      offset: 300,
      duration: 2000
    }
  );
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
