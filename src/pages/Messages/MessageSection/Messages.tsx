import { useEffect } from 'react';

import { useMessagesContext } from '..';
import {
  Avatar,
  ImageMessageStyled,
  MessageContainer,
  MessageWrapper,
  TextMessageStyled,
  Timestamp,
} from '../styles';

import { useUserStore } from '@/store/user';

import SendingIcon from '@/assets/svgs/SendingIcon';
import SentIcon from '@/assets/svgs/SentIcon';

import { Message as IMessage, MessageType } from '@/api-graphql';

const Messages = () => {
  const { messages } = useMessagesContext();
  const { user } = useUserStore();

  useEffect(() => {
    console.log('messages', messages);

    const messageBox = document.getElementById('message-box');
    if (!messageBox) return;
    messageBox.scrollTop = messageBox.scrollHeight;
  }, [messages]);

  return (
    <div className='w-full'>
      {messages.map((message, i) => {
        return (
          <Message
            key={message._id || message.uuid}
            align={message.sender !== user?._id ? 'left' : 'right'}
            message={message}
            isSending={message.status === 'sending'}
            isFirst={i > 0 && messages[i - 1]?.sender !== message.sender}
            isLast={
              i < messages.length && messages[i + 1]?.sender !== message.sender
            }
          />
        );
      })}
    </div>
  );
};

export default Messages;

type Align = 'left' | 'right';
interface IMessageProps {
  align: Align;
  message: IMessage;
  isFirst?: boolean;
  isLast?: boolean;
}

const MessageContainer = styled.div`
  ${tw`flex items-center justify-start relative w-full mt-1`}
`;

enum MessageEnum {
  Text = 'text',
  Image = 'image',
  Video = 'video',
}

const messageWith: Record<MessageEnum, TwStyle> = {
  [MessageEnum.Text]: tw`max-w-[65%]`,
  [MessageEnum.Image]: tw`max-w-[45%]`,
  [MessageEnum.Video]: tw`max-w-[65%]`,
};
const MessageWrapper = styled.div<{ align: Align; type: MessageEnum }>`
  ${tw`w-fit bg-transparent relative cursor-default`}
  ${({ align }) => (align === 'left' ? tw`ml-6` : tw`ml-auto`)}
  ${({ type }) => messageWith[type]}
`;

const Avatar = styled.div<{ align: Align }>`
  ${tw`inline-block w-5 h-5 rounded-full bg-center bg-cover absolute bottom-0`}
  ${({ align }) => (align === 'left' ? tw`left-0` : tw`hidden`)}
`;

const TextMessageStyled = styled.p<{ align: Align; isFirst?: boolean }>`
  ${tw`w-full overflow-hidden px-1 py-1.2 text-16 font-light bg-gray-15 break-words`}

  ${({ align }) =>
    align === 'left'
      ? tw`rounded-l-2 rounded-r-test`
      : tw`rounded-r-2 rounded-l-test`}
      
  ${({ align, isFirst }) =>
    isFirst && (align === 'left' ? tw`rounded-tl-test` : tw`rounded-tr-test`)}
`;

const ImageMessageStyled = styled.div`
  ${tw`w-fit rounded-4 overflow-hidden`}
`;

const Timestamp = styled.time<{ align: Align }>`
  ${tw`hidden absolute group-hover:block w-max text-12 text-text-secondary top-1/2 -translate-y-1/2`}
  ${({ align }) =>
    align === 'left'
      ? tw`left-[calc(100% + 10px)]`
      : tw`right-[calc(100% + 10px)]`}
`;

const Message = ({ message, align, isFirst, isLast }: IMessageProps) => {
  return (
    <MessageContainer>
      {isLast && (
        <Avatar
          align={align}
          style={{
            backgroundImage: `url(${message.sender.avatar})`,
          }}
        />
      )}

      <MessageWrapper className='group' align={align} type={message.type}>
        {message.type === MessageType.Text && (
          <TextMessageStyled align={align} isFirst={isFirst}>
            {message.text}
          </TextMessageStyled>
        )}

        {message.type === MessageEnum.Image && (
          <ImageMessageStyled>
            <img
              className='w-full object-cover object-center'
              src={message.image}
              alt=''
            />
          </ImageMessageStyled>
        )}

        {align === 'right' &&
          (isSending ? (
            <SendingIcon className='shrink-0' />
          ) : (
            <SentIcon className='shrink-0' />
          ))}

        <Timestamp align={align}>
          {new Date(message.createdAt).toTime()}
        </Timestamp>
      </MessageWrapper>
    </MessageContainer>
  );
};
