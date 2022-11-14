import { useField, useFormikContext } from 'formik';
import { useId } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

const LabelStyled = styled.label<{ active?: boolean }>`
  ${tw`inline-block w-fit rounded-8 py-1.5 px-[24px] border-2 border-solid border-gray-20 text-base font-semibold cursor-pointer`}
  ${({ active }) => active && tw`border-primary text-primary`}
`;

interface Option {
  id: string;
  label: string;
}

interface Props {
  name: string;
  label: string;
  options: Option[];
}

const RadioGroup = ({ name, label, options }: Props) => {
  const id = useId();
  const [field, meta, helpers] = useField(name);
  const { setFieldValue, values } = useFormikContext<any>();

  return (
    <>
      <label className='block mb-1 text-16 font-semibold' htmlFor={id}>
        {label}
      </label>
      <div className='space-x-1'>
        {options.map(option => {
          const isActive = values[name] === option.id;
          return (
            <LabelStyled
              active={isActive}
              htmlFor={`${name}-${option.id}`}
              key={option.id}
            >
              <input
                className='hidden'
                id={`${name}-${option.id}`}
                type='radio'
                value={option.id}
                defaultChecked={isActive}
                onClick={() => {
                  helpers.setTouched(true);
                  setFieldValue(name, option.id);
                }}
              />
              <span className='leading-tight'>{option.label}</span>
            </LabelStyled>
          );
        })}
      </div>
      {meta.touched && meta.error && (
        <p className='my-0.4 text-text-error text-12'>{meta.error}</p>
      )}
    </>
  );
};

export default RadioGroup;
