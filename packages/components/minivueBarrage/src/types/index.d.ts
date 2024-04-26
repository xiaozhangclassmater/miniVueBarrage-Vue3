export interface miniVueBarrageProps {
  barrages: Array<BarrageItem>,
  startIcon: boolean,
  iconUrlInShow: boolean
  fullScreen: boolean
  createFrequencyTime: number,
  createNum: number
  delay: number
  opacity: number

}
export type baseType = undefined | string | number | null | object | []
export interface BarrageItem {
  id?: number,
  delay?: number,
  iconUrl?: string,
  content: string,
  top?: number
  color?: string
}

export type playState = 'running' | 'paused'
