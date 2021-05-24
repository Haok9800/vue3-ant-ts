export default [
    // 部门管理
    { path: '/department-management/index', component: () => import('@/pages/access-management/department-management/index.vue') },
    // 部门管理详情
    { path: '/department-management/detail', component: () => import('@/pages/access-management/department-management/detail.vue') },
    // 业务场景接入
    { path: '/business-scenario-access/index', component: () => import('@/pages/access-management/business-scenario-access/index.vue') },
    // 业务场景接入详情
    { path: '/business-scenario-access/detail', component: () => import('@/pages/access-management/business-scenario-access/detail.vue') },
    // 亮码终端接入
    { path: '/bright-code-terminal-access/index', component: () => import('@/pages/access-management/bright-code-terminal-access/index.vue') },
]