export const PATH = {
  APP: {
    SELF: '/app',
    HOME: '/app/recs',
    PROFILE: {
      SELF: '/app/profile',
      EDIT: '/app/profile/edit',
    },
    SETTING: {
      SELF: '/app/settings',
      PHONE_ACCOUNT: '/app/settings/phone-account',
      GENDER: '/app/settings/gender',
      LANGUAGES: '/app/settings/global/languages',
      TEST_1: '/app/settings/test-1',
      TEST_2: '/app/settings/test-2',
    },
    EXPLORE: {
      SELF: '/app/explore',
    },
    MESSAGES: {
      SELF: '/app/messages',
      CHAT: '/app/messages/:chatId',
    },
  },
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
};
