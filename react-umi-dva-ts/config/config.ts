import { defineConfig } from 'umi';
import routes from './routes';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;
const IS_PROD = process.env.NODE_ENV !== 'development';

export default defineConfig({
  base: '/docs/',
  // 代理模式
  proxy: proxy[REACT_APP_ENV || 'dev'],
  // 公共资源路径
  publicPath: IS_PROD ? 'https://cdn.xxx.com/' : '/',
  // 开启dva
  dva: {
    hmr: true,
  },
  // 设置语言
  locale: {
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  // 路由
  routes,
  // 兼容 11
  targets: {
    ie: 11,
  },
  // Fast Refresh 热刷新
  fastRefresh: {},
  // 生产环境移除 console，性能优化
  extraBabelPlugins: [IS_PROD ? 'transform-remove-console' : ''],
  nodeModulesTransform: {
    type: 'none',
  },
});
