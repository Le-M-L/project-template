import { cacheCipher } from "@/settings/encryptionSetting"
import type { EncryptionParams } from '@/utils/cipher';
import { AesEncryption } from '@/utils/cipher';
import { isNullOrUnDef } from '@/utils/is';


export interface CreateStorageParams extends EncryptionParams {
  prefixKey: string; // 缓存前缀
  storage: Storage;  // 缓存类型 local  session
  hasEncrypt: boolean;  // 是否加密 
  timeout?: number | null; // 过期时间
}

export const createStorage = ({
  prefixKey = '',
  storage = sessionStorage,
  key = cacheCipher.key,
  iv = cacheCipher.iv,
  timeout = null,
  hasEncrypt = true,
}: Partial<CreateStorageParams> = {}) => {
  if (hasEncrypt && [key.length, iv.length].some((item) => item !== 16)) {
    throw new Error('When hasEncrypt is true, the key or iv must be 16 bits!');
  }

  const encryption = new AesEncryption({ key, iv });

  /** cache class */
  const WebStorage = class WebStorage {
    private storage: Storage;
    private prefixKey?: string;
    private encryption: AesEncryption;
    private hasEncrypt: boolean;
    constructor() {
      this.storage = storage;       // 缓存类型
      this.prefixKey = prefixKey;   // 缓存前缀
      this.encryption = encryption; // 加密算法
      this.hasEncrypt = hasEncrypt; // 是否对缓存进行加密
    }

    /** 获取key */
    private getKey(key: string) {
      return `${this.prefixKey}${key}`.toUpperCase();
    }
    /**
     * 
     * @param key 缓存key
     * @param value 缓存内容
     * @param expire 过期时间 单位秒 
     */
    set(key: string, value: any, expire: number | null = timeout) {
      const stringData = JSON.stringify({ value, time: Date.now(), expire: !isNullOrUnDef(expire) ? new Date().getTime() + expire * 1000 : null })
      const stringifyValue = this.hasEncrypt ? this.encryption.encryptByAES(stringData) : stringData;
      this.storage.setItem(this.getKey(key), stringifyValue)
    }

    /**
     * 
     * @param key 缓存的键名
     * @param def 缓存不存在 返回一个预设值
     */
    get(key: string, def: any = null): any {
      const val = this.storage.getItem(this.getKey(key));
      if (!val) return def;

      try {
        /** 如果加密过 需要进行解密 */
        const decVal = this.hasEncrypt ? this.encryption.decryptByAES(val) : val;
        const data = JSON.parse(decVal);
        const { value, expire } = data;
        /** 如果缓存没过期 则返回 否者删除该缓存 */
        if (isNullOrUnDef(expire) || expire >= new Date().getTime()) {
          return value;
        }
        this.remove(key)
      } catch (error) {
        return def;
      }
    }

    /** 删除缓存 */
    remove(key: string) {
      this.storage.removeItem(this.getKey(key))
    }

    /** 清空缓存 */
    clear(): void {
      this.storage.clear()
    }
  }

  return new WebStorage()
}