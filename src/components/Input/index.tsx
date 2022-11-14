import { useField } from 'formik';
import { ReactNode, useId } from 'react';
import styled from 'styled-components';
import tw, { TwStyle } from 'twin.macro';

type Width = 'auto' | 'full';

const widthStyles: Record<Width, TwStyle> = {
  auto: tw`w-auto`,
  full: tw`w-full`,
};

const InputStyled = styled.input<{ hasIcon?: boolean; width: Width }>`
  ${tw`py-1.7 px-1.6 outline-none border-2 border-solid border-gray-20 focus:border-gray-60 caret-blue-60 rounded-8 bg-gray-10 leading-tight`}
  ${({ hasIcon }) => hasIcon && tw`pl-6`}
  ${({ width }) => widthStyles[width]}
`;

interface Props {
  name: string;
  label?: string;
  placeholder: string;
  icon?: ReactNode;
  width?: Width;
}

const Input = ({ name, label, placeholder, icon, width = 'auto' }: Props) => {
  const id = useId();
  const [field, meta] = useField(name);

  const inputProps = {
    id,
    name,
    placeholder,
  };

  const hasIcon = !!icon;

  return (
    <>
      {label && (
        <label className='block mb-1 text-16 font-semibold' htmlFor={id}>
          {label}
        </label>
      )}
      <div className='relative'>
        {hasIcon && (
          <i className='absolute left-1 top-1/2 -translate-y-1/2 text-gray-20'>
            {icon}
          </i>
        )}
        <InputStyled
          hasIcon={hasIcon}
          width={width}
          {...inputProps}
          {...field}
        />
      </div>
      {meta.touched && meta.error && (
        <p className='my-0.4 text-text-error text-12'>{meta.error}</p>
      )}
    </>
  );
};

export default Input;
