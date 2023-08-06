export default function createOscillatorAndGain(
  frequency: number,
  gain: number = 0.1
): [() => void, () => void, () => void] {
  let audioContext: AudioContext;
  let gainNode: GainNode;
  let oscillatorNode: OscillatorNode | undefined;

  return [
    () => {
      if (!oscillatorNode) {
        if (!audioContext) {
          audioContext = new AudioContext();

          gainNode = audioContext.createGain();

          gainNode.connect(audioContext.destination);
          gainNode.gain.value = gain;
        }

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
    () => audioContext?.close()
  ];
}
