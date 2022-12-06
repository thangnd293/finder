import Overlay from '../Overlay';

interface Props {
  visible: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  isOutside?: boolean;
  className?: string;
}

const Modal = ({ visible, className, children, onClose, isOutside }: Props) => {
  return (
    <Overlay visible={visible} onClose={onClose} isOutside={isOutside}>
      <div className={`p-2 rounded-4 bg-white ${className ? className : ''}`}>
        {children}
      </div>
    </Overlay>
  );
};

export default Modal;
