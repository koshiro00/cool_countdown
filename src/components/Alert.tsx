import React from "react";

interface AlertProps {
  message: string;
  isVisible: boolean;
}

export const Alert: React.FC<AlertProps> = ({ message, isVisible }) => {
  if (!isVisible) return null;

  return <div className="alert">{message}</div>;
};
