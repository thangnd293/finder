import Overlay from '../Overlay';

interface Props {
  visible: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  isOutside?: boolean;
}

const Modal = ({ visible, children, onClose, isOutside }: Props) => {
  return (
    <Overlay visible={visible} onClose={onClose} isOutside={isOutside}>
      <div className='p-2 rounded-4 bg-white'>{children}</div>
    </Overlay>
  );
};

export default Modal;
