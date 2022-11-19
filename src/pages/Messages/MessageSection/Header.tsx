import CloseIcon from '@/assets/svgs/CloseIcon';

interface Props {}

const Header = ({}: Props) => {
  return (
    <div
      className='flex items-center h-control-panel-height px-[24px] py-[16px] border-0 border-b border-solid border-gray-20'
      style={{
        boxShadow: '0 0 5px 0 #0000001f',
      }}
    >
      <div
        className='shrink-0 w-5 h-5 rounded-full shadow-avatar bg-cover bg-center border-[3px] border-solid border-white'
        style={{
          backgroundImage:
            'url("https://images-ssl.gotinder.com/622f2a5ef776af0100009e70/172x216_75_bfabc6b9-5918-4429-a300-6be4416e132a.webp")',
        }}
      />
      <p className='flex-1 px-1.6 text-18 text-text-secondary cursor-default'>
        You matched with Nguyễn Đắc Thắng on 11/12/2022
      </p>
      <button className='border-[3px] border-solid border-current rounded-full p-0.3 text-gray-60 duration-200 hover:-rotate-90'>
        <CloseIcon />
      </button>
    </div>
  );
};

export default Header;
