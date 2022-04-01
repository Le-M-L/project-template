import { getStorageShortName } from '@/utils/env';
import { createStorage as create, CreateStorageParams } from './storageCache';
import { enableStorageEncryption, DEFAULT_CACHE_TIME } from '@/settings/encryptionSetting';
// 前端缓存处理

export type Options = Partial<CreateStorageParams>;

const createOptions = (storage: Storage, options: Options = {}): Options => {
    return {
        // No encryption in debug mode
        hasEncrypt: enableStorageEncryption,
        storage,
        prefixKey: getStorageShortName(),
        ...options,
    }
}

/** web Storage */
export const WebStorage = create(createOptions(sessionStorage));

/** 创建Storage 默认 sessionStorage */
export const createStorage = (storage: Storage = sessionStorage, options: Options = {}) => {
  return create(createOptions(storage, options));
};

/** 创建SessionStorage */
export const createSessionStorage = (options: Options = {}) => {
  return createStorage(sessionStorage, { ...options, timeout: DEFAULT_CACHE_TIME });
};

/** 创建localStorage */
export const createLocalStorage = (options: Options = {}) => {
  return createStorage(localStorage, { ...options, timeout: DEFAULT_CACHE_TIME });
};

export default WebStorage;
