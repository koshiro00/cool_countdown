export interface TimerState {
  minutes: number;
  seconds: number;
  milliseconds: number;
  totalMilliseconds: number;
  isRunning: boolean;
  isFinished: boolean;
}

export interface TimerConfig {
  minutes: number;
  seconds: number;
  milliseconds: number;
}
