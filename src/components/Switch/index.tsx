import { ChangeEvent } from 'react';
import { useId } from 'react';

interface Props {
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Switch = ({ checked, onChange }: Props) => {
  const id = useId();

  return (
    <label
      htmlFor={id}
      className={`flex items-center w-[48px] h-[28px] rounded-full cursor-pointer relative ${
        checked ? 'bg-primary' : 'bg-gray-50'
      }`}
    >
      <input
        className='hidden'
        type='checkbox'
        id={id}
        defaultChecked={checked}
        onChangeCapture={onChange}
      />
      <div
        className={`absolute w-[28px] h-[28px] rounded-full border border-solid bg-white duration-159 ease duration-150 ease-in ${
          checked
            ? 'border-primary translate-x-[calc(48px-100%)]'
            : 'border-gray-50'
        }`}
      />
      <div />
    </label>
  );
};

export default Switch;
