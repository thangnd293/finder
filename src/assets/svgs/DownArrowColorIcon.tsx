import IconProps from '@/typings/icon';

const DownArrowColorIcon = (props: IconProps) => (
  <svg
    aria-hidden='true'
    viewBox='0 0 24 24'
    width={52}
    height={52}
    className='Sq(52px)'
    {...props}
  >
    <g transform='translate(2 2)' fill='none'>
      <circle fill='url(#svg-fill-gradient)' cx={10} cy={10} r={10} />
      <path
        d='m9.35 14.561-.895-1.09-1.301-1.587-.894-1.09c-.358-.437-.19-.794.375-.794h1.733c.096-.661.403-3.178.484-3.732.096-.66.516-1.147 1.146-1.147h.003c.63 0 1.05.487 1.147 1.147.08.554.387 3.071.484 3.732h1.732c.565 0 .734.357.376.793l-.894 1.09-1.302 1.588-.894 1.09c-.357.437-.943.437-1.3 0'
        fill='#fff'
      />
    </g>
    <defs>
      <linearGradient
        id='svg-fill-gradient'
        x1='0'
        x2='1'
        y1='0.5'
        y2='0.49999999999999994'
        spreadMethod='pad'
      >
        <stop offset='0%' stopColor='#fd267a'></stop>
        <stop offset='100%' stopColor='#ff6036'></stop>
      </linearGradient>
    </defs>
  </svg>
);

export default DownArrowColorIcon;
