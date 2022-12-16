import { useControlPanelContext } from '@/layouts/ControlPanel';
import { useParams } from 'react-router-dom';

import Chat from './Chat';

import { useUserStore } from '@/store/user';

import { PATH } from '@/common/constants/route';

import { MessageType } from '@/api-graphql';

const Messages = () => {
  const { usersMessage } = useControlPanelContext();
  const user = useUserStore(s => s.user);
  const { chatId } = useParams();

  return (
    <>
      {usersMessage.map(userMessage => {
        return (
          <Chat
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
            isMeSentLatest={userMessage.lastMessage?.sender === user?._id}
          />
        );
      })}
    </>
  );
};

export default Messages;
