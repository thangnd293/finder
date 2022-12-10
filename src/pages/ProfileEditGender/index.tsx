import { apiCaller } from '@/service';
import { getUserFragment } from '@/service/user';
import { useState } from 'react';

import { useUserStore } from '@/store/user';

import Card from '@/components/Card';
import GenderPicker, { Gender } from '@/components/GenderPicker';
import Space from '@/components/Space';

import { useNavigate } from '@/hooks/useNavigate';

import { PATH } from '@/common/constants/route';

import { GenderEnum } from '@/api-graphql';

const ProfileEditGender = () => {
  const { user, setUser } = useUserStore();
  const [gender, setGender] = useState<Gender>(
    user?.gender === GenderEnum.Male ? Gender.Men : Gender.Women,
  );

  const navigate = useNavigate();

  const handleDone = () => {
    const newGender =
      gender === Gender.Men ? GenderEnum.Male : GenderEnum.Female;

    if (newGender !== user?.gender) {
      apiCaller
        .updateProfile()
        .$args({
          input: {
            gender: newGender,
          },
        })
        .$fetch()
        .then(() => {
          apiCaller
            .getCurrentUser(getUserFragment)
            .$fetch()
            .then(data => {
              setUser(data);
            });
        });
    }

    navigate(PATH.APP.PROFILE.EDIT);
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
        <GenderPicker notIncludeBoth value={gender} onChange={onGenderChange} />
      </Card>
    </div>
  );
};

export default ProfileEditGender;
