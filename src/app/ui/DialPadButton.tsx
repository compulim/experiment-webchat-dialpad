import './DialPadButton.css';

import {
  type EventHandler,
  type PointerEventHandler,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  TouchEventHandler
} from 'react';
import { useRefFrom } from 'use-ref-from';

import { type DTMFButton } from '../types/DTMFButton';

type Props = {
  button: DTMFButton;
  isHorizontal: boolean;
  onClick?: () => void;
  onPlayEnd?: () => void;
  onPlayStart?: () => void;
  ruby?: string;
};

export default memo(function DialPadButton({ button, onClick, onPlayStart, onPlayEnd, ruby, isHorizontal }: Props) {
  const downPointerIdRef = useRef<number>();
  const onClickRef = useRefFrom(onClick);
  const onPlayEndRef = useRefFrom(onPlayEnd);
  const onPlayStartRef = useRefFrom(onPlayStart);
  const stopPlayDTMFRef = useRef<(() => void) | null>();

  const handleClick = useCallback(() => onClickRef.current?.(), []);
  const handleContextMenu = useCallback<EventHandler<any>>(event => event.preventDefault(), []);
  const handlePointerDown = useCallback<PointerEventHandler<HTMLButtonElement>>(
    event => {
      if (event.pointerType === 'mouse' && event.button !== 0) {
        return;
      }

      event.preventDefault();

      downPointerIdRef.current = event.pointerId;
      onPlayStartRef.current?.();

      window.addEventListener('pointercancel', handlePointerCancelOrUp);
      window.addEventListener('pointerup', handlePointerCancelOrUp);

      // Mimic telephone so click are dispatched immediately.
      if (event.pointerType !== 'mouse') {
        onClickRef.current?.();
      }
    },
    [downPointerIdRef, onClickRef.current, onPlayStartRef, stopPlayDTMFRef]
  );
  const handlePointerCancelOrUp = useCallback<(event: PointerEvent) => void>(
    event => {
      if (event.pointerId === downPointerIdRef.current) {
        onPlayEndRef.current?.();

        event.preventDefault();

        window.removeEventListener('pointercancel', handlePointerCancelOrUp);
        window.removeEventListener('pointerup', handlePointerCancelOrUp);
      }
    },
    [downPointerIdRef, onPlayEndRef, stopPlayDTMFRef]
  );

  // To mimic telephone, we should dispatch clicks when we receive onPointerDown, instead of onClick.
  // However, after dispatch clicks from touch, we need to prevent dispatching clicks again in onClick.
  // To prevent onClick firing for touches, we call preventDefault during onTouchEnd.
  const handleTouchEnd = useCallback<TouchEventHandler<HTMLButtonElement>>(event => event.preventDefault(), []);

  useEffect(() => {
    onPlayEndRef.current?.();

    return () => {
      window.removeEventListener('pointercancel', handlePointerCancelOrUp);
      window.removeEventListener('pointerup', handlePointerCancelOrUp);
    };
  }, [handlePointerCancelOrUp]);

  const text = useMemo(() => (button === 'star' ? '\u2217' : button === 'pound' ? '#' : button), [button]);

  const ariaLabel = useMemo(() => {
    if (button === 'star') {
      return 'dial pad, star';
    } else if (button === 'pound') {
      return 'dial pad, pound';
    } else {
      return `dial pad, number ${button}`;
    }
  }, [button]);

  return (
    <button
      className={`dial-pad-button${isHorizontal?' dial-pad-button-horizontal':''}`}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      onPointerDown={handlePointerDown}
      onTouchEnd={handleTouchEnd}
      type="button"
      aria-label={ariaLabel}
    >
      <span className={`dial-pad-button__text${isHorizontal?' dial-pad-button-horizontal__text':''}`}>{text}</span>
      {!isHorizontal && !!ruby && <ruby className="dial-pad-button__ruby">{ruby}</ruby>}
    </button>
  );
});
