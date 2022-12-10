import { apiCaller } from '@/service';
import { getUsersMessageFragment } from '@/service/user';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import Card from './Card';
import Chat from './Chat';

import { useUserStore } from '@/store/user';

import useMediaQuery from '@/hooks/useMediaQuery';

import { RESPONSIVE } from '@/common/constants/responsive';
import { PATH } from '@/common/constants/route';

import { Conversation, MessageType } from '@/api-graphql';

const Matches = () => {
  const { user } = useUserStore();
  const [usersMatched, setUsersMatched] = useState<Conversation[]>([]);
  const newMatched = usersMatched.filter(match => !match.lastMessage);
  const chatMatched = usersMatched.filter(match => match.lastMessage);
  const isMobile = useMediaQuery({
    mediaQuery: `(max-width: ${RESPONSIVE.md}px)`,
  });

  useEffect(() => {
    const fetchUsersMatched = async () => {
      const data = await apiCaller
        .getAllUserMatched(getUsersMessageFragment)
        .$args({})
        .$fetch();

      setUsersMatched(data.results!);
    };

    fetchUsersMatched();
  }, []);

  if (!isMobile) {
    return <Navigate to={PATH.APP.HOME} />;
  }

  return (
    <div>
      <h2 className='px-0.8 py-1.2 font-semibold'>Tương hợp mới</h2>
      <div className='flex flex-nowrap gap-1 w-full py-0.4 px-0.8 overflow-auto scroll-hidden'>
        {newMatched.map(conversation => {
          return (
            <Card
              key={conversation._id}
              to={`${PATH.APP.MESSAGES.CHAT.replace(
                ':chatId',
                conversation._id,
              )}`}
              user={conversation.user!}
            />
          );
        })}
      </div>
      <h2 className='px-0.8 py-1.2 font-semibold'>Tin nhắn</h2>
      <div>
        {chatMatched.map(userMessage => {
          return (
            <Chat
              key={userMessage._id}
              to={`${PATH.APP.MESSAGES.CHAT.replace(
                ':chatId',
                userMessage._id,
              )}`}
              name={userMessage.user!.username!}
              active={false}
              avatar={userMessage.user!.images![0]!}
              lastMessage={
                userMessage.lastMessage?.type === MessageType.Text
                  ? userMessage.lastMessage!.text!
                  : 'Hình ảnh'
              }
              isMeSentLatest={userMessage.lastMessage?.sender === user?._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Matches;
