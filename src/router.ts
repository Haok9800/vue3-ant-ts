import * as vueRouter from "vue-router";
const login = () => import("@/pages/login.vue");
const NotFound = () => import("@/pages/NotFound.vue");
let childrenRoutes: any[] = [];
let routes: any[] = [
  {
    path: "/",
    redirect: () => {
      return { path: "/index" };
    },
  },
  {
    path: "/index",
    component: () => import("@/components/layout/index.vue"),
    redirect: () => {
      return { path: "/home" };
    },
    children: [
      {
        path: "/home",
        component: () => import("@/pages/home.vue"),
      },
    ],
  },
  { path: "/login", component: login },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];
// 批量导入 routers文件夹下.r.ts文件结尾的路由
// globEager不能遍历子文件夹
const modulesFiles = import.meta.globEager("./routers/*r.ts");
Object.values(modulesFiles)
  .map((v) => v.default)
  .forEach((item) => {
    childrenRoutes = childrenRoutes.concat(item);
  });
routes[1].children = routes[1].children.concat(childrenRoutes);
console.log("全部路由", childrenRoutes);
const router = vueRouter.createRouter({
  history: vueRouter.createWebHashHistory(),
  routes,
});
export default router;
