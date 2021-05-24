// import { vue } from '@vitejs/plugin-vue';
import axios from "axios";
import { message,Modal  } from 'ant-design-vue';
import {  createVNode  } from 'vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import config from "../config/index"
// 登录相关错误码
const loginErrorCode = [401]
// 默认配置
axios.defaults.timeout = 15000;
axios.defaults.headers["Content-Type"] = "application/json";
// 普通请求实例
// /citymanage/citycode-wh-manager
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  maxRedirects: 0,
});
// 文件上传请求实例
const requestFile = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  maxRedirects: 0,
  method: "post",
  headers: {
    "Content-Type": "multipart/form-data",
  },
  transformRequest: [
    function (data) {
      const param = new FormData();
      for (const [k, v] of Object.entries(data)) {
        param.append(k, v);
      }
      return param;
    },
  ],
});
// form-data类型请求实例
const requestFd = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  method: "post",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  transformRequest: [
    function (data) {
      Object.keys(data).forEach((key) => {
        if (typeof data[key] === "object") {
          data[key] = JSON.stringify(data[key]);
        }
      });
    //   return qs.stringify(data);
      return data;
    },
  ],
});
/**
 * 拦截器成功回调
 * 所有接口返回0才正常返回resolve
 * 非0都reject出去
 * @param res
 * @returns {*}
 */
function resolve(res) {
  // 自定义处理请求回来的数据
  if (res.config.customHandleResult) return res.data;
  const data = res.data || {};
  if (res.config && !res.config.hideLoading) {
    // commonLoading.hide();
    // hideLoading = message.loading('Action in progress..', 0);
  }

  if (+data[config.apiReturnDefine.code] !== 0) {
    // 登录相关错误
    if (loginErrorCode.includes(+data[config.apiReturnDefine.code])) {
      Modal.confirm({
        title: data[config.apiReturnDefine.msg],
        icon: createVNode(ExclamationCircleOutlined),
        content: data[config.apiReturnDefine.msg],
        okText: '重新登录',
        cancelText: '取消',
        onOk(){
            // 跳转登录页面
            console.log('登录')
        }
      });
      return;
    }
    message.error(data[config.apiReturnDefine.msg]);
    return Promise.reject(data);
  }
  if (typeof data[config.apiReturnDefine.data] !== "undefined") {
    return data[config.apiReturnDefine.data];
  }
  return data;
}
// 失败，一般是网络错误
function reject(error) {
  if (error.config && !error.config.hideLoading) {
    // commonLoading.hide();
  }
  message.destroy();
  message.error("访问人数过多,请稍后再试");
  console.error("=====> response error: ", error.response);
  return Promise.reject(error);
}
function requestIntercept(conf){
    conf.headers["X-ACCESS-TOKEN"] = 'token';
    return conf
}
// 请求拦截器
request.interceptors.request.use(requestIntercept);
requestFd.interceptors.request.use(requestIntercept);
requestFile.interceptors.request.use(requestIntercept);
// 响应拦截器
request.interceptors.response.use(resolve, reject);
requestFd.interceptors.response.use(resolve, reject);
requestFile.interceptors.response.use(resolve, reject);
export { request, requestFd, requestFile };
