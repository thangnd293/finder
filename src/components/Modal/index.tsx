import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import Overlay from '../Overlay';

const modalRoot = document.getElementById('modal-root') as HTMLElement;

interface Props {
  visible: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

const Modal = ({ visible, children, onClose }: Props) => {
  const [_visible, setVisible] = useState(visible);

  useEffect(() => {
    setVisible(visible);
  }, [visible]);

  const handleClose = () => {
    setVisible(false);
    onClose && onClose();
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      {_visible && (
        <Overlay onClose={handleClose}>
          <div
            className='p-2 rounded-8 bg-white'
            onClick={e => e.stopPropagation()}
          >
            {children}
          </div>
        </Overlay>
      )}
    </AnimatePresence>,
    modalRoot,
  );
};

export default Modal;
