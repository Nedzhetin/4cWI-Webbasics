import Register from "./components/Register.tsx";
import { Routes, Route } from "react-router-dom";
import Users from "./components/Users.tsx";

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path={"/users"} element={<Users />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
