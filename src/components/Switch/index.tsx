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
      className='flex items-center w-[76px] h-[36px] bg-[#25262b] rounded-full cursor-pointer relative'
    >
      <input
        className='hidden peer'
        type='checkbox'
        id={id}
        defaultChecked={checked}
        onChangeCapture={onChange}
      />
      <div className='absolute w-3 h-3 m-0.2 rounded-full bg-white duration-159 ease peer-checked:bg-primary peer-checked:translate-x-[calc(76px-100%-4px)] duration-150 ease-in' />
      <div />
    </label>
  );
};

export default Switch;
