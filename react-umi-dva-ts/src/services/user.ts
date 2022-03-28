import type { CurrentUser } from '@/models/user';
import axios from 'axios';
/**
 * 查询当前用户
 */
 export function getCurrentUser() {
    return axios
      .post('/user/current')
      .then((res: any) => {
        console.log('getCurrentUser succeed', res);
        return res.data;
      })
      .catch((e: any) => {
        console.error('getCurrentUser error', e);
        return undefined;
      });
  }