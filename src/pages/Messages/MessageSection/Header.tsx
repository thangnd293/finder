import { Fragment } from 'react';

import { useMessagesContext } from '..';
import { useNavigate } from '../../../hooks/useNavigate';

import CloseIcon from '@/assets/svgs/CloseIcon';

import { PATH } from '@/common/constants/route';

const Header = () => {
  const navigate = useNavigate();

  const { conversation } = useMessagesContext();
  if (!conversation) return <Fragment />;
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
          backgroundImage: `url("${conversation.user!.images![0]}")`,
        }}
      />
      <p className='flex-1 px-1.6 text-18 text-text-secondary cursor-default'>
        You matched with {conversation.user?.username} on{' '}
        {new Date(conversation.createdAt).toLocaleDateString()}
      </p>
      <button
        className='border-[3px] border-solid border-current rounded-full p-0.3 text-gray-60 duration-200 hover:-rotate-90'
        onClick={() => navigate(PATH.APP.HOME)}
      >
        <CloseIcon />
      </button>
    </div>
  );
};

export default Header;
