import { defineConfig } from 'vite'
import styleImport from 'vite-plugin-style-import';
const path = require('path')
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
  alias:{
    '@': path.resolve(__dirname, './src'),
    '@com': path.resolve(__dirname, './src/components')
  },
  plugins: [vue(),
    styleImport({
      libs: [{
        libraryName: 'ant-design-vue',
        esModule: true,
        resolveStyle: (name) => {
          return `ant-design-vue/es/${name}/style/css`;
        },
      }]
    })
    
],
  css:{
    preprocessorOptions:{
      less: {
        // 全局less变量
        additionalData: "@import './src/assets/theme.less';",
      }
    }
  },
  server: {
    // https:true,
    open: true,
    cors:true,
    hmr:true,
    proxy: {
      '/citymanage/citycode-wh-manager': {
        target: 'https://app.riotest.wuhan.gov.cn',
        changeOrigin: true,
      }
    },
  }
})
