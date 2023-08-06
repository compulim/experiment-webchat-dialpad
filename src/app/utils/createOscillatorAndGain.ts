export default function createOscillatorAndGain(
  frequency: number,
  gain: number = 0.1
): [() => void, () => void, () => void] {
  const audioContext = new AudioContext();

  const gainNode = audioContext.createGain();

  gainNode.connect(audioContext.destination);
  gainNode.gain.value = gain;

  let oscillatorNode: OscillatorNode | undefined;

  return [
    () => {
      if (!oscillatorNode) {
        oscillatorNode = audioContext.createOscillator();

        oscillatorNode.frequency.value = frequency;
        oscillatorNode.connect(gainNode);
        oscillatorNode.start();
      }
    },
    () => {
      oscillatorNode?.stop();
      oscillatorNode = undefined;
    },
    () => audioContext.close()
  ];
}
