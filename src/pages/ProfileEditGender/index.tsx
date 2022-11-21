import { useState } from 'react';

import Card from '@/components/Card';
import GenderPicker, { Gender } from '@/components/GenderPicker';
import Space from '@/components/Space';

interface Props {}

const ProfileEditGender = ({}: Props) => {
  const [gender, setGender] = useState<Gender>(Gender.Both);

  const handleDone = () => {
    console.log('done');
  };

  const onGenderChange = (value: Gender) => {
    setGender(value);
  };

  return (
    <div className='w-full h-full flex items-center justify-center'>
      <Card
        className='flex flex-col bg-gray-10 relative overflow-y-auto scroll-hidden'
        title='Giới tính'
        onDone={handleDone}
      >
        <Space h={20} />
        <GenderPicker value={gender} onChange={onGenderChange} />
      </Card>
    </div>
  );
};

export default ProfileEditGender;
