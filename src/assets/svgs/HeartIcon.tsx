import IconProps from '@/typings/icon';

const HeartIcon = (props: IconProps) => (
  <svg
    focusable='false'
    aria-hidden='true'
    role='presentation'
    viewBox='0 0 24 24'
    width='32px'
    height='32px'
    {...props}
  >
    <path
      d='M21.994 10.225c0-3.598-2.395-6.212-5.72-6.212-1.78 0-2.737.647-4.27 2.135C10.463 4.66 9.505 4 7.732 4 4.407 4 2 6.62 2 10.231c0 1.52.537 2.95 1.533 4.076l8.024 7.357c.246.22.647.22.886 0l7.247-6.58.44-.401.162-.182.168-.174a6.152 6.152 0 0 0 1.54-4.09'
      fill={`${props.color ? props.color : 'url(#svg-fill-like)'}`}
    ></path>
    <defs>
      <linearGradient
        id='svg-fill-like'
        x1='0.14644660940672627'
        x2='0.8535533905932737'
        y1='0.8535533905932737'
        y2='0.1464466094067262'
        spreadMethod='pad'
      >
        <stop offset='0%' stopColor='#129e68'></stop>
        <stop offset='100%' stopColor='#199a9f'></stop>
      </linearGradient>
    </defs>
  </svg>
);

export default HeartIcon;
