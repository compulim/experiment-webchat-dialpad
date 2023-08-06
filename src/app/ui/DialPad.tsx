import './DialPad.css';

import { memo, useCallback, useMemo, useState } from 'react';
import { useRefFrom } from 'use-ref-from';

import DialPadButton from './DialPadButton';

import { type DTMFButton } from '../types/DTMFButton';
import useOscillatorAndGain from '../hooks/useOscillatorAndGain';

type Props = {
  onButtonClick: (button: DTMFButton) => void;
};

const GAIN = 0.003;

function deleteFromImmutableSet<T>(set: Set<T>, value: T): Set<T> {
  const nextSet = new Set(set);

  nextSet.delete(value);

  return nextSet;
}

export default memo(function DialPad({ onButtonClick }: Props) {
  const onButtonClickRef = useRefFrom(onButtonClick);
  const [playingButtons, setPlayingButtons] = useState<Set<DTMFButton>>(new Set());

  const handleButton1Click = useCallback(() => onButtonClickRef.current?.('1'), [onButtonClickRef]);
  const handleButton2Click = useCallback(() => onButtonClickRef.current?.('2'), [onButtonClickRef]);
  const handleButton3Click = useCallback(() => onButtonClickRef.current?.('3'), [onButtonClickRef]);
  const handleButton4Click = useCallback(() => onButtonClickRef.current?.('4'), [onButtonClickRef]);
  const handleButton5Click = useCallback(() => onButtonClickRef.current?.('5'), [onButtonClickRef]);
  const handleButton6Click = useCallback(() => onButtonClickRef.current?.('6'), [onButtonClickRef]);
  const handleButton7Click = useCallback(() => onButtonClickRef.current?.('7'), [onButtonClickRef]);
  const handleButton8Click = useCallback(() => onButtonClickRef.current?.('8'), [onButtonClickRef]);
  const handleButton9Click = useCallback(() => onButtonClickRef.current?.('9'), [onButtonClickRef]);
  const handleButton0Click = useCallback(() => onButtonClickRef.current?.('0'), [onButtonClickRef]);
  const handleButtonStarClick = useCallback(() => onButtonClickRef.current?.('star'), [onButtonClickRef]);
  const handleButtonPoundClick = useCallback(() => onButtonClickRef.current?.('pound'), [onButtonClickRef]);

  const handleButton1PlayEnd = useCallback(
    () => setPlayingButtons(set => deleteFromImmutableSet(set, '1')),
    [setPlayingButtons]
  );
  const handleButton1PlayStart = useCallback(
    () => setPlayingButtons(set => new Set(set).add('1')),
    [setPlayingButtons]
  );
  const handleButton2PlayEnd = useCallback(
    () => setPlayingButtons(set => deleteFromImmutableSet(set, '2')),
    [setPlayingButtons]
  );
  const handleButton2PlayStart = useCallback(
    () => setPlayingButtons(set => new Set(set).add('2')),
    [setPlayingButtons]
  );
  const handleButton3PlayEnd = useCallback(
    () => setPlayingButtons(set => deleteFromImmutableSet(set, '3')),
    [setPlayingButtons]
  );
  const handleButton3PlayStart = useCallback(
    () => setPlayingButtons(set => new Set(set).add('3')),
    [setPlayingButtons]
  );
  const handleButton4PlayEnd = useCallback(
    () => setPlayingButtons(set => deleteFromImmutableSet(set, '4')),
    [setPlayingButtons]
  );
  const handleButton4PlayStart = useCallback(
    () => setPlayingButtons(set => new Set(set).add('4')),
    [setPlayingButtons]
  );
  const handleButton5PlayEnd = useCallback(
    () => setPlayingButtons(set => deleteFromImmutableSet(set, '5')),
    [setPlayingButtons]
  );
  const handleButton5PlayStart = useCallback(
    () => setPlayingButtons(set => new Set(set).add('5')),
    [setPlayingButtons]
  );
  const handleButton6PlayEnd = useCallback(
    () => setPlayingButtons(set => deleteFromImmutableSet(set, '6')),
    [setPlayingButtons]
  );
  const handleButton6PlayStart = useCallback(
    () => setPlayingButtons(set => new Set(set).add('6')),
    [setPlayingButtons]
  );
  const handleButton7PlayEnd = useCallback(
    () => setPlayingButtons(set => deleteFromImmutableSet(set, '7')),
    [setPlayingButtons]
  );
  const handleButton7PlayStart = useCallback(
    () => setPlayingButtons(set => new Set(set).add('7')),
    [setPlayingButtons]
  );
  const handleButton8PlayEnd = useCallback(
    () => setPlayingButtons(set => deleteFromImmutableSet(set, '8')),
    [setPlayingButtons]
  );
  const handleButton8PlayStart = useCallback(
    () => setPlayingButtons(set => new Set(set).add('8')),
    [setPlayingButtons]
  );
  const handleButton9PlayEnd = useCallback(
    () => setPlayingButtons(set => deleteFromImmutableSet(set, '9')),
    [setPlayingButtons]
  );
  const handleButton9PlayStart = useCallback(
    () => setPlayingButtons(set => new Set(set).add('9')),
    [setPlayingButtons]
  );
  const handleButton0PlayEnd = useCallback(
    () => setPlayingButtons(set => deleteFromImmutableSet(set, '0')),
    [setPlayingButtons]
  );
  const handleButton0PlayStart = useCallback(
    () => setPlayingButtons(set => new Set(set).add('0')),
    [setPlayingButtons]
  );
  const handleButtonStarPlayEnd = useCallback(
    () => setPlayingButtons(set => deleteFromImmutableSet(set, 'star')),
    [setPlayingButtons]
  );
  const handleButtonStarPlayStart = useCallback(
    () => setPlayingButtons(set => new Set(set).add('star')),
    [setPlayingButtons]
  );
  const handleButtonPoundPlayEnd = useCallback(
    () => setPlayingButtons(set => deleteFromImmutableSet(set, 'pound')),
    [setPlayingButtons]
  );
  const handleButtonPoundPlayStart = useCallback(
    () => setPlayingButtons(set => new Set(set).add('pound')),
    [setPlayingButtons]
  );

  // Playing individual tone is important. This mimick how telephones actually work when multiple buttons are pressed via a crossbar approach.
  const [startOscillator697, stopOscillator697] = useOscillatorAndGain(697, GAIN);
  const [startOscillator770, stopOscillator770] = useOscillatorAndGain(770, GAIN);
  const [startOscillator852, stopOscillator852] = useOscillatorAndGain(852, GAIN);
  const [startOscillator941, stopOscillator941] = useOscillatorAndGain(941, GAIN);
  const [startOscillator1209, stopOscillator1209] = useOscillatorAndGain(1209, GAIN);
  const [startOscillator1336, stopOscillator1336] = useOscillatorAndGain(1336, GAIN);
  const [startOscillator1477, stopOscillator1477] = useOscillatorAndGain(1477, GAIN);

  const shouldPlayOscillator697 = playingButtons.has('1') || playingButtons.has('2') || playingButtons.has('3');
  const shouldPlayOscillator770 = playingButtons.has('4') || playingButtons.has('5') || playingButtons.has('6');
  const shouldPlayOscillator852 = playingButtons.has('7') || playingButtons.has('8') || playingButtons.has('9');
  const shouldPlayOscillator941 = playingButtons.has('star') || playingButtons.has('0') || playingButtons.has('pound');
  const shouldPlayOscillator1209 =
    playingButtons.has('1') || playingButtons.has('4') || playingButtons.has('7') || playingButtons.has('star');
  const shouldPlayOscillator1336 =
    playingButtons.has('2') || playingButtons.has('5') || playingButtons.has('8') || playingButtons.has('0');
  const shouldPlayOscillator1477 =
    playingButtons.has('3') || playingButtons.has('6') || playingButtons.has('9') || playingButtons.has('pound');

  useMemo(() => (shouldPlayOscillator697 ? startOscillator697() : stopOscillator697()), [shouldPlayOscillator697]);
  useMemo(() => (shouldPlayOscillator770 ? startOscillator770() : stopOscillator770()), [shouldPlayOscillator770]);
  useMemo(() => (shouldPlayOscillator852 ? startOscillator852() : stopOscillator852()), [shouldPlayOscillator852]);
  useMemo(() => (shouldPlayOscillator941 ? startOscillator941() : stopOscillator941()), [shouldPlayOscillator941]);
  useMemo(() => (shouldPlayOscillator1209 ? startOscillator1209() : stopOscillator1209()), [shouldPlayOscillator1209]);
  useMemo(() => (shouldPlayOscillator1336 ? startOscillator1336() : stopOscillator1336()), [shouldPlayOscillator1336]);
  useMemo(() => (shouldPlayOscillator1477 ? startOscillator1477() : stopOscillator1477()), [shouldPlayOscillator1477]);

  return (
    <div className="dial-pad">
      <div className="dial-pad__box">
        <DialPadButton
          button="1"
          onClick={handleButton1Click}
          onPlayEnd={handleButton1PlayEnd}
          onPlayStart={handleButton1PlayStart}
        />
        <DialPadButton
          button="2"
          onClick={handleButton2Click}
          ruby="ABC"
          onPlayEnd={handleButton2PlayEnd}
          onPlayStart={handleButton2PlayStart}
        />
        <DialPadButton
          button="3"
          onClick={handleButton3Click}
          ruby="DEF"
          onPlayEnd={handleButton3PlayEnd}
          onPlayStart={handleButton3PlayStart}
        />
        <DialPadButton
          button="4"
          onClick={handleButton4Click}
          ruby="GHI"
          onPlayEnd={handleButton4PlayEnd}
          onPlayStart={handleButton4PlayStart}
        />
        <DialPadButton
          button="5"
          onClick={handleButton5Click}
          ruby="JKL"
          onPlayEnd={handleButton5PlayEnd}
          onPlayStart={handleButton5PlayStart}
        />
        <DialPadButton
          button="6"
          onClick={handleButton6Click}
          ruby="MNO"
          onPlayEnd={handleButton6PlayEnd}
          onPlayStart={handleButton6PlayStart}
        />
        <DialPadButton
          button="7"
          onClick={handleButton7Click}
          ruby="PQRS"
          onPlayEnd={handleButton7PlayEnd}
          onPlayStart={handleButton7PlayStart}
        />
        <DialPadButton
          button="8"
          onClick={handleButton8Click}
          ruby="TUV"
          onPlayEnd={handleButton8PlayEnd}
          onPlayStart={handleButton8PlayStart}
        />
        <DialPadButton
          button="9"
          onClick={handleButton9Click}
          ruby="WXYZ"
          onPlayEnd={handleButton9PlayEnd}
          onPlayStart={handleButton9PlayStart}
        />
        <DialPadButton
          button="star"
          onClick={handleButtonStarClick}
          onPlayEnd={handleButtonStarPlayEnd}
          onPlayStart={handleButtonStarPlayStart}
        />
        <DialPadButton
          button="0"
          onClick={handleButton0Click}
          onPlayEnd={handleButton0PlayEnd}
          onPlayStart={handleButton0PlayStart}
        />
        <DialPadButton
          button="pound"
          onClick={handleButtonPoundClick}
          onPlayEnd={handleButtonPoundPlayEnd}
          onPlayStart={handleButtonPoundPlayStart}
        />
      </div>
    </div>
  );
});
