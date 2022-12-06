import CheckIcon from '@/assets/svgs/CheckIcon';

export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE',
  Both = 'BOTH',
}

interface GenderPickerProps {
  value: Gender;
  onChange: (value: Gender) => void;
}

const GenderPicker = ({ value, onChange }: GenderPickerProps) => {
  return (
    <>
      {GENDERS.map(item => (
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
