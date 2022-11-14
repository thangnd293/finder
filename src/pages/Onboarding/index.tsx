import { Formik } from 'formik';
import * as Yup from 'yup';

import Header from './Header';

import EmailIcon from '@/assets/svgs/EmailIcon';
import UserIcon from '@/assets/svgs/UserIcon';
import CheckBox from '@/components/CheckBox';
import DayInput from '@/components/DayInput';
import Input from '@/components/Input';
import RadioGroup from '@/components/RadioGroup';
import Space from '@/components/Space';

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
      name: Yup.string().required('Name is required'),
      birthDay: Yup.string().required('Vui lòng nhập ngày hợp lệ.'),
      gender: Yup.string().required('Gender is required'),
      showGender: Yup.boolean(),
      findGender: Yup.string().required(''),
      email: Yup.string().required('Vui lòng nhập email hợp lệ.'),
      //   .email('Email is invalid')
      //   .required('Email is required'),
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
              </div>
              <button type='submit'>submit</button>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Onboarding;
