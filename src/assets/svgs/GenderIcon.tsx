import IconProps from '@/typings/icon';

const GenderIcon = (props: IconProps) => (
  <svg aria-hidden='true' viewBox='0 0 24 24' width={16} height={16} {...props}>
    <path
      d='M15.507 13.032c1.14-.952 1.862-2.656 1.862-5.592C17.37 4.436 14.9 2 11.855 2 8.81 2 6.34 4.436 6.34 7.44c0 3.07.786 4.8 2.02 5.726-2.586 1.768-5.054 4.62-4.18 6.204 1.88 3.406 14.28 3.606 15.726 0 .686-1.71-1.828-4.608-4.4-6.338'
      stroke='#505965'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export default GenderIcon;
