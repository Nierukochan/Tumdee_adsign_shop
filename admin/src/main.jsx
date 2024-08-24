import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Createproduct from './pages/CreateProduct.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Createproduct />
  </StrictMode>,
)
