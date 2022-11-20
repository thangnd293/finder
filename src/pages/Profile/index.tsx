import { Link } from 'react-router-dom';

import ProfileMobile from './ProfileMobile';

import Button from '@/components/Button';
import Card from '@/components/Card';
import Carousel from '@/components/Carousel';
import Information from '@/components/Information';

import useMediaQuery from '@/hooks/useMediaQuery';

import { RESPONSIVE } from '@/common/constants/responsive';
import { PATH } from '@/common/constants/route';

interface Props {}

const Profile = ({}: Props) => {
  const isMobile = useMediaQuery({
    mediaQuery: `(max-width: ${RESPONSIVE.md}px)`,
  });

  if (isMobile) return <ProfileMobile />;
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <Card className='relative overflow-hidden'>
        <div className='w-full h-full overflow-x-hidden overflow-y-scroll scroll-hidden'>
          <div className='w-full h-full '>
            <div className='h-4/5'>
              <Carousel isDrag={false} />
            </div>
            <div className='bg-white pb-6'>
              <Information />
            </div>
          </div>
        </div>
        <div className='absolute bottom-0 w-full'>
          <div
            className='pt-1.6 flex justify-center'
            style={{
              backgroundImage: 'linear-gradient(to bottom,#fff0 -5%,#fff 20%)',
            }}
          >
            <Link to={PATH.APP.PROFILE.EDIT}>
              <Button
                className='-translate-y-2'
                label={'Edit Info ( 70% complete )'}
              />
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
