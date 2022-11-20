import styled from 'styled-components';
import tw from 'twin.macro';

interface Props {
  icon?: string;
  text: string;
  isActive?: boolean;
  onClick?: (hobbit: string) => void;
}

const PersonalityTypeContainer = styled.div<{
  hasAction?: boolean;
  active: boolean;
}>`
  ${tw`shrink-0 w-fit px-0.8 py-0.4 flex items-center space-x-0.5 border border-solid border-black text-text-secondary rounded-full cursor-default`}
  ${({ hasAction }) => hasAction && tw`cursor-pointer`}
  ${({ active }) => active && tw`border-primary text-primary`}
`;

const PersonalityType = ({ icon, text, isActive = false, onClick }: Props) => {
  const hasIcon = !!icon;
  const handleClick = () => {
    onClick?.(text);
  };

  return (
    <PersonalityTypeContainer
      active={isActive}
      hasAction={!!onClick}
      onClick={handleClick}
    >
      {hasIcon && (
        <img
          className='w-1.6 h-1.6 object-cover object-center aspect-square'
          src={icon}
          alt={text}
        />
      )}
      <p className='text-14'>{text}</p>
    </PersonalityTypeContainer>
  );
};

export default PersonalityType;
