import React from "react";
import backArrowLight from "url:../../assets/images/back-arrow-light.svg";
import backArrowDark from "url:../../assets/images/back-arrow-dark.svg";
import "./back.css";

export default ({ theme }) => {
  return (
    <button className="button-back" onClick={() => window.history.back()}>
      <img
        src={theme === "light" ? backArrowLight : backArrowDark}
        alt="Go back"
      />
    </button>
  );
};
