import { apiCaller } from '@/service';
import { getUserFragment } from '@/service/user';
import { useEffect, useState } from 'react';

import { setUser, useUserStore } from '@/store/user';

import Card from '@/components/Card';
import PersonalityType from '@/components/PersonalityType';

import { useNavigate } from '@/hooks/useNavigate';

import { PATH } from '@/common/constants/route';

import { Tag, TagType, useGetAllTag } from '@/api-graphql';

const ProfileEditInterests = () => {
  const [loadHobbies, { data }] = useGetAllTag([
    { results: ['_id', 'name', 'type'] },
  ]);

  const user = useUserStore(s => s.user);

  const userHobbies =
    user?.tags?.filter(tag => tag.type === TagType.Passions) || [];
  const otherTags =
    user?.tags
      ?.filter(tag => tag.type !== TagType.Passions)
      .map(tag => tag._id) || [];

  const [currentChooses, setCurrentChooses] = useState(userHobbies);

  const navigate = useNavigate();

  const hobbies =
    data?.getAllTag.results?.filter(tag => tag.type === TagType.Passions) || [];

  useEffect(() => {
    loadHobbies();
  }, []);

  const handleDone = () => {
    apiCaller
      .updateProfile()
      .$args({
        input: {
          tags: [
            ...otherTags,
            ...currentChooses.map(hobbit => hobbit._id),
          ] as any,
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

    navigate(PATH.APP.PROFILE.EDIT);
  };

  const existsHobbit = (hobbitId: string) => {
    return currentChooses.some(hobbit => hobbit._id === hobbitId);
  };

  const onHobbitClick = (hobbit: Tag) => {
    if (existsHobbit(hobbit._id!)) {
      const newHobbies = currentChooses.filter(h => h._id !== hobbit._id);
      setCurrentChooses(newHobbies);
    } else {
      if (currentChooses.length >= 5) return;
      const newHobbies = [...currentChooses, hobbit];
      setCurrentChooses(newHobbies);
    }
  };

  return (
    <div className='w-full h-full flex items-center justify-center'>
      <Card
        className='flex flex-col bg-gray-10 relative overflow-y-auto scroll-hidden'
        title='S???a S??? Th??ch'
        onDone={handleDone}
      >
        <p className='px-1.2 py-2 text-14 text-text-secondary font-light'>
          Ch???n c??c s??? th??ch b???n mu???n chia s??? v???i m???i ng?????i. Ch???n t???i thi???u 3.
        </p>
        <div className='flex items-center justify-between p-1.2 text-12 text-text-secondary font-semibold uppercase'>
          <span>S??? Th??ch</span>
          <span>({currentChooses.length}/5)</span>
        </div>
        <div className='flex justify-center flex-wrap gap-0.8 py-1.6 px-1.2 bg-white'>
          {/* TODO */}
          {hobbies.map((hobbit, index) => (
            <PersonalityType
              key={index}
              tag={hobbit}
              isActive={existsHobbit(hobbit._id!)}
              onClick={() => {
                onHobbitClick(hobbit);
              }}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ProfileEditInterests;
