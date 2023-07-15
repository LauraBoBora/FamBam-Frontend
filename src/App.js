import { Route, Routes } from "react-router-dom";
import { Login, Signup } from "./pages";
import Home from "./pages/Home";
import Household from "./pages/Household";
import Kids from "./pages/Kids";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/household" element={<Household />} />
        <Route path="/kids" element={<Kids />} />
      </Routes>
    </div>
  );
}

export default App;