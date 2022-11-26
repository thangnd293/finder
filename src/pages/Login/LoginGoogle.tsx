import { GoogleLoginButton } from 'react-social-login-buttons';
import { IResolveParams, LoginSocialGoogle } from 'reactjs-social-login';

const REDIRECT_URI =
  'https://plenty-planets-beam-42-118-51-2.loca.lt/account/login';
export const LoginGoogle = () => {
  return (
    <LoginSocialGoogle
      client_id={
        '932236876877-65ekiuesm8j04oe41sn2b5jff3hc1ra2.apps.googleusercontent.com'
      }
      redirect_uri={REDIRECT_URI}
      scope='openid profile email'
      discoveryDocs='claims_supported'
      access_type='offline'
      onResolve={({ provider, data }: IResolveParams) => {
        console.log({ provider, data });
      }}
      onReject={err => {
        console.log(err);
      }}
    >
      <GoogleLoginButton />
    </LoginSocialGoogle>
  );
};
