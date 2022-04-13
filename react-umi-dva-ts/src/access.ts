/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
import type { UserInfo } from '/#/store';

export interface AccessType {
  canAdmin: boolean; // 是否为管理员
  canUser: boolean; // 是否已登录
  isBan: boolean; // 是否被封号
}

export default function access(initialState: { userInfo?: UserInfo | undefined }): AccessType {
  const { userInfo } = initialState || {};
  return {
    canAdmin: userInfo?.authority === 'admin',
    canUser: !!userInfo,
    isBan: userInfo?.authority === 'ban',
  };
}
