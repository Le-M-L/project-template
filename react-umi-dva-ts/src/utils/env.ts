/** 环境变量相关 */
import pkg from "../../package.json"
/** 获取配置文件名 */
export const getConfigFileName = (env: Record<string, any>) => {
    return `__PRODUCTION__${env.SHORT_NAME || '__APP'}__CONF__`
        .toUpperCase()
        .replace(/\s/g, '');
}
/** 获取缓存的前缀 */
export function getCommonStoragePrefix(){
    const { SHORT_NAME } = getAppEnvConfig();
    return `${SHORT_NAME}__${getEnv()}`.toUpperCase()
}

/** 获取缓存变量名 */
export function getStorageShortName(){
    return `${getCommonStoragePrefix()}__${pkg.version}__`.toUpperCase();
}

/** 获取环境变量配置 */
export function getAppEnvConfig() {
    const ENV_NAME = getConfigFileName(process.env);
    const ENV = isDevMode() ? process.env : window[ENV_NAME];
    const { SHORT_NAME } = ENV;
    return {
        SHORT_NAME
    }
}

/** 获取当前环境变量 */
export function getEnv() {
    return process.env.NODE_ENV
}

/** 是否为开发环境 */
export function isDevMode() {
    return process.env.NODE_ENV === 'development'
}
/** 是否为正式环境 */
export function isProdMode() {
    return process.env.NODE_ENV === 'production'
}