
import { apiCaller } from '@/service/index';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { useRegisterStore } from './store';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import Space from '@/components/Space';


import { useNavigate } from '@/hooks/useNavigate';

import { handleError } from '@/common/utils/handleError';

interface IFormData {
  email: string;
  otp?: number;
}

export const OtpModal = () => {

  const navigate = useNavigate();
  const email = useRegisterStore(s => s.email);

  const initialValues: IFormData = {
    email: email || '',
  };

  const validationSchema = Yup.object().shape({
    otp: Yup.number()
      .typeError('Vui lòng nhập số')
      .required('Vui lòng nhập OTP'),
  });

  const onSubmit = async (values: IFormData) => {
    try {
      const response = await apiCaller
        .confirmMail()
        .$args({ code: Number(values.otp!), email: values.email })
        .$fetch();

      if (response) {
        toast.success('Xác thực thành công ^^');
        navigate('/auth/login');
      }
    } catch (error) {
      handleError(error);
    }

    useRegisterStore.getState().clear();
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
                  placeholder='OTP của bạn'
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
