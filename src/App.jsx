import { useState } from "react";
import "./App.css";

import light from "@tokens/light.js";
import dark from "@tokens/dark.js";

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const theme = isDarkTheme ? dark : light;

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <>
      <div
        className="app"
        style={{
          background: theme.fg.default.$value,
          color: theme.bg.default.$value,
        }}
      >
        <button onClick={toggleTheme}>
          Toggle theme {isDarkTheme ? "🌙" : "☀️"}
        </button>

        <div
          style={{
            background: theme.card.background.$value,
            borderRadius: theme.card.borderRadius.$value,
            padding: theme.card.padding.$value,
            color: theme.fg.default.$value,
          }}
        >
          <h1>Card</h1>
        </div>
      </div>
    </>
  );
}

export default App;
