import { apiCaller } from '@/service';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMessagesContext } from '..';

import Carousel from '@/components/Carousel';
import DialogConfirm from '@/components/DialogConfirm';
import Information from '@/components/Information/index';
import ReportDialog from '@/components/ReportDialog';

import { PATH } from '@/common/constants/route';

const InfoSection = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { conversation } = useMessagesContext();
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showDialogUnmatch, setShowDialogUnmatch] = useState(false);

  if (!conversation) return <Fragment />;

  const onUmmatch = async () => {
    setIsLoading(true);
    await apiCaller
      .unMatched()
      .$args({ user_id: conversation.user!._id })
      .$fetch();
    setIsLoading(false);
    setShowDialogUnmatch(false);
    navigate(PATH.APP.HOME);
  };

  return (
    <>
      <div className='hidden w-[324px] lg:flex flex-col'>
        <div className='flex-1 overflow-x-hidden overflow-y-scroll scroll-hidden'>
          <div className='h-2/3'>
            <Carousel isDrag={false} images={conversation.user!.images!} />
          </div>
          <div className='bg-white'>
            <Information user={conversation.user!} />
          </div>
        </div>
        <div className='h-[76.5px] border-0 border-l border-t border-solid border-gray-20 '>
          <button
            className='w-1/2 h-full text-center align-middle text-gray-40 text-14 font-semibold uppercase hover:bg-gradient-to-r from-gradient-start to-gradient-end hover:text-white'
            onClick={() => setShowDialogUnmatch(true)}
          >
            Unmatch
          </button>
          <button
            className='w-1/2 h-full text-center align-middle text-gray-40 text-14 font-semibold uppercase border-0 border-l border-solid border-gray-20 hover:bg-gradient-to-r from-gradient-start to-gradient-end hover:text-white'
            onClick={() => setShowReportDialog(true)}
          >
            Report
          </button>
        </div>
      </div>
      {showReportDialog && (
        <ReportDialog
          visible={showReportDialog}
          target={conversation.user!}
          onClose={() => setShowReportDialog(false)}
        />
      )}
      {showDialogUnmatch && (
        <DialogConfirm
          title='Bạn có chắc chắn muốn  tương hợp?'
          visible={showDialogUnmatch}
          isLoading={isLoading}
          onClose={() => setShowDialogUnmatch(false)}
          onConfirm={onUmmatch}
        />
      )}
    </>
  );
};

export default InfoSection;
