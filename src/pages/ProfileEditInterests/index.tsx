import Card from '@/components/Card';
import PersonalityType from '@/components/PersonalityType';

import { HOBBIES } from '@/common/constants/data';

interface Props {}

const ProfileEditInterests = ({}: Props) => {
  const handleDone = () => {
    console.log('done');
  };
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <Card
        className='flex flex-col bg-gray-10 relative overflow-y-auto scroll-hidden'
        title='Sửa Sở Thích'
        onDone={handleDone}
      >
        <p className='px-1.2 py-2 text-14 text-text-secondary font-light'>
          Chọn các sở thích bạn muốn chia sẻ với mọi người. Chọn tối thiểu 3.
        </p>
        <div className='flex items-center justify-between p-1.2 text-12 text-text-secondary font-semibold uppercase'>
          <span>Sở Thích</span>
          <span>(5/5)</span>
        </div>
        <div className='flex justify-center flex-wrap gap-0.8 py-1.6 px-1.2 bg-white'>
          {HOBBIES.map((hobbit, index) => (
            <PersonalityType
              key={index}
              text={hobbit}
              // isActive={existsHobbit(hobbit)}
              // onClick={onHobbitClick}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ProfileEditInterests;
