// 运行时配置
import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import type { CurrentUser } from '@/models/user';
import GlobalLoading from '@/components/GlobalLoading';
import { getCurrentUser } from '@/services/user';
import "./utils/http"
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
  currentUser?: CurrentUser;
  fetchUserInfo?: () => Promise<CurrentUser | undefined>;
}> {
  // 获取当前用户信息
  const currentUser = await getCurrentUser();
  if (currentUser) {
    localStorage.setItem('lastLoginTime', currentUser.lastLoginTime);
  }
  return {
    currentUser: currentUser ?? undefined,
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
