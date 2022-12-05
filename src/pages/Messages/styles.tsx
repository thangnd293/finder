import styled from 'styled-components';
import tw, { TwStyle } from 'twin.macro';

import { Align } from './MessageSection/Messages';

import { MessageType } from '@/api-graphql';

const messageWith: Record<MessageType, TwStyle> = {
  [MessageType.Text]: tw`max-w-[65%]`,
  [MessageType.Image]: tw`max-w-[45%]`,
};

export const MessageContainer = styled.div`
  ${tw`flex items-center justify-start relative w-full mt-1`}
`;

export const MessageWrapper = styled.div<{ align: Align; type: MessageType }>`
  ${tw`flex gap-0.5 items-end w-fit bg-transparent relative cursor-default`}
  ${({ align }) => (align === 'left' ? tw`ml-6` : tw`ml-auto`)}
  ${({ type }) => messageWith[type]}
`;

export const Avatar = styled.div<{ align: Align }>`
  ${tw`inline-block w-5 h-5 rounded-full bg-center bg-cover absolute bottom-0`}
  ${({ align }) => (align === 'left' ? tw`left-0` : tw`hidden`)}
`;

export const TextMessageStyled = styled.p<{ align: Align; isFirst?: boolean }>`
  ${tw`w-full overflow-hidden px-1 py-1.2 text-16 font-light bg-gray-15 break-words whitespace-pre-wrap`}

  ${({ align }) =>
    align === 'left'
      ? tw`rounded-l-2 rounded-r-16`
      : tw`rounded-r-2 rounded-l-16`}
      
  ${({ align, isFirst }) =>
    isFirst && (align === 'left' ? tw`rounded-tl-16` : tw`rounded-tr-16`)}
`;

export const ImageMessageStyled = styled.div`
  ${tw`w-fit rounded-4 overflow-hidden`}
`;

export const Timestamp = styled.time<{ align: Align }>`
  ${tw`hidden absolute group-hover:block w-max text-12 text-text-secondary top-1/2 -translate-y-1/2`}
  ${({ align }) =>
    align === 'left'
      ? tw`left-[calc(100% + 10px)]`
      : tw`right-[calc(100% + 10px)]`}
`;
