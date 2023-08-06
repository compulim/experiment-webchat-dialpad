import { useEffect, useMemo } from 'react';

import createOscillatorAndGain from '../utils/createOscillatorAndGain';

export default function useOscillatorAndGain(frequency: number, gain: number): readonly [() => void, () => void] {
  const [start, stop, close] = useMemo(() => createOscillatorAndGain(frequency, gain), [frequency, gain]);

  useEffect(() => () => close(), [close]);

  return Object.freeze([start, stop]);
}
