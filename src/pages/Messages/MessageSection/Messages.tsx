import styled from 'styled-components';
import tw, { TwStyle } from 'twin.macro';

import randomInt from '@/common/functions/number';

interface Props {}

const Messages = ({}: Props) => {
  return (
    <div className='w-full'>
      {MESSAGES.map((message, i) => (
        <Message
          key={message.id}
          align={message.sender.id !== '1' ? 'left' : 'right'}
          message={message}
          isFirst={MESSAGES[i - 1]?.sender.id !== message.sender.id}
          isLast={MESSAGES[i + 1]?.sender.id !== message.sender.id}
        />
      ))}
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
      ? tw`rounded-l-2 rounded-r-16`
      : tw`rounded-r-2 rounded-l-16`}
      
  ${({ align, isFirst }) =>
    isFirst && (align === 'left' ? tw`rounded-tl-16` : tw`rounded-tr-16`)}
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
        {message.type === MessageEnum.Text && (
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

        <Timestamp align={align}>
          {new Date(message.timestamp).toTime()}
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

type TextMessage = {
  type: MessageEnum.Text;
  text: string;
};

type ImageMessage = {
  type: MessageEnum.Image;
  image: string;
};

type GifMessage = {
  type: MessageEnum.Video;
  gif: string;
};

type IMessage = {
  id: string;
  timestamp: number;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
} & (TextMessage | ImageMessage | GifMessage);

const USERS = [
  {
    id: '1',
    name: 'Nguyen Dac Thang',
    avatar:
      'https://images-ssl.gotinder.com/622f2a5ef776af0100009e70/172x216_75_bfabc6b9-5918-4429-a300-6be4416e132a.webp',
  },
  {
    id: '2',
    name: 'DarkThang',
    avatar:
      'https://images-ssl.gotinder.com/6125c6015291bd01008b6699/320x400_75_418cb65b-fca0-411f-8c6b-86dc6dbd7d6c.webp',
  },
];

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

const MESSAGES: IMessage[] = Array.from({ length: randomInt(3, 100) }).map(
  (_, index) => ({
    id: index.toString(),
    type: MessageEnum.Text,
    text: 'Hello world!',
    sender: USERS[randomInt(0, 1)],
    timestamp: Date.now(),
  }),
);
