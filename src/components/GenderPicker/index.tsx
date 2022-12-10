import React from 'react';

import CheckIcon from '@/assets/svgs/CheckIcon';

export enum Gender {
  Men = 'MEN',
  Women = 'WOMEN',
  All = 'ALL',
}

interface GenderPickerProps {
  value: Gender;
  notIncludeBoth?: boolean;
  onChange: (value: Gender) => void;
}

const GenderPicker = ({
  value,
  notIncludeBoth,
  onChange,
}: GenderPickerProps) => {
  const genders = notIncludeBoth
    ? GENDERS.filter(item => item.gender !== Gender.All)
    : GENDERS;
  return (
    <>
      {genders.map(item => (
        <GenderItem
          key={item.gender}
          label={item.label}
          isChecked={item.gender === value}
          onClick={() => onChange(item.gender)}
        />
      ))}
    </>
  );
};

export default GenderPicker;

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

const GENDERS: {
  gender: Gender;
  label: string;
}[] = [
  {
    gender: Gender.Men,
    label: 'Nam',
  },
  {
    gender: Gender.Women,
    label: 'Nữ',
  },
  {
    gender: Gender.All,
    label: 'Mọi người',
  },
];
