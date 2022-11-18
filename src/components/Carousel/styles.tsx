import styled from 'styled-components';
import tw from 'twin.macro';

const ButtonBase = styled.button`
  ${tw`absolute w-1/2 h-full mx-1  text-white invisible opacity-0 group-hover:visible group-hover:opacity-100`}
`;

export const ButtonNext = styled(ButtonBase)`
  ${tw`right-0 rotate-180`}
`;

export const ButtonPrev = styled(ButtonBase)`
  ${tw`left-0`}
`;
