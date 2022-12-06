import { useState } from 'react';

import GenderPicker, { Gender } from '@/components/GenderPicker';

interface Props {}

const GenderPanel = ({}: Props) => {
  const [gender, setGender] = useState<Gender>(Gender.Both);

  const onGenderChange = (value: Gender) => {
    setGender(value);
  };

  return (
    <div className='mt-2.5'>
      <GenderPicker value={gender} onChange={onGenderChange} />
      <p className='p-1.2 font-light'>{TEXT[gender]}</p>
    </div>
  );
};

export default GenderPanel;

const TEXT: Record<Gender, string> = {
  [Gender.Male]: 'Bạn sẽ chỉ thấy nam giới trong mục tìm kiếm.',
  [Gender.Female]: 'Bạn sẽ chỉ thấy nữ giới trong mục tìm kiếm.',
  [Gender.Both]: 'Bạn sẽ thấy tất cả mọi người trong mục tìm kiếm.',
};
