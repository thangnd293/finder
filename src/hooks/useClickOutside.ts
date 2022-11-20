import { useEffect, useState } from 'react';

const useClickOutside = <T extends HTMLElement = HTMLDivElement>(
  callback: () => void,
  exceptions: T[] = [],
): ((el: T | null) => void) => {
  const [el, setEl] = useState<T | null>(null);

  useEffect(() => {
    if (!el) return;

    const handleClick = (event: MouseEvent) => {
      console.log('click');
      console.log(el);

      if (
        !el.contains(event.target as Node) &&
        !exceptions.some(exception => exception.contains(event.target as Node))
      ) {
        callback();
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [el]);

  return setEl;
};

export default useClickOutside;
