import { Fragment, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal-root');

interface Props {
  visible: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

const Overlay = ({ visible, children, onClose }: Props) => {
  const [_visible, setVisible] = useState(visible);

  useEffect(() => {
    setVisible(visible);
  }, [visible]);

  const handleClose = () => {
    setVisible(false);
    onClose && onClose();
  };

  return _visible ? (
    ReactDOM.createPortal(
      <div
        onClick={handleClose}
        className='fixed inset-0 flex items-center justify-center bg-overlay-default z-50'
      >
        <div onClick={e => e.stopPropagation()}>{children}</div>
      </div>,
      modalRoot!,
    )
  ) : (
    <Fragment />
  );
};

export default Overlay;
