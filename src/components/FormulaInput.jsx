import React, { useState } from "react";

const FormulaInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      console.log("enter works", inputValue);

      setTags([
        ...tags,
        {
          type: "variable",
          value: inputValue.trim(),
          displayValue: inputValue.trim(),
        },
      ]);
      setInputValue("");
    }
  };

  console.log("tags", tags);

  return (
    <div>
      {tags.map((tag, index) => (
        <div key={index}>{tag.displayValue}</div>
      ))}

      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? "Enter a formula..." : ""}
      />
    </div>
  );
};

export default FormulaInput;
