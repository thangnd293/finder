import { GetAllUserArgs, UserResult } from '@/api-graphql';
import { apiCaller } from '@/service';
import { fragmentGetAllUser } from '@/service/user/index';
import { useEffect, useState } from 'react';

import HomeMobile from './HomeMobile';

import CardBox from '@/components/CardController';

import useMediaQuery from '@/hooks/useMediaQuery';

import { RESPONSIVE } from '@/common/constants/responsive';

interface Props {}

const Home = ({}: Props) => {
  const [data, setData] = useState<UserResult | null>(null);
  const isMobile = useMediaQuery({
    mediaQuery: `(max-width: ${RESPONSIVE.md}px)`,
  });

  useEffect(() => {
    const fetch = async () => {
      const args: GetAllUserArgs = {};
      const data = await apiCaller
        .getAllUser(fragmentGetAllUser)
        .$args({})
        .$fetch();

      setData(data);
    };
    fetch();
  }, []);

  useEffect(() => {
    console.log('data', data);
  }, [data]);

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
