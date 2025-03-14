import React from "react";

const FormulaTag = ({ tag, index, onRemove }) => {
  const getTagColor = () => {
    switch (tag.type) {
      case "variable":
        return {
          background: "#e1f5fe",
          border: "#81d4fa",
        };
      case "number":
        return {
          background: "#f1f8e9",
          border: "#aed581",
        };
      default:
        return {
          background: "#f5f5f5",
          border: "#e0e0e0",
        };
    }
  };

  const colors = getTagColor();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "4px 8px",
        margin: "0 4px",
        borderRadius: "4px",
        backgroundColor: colors.background,
        border: `1px solid ${colors.border}`,
        cursor: "default",
      }}
    >
      <span>{tag.displayValue}</span>
      <button
        onClick={() => onRemove(index)}
        style={{
          marginLeft: "4px",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "12px",
          padding: "0 2px",
          color: "#666",
        }}
      >
        ×
      </button>
    </div>
  );
};

export default FormulaTag;
