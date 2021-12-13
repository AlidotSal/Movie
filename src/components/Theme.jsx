import React from "react";
import lightHouse from "url:../assets/images/lighthouse.svg";
import lightHouseDark from "url:../assets/images/lighthouse-dark.svg";

export default ({ theme, setTheme }) => {
  return (
    <img
      onClick={() =>
        setTheme((theme) => (theme === "light" ? "dark" : "light"))
      }
      src={theme === "light" ? lightHouse : lightHouseDark}
      alt="Go back"
    />
  );
};
