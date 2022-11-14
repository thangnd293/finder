import { useEffect, useState } from 'react';

import useIsServer from './useIsServer';

interface Props {
  mediaQuery: string;
}

const useMediaQuery = ({ mediaQuery }: Props) => {
  const isServer = useIsServer();
  const [match, setMatch] = useState(() => {
    if (isServer) return false;
    return window.matchMedia(mediaQuery).matches;
  });

  useEffect(() => {
    if (isServer) setMatch(false);

    function onResize() {
      const newMatch = window.matchMedia(mediaQuery).matches;
      setMatch(newMatch);
    }

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [mediaQuery]);

  return match;
};

export default useMediaQuery;
