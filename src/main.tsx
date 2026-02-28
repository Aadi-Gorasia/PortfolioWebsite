import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import SmoothScroll from './components/SmoothScroll'; 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <SmoothScroll>
      <App />
    </SmoothScroll>
    </BrowserRouter>
  </StrictMode>,
)
