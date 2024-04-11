declare module 'miniVueBarrage' {
  export interface GlobalComponent {
    miniVueBarrage: typeof import('./packages/components/minivueBarrage/src/index.vue')
  }
}
