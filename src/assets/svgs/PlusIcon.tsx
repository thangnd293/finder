import IconProps from '@/typings/icon';

const PlusIcon = (props: IconProps) => (
  <svg
    aria-hidden='true'
    viewBox='0 0 24 24'
    width={16}
    height={16}
    fill='currentColor'
    {...props}
  >
    <path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2Z' />
  </svg>
);

export default PlusIcon;
