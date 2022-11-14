import IconProps from '@/typings/icon';

const InfoIcon = (props: IconProps) => (
  <svg aria-hidden='true' width={24} height={24} {...props}>
    <path
      fill='#fff'
      d='M13 9h-2V7h2m0 10h-2v-6h2m-1-9A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2Z'
    />
  </svg>
);

export default InfoIcon;
