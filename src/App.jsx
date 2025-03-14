import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import FormulaInput from "./components/FormulaInput";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header
          style={{
            backgroundColor: "#2c3e50",
            color: "#ffffff",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <h1>Formula Builder</h1>
          <p>Create mathematical formulas with variables</p>
        </header>

        <main
          style={{ maxWidth: "800px", margin: "20px auto", padding: "0 20px" }}
        >
          <FormulaInput />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
