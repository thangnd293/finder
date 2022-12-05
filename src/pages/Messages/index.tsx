import { apiCaller } from '@/service';
import { getUserFragment } from '@/service/user';
import SocketIO from '@/socket';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';

import { useAuthStore } from '../../store/auth';
import InfoSection from './InfoSection';
import MessageSection from './MessageSection';

import { Conversation } from '@/api-graphql';

// interface IMessage extends Message {
//   status: 'sending' | 'sent' | 'fail';
//   sender: string;
//   receiver: string;
// }

type IMessage = any;
const Messages = () => {
  const { accessToken } = useAuthStore();
  const [messages, setMessages] = useState<any[]>([]);
  const [conversation, setConversation] = useState<Conversation | undefined>();
  const { chatId } = useParams();

  useEffect(() => {
    const fetchChats = async () => {
      const data = await apiCaller
        .getAllMessage([
          'totalCount',
          {
            results: [
              '_id',
              'createdAt',
              'text',
              'type',
              'urlMessageImage',
              {
                receiver: ['_id'],
                sender: ['_id'],
              },
            ],
          },
        ])
        .$args({
          filter: {
            conversion_id: chatId,
          },
        })
        .$fetch();
      setMessages(
        data.results?.map(message => ({
          ...message,
          sender: message.sender._id,
          receiver: message.receiver._id,
          status: 'sent',
        })) ?? [],
      );
    };

    const fetchInfo = async () => {
      const data = await apiCaller
        .getOneConversation([
          '_id',
          'createdAt',
          {
            user: getUserFragment,
          },
        ])
        .$args({
          input: {
            _id: chatId,
          },
        })
        .$fetch();
      setConversation(data);
    };

    fetchChats();
    fetchInfo();
  }, [chatId]);

  useEffect(() => {
    if (!accessToken) return;
    SocketIO.getInstance(accessToken).on('receiverMessage', data => {
      const newMessage = { ...data, status: 'sent' } as IMessage;
      console.log('newMessage', newMessage);
      console.count('vao');
      setMessages(prev => [...prev, newMessage]);
    });
  }, [accessToken]);

  const addMessage = useCallback(
    (message: IMessage) => {
      setMessages(prev => [...prev, message]);
    },
    [setMessages],
  );

  const updateMessage = useCallback(
    (message: IMessage, uuid?: string) => {
      setMessages(prev =>
        prev.map(m => {
          if (m.uuid === uuid) {
            return { ...m, ...message };
          }
          return m;
        }),
      );
    },
    [setMessages],
  );

  const value: IMessagesContext = useMemo(
    () => ({
      conversation,
      messages,
      addMessage,
      updateMessage,
    }),
    [conversation, messages, addMessage, updateMessage],
  );

  return (
    <MessagesContext.Provider value={value}>
      <div className='flex w-full h-full border-0 border-l border-r border-solid border-gray-20'>
        <MessageSection />

        <InfoSection />
      </div>
    </MessagesContext.Provider>
  );
};

export default Messages;

interface IMessagesContext {
  conversation?: Conversation;
  messages: IMessage[];
  addMessage: (message: IMessage) => void;
  updateMessage: (message: IMessage, uuid: string) => void;
}

const initState: IMessagesContext = {
  messages: [],
  addMessage: () => {},
  updateMessage: () => {},
};

const MessagesContext = createContext(initState);

export const useMessagesContext = () => useContext(MessagesContext);
