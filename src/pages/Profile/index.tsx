import { Link } from 'react-router-dom';

import { useUserStore } from '@/store/user';

import Button from '@/components/Button';
import Card from '@/components/Card';
import Carousel from '@/components/Carousel';
import Information from '@/components/Information';

import { PATH } from '@/common/constants/route';

const Profile = () => {
  const user = useUserStore(s => s.user);

  return (
    <div className='flex items-center justify-center w-full h-full'>
      <Card className='relative overflow-hidden'>
        <div className='w-full h-full overflow-x-hidden overflow-y-scroll scroll-hidden'>
          <div className='w-full h-full '>
            <div className='h-4/5'>
              <Carousel images={user!.images!} isDrag={false} />
            </div>
            <div className='bg-white pb-6'>
              <Information user={user!} />
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
              <Button className='-translate-y-2' label={'Edit Info'} />
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
