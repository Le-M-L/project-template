import { defineConfig } from 'umi';
import routes from './routes';
import proxy from './proxy';
import defaultSettings from './defaultSettings';

const { REACT_APP_ENV } = process.env;
const IS_PROD = process.env.NODE_ENV !== 'development';
const { resolve } = require('path')
export default defineConfig({
  // 配置是否让生成的文件包含 hash 后缀，通常用于增量发布和避免浏览器加载缓存。
  hash: true,
  // base: '/docs/',
  // 代理模式
  proxy: proxy[REACT_APP_ENV || 'dev'],
  // 公共资源路径
  publicPath: IS_PROD ? 'https://cdn.xxx.com/' : '/',
  // 开启dva
  dva: {
    // 启用dva 热重载
    hmr: true,
    immer: true
  },
  // layout 侧栏
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    ...defaultSettings,
  },
  // 设置语言
  locale: {
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  // 懒加载组件
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  // 路由
  routes,
  // 兼容 11
  targets: {
    ie: 11,
  },
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'root-entry-name': 'variable',
  },
  // Fast Refresh 热刷新
  fastRefresh: {},
  // 生产环境移除 console，性能优化
  extraBabelPlugins: [IS_PROD ? 'transform-remove-console' : ''],
  nodeModulesTransform: {
    type: 'none',
  },
  // 开启 mfsu 功能并添加相关配置。  开启该功能将会自动开启 webpack5 和 dynamicImport.
  mfsu: {},
  webpack5: {},
  // exportStatic: {},
  antd: {},
  //   忽略 moment 的 locale 文件，用于减少尺寸。
  ignoreMomentLocale: true,
  // 配置是否需要生成额外用于描述产物的 manifest 文件，默认会生成 asset-manifest.json。
  manifest: {
    basePath: '/',
  },
  // 使用 esbuild 作为压缩器。
  // https://umijs.org/plugins/plugin-esbuild
  // esbuild: {},
  alias: {'/#/': resolve(__dirname, '../types'),}
});
