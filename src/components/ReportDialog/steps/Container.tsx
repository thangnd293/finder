import ShieldIcon from '@/assets/svgs/ShieldIcon';

interface Props {
  title: string;
  children: React.ReactNode;
}

const Container = ({ title, children }: Props) => {
  return (
    <div className='w-full px-1.6 flex flex-col items-center'>
      <ShieldIcon width={26} height={26} className='mt-3 text-blue-50' />
      <h3 className='mt-5 text-24 font-semibold text-center'>{title}</h3>
      {children}
    </div>
  );
};

export default Container;
