import { useField, useFormikContext } from 'formik';
import { useEffect, useState } from 'react';

import EditIcon from '@/assets/svgs/EditIcon';
import LoadingIcon from '@/assets/svgs/LoadingIcon';
import PlusIcon from '@/assets/svgs/PlusIcon';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import PersonalityType from '@/components/PersonalityType';

import { Tag, useGetAllTag } from '@/api-graphql';

const MAX_HOBBIES = 5;
const MIN_HOBBIES = 3;

interface Props {
  name: string;
}

const HobbiesDialog = ({ name }: Props) => {
  const [loadHobbies, { data: bobbiesData, loading }] = useGetAllTag([
    { results: ['_id', 'name'] },
  ]);

  const hobbiesList = bobbiesData?.getAllTag.results || [];

  const { setFieldValue } = useFormikContext();
  const [fields] = useField(name);
  const data = fields.value || [];

  const [hobbies, setHobbies] = useState<Tag[]>(data || []);

  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (!showDialog) return;
    loadHobbies();
  }, [showDialog]);

  const onHobbitClick = (value: Tag) => {
    const index = hobbies.indexOf(value);
    if (index === -1) {
      if (hobbies.length === MAX_HOBBIES) return;

      setHobbies([...hobbies, value]);
    } else {
      setHobbies(hobbies.filter(item => item._id !== value._id));
    }
  };

  const handleSubmit = () => {
    setShowDialog(false);
    setFieldValue(name, hobbies);
  };

  const existsHobbit = (value: Tag) =>
    !!hobbies.find(hobbit => hobbit._id === value._id);
  const showEdit = hobbies.length > 0;

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
        <div className='w-[640px] h-[80vh] p-2 flex flex-col text-center'>
          <h3 className='text-32 text-base font-semibold mb-2'>Sở Thích</h3>
          <p className='text-14 text-text-secondary'>
            Hãy cho mọi người biết bạn thích những gì bằng cách thêm thông tin
            vào hồ sơ.
          </p>
          {loading && (
            <div className='flex-1 flex justify-center items-center'>
              <LoadingIcon />
            </div>
          )}
          <div
            style={{
              visibility: loading ? 'hidden' : 'unset',
              opacity: loading ? 0 : 1,
            }}
            className='flex-1 flex justify-center gap-0.8 flex-wrap max-w-[552px] mx-auto my-1.2  overflow-y-auto scroll-hidden'
          >
            {hobbiesList?.map((hobbit, index) => (
              <PersonalityType
                key={index}
                tag={hobbit || ''}
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
