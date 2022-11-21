import { ChangeEvent, useState } from 'react';

import SettingFieldLink from '@/components/SettingFieldLink';
import Slider from '@/components/Slider';
import Switch from '@/components/Switch';

import { PATH } from '@/common/constants/route';

const MIN_KM = 2;
const MAX_KM = 100;
const STEP_KM = 2;
const DEFAULT_KM = 20;
const MIN_AGE = 18;
const MAX_AGE = 100;
const STEP_AGE = 1;
const DEFAULT_AGE = [18, 30];

interface Props {}

const ProfilePanel = ({}: Props) => {
  const [near, setNear] = useState([DEFAULT_KM]);
  const [ages, setAges] = useState(DEFAULT_AGE);
  const [isOnlyShowInRange, setIsOnlyShowInRange] = useState(false);
  const [isOnlyShowInAges, setIsOnlyShowInAges] = useState(false);

  return (
    <div className='flex flex-col w-full h-full'>
      <div className='flex-1'>
        <h2 className='px-1.6 py-0.8 font-semibold text-14 text-text-secondary uppercase'>
          Cài đặt Tìm Kiếm
        </h2>
        <SettingFieldLink
          to={PATH.APP.SETTING.TEST_1}
          label='Địa điểm'
          value='Binh Duong'
        />
        <SettingFieldSlider
          label={'Khoảng cách Ưu tiên'}
          text={`${near} km`}
          min={MIN_KM}
          max={MAX_KM}
          step={STEP_KM}
          defaultValues={near}
          onChange={values => setNear(values)}
          isChecked={isOnlyShowInRange}
          onChangeChecked={e => setIsOnlyShowInRange(e.target.checked)}
        />
        <SettingFieldLink
          to={PATH.APP.SETTING.GENDER}
          label='Đang tìm kiếm'
          value='Nữ'
        />
        <SettingFieldSlider
          label={'Độ tuổi Ưu tiên'}
          text={`${ages[0]} - ${ages[1]}`}
          min={MIN_AGE}
          max={MAX_AGE}
          step={STEP_AGE}
          defaultValues={ages}
          onChange={values => setAges(values)}
          isChecked={isOnlyShowInAges}
          onChangeChecked={e => setIsOnlyShowInAges(e.target.checked)}
        />
      </div>
      <button className='w-full h-[52px] text-center align-middle bg-white text-16 border-0 border-y border-solid border-gray-20'>
        Đăng xuất
      </button>
    </div>
  );
};

export default ProfilePanel;

interface SettingFieldSliderProps {
  label: string;
  text: string;
  min: number;
  max: number;
  step: number;
  defaultValues: number[];
  onChange: (values: number[]) => void;
  isChecked: boolean;
  onChangeChecked: (e: ChangeEvent<HTMLInputElement>) => void;
}
const SettingFieldSlider = ({
  label,
  text,
  min,
  max,
  step,
  defaultValues,
  onChange,
  isChecked,
  onChangeChecked,
}: SettingFieldSliderProps) => {
  return (
    <div className='px-1.6 py-1.4 border-0 border-y border-solid border-gray-20 not-last:border-b-0 bg-white'>
      <p className='flex items-center justify-between'>
        <span className='text-16'>{label}</span>
        <span className='text-text-secondary'>{text}</span>
      </p>
      <Slider
        className='py-2'
        min={min}
        max={max}
        step={step}
        defaultValues={defaultValues}
        onChange={onChange}
      />
      <div className='flex items-center justify-between'>
        <p>Chỉ hiện người trong giới hạn này</p>
        <Switch checked={isChecked} onChange={onChangeChecked} />
      </div>
    </div>
  );
};
