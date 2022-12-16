import { apiCaller } from '@/service';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { IResolveParams, LoginSocialGoogle } from 'reactjs-social-login';

import { setSession } from '@/store/auth';

import { handleError } from '@/common/utils/handleError';

const REDIRECT_URI = 'https://finder-khaki.vercel.app/';
export const GoogleLogin = () => {
  return (
    <LoginSocialGoogle
      client_id={
        '932236876877-65ekiuesm8j04oe41sn2b5jff3hc1ra2.apps.googleusercontent.com'
      }
      redirect_uri={REDIRECT_URI}
      scope='openid profile email'
      discoveryDocs='claims_supported'
      access_type='offline'
      onResolve={async ({ data }: IResolveParams) => {
        try {
          if (!data?.access_token) return;
          const { accessToken, refreshToken } = await apiCaller
            .verifyTokenGoogle(['accessToken', 'refreshToken'])
            .$args({ token: data.access_token })
            .$fetch();

          setSession({ accessToken, refreshToken });
        } catch (error) {
          handleError(error);
        }
      }}
      onReject={err => {
        handleError(err);
      }}
    >
      <GoogleLoginButton />
    </LoginSocialGoogle>
  );
};
