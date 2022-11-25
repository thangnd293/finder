import { Tag } from '@/api-graphql';
import { GenderEnum, LookingFor } from '@/api-graphql';
import { apiCaller } from '@/service/index';
import { getUserCurrentFragment } from '@/service/user';
import { Formik } from 'formik';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import * as Yup from 'yup';

import HobbiesDialog from './Dialogs/HobbiesDialog';

import { useUserStore } from '@/store/user';

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
import { Navigate } from '@/components/react-router-dom/Navigate';

import { useNavigate } from '@/hooks/useNavigate';

import { dataURLtoFile } from '@/common/utils/dataURLtoFile';

type Gender = GenderEnum | 'DEFAULT';

interface FormData {
  username: string;
  birthDays: string;
  gender: Gender;
  showGender: boolean;
  findGender: LookingFor;
  email: string;
  tags?: Tag[];
  images?: string[];
}

const GENDER: Array<{ id: GenderEnum | 'DEFAULT'; label: string }> = [
  {
    id: GenderEnum.Male,
    label: 'Nam',
  },
  {
    id: GenderEnum.Female,
    label: 'Nữ',
  },
  {
    id: 'DEFAULT',
    label: 'Khác',
  },
];

const FIND_GENDER: Array<{ id: LookingFor; label: string }> = [
  {
    id: LookingFor.Men,
    label: 'Nam',
  },
  {
    id: LookingFor.Women,
    label: 'Nữ',
  },
  {
    id: LookingFor.All,
    label: 'Mọi người',
  },
];

interface Props {}

const Onboarding = ({}: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = useMemo(() => new URLSearchParams(location.search), [location]);
  const user = useUserStore(s => s.user);

  if (user && !user.isFirstLogin) {
    return <Navigate to='/app' replace />;
  }

  useEffect(() => {
    try {
      const token = query.get('token');
      if (!token) return;
      const jwt = jwtDecode<JwtPayload>(token);
      console.log(jwt);
    } catch (error) {}
  }, [query]);

  const initialValues: FormData = {
    username: 'Phạm Minh Phát',
    birthDays: '2001-04-28',
    gender: GenderEnum.Male,
    showGender: true,
    findGender: LookingFor.Women,
    email: user?.email || '',
    tags: [],
    images: [],
  };

  const validationSchema = Yup.object().shape<{ [key in keyof FormData]: any }>(
    {
      username: Yup.string().required('Tên phải chứa từ 1 đến 22 ký tự.'),
      birthDays: Yup.string().required('Vui lòng nhập ngày hợp lệ.'),
      gender: Yup.string().required('Vui lòng chọn giới tính của bạn.'),
      showGender: Yup.boolean(),
      findGender: Yup.string().required(
        'Vui lòng chọn giới tính bạn muốn tìm kiếm.',
      ),
      email: Yup.string()
        .email('Vui lòng nhập email hợp lệ.')
        .required('Vui lòng nhập email hợp lệ.'),
    },
  );

  const handleSubmit = async ({
    birthDays,
    email,
    findGender,
    gender,
    showGender,
    username,
    images,
    tags,
  }: FormData) => {
    try {
      const awaitArray = images?.map(value => {
        if (!value.includes('data:')) return value;
        const file = dataURLtoFile(value, uuid());

        return apiCaller
          .uploadFile()
          .$args({
            file,
          })
          .$fetch();
      });
      if (!awaitArray) return;

      const imagesCdn = Promise.all(awaitArray);
      toast.promise(imagesCdn, {
        pending: 'Đang upload image...',
        error: 'Upload thất bại',
        success: 'Upload image thành công ^^',
      });

      const updateData = apiCaller
        .updateProfile()
        .$args({
          input: {
            birthDays,
            username,
            tags: tags?.map(value => value._id),
            gender: gender as any,
            images: await imagesCdn,
            isFirstLogin: false,
          },
        })
        .$fetch();

      const updateSetting = apiCaller
        .changeSetting()
        .$args({ input: { discovery: { lookingFor: findGender } } })
        .$fetch();

      toast.promise(Promise.all([updateData, updateSetting]), {
        pending: 'Đang lưu dữ liệu...',
        error: 'Lưu dữ liệu thất bại',
        success: 'Lưu dữ liệu thành công ^^',
      });

      const user = await apiCaller
        .getCurrentUser(getUserCurrentFragment)
        .$fetch();

      useUserStore.getState().setUser(user);
      navigate('/app');
    } catch (error) {}
  };

  return (
    <>
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
                    name='username'
                    label='Tên'
                    placeholder='Tên'
                    icon={<UserIcon />}
                    width='full'
                  />
                  <Space h={28} />
                  <DayInput name='birthDays' label='Sinh nhật' />
                  <Space h={28} />
                  <RadioGroup
                    name='gender'
                    label='Giới tính'
                    options={GENDER}
                  />
                  <Space h={12} />
                  <CheckBox
                    name='showGender'
                    title='Hiển thị giới tính trên hồ sơ của tôi'
                  />
                  <Space h={28} />
                  <RadioGroup
                    name='findGender'
                    label='Hiển thị cho tôi'
                    options={FIND_GENDER}
                  />
                  <Space h={28} />
                  <Input
                    name='email'
                    label='Địa chỉ Email'
                    placeholder='Địa chỉ Email'
                    icon={<EmailIcon />}
                    width='full'
                    disabled
                  />
                </div>
                <div>
                  <p className='block mb-1 text-16 font-semibold'>Ảnh hồ sơ</p>
                  <UploadImageGroup
                    name='images'
                    itemClassName='h-[176px] w-[130px] gap-x-1 gap-y-2'
                    length={6}
                  />
                </div>
              </div>
              <Space h={25} />
              <div className='flex items-center justify-center'>
                <hr className='w-20 border-gray-20' />
                <h2 className='text-20 font-bold px-7'>Tùy chọn</h2>
                <hr className='w-20 border-gray-20' />
              </div>
              <HobbiesDialog name='tags' />
              <Space h={20} />
              <div className='flex wrap gap-0.4'>
                {props.values.tags?.map((hobbit, index) => (
                  <PersonalityType key={index} tag={hobbit} />
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
