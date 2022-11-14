import Overlay from '../Overlay';

interface Props {
  visible: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

const Modal = ({ visible, children, onClose }: Props) => {
  return (
    <Overlay visible={visible} onClose={onClose}>
      <div className='p-2 rounded-8 bg-white'>{children}</div>
    </Overlay>
  );
};

export default Modal;
