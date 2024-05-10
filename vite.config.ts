import vue from '@vitejs/plugin-vue';
import path from 'path';
import copy from 'rollup-plugin-copy';
import { defineConfig } from 'vite';
// import vitePluginInspect from 'vite-plugin-inspect';
// https://vitejs.dev/config/
export default defineConfig({
    // 生产配置
      base: './',
      build: {
        outDir: './dist/minivuebarrage',
        lib: {
          entry: path.resolve(__dirname, './packages/components/index.ts'), // 指定生产打包 入口
          name: 'minivuebarrage', // 打包完成的名称
          formats: ['es' , 'cjs'], // 打包的 输出的 模式
          fileName: (ModuleFormat) => {
            if(ModuleFormat === 'es'){
              return `${ModuleFormat}/index.mjs`
            }else{
              return `lib/index.js`
            }
          }
        },
        rollupOptions: {
          output:{
            // 设置静态资源输出目录
            assetFileNames: () => 'lib/index.css'
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
        copy({
          hook: "closeBundle",
          targets: [
            { src: 'packages/package.json', dest: 'dist/minivuebarrage/' },
            {
              src: 'packages/components/minivueBarrage/docs/README.md', dest: 'dist/minivuebarrage/'
            }
          ],
        })
      ],
      server:{
        host: '0.0.0.0',
        port: 8080,
        open: true
      }
  }
)
