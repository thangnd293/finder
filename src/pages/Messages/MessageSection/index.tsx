import { Fragment, UIEvent, useEffect, useRef, useState } from 'react';

import { useMessagesContext } from '..';
import Header from './Header';
import InputChat from './InputChat';
import Messages from './Messages';

import DownArrowIcon from '@/assets/svgs/DownArrowIcon';

const MessageSection = () => {
  const { conversation, messages } = useMessagesContext();
  const [showGoToBottom, setShowGoToBottom] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    el.scrollTop = el.scrollHeight;
  }, [ref, messages]);

  const onScroll = (e: UIEvent<HTMLDivElement, globalThis.UIEvent>) => {
    const el = e.target as HTMLDivElement;
    setShowGoToBottom(el.scrollHeight - el.clientHeight - el.scrollTop > 500);
  };

  if (!conversation) return <Fragment />;

  const onGoDown = () => {
    const el = ref.current;

    if (!el) return;

    el.scrollTo({
      top: el.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className='flex-1 flex flex-col overflow-x-hidden'>
      <Header />
      <div
        id='message-box'
        ref={ref}
        className='flex-1 w-full px-2 py-1 overflow-y-auto relative'
        onScroll={onScroll}
      >
        {messages.length > 0 ? (
          <Messages />
        ) : (
          <div className='w-full h-full flex flex-col items-center justify-center'>
            <p>Bạn đã kết nối với {conversation.user?.username}</p>
            <p>{new Date(conversation.createdAt).toLocaleDateString()}</p>
            <div
              className='w-21 h-21 rounded-full bg-center bg-cover'
              style={{
                backgroundImage: `url("${conversation.user?.images![0]}")`,
              }}
            ></div>
          </div>
        )}
        {showGoToBottom && (
          <button
            className='w-4 h-4 rounded-full bg-white flex items-center justify-center sticky bottom-0 left-1/2 -translate-x-1/2 text-primary border border-solid border-border-go-down shadow-go-down hover:bg-border-go-down'
            onClick={onGoDown}
          >
            <DownArrowIcon />
          </button>
        )}
      </div>
      <InputChat />
    </div>
  );
};

export default MessageSection;
