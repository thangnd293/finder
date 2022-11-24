import { useUserStore } from '@/store/user';

import { Navigate } from '@/components/react-router-dom/Navigate';

import { isTokenExpired } from '@/common/utils/isTokenExpired';

interface Props {
  children: React.ReactNode;
}
const AuthRoute = ({ children }: Props) => {
  const accessToken = useUserStore(s => s.accessToken);

  if (isTokenExpired(accessToken)) {
    return <Navigate to='/app' replace />;
  }

  return <>{children}</>;
};

export default AuthRoute;
