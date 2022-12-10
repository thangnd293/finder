import { useControlPanelContext } from '@/layouts/ControlPanel';
import { Player } from '@lottiefiles/react-lottie-player';

import Card from './Card';

import emptyAnimate from '@/assets/lotties/empty.json';

import { PATH } from '@/common/constants/route';

const Matches = () => {
  const { usersMatched } = useControlPanelContext();
  return usersMatched.length > 0 ? (
    <div className='w-full grid grid-cols-2 lg:grid-cols-3 px-0.8 py-0.4'>
      {usersMatched.map(conversation => (
        <Card
          key={conversation._id}
          to={`${PATH.APP.MESSAGES.CHAT.replace(':chatId', conversation._id)}`}
          user={conversation.user!}
        />
      ))}
    </div>
  ) : (
    <div className='w-full h-2/3 flex flex-col items-center justify-center'>
      <Player
        src={emptyAnimate}
        loop
        autoplay
        direction={-1}
        style={{
          background: 'transparent',
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          objectPosition: 'center',
        }}
      />
      <p className='text-18'>Tích cực quẹt phải, vận may sẽ tới</p>
    </div>
  );
};

export default Matches;
