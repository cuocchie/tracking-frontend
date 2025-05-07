import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { practicedDates, plannedPracticeDates } from "../data/practiceData"; // Import global data
import "./LandingPage.css";

const LandingPage = () => {
  const [practicedDays, setPracticedDays] = useState(0);
  const [nextPractice, setNextPractice] = useState(null);
  const [daysRemaining, setDaysRemaining] = useState(null);

  const navigate = useNavigate(); // Hook for navigation

  // Function to count unique practiced days
  const countPracticedDays = () => {
    const uniqueDates = new Set(practicedDates); // Use a Set to eliminate duplicate dates
    setPracticedDays(uniqueDates.size); // Count unique dates
  };

  // Function to determine the nearest upcoming practice day and remaining days
  const calculateNextPractice = () => {
    const today = new Date();
    const futureDates = plannedPracticeDates
      .map((date) => new Date(date)) // Convert to Date objects
      .filter((date) => date > today) // Filter out past dates
      .sort((a, b) => a - b); // Sort in ascending order

    if (futureDates.length > 0) {
      const nextDate = futureDates[0];
      const diffInTime = nextDate - today;
      const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

      setNextPractice(nextDate.toISOString().split("T")[0]); // Format as YYYY-MM-DD
      setDaysRemaining(diffInDays);
    } else {
      setNextPractice(null); // No future practice dates
      setDaysRemaining(null);
    }
  };

  useEffect(() => {
    countPracticedDays();
    calculateNextPractice();
  }, []);

  return (
    <div className="landing-page">
      <header className="landing-header">
        <h1 className="app-name">Practice Tracker</h1>
      </header>
      <main className="landing-content">
        <p className="app-description">
          Welcome to your personal Practice Tracker! Keep track of your progress and stay motivated.
        </p>
        <div className="streak-container">
          <h2>
            Total Practiced Days: {practicedDays}{" "}
            <span className="flame">🔥</span>
          </h2>
        </div>
        <div className="next-practice-container">
          {nextPractice ? (
            <p>
              Your next practice is on <strong>{nextPractice}</strong>, which is in{" "}
              <strong>{daysRemaining} day{daysRemaining > 1 ? "s" : ""}</strong>.
            </p>
          ) : (
            <p>No upcoming planned practice days scheduled.</p>
          )}
        </div>
        <div className="button-container">
          <button className="cta-button">Start Tracking</button>
          <button className="cta-button" onClick={() => navigate("/process")}>
            View in Detail
          </button>
        </div>
      </main>
      <footer className="landing-footer">
        <p>© 2025 Practice Tracker. Stay consistent, stay awesome!</p>
      </footer>
    </div>
  );
};

export default LandingPage;