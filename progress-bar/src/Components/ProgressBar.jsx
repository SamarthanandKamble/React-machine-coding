import React from "react";

const ProgressBar = ({ progress = 0 }) => {
  return (
    <div className="progressbar-container">
      <div
        className="progress-bar"
        style={{ transform: `translateX(calc(${progress - 100}%))` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
