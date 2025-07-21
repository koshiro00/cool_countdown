import React from "react";
import styles from "./Alert.module.css";

interface AlertProps {
  message: string;
  isVisible: boolean;
}

export const Alert: React.FC<AlertProps> = ({ message, isVisible }) => {
  if (!isVisible) return null;

  return <div className={styles.alert}>{message}</div>;
};
