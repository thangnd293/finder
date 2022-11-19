import Card from './Card';

interface Props {}

const Matches = ({}: Props) => {
  return (
    <div className='w-full grid grid-cols-2 lg:grid-cols-3 px-0.8 py-0.4'>
      {Array.from({ length: 10 }).map((_, i) => (
        <Card key={i} to={''} name={'Dac Thang Nguyen'} />
      ))}
    </div>
  );
};

export default Matches;
