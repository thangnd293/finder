import Container from '../Container';

import FlagIcon from '@/assets/svgs/FlagIcon';
import HeartIcon from '@/assets/svgs/HeartIcon';

import { User } from '@/api-graphql';

interface Props {
  target: User;
}

const Alert = ({ target }: Props) => {
  return (
    <Container title={`Báo cáo ${target.username}`}>
      <div className='mt-2 flex items-start gap-1.6'>
        <HeartIcon width={18} height={18} color='black' className='shrink-0' />
        <p className='text-18 font-light'>
          Chúng tôi quan tâm tới bạn và những điều bạn muốn nói. Vì sự an toàn
          của bạn, những điều bạn chia sẻ với chúng tôi ở đây sẽ được bảo mật.
        </p>
      </div>

      <div className='mt-3 flex items-start gap-1.6'>
        <FlagIcon width={18} height={18} color='black' className='shrink-0' />
        <p className='text-18 font-light'>
          Nếu bạn đang gặp nguy hiểm, hãy gọi ngay cho nhà chức trách địa
          phương.
        </p>
      </div>
    </Container>
  );
};

export default Alert;
