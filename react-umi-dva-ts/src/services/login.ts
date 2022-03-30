import axios from 'axios';


export interface LoginParamsType {
  // captcha: string; // 验证码
  type: string;   // 类型
  userId?: string; // 用户id
  username: string; // 用户名
  password: string; // 密码
  autoLogin?: boolean; // 自动登录
}

/**
 * 用户登录
 */

export async function login(loginParams: LoginParamsType) {
  return axios.post('/authUser/login', loginParams)
}


export interface UserRegister{
  username: string; // 用户名
  password: string; // 密码
  email: string; // 邮箱
  emailCode: string; // 邮箱验证码
  invitationCode?: string; // 邀请码
}
export async function register(params: UserRegister) {

}