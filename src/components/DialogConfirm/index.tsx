import Button from '../Button';
import Modal from '../Modal';

interface IDialogConfirmProps {
  title: string;
  visible: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
const DialogConfirm = ({
  title,
  visible,
  isLoading,
  onClose,
  onConfirm,
}: IDialogConfirmProps) => {
  return (
    <Modal visible={visible} onClose={onClose}>
      <h3 className='text-center text-20 text-primary'>{title}</h3>
      <div className='mt-3 flex items-center justify-evenly'>
        <Button
          className='!px-2 !py-1 text-18'
          variant='outline'
          label={'Thoát'}
          onClick={onClose}
        />
        <Button
          className='!px-2 !py-1 text-18 !rounded-4'
          loading={isLoading}
          label={'Chấp nhận'}
          onClick={onConfirm}
        />
      </div>
    </Modal>
  );
};

export default DialogConfirm;
