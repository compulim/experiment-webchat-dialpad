import './WebChatWithDialPad.css';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Components, hooks } from 'botframework-webchat';
import { wrapWith } from 'react-wrap-with';

import DialPad from './DialPad';

const { BasicConnectivityStatus, BasicSendBox, BasicToaster, BasicTranscript, Composer } = Components;
const { useSendMessage } = hooks;

const ChatCore = memo(function ChatCore() {
  const webchatRef = useRef<HTMLDivElement>(null);
  const sendMessage = useSendMessage();

  const handleDialPadButtonClick = useCallback<(button: string) => void>(
    button => {
      sendMessage(`DTMF: ${button}`);
    },
    [sendMessage]
  );

  const [isHorizontal, setIsHorizontal] = useState(true);

  const handleResize = useCallback(() => {
    if (webchatRef.current) {
      const { height } = webchatRef.current.getBoundingClientRect();
      setIsHorizontal( height < 400);
    }
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(handleResize);
    if (webchatRef.current) {
      resizeObserver.observe(webchatRef.current);
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, [handleResize]);

  return (
    <div className="chat" ref={webchatRef}>
      <BasicToaster />
      <BasicTranscript className="chat__transcript" />
      <BasicConnectivityStatus />
      <DialPad onButtonClick={handleDialPadButtonClick} isHorizontal={isHorizontal}/>
      <BasicSendBox />
    </div>
  );
});

export default memo(wrapWith(Composer, undefined, ['directLine'])(ChatCore));
