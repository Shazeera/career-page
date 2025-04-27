import React, { useState } from "react";

const LoginPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Version and Build Number
  const version = "1.0.0";  // Version number
  const buildNumber = "002"; // Build number

  const handleSubmit = (e) => {
    e.preventDefault();

    // Password validation logic
    if (password === "12345") {
      setErrorMessage("");  // Clear any previous error message
      onLoginSuccess();  // On successful login, trigger the onLoginSuccess function
    } else {
      setErrorMessage("Invalid password. Please try again.");
    }
  };

  return (
    <>
      <style>
        {`
          body {
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
            background-color: #f0f0f0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }

          .login-container {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .login-box {
            background-color: #fff;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            width: 100%;
            text-align: center;
          }

          h1 {
            margin-bottom: 20px;
            font-size: 2rem;
            color: #333;
          }

          .login-input {
            width: 100%;
            padding: 12px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 1rem;
          }

          .login-btn {
            width: 100%;
            padding: 14px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 1.2rem;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .login-btn:hover {
            background-color: #45a049;
          }

          .error-message {
            color: red;
            margin-top: 10px;
            font-size: 0.9rem;
          }

          .note {
            margin-top: 20px;
            font-size: 0.9rem;
            color: #666;
          }

          .footer {
            margin-top: 20px;
            font-size: 0.8rem;
            color: #999;
            text-align: center;
          }
        `}
      </style>

      <div className="login-container">
        <div className="login-box">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
            />
            <button type="submit" className="login-btn">Login</button>
          </form>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <p className="note">Use any email, but the password must be "12345".</p>
          
          {/* Footer with Version and Build number */}
          <div className="footer">
            <p>Version: {version} | Build: {buildNumber}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
