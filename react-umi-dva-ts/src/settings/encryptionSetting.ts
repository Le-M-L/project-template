import { isDevMode } from "@/utils/env"

/** 设置缓存时间 */
export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

/** ase 加密 key */
export const cacheCipher = {
    key: '_11111000001111@',
    iv: '@11111000001111_',
}

/** 开发环是否对本地缓存进行加密 */
export const enableStorageEncryption = !isDevMode()