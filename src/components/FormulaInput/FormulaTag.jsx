import React, { useState, useRef, useEffect } from "react";
import TagDropdown from "./TagDropdown";

const FormulaTag = ({ tag, index, onRemove, onUpdate }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const tagRef = useRef(null);

  const getTagColor = () => {
    if (tag.category) {
      const categoryNum = parseInt(tag.category.replace(/\D/g, "")) || 0;
      const hue = (categoryNum * 37) % 360;
      return {
        background: `hsl(${hue}, 85%, 93%)`,
        border: `hsl(${hue}, 85%, 75%)`,
      };
    }

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
      case "operator":
        return {
          background: "#ffecb3",
          border: "#ffd54f",
        };
      default:
        return {
          background: "#f5f5f5",
          border: "#e0e0e0",
        };
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        tagRef.current &&
        !tagRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionSelect = (option) => {
    if (option.action === "remove") {
      onRemove(index);
    } else if (option.action === "edit") {
      onUpdate({
        ...tag,
        displayValue: `${tag.displayValue} (edited)`,
      });
    } else if (option.action === "type") {
      onUpdate({
        ...tag,
        type: option.value,
      });
    }

    setShowDropdown(false);
  };

  const colors = getTagColor();

  return (
    <div style={{ position: "relative", margin: "0 4px" }}>
      <div
        ref={tagRef}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "4px 8px",
          borderRadius: "4px",
          backgroundColor: colors.background,
          border: `1px solid ${colors.border}`,
          cursor: "default",
          userSelect: "none",
        }}
      >
        <span>{tag.displayValue}</span>

        <button
          onClick={toggleDropdown}
          style={{
            marginLeft: "4px",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0 2px",
            fontSize: "12px",
          }}
        >
          ▼
        </button>
      </div>

      {showDropdown && (
        <div
          ref={dropdownRef}
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            zIndex: 10,
          }}
        >
          <TagDropdown
            options={[
              { label: "Edit", action: "edit" },
              { label: "Remove", action: "remove" },
              { label: "Set as Variable", action: "type", value: "variable" },
              { label: "Set as Number", action: "type", value: "number" },
            ]}
            onSelect={handleOptionSelect}
          />
        </div>
      )}
    </div>
  );
};

export default FormulaTag;
