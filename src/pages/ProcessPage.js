import React from "react";
import { useNavigate } from "react-router-dom";
import { practicedDates, plannedPracticeDates } from "../data/practiceData"; // Import global data
import "./ProcessPage.css";

const ProcessPage = () => {
  const navigate = useNavigate(); // Hook for navigation

  // Helper function to generate a calendar grid for the month
  const generateCalendar = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay(); // Day of the week (0=Sunday, 6=Saturday)
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Days in the month

    const calendar = [];
    let week = [];

    // Fill empty days at the beginning of the first week
    for (let i = 0; i < firstDay; i++) {
      week.push(null);
    }

    // Fill the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      week.push(day);
      if (week.length === 7) {
        calendar.push(week);
        week = [];
      }
    }

    // Fill empty days at the end of the last week
    while (week.length < 7) {
      week.push(null);
    }
    calendar.push(week);

    return calendar;
  };

  // Current month and year
  const year = 2025;
  const month = 4; // May (0-indexed, so 4 = May)
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]; // Month names array

  const calendar = generateCalendar(year, month);

  // Convert practiced and planned dates to a Set for easy lookup
  const practicedSet = new Set(practicedDates);
  const plannedSet = new Set(plannedPracticeDates);

  // Format date as "YYYY-MM-DD"
  const formatDate = (year, month, day) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  return (
    <div className="process-page">
      <h1>Practice Details</h1>
      <p>
        You have practiced <strong>{practicedDates.length}</strong> out of{" "}
        <strong>{practicedDates.length + plannedPracticeDates.length}</strong> planned practice days.
      </p>

      {/* Calendar Section */}
      <div className="calendar">
        <h2>{`${monthNames[month]} ${year}`}</h2>
        <table>
          <thead>
            <tr>
              <th>Sun</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
            </tr>
          </thead>
          <tbody>
            {calendar.map((week, weekIndex) => (
              <tr key={weekIndex}>
                {week.map((day, dayIndex) => {
                  if (!day) {
                    return <td key={dayIndex} className="empty"></td>; // Empty cell
                  }

                  const date = formatDate(year, month, day);

                  let statusClass = "";
                  if (practicedSet.has(date)) {
                    statusClass = "practiced";
                  } else if (plannedSet.has(date)) {
                    statusClass = "planned";
                  }

                  return (
                    <td key={dayIndex} className={statusClass}>
                      {day}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="back-button" onClick={() => navigate("/")}>
        Back to Landing Page
      </button>
    </div>
  );
};

export default ProcessPage;