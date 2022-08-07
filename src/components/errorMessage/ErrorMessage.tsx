import React from "react";

import "./ErrorMessage.scss";

interface Props {
  message: string;
}

const ErrorMessage: React.FC<Props> = ({ message }) => {
  return (
    <div className="error-message" data-testid="error-message">
      <span className="content">{message}</span>
    </div>
  );
};

export default ErrorMessage;
