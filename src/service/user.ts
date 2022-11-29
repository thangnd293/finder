import { GenFields, User } from '@/api-graphql';

export const getUserCurrentFragment = [
  '_id',
  'username',
  'aboutMe',
  'age',
  'birthDays',
  'calcDistance',
  'calcDistance',
  'company',
  'createdAt',
  'email',
  'isFirstLogin',
  'gender',
  'images',
  'isDeleted',
  'jobTitle',
  'keyword',
  'lastActive',
  'liveAt',
  'phoneNumber',
  'school',
  'showMeTinder',
  {
    mySetting: [
      {
        discovery: [
          'distance',
          'lookingFor',
          'maxAge',
          'minAge',
          'onlyShowAgeThisRange',
          'onlyShowDistanceThisRange',
        ],
      },
    ],
  },
  {
    matched: ['_id', 'images', 'username'],
  },
] as GenFields<User>;
