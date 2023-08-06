import './App.css';

import { createDirectLine } from 'botframework-webchat';
import { memo, useEffect, useMemo, useState } from 'react';

import WebChatWithDialPad from './WebChatWithDialPad';

export default memo(function App() {
  const [token, setToken] = useState<string>();

  const directLine = useMemo(() => createDirectLine({ token }), [token]);

  useEffect(() => {
    const abortController = new AbortController();

    (async function () {
      const res = await fetch('https://webchat-mockbot3.azurewebsites.net/api/token/directline', { method: 'POST' });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status} while fetching token`);
      }

      const { token } = (await res.json()) as { token: string };

      setToken(token);
    })();

    return () => abortController.abort();
  }, [setToken]);

  return (
    <div className="app">
      {token ? (
        <div className="app__chat">
          <WebChatWithDialPad directLine={directLine} />
        </div>
      ) : (
        <p>Loading token</p>
      )}
    </div>
  );
});
