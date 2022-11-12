import styled from 'styled-components';
import tw, { TwStyle } from 'twin.macro';

export const CardControllerWrapper = styled.div`
  ${tw`flex flex-col select-none justify-start w-full h-full relative`}
`;

export const ActionWrapper = styled.div<{ solid?: boolean }>`
  ${tw`px-0.8 py-1.6 flex items-center justify-around absolute z-10 bottom-0 w-full rounded-b-8`}
  ${({ solid }) =>
    solid &&
    tw`[background-image: linear-gradient(rgba(255, 255, 255, 0) -5%, rgb(255, 255, 255) 20%)]`}
`;

type Variant = 'outline' | 'solid';

type Size = 'small' | 'large';

const sizeStyles: Record<Size, TwStyle> = {
  small: tw`w-[58px] h-[58px] rounded-full`,
  large: tw`w-[75px] h-[75px] rounded-full`,
};

const variantStyles: Record<Variant, TwStyle> = {
  outline: tw`border border-solid border-current`,
  solid: tw`border-white bg-white shadow-md`,
};

const ButtonBase = styled.button<{ size?: Size; variant?: Variant }>`
  ${tw`w-6 h-6 flex items-center justify-center rounded-full`}

  ${tw`[&_svg]:duration-300`}
  &:hover {
    ${tw`[&_svg]:scale-[1.2]`}
  }

  ${({ size = 'small' }) => sizeStyles[size]};
  ${({ variant = 'outline' }) => variantStyles[variant]};
`;

export const ButtonLike = styled(ButtonBase)`
  ${tw`text-like`}
`;
export const ButtonNope = styled(ButtonBase)`
  ${tw`text-primary`}
`;
export const ButtonRewind = styled(ButtonBase)<{ active?: boolean }>`
  ${tw`text-gray-30`}
  ${({ active }) => active && tw`text-rewind border-current`}
`;
