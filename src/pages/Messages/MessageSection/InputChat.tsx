import { GiphyFetch } from '@giphy/js-fetch-api';
import { Carousel, SearchContextManager } from '@giphy/react-components';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { useEffect, useRef, useState } from 'react';

import EmojiIcon from '@/assets/svgs/EmojiIcon';
import GifIcon from '@/assets/svgs/GifIcon';
import Button from '@/components/Button';
import Textarea from '@/components/Textarea';

import useClickOutside from '@/hooks/useClickOutside';

const GIF_PER_PAGE = 10;

type Popup = 'none' | 'emoji' | 'gif';

interface Props {}

const InputChat = ({}: Props) => {
  const [show, setShow] = useState<Popup>('none');

  const [message, setMessage] = useState('');
  const [searchGif, setSearchGif] = useState('');

  const btnEmojiRef = useRef<HTMLButtonElement>(null);
  const btnGifRef = useRef<HTMLButtonElement>(null);
  const searchGifRef = useRef<HTMLTextAreaElement>(null);

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
    console.log(message + emojiData.emoji);
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
      <div className='flex items-center w-full p-1.6 border-0 border-y border-solid border-gray-20 relative'>
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
                onGifClick={gif => console.log(gif)}
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
        <Button label='Send' disabled={!message.trim()} />
      </div>
    </SearchContextManager>
  );
};

export default InputChat;
