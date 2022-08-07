import React from "react";

import "./Spinner.scss";

const Spinner: React.FC = () => {
  return (
    <div className="spinner" title="Loading...">
      <span className="loader"></span>
    </div>
  );
};

export default Spinner;
