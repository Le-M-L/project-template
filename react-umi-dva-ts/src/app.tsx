// 运行时配置
import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import type { UserInfo } from '/#/store';
import GlobalLoading from '@/components/GlobalLoading';
import { getUserInfo } from '@/services/user';
import { Persistent } from "./utils/cache/persistent"
import { USER_INFO_KEY } from "@/enums/cacheEnum"
/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <GlobalLoading />,
};

/**
 * 初始化状态 全局共享数据
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 **/
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  userInfo?: UserInfo | null;
  fetchUserInfo?: () => Promise<UserInfo | undefined>;
}> {
  // 获取当前用户信息
  const userInfo = await getUserInfo();
  if (userInfo) {
    Persistent.setLocal(USER_INFO_KEY, userInfo)
  }
  return {
    userInfo: Persistent.getLocal(USER_INFO_KEY),
  };
}

/**
 * 关闭默认布局
 */
export const layout = () => {
  return {
    menuHeaderRender: undefined,
    headerRender: false,
  };
};
