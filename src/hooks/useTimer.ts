import { useState, useRef, useCallback } from "react";
import type { TimerState, TimerConfig } from "../types/timer";
import { calculateTotalMilliseconds, playBeep } from "../utils/timer";

export const useTimer = (initialConfig: TimerConfig) => {
  const [timerState, setTimerState] = useState<TimerState>(() => ({
    minutes: initialConfig.minutes,
    seconds: initialConfig.seconds,
    milliseconds: initialConfig.milliseconds,
    totalMilliseconds: calculateTotalMilliseconds(
      initialConfig.minutes,
      initialConfig.seconds,
      initialConfig.milliseconds
    ),
    isRunning: false,
    isFinished: false,
  }));

  const [alert, setAlert] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  });

  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const showAlert = useCallback((message: string) => {
    setAlert({ message, visible: true });
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setAlert({ message: "", visible: false });
    }, 3000);
  }, []);

  const updateFromInputs = useCallback(
    (config: TimerConfig) => {
      if (!timerState.isRunning) {
        const totalMs = calculateTotalMilliseconds(
          config.minutes,
          config.seconds,
          config.milliseconds
        );
        setTimerState((prev) => ({
          ...prev,
          minutes: config.minutes,
          seconds: config.seconds,
          milliseconds: config.milliseconds,
          totalMilliseconds: totalMs,
          isFinished: false,
        }));
      }
    },
    [timerState.isRunning]
  );

  const start = useCallback(() => {
    if (timerState.totalMilliseconds <= 0) {
      showAlert("時間を設定してください");
      return;
    }

    setTimerState((prev) => ({ ...prev, isRunning: true, isFinished: false }));

    intervalRef.current = setInterval(() => {
      setTimerState((prev) => {
        const newTotal = prev.totalMilliseconds - 10;

        if (newTotal <= 0) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          playBeep();
          window.alert("時間になりました！");
          return {
            ...prev,
            totalMilliseconds: 0,
            isRunning: false,
            isFinished: true,
          };
        }

        return {
          ...prev,
          totalMilliseconds: newTotal,
        };
      });
    }, 10);
  }, [timerState.totalMilliseconds, showAlert]);

  const pause = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTimerState((prev) => ({ ...prev, isRunning: false }));
  }, []);

  const reset = useCallback((config: TimerConfig) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const totalMs = calculateTotalMilliseconds(
      config.minutes,
      config.seconds,
      config.milliseconds
    );

    setTimerState({
      minutes: config.minutes,
      seconds: config.seconds,
      milliseconds: config.milliseconds,
      totalMilliseconds: totalMs,
      isRunning: false,
      isFinished: false,
    });
  }, []);

  return {
    timerState,
    alert,
    updateFromInputs,
    start,
    pause,
    reset,
    showAlert,
  };
};
