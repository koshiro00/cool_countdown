import React from "react";
import styles from "./TimerControls.module.css";

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
    <div className={styles.controls}>
      {!isRunning ? (
        <button className={styles.startBtn} onClick={onStart}>
          スタート
        </button>
      ) : (
        <button className={styles.pauseBtn} onClick={onPause}>
          一時停止
        </button>
      )}
      <button className={styles.resetBtn} onClick={onReset}>
        リセット
      </button>
    </div>
  );
};
