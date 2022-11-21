import { Link } from 'react-router-dom';

import ArrowLeftIcon from '@/assets/svgs/ArrowLeftIcon';

interface SettingFieldLinkProps {
  to: string;
  label: string;
  value?: string;
  className?: string;
}

const SettingFieldLink = ({
  to,
  label,
  value,
  className,
}: SettingFieldLinkProps) => {
  return (
    <Link
      to={to}
      className={`group flex items-center justify-between gap-2 px-1.6 h-[52px] border-0 border-y border-solid border-gray-20 not-last:border-b-0 font-light bg-white ${
        className ? className : ''
      }`}
    >
      <span className='text-16'>{label}</span>
      <span className='inline-flex items-center gap-0.8 text-text-secondary group-hover:text-primary'>
        {value} <ArrowLeftIcon width={12} className='rotate-180' />
      </span>
    </Link>
  );
};

export default SettingFieldLink;
