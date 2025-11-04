import Home from "./pages/Home.tsx";
import { Routes, Route } from "react-router-dom";
import Favorites from "./pages/Favorites.tsx";
import NavBar from "./components/NavBar.tsx";
import { MovieProvider } from "./context/MovieContext.tsx";

function App() {
  return (
    <MovieProvider>
      <div className="w-screen h-screen bg-gray-700 overflow-x-hidden">
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
      </div>
    </MovieProvider>
  );
}

export default App;
