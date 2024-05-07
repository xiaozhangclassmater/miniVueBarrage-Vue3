import { withInstall } from '../../utils';
import Barrage from './src/index.vue';
export type { BarrageItem, miniVueBarrageProps } from './src/types';

declare module 'vue' {
  export interface GlobalComponents {
    miniVueBarrage: typeof Barrage;
  }
}
export const miniVueBarrage = withInstall(Barrage)

export default miniVueBarrage
