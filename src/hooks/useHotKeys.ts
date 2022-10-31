import { useEffect, useState } from 'react';

type HotKey = [keys: string[], callback: () => void];

const useHotKeys = <T extends HTMLElement = HTMLDivElement>(
  hotkeys: HotKey[],
): ((node: T) => void) => {
  const [ref, setRef] = useState<T | null>(null);
  useEffect(() => {
    const el = ref;

    if (!el) return;

    const keydownHandler = (e: KeyboardEvent) => {
      console.log(e);

      //   hotkeys.forEach(([keys, callback]) => {
      //     if (keys.includes(e.key)) {
      //       callback();
      //     }
      //   });
    };

    el.addEventListener('keydown', keydownHandler);

    return () => el.removeEventListener('keydown', keydownHandler);
  }, [ref, hotkeys]);

  return setRef;
};

export default useHotKeys;
