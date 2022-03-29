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
      }
    ],
  },
  {
    layout: false,
    component: './404',
  },
];
