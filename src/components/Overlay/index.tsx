import { motion } from 'framer-motion';

import useHotKeys from '@/hooks/useHotKeys';

interface Props {
  onClose: () => void;
  children: React.ReactNode;
}

const Overlay = ({ children, onClose }: Props) => {
  useHotKeys([['Escape+c', onClose]]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: 'linear', duration: 0.2 }}
      onClick={onClose}
      className='fixed inset-0 flex items-center justify-center bg-overlay-default z-50'
    >
      {children}
    </motion.div>
  );
};

export default Overlay;
