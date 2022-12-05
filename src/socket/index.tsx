import { Socket, io } from 'socket.io-client';

import { ENDPOINT } from '@/common/constants/endpoint';

import { ConversationResult, Message } from '@/api-graphql';

interface ServerToClientEvents {
  listUserMatched_tabMatched: (data: ConversationResult) => void;
  listUserMatched_tabMessage: (data: ConversationResult) => void;
  receiverMessage: (data: Message) => void;
  isSendMessageSuccess: (data: { uuid: string; message: Message }) => void;
}

interface ClientToServerEvents {
  verifyFirstConnection: () => void;
  getAllUserMatched_tabMessage: () => void;
  getAllUserMatched_tabMatched: () => void;
  sendMessage: (data: any) => void;
}

class SocketIO {
  private static instance: Socket<ServerToClientEvents, ClientToServerEvents>;
  private constructor(token: string) {
    SocketIO.instance = io(ENDPOINT, {
      query: {
        token: token,
      },
    });

    SocketIO.instance.on('connect', () => {
      console.log(`${SocketIO.instance.id} connected`);
      SocketIO.instance.emit('verifyFirstConnection');
      SocketIO.instance.emit('getAllUserMatched_tabMessage');
      SocketIO.instance.emit('getAllUserMatched_tabMatched');
    });

    SocketIO.instance.on('disconnect', () => {
      console.log(SocketIO.instance);
      console.log('User disconnect');
    });
  }

  public static getInstance(token: string) {
    if (!SocketIO.instance) {
      new SocketIO(token);
    }
    return SocketIO.instance;
  }
}

export default SocketIO;
