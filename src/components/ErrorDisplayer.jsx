import React from "react";

const ErrorDisplayer = ({ status, msg }) => {
  return (
    <p>
      {status} - {msg}
    </p>
  );
};

export default ErrorDisplayer;
