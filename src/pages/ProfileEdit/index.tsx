import ProfileEditMobile from './ProfileEditMobile';

import useMediaQuery from '@/hooks/useMediaQuery';

import { RESPONSIVE } from '@/common/constants/responsive';

interface Props {}

const ProfileEdit = ({}: Props) => {
  const isMobile = useMediaQuery({
    mediaQuery: `(max-width: ${RESPONSIVE.md}px)`,
  });

  if (isMobile) return <ProfileEditMobile />;
  return <div>ProfileEdit</div>;
};

export default ProfileEdit;
