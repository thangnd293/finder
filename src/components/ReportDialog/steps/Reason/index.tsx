import Container from '../Container';

interface Props {
  reason?: string;
  onChoose: (reason: string) => void;
}

const Reason = ({ reason: reasonSelected, onChoose }: Props) => {
  return (
    <Container title='Lý do báo cáo của bạn là gì?'>
      <ul className='mt-6 mb-3 w-full list-none'>
        {REASONS.map(reason => (
          <li key={reason.id}>
            <button
              className={`block w-full p-1.2 rounded-4 text-18 font-medium text-text-secondary text-left hover:bg-gray-10 
              ${!reasonSelected && reason.isTitle ? 'bg-gray-10' : ''} 
              ${reason.isTitle ? 'cursor-auto' : ''}
              ${
                reason.content === reasonSelected
                  ? 'bg-gray-10 text-base font-semibold'
                  : ''
              }
              `}
              onClick={() => {
                !reason.isTitle && onChoose(reason.content);
              }}
            >
              {reason.content}
            </button>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default Reason;

const REASONS = [
  {
    id: 1,
    content: 'Vui lòng chọn một lý do',
    isTitle: true,
  },
  {
    id: 2,
    content: 'Đây là hồ sơ giả mạo',
    isTitle: false,
  },
  {
    id: 3,
    content: 'Có ảnh khỏa thân hoặc nội dung khiêu dâm',
    isTitle: false,
  },
  {
    id: 4,
    content: 'Có người đang chào bán thứ gì đó',
    isTitle: false,
  },
  {
    id: 5,
    content: 'Hành vi lạm dụng hoặc đe dọa',
    isTitle: false,
  },
  {
    id: 6,
    content: 'Đã xảy ra tổn hại thể chất trực tiếp',
    isTitle: false,
  },
];
