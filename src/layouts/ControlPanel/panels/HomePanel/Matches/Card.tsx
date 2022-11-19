import { Link } from 'react-router-dom';

interface Props {
  to: string;
  name: string;
}

const Card = ({ to, name }: Props) => {
  return (
    <Link to={to}>
      <div className='w-full aspect-[29/40] p-0.8 duration-300 hover:scale-[1.15]'>
        <div
          className='w-full h-full bg-center bg-cover rounded-4 overflow-hidden relative'
          style={{
            backgroundImage:
              'url("https://images-ssl.gotinder.com/6125c6015291bd01008b6699/320x400_75_418cb65b-fca0-411f-8c6b-86dc6dbd7d6c.webp")',
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
            {name}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
