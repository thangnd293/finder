import { useFormikContext } from 'formik';
import { useId, useState } from 'react';

import { IInformationData, LifeStyle, LifeStyleHeader, lifeStyles } from '.';

import { useUserStore } from '@/store/user';

import ArrowLeftIcon from '@/assets/svgs/ArrowLeftIcon';
import Button from '@/components/Button';
import PersonalityType from '@/components/PersonalityType';
import SettingFieldLink from '@/components/SettingFieldLink';
import Space from '@/components/Space';
import Textarea from '@/components/Textarea';
import { UploadImageGroup } from '@/components/UploadImageGroup';

import { PATH } from '@/common/constants/route';

import { GenderEnum, Tag, TagType } from '@/api-graphql';

const MAX_LENGTH_INTRODUCTION = 500;

interface Props {
  onSave: (values: IInformationData) => void;
  allTags: Tag[];
}
const Edit = ({ allTags, onSave }: Props) => {
  const [lifeStyleTabActive, setLifeStyleTabActive] =
    useState<LifeStyle | null>(null);

  const { user } = useUserStore();
  const { values, setFieldValue } = useFormikContext<IInformationData>();
  const interests = values.interests?.join(', ');

  const LIFE_STYLE: Record<
    LifeStyle,
    {
      label: string;
      options: Tag[];
    }
  > = {
    [LifeStyle.Zodiac]: {
      label: 'Cung hoàng đạo của bạn là gì?',
      options: allTags.filter(tag => tag.type === TagType.Zodiac),
    },
    [LifeStyle.PersonalityType]: {
      label: 'Kiểu tính cách của bạn là gì?',
      options: allTags.filter(tag => tag.type === TagType.Personality_type),
    },
    [LifeStyle.Diet]: {
      label: 'Bạn có theo chế độ ăn uống nào không?',
      options: allTags.filter(tag => tag.type === TagType.Dietary_preference),
    },
    [LifeStyle.Pets]: {
      label: 'Bạn có thú cưng không?',
      options: allTags.filter(tag => tag.type === TagType.Pets),
    },
    [LifeStyle.Education]: {
      label: 'Trình độ học vấn của bạn?',
      options: allTags.filter(tag => tag.type === TagType.Education),
    },
    [LifeStyle.Smoke]: {
      label: 'Bạn có hút thuốc không?',
      options: allTags.filter(tag => tag.type === TagType.Smoke_question),
    },
  };

  const onNextTab = () => {
    if (!lifeStyleTabActive) return;
    const tabs = Object.entries(LifeStyle);
    const currentIndex = Object.values(LifeStyle).indexOf(lifeStyleTabActive);
    if (currentIndex < tabs.length - 1) {
      setLifeStyleTabActive(tabs[currentIndex + 1][1]);
    }
  };

  const onCloseLifeStyleTab = () => {
    setLifeStyleTabActive(null);
  };

  return (
    <>
      <div className='w-full h-full relative'>
        <UploadImageGroup
          name='images'
          className='p-0.8 gap-1'
          itemClassName='!w-[114px] !h-[156px]'
          length={9}
        />
        <p className='px-1.6 mt-2 mb-3 text-14 text-text-secondary font-light text-center'>
          Thêm video, ảnh hoặc loop để hoàn thành thêm 4% hồ sơ của bạn, cùng cơ
          hội nhận được nhiều lượt Thích hơn.
        </p>
        <div className='w-fit mx-auto'>
          <Button label='Thêm Ảnh' />
        </div>
        <Space h={30} />
        <label
          className='px-1 pb-0.8 text-14 uppercase text-text-secondary font-semibold'
          htmlFor='introduction'
        >
          Giới thiệu {user?.username}
        </label>
        <div className='relative'>
          <Textarea
            className='block w-full px-[24px] py-1.2 border-0 border-y border-solid border-gray-20 outline-none resize-none'
            id='introduction'
            maxLength={MAX_LENGTH_INTRODUCTION}
            rows={3}
            maxRows={12}
            value={values.aboutMe}
            onChange={e => setFieldValue('aboutMe', e.target.value)}
          />
          <span className='absolute bottom-0 right-0'>
            {MAX_LENGTH_INTRODUCTION - values.aboutMe.length}
          </span>
        </div>
        <p className='px-1.6 mt-1 mb-3 text-14 text-text-secondary font-light text-center'>
          Không nên đưa tên người dùng trên các mạng xã hội hoặc thông tin liên
          lạc khác vào hồ sơ của bạn.
        </p>

        <p className='px-1 pb-0.8 text-14 uppercase text-text-secondary font-semibold'>
          Sở Thích
        </p>
        <SettingFieldLink
          className='px-[24px]'
          to={PATH.APP.PROFILE.EDIT_INTERESTS}
          label={interests || ''}
        />
        <Space h={20} />
        <p className='px-1 pb-0.8 text-14 uppercase text-text-secondary font-semibold'>
          Phong cách sống
        </p>
        {lifeStyles.map(item => (
          <LifeStyleItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            value={values[item.tab]?.split(';')[1] || 'Không'}
            onClick={() => setLifeStyleTabActive(item.tab)}
          />
        ))}
        <Space h={20} />
        <Input
          label={'Chức danh'}
          placeholder={'Thêm Chức Danh'}
          value={values.jobTitle}
          onChange={e => setFieldValue('jobTitle', e.target.value)}
        />
        <Space h={20} />
        <Input
          label={'Công ty'}
          placeholder={'Thêm Tên Công Ty'}
          value={values.company}
          onChange={e => setFieldValue('company', e.target.value)}
        />
        <Space h={20} />
        <Input
          label={'Trường'}
          placeholder={'Thêm Tên Trường'}
          value={values.school}
          onChange={e => setFieldValue('school', e.target.value)}
        />
        <Space h={20} />
        <Input
          label={'Đang sống tại'}
          placeholder={'Thêm địa điểm'}
          value={values.liveAt}
          onChange={e => setFieldValue('liveAt', e.target.value)}
        />
        <Space h={20} />
        <p className='px-1 pb-0.8 text-14 uppercase text-text-secondary font-semibold'>
          Giới tính
        </p>
        <SettingFieldLink
          className='px-[24px]'
          to={PATH.APP.PROFILE.EDIT_GENDER}
          label={values.gender === GenderEnum.Male ? 'Nam' : 'Nữ'}
          onClick={() => onSave(values)}
        />
        <div className='h-5'></div>
      </div>
      <div className='hidden md:flex absolute bottom-0 left-0 w-full justify-center bg-gray-10'>
        <Button
          id='btn-save-edit'
          className='inline-block '
          label='Lưu'
          onClick={() => onSave(values)}
        />
      </div>
      {lifeStyleTabActive && (
        <div
          className='absolute bottom-0 left-0 w-full h-full bg-overlay-default'
          onClick={onCloseLifeStyleTab}
        >
          <div
            onClick={e => e.stopPropagation()}
            className='absolute bottom-0 w-full h-3/4 mt-auto bg-white rounded-t-16'
          >
            <div className='flex items-center h-[48px] border-0 border-b border-solid border-gray-20 overflow-x-auto scroll-hidden'>
              {lifeStyles.map(tab => (
                <LifeStyleHeader
                  key={tab.tab}
                  {...tab}
                  isActive={lifeStyleTabActive === tab.tab}
                  onClick={() => setLifeStyleTabActive(tab.tab)}
                />
              ))}
            </div>
            <div className='px-1.6 py-[28px]'>
              <h2 className='text-20 font-semibold text-center'>
                {LIFE_STYLE[lifeStyleTabActive].label}
              </h2>
              <div className='flex flex-wrap gap-0.8 mt-2'>
                {LIFE_STYLE[lifeStyleTabActive].options.map(option => {
                  return (
                    <PersonalityType
                      key={option._id}
                      tag={option}
                      isActive={
                        option._id === values[lifeStyleTabActive]?.split(';')[0]
                      }
                      onClick={() =>
                        setFieldValue(
                          lifeStyleTabActive,
                          `${option._id};${option.name}`,
                        )
                      }
                    />
                  );
                })}
              </div>
            </div>
            <div className='absolute bottom-0 w-full px-1.2 py-1.6'>
              <button
                type='button'
                className='w-full text-center text-19 font-bold py-1.2'
                onClick={onNextTab}
              >
                Bỏ qua
              </button>
              <Space h={20} />
              <Button
                type='button'
                className='!text-19'
                width={'full'}
                label='Xong'
                onClick={onCloseLifeStyleTab}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Edit;

interface LifeStyleItemProps {
  label: string;
  value?: string;
  icon: string;
  onClick: () => void;
}

const LifeStyleItem = ({ label, value, icon, onClick }: LifeStyleItemProps) => {
  return (
    <div
      onClick={onClick}
      className='flex items-center justify-between px-[24px] h-[52px] border-0 border-y border-solid border-gray-20 not-last:border-b-0 font-light bg-white group cursor-pointer'
    >
      <div className='flex items-center gap-0.5'>
        <img
          className='w-[24px] h-[24px] overflow-hidden object-cover object-center'
          src={icon}
          alt={label}
          draggable={false}
        />
        <span>{label}</span>
      </div>
      <p className='inline-flex items-center gap-0.8 text-text-secondary group-hover:text-primary'>
        <span className={`${!value ? 'opacity-50' : 'opacity-100'}`}>
          {value ? value : 'Trống'}
        </span>
        <ArrowLeftIcon
          width={12}
          className='rotate-180 text-gray-20 group-hover:text-primary'
        />
      </p>
    </div>
  );
};

interface InputProps {
  label: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ label, value, placeholder, onChange }: InputProps) => {
  const id = useId();
  return (
    <div>
      <label
        className='pl-0.8 pb-1 text-14 text-text-secondary font-semibold uppercase'
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className='w-full py-1.6 px-[24px] bg-white outline-none border-0 border-y border-solid border-gray-20 text-16 text-text-secondary text-light'
        id={id}
        type='text'
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};
