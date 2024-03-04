import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';
import vitePluginInspect from 'vite-plugin-inspect';
// https://vitejs.dev/config/
export default defineConfig((command: any, mode: string ) => {
  console.log('command' , command);
  if(mode !== 'dev'){
    // 生产配置
    return {
      build: {
        outDir: 'dist',
        minify: 'terser',
        assetsDir: 'assets', //静态资源输出目录
        cssCodeSplit: true,
        lib: {
          entry: path.resolve(__dirname, './packages/index.ts'), // 指定生产打包 入口
          name: 'miniVueBarrage', // 打包完成的名称
          formats: ['cjs'], // 打包的 输出的 模式 
          fileName: () => `miniVueBarrage.js`
        },
        rollupOptions: {
          external: ['vue'],
        }
      },
      resolve: {
        alias: [

        ]
      },
      plugins: [
        vue(),
        vitePluginInspect({
          build: true,
          outputDir: '.vite-inspect'
        }), 
        // copy({ n m
        //   // 将需要用到的 
        //   targets: [
        //     {
        //       src: 'packages/assets/style' , dest: 'dist'
        //     }
        //   ]
        // })
      ],
   
    }
  }else{
    return {
      server: {
        open: true,
        port: 8080
      },
      
    }
  }
 
})
