import { App } from "vue";

export type barrrageTypeGroup = 'default' | 'user'
export interface BarrageItem {
  id?: number,
  delay?: number,
  iconUrl?: string,
  content: string,
  top?: number
  color?: string,
  bgColor?: string,
  index?: number,
  type?: barrrageTypeGroup
}
export interface changeParams {
  renderCount: number
}
export declare const minivuebarrage: { install(app: App): void; } & import("vue").DefineComponent<{
} & {
  modelValue: Array<BarrageItem>,
  pausedFlag?: boolean;
  batchDestroy?: boolean
  startIcon?: boolean
  fullScreen?: boolean
  iconUrlInShow?: boolean
  delay?: number
  createFrequencyTime?: number
  createNum?: number
  opacity?: string | number
  showBarrage?: boolean
  baseLineHeight?: number
  color?: string
  bgColor?: string
  defaultBgColor?: boolean
  heigth?: string | number
  install? :(app: App<any>) => void
} ,{}>;
export default minivuebarrage;
declare module 'vue' {
  interface GlobalComponents {
      miniVueBarrage: typeof minivuebarrage;
  }
}
