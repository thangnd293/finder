import { useState } from 'react';
import { Link } from 'react-router-dom';

import { ControlPanelTabs, useControlPanelContext } from '..';

import ExploreIcon from '@/assets/svgs/ExploreIcon';
import ShieldIcon from '@/assets/svgs/ShieldIcon';
import Modal from '@/components/Modal';
import Overlay from '@/components/Overlay';

interface Props {}

const MainNavBar = ({}: Props) => {
  const { currentTab, setCurrentTab } = useControlPanelContext();
  const [showModal, setShowModal] = useState(false);

  const path = ControlPanelTabs[currentTab.prev].path;

  function handleToggle() {
    setCurrentTab(prev => {
      return {
        ...prev,
        isFirstRender: false,
        tab: prev.prev,
        prev: ControlPanelTabs[prev.prev].prev,
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
            backgroundImage:
              'url("https://images-ssl.gotinder.com/63197e7abb27b00100c8d6ba/172x216_75_1d363f5f-d87d-448f-95ff-797c646111ad.webp")',
          }}
        />
        <h2 className='mx-0.8 text-white'>Dac Thang</h2>
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
