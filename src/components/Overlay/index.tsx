import { Fragment, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import useHotKeys from '@/hooks/useHotKeys';

interface Props {
  visible: boolean;
  children: React.ReactNode;
  onClose?: () => void;
}
const modalRoot = document.getElementById('modal') as HTMLElement;

const Overlay = ({ visible, children, onClose }: Props) => {
  const [_visible, setVisible] = useState(visible);
  const ref = useHotKeys([[['Escape'], () => setVisible(false)]]);
  const wrapper = document.createElement('div');

  useEffect(() => {
    modalRoot.appendChild(wrapper);
    return () => {
      modalRoot.removeChild(wrapper);
    };
  }, []);

  useEffect(() => {
    setVisible(visible);
  }, [visible]);

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  return _visible ? (
    ReactDOM.createPortal(
      <div
        className='fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)]'
        ref={ref}
        onClick={handleClose}
        onKeyDown={handleClose}
      >
        <div onClick={e => e.stopPropagation()}>{children}</div>
      </div>,
      wrapper,
    )
  ) : (
    <Fragment />
  );
};

export default Overlay;
