import React, { useState, useRef, useEffect } from "react";
import { useFormulaStore } from "../../store/formulaStore";
import FormulaTag from "./FormulaTag";
import Autocomplete from "./Autocomplete";
import { useAutocomplete } from "../../hooks/useAutocomplete";

const OPERATORS = ["+", "-", "*", "/", "(", ")", "^"];

const FormulaInput = () => {
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const [inputValue, setInputValue] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [autocompletePosition, setAutocompletePosition] = useState({
    top: 0,
    left: 0,
  });

  const {
    tags,
    addTag,
    removeTag,
    updateTag,
    formulaString,
    setFormulaString,
  } = useFormulaStore();

  const { query, setQuery, suggestions, isLoading } = useAutocomplete();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (inputRef.current && showAutocomplete) {
      const inputRect = inputRef.current.getBoundingClientRect();

      const textWidth = getTextWidth(
        inputValue.substring(0, cursorPosition),
        getComputedStyle(inputRef.current).font
      );

      setAutocompletePosition({
        top: inputRect.height + 5,
        left: textWidth,
      });
    }
  }, [cursorPosition, showAutocomplete, inputValue]);

  const getTextWidth = (text, font) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = font;
    return context.measureText(text).width;
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setCursorPosition(e.target.selectionStart);

    const currentWord = extractCurrentWord(newValue, e.target.selectionStart);

    if (currentWord && currentWord.length > 1) {
      setQuery(currentWord);
      setShowAutocomplete(true);
    } else {
      setShowAutocomplete(false);
    }
  };

  const extractCurrentWord = (text, position) => {
    let start = position;
    while (start > 0) {
      if (OPERATORS.includes(text[start - 1]) || text[start - 1] === " ") {
        break;
      }
      start--;
    }

    return text.substring(start, position);
  };

  const handleKeyDown = (e) => {
    console.log("Key pressed:", e.key);

    if (e.key === "Enter" && showAutocomplete && suggestions.length > 0) {
      e.preventDefault();
      handleSelectSuggestion(suggestions[0]);
    } else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      e.preventDefault();
      removeTag(tags.length - 1);
    } else if (e.key === "Tab" && showAutocomplete && suggestions.length > 0) {
      e.preventDefault();
      handleSelectSuggestion(suggestions[0]);
    } else if (OPERATORS.includes(e.key)) {
      e.preventDefault();

      if (inputValue.trim()) {
        const isNumeric = !isNaN(inputValue.trim());
        addTag({
          type: isNumeric ? "number" : "variable",
          value: inputValue.trim(),
          displayValue: inputValue.trim(),
        });
        setInputValue("");
      }

      addTag({
        type: "operator",
        value: e.key,
        displayValue: e.key,
      });

      setShowAutocomplete(false);
    } else if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      const isNumeric = !isNaN(inputValue.trim());
      addTag({
        type: isNumeric ? "number" : "variable",
        value: inputValue.trim(),
        displayValue: inputValue.trim(),
      });
      setInputValue("");
      setShowAutocomplete(false);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    if (!suggestion || !suggestion.name) {
      console.error("Invalid suggestion format:", suggestion);
      return;
    }

    addTag({
      type: "variable",
      value: suggestion.id || suggestion.name.toLowerCase(),
      displayValue: suggestion.name,
      category: suggestion.category,
      originalValue: suggestion.value,
    });

    setInputValue("");
    setShowAutocomplete(false);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleFocus = () => {
    if (inputValue.trim().length > 1) {
      const currentWord = extractCurrentWord(inputValue, cursorPosition);
      if (currentWord && currentWord.length > 1) {
        setQuery(currentWord);
        setShowAutocomplete(true);
      }
    }
  };

  return (
    <div
      className="formula-input-container"
      ref={containerRef}
      style={{
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "8px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        minHeight: "40px",
        position: "relative",
        backgroundColor: "#fff",
      }}
    >
      {tags.map((tag, index) => (
        <FormulaTag
          key={index}
          tag={tag}
          index={index}
          onRemove={() => removeTag(index)}
          onUpdate={(newTagData) => updateTag(index, newTagData)}
        />
      ))}

      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        style={{
          border: "none",
          outline: "none",
          flexGrow: 1,
          minWidth: "50px",
          fontSize: "16px",
          padding: "4px",
        }}
        placeholder={tags.length === 0 ? "Enter a formula..." : ""}
      />

      {showAutocomplete && (
        <div
          style={{
            position: "absolute",
            top: `${autocompletePosition.top}px`,
            left: `${autocompletePosition.left}px`,
            zIndex: 10,
          }}
        >
          <Autocomplete
            suggestions={suggestions}
            isLoading={isLoading}
            onSelect={handleSelectSuggestion}
          />
        </div>
      )}
    </div>
  );
};

export default FormulaInput;
