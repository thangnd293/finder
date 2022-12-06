import IconProps from '@/typings/icon';

const LeftArrowIcon = (props: IconProps) => (
  <svg aria-hidden='true' viewBox='0 0 24 24' width={12} height={12} {...props}>
    <path
      d='M4.909 11.647h10.355C19 11.647 22 14.82 22 18.7a.857.857 0 0 1-.868.845.857.857 0 0 1-.869-.845c0-1.12-.32-2.157-.866-3.014-.903-1.42-2.423-2.349-4.133-2.349H5.022l4.852 4.725a.83.83 0 0 1-.025 1.17.886.886 0 0 1-1.202.025l-6.392-6.22a.834.834 0 0 1-.255-.6c0-.224.092-.44.255-.598l6.39-6.222a.885.885 0 0 1 1.218.008.83.83 0 0 1 .01 1.186L4.91 11.647z'
      fillRule='evenodd'
    />
  </svg>
);

export default LeftArrowIcon;
