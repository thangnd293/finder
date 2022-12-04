import { Fragment, ReactNode } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import GenderIcon from '@/assets/svgs/GenderIcon';
import JobIcon from '@/assets/svgs/JobIcon';
import LocationIcon from '@/assets/svgs/LocationIcon';
import SchoolIcon from '@/assets/svgs/SchoolIcon';

import { User } from '@/api-graphql';

const SectionWrapper = styled.div`
  ${tw`px-1.6 py-1 space-y-0.5`}
`;

const Divider = styled.hr`
  ${tw`border-gray-15`}
`;

interface Props {
  user: User;
  onReport?: () => void;
}

const Information = ({ user, onReport }: Props) => {
  return (
    <Fragment>
      <SectionWrapper>
        <p className='space-x-0.8'>
          <span className='font-bold text-32'>{user.username}</span>
          <span className='font-light text-26'>{user.age}</span>
        </p>
        {user.company && user.jobTitle && (
          <TextWithIcon
            icon={<JobIcon height={24} />}
            text={`${user.company} tại ${user.jobTitle}`}
          />
        )}
        {user.school && (
          <TextWithIcon
            icon={<SchoolIcon height={24} />}
            text={`${user.school}`}
          />
        )}
        {user.liveAt && (
          <TextWithIcon
            icon={<LocationIcon height={22} />}
            text={`Sống tại ${user.liveAt}`}
          />
        )}
        {user.gender && (
          <TextWithIcon icon={<GenderIcon height={22} />} text={user.gender} />
        )}
      </SectionWrapper>
      <Divider />
      <SectionWrapper>
        {user.aboutMe && (
          <p className='text-18 text-text-secondary leading-normal'>
            {user.aboutMe}
          </p>
        )}
        <div className='flex flex-wrap gap-0.4 py-1.2'>
          {/* <PersonalityType icon={astrologicalSign} tag={'Thien Binh'} />
          <PersonalityType icon={astrologicalSign} tag={'Thien Binh'} />
          <PersonalityType icon={astrologicalSign} tag={'Thien Binh'} />
          <PersonalityType icon={astrologicalSign} tag={'Thien Binh'} />
          <PersonalityType icon={astrologicalSign} tag={'Thien Binh'} /> */}
        </div>
      </SectionWrapper>
      <Divider />
      <SectionWrapper>
        <p className='text-18 font-medium'>Sở thích</p>
        <div className='flex flex-wrap gap-0.4 py-1.2'>
          {/* <PersonalityType icon={astrologicalSign} tag={'Thien Binh'} />
          <PersonalityType icon={astrologicalSign} tag={'Thien Binh'} />
          <PersonalityType icon={astrologicalSign} tag={'Thien Binh'} />
          <PersonalityType icon={astrologicalSign} tag={'Thien Binh'} />
          <PersonalityType icon={astrologicalSign} tag={'Thien Binh'} /> */}
        </div>
      </SectionWrapper>
      {onReport && (
        <>
          <Divider />
          <button
            onClick={onReport}
            className='w-full border-none py-2 text-14 text-center text-text-secondary font-semibold uppercase opacity-60 duration-300 hover:opacity-100'
          >
            Báo cáo {user.username}
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
