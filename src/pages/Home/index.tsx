import { apiCaller } from '@/service';
import { getAllUserFragment } from '@/service/user';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import HomeMobile from './HomeMobile';

import { useUserStore } from '@/store/user';

import CardBox from '@/components/CardController';
import Loading from '@/components/Loading';

import useMediaQuery from '@/hooks/useMediaQuery';

import { RESPONSIVE } from '@/common/constants/responsive';

import { GetAllUserArgs, User, UserResult } from '@/api-graphql';

const NUMBER_OF_CARDS = 3;
const SIZE_PER_PAGE = 10;

interface Props {}

const Home = ({}: Props) => {
  const [user] = useUserStore(s => [s.user]);

  const [data, setData] = useState<UserResult | null>(null);
  const [userList, setUserList] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isFirstLoad = useRef(true);
  const [prevUser, setPrevUser] = useState<User | null>(null);
  const [currUser, setCurrUser] = useState<User | null>(null);

  const isMobile = useMediaQuery({
    mediaQuery: `(max-width: ${RESPONSIVE.md}px)`,
  });

  useEffect(() => {
    const fetch = async () => {
      await getData();
    };
    fetch();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    const fetch = async () => {
      if (
        data &&
        data.totalCount! > 5 &&
        data.results!.length <= 3 &&
        !isLoading
      ) {
        await getData();
      }
    };
    fetch();
  }, [data, getData, isLoading]);

  useEffect(() => {
    if (data?.results && isFirstLoad.current) {
      setUserList(data?.results.slice(0, 2));
      setCurrUser(data?.results[1]);
      setData(prev => {
        return (
          prev && {
            totalCount: data.totalCount,
            results: prev.results!.slice(2),
          }
        );
      });
      isFirstLoad.current = false;
    }
  }, [data, isFirstLoad]);

  function fetchData() {
    const args: GetAllUserArgs = {
      pagination: {
        page: 1,
        size: SIZE_PER_PAGE,
      },
    };

    return apiCaller.getAllUser(getAllUserFragment).$args(args).$fetch();
  }

  useEffect(() => {
    console.log('userList', userList);
  }, [userList]);
  async function getData() {
    setIsLoading(true);
    const { totalCount, results } = await fetchData();
    setData({
      totalCount,
      results: results!.filter(user => !userList.some(u => u._id === user._id)),
    });
    setIsLoading(false);
  }

  const updateData = (type: 'like' | 'skip') => {
    if (!data) return;
    setUserList(prev => {
      const newData = [...prev];
      const duplicate = newData.filter(user =>
        data.results?.some(u => u?._id === user?._id),
      );

      const countDuplicate = duplicate.length;
      const nextUser = data.results![countDuplicate];
      if (prev.length < NUMBER_OF_CARDS) {
        newData.unshift(nextUser);
      } else {
        newData.pop();
        newData.unshift(nextUser);
      }
      setData(prev => {
        return (
          prev && {
            totalCount: prev.totalCount! - countDuplicate,
            results: prev.results!.slice(countDuplicate + 1),
          }
        );
      });

      if (type === 'like') {
        setCurrUser(newData[newData.length - 2]);
        setPrevUser(null);
      } else {
        setCurrUser(newData[newData.length - 2]);
        setPrevUser(newData[newData.length - 1]);
      }
      return newData;
    });
  };

  const onBack = useCallback(async () => {
    if (prevUser) {
      setData(prev => {
        return prev && { ...prev, results: [userList[0], ...prev.results!] };
      });

      setUserList(prev => {
        return prev.slice(1);
      });

      setPrevUser(null);
      setCurrUser(userList[userList.length - 1]);
      await apiCaller.unSkipUser().$args({ user_id: prevUser._id }).$fetch();
    }
  }, [data, prevUser, userList]);

  const onLike = useCallback(() => {
    updateData('like');
  }, [updateData]);

  const onNope = useCallback(() => {
    updateData('skip');
  }, [updateData]);

  const value: IHomeContext = useMemo(
    () => ({
      userList,
      currUser,
      prevUser,
      onLike,
      onNope,
      onBack,
    }),
    [userList, currUser, prevUser, onLike, onNope],
  );

  if (isMobile) return <HomeMobile />;
  return (
    <HomeContext.Provider value={value}>
      <div
        id='card-box'
        className='w-full h-full flex items-center justify-center overflow-hidden'
      >
        <div
          className={` ${
            isLoading && !data?.results?.length ? 'block' : 'hidden'
          }`}
        >
          <Loading image={user?.images?.[0]} />
        </div>
        <CardBox
          className={`${
            isLoading && !data?.results?.length ? 'hidden' : 'block'
          }`}
        />
      </div>
    </HomeContext.Provider>
  );
};

export default Home;

interface IHomeContext {
  userList: User[];
  currUser: User | null;
  prevUser: User | null;
  onLike: () => void;
  onNope: () => void;
  onBack: () => void;
}

const initState: IHomeContext = {
  userList: [],
  currUser: null,
  prevUser: null,
  onLike: () => {},
  onNope: () => {},
  onBack: () => {},
};

const HomeContext = createContext<IHomeContext>(initState);

export const useHomeContext = () => useContext(HomeContext);
