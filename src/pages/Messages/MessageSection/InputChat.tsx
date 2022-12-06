import SocketIO from '@/socket';
import { GiphyFetch } from '@giphy/js-fetch-api';
import type { IGif } from '@giphy/js-types';
import { Carousel, SearchContextManager } from '@giphy/react-components';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { FormEvent, useEffect, useRef, useState } from 'react';

import { useMessagesContext } from '..';

import { useAuthStore } from '@/store/auth';
import { useUserStore } from '@/store/user';

import EmojiIcon from '@/assets/svgs/EmojiIcon';
import GifIcon from '@/assets/svgs/GifIcon';
import Button from '@/components/Button';
import Textarea from '@/components/Textarea';

import useClickOutside from '@/hooks/useClickOutside';

import { MessageType } from '@/api-graphql';

const GIF_PER_PAGE = 10;

type Popup = 'none' | 'emoji' | 'gif';

const InputChat = () => {
  const { accessToken } = useAuthStore();
  const { user } = useUserStore();
  const { conversation, addMessage, updateMessage } = useMessagesContext();
  const [show, setShow] = useState<Popup>('none');

  const [message, setMessage] = useState('');
  const [searchGif, setSearchGif] = useState('');

  const btnEmojiRef = useRef<HTMLButtonElement>(null);
  const btnGifRef = useRef<HTMLButtonElement>(null);
  const searchGifRef = useRef<HTMLTextAreaElement>(null);

  const ack = useRef(0);

  useEffect(() => {
    if (!accessToken) return;
    SocketIO.getInstance(accessToken).on('isSendMessageSuccess', data => {
      updateMessage({ ...data.message, status: 'sent' }, data.uuid);
    });
  }, [accessToken]);

  const btnSubmitRef = useRef<HTMLButtonElement>(null);

  const emojiRef = useClickOutside(
    () => setShow('none'),
    [btnEmojiRef.current as HTMLElement],
  );

  const gifRef = useClickOutside(
    () => setShow('none'),
    [btnGifRef.current as HTMLElement, searchGifRef.current as HTMLElement],
  );

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setMessage(prev => prev + emojiData.emoji);
  };

  const onSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message || !accessToken || !conversation) return;

    const data = {
      conversion_id: conversation._id,
      receiver: conversation.user!._id,
      text: message,
      uuid: ack.current.toString(),
      createdAt: new Date().toISOString(),
      type: MessageType.Text,
      sender: user?._id,
      status: 'sending',
    };

    ack.current += 1;
    setMessage('');
    addMessage(data);
    SocketIO.getInstance(accessToken).emit('sendMessage', data);
  };

  const onGifSend = (gif: IGif) => {
    setShow('none');

    if (!accessToken || !conversation) return;
    const data = {
      conversion_id: conversation._id,
      receiver: conversation.user!._id,
      uuid: ack.current.toString(),
      createdAt: new Date().toISOString(),
      urlMessageImage: gif.images.preview_webp.url,
      type: MessageType.Image,
      sender: user?._id,
      status: 'sending',
    };

    ack.current += 1;
    setMessage('');
    addMessage(data);
    SocketIO.getInstance(accessToken).emit('sendMessage', data);
  };

  const gf = new GiphyFetch('wa13x8D1dErL2IgFZ13xyVVT6cxr5ZF1');

  const fetchGifs = (offset: number) => {
    if (!searchGif) return gf.trending({ limit: GIF_PER_PAGE });
    return gf.search(searchGif, { offset, limit: GIF_PER_PAGE });
  };

  return (
    <SearchContextManager
      apiKey={'wa13x8D1dErL2IgFZ13xyVVT6cxr5ZF1'}
      shouldDefaultToTrending
    >
      <form
        className='flex items-center w-full p-1.6 border-0 border-y border-solid border-gray-20 relative'
        onSubmit={onSend}
      >
        <div className='h-4'>
          {show === 'gif' && (
            <div
              ref={gifRef}
              className='absolute left-0 bottom-full h-24 w-full overflow-y-hidden bg-white border-0 border-y border-solid border-gray-20 p-2'
            >
              <Carousel
                gifHeight={200}
                gutter={6}
                fetchGifs={fetchGifs}
                key={searchGif}
                noLink
                onGifClick={onGifSend}
                hideAttribution
              />
            </div>
          )}
          <button
            ref={btnGifRef}
            className='w-4 h-4'
            onClick={() => setShow(prev => (prev === 'gif' ? 'none' : 'gif'))}
          >
            <GifIcon
              background={show !== 'gif' ? '#f0f2f4' : '#106bd5'}
              color={show === 'gif' ? '#f0f2f4' : '#106bd5'}
            />
          </button>
        </div>
        <Textarea
          className={`flex-1 p-0.8 text-16 text-base font-light outline-none resize-none scroll-hidden ${
            show !== 'gif' ? 'block' : 'hidden'
          }`}
          placeholder='Type a message'
          spellCheck='false'
          rows={1}
          maxRows={6}
          value={message}
          onChange={e => setMessage(e.target.value)}
          onEnter={() => btnSubmitRef.current?.click()}
        />

        <textarea
          className={`flex-1 p-0.8 text-16 text-base font-light outline-none resize-none scroll-hidden ${
            show === 'gif' ? 'block' : 'hidden'
          }`}
          ref={searchGifRef}
          placeholder='Search Tenor'
          spellCheck='false'
          rows={1}
          value={searchGif}
          onChange={e => setSearchGif(e.target.value)}
        />

        <div className='h-4 relative'>
          <button
            ref={btnEmojiRef}
            onClick={() =>
              setShow(prev => (prev === 'emoji' ? 'none' : 'emoji'))
            }
          >
            <EmojiIcon
              background={show !== 'emoji' ? '#f0f2f4' : '#f8a81f'}
              color={show === 'emoji' ? '#f0f2f4' : '#f8a81f'}
            />
          </button>
          {show === 'emoji' && (
            <div
              ref={emojiRef}
              className='absolute w-35 lg:w-29 ex-lg:w-35 aspect-[3/4] bottom-full right-0'
            >
              <EmojiPicker
                width='100%'
                height='100%'
                onEmojiClick={onEmojiClick}
                lazyLoadEmojis
              />
            </div>
          )}
        </div>
        <Button
          ref={btnSubmitRef}
          type='submit'
          label='Send'
          disabled={!message.trim()}
        />
      </form>
    </SearchContextManager>
  );
};

export default InputChat;
