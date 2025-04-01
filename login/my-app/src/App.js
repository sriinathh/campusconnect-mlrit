import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="C:\Users\srinath\Downloads\mern\home.html" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
