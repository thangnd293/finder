import IconProps from '@/typings/icon';

const JobIcon = (props: IconProps) => (
  <svg aria-hidden='true' viewBox='0 0 24 24' width={16} height={16} {...props}>
    <g
      transform='translate(2 5)'
      stroke='#505965'
      strokeWidth={0.936}
      fill='none'
      fillRule='evenodd'
    >
      <rect x={5.006} y={3.489} width={9.988} height={9.637} rx={0.936} />
      <path d='M7.15 3.434h5.7V1.452a.728.728 0 0 0-.724-.732H7.874a.737.737 0 0 0-.725.732v1.982z' />
      <rect x={0.72} y={3.489} width={18.56} height={9.637} rx={0.936} />
    </g>
  </svg>
);

export default JobIcon;
