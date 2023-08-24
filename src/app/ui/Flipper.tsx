import React, { useCallback, useRef } from 'react';
import {
  useDir,
  useScrollBarPercentage,
  useScrollOneLeft,
  useScrollOneRight
} from 'react-film';

export const Flipper = ({ 'aria-label': ariaLabel, blurFocusOnClick, mode }) => {
  const [dir] = useDir();
  const [scrollBarPercentage] = useScrollBarPercentage();
  const buttonRef = useRef<any>();
  const left = mode === 'left';
  const scrollOneLeft = useScrollOneLeft();
  const scrollOneRight = useScrollOneRight();

  const handleClick = useCallback(() => {
    left ? scrollOneLeft() : scrollOneRight();
    blurFocusOnClick && buttonRef.current && buttonRef.current.blur();
  }, [blurFocusOnClick, buttonRef, left, scrollOneLeft, scrollOneRight]);

  const handleKeyDown = useCallback(
    event => {
      const { key } = event;

      if (key === 'Enter' || key === ' ') {
        event.preventDefault();
        left ? scrollOneLeft() : scrollOneRight();
      }
    },
    [left, scrollOneLeft, scrollOneRight]
  );

  let hide;

  if (dir === 'rtl') {
    if (left) {
      hide = scrollBarPercentage === '100%' || scrollBarPercentage === '-100%';
    } else {
      hide = scrollBarPercentage === '0%';
    }
  } else {
    if (left) {
      hide = scrollBarPercentage === '0%';
    } else {
      hide = scrollBarPercentage === '100%';
    }
  }

  return (
    <button
      aria-label={ariaLabel || (left ? 'left' : 'right')}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      ref={buttonRef}
      type="button"
    >
      { mode === 'left' ? '<' : '>' }
    </button>
  );
};

