import type { CurrentUser } from '@/models/user';
import axios from 'axios';
/**
 * 查询当前用户
 */
export function getCurrentUser() {
  return axios
    .get('/authUser/info', { xsrfCookieName: 'token', xsrfHeaderName: 'token' })
    .then((res: any) => {
      console.log(res)
      console.log('getCurrentUser succeed', res);
      return res.data;
    })
    .catch((e: any) => {
      console.log(e)
      console.error('getCurrentUser error', e);
      return undefined;
    });
}