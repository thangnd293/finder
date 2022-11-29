import Container from '../Container';

import Textarea from '@/components/Textarea';

interface Props {
  detail: string;
  onChange: (detail: string) => void;
}

const Detail = ({ detail, onChange }: Props) => {
  return (
    <Container title='Bạn có thể chia sẻ thêm chi tiết với chúng tôi được không?'>
      <h3 className='w-full my-1.2 text-18 font-semibold text-left'>
        Thêm nhận xét
      </h3>
      <Textarea
        className={`w-full p-0.8 text-16 text-base font-light outline-none resize-none scroll-hidden border-2 border-solid border-gray-20 rounded-2`}
        placeholder='Vui lòng cung cấp thêm thông tin chi tiết về điều bạn báo cáo.'
        spellCheck='false'
        rows={5}
        maxRows={10}
        value={detail}
        onChange={e => {
          onChange(e.target.value);
        }}
      />
      <p className='mt-2 text-14 w-full text-left'>Số ký tự tối thiểu: 5</p>
    </Container>
  );
};

export default Detail;
