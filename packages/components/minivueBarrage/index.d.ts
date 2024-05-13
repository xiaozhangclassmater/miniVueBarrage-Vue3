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
export declare const minivuebarrage: import("vue").DefineComponent<{
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
  // click?: (e: MouseEvent , item: BarrageItem) => void
  // change?: (params: changeParams) => void
  // complete?: () => void
  // mouseenter?: (e: MouseEvent , item: BarrageItem) => void
  // mouseleave?: (e: MouseEvent , item: BarrageItem) => void
} ,{}>;
export default minivuebarrage;
declare module 'vue' {
  interface GlobalComponents {
      miniVueBarrage: typeof minivuebarrage;
  }
}
