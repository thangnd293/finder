import { Fragment, ReactNode } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import PersonalityType from '../PersonalityType';

import astrologicalSign from '@/assets/images/astrological_sign.png';
import GenderIcon from '@/assets/svgs/GenderIcon';
import JobIcon from '@/assets/svgs/JobIcon';
import LocationIcon from '@/assets/svgs/LocationIcon';
import SchoolIcon from '@/assets/svgs/SchoolIcon';

const SectionWrapper = styled.div`
  ${tw`px-1.6 py-1 space-y-0.5`}
`;

const Divider = styled.hr`
  ${tw`border-gray-15`}
`;

interface Props {
  onReport?: () => void;
}

const Information = ({ onReport }: Props) => {
  return (
    <Fragment>
      <SectionWrapper>
        <p className='space-x-0.8'>
          <span className='font-bold text-32'>Dac Thang</span>
          <span className='font-light text-26'>22</span>
        </p>
        <TextWithIcon
          icon={<JobIcon height={24} />}
          text={'Web developer tại Nexon'}
        />
        <TextWithIcon
          icon={<SchoolIcon height={24} />}
          text={'Trường Đại Học Sư Phạm Kỹ Thuật Tp. Hồ Chi Minh'}
        />
        <TextWithIcon
          icon={<LocationIcon height={22} />}
          text={'Sống tại Hồ Chí Minh'}
        />
        <TextWithIcon icon={<GenderIcon height={22} />} text={'Nam'} />
      </SectionWrapper>
      <Divider />
      <SectionWrapper>
        <p className='text-18 text-text-secondary leading-normal'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
          omnis! Necessitatibus molestias ipsam beatae facilis expedita nobis
          illo est possimus, vitae tempore aperiam. Minima officia voluptas
          suscipit. Dolore, impedit soluta!
        </p>
        <div className='flex flex-wrap gap-0.4 py-1.2'>
          <PersonalityType icon={astrologicalSign} text={'Thien Binh'} />
          <PersonalityType icon={astrologicalSign} text={'Thien Binh'} />
          <PersonalityType icon={astrologicalSign} text={'Thien Binh'} />
          <PersonalityType icon={astrologicalSign} text={'Thien Binh'} />
          <PersonalityType icon={astrologicalSign} text={'Thien Binh'} />
        </div>
      </SectionWrapper>
      <Divider />
      <SectionWrapper>
        <p className='text-18 font-medium'>Sở thích</p>
        <div className='flex flex-wrap gap-0.4 py-1.2'>
          <PersonalityType icon={astrologicalSign} text={'Thien Binh'} />
          <PersonalityType icon={astrologicalSign} text={'Thien Binh'} />
          <PersonalityType icon={astrologicalSign} text={'Thien Binh'} />
          <PersonalityType icon={astrologicalSign} text={'Thien Binh'} />
          <PersonalityType icon={astrologicalSign} text={'Thien Binh'} />
        </div>
      </SectionWrapper>
      {onReport && (
        <>
          <Divider />
          <button
            onClick={onReport}
            className='w-full border-none py-2 text-14 text-center text-text-secondary font-semibold uppercase opacity-60 duration-300 hover:opacity-100'
          >
            Bao cao {'Dac Thang'}
          </button>
          <Divider />
        </>
      )}
    </Fragment>
  );
};

export default Information;

const TextWithIcon = ({ icon, text }: { icon: ReactNode; text: string }) => {
  return (
    <div className='flex space-x-0.4 text-text-secondary font-light'>
      {icon}
      <p className='text-18'>{text}</p>
    </div>
  );
};
