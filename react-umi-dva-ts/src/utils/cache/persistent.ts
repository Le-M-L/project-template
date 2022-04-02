/** 持久缓存 */
import { DEFAULT_CACHE_TIME } from '@/settings/encryptionSetting';
import { createLocalStorage, createSessionStorage } from "@/utils/cache"
import { TOKEN_KEY, USER_INFO_KEY, APP_SESSION_CACHE_KEY, APP_LOCAL_CACHE_KEY } from "@/enums/cacheEnum"
import { Memory } from "./memory";
import { pick } from 'lodash-es';
import { UserInfo } from "/#/store"
/**
 * 用于储存本地缓存的类型
 */

interface BasicStore {
    [TOKEN_KEY]: string;
    [USER_INFO_KEY]:UserInfo;
}

type LocalStore = BasicStore;
type SessionStore = BasicStore;

export type BasicKeys = keyof BasicStore

type LocalKeys = keyof LocalStore;
type SessionKeys = keyof SessionStore;

const ls = createLocalStorage();
const ss = createSessionStorage();

/** DEFAULT_CACHE_TIME 缓存时间 */
const localMemory = new Memory(DEFAULT_CACHE_TIME);
const sessionMemory = new Memory(DEFAULT_CACHE_TIME);

/** 初始化缓存状态 和 内存状态 */
function initPersistentMemory() {
    const localCache = ls.get(APP_LOCAL_CACHE_KEY)
    const sessionCache = ls.get(APP_SESSION_CACHE_KEY)
    localCache && localMemory.resetCache(localCache);
    sessionCache && sessionMemory.resetCache(sessionCache);
}

/** 持久化状态实例 */
export class Persistent {
    /** 通过 key 获取 local 缓存数据 */
    static getLocal<T>(key: LocalKeys) {
        return localMemory.get(key)?.value as (T | null);
    }

    /** 设置 local 缓存数据 */
    static setLocal(key: LocalKeys, value: LocalStore[LocalKeys], immediate = false): void {
        localMemory.set(key, value);
        immediate && ls.set(APP_LOCAL_CACHE_KEY, localMemory.getCache);
    }

    /** 删除 local 缓存数据 */
    static removeLocal(key: LocalKeys, immediate = false): void {
        localMemory.remove(key);
        immediate && ls.set(APP_LOCAL_CACHE_KEY, localMemory.getCache)
    }

    /** 清空 local 缓存数据 */
    static clearLocal(immediate = false): void {
        localMemory.clear();
        immediate && ls.clear()
    }

    /** 获取 session 缓存数据 */
    static getSession<T>(key: SessionKeys) {
        return sessionMemory.get(key)?.value as (T | null);
    }

    /** 设置 session 缓存数据 */
    static setSession(key: SessionKeys, value: SessionStore[SessionKeys], immediate = false): void {
        sessionMemory.set(key, value);
        immediate && ss.set(APP_SESSION_CACHE_KEY, sessionMemory.getCache);
    }

    /** 删除 session 缓存数据 */
    static removeSession(key: SessionKeys, immediate = false): void {
        sessionMemory.remove(key);
        immediate && ss.set(APP_SESSION_CACHE_KEY, sessionMemory.getCache);
    }

    /** 清空 session 缓存数据 */
    static clearSession(immediate = false): void {
        sessionMemory.clear();
        immediate && ss.clear();
    }

    /** 清空所有缓存数据 */
    static clearAll(immediate = false) {
        sessionMemory.clear();
        localMemory.clear();
        if (immediate) {
            ls.clear();
            ss.clear();
        }
    }
}


 /** 监听浏览器刷新事件 确保缓存数据唯一 */
window.addEventListener('beforeunload', function () {
// TOKEN_KEY 在登录或注销时已经写入到storage了，此处为了解决同时打开多个窗口时token不同步的问题
 ls.set(APP_LOCAL_CACHE_KEY, {
    ...localMemory.getCache,
    // ...pick(ls.get(APP_LOCAL_CACHE_KEY), [TOKEN_KEY, USER_INFO_KEY]),
  });
  ss.set(APP_SESSION_CACHE_KEY, {
    ...localMemory.getCache,
    // ...pick(ss.get(APP_SESSION_CACHE_KEY), [TOKEN_KEY, USER_INFO_KEY]),
  });
})

/** 监听缓存的改变 */
function storageChange(e: any) {
    const { key, newValue, oldValue } = e;
    if (!key) {
        Persistent.clearAll();
        return;
    }
    if (!!newValue && !!oldValue) {
        if (APP_LOCAL_CACHE_KEY === key) {
            Persistent.clearLocal();
        }
        if (APP_SESSION_CACHE_KEY === key) {
            Persistent.clearSession();
        }
    }
}
window.addEventListener('storage', storageChange);

/** 初始化 缓存数据 和 内存数据 */
initPersistentMemory();
