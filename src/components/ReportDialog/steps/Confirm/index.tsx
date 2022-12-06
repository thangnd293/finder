import Container from '../Container';

import Textarea from '@/components/Textarea';

import { User } from '@/api-graphql';

interface Props {
  target: User;
  reason: string;
  detail: string;
  onChangeDetail: (detail: string) => void;
}

const Confirm = ({ target, reason, detail, onChangeDetail }: Props) => {
  return (
    <Container title={`Báo cáo ${target.username}`}>
      <p className='my-2 text-18 text-center text-text-secondary font-light'>
        Chúng tôi quan tâm tới bạn và những điều bạn muốn nói. Vì sự an toàn của
        bạn, những điều bạn chia sẻ với chúng tôi ở đây sẽ được bảo mật.
      </p>
      <h3 className='text-24 font-semibold'>Xem lại báo cáo của bạn</h3>
      <h4 className='w-full my-1.2 text-18 font-semibold text-left'>
        Lý do báo cáo của tôi:
      </h4>
      <p className='w-full p-1.4 mb-2.5 text-18 text-text-secondary font-semibold text-left border-0 border-b border-solid border-gray-60'>
        {reason}
      </p>
      <h4 className='w-full my-1.2 text-18 font-semibold text-left'>
        Nhận xét kèm theo:
      </h4>
      <Textarea
        className={`w-full p-0.8 text-16 text-base font-light outline-none resize-none scroll-hidden border-2 border-solid border-gray-20 rounded-2`}
        placeholder='Vui lòng cung cấp thêm thông tin chi tiết về điều bạn báo cáo.'
        spellCheck='false'
        rows={5}
        maxRows={10}
        value={detail}
        onChange={e => {
          onChangeDetail(e.target.value);
        }}
      />
    </Container>
  );
};

export default Confirm;
