import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";  // Import Login Page

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);  // Set login state to true after successful login
  };

  return (
    <Router>
      <Routes>
        {/* If logged in, render Layout, else render LoginPage */}
        <Route path="/" element={isLoggedIn ? <Layout /> : <LoginPage onLoginSuccess={handleLoginSuccess} />} />
      </Routes>
    </Router>
  );
};

export default App;
