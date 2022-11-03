import HomeMobile from './HomeMobile';

import CardBox from '@/components/CardBox';

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
      <CardBox />
    </div>
  );
};

export default Home;
