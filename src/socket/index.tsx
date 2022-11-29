import { Socket, io } from 'socket.io-client';

interface ServerToClientEvents {
  //   noArg: () => void;
  //   basicEmit: (a: number, b: string, c: Buffer) => void;
  //   withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  //   hello: () => void;
}

class SocketIO {
  private static instance: Socket<ServerToClientEvents, ClientToServerEvents>;
  private constructor(token: string) {
    SocketIO.instance = io('https://baashop.herokuapp.com/graphql', {
      auth: {
        token: token,
      },
    });

    SocketIO.instance.on('connect', () => {
      console.log(`${SocketIO.instance.id} connected`);
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
