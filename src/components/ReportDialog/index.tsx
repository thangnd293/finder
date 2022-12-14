import { apiCaller } from '@/service/index';
import { useState } from 'react';

import Button from '../Button';
import Modal from '../Modal';
import Alert from './steps/Alert';
import Confirm from './steps/Confirm/index';
import Detail from './steps/Detail';
import PickUser from './steps/PickUser';
import Reason from './steps/Reason';

import ArrowLeftIcon from '@/assets/svgs/ArrowLeftIcon';

import { User } from '@/api-graphql';

enum EStep {
  PickUser = 0,
  Alert = 1,
  Reason = 2,
  Detail = 3,
  Confirm = 4,
}

const Steps: Record<EStep, (props: any) => JSX.Element> = {
  [EStep.PickUser]: PickUser,
  [EStep.Alert]: Alert,
  [EStep.Reason]: Reason,
  [EStep.Detail]: Detail,
  [EStep.Confirm]: Confirm,
};

interface Props {
  target?: User;
  visible: boolean;
  onClose: () => void;
  onReportDone?: () => void;
}

const ReportDialog = ({ target, visible, onClose, onReportDone }: Props) => {
  const [_target, setTarget] = useState<User | undefined>(target);
  const [reason, setReason] = useState('');
  const [detail, setDetail] = useState('');
  const [isDisabledBtn, setIsDisabledBtn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const startStep = _target ? EStep.Reason : EStep.PickUser;
  const [currentStep, setCurrentStep] = useState(startStep);

  const Step = Steps[currentStep];
  const isFirstStep = currentStep === startStep;

  const onChooseUser = (user: User) => {
    setTarget(user);
    setIsDisabledBtn(false);
  };

  const onChooseReason = (reason: string) => {
    setReason(reason);
    setIsDisabledBtn(false);
  };

  const onChangeDetail = (detail: string) => {
    if (detail.length > 5) setIsDisabledBtn(false);
    else setIsDisabledBtn(true);

    setDetail(detail);
  };

  const onReport = async () => {
    if (!_target || !reason || !detail) return;
    setIsLoading(true);
    await apiCaller
      .reportUser()
      .$args({
        userReport: _target._id,
        reasonReport: reason,
        reportDetail: detail,
      })
      .$fetch();
    setIsLoading(false);
    onClose();
    onReportDone?.();
  };

  const onNext = () => {
    switch (currentStep) {
      case EStep.PickUser:
        if (!_target) return;
        setCurrentStep(EStep.Alert);
        break;
      case EStep.Alert:
        setCurrentStep(EStep.Reason);
        setIsDisabledBtn(true);
        break;
      case EStep.Reason:
        if (!reason) return;
        setCurrentStep(EStep.Detail);
        setIsDisabledBtn(true);
        break;
      case EStep.Detail:
        setCurrentStep(EStep.Confirm);
        break;
      case EStep.Confirm:
        onReport();
    }
  };

  const onPrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const props: Record<EStep, any> = {
    [EStep.PickUser]: {
      target: _target,
      onChoose: onChooseUser,
    },
    [EStep.Alert]: {
      target: _target,
    },
    [EStep.Reason]: {
      reason,
      onChoose: onChooseReason,
    },
    [EStep.Detail]: {
      detail,
      onChange: onChangeDetail,
    },
    [EStep.Confirm]: {
      target: _target,
      reason,
      detail,
      onChangeDetail,
    },
  };

  return (
    <Modal className='p-0 overflow-hidden' visible={visible} onClose={onClose}>
      <div className='w-40 max-h-[96vh] flex flex-col'>
        <ProgressBar
          value={currentStep + 1 - startStep}
          max={Object.keys(EStep).length / 2 - startStep}
        />
        <div
          className={`w-full flex border-0 border-b border-solid border-gray-20 ${
            isFirstStep ? 'justify-end' : 'justify-between'
          }`}
        >
          {!isFirstStep && (
            <button
              onClick={onPrev}
              className='w-[48px] h-[48px] flex items-center justify-center'
            >
              <ArrowLeftIcon width={16} height={16} />
            </button>
          )}
          <button className='p-1.6 text-14 text-primary-a11y' onClick={onClose}>
            Hủy
          </button>
        </div>

        <div className='w-full flex-1 overflow-y-auto scroll-hidden'>
          <Step {...props[currentStep]} />
        </div>
        <div>
          {currentStep === EStep.Reason && (
            <p className='py-1 text-14 text-center'>
              Chúng tôi sẽ không cho {_target?.username} biết rằng bạn đã báo
              cáo họ
            </p>
          )}
          <div className='w-full px-1.6 py-3'>
            <Button
              loading={isLoading}
              className='uppercase'
              disabled={isDisabledBtn}
              width={'full'}
              label={'Tiếp tục'}
              onClick={onNext}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ReportDialog;

interface IProgressBarProps {
  value: number;
  max: number;
}

const ProgressBar = ({ value, max }: IProgressBarProps) => {
  const percent = (value / max) * 100;
  return (
    <div className='w-full h-1 bg-gray-10'>
      <div
        className='h-full bg-gradient-to-r from-gradient-start to-gradient-end'
        style={{
          width: `${percent}%`,
        }}
      ></div>
    </div>
  );
};
