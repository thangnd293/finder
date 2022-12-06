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

export type Align = 'left' | 'right';

interface IMessageProps {
  align: Align;
  message: IMessage;
  isFirst?: boolean;
  isLast?: boolean;
  isSending?: boolean;
}
const Message = ({
  message,
  align,
  isFirst,
  isLast,
  isSending,
}: IMessageProps) => {
  const { conversation } = useMessagesContext();

  return (
    <MessageContainer>
      {isLast && (
        <Avatar
          align={align}
          style={{
            backgroundImage: `url(${conversation!.user!.images?.[0]})`,
          }}
        />
      )}

      <MessageWrapper className='group' align={align} type={message.type}>
        {message.type === MessageType.Text && (
          <TextMessageStyled align={align} isFirst={isFirst}>
            {message.text}
          </TextMessageStyled>
        )}

        {message.type === MessageType.Image && (
          <ImageMessageStyled>
            <img
              className='w-full object-cover object-center'
              src={message.urlMessageImage!}
              alt=''
              onLoad={() => {
                // if (isRendered.current) return;
                // isRendered.current = true;
                const messageBox = document.getElementById('message-box');
                if (!messageBox) return;
                messageBox.scrollTop = messageBox.scrollHeight;
              }}
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
