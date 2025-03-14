// src/components/FormulaInput.jsx
import React from "react";
import { useFormulaStore } from "../store/formulaStore";
import { useAutocomplete } from "../hooks/useAutocomplete";

const FormulaInput = () => {
  const { tags, addTag, removeTag, clearFormula } = useFormulaStore();
  const { query, setQuery, suggestions, isLoading } = useAutocomplete();

  const handleAddTag = () => {
    addTag({
      type: "variable",
      value: "test-variable",
      displayValue: "Test Variable",
    });
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <h2>Store and API Test</h2>

      <div>
        <h3>Zustand Store Test</h3>
        <button onClick={handleAddTag}>Add Test Tag</button>
        <button
          onClick={() => removeTag(tags.length - 1)}
          disabled={tags.length === 0}
        >
          Remove Last Tag
        </button>
        <button onClick={clearFormula} disabled={tags.length === 0}>
          Clear All
        </button>

        <div style={{ marginTop: "10px" }}>
          <strong>Tags in store:</strong>
          {tags.length === 0 ? (
            <span> None</span>
          ) : (
            <ul>
              {tags.map((tag, index) => (
                <li key={index}>
                  {tag.displayValue} ({tag.type})
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>API Autocomplete Test</h3>
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Type to search..."
          style={{ padding: "8px", width: "300px" }}
        />

        {isLoading && <div>Loading...</div>}

        {!isLoading && suggestions.length > 0 && (
          <div style={{ marginTop: "10px" }}>
            <strong>Suggestions:</strong>
            <ul>
              {suggestions.map((suggestion) => (
                <li key={suggestion.id}>
                  {suggestion.name} - {suggestion.category}
                  {suggestion.value !== "" && ` (Value: ${suggestion.value})`}
                </li>
              ))}
            </ul>
          </div>
        )}

        {!isLoading && query.length >= 2 && suggestions.length === 0 && (
          <div style={{ marginTop: "10px" }}>No suggestions found</div>
        )}
      </div>
    </div>
  );
};

export default FormulaInput;
