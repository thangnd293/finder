import ProfileMobile from './ProfileMobile';

import useMediaQuery from '@/hooks/useMediaQuery';

import { RESPONSIVE } from '@/common/constants/responsive';

interface Props {}

const Profile = ({}: Props) => {
  const isMobile = useMediaQuery({
    mediaQuery: `(max-width: ${RESPONSIVE.md}px)`,
  });

  if (isMobile) return <ProfileMobile />;

  return <div>Profile</div>;
};

export default Profile;
