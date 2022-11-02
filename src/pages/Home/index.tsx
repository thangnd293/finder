import HomeMobile from './HomeMobile';

import Card from '@/components/Card/index';

import useMediaQuery from '@/hooks/useMediaQuery';

import { RESPONSIVE } from '@/common/constants/responsive';

interface Props {}

const Home = ({}: Props) => {
  const isMobile = useMediaQuery({
    mediaQuery: `(max-width: ${RESPONSIVE.md}px)`,
  });

  if (isMobile) return <HomeMobile />;

  return (
    <div
      id='card-box'
      className='w-full h-full flex items-center justify-center overflow-hidden'
    >
      <Card />
    </div>
  );
};

export default Home;
