import React from "react";
import { useTheme } from "../../contexts/theme-context";

export default () => {
  const [theme, toggleTheme] = useTheme();

  return <button onClick={toggleTheme}>{theme()}</button>;
};
