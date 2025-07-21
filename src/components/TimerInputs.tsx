import React from "react";
import type { TimerConfig } from "../types/timer";
import styles from "./TimerInputs.module.css";

interface TimerInputsProps {
  config: TimerConfig;
  isRunning: boolean;
  onConfigChange: (config: TimerConfig) => void;
  onShowAlert: (message: string) => void;
}

export const TimerInputs: React.FC<TimerInputsProps> = ({
  config,
  isRunning,
  onConfigChange,
  onShowAlert,
}) => {
  const handleInputChange = (field: keyof TimerConfig, value: number) => {
    let validatedValue = value;

    // バリデーション
    if (field === "minutes" && value > 99) {
      onShowAlert("最大99分までです");
      validatedValue = 99;
    } else if (field === "seconds" && value > 59) {
      validatedValue = 59;
    } else if (field === "milliseconds" && value > 99) {
      validatedValue = 99;
    }

    const newConfig = {
      ...config,
      [field]: validatedValue,
    };

    onConfigChange(newConfig);
  };

  return (
    <section
      className={styles.inputSection}
      aria-labelledby="timer-input-heading"
    >
      <h2 id="timer-input-heading" className="sr-only">
        タイマー設定
      </h2>
      <div className={styles.inputGroup} role="group" aria-label="時間設定">
        <label htmlFor="minutes-input" className={styles.label}>
          分:
        </label>
        <input
          id="minutes-input"
          type="number"
          min="0"
          max="99"
          value={config.minutes}
          onChange={(e) =>
            handleInputChange("minutes", parseInt(e.target.value) || 0)
          }
          disabled={isRunning}
          aria-label="分を設定"
          className={styles.numberInput}
        />
        <label htmlFor="seconds-input" className={styles.label}>
          秒:
        </label>
        <input
          id="seconds-input"
          type="number"
          min="0"
          max="59"
          value={config.seconds}
          onChange={(e) =>
            handleInputChange("seconds", parseInt(e.target.value) || 0)
          }
          disabled={isRunning}
          aria-label="秒を設定"
          className={styles.numberInput}
        />
        <label htmlFor="milliseconds-input" className={styles.label}>
          ms:
        </label>
        <input
          id="milliseconds-input"
          type="number"
          min="0"
          max="99"
          step="10"
          value={config.milliseconds}
          onChange={(e) =>
            handleInputChange("milliseconds", parseInt(e.target.value) || 0)
          }
          disabled={isRunning}
          aria-label="ミリ秒を設定"
          className={styles.numberInput}
        />
      </div>
    </section>
  );
};
