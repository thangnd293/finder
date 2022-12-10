import AVATAR_PLACEHOLDER from '@/assets/images/avatar_placeholder.png';

interface Props {
  image?: string;
}

const Loading = ({ image }: Props) => {
  return (
    <div className='w-10 h-10 relative'>
      <div
        className='absolute z-20 w-full h-full rounded-full border-2 border-solid border-white bg-cover bg-center'
        style={{
          backgroundImage: `url(${image || AVATAR_PLACEHOLDER})`,
        }}
      ></div>
      <div
        className='absolute z-10 top-0 left-0 w-full h-full rounded-full border-2 border-solid border-primary bg-background-loading'
        style={{
          animation: 'beacon__circleExpand 4s infinite',
        }}
      ></div>
      <div
        className='absolute z-10 top-0 left-0 w-full h-full rounded-full border-1 border-solid border-background-loading bg-background-loading'
        style={{
          animation: 'beacon__circleExpand 4s infinite',
          animationDelay: '1.5s',
        }}
      ></div>
    </div>
  );
};

export default Loading;
