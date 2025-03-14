import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FormulaInput from "./components/FormulaInput/FormulaInput";
import { useFormulaStore } from "./store/formulaStore";
import { evaluateFormula, formatResult } from "./utils/calculator";

const COLORS = {
  primary: "#4a90e2",
  secondary: "#f5f5f5",
  success: "#4caf50",
  error: "#f44336",
  text: {
    primary: "#333333",
    secondary: "#666666",
    light: "#ffffff",
  },
  background: {
    light: "#ffffff",
    dark: "#2c3e50",
  },
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 30000,
    },
  },
});

const FormulaSection = () => {
  const { formulaString, result, hasError, errorMessage, clearFormula } =
    useFormulaStore();
  const [calculatedResult, setCalculatedResult] = useState(null);

  const calculateFormula = () => {
    const calculation = evaluateFormula(formulaString);
    setCalculatedResult(calculation);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ marginBottom: "16px", color: COLORS.text.primary }}>
        Formula Input
      </h2>

      <div style={{ marginBottom: "20px" }}>
        <FormulaInput />
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button
          onClick={calculateFormula}
          disabled={!formulaString}
          style={{
            padding: "10px 20px",
            backgroundColor: COLORS.primary,
            color: COLORS.text.light,
            border: "none",
            borderRadius: "4px",
            cursor: formulaString ? "pointer" : "not-allowed",
            opacity: formulaString ? 1 : 0.7,
            fontWeight: "bold",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            transition: "all 0.2s ease",
          }}
          onMouseOver={(e) => {
            if (formulaString) {
              e.currentTarget.style.backgroundColor = "#3a80d2";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
            }
          }}
          onMouseOut={(e) => {
            if (formulaString) {
              e.currentTarget.style.backgroundColor = COLORS.primary;
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
            }
          }}
        >
          Calculate
        </button>

        <button
          onClick={clearFormula}
          style={{
            padding: "10px 20px",
            backgroundColor: COLORS.secondary,
            color: COLORS.text.primary,
            border: "1px solid #ddd",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "all 0.2s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#e8e8e8";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = COLORS.secondary;
          }}
        >
          Clear
        </button>
      </div>

      {calculatedResult && (
        <div
          style={{
            padding: "16px",
            backgroundColor: calculatedResult.success ? "#f1f8e9" : "#ffebee",
            border: `1px solid ${
              calculatedResult.success ? "#aed581" : "#ef9a9a"
            }`,
            borderRadius: "4px",
            marginBottom: "20px",
          }}
        >
          <h3
            style={{
              marginTop: 0,
              marginBottom: "8px",
              color: COLORS.text.primary,
            }}
          >
            {calculatedResult.success ? "Result" : "Error"}
          </h3>

          {calculatedResult.success ? (
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: COLORS.text.primary,
              }}
            >
              {formatResult(calculatedResult.result)}
            </div>
          ) : (
            <div style={{ color: "#c62828" }}>{calculatedResult.error}</div>
          )}

          <div style={{ marginTop: "12px", fontSize: "14px", color: "#666" }}>
            <strong>Processed formula:</strong> {calculatedResult.formula}
          </div>
        </div>
      )}

      <div style={{ marginTop: "30px" }}>
        <h3 style={{ color: COLORS.text.primary }}>Formula String:</h3>
        <div
          style={{
            padding: "12px",
            backgroundColor: "#f5f5f5",
            borderRadius: "4px",
            fontFamily: "monospace",
            color: COLORS.text.primary,
          }}
        >
          {formulaString || "<empty>"}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div
        className="App"
        style={{
          color: COLORS.text.primary,
          backgroundColor: COLORS.background.light,
        }}
      >
        <header
          style={{
            backgroundColor: COLORS.background.dark,
            color: COLORS.text.light,
            padding: "20px",
            textAlign: "center",
            borderBottom: `4px solid ${COLORS.primary}`,
          }}
        >
          <h1 style={{ margin: 0, fontWeight: "bold" }}>Formula Builder</h1>
          <p style={{ marginBottom: 0, marginTop: "8px", opacity: 0.8 }}>
            Create and calculate complex formulas with variables
          </p>
        </header>

        <main>
          <FormulaSection />
        </main>

        <footer
          style={{
            marginTop: "40px",
            padding: "20px",
            textAlign: "center",
            borderTop: "1px solid #eee",
            color: COLORS.text.secondary,
          }}
        >
          <p>Formula Builder - Created for job interview task</p>
        </footer>
      </div>
    </QueryClientProvider>
  );
};

export default App;
