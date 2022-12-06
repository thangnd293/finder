import { useAuthStore } from '@/store/auth';
import { useUserStore } from '@/store/user';

import { Navigate } from '@/components/react-router-dom/Navigate';

import { isTokenExpired } from '@/common/utils/isTokenExpired';

interface Props {
  children: React.ReactNode;
}
const PrivateRoute = ({ children }: Props) => {
  const [accessToken] = useAuthStore(s => [s.accessToken]);
  const [user] = useUserStore(s => [s.user]);

  console.log({ user });

  if (!isTokenExpired(accessToken)) {
    return <Navigate to='/auth/login' replace />;
  }

  if (user && user.isFirstLogin) {
    return <Navigate to='/app/onboarding' replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
