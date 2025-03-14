export const evaluateFormula = (formulaString, variables = {}) => {
  try {
    let formula = formulaString;

    const variableNames = Object.keys(variables).sort(
      (a, b) => b.length - a.length
    );

    for (const variableName of variableNames) {
      const value = variables[variableName];
      const regex = new RegExp(`\\b${variableName}\\b`, "g");
      formula = formula.replace(regex, value);
    }

    formula = formula.replace(/\^/g, "**");

    if (!/^[0-9\s\+\-\*\/\(\)\.\*\*]+$/.test(formula)) {
      throw new Error("Invalid formula after variable replacement");
    }

    const result = new Function(`return ${formula}`)();

    return {
      success: true,
      result,
      formula,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      formula: formulaString,
    };
  }
};

export const formatResult = (result, precision = 2) => {
  if (typeof result !== "number" || isNaN(result)) {
    return "N/A";
  }

  if (Number.isInteger(result)) {
    return result.toString();
  }

  return result.toFixed(precision);
};
