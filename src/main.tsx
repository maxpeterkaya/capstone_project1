import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <div className={"min-w-screen ml-auto mr-auto text-center"}>
          <App />
      </div>
  </StrictMode>,
)
