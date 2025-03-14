import React from "react";

const Autocomplete = ({ suggestions, isLoading, onSelect }) => {
  if (isLoading) {
    return (
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          borderRadius: "4px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          padding: "8px 12px",
          fontSize: "14px",
        }}
      >
        Loading suggestions...
      </div>
    );
  }

  if (!suggestions || suggestions.length === 0) {
    return (
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          borderRadius: "4px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          padding: "8px 12px",
          fontSize: "14px",
        }}
      >
        No suggestions found
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        borderRadius: "4px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        minWidth: "200px",
        maxHeight: "300px",
        overflowY: "auto",
      }}
    >
      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
      >
        {suggestions.map((suggestion) => (
          <li
            key={suggestion.id}
            onClick={() => onSelect(suggestion)}
            style={{
              padding: "8px 12px",
              borderBottom: "1px solid #eee",
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
            <div style={{ fontWeight: "bold" }}>{suggestion.name}</div>
            <div
              style={{
                fontSize: "12px",
                color: "#666",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>{suggestion.category}</span>
              {suggestion.value !== "" && (
                <span>Value: {suggestion.value}</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Autocomplete;
