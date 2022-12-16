import SocketIO from '@/socket';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useAuthStore } from '@/store/auth';
import { useUserStore } from '@/store/user';

import { Navigate } from '@/components/react-router-dom/Navigate';

import { isTokenExpired } from '@/common/utils/isTokenExpired';

interface Props {
  children: React.ReactNode;
}
const PrivateRoute = ({ children }: Props) => {
  const location = useLocation();
  const accessToken = useAuthStore(s => s.accessToken);
  const user = useUserStore(s => s.user);

  useEffect(() => {
    if (!accessToken) return;
    SocketIO.getInstance(accessToken).connect();
    return () => {
      SocketIO.getInstance(accessToken).disconnect();
    };
  }, [accessToken]);

  if (!isTokenExpired(accessToken)) {
    return <Navigate to='/auth/login' replace />;
  }

  if (user && user.isFirstLogin) {
    if (location.pathname !== '/app/onboarding') {
      return <Navigate to='/app/onboarding' replace />;
    }
  }

  return <>{children}</>;
};

export default PrivateRoute;
