import { AnimatePresence, motion } from 'framer-motion';
import { MouseEvent, ReactNode, useEffect, useRef, useState } from 'react';

import Matches from './Matches/index';
import Messages from './Messages';

enum Tab {
  Matches = 'MATCHES',
  Messages = 'MESSAGES',
}

const HomePanel = () => {
  const [currentTab, setCurrentTab] = useState<Tab>(Tab.Matches);
  const matchesRef = useRef<HTMLButtonElement>(null);
  const hrRef = useRef<HTMLHRElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    matchesRef.current?.click();
  }, [matchesRef]);

  useEffect(() => {
    const hr = hrRef.current;

    if (hr) {
      hr.style.transition = 'all 150ms linear';
    }
  }, [hrRef]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onTabClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    const btn = e.target as HTMLButtonElement;
    const btnRect = btn.getBoundingClientRect();
    const hr = hrRef.current;

    if (hr) {
      hr.style.left = `${btnRect.left}px`;
      hr.style.width = `${btnRect.width}px`;
    }
  };

  return (
    <>
      <ul className='flex items-center gap-2 px-2 py-1.2 relative'>
        <li>
          <button
            ref={matchesRef}
            className='px-0.8 text-16 text-base font-semibold'
            onClick={e => {
              onTabClick(e);
              setCurrentTab(Tab.Matches);
            }}
          >
            Matches
          </button>
        </li>
        <li>
          <button
            className='px-0.8 text-16 text-base font-semibold'
            onClick={e => {
              onTabClick(e);
              setCurrentTab(Tab.Messages);
            }}
          >
            Messages
          </button>
        </li>
        <hr
          ref={hrRef}
          className='absolute bottom-0.7 left-2 border-b-2 border-solid border-primary'
        />
      </ul>

      <AnimatePresence>
        {currentTab === Tab.Matches && (
          <motion.div
            initial={{ x: isMounted ? '-100%' : '0' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ ease: 'linear', duration: 0.2 }}
            className='
            w-full h-full overflow-y-scroll scroll-hidden bg-gold-15 absolute top-4.5 pb-4.5'
          >
            <Matches />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {currentTab === Tab.Messages && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              ease: 'linear',
              duration: 0.2,
            }}
            className='w-full flex-1 overflow-y-auto bg-primary absolute top-4.5'
          >
            <Messages />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HomePanel;
