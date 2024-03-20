interface miniVueBarrageProps {
  barrages: Array<BarrageItem>,
  barrageLineBlockHeight: number
  barrageLineBlockCount: number
  fullScreen: boolean
  delay: number
}

export interface BarrageItem {
  id: number,
  speed: number,
  content: string,
  top: number | string
}
