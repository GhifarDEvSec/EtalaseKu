import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource-variable/plus-jakarta-sans'
import App from './App'
import FavoritesProvider from './context/FavoritesContext'
import NotesProvider from './context/NotesContext'
import ThemeProvider from './context/ThemeContext'
import ToastProvider from './context/ToastContext'
import './styles/tokens.css'
import './styles/base.css'
import './styles/layout.css'
import './styles/components.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ToastProvider>
          <FavoritesProvider>
            <NotesProvider>
              <App />
            </NotesProvider>
          </FavoritesProvider>
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
