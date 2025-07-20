import React from "react";
import { formatTime } from "../utils/timer";

interface FullscreenModeProps {
  isVisible: boolean;
  totalMilliseconds: number;
  isFinished: boolean;
  onClose: () => void;
}

export const FullscreenMode: React.FC<FullscreenModeProps> = ({
  isVisible,
  totalMilliseconds,
  isFinished,
  onClose,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fullscreen-mode">
      <button className="close-btn" onClick={onClose}>
        ×
      </button>
      <div className={`fullscreen-display ${isFinished ? "finished" : ""}`}>
        {formatTime(totalMilliseconds)}
      </div>
    </div>
  );
};
