const OPERATORS = ["+", "-", "*", "/", "(", ")", "^"];

export const parseFormula = (formulaString) => {
  if (!formulaString || formulaString.trim() === "") {
    return [];
  }

  const tokens = [];
  let currentToken = "";

  for (let i = 0; i < formulaString.length; i++) {
    const char = formulaString[i];

    if (OPERATORS.includes(char)) {
      if (currentToken.trim() !== "") {
        tokens.push({
          type: isNaN(currentToken) ? "variable" : "number",
          value: currentToken.trim(),
        });
        currentToken = "";
      }

      tokens.push({
        type: "operator",
        value: char,
      });
    } else if (char === " ") {
      if (currentToken.trim() !== "") {
        tokens.push({
          type: isNaN(currentToken) ? "variable" : "number",
          value: currentToken.trim(),
        });
        currentToken = "";
      }
    } else {
      currentToken += char;
    }
  }

  if (currentToken.trim() !== "") {
    tokens.push({
      type: isNaN(currentToken) ? "variable" : "number",
      value: currentToken.trim(),
    });
  }

  return tokens;
};

export const validateFormula = (tokens) => {
  let parenthesesCount = 0;

  for (const token of tokens) {
    if (token.value === "(") {
      parenthesesCount++;
    } else if (token.value === ")") {
      parenthesesCount--;

      if (parenthesesCount < 0) {
        return {
          valid: false,
          error: "Unbalanced parentheses: too many closing parentheses",
        };
      }
    }
  }

  if (parenthesesCount > 0) {
    return {
      valid: false,
      error: "Unbalanced parentheses: missing closing parentheses",
    };
  }

  return { valid: true };
};
