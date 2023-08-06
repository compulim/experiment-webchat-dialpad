import './DialPadButton.css';

import { memo, useCallback } from 'react';
import { useRefFrom } from 'use-ref-from';

type Props = {
  onClick?: () => void;
  ruby?: string;
  text: string;
};

export default memo(function DialPadButton({ onClick, ruby, text }: Props) {
  const onClickRef = useRefFrom(onClick);

  const handleClick = useCallback(() => onClickRef.current?.(), [text]);

  return (
    <button className="dial-pad-button" onClick={handleClick} type="button">
      <span className="dial-pad-button__text">{text}</span>
      {!!ruby && <ruby className="dial-pad-button__ruby">{ruby}</ruby>}
    </button>
  );
});
