import styled from 'styled-components';
import tw from 'twin.macro';

import { Tag } from '@/api-graphql';

interface Props {
  icon?: string;
  tag: Tag;
  isActive?: boolean;
  onClick?: (hobbit: Tag) => void;
}

const PersonalityTypeContainer = styled.div<{
  hasAction?: boolean;
  active: boolean;
}>`
  ${tw`shrink-0 w-fit px-0.8 py-0.4 flex items-center space-x-0.5 border border-solid border-black text-text-secondary rounded-full cursor-default`}
  ${({ hasAction }) => hasAction && tw`cursor-pointer`}
  ${({ active }) => active && tw`border-primary text-primary`}
`;

const PersonalityType = ({ icon, tag, isActive = false, onClick }: Props) => {
  const hasIcon = !!icon;
  const handleClick = () => {
    onClick?.(tag);
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
          alt={tag.name || tag._id}
        />
      )}
      <p className='text-14'>{tag.name}</p>
    </PersonalityTypeContainer>
  );
};

export default PersonalityType;
