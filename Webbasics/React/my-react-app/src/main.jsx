import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import CardsApp from "./Apps/CardsApp/CardsApp.jsx";
import MovieApp from "./Apps/MovieApp/MovieApp.tsx";
import { BrowserRouter } from "react-router-dom";
import ZustandApp from "./Apps/ZustandApp/ZustandApp.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/*<BrowserRouter>
               <MovieApp/>
             </BrowserRouter>
             */}
    {/*<CardsApp />*/}
    <ZustandApp />
  </StrictMode>,
);
