import React from "react";

const TagDropdown = ({ options, onSelect }) => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        borderRadius: "4px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        minWidth: "150px",
      }}
    >
      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
      >
        {options.map((option, index) => (
          <li
            key={index}
            onClick={() => onSelect(option)}
            style={{
              padding: "8px 12px",
              borderBottom:
                index === options.length - 1 ? "none" : "1px solid #eee",
              cursor: "pointer",
              fontSize: "14px",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#f5f5f5";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#fff";
            }}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagDropdown;
