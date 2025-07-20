export const formatTime = (totalMilliseconds: number): string => {
  const m = Math.floor(totalMilliseconds / 60000);
  const s = Math.floor((totalMilliseconds % 60000) / 1000);
  const ms = Math.floor((totalMilliseconds % 1000) / 10);

  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}:${ms
    .toString()
    .padStart(2, "0")}`;
};

export const playBeep = (): void => {
  if ("AudioContext" in window || "webkitAudioContext" in window) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const audioContext = new AudioContextClass();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.5
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  }
};

export const calculateTotalMilliseconds = (
  minutes: number,
  seconds: number,
  milliseconds: number
): number => {
  return minutes * 60000 + seconds * 1000 + milliseconds * 10;
};
