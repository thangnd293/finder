import styled from 'styled-components';
import tw from 'twin.macro';

export const PaginationWrapper = styled.div`
  ${tw`w-full px-1 flex gap-0.4 rounded-8 overflow-hidden absolute z-10`}
`;

export const Button = styled.button<{ active?: boolean }>`
  ${tw`h-0.4 w-full rounded-full py-0.8 flex items-center after:block after:w-full after:h-0.4 after:rounded-full after:bg-background-tapping `}
  ${({ active }) => active && tw`after:bg-white`}
`;
