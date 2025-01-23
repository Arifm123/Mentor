import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/main.css'
import Routing from './config/router.config'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <Routing/>
  </StrictMode>,
)
