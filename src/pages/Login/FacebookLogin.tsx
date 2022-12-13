import { FacebookLoginButton } from 'react-social-login-buttons';
import { IResolveParams, LoginSocialFacebook } from 'reactjs-social-login';

const REDIRECT_URI =
  'https://plenty-planets-beam-42-118-51-2.loca.lt/account/login';
export const FacebookLogin = () => {
  return (
    <LoginSocialFacebook
      appId='932236876877-65ekiuesm8j04oe41sn2b5jff3hc1ra2.apps.googleusercontent.com'
      redirect_uri={REDIRECT_URI}
      scope='openid profile email'
      onResolve={({ provider, data }: IResolveParams) => {
        console.log({ provider, data });
      }}
      onReject={err => {
        console.log(err);
      }}
    >
      <FacebookLoginButton />
    </LoginSocialFacebook>
  );
};
