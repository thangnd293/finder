import IconProps from '@/typings/icon';

const FlagIcon = (props: IconProps) => (
  <svg
    aria-hidden='true'
    viewBox='0 0 24 24'
    width={24}
    height={24}
    fill='currentColor'
    {...props}
  >
    <path d='M19.647 2.585a.595.595 0 0 0-.599.049c-2.28 1.625-5.233.861-8.1.13-2.536-.65-4.93-1.262-6.691-.146a.535.535 0 0 0-.257.45V21.35c0 .359.306.65.684.65.378 0 .684-.291.684-.65v-8.307c1.34-.493 3.26 0 5.284.514 1.664.497 3.388.789 5.13.867a6.648 6.648 0 0 0 3.99-1.176.533.533 0 0 0 .228-.433V3.067a.543.543 0 0 0-.353-.482z' />
  </svg>
);

export default FlagIcon;
