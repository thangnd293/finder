import { User } from '@/api-graphql';
import { apiCaller } from '@/service/index';
import { getUsersMatchedFragment } from '@/service/user';
import { useEffect, useState } from 'react';

import Container from '../Container';

import CheckIcon from '@/assets/svgs/CheckIcon';

interface Props {
  target?: User;
  onChoose: (user: User) => void;
}

const PickUser = ({ target, onChoose }: Props) => {
  const [userMatched, setUserMatched] = useState<User[]>([]);

  useEffect(() => {
    const fetchUserMatched = async () => {
      const data = await apiCaller
        .getAllUserMatched(getUsersMatchedFragment)
        .$args({})
        .$fetch();
      const users = data.results?.map(item => item.user);
      setUserMatched(users || []);
    };

    fetchUserMatched();
  }, []);

  return (
    <Container title='Báo cáo ai đó'>
      <p className='my-1.6 text-18 font-light text-center'>
        Hãy cho chúng tôi biết người bạn muốn báo cáo. Dưới đây là các tương hợp
        gần đây của bạn.
      </p>
      <div className='w-full flex flex-col'>
        {userMatched?.map(u => (
          <UserItem
            key={u._id}
            avatar={u.images?.[0]}
            name={u.username!}
            isActive={target?._id === u._id}
            onClick={() => onChoose(u)}
          />
        ))}
      </div>
    </Container>
  );
};

export default PickUser;

interface IUserItemProps {
  avatar?: string;
  name: string;
  isActive?: boolean;
  onClick: () => void;
}

const UserItem = ({ avatar, name, isActive, onClick }: IUserItemProps) => {
  return (
    <div
      className='w-full h-[52px] my-1.2 flex items-center gap-1'
      onClick={onClick}
    >
      <div
        className={`aspect-square h-[52px] rounded-full bg-cover bg-center outline outline-2 outline-offset-2 ${
          isActive ? 'outline-primary' : 'outline-transparent'
        }`}
        style={{
          backgroundImage: `url('${avatar}')`,
        }}
      ></div>
      <p className='h-full flex-1 flex items-center justify-between text-16 text-gray-50 font-semibold border-0 border-b border-solid border-gray-20'>
        <span>{name}</span>
        {isActive && (
          <CheckIcon width={20} height={20} className='text-primary mr-3' />
        )}
      </p>
    </div>
  );
};
