import { GenFields, UserResult } from '@/api-graphql';

export const fragmentGetAllUser: GenFields<UserResult> = [
  'totalCount',
  {
    results: [
      '_id',
      'aboutMe',
      'age',
      'calcDistance',
      'company',
      'images',
      'jobTitle',
      'lastActive',
      'liveAt',
      'school',
      'username',
    ],
  },
];
