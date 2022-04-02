import { defHttp } from "@/utils/http"

/**
 * 查询当前用户
 */
export function getUserInfo() {
  return defHttp.get({ url: '/authUser/info' })
}