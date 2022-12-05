import IconProps from '@/typings/icon';

const DownArrowIcon = (props: IconProps) => (
  <svg fill='none' height={18} viewBox='7 7 22 22' width={18} {...props}>
    <path
      d='M24.616 18.366a1.25 1.25 0 0 1 1.768 1.768l-7.5 7.5a1.25 1.25 0 0 1-1.768 0l-7.5-7.5a1.25 1.25 0 0 1 1.768-1.768l4.94 4.94a.25.25 0 0 0 .426-.177V9.25a1.25 1.25 0 1 1 2.5 0v13.879c0 .222.27.334.427.176l4.94-4.939z'
      fill='currentColor'
    />
  </svg>
);

export default DownArrowIcon;
