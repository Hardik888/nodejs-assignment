import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpPage from "./Components/signup/SignUp";
import LoginPage from "./Components/login/Login";
import Dashboard from "./Components/dashboard/Dashboard";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
