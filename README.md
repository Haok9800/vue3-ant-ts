# router

## 编写 router

![示例图](./src/assets/example/logo.png)

```
{
  必填    path: path,
  必填    name: name, // name必须唯一,路由跳转的时候是使用的name
  必填    component: component,
  必填    meta: {
           当鼠标放在面包屑导航上的时候是否显示该名称, 默认隐藏
           PS：一般只有左侧菜单的页面才需要显示
  非必填    show:true,
  必填      title: '业务场景接入详情' // 面包屑名称
            showTitle:true  //是否显示页面title组件
          }
}
```

# 文件引入方式规范

```
//  统一使用别名
import { isString } from '@/utils/is'
PS: 同一目录内除外,可以不使用别名
```

# Storage

## 两种引入方式

```
1. 引入 import { createStorage } from '@/utils/Storage'
const Storage = createStorage({storage: localStorage}) // localStorage
const Storage = createStorage({storage: session}) // sessionStorage
2. 引入 import { storage } from '@/utils/Storage'
方法
storage.set(key,value) // 设置storage
storage.get(key)       // 获取storage
storage.remove(key)    // 删除storage
storage.setCookie()    // 设置Cookie
storage.getCookie()    // 获取Cookie
storage.removeCookie() //删除 Cookie
storage.clearCookie()  // 清除Cookie
```

# 格式化代码

1. vscode 下载插件 ESlint 和 Prettier-Code formatter
2. vscode setting.json 配置如下

```
{
  "prettier.configPath": ".prettierrc.js", // 指定prettierrc文件
  "editor.formatOnSave": true // 保存自动格式化
}

```

# 文档地址

1. [vue3](https://v3.cn.vuejs.org/)
2. [vue-router4.x](https://next.router.vuejs.org/zh/index.html)
3. [antd2.x](https://2x.antdv.com/components/button-cn)
4. [jsx 语法文档](https://github.com/vuejs/jsx-next/blob/dev/packages/babel-plugin-jsx/README-zh_CN.md)
