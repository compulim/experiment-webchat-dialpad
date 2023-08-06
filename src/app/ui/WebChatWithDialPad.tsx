import './WebChatWithDialPad.css';

import { memo, useCallback } from 'react';
import { Components, hooks } from 'botframework-webchat';
import { wrapWith } from 'react-wrap-with';

import DialPad from './DialPad';

const { BasicConnectivityStatus, BasicSendBox, BasicToaster, BasicTranscript, Composer } = Components;
const { useSendMessage } = hooks;

const ChatCore = memo(function ChatCore() {
  const sendMessage = useSendMessage();

  const handleDialPadButtonClick = useCallback<(button: string) => void>(
    button => {
      sendMessage(`DTMF: ${button}`);
    },
    [sendMessage]
  );

  return (
    <div className="chat">
      <BasicToaster />
      <BasicTranscript className="chat__transcript" />
      <BasicConnectivityStatus />
      <DialPad onButtonClick={handleDialPadButtonClick} />
      <BasicSendBox />
    </div>
  );
});

export default memo(wrapWith(Composer, undefined, ['directLine'])(ChatCore));
