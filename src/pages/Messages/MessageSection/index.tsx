import { Fragment, useEffect, useRef } from 'react';

import { useMessagesContext } from '..';
import Header from './Header';
import InputChat from './InputChat';
import Messages from './Messages';

const MessageSection = () => {
  const { conversation, messages } = useMessagesContext();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    el.scrollTop = el.scrollHeight;
  }, [ref, messages]);

  if (!conversation) return <Fragment />;

  return (
    <div className='flex-1 flex flex-col overflow-x-hidden'>
      <Header />
      <div ref={ref} className='flex-1 w-full px-2 py-1 overflow-y-auto'>
        {messages.length > 0 ? (
          <Messages />
        ) : (
          <div className='w-full h-full flex flex-col items-center justify-center'>
            <p>You Matched with {conversation.user?.username}</p>
            <p>{conversation.createdAt.toString()}</p>
            <div
              className='w-21 h-21 rounded-full bg-center bg-cover'
              style={{
                backgroundImage: `url("${conversation.user?.images![0]}")`,
              }}
            ></div>
          </div>
        )}
      </div>
      <InputChat />
    </div>
  );
};

export default MessageSection;
