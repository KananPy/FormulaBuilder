import React from "react";
import FormulaInput from "./components/FormulaInput";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Formula Builder</h1>
        <p>Create mathematical formulas with variables</p>
      </header>

      <main>
        <h2>Enter your formula</h2>
        <FormulaInput />
      </main>
    </div>
  );
}

export default App;
