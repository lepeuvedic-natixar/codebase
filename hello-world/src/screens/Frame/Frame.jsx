import React from "react";
import "./style.css";

export const Frame = () => {
  return (
    <div className="frame">
      <div className="overlap-group-wrapper">
        <div className="overlap-group">
          <div className="oval" />
          <div className="text-wrapper">Hello World!</div>
        </div>
      </div>
    </div>
  );
};
