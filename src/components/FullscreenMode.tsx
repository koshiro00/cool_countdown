import React from "react";
import { formatTime } from "../utils/timer";
import type { FullscreenTheme } from "../hooks/useFullscreenTheme";

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
    <div className={`fullscreen-mode ${theme}`}>
      <button
        className="close-btn"
        onClick={onClose}
        aria-label="フルスクリーンを閉じる"
      >
        ×
      </button>

      {/* トグル形式のテーマ切り替えボタン */}
      <div className="theme-toggle-container">
        <button
          className={`theme-toggle-option ${theme === "dark" ? "active" : ""}`}
          onClick={() => theme !== "dark" && onToggleTheme()}
          aria-label="ダークテーマ"
        >
          🌙
        </button>
        <button
          className={`theme-toggle-option ${theme === "light" ? "active" : ""}`}
          onClick={() => theme !== "light" && onToggleTheme()}
          aria-label="ライトテーマ"
        >
          ☀️
        </button>
      </div>
      <div className={`fullscreen-display ${isFinished ? "finished" : ""}`}>
        {formatTime(totalMilliseconds)}
      </div>
    </div>
  );
};
