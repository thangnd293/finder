import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useOnClickOutside } from 'usehooks-ts';

import Edit from './Edit';
import Preview from './Preview';
import ProfileEditMobile from './ProfileEditMobile';

import Button from '@/components/Button';
import Card from '@/components/Card';
import PersonalityType from '@/components/PersonalityType';
import Space from '@/components/Space';

import useMediaQuery from '@/hooks/useMediaQuery';

import { RESPONSIVE } from '@/common/constants/responsive';

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
  Smoke = 'smoke',
  PersonalityType = 'personalityType',
  Diet = 'diet',
  Education = 'education',
  Pets = 'pets',
}

interface Props {}

const ProfileEdit = ({}: Props) => {
  const [tabActive, setTabActive] = useState(Tab.Edit);

  const [lifeStyleTabActive, setLifeStyleTabActive] =
    useState<LifeStyle | null>(null);

  const isMobile = useMediaQuery({
    mediaQuery: `(max-width: ${RESPONSIVE.md}px)`,
  });

  const lifeStyleRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(lifeStyleRef, () => setLifeStyleTabActive(null));

  const onLifeStyleActive = (value: LifeStyle | null) => {
    setLifeStyleTabActive(value);
  };

  const TabElement = Tabs[tabActive];
  const props =
    tabActive === Tab.Edit
      ? { lifeStylesData: fakeData.lifeStyle, onLifeStyleActive }
      : {};

  if (isMobile) return <ProfileEditMobile />;
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <Card className='flex flex-col bg-gray-10 pb-1 relative'>
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
        <div className='flex-1 overflow-auto scroll-hidden'>
          <TabElement {...props} />
        </div>
        <div className='text-center'>
          <Button className='inline-block' label='Lưu' />
        </div>
        {lifeStyleTabActive && (
          <div className='absolute bottom-0 left-0 w-full h-full bg-overlay-default'>
            <div
              ref={lifeStyleRef}
              className='absolute bottom-0 w-full h-3/4 mt-auto bg-white rounded-t-16'
            >
              <div className='flex items-center h-[48px] border-0 border-b border-solid border-gray-20 overflow-x-auto scroll-hidden'>
                {lifeStyles.map(tab => (
                  <LifeStyleHeader
                    key={tab.tab}
                    {...tab}
                    isActive={lifeStyleTabActive === tab.tab}
                    onClick={() => onLifeStyleActive(tab.tab)}
                  />
                ))}
              </div>
              <div className='px-1.6 py-[28px]'>
                <h2 className='text-20 font-semibold text-center'>
                  {LIFE_STYLE[lifeStyleTabActive].label}
                </h2>
                <div className='flex flex-wrap gap-0.8 mt-2'>
                  {LIFE_STYLE[lifeStyleTabActive].options.map(
                    (option, index) => (
                      <PersonalityType
                        key={index}
                        text={option}
                        isActive={
                          option === fakeData.lifeStyle[lifeStyleTabActive]
                        }
                      />
                    ),
                  )}
                </div>
              </div>
              <div className='absolute bottom-0 w-full px-1.2 py-1.6'>
                <button className='w-full text-center text-19 font-bold py-1.2'>
                  Bỏ qua
                </button>
                <Space h={20} />
                <Button className='!text-19' width={'full'} label='Xong' />
              </div>
            </div>
          </div>
        )}
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

const LifeStyleHeader = ({
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

export const fakeData = {
  images: [
    {
      id: '1',
      src: 'https://images-ssl.gotinder.com/63197e7abb27b00100c8d6ba/640x800_1d363f5f-d87d-448f-95ff-797c646111ad.jpg',
    },
    {
      id: '2',
      src: 'https://images-ssl.gotinder.com/63197e7abb27b00100c8d6ba/640x800_b42fdd39-4674-4c94-a7d8-8dead8eefd6c.jpg',
    },
    {
      id: '3',
      src: 'https://images-ssl.gotinder.com/63197e7abb27b00100c8d6ba/640x800_eb407488-088e-4a9d-9605-e3cc8477ed91.jpg',
    },
  ],
  introduction: 'Hello world!',
  hobbies: [
    'Thế Hệ 9x',
    'Harry Potter',
    'SoundCloud',
    'Spa',
    'Chăm sóc bản thân',
  ],
  lifeStyle: {
    zodiac: 'Bạch Dương',
    personalityType: 'INTJ',
    smoke: 'Không',
    drink: 'Không',
    diet: 'Không',
    pets: 'Không',
    education: 'Đại học',
  },
  jobTitle: 'Nhân viên',
  company: 'Công ty TNHH ABC',
  school: 'Đại học ABC',
  livingIn: 'Hà Nội',
  gender: 'Nam',
};

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

const LIFE_STYLE: Record<
  LifeStyle,
  {
    label: string;
    options: string[];
  }
> = {
  [LifeStyle.Zodiac]: {
    label: 'Cung hoàng đạo của bạn là gì?',
    options: [
      'Ma Kết',
      'Bảo Bình',
      'Song Ngư',
      'Bạch Dương',
      'Kim Ngưu',
      'Song Tử',
      'Cự Giải',
      'Sư Tử',
      'Xử Nữ',
      'Thiên Bình',
      'Bọ Cạp',
      'Nhân Mã',
    ],
  },
  [LifeStyle.PersonalityType]: {
    label: 'Kiểu tính cách của bạn là gì?',
    options: [
      'INTJ',
      'INTP',
      'ENTJ',
      'ENTP',
      'INFJ',
      'INFP',
      'ENFJ',
      'ENFP',
      'ISTJ',
      'ISFJ',
      'ESTJ',
      'ESFJ',
      'ISTP',
      'ISFP',
      'ESTP',
      'ESFP',
    ],
  },
  [LifeStyle.Diet]: {
    label: 'Bạn có theo chế độ ăn uống nào không?',
    options: [
      'Ăn thuần chay',
      'Ăn chay',
      'Chỉ ăn hải sản và rau củ',
      'Kosher',
      'Halal',
      'Ăn chay bán phần',
      'Chỉ ăn thịt',
      'Không ăn kiêng',
    ],
  },
  [LifeStyle.Pets]: {
    label: 'Bạn có thú cưng không?',
    options: [
      'Chó',
      'Mèo',
      'Bò sát',
      'Động vật lưỡng cư',
      'Cá',
      'Không nuôi thú cưng',
      'Tất cả các loại thú cưng',
    ],
  },
  [LifeStyle.Education]: {
    label: 'Trình độ học vấn của bạn?',
    options: ['Cử nhân', 'Trung học phổ thông', 'Tiến sĩ', 'Thạc sĩ'],
  },
  [LifeStyle.Smoke]: {
    label: 'Bạn có hút thuốc không?',
    options: [
      'Hút thuốc với bạn bè',
      'Không hút thuốc',
      'Hút thuốc thường xuyên',
    ],
  },
};
