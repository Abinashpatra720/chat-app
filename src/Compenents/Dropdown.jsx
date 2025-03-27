import React from "react";
import "./Dropdown.css";

const options = [
  { value: "Document1", label: "Document1" },
  { value: "Document2", label: "Document2" },
  { value: "Document3", label: "Document3" },
  { value: "Document4", label: "Document4" },
];

const profileOptions = [
  { value: "User", label: "User" },
  { value: "Employee", label: "Employee" },
];

const Dropdown = ({ label, value, onChange, isProfile = false }) => {
  const currentOptions = isProfile ? profileOptions : options;

  return (
    <div className="dropdown">
      <label>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`custom-select ${isProfile ? 'profile-select' : ''}`}
      >
        {currentOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;