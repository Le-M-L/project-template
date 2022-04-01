
/** 将缓存储存在内存中 */
export interface Cache<V = any> {
    value?: V;
    timeoutId?: ReturnType<typeof setTimeout>;
    time?: number;
    alive?: number;
}

/** 缓存时间 */
const NOT_ALIVE = 0;

export class Memory<T = any, V = any>{
    private cache: { [key in keyof T]?: Cache<V> } = {};
    private alive: number; // 存活时间

    constructor(alive = NOT_ALIVE) {
        this.alive = alive * 1000;
    }

    /** 获取内存缓存 */
    get getCache() {
        return this.cache
    }

    /** 设置内存数据 */
    setCache(cache: object) {
        this.cache = cache;
    }

    /** 获取内存的数据 */
    get<K extends keyof T>(key: K) {
        return this.cache[key];
    }

    /** 设置内存的数据 */
    set<K extends keyof T>(key: K, value: V, expires?: number) {
        let item = this.get(key);
        if (!expires || (expires as number) <= 0) {
            expires = this.alive;
        }

        /** 内存有数据 */
        if (item) {
            // 有定时器存在 清理定时器 并且 重写设置时间
            if (item.timeoutId) {
                clearTimeout(item.timeoutId)
                item.timeoutId = undefined;
            }
            item.value = value
        } else {
            item = { value, alive: expires };
            this.cache[key] = item;
        }
        /** 没有设置有效期 直接返回苏剧 */
        if (!expires) {
            return value
        }
        /** 设置过期时间 */
        const now = new Date().getTime();
        item.time = now + this.alive;
        item.timeoutId = setTimeout(
            () => {
                this.remove(key);
            },
            expires > now ? expires - now : expires,
        );

        return value;
    }

    /** 删除内存数据 */
    remove<K extends keyof T>(key: K) {
        const item = this.get(key);
        Reflect.deleteProperty(this.cache, key);
        if (item) {
            // 清空定时器 
            clearTimeout(item.timeoutId!);
            return item.value
        }
    }

    /** 重置内存数据 */
    resetCache(cache: { [K in keyof T]: Cache }) {
        Object.keys(cache).forEach((key) =>{
            const k = key as any as keyof T;
            const item = cache[k];
            if(item && item.time){
                const now = new Date().getTime();
                const expire = item.time;
                if(expire > now){
                    this.set(k, item.value, expire)
                }
            }
        })
    }

    /** 清空内存数据 */
    clear(){
        Object.keys(this.cache).forEach((key) => {
            const item = this.cache[key];
            item.timeoutId && clearTimeout(item.timeoutId)
        })
        this.cache = {}
    }
}