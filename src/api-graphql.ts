import { ApolloClient, DocumentNode, execute, gql } from '@apollo/client/core';
import { OperationDefinitionNode } from 'graphql';
import create from 'zustand';

/* eslint-disable */

// *******************************************************
// *******************************************************
// PMP - rinonguci
// GENERATED FILE, DO NOT MODIFY
//
// *******************************************************
// *******************************************************
// 💙

export type Maybe<T> = T | null;

type NonNullable<T> = Exclude<T, null | undefined>;

type KeysMatching<T, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];

type KeysNotMatching<T, V> = {
  [K in keyof T]-?: T[K] extends V ? never : K;
}[keyof T];

type MatchingType = string | number | boolean | string[] | number[] | boolean[];

type FilterMaybe<T> = { [k in keyof T]: NonNullable<T[k]> };

type GenFieldsAll<T> = (
  | KeysMatching<T, MatchingType>
  | {
      [k in KeysNotMatching<T, MatchingType>]?: T[k] extends any[]
        ? GenFields<T[k][number]>
        : GenFields<T[k]>;
    }
)[];

export type GenFields<T> = T extends any[]
  ? GenFieldsAll<FilterMaybe<T[number]>>
  : GenFieldsAll<FilterMaybe<T>>;

const queryBuilder = <T>(fields?: GenFields<T>): string => {
  return fields
    ? fields
        .map((field: any) => {
          if (typeof field === 'object') {
            let result = '';

            Object.entries<any>(field as Record<string, any>).forEach(
              ([key, values], index, array) => {
                result += `${key} ${
                  values.length > 0 ? '{ ' + queryBuilder(values) + ' }' : ''
                }`;

                // If it's not the last item in array, join with comma
                if (index < array.length - 1) {
                  result += ', ';
                }
              },
            );

            return result;
          } else {
            return `${field}`;
          }
        })
        .join('\n ')
    : '';
};

const guessFragmentType = (fragment: string | DocumentNode) => {
  let isString = false;
  let isFragment = false;
  let fragmentName = '';
  if (typeof fragment === 'string') {
    isString = true;
  } else if (typeof fragment === 'object' && fragment.definitions.length) {
    isFragment = true;
    const definition = fragment.definitions[0];
    if (definition.kind === 'FragmentDefinition') {
      fragmentName = definition.name.value;
    } else {
      throw new Error(
        `The argument passed is not a fragment definition, got ${definition.kind} instead`,
      );
    }
  }
  return { isString, isFragment, fragmentName };
};

export interface Address {
  city: Maybe<string>;
  country: Maybe<string>;
  district: Maybe<string>;
}

export interface ControlWhoSeesYou {
  onlyPeopleIveLiked: boolean;
  standard: boolean;
}

export interface ControlWhoSeesYouInput {
  onlyPeopleIveLiked?: boolean;
  standard?: boolean;
}

export interface ControlWhoYouSee {
  balancedRecommendations: boolean;
  recentlyActive: boolean;
}

export interface ControlWhoYouSeeInput {
  balancedRecommendations?: boolean;
  recentlyActive?: boolean;
}

export interface Conversation {
  _id: string;
  createdAt: string;
  isDeleted: boolean;
  lastMessage: Maybe<Message>;
  members: User[];
  messagePin: Maybe<Message>;
  updatedAt: string;
}

export interface ConversationResult {
  results: Maybe<Conversation[]>;
  totalCount: Maybe<number>;
}

export interface CreateConversationInput {
  lastMessage?: string;
  members?: string[];
  messagePin?: string;
}

export interface CreateTagInput {
  description?: string;
  name: string;
  parentType?: TagType;
  type: TagType;
}

export interface DiscoverySettings {
  distance: number;
  lookingFor: LookingFor;
  maxAge: number;
  minAge: number;
  onlyShowAgeThisRange: boolean;
  onlyShowDistanceThisRange: boolean;
}

export interface DiscoverySettingsInput {
  distance?: number;
  lookingFor?: LookingFor;
  maxAge?: number;
  minAge?: number;
  onlyShowAgeThisRange?: boolean;
  onlyShowDistanceThisRange?: boolean;
}

export enum FilterByDate {
  Last_year = 'LAST_YEAR',
  Seven_days_ago = 'SEVEN_DAYS_AGO',
  Thirty_days_ago = 'THIRTY_DAYS_AGO',
  This_year = 'THIS_YEAR',
}
export interface FilterGetAllMessage {
  conversion_id?: string;
  type?: MessageType;
}

