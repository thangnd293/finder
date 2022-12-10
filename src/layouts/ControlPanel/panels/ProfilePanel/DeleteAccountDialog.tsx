import { apiCaller } from '@/service';
import { Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

import { useAuthStore } from '@/store/auth';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import Space from '@/components/Space';

interface IFormData {
  email: string;
  otp: string;
}

interface IDeleteAccountDialogProps {
  onClose: () => void;
}

const DeleteAccountDialog = ({ onClose }: IDeleteAccountDialogProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { logout } = useAuthStore();
  const initialValues: IFormData = {
    email: '',
    otp: '',
  };

  const onSubmit = async (values: IFormData) => {
    setIsDeleting(true);
    await apiCaller
      .confirmDeleteAccount()
      .$args({
        code: +values.otp,
        email: values.email,
      })
      .$fetch();
    setIsDeleting(false);
    onClose();
    logout();
  };

  const validateSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email không hợp lệ')
      .required('Vui lòng nhập email'),
    otp: Yup.string()
      .matches(/^[0-9]+$/, 'OTP gồm 6 chữ số')
      .length(6, 'OTP gồm 6 chữ số')
      .required('Vui lòng nhập OTP'),
  });

  return (
    <Modal className='p-5' visible={true} onClose={onClose}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validateSchema}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <h1 className='text-center text-32 font-bold'>
              Vui lòng nhập thông tin xác thực của bạn
            </h1>
            <p className='mt-0.5 mb-3 text-text-secondary'>
              Nếu không nhận được email từ hộp thư. Vui lòng kiểm tra hộp thư
              spam
            </p>
            <Input
              width={'full'}
              label='Email'
              name={'email'}
              placeholder={'dthang2509@gmail.com'}
            />
            <Space h={10} />
            <Input
              width={'full'}
              label='OTP'
              name={'otp'}
              placeholder={'123456'}
            />
            <div className='mt-2 w-fit mx-auto'>
              <Button loading={isDeleting} type='submit' label={'Xác nhận'} />
            </div>
          </form>
        )}
      </Formik>
    </Modal>
  );
};

export default DeleteAccountDialog;
