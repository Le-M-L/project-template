
import { Effect, ImmerReducer, Subscription } from 'umi';
import { login } from "@/services/login"
import { Persistent } from "@/utils/cache/persistent"
import { TOKEN_KEY } from "@/enums/cacheEnum"
import type { UserInfo } from '/#/store';

export interface UserModelState {
  token: string;
  userInfo: (UserInfo | null)
}

export interface UserModelType {
  namespace: 'userInfo';
  state: UserModelState;
  effects: {
    login: Effect;
  };
  reducers: {
    // 启用 immer 之后 
    /** 设置token */
    setToken: ImmerReducer<UserModelState>;
    /** 获取用户信息 */
    setUserInfo: ImmerReducer<UserModelState>;
  };
  subscriptions: { setup: Subscription };
}

const UserModel: UserModelType = {
  namespace: 'userInfo',
  state: {
    token: '',
    userInfo: null
  },
  effects: {
    *login({ payload }, { call, put }) {
      const data = yield call(login, payload);
      // 派发到reducers中
      yield put({ type: 'setToken', payload: data })
    },
  },
  reducers: {
    setToken(state, { payload }) {
      state.token = payload.token;
      Persistent.setLocal(TOKEN_KEY, state.token, true)
    },
    setUserInfo(state, { payload }) {
      state.userInfo = payload;
      Persistent.setLocal(TOKEN_KEY, state.token, true)
    }
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


