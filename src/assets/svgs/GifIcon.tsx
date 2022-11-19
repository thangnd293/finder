import IconProps from '@/typings/icon';

const GifIcon = ({
  background,
  ...props
}: IconProps & {
  background?: string;
}) => (
  <svg aria-hidden='true' viewBox='0 0 24 24' width={40} height={40} {...props}>
    <g transform='translate(2 2)' fill='none'>
      <circle fill={background} cx={10} cy={10} r={10} />
      <path
        d='M6.844 13c.97 0 1.73-.434 2.275-1.094V9.683H6.57v1.077h1.41v.694c-.216.217-.665.443-1.137.443-.97 0-1.674-.807-1.674-1.901 0-1.094.704-1.902 1.674-1.902.569 0 1.025.347 1.265.755l.946-.555C8.655 7.608 7.957 7 6.844 7 5.282 7 4 8.164 4 9.996 4 11.819 5.282 13 6.844 13zm4.318-.113V7.096h-1.138v5.791h1.138zm2.194 0v-2.396h2.588V9.405h-2.588V8.181H16V7.096h-3.781v5.791h1.137z'
        fill='currentColor'
      />
    </g>
  </svg>
);

export default GifIcon;
