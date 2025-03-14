import React, { useState, useRef } from "react";
import FormulaTag from "./FormulaTag";

const FormulaInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      // Add new tag
      const isNumeric = !isNaN(inputValue.trim());
      setTags([
        ...tags,
        {
          type: isNumeric ? "number" : "variable",
          value: inputValue.trim(),
          displayValue: inputValue.trim(),
        },
      ]);
      setInputValue("");
    } else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      const newTags = [...tags];
      newTags.pop();
      setTags(newTags);
    }
  };

  const handleRemoveTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    inputRef.current.focus();
  };

  return (
    <div
      className="formula-input-container"
      style={{
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "8px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        minHeight: "40px",
        color: "#333",
      }}
      onClick={() => inputRef.current.focus()}
    >
      {tags.map((tag, index) => (
        <FormulaTag
          key={index}
          tag={tag}
          index={index}
          onRemove={handleRemoveTag}
        />
      ))}

      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        style={{
          border: "none",
          outline: "none",
          flexGrow: 1,
          minWidth: "50px",
          padding: "4px",
        }}
        placeholder={tags.length === 0 ? "Enter a formula..." : ""}
      />
    </div>
  );
};

export default FormulaInput;
