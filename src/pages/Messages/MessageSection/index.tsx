import Header from './Header';
import InputChat from './InputChat';
import Messages from './Messages';

interface Props {}

const MessageSection = ({}: Props) => {
  return (
    <div className='flex-1 flex flex-col overflow-x-hidden'>
      <Header />
      <div className='flex-1 w-full px-2 py-1 overflow-y-auto'>
        {/* <div className='w-full h-full flex flex-col items-center justify-center'>
          <p>You Matched with Nguyen Dac Thang</p>
          <p>6 hours ago</p>
          <div
            className='w-21 h-21 rounded-full bg-center bg-cover'
            style={{
              backgroundImage:
                'url("https://images-ssl.gotinder.com/622f2a5ef776af0100009e70/172x216_75_bfabc6b9-5918-4429-a300-6be4416e132a.webp")',
            }}
          ></div>
        </div> */}
        <Messages />
      </div>
      <InputChat />
    </div>
  );
};

export default MessageSection;
