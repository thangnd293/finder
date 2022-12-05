import IconProps from '@/typings/icon';

const SentIcon = (props: IconProps) => (
  <svg
    height={12}
    viewBox='2 2 20 20'
    width={12}
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path d='M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18.5a8.5 8.5 0 1 1 8.5-8.5 8.51 8.51 0 0 1-8.5 8.5z' />
    <path d='M15.982 8.762 10.5 14.249l-2.482-2.478a.75.75 0 0 0-1.06 1.06l3.008 3.008a.748.748 0 0 0 1.06 0l6.016-6.016a.75.75 0 0 0-1.06-1.061z' />
  </svg>
);

export default SentIcon;
