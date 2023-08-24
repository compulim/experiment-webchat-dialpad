import './DialPad.css';

import { ReactNode, memo, useCallback, useMemo, useState } from 'react';
import { useRefFrom } from 'use-ref-from';

import BasicFilm from './BasicFilm';
import DialPadButton from './DialPadButton';

import { type DTMFButton } from '../types/DTMFButton';
import useOscillatorAndGain from '../hooks/useOscillatorAndGain';

type Props = {
  onButtonClick: (button: DTMFButton) => void;
  isHorizontal: boolean;
};

const GAIN = 0.003;

function deleteFromImmutableSet<T>(set: Set<T>, value: T): Set<T> {
  const nextSet = new Set(set);

  nextSet.delete(value);

  return nextSet;
}

function setHasSome<T>(set: Set<T>, anyOf: Iterable<T>): boolean {
  for (const value of anyOf) {
    if (set.has(value)) {
      return true;
    }
  }

  return false;
}

function DialPadWrapper({ children, isHorizontal }: { children: ReactNode, isHorizontal: boolean }) {
  return !isHorizontal ? 
    <BasicFilm>{children}</BasicFilm> 
    : <div className="dial-pad__box">{children}</div>;
}

export default memo(function DialPad({ onButtonClick, isHorizontal }: Props) {
  const onButtonClickRef = useRefFrom(onButtonClick);
  const [showDialPad, setShowDialPad] = useState(false);

  const [playingButtons, setPlayingButtons] = useState<Set<DTMFButton>>(new Set());
  const [startOscillator697, stopOscillator697] = useOscillatorAndGain(697, GAIN);
  const [startOscillator770, stopOscillator770] = useOscillatorAndGain(770, GAIN);
  const [startOscillator852, stopOscillator852] = useOscillatorAndGain(852, GAIN);
  const [startOscillator941, stopOscillator941] = useOscillatorAndGain(941, GAIN);
  const [startOscillator1209, stopOscillator1209] = useOscillatorAndGain(1209, GAIN);
  const [startOscillator1336, stopOscillator1336] = useOscillatorAndGain(1336, GAIN);
  const [startOscillator1477, stopOscillator1477] = useOscillatorAndGain(1477, GAIN);

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

  const handlePlayEnd = useCallback(
    (button: DTMFButton) => setPlayingButtons(set => deleteFromImmutableSet(set, button)),
    [setPlayingButtons]
  );
  const handlePlayStart = useCallback(
    (button: DTMFButton) => setPlayingButtons(set => new Set(set).add(button)),
    [setPlayingButtons]
  );

  const handleButton1PlayEnd = useCallback(() => handlePlayEnd('1'), [setPlayingButtons]);
  const handleButton1PlayStart = useCallback(() => handlePlayStart('1'), [setPlayingButtons]);
  const handleButton2PlayEnd = useCallback(() => handlePlayEnd('2'), [setPlayingButtons]);
  const handleButton2PlayStart = useCallback(() => handlePlayStart('2'), [setPlayingButtons]);
  const handleButton3PlayEnd = useCallback(() => handlePlayEnd('3'), [setPlayingButtons]);
  const handleButton3PlayStart = useCallback(() => handlePlayStart('3'), [setPlayingButtons]);
  const handleButton4PlayEnd = useCallback(() => handlePlayEnd('4'), [setPlayingButtons]);
  const handleButton4PlayStart = useCallback(() => handlePlayStart('4'), [setPlayingButtons]);
  const handleButton5PlayEnd = useCallback(() => handlePlayEnd('5'), [setPlayingButtons]);
  const handleButton5PlayStart = useCallback(() => handlePlayStart('5'), [setPlayingButtons]);
  const handleButton6PlayEnd = useCallback(() => handlePlayEnd('6'), [setPlayingButtons]);
  const handleButton6PlayStart = useCallback(() => handlePlayStart('6'), [setPlayingButtons]);
  const handleButton7PlayEnd = useCallback(() => handlePlayEnd('7'), [setPlayingButtons]);
  const handleButton7PlayStart = useCallback(() => handlePlayStart('7'), [setPlayingButtons]);
  const handleButton8PlayEnd = useCallback(() => handlePlayEnd('8'), [setPlayingButtons]);
  const handleButton8PlayStart = useCallback(() => handlePlayStart('8'), [setPlayingButtons]);
  const handleButton9PlayEnd = useCallback(() => handlePlayEnd('9'), [setPlayingButtons]);
  const handleButton9PlayStart = useCallback(() => handlePlayStart('9'), [setPlayingButtons]);
  const handleButton0PlayEnd = useCallback(() => handlePlayEnd('0'), [setPlayingButtons]);
  const handleButton0PlayStart = useCallback(() => handlePlayStart('0'), [setPlayingButtons]);
  const handleButtonStarPlayEnd = useCallback(() => handlePlayEnd('star'), [setPlayingButtons]);
  const handleButtonStarPlayStart = useCallback(() => handlePlayStart('star'), [setPlayingButtons]);
  const handleButtonPoundPlayEnd = useCallback(() => handlePlayEnd('pound'), [setPlayingButtons]);
  const handleButtonPoundPlayStart = useCallback(() => handlePlayStart('pound'), [setPlayingButtons]);

  // Playing individual tone is important. This mimic how telephones actually work when multiple buttons are pressed via a crossbar approach.
  const shouldPlayOscillator697 = useMemo(() => setHasSome(playingButtons, ['1', '2', '3']), [playingButtons]);
  const shouldPlayOscillator770 = useMemo(() => setHasSome(playingButtons, ['4', '5', '6']), [playingButtons]);
  const shouldPlayOscillator852 = useMemo(() => setHasSome(playingButtons, ['7', '8', '9']), [playingButtons]);
  const shouldPlayOscillator941 = useMemo(() => setHasSome(playingButtons, ['star', '0', 'pound']), [playingButtons]);
  const shouldPlayOscillator1209 = useMemo(() => setHasSome(playingButtons, ['1', '4', '7', 'star']), [playingButtons]);
  const shouldPlayOscillator1336 = useMemo(() => setHasSome(playingButtons, ['2', '5', '8', '0']), [playingButtons]);
  const shouldPlayOscillator1477 = useMemo(
    () => setHasSome(playingButtons, ['3', '6', '9', 'pound']),
    [playingButtons]
  );

  useMemo(() => (shouldPlayOscillator697 ? startOscillator697() : stopOscillator697()), [shouldPlayOscillator697]);
  useMemo(() => (shouldPlayOscillator770 ? startOscillator770() : stopOscillator770()), [shouldPlayOscillator770]);
  useMemo(() => (shouldPlayOscillator852 ? startOscillator852() : stopOscillator852()), [shouldPlayOscillator852]);
  useMemo(() => (shouldPlayOscillator941 ? startOscillator941() : stopOscillator941()), [shouldPlayOscillator941]);
  useMemo(() => (shouldPlayOscillator1209 ? startOscillator1209() : stopOscillator1209()), [shouldPlayOscillator1209]);
  useMemo(() => (shouldPlayOscillator1336 ? startOscillator1336() : stopOscillator1336()), [shouldPlayOscillator1336]);
  useMemo(() => (shouldPlayOscillator1477 ? startOscillator1477() : stopOscillator1477()), [shouldPlayOscillator1477]);

  return (
    <div className="dial-pad" aria-label="dial pad">
      {showDialPad && <DialPadWrapper isHorizontal={isHorizontal}>
          <DialPadButton
            button="1"
            onClick={handleButton1Click}
            onPlayEnd={handleButton1PlayEnd}
            onPlayStart={handleButton1PlayStart}
          />
          <DialPadButton
            button="2"
            onClick={handleButton2Click}
            onPlayEnd={handleButton2PlayEnd}
            onPlayStart={handleButton2PlayStart}
            ruby="ABC"
          />
          <DialPadButton
            button="3"
            onClick={handleButton3Click}
            onPlayEnd={handleButton3PlayEnd}
            onPlayStart={handleButton3PlayStart}
            ruby="DEF"
          />
          <DialPadButton
            button="4"
            onClick={handleButton4Click}
            onPlayEnd={handleButton4PlayEnd}
            onPlayStart={handleButton4PlayStart}
            ruby="GHI"
          />
          <DialPadButton
            button="5"
            onClick={handleButton5Click}
            onPlayEnd={handleButton5PlayEnd}
            onPlayStart={handleButton5PlayStart}
            ruby="JKL"
          />
          <DialPadButton
            button="6"
            onClick={handleButton6Click}
            onPlayEnd={handleButton6PlayEnd}
            onPlayStart={handleButton6PlayStart}
            ruby="MNO"
          />
          <DialPadButton
            button="7"
            onClick={handleButton7Click}
            onPlayEnd={handleButton7PlayEnd}
            onPlayStart={handleButton7PlayStart}
            ruby="PQRS"
          />
          <DialPadButton
            button="8"
            onClick={handleButton8Click}
            onPlayEnd={handleButton8PlayEnd}
            onPlayStart={handleButton8PlayStart}
            ruby="TUV"
          />
          <DialPadButton
            button="9"
            onClick={handleButton9Click}
            onPlayEnd={handleButton9PlayEnd}
            onPlayStart={handleButton9PlayStart}
            ruby="WXYZ"
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
            ruby="OPER"
          />
          <DialPadButton
            button="pound"
            onClick={handleButtonPoundClick}
            onPlayEnd={handleButtonPoundPlayEnd}
            onPlayStart={handleButtonPoundPlayStart}
          />
        </DialPadWrapper>
      }
      <button className="dial-pad__control" onClick={() => {setShowDialPad(!showDialPad)}}>
        {showDialPad ? 'H' : 'S'}
      </button>
    </div>
  );
});
