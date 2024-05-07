import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';
// import vitePluginInspect from 'vite-plugin-inspect';
// https://vitejs.dev/config/
export default defineConfig({
    // 生产配置
      base: './',
      build: {
        outDir: './dist/miniVueBarrage',
        // minify: 'terser',
        // assetsDir: 'assets', //静态资源输出目录
        // cssCodeSplit: true,
        lib: {
          entry: path.resolve(__dirname, './packages/components/index.ts'), // 指定生产打包 入口
          name: 'miniVueBarrage', // 打包完成的名称
          formats: ['es'], // 打包的 输出的 模式
          fileName: () => `index.js`
        },
        rollupOptions: {
          output:{
            // 设置静态资源输出目录
            assetFileNames: (assetInfo) => 'assets/minivueBarrage.css'
          },
          external: ['vue'],
        }
      },
      resolve: {
        alias:{
          "@" : path.resolve(__dirname , './src'),
          "@p": path.resolve(__dirname , './packages')
        }
      },
      plugins: [
        vue(),
        // vitePluginInspect({
        //   build: true,
        //   outputDir: '.vite-inspect'
        // }),
        // copy({
        //   // 将需要用到的
        //   targets: [{
        //       src: 'packages/assets/style/*' , dest: 'dist'
        //   }]
        // })
      ],
      server:{
        host: '0.0.0.0',
        port: 8080,
        open: true
      }
  }
)
