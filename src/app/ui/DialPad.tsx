import './DialPad.css';

import { memo, useCallback } from 'react';

import DialPadButton from './DialPadButton';
import { useRefFrom } from 'use-ref-from';

type Props = {
  onButtonClick: (button: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0' | 'star' | 'pound') => void;
};

export default memo(function DialPad({ onButtonClick }: Props) {
  const onButtonClickRef = useRefFrom(onButtonClick);

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

  return (
    <div className="dial-pad">
      <div className="dial-pad__box">
        <DialPadButton onClick={handleButton1Click} text="1" />
        <DialPadButton onClick={handleButton2Click} ruby="ABC" text="2" />
        <DialPadButton onClick={handleButton3Click} ruby="DEF" text="3" />
        <DialPadButton onClick={handleButton4Click} ruby="GHI" text="4" />
        <DialPadButton onClick={handleButton5Click} ruby="JKL" text="5" />
        <DialPadButton onClick={handleButton6Click} ruby="MNO" text="6" />
        <DialPadButton onClick={handleButton7Click} ruby="PQRS" text="7" />
        <DialPadButton onClick={handleButton8Click} ruby="TUV" text="8" />
        <DialPadButton onClick={handleButton9Click} ruby="WXYZ" text="9" />
        <DialPadButton onClick={handleButtonStarClick} text={'\u2217'} />
        <DialPadButton onClick={handleButton0Click} text="0" />
        <DialPadButton onClick={handleButtonPoundClick} text="#" />
      </div>
    </div>
  );
});
