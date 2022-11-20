import { useState } from 'react';

import CheckIcon from '@/assets/svgs/CheckIcon';

interface Props {}

enum Gender {
  Male = 'MALE',
  Female = 'FEMALE',
  Both = 'BOTH',
}

const GenderPanel = ({}: Props) => {
  const [gender, setGender] = useState<Gender>(Gender.Both);

  return (
    <div className='mt-2.5'>
      {GENDERS.map(item => (
        <GenderItem
          key={item.gender}
          label={item.label}
          isChecked={item.gender === gender}
          onClick={() => setGender(item.gender)}
        />
      ))}
      <p className='p-1.2 font-light'>{TEXT[gender]}</p>
    </div>
  );
};

export default GenderPanel;

const GENDERS: {
  gender: Gender;
  label: string;
}[] = [
  {
    gender: Gender.Male,
    label: 'Nam',
  },
  {
    gender: Gender.Female,
    label: 'Nữ',
  },
  {
    gender: Gender.Both,
    label: 'Mọi người',
  },
];

const TEXT: Record<Gender, string> = {
  [Gender.Male]: 'Bạn sẽ chỉ thấy nam giới trong mục tìm kiếm.',
  [Gender.Female]: 'Bạn sẽ chỉ thấy nữ giới trong mục tìm kiếm.',
  [Gender.Both]: 'Bạn sẽ thấy tất cả mọi người trong mục tìm kiếm.',
};

interface GenderItemProp {
  label: string;
  isChecked?: boolean;
  onClick: () => void;
}

const GenderItem = ({ label, isChecked, onClick }: GenderItemProp) => {
  return (
    <div
      className='flex items-center justify-between px-1.6 h-[52px] border-0 border-y border-solid border-gray-20 not-last:border-b-0 bg-white cursor-pointer'
      onClick={onClick}
    >
      <p>{label}</p>
      {isChecked && <CheckIcon className='text-primary' />}
    </div>
  );
};
