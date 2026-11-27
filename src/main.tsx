import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import FavoritesProvider from './context/FavoritesContext'
import NotesProvider from './context/NotesContext'
import './styles/tokens.css'
import './styles/base.css'
import './styles/layout.css'
import './styles/components.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
        <NotesProvider>
          <App />
        </NotesProvider>
      </FavoritesProvider>
    </BrowserRouter>
  </StrictMode>,
)
