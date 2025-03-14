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
      console.log(newTags);

      setTags(newTags);
    }
  };
  console.log(tags);

  const handleRemoveTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    inputRef.current.focus();
  };

  return (
    <div onClick={() => inputRef.current.focus()}>
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
        placeholder={tags.length === 0 ? "Enter a formula..." : ""}
      />
    </div>
  );
};

export default FormulaInput;
