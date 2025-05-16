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
    <div
      // Force refresh when theme is updated in development
      key={process.env.NODE_ENV === "development" && light + dark}
      className="app"
      style={{
        background: theme.bg.muted.$value,
      }}
    >
      <button onClick={toggleTheme}>{isDarkTheme ? "Light" : "Dark"}</button>

      <div
        style={{
          background: theme.card.background.$value,
          borderRadius: theme.card.borderRadius.$value,
          padding: theme.card.padding.$value,
          color: theme.fg.default.$value,
          boxShadow: theme.boxShadow.default.$value,
        }}
      >
        <h1>Card</h1>
      </div>
    </div>
  );
}

export default App;
