import { Link } from 'react-router-dom';

import { User } from '@/api-graphql';

interface Props {
  to: string;
  user: User;
}

const Card = ({ to, user }: Props) => {
  return (
    <Link to={to} className='w-fit block p-0.8'>
      <div
        className='w-9 h-12 bg-center bg-cover rounded-4 overflow-hidden relative'
        style={{
          backgroundImage: `url('${user.images?.[0]}')`,
        }}
      >
        <div
          className='h-1/3 pointer-events-none absolute bottom-0 left-0 right-0'
          style={{
            backgroundImage:
              'linear-gradient(to top, rgb(0, 0, 0) 0%, rgba(255, 255, 255, 0) 100%)',
          }}
        ></div>
      </div>
      <p className='w-full mt-0.5 px-0.4 whitespace-nowrap text-ellipsis overflow-hidden text-center text-black text-16 font-semibold'>
        {user.username}
      </p>
    </Link>
  );
};

export default Card;
