import { apiCaller } from '@/service/index';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { useForgotStore } from '@/pages/ForgotPasword/store';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import Space from '@/components/Space';

import { useNavigate } from '@/hooks/useNavigate';

import { handleError } from '@/common/utils/handleError';

interface IFormData {
  email: string;
  otp?: number;
  password?: string;
  confirmPassword?: string;
}

export const OtpModal = () => {
  const navigate = useNavigate();
  const email = useForgotStore(s => s.email);

  const initialValues: IFormData = {
    email: email || '',
  };

  const validationSchema = Yup.object().shape({
    otp: Yup.number()
      .typeError('Vui lòng nhập số')
      .required('Vui lòng nhập OTP'),
    password: Yup.string().required('Mật khẩu không được để trống'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Mật khẩu không trùng',
    ),
  });

  const onSubmit = async ({
    email,
    confirmPassword,
    otp,
    password,
  }: IFormData) => {
    try {
      if (!confirmPassword || !password) return;
      const response = await apiCaller
        .resetPassword()
        .$args({
          input: {
            code: String(otp!),
            email: email,
            confirmPassword,
            password,
          },
        })
        .$fetch();

      if (response) {
        toast.success('Đổi mật khẩu thành công ^^');
        useForgotStore.getState().clear();
        navigate('/auth/login');
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <Modal visible={Boolean(email)}>
        <div className='p-5'>
          <h1 className='max-w-[70%]mx-auto text-32  text-center font-semibold'>
            Vui lòng nhập mã OTP của bạn
          </h1>
          <p className='text-text-secondary'>
            Nếu không nhận được email từ hộp thư. Vui lòng kiểm tra hộp thư spam
          </p>
          <Space h={30} />
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className='space-y-2'>
                <Input placeholder='' width='full' name='email' hidden />
                <Input
                  width='full'
                  label='OTP'
                  name='otp'
                  autoComplete='false'
                  placeholder='OTP của bạn'
                />
                <Input
                  width='full'
                  label='Email'
                  name='email'
                  disabled
                  placeholder='VD: thangnd@gmail.com'
                />
                <Input
                  width='full'
                  label='Mật khẩu'
                  name='password'
                  type='password'
                  placeholder='VD: m@tkh@u123'
                />
                <Input
                  width='full'
                  label='Nhập lại mật khẩu'
                  name='confirmPassword'
                  type='password'
                  placeholder='VD: m@tkh@u123'
                />
                <div className='w-fit mx-auto'>
                  <Button label='Xác thực' />
                </div>
              </form>
            )}
          </Formik>
        </div>
      </Modal>
    </>
  );
};
