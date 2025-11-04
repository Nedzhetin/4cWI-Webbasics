import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import CardsApp from './Apps/CardsApp/CardsApp.jsx'
import AuthApp from './Apps/AuthApp/AuthApp.tsx'
import MovieApp from './Apps/MovieApp/MovieApp.tsx'
import { BrowserRouter } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  <StrictMode>
   {
   /*<BrowserRouter>
      <MovieApp/>
    </BrowserRouter>
    */
    }
    {/*<CardsApp/>*/}

    <AuthApp/>
  

    
  </StrictMode>,
)
