import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';

import LeftArrowIcon from '@/assets/svgs/LeftArrowIcon';

interface IChatProps {
  to: string;
  name: string;
  avatar: string;
  lastMessage: string;
  active?: boolean;
  isMeSentLatest?: boolean;
}

const Chat = ({
  to,
  name,
  avatar,
  lastMessage,
  active,
  isMeSentLatest,
}: IChatProps) => {
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

        <div className='h-[74px] flex flex-col justify-center border-0 border-b border-gray-20 flex-1 overflow-hidden'>
          <p className='text-base text-18 font-semibold whitespace-nowrap text-ellipsis overflow-hidden'>
            {name}
          </p>
          <p className='text-text-secondary text-16 whitespace-nowrap text-ellipsis overflow-hidden'>
            {isMeSentLatest && (
              <>
                <LeftArrowIcon
                  width={12}
                  height={12}
                  className='inline-block mb-0.4'
                />{' '}
              </>
            )}
            {lastMessage}
          </p>
        </div>
      </ContactContainer>
    </Link>
  );
};

export default Chat;

const ContactContainer = styled.div<{ active?: boolean }>`
  ${tw`w-full flex items-center space-x-[24px] px-[24px] py-1.2 bg-white border-0 border-r-4 border-solid border-transparent hover:shadow-[0 0 5px 0 #0000001f] hover:border-primary`}
  ${({ active }) =>
    active && tw`border-primary bg-gray-20 shadow-[0 0 5px 0 #0000001f]`}
`;
