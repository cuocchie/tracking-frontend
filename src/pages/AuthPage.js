import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";

const AuthPage = () => {
  const personalPass = "mySecretPass"; // The stored pass
  const [inputPass, setInputPass] = useState(""); // User input
  const [errorMessage, setErrorMessage] = useState(""); // Error message
  const navigate = useNavigate(); // For redirecting to the landing page

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputPass === personalPass) {
      // Redirect to the landing page if the pass is correct
      navigate("/landing");
    } else {
      // Show error message if the pass is incorrect
      setErrorMessage("Not Allowed. Incorrect Pass.");
    }
  };

  return (
    <div className="auth-page">
      <h1>Authentication</h1>
      {/* Responsive Image */}
      <img
        src="../first_image.png"
        alt="Authentication Illustration"
        className="auth-image"
      />
      <form onSubmit={handleSubmit}>
        <label htmlFor="secret-pass">Enter your secret pass:</label>
        <input
          type="password"
          id="secret-pass"
          value={inputPass}
          onChange={(e) => setInputPass(e.target.value)}
          placeholder="Secret Pass"
        />
        <button type="submit">Submit</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default AuthPage;