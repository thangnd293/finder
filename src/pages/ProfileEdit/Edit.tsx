import { useState } from 'react';

import { LifeStyle, fakeData, lifeStyles } from '.';

import ArrowLeftIcon from '@/assets/svgs/ArrowLeftIcon';
import Button from '@/components/Button';
import Space from '@/components/Space';
import Textarea from '@/components/Textarea';
import { UploadImageGroup } from '@/components/UploadImageGroup';

const MAX_LENGTH_INTRODUCTION = 500;

interface Props {
  lifeStylesData: Record<LifeStyle, string>;
  onLifeStyleActive: (value: LifeStyle | null) => void;
}
const Edit = ({ lifeStylesData, onLifeStyleActive }: Props) => {
  const [introduction, setIntroduction] = useState('');

  return (
    <div className='w-full h-full relative'>
      <UploadImageGroup
        className='p-0.8 gap-1'
        itemClassName='!w-[114px] !h-[156px]'
        data={fakeData.images}
        length={9}
        onChange={data => {
          console.log(data);
        }}
      />
      <p className='px-1.6 mt-2 mb-3 text-14 text-text-secondary font-light text-center'>
        Thêm video, ảnh hoặc loop để hoàn thành thêm 4% hồ sơ của bạn, cùng cơ
        hội nhận được nhiều lượt Thích hơn.
      </p>
      <div className='w-fit mx-auto'>
        <Button label='Thêm Ảnh' />
      </div>
      <Space h={30} />
      <label
        className='px-1 pb-0.8 text-14 uppercase text-text-secondary font-semibold'
        htmlFor='introduction'
      >
        Giới thiệu Dac Thang
      </label>
      <div className='relative'>
        <Textarea
          className='block w-full px-[24px] py-1.2 border-0 border-y border-solid border-gray-20 outline-none resize-none'
          id='introduction'
          maxLength={MAX_LENGTH_INTRODUCTION}
          rows={3}
          maxRows={12}
          value={introduction}
          onChange={e => setIntroduction(e.target.value)}
        />
        <span className='absolute bottom-0 right-0'>
          {MAX_LENGTH_INTRODUCTION - introduction.length}
        </span>
      </div>
      <p className='px-1.6 mt-1 mb-3 text-14 text-text-secondary font-light text-center'>
        Không nên đưa tên người dùng trên các mạng xã hội hoặc thông tin liên
        lạc khác vào hồ sơ của bạn.
      </p>
      <p className='px-1 pb-0.8 text-14 uppercase text-text-secondary font-semibold'>
        Phong cách sống
      </p>
      {lifeStyles.map(item => (
        <LifeStyleItem
          label={item.label}
          icon={item.icon}
          value={lifeStylesData[item.tab]}
          onClick={() => onLifeStyleActive(item.tab)}
        />
      ))}
    </div>
  );
};

export default Edit;

interface LifeStyleItemProps {
  label: string;
  value?: string;
  icon: string;
  onClick: () => void;
}

const LifeStyleItem = ({ label, value, icon, onClick }: LifeStyleItemProps) => {
  return (
    <div
      onClick={onClick}
      className='flex items-center justify-between px-[24px] h-[52px] border-0 border-y border-solid border-gray-20 not-last:border-b-0 bg-white group cursor-pointer'
    >
      <div className='flex items-center gap-0.5'>
        <img
          className='w-[24px] h-[24px] overflow-hidden object-cover object-center'
          src={icon}
          alt={label}
          draggable={false}
        />
        <span>{label}</span>
      </div>
      <p className='inline-flex items-center gap-0.8 text-text-secondary group-hover:text-primary'>
        <span className={`${!value ? 'opacity-50' : 'opacity-100'}`}>
          {value ? value : 'Trống'}
        </span>
        <ArrowLeftIcon
          width={12}
          className='rotate-180 text-gray-20 group-hover:text-primary'
        />
      </p>
    </div>
  );
};
