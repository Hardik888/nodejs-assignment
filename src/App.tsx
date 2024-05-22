import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpPage from "./Components/SignUp";
import LoginPage from "./Components/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
