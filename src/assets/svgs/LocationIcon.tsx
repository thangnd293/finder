import IconProps from '@/typings/icon';

const LocationIcon = (props: IconProps) => (
  <svg
    aria-hidden='true'
    viewBox='0 0 24 24'
    width={16}
    height={16}
    className='Va(m) Sq(16px)'
    {...props}
  >
    <g stroke='#505965' strokeWidth={0.936} fill='none' fillRule='evenodd'>
      <path d='M19.695 9.518H4.427V21.15h15.268V9.52zM3.109 9.482h17.933L12.06 3.709 3.11 9.482z' />
      <path d='M9.518 21.15h5.086v-6.632H9.518z' />
    </g>
  </svg>
);

export default LocationIcon;
