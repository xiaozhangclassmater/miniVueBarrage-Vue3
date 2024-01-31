import terserPlugin from '@rollup/plugin-terser';
import vuePlugin from '@vitejs/plugin-vue';
// rollup.config.mjs
export default {
  input: 'packages/index.ts',
  output: {
      file: 'dist/miniVueBarrage.js',
      format: 'iife',
      name: 'version',
      format: 'cjs',
      plugins: [terserPlugin()]
  },
  plugins: [
    vuePlugin()
  ]
};