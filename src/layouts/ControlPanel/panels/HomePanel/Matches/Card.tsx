import { User } from '@/api-graphql';
import { Link } from 'react-router-dom';

interface Props {
  to: string;
  user: User;
}

const Card = ({ to, user }: Props) => {
  return (
    <Link to={to}>
      <div className='w-full aspect-[29/40] p-0.8 duration-300 hover:scale-[1.15]'>
        <div
          className='w-full h-full bg-center bg-cover rounded-4 overflow-hidden relative'
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
          <p className='px-0.4 w-full whitespace-nowrap text-ellipsis overflow-hidden absolute bottom-0.2 text-white text-16 font-semibold'>
            {user.username}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
