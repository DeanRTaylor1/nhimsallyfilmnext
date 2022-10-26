import React from "react";
import "./spinner.module.css";

const Spinner: React.FC = () => {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
