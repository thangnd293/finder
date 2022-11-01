import { useState } from 'react';

import HomeMobile from './HomeMobile';

import Switch from '@/components/Switch';

import useMediaQuery from '@/hooks/useMediaQuery';

import { RESPONSIVE } from '@/common/constants/responsive';

interface Props {}

const Home = ({}: Props) => {
  const isMobile = useMediaQuery({
    mediaQuery: `(max-width: ${RESPONSIVE.md}px)`,
  });

  if (isMobile) return <HomeMobile />;
  const [checked, setChecked] = useState(true);
  return (
    <div>
      <Switch checked={checked} onChange={() => setChecked(!checked)} />
    </div>
  );
};

export default Home;
