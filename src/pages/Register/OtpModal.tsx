import { Formik } from 'formik';
import * as Yup from 'yup';

import { useRegisterStore } from './store';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import Space from '@/components/Space';

interface IFormData {
  email: string;
  otp?: number;
}

export const OtpModal = () => {
  const email = useRegisterStore(s => s.email);

  const initialValues: IFormData = {
    email: '',
  };

  const validationSchema = Yup.object().shape({
    otp: Yup.number().required('Vui lòng nhập OTP'),
  });

  const onSubmit = (values: IFormData) => {
    useRegisterStore.getState().setEmail(null);
  };

  return (
    <>
      <Modal visible={!!email}>
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
          <div className='mt-2 flex flex-col items-center justify-center gap-1'>
            <hr className='w-10 border-gray-20' />
            <span>Hoặc</span>
            <hr className='w-10 border-gray-20' />
          </div>
        </div>
      </Modal>
    </>
  );
};
