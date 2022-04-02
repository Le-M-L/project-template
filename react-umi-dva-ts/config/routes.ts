export default [
  {
    path: '/',
    layout: false,
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes:[
          {
            name: '登录',
            path: '/user/login',
            component: './User/Login',
          },
        ]
      },
      {
        path:'/',
        component: '../layouts/BasicLayout',
        routes:[
          {
            name:'首页',
            path:'/',
            component: './Index',
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
