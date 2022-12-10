import { apiCaller } from '@/service/index';
import { getUserFragment } from '@/service/user';
import { Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';

import Edit from './Edit';
import Preview from './Preview';

import { useUserStore } from '@/store/user';

import Card from '@/components/Card';

// import PersonalityType from '@/components/PersonalityType';
import useMediaQuery from '@/hooks/useMediaQuery';

import { RESPONSIVE } from '@/common/constants/responsive';
import { PATH } from '@/common/constants/route';

import { TagType, useGetAllTag } from '@/api-graphql';

enum Tab {
  Edit = 'EDIT',
  Preview = 'PREVIEW',
}

const Tabs: Record<Tab, React.ComponentType<any>> = {
  [Tab.Edit]: Edit,
  [Tab.Preview]: Preview,
};

export enum LifeStyle {
  Zodiac = 'zodiac',
  PersonalityType = 'personalityType',
  Diet = 'diet',
  Pets = 'pets',
  Education = 'education',
  Smoke = 'smoke',
}

export interface IInformationData {
  images: string[];
  aboutMe: string;
  jobTitle: string;
  company: string;
  liveAt: string;
  school: string;
  gender: string;
  interests?: string[];
  zodiac?: string;
  smoke?: string;
  personalityType?: string;
  diet?: string;
  education?: string;
  pets?: string;
}

const ProfileEdit = () => {
  const navigate = useNavigate();

  const [loadHobbies, { data }] = useGetAllTag([
    { results: ['_id', 'name', 'type'] },
  ]);
  const allTags = data?.getAllTag.results || [];
  const [tabActive, setTabActive] = useState(Tab.Edit);

  const isMobile = useMediaQuery({
    mediaQuery: `(max-width: ${RESPONSIVE.md}px)`,
  });

  const { user, setUser } = useUserStore();

  useEffect(() => {
    loadHobbies();
  }, []);

  console.log(user);
  const zodiac = user?.tags?.find(tag => tag.type === TagType.Zodiac);
  const education = user?.tags?.find(tag => tag.type === TagType.Education);
  const smoke = user?.tags?.find(tag => tag.type === TagType.Smoke_question);
  const personalityType = user?.tags?.find(
    tag => tag.type === TagType.Personality_type,
  );
  const diet = user?.tags?.find(tag => tag.type === TagType.Dietary_preference);
  const pets = user?.tags?.find(tag => tag.type === TagType.Pets);

  const initialValues: IInformationData = {
    images: user?.images || [],
    aboutMe: user?.aboutMe || '',
    jobTitle: user?.jobTitle || '',
    company: user?.company || '',
    liveAt: user?.liveAt || '',
    school: user?.school || '',
    gender: user!.gender!,
    interests:
      user?.tags
        ?.filter(tag => tag.type === TagType.Passions)
        .map(t => t.name!) || [],
    zodiac: zodiac && `${zodiac._id};${zodiac.name}`,
    education: education && `${education._id};${education.name}`,
    smoke: smoke && `${smoke._id};${smoke.name}`,
    personalityType:
      personalityType && `${personalityType._id};${personalityType.name}`,
    diet: diet && `${diet._id};${diet.name}`,
    pets: pets && `${pets._id};${pets.name}`,
  };

  const onSave = async (values: IInformationData) => {
    const tags: string[] =
      user?.tags
        ?.filter(tag => tag.type === TagType.Passions)
        .map(t => t._id!) || [];
    values.zodiac && tags.push(values.zodiac.split(';')[0]);
    values.education && tags.push(values.education.split(';')[0]);
    values.smoke && tags.push(values.smoke.split(';')[0]);
    values.personalityType && tags.push(values.personalityType.split(';')[0]);
    values.diet && tags.push(values.diet.split(';')[0]);
    values.pets && tags.push(values.pets.split(';')[0]);

    const input = {
      images: values.images,
      aboutMe: values.aboutMe,
      jobTitle: values.jobTitle,
      company: values.company,
      liveAt: values.liveAt,
      school: values.school,
      tags,
    };

    await apiCaller
      .updateProfile()
      .$args({
        input: {
          ...input,
        },
      })
      .$fetch();
    const userUpdated = await apiCaller
      .getCurrentUser(getUserFragment)
      .$fetch();
    setUser(userUpdated);
  };

  const onDone = () => {
    const btnSave = document.getElementById(
      'btn-save-edit',
    ) as HTMLButtonElement;

    if (!btnSave) return;

    btnSave.click();
    navigate(PATH.APP.PROFILE.SELF);
  };

  const TabElement = Tabs[tabActive];
  const props = tabActive === Tab.Edit ? { allTags, onSave } : {};

  return (
    <div
      className={`w-full h-full ${
        isMobile ? 'fixed top-0 left-0' : 'flex items-center justify-center'
      }`}
    >
      <Card className='flex flex-col bg-gray-10 pb-1 relative'>
        {isMobile && (
          <div className='h-[48px] flex items-center justify-center relative bg-white border border-solid border-gray-20'>
            <h1 className='text-18 font-semibold'>Edit info</h1>
            <button
              className='px-1.2 absolute right-0 text-primary-a11y'
              onClick={onDone}
            >
              Done
            </button>
          </div>
        )}

        <div className='rounded-t-8 bg-white'>
          <ButtonStyled
            active={tabActive === Tab.Edit}
            onClick={() => setTabActive(Tab.Edit)}
          >
            Chỉnh sửa
          </ButtonStyled>
          <ButtonStyled
            active={tabActive === Tab.Preview}
            onClick={() => setTabActive(Tab.Preview)}
          >
            Xem trước
          </ButtonStyled>
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={onSave}
          enableReinitialize
        >
          {({ values, handleSubmit }) => (
            <form
              className='flex-1 overflow-auto scroll-hidden'
              onSubmit={handleSubmit}
            >
              <TabElement {...props} data={values} />
            </form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default ProfileEdit;

interface LifeStyleHeaderProps {
  tab: LifeStyle;
  icon: string;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

export const LifeStyleHeader = ({
  tab,
  icon,
  label,
  isActive,
  onClick,
}: LifeStyleHeaderProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (isActive && el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [ref, isActive]);
  return (
    <div
      ref={ref}
      className={`shrink-0 flex items-center px-0.8 border-0 border-solid border-gray-20 text-center not-last:border-r cursor-pointer ${
        isActive ? 'opacity-100' : 'opacity-40'
      }`}
      id={tab}
      onClick={onClick}
    >
      <img
        className='w-[24px] h-[24px] overflow-hidden object-cover origin-center'
        src={icon}
        alt={label}
        draggable={false}
      />
      <span>{label}</span>
    </div>
  );
};

const ButtonStyled = styled.button<{ active?: boolean }>`
  ${tw`w-1/2 py-1.2 text-17 font-semibold border-0 border-solid border-gray-20 border-b`}
  & ~ & {
    ${tw`border-l`}
  }
  ${({ active }) => active && tw`text-primary-a11y`}
`;

export const lifeStyles = [
  {
    tab: LifeStyle.Zodiac,
    label: 'Cung hoàng đạo',
    icon: '/images/astrological_sign.png',
  },
  {
    tab: LifeStyle.PersonalityType,
    label: 'Kiểu Tính Cách',
    icon: '/images/mbti.png',
  },
  {
    tab: LifeStyle.Diet,
    label: 'Chế độ ăn uống',
    icon: '/images/appetite.png',
  },
  {
    tab: LifeStyle.Pets,
    label: 'Thú cưng',
    icon: '/images/pets.png',
  },
  {
    tab: LifeStyle.Education,
    label: 'Giáo dục',
    icon: '/images/education.png',
  },
  {
    tab: LifeStyle.Smoke,
    label: 'Bạn có hay hút thuốc không?',
    icon: '/images/smoking.png',
  },
];
