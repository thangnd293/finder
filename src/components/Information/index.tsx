import { Fragment, ReactNode } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import PersonalityType from '../PersonalityType';

import { IInformationData } from '@/pages/ProfileEdit';

import GenderIcon from '@/assets/svgs/GenderIcon';
import JobIcon from '@/assets/svgs/JobIcon';
import LocationIcon from '@/assets/svgs/LocationIcon';
import SchoolIcon from '@/assets/svgs/SchoolIcon';

import { GenderEnum, TagType, User } from '@/api-graphql';

const SectionWrapper = styled.div`
  ${tw`px-1.6 py-1 space-y-0.5`}
`;

const Divider = styled.hr`
  ${tw`border-gray-15`}
`;

type Props = {
  user: User;
  previewData?: IInformationData;
  onReport?: () => void;
};

const Information = ({ user, previewData, onReport }: Props) => {
  const tagPassions =
    user.tags?.filter(tag => tag.type === TagType.Passions) || [];
  const otherTags =
    user.tags?.filter(tag => tag.type !== TagType.Passions) || [];
  const aboutMe = previewData?.aboutMe || user.aboutMe;
  const company = previewData?.company || user.company;
  const jobTitle = previewData?.jobTitle || user.jobTitle;
  const school = previewData?.school || user.school;
  const liveAt = previewData?.liveAt || user.liveAt;
  const gender = previewData?.gender || user.gender;

  return (
    <Fragment>
      <SectionWrapper>
        <p className='space-x-0.8'>
          <span className='font-bold text-32'>{user.username}</span>
          <span className='font-light text-26'>{user.age}</span>
        </p>
        {company && jobTitle && (
          <TextWithIcon
            icon={<JobIcon height={24} />}
            text={`${jobTitle} tại ${company}`}
          />
        )}
        {school && (
          <TextWithIcon icon={<SchoolIcon height={24} />} text={`${school}`} />
        )}
        {liveAt && (
          <TextWithIcon
            icon={<LocationIcon height={22} />}
            text={`Sống tại ${liveAt}`}
          />
        )}
        {gender && (
          <TextWithIcon
            icon={<GenderIcon height={22} />}
            text={gender === GenderEnum.Female ? 'Nữ' : 'Nam'}
          />
        )}
      </SectionWrapper>
      <Divider />
      {(aboutMe || otherTags.length > 0) && (
        <SectionWrapper>
          {aboutMe && (
            <p className='text-18 text-text-secondary leading-normal'>
              {aboutMe}
            </p>
          )}
          {
            <div className='flex flex-wrap gap-0.4 py-1.2'>
              {otherTags.map(tag => (
                <PersonalityType key={tag._id} tag={tag} />
              ))}
            </div>
          }
        </SectionWrapper>
      )}
      <Divider />
      {tagPassions.length > 0 && (
        <SectionWrapper>
          <p className='text-18 font-medium'>Sở thích</p>
          <div className='flex flex-wrap gap-0.4 py-1.2'>
            {tagPassions.map(tag => (
              <PersonalityType key={tag._id} tag={tag} />
            ))}
          </div>
        </SectionWrapper>
      )}
      {onReport && (
        <>
          <Divider />
          <button
            type='button'
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
