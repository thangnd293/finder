import { ChangeEvent, FC } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

export const UploadCard: FC<{
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  image: string;
  id: string;
  className?: string;
}> = ({ image, id, className, onChange }) => {
  return (
    <CardBox
      htmlFor={`upload-image-${id}`}
      tw='cursor-pointer block relative bg-[#F0F1F2] rounded-8 [box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;]'
      style={{
        border: image ? '' : '4px dashed #D2D5D9',
        overflow: !image ? '' : 'hidden',
      }}
      className={className}
    >
      {image ? (
        <Image src={image} tw='w-full h-full object-cover' />
      ) : (
        <div tw='flex justify-center items-center bg-primary h-[28px] w-[28px] rounded-full absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4'>
          <PlusIcon />
        </div>
      )}
      {!image && (
        <input
          id={`upload-image-${id}`}
          name='upload-image'
          type='file'
          accept='image/png, image/jpeg'
          onChange={onChange}
          hidden
        />
      )}
    </CardBox>
  );
};

const CardBox = styled.label``;

const Image = styled.img`
  -khtml-user-select: none;
  -o-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;

  pointer-events: none;
`;

const PlusIcon = styled.div`
  ${tw`h-[64%] w-[64%] relative`}
  &::before {
    content: '';
    ${tw`absolute  w-[64%] h-[4px] rounded bg-white top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2`};
  }

  &::after {
    content: '';
    ${tw`absolute h-[64%] w-[4px] rounded bg-white top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2`};
  }
`;
