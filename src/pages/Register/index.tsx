import { useLoadingStore } from '@/api-graphql';
import { Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

import { apiCaller } from '../../service/index';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Space from '@/components/Space';

interface IFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface Props {}

const Register = ({}: Props) => {
  const signUpLoading = useLoadingStore(s => s.signUpLoading);
  const [isVisible, setIsVisible] = useState(false);

  const initialValues: IFormData = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape<{ [K in keyof IFormData]: any }>({
    email: Yup.string()
      .email('Email không hợp lệ')
      .required('Email không được để trống'),
    password: Yup.string().required('Mật khẩu không được để trống'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Mật khẩu không trùng',
    ),
  });

  const onSubmit = async ({ email, password, confirmPassword }: IFormData) => {
    const response = await apiCaller
      .signUp()
      .$args({
        input: { email, password, confirmPassword },
      })
      .$fetch();
  };
  console.log({ signUpLoading });

  return (
    <div className='p-5'>
      <h1 className='max-w-[70%]mx-auto text-32 text-text-secondary text-center font-semibold'>
        Sẵn sàng cho những người bạn mới
      </h1>
      <Space h={30} />
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className='space-y-2'>
            <Input
              width='full'
              label='Email'
              name='email'
              placeholder='VD: thangnd@gmail.com'
            />
            <Input
              width='full'
              label='Mật khẩu'
              name='password'
              placeholder='VD: m@tkh@u123'
            />
            <Input
              width='full'
              label='Nhập lại mật khẩu'
              name='confirmPassword'
              placeholder='VD: m@tkh@u123'
            />

            <div className='w-fit mx-auto'>
              <Button loading={signUpLoading} label='Đăng kí' />
            </div>
          </form>
        )}
      </Formik>
      <div className='mt-2 flex flex-col items-center justify-center gap-1'>
        <hr className='w-10 border-gray-20' />
        <span>Hoặc</span>
        <hr className='w-10 border-gray-20' />
      </div>
    </div>
  );
};

export default Register;
