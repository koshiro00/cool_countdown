import React from "react";
import { formatTime } from "../utils/timer";

interface TimerDisplayProps {
  totalMilliseconds: number;
  isFinished: boolean;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({
  totalMilliseconds,
  isFinished,
}) => {
  return (
    <div className={`display ${isFinished ? "finished" : ""}`}>
      {formatTime(totalMilliseconds)}
    </div>
  );
};
