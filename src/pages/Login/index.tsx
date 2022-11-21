import { Formik } from 'formik';
import * as Yup from 'yup';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Space from '@/components/Space';

interface IFormData {
  email: string;
  password: string;
}

interface Props {}

const Login = ({}: Props) => {
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

  const handleSubmit = (values: IFormData) => {
    console.log(values);
  };

  return (
    <div className='p-5'>
      <h1 className='max-w-[70%]mx-auto text-32 text-text-secondary text-center font-semibold'>
        Sẵn sàng cho những người bạn mới
      </h1>
      <Space h={30} />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {props => (
          <form onSubmit={props.handleSubmit} className='space-y-2'>
            <Input
              width='full'
              label={'Email'}
              name={'email'}
              placeholder={'VD: thangnd@gmail.com'}
            />
            <Input
              width='full'
              label={'Mật khẩu'}
              name={'password'}
              placeholder={'VD: m@tkh@u123'}
            />
            <div className='w-fit mx-auto'>
              <Button label='Đăng nhập' />
            </div>
          </form>
        )}
      </Formik>
      <div className='mt-2 flex items-center justify-center gap-1'>
        <hr className='w-10 border-gray-20' />
        <span>Hoặc</span>
        <hr className='w-10 border-gray-20' />
      </div>
    </div>
  );
};

export default Login;
