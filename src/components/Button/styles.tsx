import styled from 'styled-components';
import tw, { TwStyle } from 'twin.macro';

import { Size, Variant, Width } from '.';

const variantStyles: Record<Variant, TwStyle> = {
  solid: tw`bg-gradient-to-r from-gradient-start to-gradient-end text-white px-2.5 py-1.2 rounded-full disabled:bg-gray-15 disabled:[background-image: none] disabled:text-gray-50 disabled:cursor-default`,
  outline: tw`py-0.4 px-2 border border-solid border-gray-20 rounded-4 text-text-secondary hover:text-base active:text-base  hover:border-text-secondary active:border-text-secondary`,
  ghost: tw`bg-transparent`,
  link: tw`bg-transparent`,
};

const sizeStyles: Record<Size, TwStyle> = {
  small: tw``,
  medium: tw`text-14`,
  large: tw`text-16 font-semibold py-1.8`,
};

const widthStyles: Record<Width, TwStyle> = {
  auto: tw`w-auto`,
  full: tw`w-full`,
};

export const ButtonStyled = styled.button<{
  variant: Variant;
  size: Size;
  width?: Width;
  hasIcon?: boolean;
  disabled?: boolean;
}>`
  ${tw` `}
  ${({ variant }) => variantStyles[variant]}
    ${({ size }) => sizeStyles[size]}
    ${({ width }) => width && widthStyles[width]}
    ${({ hasIcon }) => hasIcon && tw`flex items-center gap-1`}
    ${({ disabled }) => disabled && tw`opacity-50 cursor-not-allowed`}
`;
