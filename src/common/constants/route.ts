export const PATH = {
  APP: {
    SELF: '/app',
    HOME: '/app/recs',
    PROFILE: {
      SELF: '/app/profile',
      EDIT: '/app/profile/edit',
      EDIT_INTERESTS: '/app/profile/edit/interests',
      EDIT_GENDER: '/app/profile/edit/gender',
    },
    SETTING: {
      SELF: '/app/settings',
      PHONE_ACCOUNT: '/app/settings/phone-account',
      GENDER: '/app/settings/gender',
      LANGUAGES: '/app/settings/global/languages',
      TEST_1: '/app/settings/test-1',
    },
    EXPLORE: {
      SELF: '/app/explore',
    },
    MESSAGES: {
      CHAT: '/app/messages/:chatId',
    },
    ONBOARDING: {
      SELF: '/app/onboarding',
    },
  },
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
} as const;
