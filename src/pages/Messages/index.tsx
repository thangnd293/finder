import InfoSection from './InfoSection';
import MessageSection from './MessageSection';

interface Props {}

const Messages = ({}: Props) => {
  return (
    <div className='flex w-full h-full border-0 border-l border-r border-solid border-gray-20'>
      <MessageSection />

      <InfoSection />
    </div>
  );
};

export default Messages;
