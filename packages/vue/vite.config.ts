import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import ElementPlus from 'unplugin-element-plus/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: './',
    server: {
      host: '127.0.0.1',
      port: 3000,
      proxy: {
        '/api': {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        },
        '/socket.io': {
          target: 'https://www.xdsbty.cn/',
          wss: true,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/socket.io/, '')
        }
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      ElementPlus(),
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ['vue', 'vue-router', 'vuex'],
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
