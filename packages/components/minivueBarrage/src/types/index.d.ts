export interface miniVueBarrageProps {
  barrages: Array<BarrageItem>,
  barrageLineBlockHeight: number
  barrageLineBlockCount: number
  fullScreen: boolean
  delay: number
}

export interface BarrageItem {
  id: number,
  delay: number,
  icon: string,
  content: string,
  top: number
}

export interface elInstance {
  barrageElement: HTMLDivElement
  barrageIconElement: HTMLDivElement
}
