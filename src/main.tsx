import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HashRouter } from "react-router-dom";
import SmoothScroll from './components/SmoothScroll'; 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
    <SmoothScroll>
      <App />
    </SmoothScroll>
    </HashRouter>
  </StrictMode>,
)
