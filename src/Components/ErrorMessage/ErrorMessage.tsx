import React from "react";

interface ErrorMessageProps {
    message: string;
}
const ErrorMessage: React.FC<ErrorMessageProps> = ({message}: ErrorMessageProps) => (
  <span className="fs-message-error">
    {message || "Please fill the field before continuing"}
  </span>
);

export default ErrorMessage;
