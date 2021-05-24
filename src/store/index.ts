import { createStore } from "vuex";
// Create a new store instance.
export default createStore({
  state: {
    count: 0,
    sidebar: [
      {
        key: "/home",
        title: "首页",
      },
      {
        key: "/access-management",
        title: "接入管理",
        children: [
          {
            key: "/department-management",
            title: "部门管理",
            children: [
              {
                key: "/department-management/index",
                title: "部门管理列表",
              },
              {
                key: "/department-management/detail",
                title: "部门管理详情",
              },
            ],
          },
          {
            key: "/business-scenario-access",
            title: "业务场景接入",
            children: [
              {
                key: "/business-scenario-access/detail",
                title: "业务场景接入详情",
              },
            ],
          },
          {
            key: "/bright-code-terminal-access/index",
            title: "亮码终端接入",
          },
        ],
      },
    ],
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    
  },
});
