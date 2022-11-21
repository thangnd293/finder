import { useEffect, useState } from 'react';

import EditIcon from '@/assets/svgs/EditIcon';
import PlusIcon from '@/assets/svgs/PlusIcon';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import PersonalityType from '@/components/PersonalityType';
import Space from '@/components/Space';

import { HOBBIES } from '@/common/constants/data';

const MAX_HOBBIES = 5;
const MIN_HOBBIES = 3;

interface Props {
  values: string[];
  onChangeValue: (hobbies: string[]) => void;
}

const HobbiesDialog = ({ values, onChangeValue }: Props) => {
  const [hobbies, setHobbies] = useState<string[]>(values);

  useEffect(() => {
    setHobbies(values);
  }, [values]);

  const [showDialog, setShowDialog] = useState(false);

  const onHobbitClick = (value: string) => {
    const index = hobbies.indexOf(value);
    if (index === -1) {
      if (hobbies.length === MAX_HOBBIES) return;

      setHobbies([...hobbies, value]);
    } else {
      setHobbies(hobbies.filter(item => item !== value));
    }
  };

  const handleSubmit = () => {
    onChangeValue(hobbies);
    setShowDialog(false);
  };

  const existsHobbit = (value: string) => hobbies.indexOf(value) !== -1;
  const showEdit = values.length > 0;

  return (
    <>
      <p className='mb-1 text-16 font-semibold'>Sở Thích</p>

      <Button
        type='button'
        className='!text-16'
        label={showEdit ? 'Sửa sở thích' : 'Thêm Sở Thích'}
        variant='outline'
        icon={showEdit ? <EditIcon /> : <PlusIcon />}
        onClick={() => setShowDialog(true)}
      />

      <Modal visible={showDialog} onClose={() => setShowDialog(false)}>
        <div className='w-[640px] max-h-[80vh] p-2 overflow-y-auto scroll-hidden text-center'>
          <h3 className='text-32 text-base font-semibold'>Sở Thích</h3>
          <Space h={20} />
          <p className='text-14 text-text-secondary'>
            Hãy cho mọi người biết bạn thích những gì bằng cách thêm thông tin
            vào hồ sơ.
          </p>
          <div className='flex justify-center gap-0.8 flex-wrap max-w-[552px] mx-auto my-1.2'>
            {HOBBIES.map((hobbit, index) => (
              <PersonalityType
                key={index}
                text={hobbit}
                isActive={existsHobbit(hobbit)}
                onClick={onHobbitClick}
              />
            ))}
          </div>
          <Button
            disabled={hobbies.length < MIN_HOBBIES}
            label={`Tiếp tục (${hobbies.length}/${MAX_HOBBIES})`}
            size='large'
            width='full'
            onClick={handleSubmit}
          />
        </div>
      </Modal>
    </>
  );
};

export default HobbiesDialog;
