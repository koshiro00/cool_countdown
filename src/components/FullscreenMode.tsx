import React from "react";
import { formatTime } from "../utils/timer";
import type { FullscreenTheme } from "../hooks/useFullscreenTheme";
import styles from "./FullscreenMode.module.css";

interface FullscreenModeProps {
  isVisible: boolean;
  totalMilliseconds: number;
  isFinished: boolean;
  theme: FullscreenTheme;
  onClose: () => void;
  onToggleTheme: () => void;
}

export const FullscreenMode: React.FC<FullscreenModeProps> = ({
  isVisible,
  totalMilliseconds,
  isFinished,
  theme,
  onClose,
  onToggleTheme,
}) => {
  if (!isVisible) return null;

  return (
    <div className={`${styles.fullscreenMode} ${styles[theme]}`}>
      <button
        className={styles.closeBtn}
        onClick={onClose}
        aria-label="フルスクリーンを閉じる"
      >
        ×
      </button>

      {/* トグル形式のテーマ切り替えボタン */}
      <div className={styles.themeToggleContainer}>
        <button
          className={`${styles.themeToggleOption} ${
            theme === "dark" ? styles.active : ""
          }`}
          onClick={() => theme !== "dark" && onToggleTheme()}
          aria-label="ダークテーマ"
        >
          🌙
        </button>
        <button
          className={`${styles.themeToggleOption} ${
            theme === "light" ? styles.active : ""
          }`}
          onClick={() => theme !== "light" && onToggleTheme()}
          aria-label="ライトテーマ"
        >
          ☀️
        </button>
      </div>
      <div
        className={`${styles.fullscreenDisplay} ${
          isFinished ? styles.finished : ""
        }`}
      >
        {formatTime(totalMilliseconds)}
      </div>
    </div>
  );
};
