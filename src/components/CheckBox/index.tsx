import { useField, useFormikContext } from 'formik';
import { useId } from 'react';

interface Props {
  name: string;
  title: string;
}

const CheckBox = ({ name, title }: Props) => {
  const id = useId();
  const [field, meta] = useField(name);
  const { values } = useFormikContext<any>();
  return (
    <div className='flex items-center gap-1'>
      <label htmlFor={id} className='cursor-pointer'>
        <input className='hidden peer' type='checkbox' id={id} {...field} />
        <span className='flex items-center justify-center w-2 h-2 rounded-4 border-2 border-solid border-text-secondary before:hidden before:w-0.8 before:h-1.5 before:border-b-[4px] before:border-r-[4px] before:border-solid before:border-primary before:rounded-2 before:rotate-45 peer-checked:before:block'></span>
      </label>
      <span className='text-14 font-normal cursor-default text-text-secondary'>
        {title}
      </span>
    </div>
  );
};

export default CheckBox;
