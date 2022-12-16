import { Formik } from 'formik';
import * as Yup from 'yup';

import { GoogleLogin } from '@/pages/Login/GoogleLogin';

import { signIn } from '@/store/auth';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Space from '@/components/Space';
import { Link } from '@/components/react-router-dom/Link';

import { useNavigate } from '@/hooks/useNavigate';

import { PATH } from '@/common/constants/route';
import { handleError } from '@/common/utils/handleError';

import { useLoadingStore } from '@/api-graphql';

interface IFormData {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const signInLoading = useLoadingStore(s => s.signInLoading);
  const initialValues: IFormData = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape<{ [K in keyof IFormData]: any }>({
    email: Yup.string()
      .email('Email không hợp lệ')
      .required('Email không được để trống'),
    password: Yup.string().required('Mật khẩu không được để trống'),
  });

  const onSubmit = async (values: IFormData) => {
    try {
      const response = await signIn({ input: values });

      if (response) {
        navigate(PATH.APP.HOME);
      }
    } catch (error) {
      handleError(error);
    }
  };

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
              type='password'
              width='full'
              label='Mật khẩu'
              name='password'
              placeholder='VD: m@tkh@u123'
            />
            <div className='flex justify-between'>
              <Link to='/auth/forgot'>
                <p className='font-bold text-gray-50'>Quên mật khẩu ?</p>
              </Link>
              <Link to='/auth/register'>
                <p className='font-bold text-gray-50'>Tạo tài khoản mới</p>
              </Link>
            </div>

            <div className='w-fit mx-auto'>
              <Button loading={signInLoading} label='Đăng nhập' />
            </div>
          </form>
        )}
      </Formik>
      <div className='mt-2 flex flex-col items-center justify-center gap-1'>
        <hr className='w-10 border-gray-20' />
        <span>Hoặc</span>
        <hr className='w-10 border-gray-20' />
        <div className='flex flex-col gap-1'>
          <GoogleLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
