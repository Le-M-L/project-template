
import { Effect, ImmerReducer, Subscription } from 'umi';
import { login } from "@/services/login"
import { getUserInfo } from "@/services/user"
import { Persistent } from "@/utils/cache/persistent"
import { TOKEN_KEY, USER_INFO_KEY } from "@/enums/cacheEnum"
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
    token: Persistent.getLocal(TOKEN_KEY) as string,
    userInfo: Persistent.getLocal(USER_INFO_KEY)
  },
  effects: { // 派发到reducers中
    *login({ payload }, { call, put }) {
      const { token } = yield call(login, payload);
      yield put({ type: 'setToken', payload: token })
      const userInfo = yield call(getUserInfo, {});
      yield put({ type: 'setUserInfo', payload: userInfo })
    },
  },
  reducers: {
    setToken(state, { payload }) {
      state.token = payload;
      Persistent.setLocal(TOKEN_KEY, payload, true)
    },
    setUserInfo(state, { payload }) {
      state.userInfo = payload;
      Persistent.setLocal(USER_INFO_KEY, payload, true)
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

