import { apiCaller } from '@/service';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { OtpModal } from './OtpModal';

import { useForgotStore } from '@/pages/ForgotPasword/store';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Space from '@/components/Space';

import { handleError } from '@/common/utils/handleError';

import { useLoadingStore } from '@/api-graphql';

interface IFormData {
  email: string;
}

const Forgot = () => {
  const forgotPasswordLoading = useLoadingStore(s => s.forgotPasswordLoading);

  const initialValues: IFormData = {
    email: '',
  };

  const validationSchema = Yup.object().shape<{ [K in keyof IFormData]: any }>({
    email: Yup.string()
      .email('Email không hợp lệ')
      .required('Email không được để trống'),
  });

  const onSubmit = async ({ email }: IFormData) => {
    try {
      const response = await apiCaller
        .forgotPassword()
        .$args({
          email,
        })
        .$fetch();

      if (!response) return;

      useForgotStore.getState().setEmail(email);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <div className='p-5'>
        <h1 className='max-w-[70%]mx-auto text-32 text-text-secondary text-center font-semibold'>
          Tìm lại tài khoản để tiếp tục cuộc vui
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
              <div className='flex justify-end'>
                <Link to='/auth/login'>
                  <p className='font-bold text-gray-50'>
                    Đã có tài khoản? Đăng nhập ngay
                  </p>
                </Link>
              </div>
              <div className='w-fit mx-auto'>
                <Button loading={forgotPasswordLoading} label='Tìm kiếm' />
              </div>
            </form>
          )}
        </Formik>
      </div>
      <OtpModal />
    </>
  );
};

export default Forgot;
