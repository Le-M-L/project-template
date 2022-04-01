
import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';

export interface UserModelState {
  token: string;
}

export interface UserModelType {
  namespace: 'userInfo';
  state: UserModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<UserModelState>;
    // 启用 immer 之后
    // save: ImmerReducer<UserModelState>;
  };
  subscriptions: { setup: Subscription };
}

const UserModel: UserModelType = {
  namespace: 'userInfo',
  state: {
    token: '1',
  },

  effects: {
    *query({ payload }, { call, put }) { },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },
};

export default UserModel;



/**
 * 当前登录用户信息
 */
export interface CurrentUser {
  _id: string;
  avatarUrl: string;
  nickName: string;
  gender: number;
  jobStatus: number;
  city: string;
  email: string;
  province: string;
  country: string;
  language: string;
  authority: string;
  favourQuestionIds: string[];
  thumbCommentIds: string[];
  interests: string[];
  score: number;
  profile: string;
  _createTime: Date;
  _updateTime: Date;
}


