import { defHttp } from "@/utils/http"

/**
 * 查询当前用户
 */
export function getCurrentUser() {
  return defHttp
    .get({
      url: '/authUser/info',
    })
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