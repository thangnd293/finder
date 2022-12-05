import { MessageType } from '@/api-graphql';
import { useControlPanelContext } from '@/layouts/ControlPanel';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';

interface Props {}

const Messages = () => {
  const { usersMessage } = useControlPanelContext();
  const { chatId } = useParams();

  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => (
        <Contact
          key={userMessage._id}
          to={`${PATH.APP.MESSAGES.CHAT.replace(':chatId', userMessage._id)}`}
          name={userMessage.user!.username!}
          active={chatId === userMessage._id}
          avatar={userMessage.user!.images![0]!}
          lastMessage={
            userMessage.lastMessage?.type === MessageType.Text
              ? userMessage.lastMessage!.text!
              : 'Hình ảnh'
          }
          lastMessage={'Hello world!'}
        />
      ))}
    </>
  );
};

export default Messages;

const ContactContainer = styled.div<{ active?: boolean }>`
  ${tw`w-full flex items-center space-x-[24px] px-[24px] py-1.2 bg-gray-20 border-0 border-r-4 border-solid border-transparent hover:shadow-[0 0 5px 0 #0000001f] hover:border-primary`}
  ${({ active }) =>
    active && tw`border-primary bg-white shadow-[0 0 5px 0 #0000001f]`}
`;

interface ContactProps {
  to: string;
  name: string;
  avatar: string;
  lastMessage: string;
  active?: boolean;
}

const Contact = ({ to, name, avatar, lastMessage, active }: ContactProps) => {
  return (
    <Link to={to}>
      <ContactContainer active={active}>
        <div className='w-[74px] h-[74px] shrink-0 rounded-full overflow-hidden'>
          <img
            className='w-full h-full object-cover object-center'
            src={avatar}
            alt={name}
            draggable={false}
          />
        </div>
        <div className='flex-1 overflow-hidden'>
          <p className='text-base text-18 font-semibold whitespace-nowrap text-ellipsis overflow-hidden'>
            {name}
          </p>
          <p className='text-text-secondary text-16 whitespace-nowrap text-ellipsis overflow-hidden'>
            {lastMessage}
          </p>
        </div>
      </ContactContainer>
    </Link>
  );
};
