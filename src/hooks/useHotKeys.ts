import { useEffect, useRef } from 'react';

const TIME_TO_CLEAR_KEYS = 1000;
type HotKey = [keys: string, callback: () => void];

const useHotKeys = (hotkeys: HotKey[]) => {
  const keysEntered = useRef<string[]>([]);

  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      keysEntered.current.push(e.key);

      hotkeys.forEach(([keys, callback]) => {
        console.log(keysEntered.current);

        if (keysEntered.current.join('+').includes(keys)) {
          callback();
          keysEntered.current = [];
        }
      });
    };

    window.addEventListener('keydown', keydownHandler);
    return () => window.removeEventListener('keydown', keydownHandler);
  }, [hotkeys]);

  useEffect(() => {
    function clearKeys() {
      keysEntered.current = [];
    }

    const timerId = setInterval(clearKeys, TIME_TO_CLEAR_KEYS);

    return () => clearInterval(timerId);
  }, []);
};

export default useHotKeys;
