import { useState } from 'react';
import { Link } from 'react-router-dom';

import { controlPanels, useControlPanelContext } from '..';

import { useUserStore } from '@/store/user';

import ExploreIcon from '@/assets/svgs/ExploreIcon';
import ShieldIcon from '@/assets/svgs/ShieldIcon';
import Modal from '@/components/Modal';

interface Props {}

const MainNavBar = ({}: Props) => {
  const { currentPanel, setCurrentPanel } = useControlPanelContext();
  const [showModal, setShowModal] = useState(false);
  const { user } = useUserStore();
  const path = controlPanels[currentPanel.prev].path;

  function handleToggle() {
    setCurrentPanel(prev => {
      return {
        ...prev,
        isFirstRender: false,
        tab: prev.prev,
        prev: controlPanels[prev.prev].prev,
      };
    });
  }

  return (
    <>
      <Link
        to={path}
        onClick={handleToggle}
        className='flex items-center p-0.4 mx-0.8 rounded-full hover:bg-background-icon-button-overlay'
      >
        <div
          className='w-3.6 h-3.6 rounded-full bg-cover bg-center'
          style={{
            backgroundImage: `url(${user?.images![0]})`,
          }}
        />
        <h2 className='mx-0.8 text-white'>{user?.username}</h2>
      </Link>
      <div className='flex items-center justify-between mx-1.2'>
        <button className='flex items-center justify-center w-4 h-4 mx-0.8 rounded-full bg-overlay-default text-white hover:bg-background-icon-button-overlay hover:text-primary'>
          <ExploreIcon />
        </button>
        <button
          onClick={() => setShowModal(!showModal)}
          className='flex items-center justify-center w-4 h-4 ml-0.8 mr-0.4 rounded-full bg-overlay-default text-white hover:bg-background-icon-button-overlay hover:text-primary'
        >
          <ShieldIcon />
        </button>
      </div>
      <Modal visible={showModal} onClose={() => setShowModal(false)}>
        <div className='w-10 h-10 bg-base text-white'>Hello world</div>
      </Modal>
    </>
  );
};

export default MainNavBar;
