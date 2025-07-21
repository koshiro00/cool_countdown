import React from "react";
import { formatTime } from "../utils/timer";
import styles from "./TimerDisplay.module.css";

interface TimerDisplayProps {
  totalMilliseconds: number;
  isFinished: boolean;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({
  totalMilliseconds,
  isFinished,
}) => {
  return (
    <div className={`${styles.display} ${isFinished ? styles.finished : ""}`}>
      {formatTime(totalMilliseconds)}
    </div>
  );
};
