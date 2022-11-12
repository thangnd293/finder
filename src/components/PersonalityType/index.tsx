interface Props {
  icon: string;
  text: string;
}

const PersonalityType = ({ icon, text }: Props) => {
  return (
    <div className='shrink-0 w-fit px-0.8 py-0.4 flex items-center space-x-0.5 border border-solid border-black rounded-full'>
      <img
        className='w-1.6 h-1.6 object-cover object-center aspect-square'
        src={icon}
        alt={text}
      />
      <p className='text-14 text-text-secondary'>{text}</p>
    </div>
  );
};

export default PersonalityType;
