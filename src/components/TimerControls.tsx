import React from "react";

interface TimerControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export const TimerControls: React.FC<TimerControlsProps> = ({
  isRunning,
  onStart,
  onPause,
  onReset,
}) => {
  return (
    <div className="controls">
      {!isRunning ? (
        <button className="start-btn" onClick={onStart}>
          スタート
        </button>
      ) : (
        <button className="pause-btn" onClick={onPause}>
          一時停止
        </button>
      )}
      <button className="reset-btn" onClick={onReset}>
        リセット
      </button>
    </div>
  );
};
