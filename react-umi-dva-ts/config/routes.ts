export default [
  {
    path: '/',
    layout: false,
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
      }
    ],
  },
  {
    layout: false,
    component: './404',
  },
];
