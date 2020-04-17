/**
 * Basic router
 */
export const constantRouterMap = [
  {
    path: "/user",
    name: "User",
    redirect: "/user/login",
    component: () =>
      import(/* webpackChunkName: "user" */ "@/layouts/UserLayout"),
    children: [
      {
        path: "login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "@/views/user/Login")
      },
      {
        path: "register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "@/views/user/Register")
      }
    ]
  },
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "layout" */ "@/layouts/BasicLayout"),
    children: []
  },
  {
    path: "/403",
    name: "403",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/exception/403")
  }
];
