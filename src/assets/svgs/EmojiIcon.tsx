import IconProps from '@/typings/icon';

const EmojiIcon = ({
  background,
  ...props
}: IconProps & {
  background?: string;
}) => (
  <svg aria-hidden='true' viewBox='0 0 24 24' width={40} height={40} {...props}>
    <g fill='none'>
      <circle
        cx={10}
        cy={10}
        r={10}
        transform='translate(2 2)'
        fill={background}
      />
      <path
        d='M12 15.3c1.398 0 2.58-.876 3.066-2.1H8.934A3.298 3.298 0 0 0 12 15.3m-2.1-3.9a.9.9 0 1 0 0-1.8.9.9 0 0 0 0 1.8m4.2 0a.9.9 0 1 0 0-1.8.9.9 0 0 0 0 1.8M12 16.8a4.8 4.8 0 1 1 0-9.6 4.8 4.8 0 0 1 0 9.6M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z'
        fill='currentColor'
      />
    </g>
  </svg>
);

export default EmojiIcon;
