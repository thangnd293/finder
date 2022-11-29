import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { controlPanels, useControlPanelContext } from '..';

import { useUserStore } from '@/store/user';

import ExploreIcon from '@/assets/svgs/ExploreIcon';
import FlagIcon from '@/assets/svgs/FlagIcon';
import ShieldIcon from '@/assets/svgs/ShieldIcon';
import Modal from '@/components/Modal';
import ReportDialog from '@/components/ReportDialog';

interface Props {}

const MainNavBar = ({}: Props) => {
  const { currentPanel, setCurrentPanel } = useControlPanelContext();
  const [showSecurityDialog, setShowSecurityDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
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
          onClick={() => setShowSecurityDialog(!showSecurityDialog)}
          className='flex items-center justify-center w-4 h-4 ml-0.8 mr-0.4 rounded-full bg-overlay-default text-white hover:bg-background-icon-button-overlay hover:text-primary'
        >
          <ShieldIcon width={22} height={22} />
        </button>
      </div>
      <Modal
        className='p-0 w-40'
        visible={showSecurityDialog}
        onClose={() => setShowSecurityDialog(false)}
      >
        <h1 className='text-24 py-1.8 text-center font-semibold'>
          Bộ Công Cụ An Toàn
        </h1>
        <button
          className='flex w-full items-center justify-start gap-1.4 px-2 border-0 border-y border-solid border-gray-20'
          onClick={() => {
            setShowReportDialog(true);
            setShowSecurityDialog(false);
          }}
        >
          <FlagIcon className='text-primary' />
          <span className='flex items-center justify-start flex-1 h-[54px] uppercase font-semibold'>
            Báo cáo
          </span>
        </button>
        <button
          className='w-full h-[54px] text-center uppercase font-semibold'
          onClick={() => setShowSecurityDialog(false)}
        >
          Hủy
        </button>
      </Modal>
      {showReportDialog && (
        <ReportDialog
          visible={showReportDialog}
          onClose={() => setShowReportDialog(false)}
        />
      )}
    </>
  );
};

export default MainNavBar;
