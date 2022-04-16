export default [
  {
    path: '/',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: '登录',
            path: '/user/login',
            component: './User/Login',
          },
        ]
      },
      {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
          {
            name: '首页',
            path: '/',
            component: './Index',
          },
          {
            name:'全部游戏',
            path:'/allGames',
            component: './allGames',
            wrappers: ['@/wrappers/auth'],
          }
        ]
      }
    ],
  },
  {
    layout: false,
    component: './404',
  },
];