export interface FilterGetAllTag {
  name?: string;
  parentType?: TagType;
  type?: TagType;
}

export interface FilterGetAllUser {
  matched?: string[];
  statusActive?: StatusActive;
}

export interface FilterGetOneConversation {
  _id?: string;
  members?: string[];
}

export interface FilterStatisticUser {
  filterByDate?: FilterByDate;
  sortOption?: SortOption;
  username?: string;
}

export enum GenderEnum {
  Female = 'FEMALE',
  Male = 'MALE',
}
export interface GeoLocation {
  /** [lng, lat]*/
  coordinates: Maybe<number[]>;
  type: Maybe<string>;
}

export interface JwtPayload {
  accessToken: string;
  refreshToken: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export enum LookingFor {
  All = 'ALL',
  Men = 'MEN',
  Women = 'WOMEN',
}
export interface MatchRequest {
  createdAt: Maybe<string>;
  sender: Maybe<User>;
}

export interface Message {
  _id: string;
  conversion_id: Conversation;
  createdAt: string;
  cursor: number;
  isDeleted: boolean;
  keyword: string;
  receiver: User;
  sender: User;
  text: Maybe<string>;
  type: MessageType;
  updatedAt: string;
  urlMessageImage: Maybe<string>;
}

export interface MessageResult {
  results: Maybe<Message[]>;
  totalCount: Maybe<number>;
}

export enum MessageType {
  Image = 'IMAGE',
  Text = 'TEXT',
}
export interface MySetting {
  controlWhoSeesYou: ControlWhoSeesYou;
  controlWhoYouSee: ControlWhoYouSee;
  discovery: DiscoverySettings;
}

export interface MySettingInput {
  controlWhoSeesYou?: ControlWhoSeesYouInput;
  controlWhoYouSee?: ControlWhoYouSeeInput;
  discovery?: DiscoverySettingsInput;
}

export interface PaginationInput {
  /** @default 0*/
  page?: number;
  /** @default 100*/
  size?: number;
}

export interface PaginationMessageInput {
  cursor?: number;
  limit?: number;
}

export interface RegisterInput {
  confirmPassword: string;
  email: string;
  password: string;
}

export interface Reports {
  createdAt: string;
  reasonReport: string;
  reportBy: User;
}

export interface ResetPasswordInput {
  code: string;
  confirmPassword: string;
  email: string;
  password: string;
}

export enum SortOption {
  Age = 'AGE',
  Az = 'AZ',
  Za = 'ZA',
}
export enum StatusActive {
  Offline = 'OFFLINE',
  Online = 'ONLINE',
}

export interface Tag {
  _id: string;
  createdAt: string;
  description: Maybe<string>;
  isDeleted: boolean;
  keyword: string;
  name: Maybe<string>;
  parentType: Maybe<TagType>;
  slug: string;
  type: Maybe<TagType>;
  updatedAt: string;
}

export interface TagResult {
  results: Maybe<Tag[]>;
  totalCount: Maybe<number>;
}

export enum TagType {
  Dietary_preference = 'DIETARY_PREFERENCE',
  Education = 'EDUCATION',
  Life_style = 'LIFE_STYLE',
  Passions = 'PASSIONS',
  Personality_type = 'PERSONALITY_TYPE',
  Pets = 'PETS',
  Smoke_question = 'SMOKE_QUESTION',
  Zodiac = 'ZODIAC',
}
export interface UpdateUserInput {
  aboutMe?: string;
  birthDays?: string;
  company?: string;
  gender?: GenderEnum;
  images?: string[];
  jobTitle?: string;
  liveAt?: string;
  phoneNumber?: string;
  school?: string;
  showMeTinder?: boolean;
  tags?: string[];
  username?: string;
}

export interface User {
  _id: string;
  aboutMe: Maybe<string>;
  address: Maybe<Address>;
  age: Maybe<number>;
  birthDays: Maybe<string>;
  calcDistance: Maybe<number>;
  company: Maybe<string>;
  createdAt: Maybe<string>;
  email: string;
  gender: Maybe<GenderEnum>;
  geoLocation: Maybe<GeoLocation>;
  images: Maybe<string[]>;
  isDeleted: boolean;
  jobTitle: Maybe<string>;
  keyword: Maybe<string>;
  lastActive: Maybe<string>;
  liveAt: Maybe<string>;
  matchRequest: Maybe<MatchRequest[]>;
  matched: Maybe<User[]>;
  mySetting: Maybe<MySetting>;
  phoneNumber: Maybe<string>;
  reports: Maybe<Reports[]>;
  school: Maybe<string>;
  showMeTinder: boolean;
  slug: Maybe<string>;
  statusActive: Maybe<StatusActive>;
  tags: Maybe<Tag[]>;
  updatedAt: Maybe<string>;
  username: Maybe<string>;
}

export interface UserResult {
  results: Maybe<User[]>;
  totalCount: Maybe<number>;
}

export interface ConfirmMailArgs {
  code: number;
  email: string;
}

export interface CreateMultiTagArgs {}

export interface CreateMultiUserArgs {}

export interface DeleteAccountArgs {}

export interface ForgotPasswordArgs {
  email: string;
}

export interface GetAllConversationArgs {
  pagination?: PaginationInput;
}

export interface GetAllMessageArgs {
  filter?: FilterGetAllMessage;
  pagination?: PaginationMessageInput;
}

export interface GetAllReportsUserArgs {
  pagination?: PaginationInput;
}

export interface GetAllTagArgs {
  filter?: FilterGetAllTag;
  pagination?: PaginationInput;
}

export interface GetAllUserArgs {
  filter?: FilterGetAllUser;
  pagination?: PaginationInput;
}

export interface GetCurrentAddressArgs {}

export interface GetCurrentUserArgs {}

export interface GetOneConversationArgs {
  input?: FilterGetOneConversation;
}

export interface RefreshTokenArgs {}

export interface ResetCacheArgs {}

export interface SignInAsAdminArgs {
  email: string;
  password: string;
}

export interface StatisticUserArgs {
  filter?: FilterStatisticUser;
  pagination?: PaginationInput;
}

export interface VerifyTokenFacebookArgs {
  token: string;
}

export interface VerifyTokenGoogleArgs {
  token: string;
}

export interface ChangePasswordArgs {
  confirmPassword: string;
  newPassword: string;
  oldPassword: string;
}

export interface ChangeSettingArgs {
  input: MySettingInput;
}

export interface ConfirmBlockUserArgs {
  user_id: string;
}

export interface ConfirmDeleteAccountArgs {
  code: number;
  email: string;
}

export interface CreateConversationArgs {
  input: CreateConversationInput;
}

export interface CreateTagArgs {
  createTagInput: CreateTagInput;
}

export interface DeclineBlockUserArgs {
  user_id: string;
}

export interface LikeUserArgs {
  user_id: string;
}

export interface RemoveMessageArgs {
  message_id: string;
}

export interface ReportUserArgs {
  reasonReport: string;
  userReport: string;
}

export interface ResetPasswordArgs {
  input: ResetPasswordInput;
}

export interface SignInArgs {
  input: LoginInput;
}

export interface SignUpArgs {
  input: RegisterInput;
}

export interface SkipUserArgs {
  user_id: string;
}

export interface UnSkipUserArgs {
  user_id: string;
}

export interface UnlikeUserArgs {
  user_id: string;
}

export interface UpdateLocationArgs {
  /** Position 0 is Longitude , 1 is Latitude*/
  coordinates: number[];
}

export interface UpdateProfileArgs {
  input: UpdateUserInput;
}

interface Abortable {
  $abort(): void;
}
interface WithArgs<T, A> {
  $args(args: A): ExecutableQuery<T>;
}
interface Pendable {
  pending: boolean;
}
interface Executable<T> {
  $fetch(): Promise<T>;
}
interface Nameble {
  __name: string;
}

export interface QueryWithArgs<T, A>
  extends WithArgs<T, A>,
    Abortable,
    Pendable,
    Nameble {}
export interface QueryWithOptionalArgs<T, A>
  extends QueryWithArgs<T, A>,
    Executable<T> {}

export interface ExecutableQuery<T>
  extends Abortable,
    Pendable,
    Nameble,
    Executable<T> {}
export type ExecutableQueryWithArgs<T, A> = QueryWithArgs<T, A>;
export interface ExecutableQueryWithOptionalArgs<T, A>
  extends QueryWithOptionalArgs<T, A>,
    Executable<T> {}

export const useLoadingStore = create<
  {
    [K in keyof ReturnType<typeof apiProvider> as K extends `${string}`
      ? `${K}Loading`
      : K]?: boolean;
  } & {
    setLoading: ({ name, loading }: { name: string; loading: boolean }) => void;
  }
>(set => ({
  setLoading: ({ name, loading }: { name: string; loading: boolean }) => {
    set({ [`${name}Loading`]: loading });
  },
}));

export const apiProvider = (apolloClient: ApolloClient<any>) => {
  const abortableQuery = <T, A = null>(
    query: DocumentNode,
    args: boolean,
    optionalArgs: boolean,
  ) => {
    let observableQuery: ZenObservable.Subscription;
    const parsedQuery = query.definitions[0] as OperationDefinitionNode;
    const queryName = parsedQuery?.name?.value;
    if (queryName) {
      let variables: { [x: string]: any } = {};
      let pending = false;
      useLoadingStore.getState().setLoading({ name: queryName, loading: true });
      const $abort = () => {
        if (observableQuery && !observableQuery.closed) {
          observableQuery.unsubscribe();
        }
      };
      const $fetch = async () => {
        pending = true;
        return new Promise<T>((resolve, reject) => {
          observableQuery = execute(apolloClient.link, {
            query,
            variables,
          }).subscribe({
            next: ({ data, errors }) => {
              if (data && queryName) {
                resolve(data[queryName]);
              } else {
                reject({ gqlErrors: errors, variables, query: queryName });
              }
            },
            error: error =>
              reject({ gqlErrors: [error], variables, query: queryName }),
            complete: () => {
              pending = false;
              useLoadingStore
                .getState()
                .setLoading({ name: queryName, loading: false });
            },
          });
        });
      };
      const $args = (args: Record<string, any>) => {
        variables = args;
        return {
          $abort,
          $fetch,
          pending,
          __name: queryName,
        };
      };
      if (args && !optionalArgs) {
        return {
          $abort,
          $args,
          pending,
          __name: queryName,
        } as any;
      } else if (optionalArgs) {
        return {
          $abort,
          $args,
          $fetch,
          pending,
          __name: queryName,
        } as any;
      } else {
        return {
          $abort,
          $fetch,
          pending,
          __name: queryName,
        } as any;
      }
    } else {
      throw new Error('query argument is not a GraphQL definition');
    }
  };

  return {
    confirmMail(): QueryWithArgs<boolean, ConfirmMailArgs> {
      const queryTemplate = gql`
        query confirmMail($code: Float!, $email: String!) {
          confirmMail(code: $code, email: $email)
        }
      `;
      return abortableQuery(queryTemplate, true, false);
    },
    createMultiTag(): ExecutableQuery<boolean> {
      const queryTemplate = gql`
        query createMultiTag {
          createMultiTag
        }
      `;
      return abortableQuery(queryTemplate, false, false);
    },
    createMultiUser(): ExecutableQuery<boolean> {
      const queryTemplate = gql`
        query createMultiUser {
          createMultiUser
        }
      `;
      return abortableQuery(queryTemplate, false, false);
    },
    deleteAccount(): ExecutableQuery<boolean> {
      const queryTemplate = gql`
        query deleteAccount {
          deleteAccount
        }
      `;
      return abortableQuery(queryTemplate, false, false);
    },
    forgotPassword(): QueryWithArgs<boolean, ForgotPasswordArgs> {
      const queryTemplate = gql`
        query forgotPassword($email: String!) {
          forgotPassword(email: $email)
        }
      `;
      return abortableQuery(queryTemplate, true, false);
    },
    getAllConversation(
      fields: GenFields<ConversationResult>,
    ): ExecutableQueryWithOptionalArgs<
      ConversationResult,
      GetAllConversationArgs
    > {
      const fragment = queryBuilder(fields);
      let isString = false;
      let isFragment = false;
      let fragmentName = '';
      if (fragment)
        ({ isString, isFragment, fragmentName } = guessFragmentType(fragment));

      const queryTemplate = gql`
      query getAllConversation ($pagination: PaginationInput) {
        getAllConversation(pagination: $pagination) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

      return abortableQuery(queryTemplate, true, true);
    },
    getAllMessage(
      fields: GenFields<MessageResult>,
    ): ExecutableQueryWithOptionalArgs<MessageResult, GetAllMessageArgs> {
      const fragment = queryBuilder(fields);
      let isString = false;
      let isFragment = false;
      let fragmentName = '';
      if (fragment)
        ({ isString, isFragment, fragmentName } = guessFragmentType(fragment));

      const queryTemplate = gql`
      query getAllMessage ($filter: FilterGetAllMessage,$pagination: PaginationMessageInput) {
        getAllMessage(filter: $filter,pagination: $pagination) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

      return abortableQuery(queryTemplate, true, true);
    },
    getAllReportsUser(
      fields: GenFields<UserResult>,
    ): ExecutableQueryWithOptionalArgs<UserResult, GetAllReportsUserArgs> {
      const fragment = queryBuilder(fields);
      let isString = false;
      let isFragment = false;
      let fragmentName = '';
      if (fragment)
        ({ isString, isFragment, fragmentName } = guessFragmentType(fragment));

      const queryTemplate = gql`
      query getAllReportsUser ($pagination: PaginationInput) {
        getAllReportsUser(pagination: $pagination) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

      return abortableQuery(queryTemplate, true, true);
    },
    getAllTag(
      fields: GenFields<TagResult>,
    ): ExecutableQueryWithOptionalArgs<TagResult, GetAllTagArgs> {
      const fragment = queryBuilder(fields);
      let isString = false;
      let isFragment = false;
      let fragmentName = '';
      if (fragment)
        ({ isString, isFragment, fragmentName } = guessFragmentType(fragment));

      const queryTemplate = gql`
      query getAllTag ($filter: FilterGetAllTag,$pagination: PaginationInput) {
        getAllTag(filter: $filter,pagination: $pagination) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

      return abortableQuery(queryTemplate, true, true);
    },
    getAllUser(
      fields: GenFields<UserResult>,
    ): ExecutableQueryWithOptionalArgs<UserResult, GetAllUserArgs> {
      const fragment = queryBuilder(fields);
      let isString = false;
      let isFragment = false;
      let fragmentName = '';
      if (fragment)
        ({ isString, isFragment, fragmentName } = guessFragmentType(fragment));

      const queryTemplate = gql`
      query getAllUser ($filter: FilterGetAllUser,$pagination: PaginationInput) {
        getAllUser(filter: $filter,pagination: $pagination) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

      return abortableQuery(queryTemplate, true, true);
    },
    getCurrentAddress(fields: GenFields<Address>): ExecutableQuery<Address> {
      const fragment = queryBuilder(fields);
      let isString = false;
      let isFragment = false;
      let fragmentName = '';
      if (fragment)
        ({ isString, isFragment, fragmentName } = guessFragmentType(fragment));

      const queryTemplate = gql`
      query getCurrentAddress  {
        getCurrentAddress {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

      return abortableQuery(queryTemplate, false, false);
    },
    getCurrentUser(fields: GenFields<User>): ExecutableQuery<User> {
      const fragment = queryBuilder(fields);
      let isString = false;
      let isFragment = false;
      let fragmentName = '';
      if (fragment)
        ({ isString, isFragment, fragmentName } = guessFragmentType(fragment));

      const queryTemplate = gql`
      query getCurrentUser  {
        getCurrentUser {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

      return abortableQuery(queryTemplate, false, false);
    },
    getOneConversation(
      fields: GenFields<Conversation>,
    ): ExecutableQueryWithOptionalArgs<Conversation, GetOneConversationArgs> {
      const fragment = queryBuilder(fields);
      let isString = false;
      let isFragment = false;
      let fragmentName = '';
      if (fragment)
        ({ isString, isFragment, fragmentName } = guessFragmentType(fragment));

      const queryTemplate = gql`
      query getOneConversation ($input: FilterGetOneConversation) {
        getOneConversation(input: $input) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

      return abortableQuery(queryTemplate, true, true);
    },
    refreshToken(fields: GenFields<JwtPayload>): ExecutableQuery<JwtPayload> {
      const fragment = queryBuilder(fields);
      let isString = false;
      let isFragment = false;
      let fragmentName = '';
      if (fragment)
        ({ isString, isFragment, fragmentName } = guessFragmentType(fragment));

      const queryTemplate = gql`
      query refreshToken  {
        refreshToken {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

      return abortableQuery(queryTemplate, false, false);
    },
    resetCache(): ExecutableQuery<boolean> {
      const queryTemplate = gql`
        query resetCache {
          resetCache
        }
      `;
      return abortableQuery(queryTemplate, false, false);
    },
    signInAsAdmin(
      fields: GenFields<JwtPayload>,
    ): ExecutableQueryWithArgs<JwtPayload, SignInAsAdminArgs> {
      const fragment = queryBuilder(fields);
      let isString = false;
      let isFragment = false;
      let fragmentName = '';
      if (fragment)
        ({ isString, isFragment, fragmentName } = guessFragmentType(fragment));

      const queryTemplate = gql`
      query signInAsAdmin ($email: String!,$password: String!) {
        signInAsAdmin(email: $email,password: $password) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

      return abortableQuery(queryTemplate, true, false);
    },
    statisticUser(
      fields: GenFields<UserResult>,
    ): ExecutableQueryWithOptionalArgs<UserResult, StatisticUserArgs> {
      const fragment = queryBuilder(fields);
      let isString = false;
      let isFragment = false;
      let fragmentName = '';
      if (fragment)
        ({ isString, isFragment, fragmentName } = guessFragmentType(fragment));

      const queryTemplate = gql`
      query statisticUser ($filter: FilterStatisticUser,$pagination: PaginationInput) {
        statisticUser(filter: $filter,pagination: $pagination) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

      return abortableQuery(queryTemplate, true, true);
    },
    verifyTokenFacebook(
      fields: GenFields<JwtPayload>,
    ): ExecutableQueryWithArgs<JwtPayload, VerifyTokenFacebookArgs> {
      const fragment = queryBuilder(fields);
      let isString = false;
      let isFragment = false;
      let fragmentName = '';
      if (fragment)
        ({ isString, isFragment, fragmentName } = guessFragmentType(fragment));

      const queryTemplate = gql`
      query verifyTokenFacebook ($token: String!) {
        verifyTokenFacebook(token: $token) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

      return abortableQuery(queryTemplate, true, false);
    },
    verifyTokenGoogle(
      fields: GenFields<JwtPayload>,
    ): ExecutableQueryWithArgs<JwtPayload, VerifyTokenGoogleArgs> {
      const fragment = queryBuilder(fields);
      let isString = false;
      let isFragment = false;
      let fragmentName = '';
      if (fragment)
        ({ isString, isFragment, fragmentName } = guessFragmentType(fragment));

      const queryTemplate = gql`
      query verifyTokenGoogle ($token: String!) {
        verifyTokenGoogle(token: $token) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

      return abortableQuery(queryTemplate, true, false);
    },
    changePassword(): QueryWithArgs<boolean, ChangePasswordArgs> {
      const queryTemplate = gql`
        mutation changePassword(
          $confirmPassword: String!
          $newPassword: String!
          $oldPassword: String!
        ) {
          changePassword(
            confirmPassword: $confirmPassword
            newPassword: $newPassword
            oldPassword: $oldPassword
          )
        }
      `;
      return abortableQuery(queryTemplate, true, false);
    },
    changeSetting(): QueryWithArgs<boolean, ChangeSettingArgs> {
      const queryTemplate = gql`
        mutation changeSetting($input: MySettingInput!) {
          changeSetting(input: $input)
        }
      `;
      return abortableQuery(queryTemplate, true, false);
    },
    confirmBlockUser(): QueryWithArgs<boolean, ConfirmBlockUserArgs> {
      const queryTemplate = gql`
        mutation confirmBlockUser($user_id: ObjectID!) {
          confirmBlockUser(user_id: $user_id)
        }
      `;
      return abortableQuery(queryTemplate, true, false);
    },
    confirmDeleteAccount(): QueryWithArgs<boolean, ConfirmDeleteAccountArgs> {
      const queryTemplate = gql`
        mutation confirmDeleteAccount($code: Float!, $email: String!) {
          confirmDeleteAccount(code: $code, email: $email)
        }
      `;
      return abortableQuery(queryTemplate, true, false);
    },
    createConversation(
      fields: GenFields<Conversation>,
    ): ExecutableQueryWithArgs<Conversation, CreateConversationArgs> {
      const fragment = queryBuilder(fields);
      let isString = false;
      let isFragment = false;
      let fragmentName = '';
      if (fragment)
        ({ isString, isFragment, fragmentName } = guessFragmentType(fragment));

      const queryTemplate = gql`
      mutation createConversation ($input: CreateConversationInput!) {
        createConversation(input: $input) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

      return abortableQuery(queryTemplate, true, false);
    },
    createTag(): QueryWithArgs<boolean, CreateTagArgs> {
      const queryTemplate = gql`
        mutation createTag($createTagInput: CreateTagInput!) {
          createTag(createTagInput: $createTagInput)
        }
      `;
      return abortableQuery(queryTemplate, true, false);
    },
    declineBlockUser(): QueryWithArgs<boolean, DeclineBlockUserArgs> {
      const queryTemplate = gql`
        mutation declineBlockUser($user_id: ObjectID!) {
          declineBlockUser(user_id: $user_id)
        }
      `;
      return abortableQuery(queryTemplate, true, false);
    },
    likeUser(): QueryWithArgs<boolean, LikeUserArgs> {
      const queryTemplate = gql`
        mutation likeUser($user_id: ObjectID!) {
          likeUser(user_id: $user_id)
        }
      `;
      return abortableQuery(queryTemplate, true, false);
    },
    removeMessage(
      fields: GenFields<Message>,
    ): ExecutableQueryWithArgs<Message, RemoveMessageArgs> {
      const fragment = queryBuilder(fields);
      let isString = false;
      let isFragment = false;
      let fragmentName = '';
      if (fragment)
        ({ isString, isFragment, fragmentName } = guessFragmentType(fragment));

      const queryTemplate = gql`
      mutation removeMessage ($message_id: ObjectID!) {
        removeMessage(message_id: $message_id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

      return abortableQuery(queryTemplate, true, false);
    },
    reportUser(): QueryWithArgs<boolean, ReportUserArgs> {
      const queryTemplate = gql`
        mutation reportUser($reasonReport: String!, $userReport: ObjectID!) {
          reportUser(reasonReport: $reasonReport, userReport: $userReport)
        }
      `;
      return abortableQuery(queryTemplate, true, false);
    },
    resetPassword(): QueryWithArgs<boolean, ResetPasswordArgs> {
      const queryTemplate = gql`
        mutation resetPassword($input: ResetPasswordInput!) {
          resetPassword(input: $input)
        }
      `;
      return abortableQuery(queryTemplate, true, false);
    },
    signIn(
      fields: GenFields<JwtPayload>,
    ): ExecutableQueryWithArgs<JwtPayload, SignInArgs> {
      const fragment = queryBuilder(fields);
      let isString = false;
      let isFragment = false;
      let fragmentName = '';
      if (fragment)
        ({ isString, isFragment, fragmentName } = guessFragmentType(fragment));

      const queryTemplate = gql`
      mutation signIn ($input: LoginInput!) {
        signIn(input: $input) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

      return abortableQuery(queryTemplate, true, false);
    },
    signUp(): QueryWithArgs<boolean, SignUpArgs> {
      const queryTemplate = gql`
        mutation signUp($input: RegisterInput!) {
          signUp(input: $input)
        }
      `;
      return abortableQuery(queryTemplate, true, false);
    },
    skipUser(): QueryWithArgs<boolean, SkipUserArgs> {
      const queryTemplate = gql`
        mutation skipUser($user_id: ObjectID!) {
          skipUser(user_id: $user_id)
        }
      `;
      return abortableQuery(queryTemplate, true, false);
    },
    unSkipUser(): QueryWithArgs<boolean, UnSkipUserArgs> {
      const queryTemplate = gql`
        mutation unSkipUser($user_id: ObjectID!) {
          unSkipUser(user_id: $user_id)
        }
      `;
      return abortableQuery(queryTemplate, true, false);
    },
    unlikeUser(): QueryWithArgs<boolean, UnlikeUserArgs> {
      const queryTemplate = gql`
        mutation unlikeUser($user_id: ObjectID!) {
          unlikeUser(user_id: $user_id)
        }
      `;
      return abortableQuery(queryTemplate, true, false);
    },
    updateLocation(): QueryWithArgs<boolean, UpdateLocationArgs> {
      const queryTemplate = gql`
        mutation updateLocation($coordinates: [Float!]!) {
          updateLocation(coordinates: $coordinates)
        }
      `;
      return abortableQuery(queryTemplate, true, false);
    },
    updateProfile(): QueryWithArgs<boolean, UpdateProfileArgs> {
      const queryTemplate = gql`
        mutation updateProfile($input: UpdateUserInput!) {
          updateProfile(input: $input)
        }
      `;
      return abortableQuery(queryTemplate, true, false);
    },
  };
};
