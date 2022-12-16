import { apiCaller } from '@/service';
import { getUserFragment } from '@/service/user';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { setUser, useUserStore } from '@/store/user';

import GenderPicker, { Gender } from '@/components/GenderPicker';

import { PATH } from '@/common/constants/route';

import { LookingFor } from '@/api-graphql';

const GenderPanel = () => {
  const location = useLocation();
  const user = useUserStore(s => s.user);
  const [gender, setGender] = useState<Gender>(
    (user?.mySetting?.discovery.lookingFor as unknown as Gender) || Gender.All,
  );

  const onGenderChange = (value: Gender) => {
    setGender(value);
  };

  useEffect(() => {
    return () => {
      if (
        location.pathname !== PATH.APP.SETTING.GENDER &&
        user?.mySetting?.discovery.lookingFor !==
          (gender as unknown as LookingFor)
      ) {
        const updateLookingFor = async () => {
          await apiCaller
            .changeSetting()
            .$args({
              input: {
                discovery: {
                  ...user?.mySetting?.discovery,
                  lookingFor: gender as unknown as LookingFor,
                },
              },
            })
            .$fetch();

          const userUpdated = await apiCaller
            .getCurrentUser(getUserFragment)
            .$fetch();
          setUser(userUpdated);
        };
        updateLookingFor();
      }
    };
  }, [location, gender]);

  return (
    <div className='mt-2.5'>
      <GenderPicker value={gender} onChange={onGenderChange} />
      <p className='p-1.2 font-light'>{TEXT[gender]}</p>
    </div>
  );
};

export default GenderPanel;

const TEXT: Record<Gender, string> = {
  [Gender.Men]: 'Bạn sẽ chỉ thấy nam giới trong mục tìm kiếm.',
  [Gender.Women]: 'Bạn sẽ chỉ thấy nữ giới trong mục tìm kiếm.',
  [Gender.All]: 'Bạn sẽ thấy tất cả mọi người trong mục tìm kiếm.',
};
