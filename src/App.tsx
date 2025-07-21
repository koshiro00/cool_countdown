import React, { useState, useEffect } from "react";
import { useTimer } from "./hooks/useTimer";
import { useFullscreenTheme } from "./hooks/useFullscreenTheme";
import { TimerInputs } from "./components/TimerInputs";
import { TimerDisplay } from "./components/TimerDisplay";
import { TimerControls } from "./components/TimerControls";
import { FullscreenMode } from "./components/FullscreenMode";
import { Alert } from "./components/Alert";
import type { TimerConfig } from "./types/timer";
import "./App.css";

const initialConfig: TimerConfig = {
  minutes: 5,
  seconds: 0,
  milliseconds: 0,
};

const App: React.FC = () => {
  const [config, setConfig] = useState<TimerConfig>(initialConfig);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { theme: fullscreenTheme, toggleTheme: toggleFullscreenTheme } =
    useFullscreenTheme();

  // SEO: ページタイトルを動的に更新
  useEffect(() => {
    document.title =
      "イケてるカウントダウン | 高精度ミリ秒対応カウントダウンタイマー";
  }, []);

  const {
    timerState,
    alert,
    updateFromInputs,
    start,
    pause,
    reset,
    showAlert,
  } = useTimer(initialConfig);

  const handleConfigChange = (newConfig: TimerConfig) => {
    setConfig(newConfig);
    updateFromInputs(newConfig);
  };

  const handleStart = () => {
    start();
    setIsFullscreen(true);
  };

  const handlePause = () => {
    pause();
    setIsFullscreen(false);
  };

  const handleReset = () => {
    reset(config);
    setIsFullscreen(false);
  };

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
  };

  return (
    <>
      {/* SEO: 構造化データと隠しコンテンツ */}
      <div style={{ display: "none" }}>
        <h1>イケてるカウントダウン - 高精度ミリ秒対応タイマー</h1>
        <p>
          プレゼンテーション、料理、ワークアウト、勉強に最適な無料のオンラインカウントダウンタイマー。分・秒・ミリ秒まで細かく設定可能で、全画面表示にも対応しています。
        </p>
        <ul>
          <li>ミリ秒精度の高精度タイマー</li>
          <li>全画面表示モード対応</li>
          <li>音声アラート機能</li>
          <li>レスポンシブデザイン</li>
          <li>ブラウザで簡単操作</li>
          <li>完全無料</li>
        </ul>
      </div>

      <main
        className="timer-container"
        role="main"
        aria-label="カウントダウンタイマーアプリケーション"
      >
        <header>
          <h1>イケてるカウントダウン</h1>
          <p className="subtitle">高精度ミリ秒対応タイマー</p>
        </header>

        <TimerInputs
          config={config}
          isRunning={timerState.isRunning}
          onConfigChange={handleConfigChange}
          onShowAlert={showAlert}
        />

        <TimerDisplay
          totalMilliseconds={timerState.totalMilliseconds}
          isFinished={timerState.isFinished}
        />

        <TimerControls
          isRunning={timerState.isRunning}
          onStart={handleStart}
          onPause={handlePause}
          onReset={handleReset}
        />
      </main>

      <Alert message={alert.message} isVisible={alert.visible} />

      <FullscreenMode
        isVisible={isFullscreen}
        totalMilliseconds={timerState.totalMilliseconds}
        isFinished={timerState.isFinished}
        theme={fullscreenTheme}
        onClose={handleCloseFullscreen}
        onToggleTheme={toggleFullscreenTheme}
      />
    </>
  );
};

export default App;
