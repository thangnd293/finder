import { Formik } from 'formik';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import * as Yup from 'yup';

import HobbiesDialog from './Dialogs/HobbiesDialog';
import Header from './Header';

import EmailIcon from '@/assets/svgs/EmailIcon';
import UserIcon from '@/assets/svgs/UserIcon';
import Button from '@/components/Button';
import CheckBox from '@/components/CheckBox';
import DayInput from '@/components/DayInput';
import Input from '@/components/Input';
import PersonalityType from '@/components/PersonalityType';
import RadioGroup from '@/components/RadioGroup';
import Space from '@/components/Space';
import { UploadImageGroup } from '@/components/UploadImageGroup';

interface FormData {
  name: string;
  birthDay: string;
  gender: string;
  showGender: boolean;
  findGender: string;
  email: string;
  // hobbies: string[];
  // images: string[];
}

const GENDER = [
  {
    id: '1',
    label: 'Nam',
  },
  {
    id: '2',
    label: 'Nữ',
  },
  {
    id: '3',
    label: 'Khác',
  },
];

const FIND_GENDER = [
  {
    id: '1',
    label: 'Nam',
  },
  {
    id: '2',
    label: 'Nữ',
  },
  {
    id: '3',
    label: 'Mọi người',
  },
];

interface Props {}

const Onboarding = ({}: Props) => {
  const location = useLocation();
  const query = useMemo(() => new URLSearchParams(location.search), [location]);

  useEffect(() => {
    try {
      const token = query.get('token');
      if (!token) return;
      const jwt = jwtDecode<JwtPayload>(token);
      console.log(jwt);
    } catch (error) {}
  }, [query]);

  const [hobbies, setHobbies] = useState<string[]>([]);

  const onHobbiesChange = (values: string[]) => {
    setHobbies(values);
  };

  const initialValues: FormData = {
    name: '',
    birthDay: '',
    gender: '',
    showGender: true,
    findGender: '',
    email: '',
    // hobbies: [],
    // images: [],
  };

  const validationSchema = Yup.object().shape<{ [key in keyof FormData]: any }>(
    {
      name: Yup.string().required('Tên phải chứa từ 1 đến 22 ký tự.'),
      birthDay: Yup.string().required('Vui lòng nhập ngày hợp lệ.'),
      gender: Yup.string().required('Vui lòng chọn giới tính của bạn.'),
      showGender: Yup.boolean(),
      findGender: Yup.string().required(
        'Vui lòng chọn giới tính bạn muốn tìm kiếm.',
      ),
      email: Yup.string()
        .email('Vui lòng nhập email hợp lệ.')
        .required('Vui lòng nhập email hợp lệ.'),
      // hobbies: Yup.array().required('Hobbies are required'),
      // images: Yup.array().required('Images are required'),
    },
  );

  const handleSubmit = (values: FormData) => {
    console.log(values);
  };

  return (
    <>
      <Header />
      <div className='w-full max-w-[900px] mx-auto'>
        <h1 className='py-[36px] text-center text-32 font-bold uppercase'>
          Tạo tài khoản
        </h1>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {props => (
            <form onSubmit={props.handleSubmit}>
              <div className='grid grid-cols-2 gap-6.5'>
                <div>
                  <Input
                    name={'name'}
                    label={'Tên'}
                    placeholder={'Tên'}
                    icon={<UserIcon />}
                    width={'full'}
                  />
                  <Space h={28} />
                  <DayInput name='birthDay' label={'Sinh nhật'} />
                  <Space h={28} />
                  <RadioGroup
                    name={'gender'}
                    label={'Giới tính'}
                    options={GENDER}
                  />
                  <Space h={12} />
                  <CheckBox
                    name={'showGender'}
                    title={'Hiển thị giới tính trên hồ sơ của tôi'}
                  />
                  <Space h={28} />
                  <RadioGroup
                    name={'findGender'}
                    label={'Hiển thị cho tôi'}
                    options={FIND_GENDER}
                  />
                  <Space h={28} />
                  <Input
                    name={'email'}
                    label={'Địa chỉ Email'}
                    placeholder={'Địa chỉ Email'}
                    icon={<EmailIcon />}
                    width={'full'}
                  />
                </div>
                <div>
                  <p className='block mb-1 text-16 font-semibold'>Ảnh hồ sơ</p>
                  <UploadImageGroup
                    itemClassName='h-[176px] w-[130px] gap-x-1 gap-y-2'
                    data={[]}
                    length={6}
                    onChange={data => {
                      console.log(data);
                    }}
                  />
                </div>
              </div>
              <Space h={25} />
              <div className='flex items-center justify-center'>
                <hr className='w-20 border-gray-20' />
                <h2 className='text-20 font-bold px-7'>Tùy chọn</h2>
                <hr className='w-20 border-gray-20' />
              </div>
              <HobbiesDialog values={hobbies} onChangeValue={onHobbiesChange} />
              <Space h={20} />
              <div className='flex wrap gap-0.4'>
                {hobbies.map((hobbit, index) => (
                  <PersonalityType key={index} text={hobbit} />
                ))}
              </div>
              <Space h={40} />
              <div className='w-fit mx-auto'>
                <Button
                  className='uppercase'
                  type='submit'
                  label={'Tiếp tục'}
                />
              </div>
              <Space h={55} />
              <div className='text-center'>
                <Link to={''}>
                  <a className='text-16 text-text-secondary active:underline decoration-2 hover:text-base  font-semibold uppercase'>
                    Đã có tài khoản? Đăng nhập.
                  </a>
                </Link>
              </div>
              <Space h={90} />
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Onboarding;
