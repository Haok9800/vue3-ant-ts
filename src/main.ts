import { createApp } from 'vue'
import store from './store/index'
import App from './App.vue'
import router from "./router"
import {setupAntd} from './plugins/antd'
const app = createApp(App)
setupAntd(app)
app.provide('store', store); 
app.use(router)
app.use(store)
app.mount('#app')
