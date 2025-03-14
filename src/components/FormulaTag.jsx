import React from "react";

const FormulaTag = ({ tag, index, onRemove }) => {
  return (
    <div>
      <span>{tag.displayValue}</span>
      <button onClick={() => onRemove(index)}>×</button>
    </div>
  );
};

export default FormulaTag;
