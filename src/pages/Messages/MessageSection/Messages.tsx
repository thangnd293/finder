import { useMessagesContext } from '..';
import { useUserStore } from '../../../store/user';
import {
  Avatar,
  ImageMessageStyled,
  MessageContainer,
  MessageWrapper,
  TextMessageStyled,
  Timestamp,
} from '../styles';

import SendingIcon from '@/assets/svgs/SendingIcon';
import SentIcon from '@/assets/svgs/SentIcon';

import { Message as IMessage, MessageType } from '@/api-graphql';

const Messages = () => {
  const { messages } = useMessagesContext();
  const { user } = useUserStore();

  return (
    <div className='w-full'>
      {messages.map((message, i) => {
        return (
          <Message
            key={message._id || message.uuid}
            align={message.sender !== user?._id ? 'left' : 'right'}
            message={message}
            isFirst
            isLast
            isSending={message.status === 'sending'}
            // isFirst={messages[i - 1]?.sender._id !== message.sender._id}
            // isLast={messages[i + 1]?.sender._id !== message.sender._id}
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
          <>
            <TextMessageStyled align={align} isFirst={isFirst}>
              {message.text}
            </TextMessageStyled>
            {align === 'right' &&
              (isSending ? (
                <SendingIcon className='shrink-0' />
              ) : (
                <SentIcon className='shrink-0' />
              ))}
          </>
        )}

        {message.type === MessageType.Image && (
          <ImageMessageStyled>
            <img
              className='w-full object-cover object-center'
              src={message.urlMessageImage!}
              alt=''
            />
          </ImageMessageStyled>
        )}

        <Timestamp align={align}>
          {/* {new Date(message.timestamp).toTime()} */}
          {new Date(message.createdAt).toISOString()}
        </Timestamp>
      </MessageWrapper>

      {/*         
      <MessageWrapper
        align={align}
        className='w-fit h-fit relative group flex items-center cursor-default'
      >


        {message.type === MessageEnum.Image && (
          <ImageMessageStyled align={align}>
            <img
              className='w-full'
              src={message.image}
              alt=''
              draggable={false}
            />
          </ImageMessageStyled>
        )} */}
      {/* <Timestamp align={align}>
          {new Date(message.timestamp).toTime()}
        </Timestamp> 
      </MessageWrapper> */}
    </MessageContainer>
  );
};

// const IMAGEMESSAGE: ImageMessage = {
//   id: randomInt(1, 9999999).toString(),
//   type: MessageEnum.Image,
//   image:
//     'https://images-ssl.gotinder.com/6125c6015291bd01008b6699/320x400_75_418cb65b-fca0-411f-8c6b-86dc6dbd7d6c.webp',
//   sender: USERS[randomInt(0, 1)],
//   timestamp: Date.now(),
// };

// const MESSAGES: IMessage[] = Array.from({ length: randomInt(3, 100) }).map(
//   (_, index) => ({
//     id: index.toString(),
//     type: MessageEnum.Image,
//     image:
//       'https://images-ssl.gotinder.com/6125c6015291bd01008b6699/320x400_75_418cb65b-fca0-411f-8c6b-86dc6dbd7d6c.webp',
//     sender: USERS[randomInt(0, 1)],
//     timestamp: Date.now(),
//   }),
// );
